/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function n(){}

function onerror(error) {
    console.log(error.code);
}

//创建文件

function createFile(filename, date,fuc) {

    var date = date;
    var filename = filename;
    var fuc = fuc;
    var directory = "hejiadan";
    var size = 0;
    var newFile;
    window.requestFileSystem(app.dir.PERSISTENT, size, onFileSystemSuccess, onerror);

    function onFileSystemSuccess(fileSystem) {
        newFile = fileSystem.root.getDirectory(directory, {
            create: true,
            exclusive: false
        }, onDirectorySuccess, onerror);
    }

    function onDirectorySuccess(newFile) {
        newFile.getFile(filename, {
            create: true,
            exclusive: false
        }, onFileSuccess, onerror);
    }

    function onFileSuccess(fileEntry) {
        fileEntry.createWriter(onFileWriterSuccess, onerror);
    }

    function onFileWriterSuccess(writer) {
        //  log("fileName="+writer.fileName+";fileLength="+writer.length+";position="+writer.position);  
        writer.onwrite = function (evt) {//当写入成功完成后调用的回调函数  
            console.log("write down");
            fuc;
        };
        writer.onerror = function (evt) {//写入失败后调用的回调函数  
            console.log("write error");
        };
        writer.onabort = function (evt) {//写入被中止后调用的回调函数，例如通过调用abort()  
            console.log("write abort");
        };
        // 快速将文件指针指向文件的尾部 ,可以append  
        //  writer.seek(writer.length);   
        writer.write(date);//向文件中写入数据  
        //  writer.truncate(11);//按照指定长度截断文件  
        //  writer.abort();//中止写入文件  
    }
}


////////////////////////////////////////////////////////////////////////////////
//文件列表

listFile = function (fuc) {
    var fuc = fuc;
    var dir;
    var directory = "hejiadan";
    var fileEntry;
    var files;
    
    window.requestFileSystem(app.dir.PERSISTENT, 0, onFileSystemSuccess, onerror);
        
    function onFileSystemSuccess(fileSystem) {
        dir = fileSystem.root.getDirectory(directory, {
            create: false,
            exclusive: false
        }, onDirectorySuccess, onerror);
    }

    function onDirectorySuccess(dir) {
        fileEntry = dir.createReader();
        files = fileEntry.readEntries(onFileSuccess, onerror);       //readEntries取得dir对象目录属性下的文件对象
    }

    function onFileSuccess(files) {
        //console.log(this.ls);
        var k = [];
        for (var i = 0; i < files.length; i++) {
            k.push(files[i].name);
        }
        //console.log(k);
        fuc(k);
    }
}


////////////////////////////////////////////////////////////////////////////////
//读取文件
readFile = function (filename,fuc) {
    var filename = filename;
    var fuc = fuc;
    var storeNotification = "on";//data read  
    var filePath = 'hejiadan/' + filename;//default file path 

    window.requestFileSystem(app.dir.PERSISTENT, 0, gotFS, onerror);

    function gotFS(fileSystem) {
        fileSystem.root.getFile(filePath, {
            create: true,
            exclusive: false
        }, gotFileEntry, onerror);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, onerror);
    }

    function gotFile(file) {
        readAsText(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {

            storeNotification = evt.target.result;//将读取到的数据赋值给变量  
            if (storeNotification == null || storeNotification.length == 0) {
                storeNotification = "on";
            }
            console.log(storeNotification);
            fuc();
        };
        reader.readAsText(file);

    }
}

////////////////////////////////////////////////////////////////////////////////
//删除文件

var delFile = function (filename,fuc) {
    var filename = filename;
    var fuc = fuc;

    window.requestFileSystem(app.dir.PERSISTENT, 0, reFileSystem, onerror);

    function reFileSystem(fs) {
        //console.log(fs);
        fs.root.getFile('hejiadan/' + filename, {create: false, exclusive: false}, reFile, onerror);
    }

    function reFile(fileEntry) {
        //console.log(fileEntry);
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        //writeFile(fileEntry, null);
        fileEntry.remove(function(){console.log("ok"),fuc()},onerror);
    }
    

}





