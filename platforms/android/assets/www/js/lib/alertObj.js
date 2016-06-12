/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function alertObj(obj) {
    var output = "";
    

    function xunhuan(obj) {
        
        for (var i in obj) {

            if (typeof (obj[i]) == 'object') {
                 xunhuan(obj); 
                
            } else {                
                output += i + " = " + obj[i] + "\n";
            }
            
        }
    }
	
    xunhuan(obj);
	 
	navigator.notification.alert(output);
}