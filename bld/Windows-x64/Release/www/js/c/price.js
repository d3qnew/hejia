﻿var mw="";
var mpj={};
$(document).ready(function(){
    $.ajax({url:"data/windows.json",dataType:"json",async:false}).success(function (data) {mw=data;});
    $.ajax({url:"data/peijian.json",dataType:"json",async:false}).success(function (data) {mpj=data;});
    new_xl.n($("[tn=p]"),mw);
    new_pj.n($("[tn=p2]"),mpj);
    
    $("#save").on("click",function () {
        save.get();
        createFile(cfa.now(), JSON.stringify(save.j),n());
        
    });
       
});
var new_xl={
    html:"",
//    obj:{},
    n:function(obj,dat){
//        new_xl.obj=obj;
        new_xl.html=$.ajax({url:"v/xl.html",dataType:'html',async:false}).responseText;
        obj.html(new_xl.html);
        var txl=obj.find("[tn=xl]");
        var tlx=obj.find("[tn=lx]");
        var tpw=obj.find("[tn=pw]");
        addSelectOption.add2(txl,dat);
        new_xl.xl(txl);
        new_xl.lx(tlx);
        new_xl.p(tpw);
//        addSelectOption.add2(obj.find("[tn=lx]"),dat);
        txl.on("change",function(){new_xl.xl(this);});
        tlx.on("change",function(){new_xl.lx(this);});
        tpw.on("change",function(){new_xl.p(tpw);});
    },
    xl:function(obj){
        var obj_lx=$(obj).parent().children("[tn=lx]");
        addSelectOption.removeAll(obj_lx);
//        alert(mw[$(obj).val()]);
//        alert(JSON.stringify(mw[$(obj).val()]));
        addSelectOption.add(obj_lx,mw[$(obj).val()]);
    },
    lx:function(obj){
        var obj1=$(obj);
        var obj2=$(obj).parent().children("[tn=d1]");
        obj2.text(obj1.children("option:selected").attr("tov"));
    },
    p:function(obj){
        var temp=(obj.children("[tn=w]").val()*obj.children("[tn=h]").val()/1000000);
        obj.children("[tn=mj]").text(temp.toFixed(2));
        obj.children("[tn=jg]").text(parseInt(temp*obj.children("[tn=d1]").text()*obj.children("[tn=t]").val()));
        ZongJia.p();
    }
};

var new_pj={
    html:"",
    html1:"",
//    obj:{},
    n:function(obj,dat){
//        new_xl.obj=obj;
        new_pj.html=$.ajax({url:"v/pj.html",dataType:'html',async:false}).responseText;
        new_pj.html1=$.ajax({url:"v/pj1.html",dataType:'html',async:false}).responseText;
        obj.html(new_pj.html);
        var obj2=obj.find("[tn=ppj2]");
        $.each(dat,function(name,value) {
//            console.log(value);
            var cop=document.createElement("div");
            $(cop).attr("tn",name);
            $(cop).html(new_pj.html1);
            $(cop).find("[tn=lmc]").html(name);
            var llx=$(cop).find("[tn=llx]");
            addSelectOption.add3(llx,value);
            new_pj.lx(llx);
            llx.on("change",function(){new_pj.lx(this);});
            obj2.append(cop);
        });
        obj2.on("change",function(){ZongJia.p();});
    },
    lx:function(obj){
        var obj1=$(obj);
        var obj2=$(obj).parent().children("[tn=jg]");
        obj2.text(obj1.children("option:selected").attr("tov"));
    }
};

var addSelectOption={
    removeAll:function(obj){
        $(obj).children().remove();
    },
    add:function(obj,dat){
//        alert(1);
//            alert(JSON.stringify(dat));
//        $(obj).append(document.createElement("option"));
        $.each(dat,function(name,value) {
//            alert(name);
            var cop=document.createElement("option");
            $(cop).text(name);
            $(cop).val(name);
            $(cop).attr("tov",value.JiaGe);
            $(obj).append(cop);
            });
//    alert(2);
    },
    add2:function(obj,dat){
//        $(obj).append(document.createElement("option"));
        $.each(dat,function(name,value) {
            var cop=document.createElement("option");
            $(cop).text(name);
            $(cop).val(name);
            $(obj).append(cop);
        });
    },
    add3:function(obj,dat){
        var temp=document.createElement("option");
        $(temp).attr("tov",0);
        $(obj).append(temp);
        $.each(dat,function(name,value) {
            var cop=document.createElement("option");
            $(cop).text(value["mc"]);
            $(cop).val(name);
            $(cop).attr("tov",value.JiaGe);
            $(obj).append(cop);
        });
    }
};

