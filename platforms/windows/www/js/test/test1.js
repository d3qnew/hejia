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
        },err);


    });


    
    $("#t_cdir").click(function () {
        console.log(app.writetype);
    });

    $("#t_getdir").click(function () {
        console.log(app.datadir);
    });

    $("#t_readFile").click(function () {  
        readFile('dingdan2',fuc);



    });

    $("#t_cfile").click(function () {         //在dingdan文件夹下写入一个文件  function createFile(rootstate, name, data)
        createFile("dingdan2", tempxml,fuc);
    });


    $("#t_filelist").click(function () {      //列出dingdan文件夹下的文件
    
        listFile(fuc);

    });


    $("#t_delFile").click(function(){
    
        delFile("dingdan2",fuc);
    
    
    });


    $("#t_sendMail").click(function () {
        sendMail('dingdan2');
    });




});