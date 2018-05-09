/**
 * 
 */
//在刷新或关闭时调用的事件

$(window).bind('beforeunload',function(){
   $.ajax({
       url:base+"user/logout",
       type:"post",
       success:function(){
           //alert("您已退出登录");
       }
   });
});