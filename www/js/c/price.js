xl=[
    {"xl":"m76"},
    {"xl":"dr60"}
];
var mw="";
var mpj={};
$(document).ready(function(){
    $.ajax({url:"data/windows.json",dataType:"json",async:false}).success(function (data) {mw=data;});
    $.ajax({url:"data/peijian.json",dataType:"json",async:false}).success(function (data) {mpj=data;});
    new_xl.n($("[tn=p]"),xl);
    new_pj.n($("[tn=p2]"),mpj);
    
    $("#price").click(function () {   
        new_xl.n($("[tn=p2]"),xl);
    });
    
    $("#remove").click(function(){  
        
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
            $(cop).text(value["xl"]);
            $(cop).val(value["xl"]);
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