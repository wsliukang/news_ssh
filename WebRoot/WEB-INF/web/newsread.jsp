<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<title>新闻阅读</title>

<meta name="keywords" content="keyword1,keyword2,keyword3">
<meta name="description" content="this is my page">
<meta name="content-type" content="text/html; charset=UTF-8">

<link rel="shortcut icon" href="<%=basePath%>include/img/ico.jpg">
<link rel="stylesheet" href="<%=basePath%>include/css/themes/icon.css">
<link rel="stylesheet"
	href="<%=basePath%>include/css/themes/default/easyui.css">

<link rel="stylesheet"
	href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="<%=basePath%>include/js/jquery.min.js"></script>
<script
	src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	
 	<script  src="<%=basePath%>include/js/jquery.easyui.min.js"></script>
	<script  src="<%=basePath%>include/js/easyui-lang-zh_CN.js"></script>
</head>


<body style="background-color: #eee;">
<nav class="navbar navbar-default navbar-fixed-top">
	<div
		style="background:#DCDDD9;padding:0 10px 0 10px;vertical-align: middle;">
		<img src="<%=basePath%>include/img/ico.jpg" width="50" height="50" />
		<div
			style="float:right;line-height:50px;margin-right:10px;font-size: 9pt;">
			<span> 【 </span><a style="color:blue;"
				href="javascript:window.opener=null;window.open('','_self');window.close(); " ><span>
					关 闭 窗 口 </span></a><span>】 </span>
		</div>
	</div>
	</nav>
	<div class="container" style="margin-top:80px;background-color: #fff; border: 1px;border-radius: 10px; box-shadow: 1px -1px 10px 1px;">
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
			<div class="ndetail">
				<div class="ntitle">
					<h1 class="text-center">${news.title}</h1>
				</div>
				<div class="nauthor">
					<h4 class="text-center">
						<div>
							来源: &nbsp;<strong><s:property value="news.cruser" /></strong> &nbsp;&nbsp; 发 布 时 间
							:&nbsp; <strong><s:date name="news.tjdate" format="yyyy-MM-dd"/></strong>&nbsp;&nbsp;
							访 问 量 :&nbsp; <strong>[<span><s:property value="news.hitnum" /></span>]
							</strong>
						</div>
						</h1>
						<hr />
				</div>
				<div class="nbody">
					<div id="vsb_content"><s:property value="news.content" escape="false"/></div>
				</div>
			</div>
		</div>
	</div>
	
</div>


	<style>
#backtotop {
	width: 24px;
	color: white;
	padding: 12px 0px 12px 5px;
	display: none;
	position: fixed;
	cursor: pointer;
	text-align: center;
	z-index: 20;
	background-color: rgba(0, 188, 212, 0.65);
	border-radius: 12px 0px 0px 12px;
}
</style>
	<div id="backtotop" style="right: 0px; display: none;">回到顶部</div>
	<script>
		var $backtotop = $('#backtotop');
		var toplrw = $(window).height() - $backtotop.height() - 200;
		function moveBacktotop() {
			if (toplrw < 0)
				toplrw = 0;
			$backtotop.css({
				top : toplrw,
				right : 0
			});
		}
		$backtotop.click(function() {
			$('html,body').animate({
				scrollTop : 0
			});
			return false;
		});
		$(window).scroll(function() {
			var windowHeight = $(window).scrollTop();
			if (windowHeight > 200) {
				$backtotop.fadeIn();
			} else {
				$backtotop.fadeOut();
			}
		});
		moveBacktotop();
		$(window).resize(moveBacktotop);
	</script>
</body>

<script src="<%=basePath%>include/js/jquery.min.js"></script>
<script src="<%=basePath%>include/js/jquery.easyui.min.js"></script>
<script src="<%=basePath%>include/js/easyui-lang-zh_CN.js"></script>
<script src="<%=basePath%>include/js/canvas.js"></script>

</html>
