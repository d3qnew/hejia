mycon = console;

pdat = {
    mw: {},
    mpj: {},
    level: "",
    pj: "",
    pj2: "",
    fg: "&nbsp;块数&nbsp;:&nbsp;<input type='number' value='1' class='fgs p_input'/><button class='fg'>确定</button><br/>",
    fg2:'<div class="cn"></div><div class="level" style="padding:5px;margin:5px"></div>',
    lx: "",
    fx:"",
    save: '{ "chuanghao": "", "xilie": "", "fangxiang": "", "zwidth": "", "zheight": "", "chicun": {},"peijian":{}}'
};
$.ajax({ url: "data/windows.json", dataType: "json", async: false }).success(function (data) { pdat.mw = data; });
$.ajax({ url: "data/peijian.json", dataType: "json", async: false }).success(function (data) { pdat.mpj = data; });
pdat.level = $.ajax({ url: "v/level.html", dataType: 'html', async: false }).responseText;
pdat.order = $.ajax({ url: "v/order.html", dataType: 'html', async: false }).responseText;
pdat.pj = $.ajax({ url: "v/pj.html", dataType: 'html', async: false }).responseText;
pdat.pj2 = $.ajax({ url: "v/pj1.html", dataType: 'html', async: false }).responseText;
pdat.lx = $.ajax({ url: "v/lx.html", dataType: 'html', async: false }).responseText;
cjson = {};

var isEVEN = function (a) { return a % 2 == 0; };

var assemble_path = function (a) {//组合json路径
    var t = show_split.wid.split(".");
    var t1 = "cjson[show_split.x].chicun";
    for (var p in t) {
        if(!(a==1&&p==(t.length-1))){
            t1 += "[" + t[p] + "]";
        }
    }
    return t1
}

