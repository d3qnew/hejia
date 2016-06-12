/*
入口函数，先整理尺寸对象源数据，再显示窗体
        var data = zhengliArr(wimg_data(wdata.chicun));
        wimg_display(data);
*/




//价单部分样例
    var wdata = {
        chuanghao: 'cxx',
        fangxiang: "z",
        zwidth: 3200,
        zheight: 1500,
        chicun: {
           1: {
                1: { w: 1200, h: 500, c: "gd" },
                2: { w: 1200, h: 1000, c: "gd" }
            },
            
            2: { w: 2000, h: 1500, c: "gd" },
            

        }
    }


//处理对象到数组的变化


    function objToArray(obj) {
        var ci = 0;                                 //数组层次
        var newarr = new Array();                   //数组缓存

        /*
        多重循环，把层次数嵌入末级数组

        */

        function t_carr(obj, arr) {
            var arr = arr || new Array();
            for (x in obj) {
                if (typeof (obj[x]) == 'object') {
                    ci++;
                    arr[x] = [];
                    t_carr(obj[x], arr[x]);
                } else {
                    arr[x] = obj[x];
                    arr['ci'] = ci;
                    arr['end'] = 'end';
                }
            }
            ci--;
            newarr = arr;
        }

        /*
        整理数组，把末级以上的数组中的undefined元素剔除，取得正确的lenght值，
        给末级数组取得正确的lenght值
        */

        function zhengli(arr) {
            for (var i = 0; i < arr.length; i++) {
                if (typeof (arr[i]) == 'undefined') {
                    arr.splice(i, 1);
                }
                if (typeof (arr[i]) == 'object') {
                    zhengli(arr[i]);
                }

            }
            function len(arr) {
                var l = 0;
                for (x in arr) {
                    if (typeof (arr[x]) == 'object') {
                        len(arr[x]);
                    } else {
                        l++;
                        arr.length = l;
                    }
                }
                return arr;
            }

            return len(arr);
        }


        t_carr(obj);

        return zhengli(newarr);
    }




    //画窗户

    function wimg_display(arr) {
        
        //console.log(arr);
        //窗户模板
        var tang = '<td class = "tang"></td>';                                           //子窗体模板
        var wd = $("#wimg_display");
        var ci = 0;
        var ceng = null;
        var fx = arr.fangxiang;
        var chicun = objToArray(arr.chicun);

        wd.width($("body").width());               //固定窗体宽度        
        var xishu = wd.width() / arr.zwidth;              //比例系数
        wd.height(arr.zheight*xishu);             
        wd.html('');                                                        //清空窗体外框
        wd.append('<table id = "window_table"><tbody></tbody></table>');
        wt = $("#window_table tbody");       
        function xunhuan(chicun,tr) {
            var tr = tr || wt;

            
            if (ci != 0) {
                if (fx == 'z') {
                    fx = 'h';
                } else { fx = 'z'; }                
            }



            //console.log("ci = ");
            //console.log(ci);
            //console.log("fx =");
            //console.log(fx);

            
            if (ci == 0) { tr.append('<tr></tr>'); }
            
            ci++;

            for (var x = 0; x < chicun.length; x++) {

                if (typeof (chicun[x]) == 'object' && !in_array('end', chicun[x])) {
                    
                    if (fx == 'z') {
                        tr.children('tr').last().append('<td><table></table></td>');
                        var dctd = tr.find('table').last();
                        //console.log(dctd.parent().html());
                    } else {
                        var dctd = tr.children('tr').last().children('td').last();
                    }

                    xunhuan(chicun[x], dctd);

                } else {
                    
                    var xinxi = '';                    
                    for (xin in chicun[x]) {
                        xinxi += xin + '=' + chicun[x][xin] + '<br/>';
                    }   
                    if (fx == 'z') {
                        //console.log(tr.html());
                        tr.children('tr').last().append('<td class = "win_td"></td>');
                        var td = tr.find('td').last();
                        td.html(xinxi);
                        td.width(chicun[x].w * xishu);
                        td.height(chicun[x].h * xishu);
                    } else {                        
                        tr.append('<tr><td></td></tr>');
                        var td = tr.find('td').last();
                        td.html(xinxi);
                        td.width(chicun[x].w * xishu);
                        td.height(chicun[x].h * xishu);
                    }
                    
                    //console.log(td.html());
                    //td.width = chicun[x].w * xishu - 2;
                    //td.height = chicun[x].h * xishu - 2;
                    
                }
            }            

            if (ci != 1) {
                if (fx == 'z') {
                    fx = 'h';
                } else { fx = 'z'; }
            }

            
            
            //console.log(tr.html());
        }

        xunhuan(chicun);

   

    }


