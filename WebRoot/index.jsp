<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
<head>
  <meta name="keywords" content="keyword1,keyword2,keyword3">
  <meta name="description" content="this is my page">
  <meta name="content-type" content="text/html; charset=UTF-8">
  <title>首页</title>

 	<link rel="shortcut icon" href="include/img/ico.jpg">
    <link rel="stylesheet" href="include/css/style.css">
	<link rel="stylesheet" href="include/css/themes/icon.css">
	<link rel="stylesheet" href="include/css/themes/default/easyui.css">

	<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<body>
<div class="container" style="margin-top:100px;">
<div class="row">
<div class="panel panel-info">
	<div class="panel-heading">
		<h3 class="panel-title">通知新闻：</h3>
	</div>
	<div class="panel-body">
		<div id="lnews" class="l-wrap">
		<div>
			<div>
				<div class="l-news">
					
					<div class="nlist">
						<table id="newstable" width="100%">
							<tbody>
								<tr id="trpp">
									<td colspan="2" align="left"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="pp" style="background:#efefef; display: block;">
					</div>
				</div>
			</div>
		</div>
	</div>

	<div style="float:right;padding-right:20px;">
		<a id="a" href="login.jsp" style="margin-right:15px;" class="easyui-linkbutton" data-options="iconCls:'icon-redo'">登录</a> <!-- <a id="b"
			href="#">新闻</a> -->
	</div>
	</div>
</div>
</div>
</div>


	<script src="include/js/jquery.min.js"></script>
    <script src="include/js/index.js"></script>
	<script src="include/js/login.js"></script>
	<script src="include/js/easyui-lang-zh_CN.js"></script>
	<script src="include/js/jquery.easyui.min.js"></script>
	<script src="include/js/canvas.js"></script>


</body>
</html>