/**
 * JS使用的是GMT的时间格式，而在在服务器端 获取当前时间为CST的格式，在使用new Date(strDate)转换时，转换为GMT格式，出现了二者的日期和小时都出现了变动。
原始时间格式：Thu Aug 18 20:38:54 CST 2016
GMT时间格式：Fri Aug 19 2016 10:38:54 GMT+0800 (中国标准时间)
 转换时间格式：2016-08-19 10:38
解决方法是：对CST格式的时间字符串进行分段截取，重新拼接为GMT格式
GMT时间格式：Thu Aug 18 2016 20:38:54 GMT+0800 (中国标准时间)
 转换时间格式：2016-08-18 20:38:54
 */
 function getGMTTime(strDate) {   
    if(null==strDate || ""==strDate){  
        return "";  
    }  
    var dateStr=strDate.trim().split(" ");  
    var strGMT = dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";  
    var date = new Date(Date.parse(strGMT));  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();    
    minute = minute < 10 ? ('0' + minute) : minute;  
    var second = date.getSeconds();  
    second = second < 10 ? ('0' + second) : second;  
      
    return y+"-"+m+"-"+d+" "+h+":"+minute+":"+second;  
}; 