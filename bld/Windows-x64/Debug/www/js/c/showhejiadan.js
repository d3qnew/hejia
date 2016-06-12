var tempxml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><dingdan>dingdan2</dingdan>';
//console.log(tempxml);




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


$("#t_sendMail").click(function(){
    sendMail('dingdan2');
});


