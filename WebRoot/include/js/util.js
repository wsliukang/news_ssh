$(function () {  
    //浏览器不支持 placeholder 时才执行  
    if (!('placeholder' in document.createElement('input'))) {  
        $('[placeholder]').each(function () {  
            var $tag = $(this); //当前 input  
            var $copy = $tag.clone();   //当前 input 的复制  
            if ($copy.val() == "") {  
                $copy.css("color", "#999");  
                $copy.val($copy.attr('placeholder'));  
            }  
            $copy.focus(function () {  
                if (this.value == $copy.attr('placeholder')) {  
                    this.value = '';  
                    this.style.color = '#000';  
                }  
            }); 
            $copy.keyup(function () { 
            	$tag.val(this.value);  
            });
            $copy.blur(function () {  
                if (this.value=="") {  
                    this.value = $copy.attr('placeholder');  
                    $tag.val("");  
                    this.style.color = '#999';  
                } else {  
                    $tag.val(this.value);  
                }  
            });  
            $tag.hide().after($copy.show());    //当前 input 隐藏 ，具有 placeholder 功能js的input显示  
        });  
    }  
}); 

/** 字符串实际长度，中文2，英文1
 * js截取字符串，中英文都能用 。如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
 * @param str：需要截取的字符串 
 * @param len: 需要截取的长度 
 */
function cutstr(str, len) {        
var str_len = str.replace(/[^\x00-\xff]/g, '__').length; //字符串实际长度，中文2，英文1.双字节全匹配         
if (str_len <= len)  return str;//如果给定字符串小于指定长度，则返回源字符串；
var str_cut = new String();
var str_length = 0;
for (var i = 0; str_length < len-3; i++) {
	a = str.charAt(i);
	str_length++;
	if (/[\u4e00-\u9fa5]/.test(a))  str_length++;
	str_cut = str_cut.concat(a);
}
str_cut = str_cut.concat("...");//返回截取指定长度的字符串拼上...
return str_cut;
}

$.extend($.fn.validatebox.defaults.rules, {
	equals: {
		validator: function(value,param){
			return value == $(param[0]).val();
		},
		message: '密码不一致.'
	},
	gtd: {
		validator: function(value, param){
			return value > $(param[0]).val();
		},
		message: '后一日期/时间必须大于前一日期/时间.'
	},
	gtmin: {
		validator: function(value, param){
			return value > param[0];
		},
		message: '该项最小值必须大于{0}.'
	}
	});