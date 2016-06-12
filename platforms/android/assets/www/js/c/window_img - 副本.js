/*
入口函数，先整理尺寸对象源数据，再显示窗体
        var data = zhengliArr(wimg_data(wdata.chicun));
        wimg_display(data);
*/




//价单部分样例
    var wdata = {

        fangxiang: "z",
        zwidth: 3200,
        zheight: 1500,
        chicun: {
            1: {
                1: { w: 1200, h: 500, c: "gd" },
                2: { w: 1200, h: 1000, c: "gd" }
            },
            
            2: { w: 2000, h: 1500, c: "gd" },
            3: {
                1: { w: 1200, h: 500, c: "gd" },
                2: { w: 1200, h: 1000, c: "gd" }
            },

        }
    }



    function wimg_data(obj) {

        //alertObj(obj);
        //console.log(obj);
        /*
        循环遍历多维对象函数，data为多维对象
        直接for in 
        压入键值
        判断当前子对象有无下级对象
            有：再次循环，完毕后释放一个键值
            无：打印当前键，打印当前值，释放一个键值
    
        */

        //取得门窗尺寸窗型分割方向数据

        var lkey = [];          //键的堆栈
        var arr = [];           //对象的键值对数组
        var arr1 = [];

        function xunhuan(data) {
            for (var x in data) {
                //console.log(x);

                lkey.push(x);           //= x.replace(',','_')
                if (typeof (data[x]) == 'object') {
                    xunhuan(data[x]);
                    lkey.pop();

                } else {
                    arr[lkey] = data[x];
                    lkey.pop();
                }
            }
        }

        xunhuan(obj);                              //价单取值入口

        for (var x in arr) {
            var key = x.replace(/,/g, '_');
            arr1[key] = arr[x];
        }



        return (arr1);
    }

    //整理数据把一维对象转换为二维对象

    function zhengliArr(arr) {

        //console.log(arr);

        var temp1 = [];                                               //赋值用数组第一层
        var temp2 = [];                                               //赋值用数组第二层
        var ci = 4;                                                   //重要参数，子窗体的参数数量，计次用
        var i = ci;                                                    
        for (var x in arr) {            
            var key = x.substring(0, x.length - 2);                   //子窗体id号字符串减2位
            var key2 = x.charAt(x.length - 1);                        //子窗体参数字符串减1位
            //console.log("key="+key);
            //console.log("key2="+key2);
            temp2[key2] = arr[x];
            temp1[key] = temp2;
            //console.log(temp2);
            i--;
            if (i == 0) {                                             //重置计次
                temp2 = new Array();
                i = ci;
            }

        }


        //console.log(temp1);

        return (temp1);
        
    }

    //画窗户

    function wimg_display(arr) {
        
        var fx = pp1.save.fangxiang;
        //console.log(arr);
        //窗户模板
        var tang = '<div class = "tang"></div>';                                           //子窗体模板
        var wd = $("#wimg_display");
        //var child_window = $("#wimg_display").load("template/window_img.html").html();
        //console.log(child_window);

        wd.width($("body").width());               //固定窗体宽度

        
        var xishu = wd.width() / pp1.save.zwidth;              //比例系数

        
        //console.log(wd.width());

        
        wd.html('');                                                        //清空窗体外框

        //console.log(arr);

        for (var x in arr) {

            //console.log(x);
            //console.log(arr[x]);           

            wd.append(tang);
            var wdd = $("#wimg_display .tang:last");

            var xid = 'winimg_' + x.toString();
            wdd.attr("id", xid);
            
            //wdd.load("template/window_img.html");

            //wdd.children('div').last('div').children('div').last('div').append(xid);

            wdd.append(xid);
            wdd.append('<br />宽=' + arr[x].w + 'mm<br />高=' + arr[x].h+'mm');
            
            //console.log(arr[x].w);
            //console.log(arr[x].h);

            var x_id = '#' + xid;
            //console.log(x_id);
            $(x_id).ready(function () {
                //console.log(arr[x].w);
                //console.log(arr[x].h);

                $(x_id).width(arr[x].w * xishu - 2);                  //margin为1，子窗体宽度减2
                $(x_id).height(arr[x].h * xishu - 2);
            });

        }

   

    }

    //元素数量

    function olength(obj) {
        var thiscount = 0;
        if (typeof (obj) == 'object') {
            for (var i in obj) {
                thiscount++;
            }
        } else {
            console.log("not obj");
            return null;
        }
        return thiscount;
    }

