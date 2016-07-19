

$(document).ready(function () {

    var alineheight = parseInt(window.innerHeight * 0.08);            //定义项目中单行高度

    $("#new").load("v/new.html");
    $("#filelist").load("v/filelist.html");

    $("#showhejiadan").load("v/showhejiadan.html");
    $("#options").load("v/options.html");
    $("#menubar").load("v/menu.html");

    function formatwindow() {
        $("body").height(window.innerHeight);
        $("#main").height(window.innerHeight * 0.92);                 //主窗口高度
        $("#main").children().css("overflow", "auto");
        $(".tp").height(window.innerHeight);
        $(".menu").height(window.innerHeight * 0.08);                 //菜单栏高度
        $(".menubt").css("line-height", alineheight + "px");         //菜单栏按钮高度
        $(".menu_select").width(window.innerWidth);                 //菜单栏菜单高度

        $(".menubt").ready(function (){
            var count_li = $(this).find("li").length;
            var top_range = window.innerHeight - (count_li + 1) * alineheight      //距顶部距离 等于 窗口高度（减按钮栏）-(1+li菜单数量)*单行高度
            $(this).children("ul").css("top", top_range + "px");

        });


    }

    formatwindow();
    $(window).resize(function () {
        formatwindow();
    });


    //菜单跳转

    $(".menubt").click(function () {
        var count_li = $(this).find("li").length;
        var top_range = window.innerHeight - (count_li + 1) * alineheight      //距顶部距离 等于 窗口高度（减按钮栏）-(1+li菜单数量)*单行高度
        $(this).children("ul").css("top", top_range + "px");
        if ($(this).children("ul").css("display") == "none") {
            $(this).children("ul").show();
        } else {
            $(this).children("ul").hide();
        }


    });


    $("#menubar_new").click(function () {
        location.hash = "#new";
    });

    $("#menubar_list").click(function () {
        location.hash = "#filelist";
        listFile(v_showfile);
        
    });

    $("#menubar_show").click(function () {
        location.hash = "#showhejiadan";
    });

    $("#menubar_setopt").click(function () {
        location.hash = "#setopt";
    });




});

