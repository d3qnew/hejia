$(document).ready(function () {
    $("#test1").click(function () {

        var rootDir = cordova.file.syncedDataDirectory;

        //console.log(window.requestFileSystem);

        window.requestFileSystem(1, 0, callbackdir, err);
        function callbackdir(fssystem) {
            fssystem.root.getDirectory("hejiadan", { create: true }, cback, err);

        }
        
        function cback(m) {
            console.log(m);
            
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



});