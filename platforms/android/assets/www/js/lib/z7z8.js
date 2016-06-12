//判断是否为数组

function isArray(obj) {

    return Object.prototype.toString.call(obj) === '[object Array]';

}

function in_array(i,arr) {
    for (x in arr) {
        if (arr[x] == i) {
            return true;            
        }        
    } return false;
}