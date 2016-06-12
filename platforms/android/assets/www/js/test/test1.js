$(document).ready(function () {

    var tempxml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><dingdan>dingdan2</dingdan>';


    fuc = function (x) {
        x = x || 'default';
        console.log(x);
    }



    $("#test1").click(function () {

        var rootDir = cordova.file.syncedDataDirectory;

        //console.log(window.requestFileSystem);

        window.requestFileSystem(1, 0, callbackdir, err);
        function callbackdir(fssystem) {
            fssystem.root.getDirectory("hejiadan", { create: true }, cback, err);

        }

        function cback(m) {
            //console.log(m);

        }

    });


    $("#test2").click(function () {
        //console.log(window.localStorage);
        //console.log(LocalFileSystem);
        //console.log(cordova.platformId);
        //console.log(cordova.file);

        window.resolveLocalFileSystemURL('', function (entry) {
            console.log(entry.toString());
        }, err);


    });



    $("#t_cdir").click(function () {
        console.log(app.writetype);
    });

    $("#t_getdir").click(function () {
        console.log(app.datadir);
    });

    $("#t_readFile").click(function () {
        readFile('dingdan2', fuc);



    });

    $("#t_cfile").click(function () {         //在dingdan文件夹下写入一个文件  function createFile(rootstate, name, data)
        createFile("dingdan2", tempxml, fuc);
    });


    $("#t_filelist").click(function () {      //列出dingdan文件夹下的文件

        listFile(fuc);

    });


    $("#t_delFile").click(function () {

        delFile("dingdan2", fuc);


    });


    $("#t_sendMail").click(function () {
        //sendMail('dingdan2');
        
        var bbb = '';

        function aaa(ccc) {
            setTimeout(function () {
                ccc();
            }, 1000);//1秒后回调
        }

        function ccc() {
            bbb = 'bbb';



            console.log("1="+bbb);
        }

        
        aaa(ccc);
        while (bbb == '') {
            setTimeout(function () { }, 1000);
        }
        console.log('2 = '+bbb);

        

    });


////////////////////////////////////////////////////////////////


   



    $("#wimg").click(function () {  
        var data = zhengliArr(wimg_data(wdata.chicun));
        wimg_display(data);
    });


    $("#test_carr").click(function () {
        test_carr();
    })

    /*
       把obj转化为array的函数
       用法： objToArray(obj)返回值是要获得的数组
    */

    function objToArray(obj) {

        var ci = 0;
        
        var newarr = new Array();
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
                }
            }            
            ci--;
            newarr = arr;            
        }

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


    ///////////////////////////////////////////////////////






    /*
    一个继承于数组对象的新类型包括几个新方法和原有的方法
    */


    function suArray() {
        var arr = new Array();
        this.length = function () {

        }
        this.push = function () {

        }
        this.pop = function () {

        }

        return arr;
    }



//////////////////////////////////////////////////////////////////

    function test_carr() {

        sel = $("#test_sel").val();
        console.log(sel);

    }




 



});




