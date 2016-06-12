pp1 = {
    log: 0,
    xilie:"M76",
    chuanghao:"窗号",
    mw: {},
    mpj: {},
    level_html: "",
    pj: "",
    pj2:"",
    fg: "&nbsp;块数&nbsp;:&nbsp;<input type='number' value='1' class='fgs p_input' min='2' max='5'/><button class='fg'>确定</button><br/>",
    fg2:'<div class="cn"></div><div class="level" style="padding:5px;margin:5px"></div>',
    lx: "",
    fx:"",
    save: { chuanghao: "", xilie: "", fangxiang: "", zwidth: "", zheight: ""}
};


pp1.save.chicun = new Object();
pp1.save.peijian = new Object();

$.ajax({ url: "data/windows.json", dataType: "json", async: false }).success(function (data) { pp1.mw = data; });
$.ajax({ url: "data/peijian.json", dataType: "json", async: false }).success(function (data) { pp1.mpj = data; });
pp1.level_html = $.ajax({ url: "v/xl.html", dataType: 'html', async: false }).responseText;
pp1.pj = $.ajax({ url: "v/pj.html", dataType: 'html', async: false }).responseText;
pp1.pj2 = $.ajax({ url: "v/pj1.html", dataType: 'html', async: false }).responseText;
pp1.lx = $.ajax({ url: "v/lx.html", dataType: 'html', async: false }).responseText;


$("#new").ready(function () {

    //navigator.notification.alert(JSON.stringify(pp1.save));
    //navigator.notification.alert(123);
    addSelectOption.add2($(".t_xilie"), pp1.mw);//加载窗型系列数据

    $(".t_xilie").change( function () {//当窗型系列修改时执行
        //navigator.notification.confirm('您确定要修改窗型系列么？', showConfirm, '修改窗型', '是,否');
        pp1.xilie = $(this).val();
    });

    $(".t_chuanghao").change(function () {//当窗号修改时执行
        pp1.chuanghao = $(this).val();
        new_level.chuanghao_change();
        //console.log(pp1.chuanghao);
    });

    $("#s1w").on("click", function () {//当确定数量时执行
        new_level.yz();
        //new_level.n($(".level1"), $("#level0_fgs").val(),pp1.chuanghao);
        //navigator.notification.alert("拆分上限为5", {}, "错误");
    });

    new_pj.n($(".pj:last"), pp1.mpj);//加载配件页面
    //console.log(pp1.save);
    //$(".t_test").text(JSON.stringify(p_save));
    $("#t_show").on("click", function () {
        p_save.get();
        ZongJia.g();
        //var data = zhengliArr(wimg_data(pp1.save.chicun));
        //wimg_display(data);
        wimg_display(pp1.save);

    })
});

function showConfirm(button) { //预留
    //navigator.notification.alert(button);
    if (button == 1) { 
    }
}

var new_level={ //分割级别控制
    n: function (obj, dat,lname) {//增加元素
        obj.html("");//清除元素内html
        for (var i = 0; i < dat; i++) {
            //temp = temp + pp1.level_html;
            obj.append(pp1.level_html);
            var level_name = obj.children("div:last").children(".level_name");
            level_name.attr("tln1", lname);
            level_name.attr("tln2", "");
            //if (lname == pp1.chuanghao) {
            //    level_name.attr("tln2", String.fromCharCode(97 + i));
            //} else {
            //    level_name.attr("tln2", (i + 1));
            //}
            level_name.attr("tln2", (i + 1));
            //level_name.attr("tln2", String.fromCharCode(97 + i));
            level_name.html(lname + '_' + level_name.attr("tln2"));
            new_level.lx(obj.children("div:last").children(".cn:last"),pp1.xilie);
            new_level.on_change($(obj.children("div:last").children(".t_scn:last")));
        }
    },
    on_click: function (obj) {//绑定事件
        obj.on("click", function () {
            var temp = $(this).parent().parent();
            var lm = temp.children(".level_name");
            new_level.n(temp.children(".level:last"), temp.children(".cn").children(".fgs").val(), lm.attr("tln1") + "_" + lm.attr("tln2"));
        })
    },
    on_change: function (obj) {//拆分选择
        obj.on("change", function () {
            var temp = $(this).children("option:selected").val();
            var obj_cn = obj.parent().children(".cn:last");
            if (temp == 0) {
                //obj_cn.html(pp1.lx);
                new_level.lx(obj_cn, pp1.xilie);
                obj.parent().children(".level:last").html("");
            } else {
                obj_cn.html(pp1.fg);
                new_level.on_click(obj_cn.children("button:last"))
                obj.parent().children(".level:last").html("");
            }
        });
    },
    lx: function (obj, dat) {//加载窗户类型
        $(obj).html(pp1.lx);
        var temp=$(obj).children(".xl:last")
        $.each(pp1.mw[dat], function (name, value) {
            var cop = document.createElement("option");
            $(cop).text(name);
            $(cop).val(name);
            $(cop).attr("tov", value.JiaGe);
            temp.append(cop);
        })
        $(obj).children("span:first").text(temp.children("option:selected").attr("tov"));
        temp.on("change", function () {
            $(obj).children("span:first").text($(this).children("option:selected").attr("tov"));
        });
    },
    chuanghao_change: function () { //当窗号改变时执行全局修改
        $(".level1").find(".level_name").each(function () {
            var temp = $(this).attr("tln1");
            temp = temp.replace(/[^_]+/, pp1.chuanghao);
            $(this).attr("tln1", temp);
            $(this).text($(this).attr("tln1") + '_' + $(this).attr("tln2"));
        });
    },
    yz: function () {
        p_save.get_w();
        var temp = $("#level0_fgs");
        var tdat;
        //navigator.notification.alert(tfx == 0);
        switch (true){
            case pp1.save.fangxiang == "0":
                temp.val(1);
                tdat = 1;
                break;
            case temp.val() > 5:
                temp.val(5);
                tdat = 5;
                navigator.notification.alert("最多分5块");
                break;
            case temp.val() <2:
                temp.val(2);
                tdat=2
                navigator.notification.alert("最少分2块");
                break;
            default:
                tdat = temp.val();
                break;
        }
        new_level.n($(".level1"), tdat, pp1.chuanghao);

    }
};


