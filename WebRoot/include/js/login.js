var bver,role="5",base="./";
var pageN=1,pageTotal=100;
$(function(){
    $.ajax({
        url:base+"getCountNews",
        type:"post",
        success: function(res){
            var c=parseInt(res.newscount);
            pageTotal=c;            
            listNews(1,10);loadPager();         
        },
        error:function(res){
            $.messager.alert('系统提示','系统错误!','error');
        }
    }); 
});
function listNews(pageNumber,pageSize){
    $.ajax({
        url:base+"listNews",
        data:{"s_name":"","page":pageNumber,"rows":pageSize},
        type:"post",
        success: function(res){
            $(".inews").remove();
            if(res.total<=0){
                var tr="<tr class='inews' height=\"25\"><td >";
                    tr+="<div class='t'>暂无相关新闻</div>";
                    tr+="</td><td width='1%' nowrap=''><span >&nbsp;</span></td></tr>";
                $("#trpp").before(tr);
            }
            else {
            pageN=pageNumber;
            pageTotal=res.total;
            var rows=res.rows;
                for(var i=0;i<rows.length;){ 
                    var row=rows[i];
                    var tr="<tr class='inews' height=\"25\"><td >";
                        tr+="<div class='t'><a href='"+base+"getNews?id="+row.id+"' target='_blank'>"+cutstr(row.title,29)+"</a></div>";
                        //日期格式的处理方法，在下文提供。
                        tr+="</td><td width='1%' nowrap=''><span >"+(new Date(row.tjdate).Format("yyyy-MM-dd"))+"&nbsp;</span></td></tr>";
                    $("#trpp").before(tr);
                    i++;
                    if(i%5==0){
                        tr="<tr class='inews' height='1'><td colspan='2' align='center'>";
                        tr+="<hr style='border-style:dashed;border-color:#999999;width:99%;height:1px;border-width:1px 0px 0px 0px;visibility:inherit'></td></tr>";
                        $("#trpp").before(tr);
                    }
                }
            }
        },
        error:function(res){
            $.messager.alert('系统提示','系统错误!','error');
        }
    })
}
function loadPager(){
    $('#pp').pagination({
        total:pageTotal,
        pageSize:10,
        pageNumber:pageN,
        layout:['list','sep','first','prev','links','next','last'],
        links:5,
        displayMsg:'{from}/{to} 共{total}条',
        onSelectPage:function(pageNumber, pageSize){
            listNews(pageNumber,pageSize);
        }
    });
}
$(document).ready(function () {
    $('#login_form input').keydown(function (e) {
        if (e.keyCode == 13)
        {
            checkUserName();//$('#login_submit').click();
        }
    }); 
    $("#login_submit").click(checkUserName); 
   /* bver=(CKobject.Platform()+' '+CKobject.browser()['B']+' v'+CKobject.browser()['V']);
    if(bver.indexOf("IE v7.0")>0) $("#bver").html("您现在使用的浏览器是IE v7.0内核，版本太低，建议切换到极速模式或更换浏览器。");
    else $("#bver").html("");*/

});
function checkUserName()//登录前，校验用户信息
{    
      var a=$('#uid').val();
      var b=$('#pwd').val();
      if(a==""){$.messager.alert('系统提示',"请输入用户名",'warning');return;      }
      var re=/^\d{4}$|^\d{8}$|^\d{11}$/;
      if(!re.test(a)){$.messager.alert('系统提示',"用户名格式错误",'warning');return;     }
      if(b==""||b==undefined){$.messager.alert('系统提示',"请输入登录密码",'warning');return;}

      $.ajax({
            url : base+"userlogin",
            data :{"uid":a,"pwd":b},
            type:"POST",
            success : function (res) {
              if (res.ok) {
                    window.location.href=base+res.msg;
              }else {             
                  $.messager.alert('系统提示',res.msg,'error');
              }
              return false;
            },
            error : function(res) {$.messager.alert('系统提示','系统错误!','error');      }
      });
}