$("#new").ready(function () {

    dialogs.n();//弹出层初始化

    orders.n();

    $(".sub").on("click", function () {
        p_save.get_pj();
        createFile($(".danhao").val(), JSON.stringify(cjson), n());
    });
});
var dialogs = {
    sub:"",
    n: function (d_size) {
        dialogs.d = $(".dialog");
        dialogs.t = $(".dialog").children(".title");
        dialogs.b = $(".dialog").children(".body");
        dialogs.c = $(".dialog").children(".control");
        dialogs.hide();
        dialogs.size("normal");
        dialogs.d.find("#dialog_submit").on("click", function () {
            dialogs.submit(dialogs.sub);
        });
        dialogs.d.find("#dialog_cancel").on("click", function () {
            dialogs.hide();
        });
        dialogs.c.find("#dialog_del").on("click", function () {
            show_split.del();
        });
    },
    size: function (d_size) {
        var oh = dialogs.d.height();
        var ow = dialogs.d.width();
        //mycon.log(ow + "_" + oh);
        switch (true) {
            case d_size == "big":
                SIZE.n(dialogs.t, ow * .8, oh * .05, ow * .1, oh * .05);
                SIZE.n(dialogs.b, ow * .8, oh * .7, ow * .1, oh * .1);
                SIZE.n(dialogs.c, ow * .8, oh * .05, ow * .1, oh * .8);
                break;
            case d_size == "normal":
                SIZE.n(dialogs.t, ow * .6, oh * .05, ow * .2, oh * .25);
                SIZE.n(dialogs.b, ow * .6, oh * .3, ow * .2, oh * .3);
                SIZE.n(dialogs.c, ow * .6, oh * .05, ow * .2, oh * .6);
                break;
            case d_size == "small":
                SIZE.n(dialogs.t, ow * .6, oh * .05, ow * .2, oh * .25);
                SIZE.n(dialogs.b, ow * .6, oh * .3, ow * .2, oh * .3);
                SIZE.n(dialogs.c, ow * .6, oh * .05, ow * .2, oh * .6);
                break;
        }
        
    },
    g: function (node, x, d_size,b) {
        dialogs.size(d_size);
        if (b == "del") {
            dialogs.c.find("#dialog_del").show();
        }else{
            dialogs.c.find("#dialog_del").hide();
        }
        switch (true) {
            case node == "order":
                dialogs.t.text("订单");
                dialogs.b.html(pdat.order);
                var obj = dialogs.b.children(".t_xilie");
                addSelectOption.add2($(".t_xilie"), pdat.mw);
                if (x) {
                    dialogs.sub="order";
                    //dialogs.c.children("#dialog_submit").attr("d_s", "order");
                } else {
                    dialogs.sub="new_order";
                    //dialogs.c.children("#dialog_submit").attr("d_s", "new_order");
                }
                break;
            case node=="split":
                dialogs.t.text("窗型设计");
                dialogs.b.html(pdat.level);
                var obj = dialogs.b.children(".level");
                dialogs.b.children(".fg").on("click", function () {
                    //mycon.log("222");
                    var temp = dialogs.b.children(".p_input").val();
                    dialogs.cf(obj,temp)
                });
                if (x==0) {
                    dialogs.sub="first";
                    //dialogs.c.children("#dialog_submit").attr("d_s", "first");
                } else {
                    dialogs.sub="split";
                    //dialogs.c.children("#dialog_submit").attr("d_s", "split");
                }
                break;
        }
        dialogs.show();
    },
    cf: function (obj,dat) {
        obj.html("");//清除元素内html
        
        var x = orders.b.text();
        var tw, tw0, th, th0, sd,ds, cfkey,last;
        var tj;
        var t1=assemble_path(0);
        t1 = "tj=" + t1;
        eval(t1);
        tw = tw0 = tj.w;
        th = th0 = tj.h;
        cfkey = show_split.fx(cjson[show_split.x].fangxiang);
        cf(cfkey);
        function cf(cfkey) {
            if (cfkey=="z") {
                tw = parseInt(tw / dat);
                sd = ".t_height";
                ds = ".t_width";
                last = tw0 - (dat - 1) * tw;
            }else{
                th = parseInt(th / dat);
                sd = ".t_width";
                ds = ".t_height";
                last = th0 - (dat - 1) * th;
            }            
        }
        for (var i = 0; i < dat;i++) {
            obj.append(pdat.lx);
            var o2 = obj.children("div:last");
            new_level.lx(o2, cjson[show_split.x].xilie);
            o2.children(".t_width").val(tw);
            o2.children(".t_height").val(th);
            o2.children(sd).attr("readonly", "true");
        }
        obj.children("div:last").children(ds).val(last);
    },
    hide: function () {
        dialogs.d.hide();
    },
    show: function () {
        dialogs.d.show();
    },
    submit: function (x) {
        mycon.log(x);
        switch (true) {
            case x == "new_order":
                var ch = dialogs.b.children(".t_chuanghao").val();
                cjson[ch] = JSON.parse(pdat.save);
                var tj = cjson[ch];
                //mycon.log(cjson);
                tj.chuanghao = ch;
                tj.xilie = dialogs.b.children(".t_xilie").val();
                tj.zheight = dialogs.b.children(".t_height").val();
                tj.zwidth = dialogs.b.children(".t_width").val();
                tj.fangxiang = dialogs.b.children(".t_fangxiang").val();
                tj.chicun = { 1: { w: tj.zwidth, h: tj.zheight, c: "固定", p: "2380" } }
                mycon.log(tj);
                dialogs.hide();
                orders.g(cjson);
                orders.click(ch);
                break;
            case x == "order":

                break;
            case x == "first":
                show_split.s(1);
                break;
            case x == "split":
                show_split.s(0);
                break;
        }
    }
};

var orders = {
    li:'<li class="order"></li>',
    div:'<div class="pb"></div>',
    n: function () {
        orders.a = $(".order_a");
        orders.b = $(".order_b");
        orders.o = $(".orders");
        orders.a.on("click", function () {
            orders.o.toggle();
        });
        orders.b.on("click", function () {
            dialogs.g("order");
            dialogs.show();
        });
        orders.b.hide();
        orders.add("新增");
    },
    g: function (dat) {
        orders.o.html("");
        $.each(dat, function (key, val) {
            if (typeof (val) == "object") {
                orders.add(key);
            }
        });
        orders.add("新增");
    },
    add: function (name) {
        orders.o.append(orders.li);
        var obj = orders.o.children(".order:last");
        obj.append(orders.div);
        obj.children(".pb:last").html(name);
        obj.on("click", function () {
            orders.click($(this).text());
        });
    },
    click: function (x) {
        if (x == "新增") {
            //mycon.log("xinzengs")
            dialogs.g("order",0,"normal");
        } else {
            orders.hide();
            orders.b.html(x);
            orders.b.show();
            //dialogs.g("order",1,"normal");
            wimg_display($("#show"), cjson[x]);
            $("#show").attr("j",x);
            show_split.n();
        }
    },
    hide:function(){
        orders.o.hide();    
    }
};