var new_pj = {
    n: function (obj, dat) {
        obj.html(pp1.pj);
        var obj2 = obj.find(".ppj2:last");
        //obj2.html(123);
        $.each(dat, function (name, value) {
            //console.log(value);
            var cop = document.createElement("div");
            $(cop).addClass(name);
            $(cop).html(pp1.pj2);
            $(cop).find(".lmc").html(name);
            var llx = $(cop).find(".llx");
            addSelectOption.add3(llx, value);
            new_pj.lx(llx);
            llx.on("change", function () { new_pj.lx(this); });
            //console.log(cop);
            obj2.append(cop);
        });
        //obj2.on("change", function () { ZongJia.p(); });
    },
    lx: function (obj) {
        var obj1 = $(obj);
        var obj2 = $(obj).parent().children(".jg");
        obj2.text(obj1.children("option:selected").attr("tov"));
    }
};

var addSelectOption = {
    removeAll: function (obj) {
        $(obj).children().remove();
    },
    add: function (obj, dat) {
        $.each(dat, function (name, value) {
            //            alert(name);
            var cop = document.createElement("option");
            $(cop).text(name);
            $(cop).val(name);
            $(cop).attr("tov", value.JiaGe);
            $(obj).append(cop);
        });
        //    alert(2);
    },
    add2: function (obj, dat) {
        //        $(obj).append(document.createElement("option"));
        $.each(dat, function (name, value) {
            var cop = document.createElement("option");
            $(cop).text(name);
            $(cop).val(name);
            $(obj).append(cop);
        });
    },
    add3: function (obj, dat) {
        var temp = document.createElement("option");
        $(temp).attr("tov", 0);
        $(obj).append(temp);
        $.each(dat, function (name, value) {
            var cop = document.createElement("option");
            $(cop).text(value["mc"]);
            $(cop).val(name);
            $(cop).attr("tov", value.JiaGe);
            $(obj).append(cop);
        });
    }
};

var ZongJia = {
    g: function () {
        pp1.tp1 = 0;
        pp1.tp2 = 0;
        ZongJia.w(pp1.save.chicun);
        ZongJia.p();
        $(".t_w_h").text(pp1.tp1);
        $(".t_p_h").text(pp1.tp2);
        $(".t_h").text(pp1.tp1+pp1.tp2);
    },
    w: function (dat) {
        $.each(dat, function (key,val) {
            if (val.p) {
                var temp = val.p * val.w * val.h / 1000000;
                pp1.tp1 += temp;
            } else {
                ZongJia.w(val);
            }
        });
    },
    p: function () {
        $.each(pp1.save.peijian, function (key, val) {
            var temp=val.shuliang*val.JiaGe
            pp1.tp2 += temp;
        });
    },
    q:function() {

    }
};
var cfa = { //create file name
    now: function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
        var clock = year + "_";

        if (month < 10) clock += "0";
        clock += month + "_";

        if (day < 10) clock += "0";
        clock += day + "_";

        if (hh < 10) clock += "0";
        clock += hh + "_";

        if (mm < 10) clock += '0';
        clock += mm + "_";

        if (ss < 10) clock += '0';
        clock += ss;

        return (clock);
    },
    now1: function () {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
        var clock = year + "-";

        if (month < 10) clock += "0";
        clock += month + "-";

        if (day < 10) clock += "0";
        clock += day + " ";

        if (hh < 10) clock += "0";
        clock += hh + ":";

        if (mm < 10) clock += '0';
        clock += mm + ":";

        if (ss < 10) clock += '0';
        clock += ss;

        return (clock);
    }
};

