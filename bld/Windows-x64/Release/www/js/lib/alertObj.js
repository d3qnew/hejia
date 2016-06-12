/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function alertObj(obj){
	var output = "";
	for(var i in obj){  
		var property=obj[i];  
		output+=i+" = "+property+"\n"; 
	}  
	alert(output);
}