var show_split = {//拆分
    wid: "",
    x:"",
    n: function(){
        $("#show").find(".endwindow").each(function () {
            $(this).on("click", function () {
                show_split.x = orders.b.text();
                show_split.wid = $(this).attr("wid");
                //mycon.log($(this).attr("wid"));
                if (show_split.wid == 1 && !cjson[show_split.x].chicun[2]) {
                    //mycon.log("only one");
                    dialogs.g("split", 0, "big");
                } else {
                    var key = 0;
                    $(this).parent().children("div").each(function () {
                        if ($(this).hasClass("fgdiv")) {
                            key = 1;
                        }
                    });
                    if(key==0){
                        dialogs.g("split", show_split.wid, "big", "del");
                    } else {
                        dialogs.g("split", show_split.wid, "big")
                    }
                }
            })
        })
    },
    s: function (f) {
        var obj = dialogs.b.children(".level");
        var x = orders.b.text();
        var tj = {};
        obj.children("div").each(function (i) {
            var o2 = $(this);
            $(tj).attr(i + 1, {});
            tj[i + 1].c = o2.children("select").val();
            tj[i + 1].p = o2.children("span").text();
            tj[i + 1].w = o2.children(".t_width").val();
            tj[i + 1].h = o2.children(".t_height").val();
        });
        if (f) {
            cjson[x].chicun = tj;
        } else {
            var t1=assemble_path(0);
            t1 += "=tj";
            eval(t1);
        }
        wimg_display($("#show"), cjson[x]);
        new_pj.n($("#pj"), pdat.mpj);
        show_split.n();
        dialogs.hide();
    },
    del: function () {
        var t1 = assemble_path(1);
        //var t2 = assemble_path(0);
        var tj;
        eval("tj="+t1);
        var th, tw;
        th = tw = 0;
        var direction = show_split.fx(cjson[show_split.x].fangxiang);
        mycon.log(direction);
        if (direction == "z") {
            tw = tj[1].w;
            for (var i in tj) {
                th += parseInt(tj[i].h);
            }
        } else {
            th = tj[1].h;
            for (var i in tj) {
                tw += parseInt(tj[i].w);
            }
        }
        var t = show_split.wid.split(".");
        if (t.length == 1) {
            eval(t1 + '={1:{w:"' + tw + '",h:"' + th + '",c:"固定",p:"2380"}}');
        }else{
            eval(t1 + '={w:"' + tw + '",h:"' + th + '",c:"固定",p:"2380"}');
        }
        wimg_display($("#show"),cjson[show_split.x]);
        show_split.n();
        dialogs.hide();
    },
    fx: function (direction) {
        var t = show_split.wid.split(".");
        if (dialogs.sub == "split" && !isEVEN(t.length)) {
            if (direction == "z") {
                direction = "h";
            } else {
                direction = "z";
            }
        }
        return direction;
    },
    yz: function () {
        var x = orders.b.text();
        
    }
}

var SIZE = {
    n: function (obj, width, height,left,top) {
        $(obj).css({ "width": width, "height": height, "left": left, "top":top});
    }
}



