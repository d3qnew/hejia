
var sendMail = function (mailname) {
    var sname = mailname;
    var fullname = app.datadir + 'hejiadan/' + sname;

    cordova.plugins.email.isAvailable(
            function (isAvailable) {
                if (!isAvailable) {
                    alert("访问email权限被禁止，请设置您的手机");
                } else {
                    cordova.plugins.email.open({
                        attachments: fullname,
                    });
                }
            }
    );
}



/*
 * cordova.plugins.email.open({
 to:      'max@mustermann.de',
 cc:      'erika@mustermann.de',
 bcc:     ['john@doe.com', 'jane@doe.com'],
 subject: 'Greetings',
 body:    'How are you? Nice greetings from Leipzig'
 });
 */