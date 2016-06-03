function v_showfile(arr) {
    var arr = arr;
    var x = 1;
    $("#filelistonclick").html("");


    for (var i in arr) {
        $("#filelistonclick").append('<tr><td>' + x + '</td><td class = "tdclick">' + arr[i] + '</td></tr>');
        x++;
    }

    $(".tdclick").click(function () {
        var filename = $(this).text();
        navigator.notification.confirm(
                filename, // message
                backalert, // callback to invoke with index of button pressed
                '操作核价单：', // title
                ['发送', '删除', '查看']     // buttonLabels
                );

        //////////////////////////////////////////////////////////////////////
        //callback

        function backalert(index1) {

            switch (index1) {
                case 0:

                    break;
                case 1: //发送文件
                    sendMail(filename);
                    break;

                case 2: //删除文件    
                    navigator.notification.confirm(                //再次确认删除
                            filename, // message
                            deletefile, // callback to invoke with index of button pressed
                            '确认删除？', // title
                            ['确认', '取消']     // buttonLabels
                            );
                    break;

                case 3:
                    readFile(filename,list.e);
//                    navigator.notification.alert("查看");
                    break;

            }

        }
        
        function deletefile(index2) {                   //删除文件
            if (index2 == 1) {
                delFile(filename, n());
            }
        }
    });





}




/*
 * 
 
 function alertDismissed() {
 // do something
 }
 
 navigator.notification.alert(
 'You are the winner!',  // message
 alertDismissed,         // callback
 'Game Over',            // title
 'Done'                  // buttonName
 );
 
 ///////////////////////////////////////////////////////
 
 function onConfirm(buttonIndex) {
 alert('You selected button ' + buttonIndex);
 }
 
 navigator.notification.confirm(
 'You are the winner!', // message
 onConfirm,            // callback to invoke with index of button pressed
 'Game Over',           // title
 ['Restart','Exit']     // buttonLabels
 );
 
 /////////////////////////////////////////////////////                
 
 function onPrompt(results) {
 alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
 }
 
 navigator.notification.prompt(
 'Please enter your name',  // message
 onPrompt,                  // callback to invoke
 'Registration',            // title
 ['Ok','Exit'],             // buttonLabels
 'Jane Doe'                 // defaultText
 );
 
 */