var new_level={ //分割级别控制
    n: function (obj, dat,lname) {//增加元素
        obj.html("");//清除元素内html
        for (var i = 0; i < dat; i++) {
            //temp = temp + pdat.level_html;
            obj.append(pdat.level_html);
            var level_name = obj.children("div:last").children(".level_name");
            level_name.attr("tln1", lname);
            level_name.attr("tln2", "");
            level_name.attr("tln2", (i + 1));
            level_name.html(lname + '_' + level_name.attr("tln2"));
            new_level.lx(obj.children("div:last").children(".cn:last"),pdat.xilie);
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
                //obj_cn.html(pdat.lx);
                new_level.lx(obj_cn, pdat.xilie);
                obj.parent().children(".level:last").html("");
            } else {
                obj_cn.html(pdat.fg);
                new_level.on_click(obj_cn.children("button:last"))
                obj.parent().children(".level:last").html("");
            }
        });
    },
    lx: function (obj, dat) {//加载窗户类型
        //$(obj).html(pdat.lx);
        var temp = $(obj).children(".xl:last");
        $.each(pdat.mw[dat], function (name, value) {
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
            temp = temp.replace(/[^_]+/, pdat.chuanghao);
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
            case pdat.save.fangxiang == "0":
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
        new_level.n($(".level1"), tdat, pdat.chuanghao);

    }
};


var new_pj = {
    n: function (obj, dat) {
        obj.html(pdat.pj);
        var obj2 = obj.find(".ppj2:last");
        //obj2.html(123);
        $.each(dat, function (name, value) {
            //mycon.log(value);
            var cop = document.createElement("div");
            $(cop).addClass(name);
            $(cop).html(pdat.pj2);
            $(cop).find(".lmc").html(name);
            var llx = $(cop).find(".llx");
            addSelectOption.add3(llx, value);
            new_pj.lx(llx);
            llx.on("change", function () { new_pj.lx(this); });
            //mycon.log(cop);
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
        pdat.tp1 = 0;
        pdat.tp2 = 0;
        ZongJia.w(pdat.save.chicun);
        ZongJia.p();
        $(".t_w_h").text(pdat.tp1);
        $(".t_p_h").text(pdat.tp2);
        $(".t_h").text(pdat.tp1+pdat.tp2);
    },
    w: function (dat) {
        $.each(dat, function (key,val) {
            if (val.p) {
                var temp = val.p * val.w * val.h / 1000000;
                pdat.tp1 += temp;
            } else {
                ZongJia.w(val);
            }
        });
    },
    p: function () {
        $.each(pdat.save.peijian, function (key, val) {
            var temp=val.shuliang*val.JiaGe
            pdat.tp2 += temp;
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
        //mycon.log(pdat.save);
        //pdat.save = { chuanghao: "", xilie: "", fangxiang: "", zwidth: "", zheight: "", chicun: {}, peijian: {} };//初始化
        //mycon.log(123);
        //p_save.get_w();
        //p_save.get_chicun($(".level1"), pdat.save.chicun
        p_save.get_d();
        p_save.get_pj();
        //mycon.log(pdat.save);
        //navigator.notification.alert(JSON.stringify(pdat.save));
        //$(".t_test").text(JSON.stringify(pdat.save));
        //p_save.yy(pdat.save.chicun);
    },
    get_d: function () {
        cjson.attr("danhao", $(".danhao").val());
    },
    get_pj: function () {
        if (show_split.x != "") {
            cjson[show_split.x].peijian = {};
            var j0 = cjson[show_split.x].peijian;
            //mycon.log(j0);
            var obj = $(".ppj2");
            $(obj).children("div").each(function () {
                var obj2 = $(this);
                var j1 = obj2.find(".lmc").text();
                var j2 = obj2.find(".llx").children("option:selected").val();
                var j3 = obj2.find(".lsl").val();
                var j4 = obj2.find(".jg").text();
                if (j4 != 0) {
                    $(j0).attr(j1, {});
                    $(j0[j1]).attr("leixing", j2);
                    $(j0[j1]).attr("shuliang", j3);
                    $(j0[j1]).attr("JiaGe", j4);
                }
            });
            //mycon.log(j0);
            cjson[show_split.x].peijian = j0;
        }
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
        var tah = "<table><tr><td>序号</td><td>窗号</td><td>系列</td><td>面积</td><td>价格</td></tr>";
        var rows = 1;
        $.each(json1, function (name, value) {
            tah = tah + tr1 + td1 + rows + td2 + td1 + value["chuanghao"] + td2 + td1 + value["xilie"] + td2 + td1 + value["zwidth"] * value["zheight"]/1000000 + td2 + td1 + "总价" + td2 + tr2;
            rows++;
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