var p_save = {
    get: function () {
        //console.log(pp1.save);
        pp1.save = { chuanghao: "", xilie: "", fangxiang: "", zwidth: "", zheight: "", chicun: {}, peijian: {} };//初始化
        //console.log(123);
        p_save.get_w();
        p_save.get_chicun($(".level1"), pp1.save.chicun);
        p_save.get_pj();
        //console.log(pp1.save);
        //navigator.notification.alert(JSON.stringify(pp1.save));
        $(".t_test").text(JSON.stringify(pp1.save));
        //p_save.yy(pp1.save.chicun);
    },
    get_w: function () {
        var obj0 = $("#level0");
        pp1.save.chuanghao = obj0.children(".t_chuanghao").val();
        pp1.save.xilie = obj0.children(".t_xilie").children("option:selected").text();
        pp1.save.fangxiang = obj0.children(".t_fangxiang").children("option:selected").val();
        pp1.save.zwidth = obj0.children(".t_width0").val();
        pp1.save.zheight = obj0.children(".t_height0").val();
    },
    get_chicun: function (obj, dat) {
        $(obj).children("div").each(function (i) {
            var tname = $(this).children(".level_name").attr("tln2");
            $(dat).attr(tname, {});
            
            if ($(this).children(".t_scn").children("option:selected").val()==1) {
                p_save.get_chicun($(this).children(".level"), dat[tname]);
            } else {
                var tobj = $(this).children(".cn");
                $(dat[tname]).attr('w', tobj.children(".t_width").val())
                $(dat[tname]).attr('h', tobj.children(".t_height").val());
                $(dat[tname]).attr('c', tobj.children(".xl").children("option:selected").val());
                $(dat[tname]).attr("p", tobj.children("span:first").text());
            }
        });
    },
    yy: function (dat) {
        $.each(dat, function (key,val) {
            navigator.notification.alert(key);
            navigator.notification.alert(val);
        });
    },
    get_pj: function () {
        //        alert(1);
        var j0 = pp1.save.peijian;
        var obj = $(".ppj2");
        $(obj).children("div").each(function () {
            var obj2 = $(this);
            var j1 = obj2.find(".lmc").text();
            var j2 = obj2.find(".llx").children("option:selected").val();
            var j3 = obj2.find(".lsl").val();
            var j4 = obj2.find(".jg").text();
            //navigator.notification.alert(j4);
            //            alert(j4);
            if (j4 != 0) {
                //                alert(5);
                $(j0).attr(j1, {});
                $(j0[j1]).attr("leixing", j2);
                $(j0[j1]).attr("shuliang", j3);
                $(j0[j1]).attr("JiaGe", j4);
            }
        });
    }
};

var list = {
    e: function (dat) {
        var obj = $("#list");
        var json1 = eval('(' + dat + ')');
        var tr1 = "<tr>";
        var tr2 = "</tr>";
        var td1 = "<td>";
        var td2 = "</td>";
        var tah = "<table><tr><td>序号</td><td>项目</td><td>类别</td><td>数量</td><td>价格</td></tr>";
        var rows = 1;
        $.each(json1, function (name, value) {
            if (name == "总价") {
                tah = tah + "<tr></td><td colspan='4'>总价</td><td>" + value + "</td></tr>";
            } else {
                //                alert(4);
                $.each(json1[name], function (name, value) {
                    tah = tah + tr1 + td1 + rows + td2 + td1 + name + td2 + td1 + value["leixing"] + td2 + td1 + value["shuliang"] + td2 + td1 + value["JiaGe"] + td2 + tr2;
                    rows++;
                });
            }
        });
        tah = tah + "</table>";
        $(obj).html(tah);
        location.hash = "#showhejiadan";
    }
};

//var select_ld={
//    n:function(obj1,obj2,obj3,dat1,dat2){
//        
//    },
//    o:function(obj,dat){
//        
//    },
//    p:function(){
//        
//    }
//};