var ZongJia={
    v:0,
    p:function(){
        ZongJia.v=0;
//        alert(ZongJia.v);
        $("[zj=1]").each(function(){
            ZongJia.v=ZongJia.v+Number($(this).text());
        });
        $("[zj=2]").text(ZongJia.v);
//        alert(ZongJia.v);
    }
};
var cfa={ //create file name
    now:function (){
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
        var clock = year + "_";

        if(month < 10)clock += "0";       
        clock += month + "_";

        if(day < 10)clock += "0";
        clock += day + "_";

        if(hh < 10)clock += "0";
        clock += hh + "_";

        if (mm < 10)clock += '0'; 
        clock += mm+ "_"; 

        if (ss < 10)clock += '0'; 
        clock += ss;

        return(clock); 
    },
    now1:function(){ 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
        var clock = year + "-";

        if(month < 10)clock += "0";       
        clock += month + "-";

        if(day < 10)clock += "0";
        clock += day + " ";

        if(hh < 10)clock += "0";
        clock += hh + ":";

        if (mm < 10)clock += '0'; 
        clock += mm+ ":"; 

        if (ss < 10)clock += '0'; 
        clock += ss;

        return(clock); 
    }
};

var save={
    j:{},
    get:function(){
        save.get_w();
        save.get_pj();
    },
    get_w:function(){
        $(save.j).attr("windows",{});
//        alert(save.j);
        var j0=save.j["windows"];
//        alert(j0);
        var obj=$("[tn=p]");
        var j1=$(obj).find("[tn=xl]").children("option:selected").val();
        var j2=$(obj).find("[tn=lx]").children("option:selected").val();
        var j3=$(obj).find("[tn=mj]").text();
        var j4=$(obj).find("[tn=jg]").text();
        $(j0).attr(j1,{});
        $(j0[j1]).attr("leixing",j2);
        $(j0[j1]).attr("shuliang",j3);
        $(j0[j1]).attr("JiaGe",j4);
//        alert(j4);
//        alert(JSON.stringify(save.j));
//        console.log(j0);
    },
    get_pj:function(){
//        alert(1);
        $(save.j).attr("pj",{});
        var j0=save.j["pj"];
        var obj=$("[tn=ppj2]");
        $(obj).children("div").each(function(){
            var obj2=$(this);
            var j1=obj2.find("[tn=lmc]").text();
            var j2=obj2.find("[tn=llx]").children("option:selected").val();
            var j3=obj2.find("[tn=lsl]").val();
            var j4=obj2.find("[tn=jg]").text();
//            alert(j4);
            if(j4 !=0 ){
//                alert(5);
                $(j0).attr(j1,{});
                $(j0[j1]).attr("leixing",j2);
                $(j0[j1]).attr("shuliang",j3);
                $(j0[j1]).attr("JiaGe",j4);
            }
        });
    }
};

var list={
    e:function(dat){
        var obj=$("#list");
        var json1 = eval('(' + dat + ')');
        var tr1="<tr>";
        var tr2="</tr>";
        var td1="<td>";
        var td2="</td>";
        var tah="<table><tr><td>序号</td><td>项目</td><td>类别</td><td>数量</td><td>价格</td></tr>";
        var rows=1;
        $.each(json1,function(name,value){
            if(name == "总价"){
                tah=tah+"<tr></td><td colspan='4'>总价</td><td>"+value+"</td></tr>";
            }else{
//                alert(4);
                $.each(json1[name],function(name,value){
                    tah=tah+tr1+td1+rows+td2+td1+name+td2+td1+value["leixing"]+td2+td1+value["shuliang"]+td2+td1+value["JiaGe"]+td2+tr2;
                    rows++;
                });
            }
        });
        tah=tah+"</table>";
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