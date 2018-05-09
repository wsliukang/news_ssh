<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
  <head>
    <title>修改新闻信息</title>
    
    <meta charset="UTF-8">
    
    <link rel="shortcut icon" href="<%=basePath%>include/img/ico.jpg">
	<link rel="stylesheet" href="<%=basePath%>include/css/themes/icon.css">
	<link rel="stylesheet" href="<%=basePath%>include/css/themes/default/easyui.css">
  
	<script src="<%=basePath%>include/js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>include/js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="<%=basePath%>include/js/easyui-lang-zh_CN.js"></script>
  	<script>var base="<%=basePath%>";</script>
	<script type="text/javascript" charset="utf-8"	src="<%=basePath%>include/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8"	src="<%=basePath%>include/ueditor/ueditor.all.js"></script>
	<script type="text/javascript" charset="utf-8"	src="<%=basePath%>include/ueditor/lang/zh-cn/zh-cn.js"></script>

</head>
<body>
	<div class="easyui-panel" title="修改新闻" >
		<div >
		
	  
	    	<table cellpadding="5" style="width:90%;">
	    		<tr>
	    			<td style="text-align:left;width:10%;">新闻标题:</td>
	    			<td><input class="easyui-textbox" type="text" id="title" data-options="required:true" style="width:100%;"></input></td>
	    		</tr>
	    		<tr>
	    			<td style="text-align:left;">新闻发布人:</td>
	    			<td><input class="easyui-textbox" type="text" id="cruser" data-options="required:true,validType:'email'" style="width:100%;"></input></td>
	    		</tr>
	    		<tr>
	    			<td style="text-align:left;">新闻内容:</td>
	    			<!-- <td><input class="easyui-textbox" type="text" id="content" data-options="required:true" style="width:100%;"></input></td> -->
					<td><script id="content" type="text/plain" style="width:89%;height:300px;"></script></td>
				</tr>
	    		
	    		
	    	</table>

	    <div style="text-align:center;padding:5px">
	    	<a id="savenews" style="width:132px;height:32px" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" >保存</a>
	  
	    </div>
	    </div>
	</div>



<script>
var ue;
$(function(){
	
	ue = UE.getEditor('content');
		$("#title").textbox("setValue", "${news.title}");
		ue.ready(function() {
			ue.setContent("");
			ue.execCommand('insertHtml', '${news.content}');
		});
		$("#cruser").textbox("setValue", "${news.cruser}");
		$('#savenews').click(
				function() {//发布新闻前，要校验
					var a = $("#title").textbox("getValue");
					var b = ue.getContent();
					var c = $("#cruser").textbox("getValue");
					if (a.length <= 0) {
						$.messager.alert("系统提示", "必须填写新闻标题", "warning");
						return;
					}
					if (b.length <= 0) {
						$.messager.alert("系统提示", "必须填写新闻内容", "warning");
						return;
					}
					if (c.length <= 0) {
						$.messager.alert("系统提示", "必须填写发布人姓名或者发布机构名称","warning");return;}
					$.ajax({
						type : 'POST',
						url : "<%=basePath%>saveEditNews",
						data : {
							"news.title" : a,
							"news.content" : b,
							"news.cruser" : c,
							"news.id" : ${news.id}
						},
						success : function(res) {
							if (res == "true") {
								parent.$.messager.alert("系统提示", "你已修改新闻:"+ $("#title").val(), "info");
							} else {
								parent.$.messager.alert("系统提示", "修改失败！ ","error");
							}
							return false;
						},
						error : function(res) {
							parent.$.messager.alert("系统提示", "系统错误！", "error");
						}
					});
				});
	});
</script>

</body>

<script>

</script>
</html>
