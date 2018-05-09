<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html >
<head>
 
  <meta name="keywords" content="keyword1,keyword2,keyword3">
  <meta name="description" content="this is my page">
  <meta name="content-type" content="text/html; charset=UTF-8">
  <title>首页</title>

 	<link rel="shortcut icon" href="include/img/ico.jpg">
    <link rel="stylesheet" href="include/css/style.css">
	<link rel="stylesheet" href="include/css/themes/icon.css">
	<link rel="stylesheet" href="include/css/themes/default/easyui.css">
</head>

<body>
   <main>
        <form class="form" id="login_form" method="post" onsubmit="return false">
            <div class="form__cover"></div>
            <div class="form__loader">
                <div class="spinner active">
                    <svg class="spinner__circular" viewBox="25 25 50 50">
                        <circle class="spinner__path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </div>
            <div class="form__content">
                <h1>在线考试登录</h1>
                <div class="styled-input">
                    <input type="text" class="styled-input__input" name="nickname" id="uid">
                    <div class="styled-input__placeholder">
                        <span class="styled-input__placeholder-text">用户名</span>
                    </div>
                    <div class="styled-input__circle"></div>
                </div><div class="styled-input">
                     <input type="password" class="styled-input__input" id="pwd">
                    <div class="styled-input__placeholder">
                        <span class="styled-input__placeholder-text">密码</span>
                    </div>
                    <div class="styled-input__circle"></div>
                </div>
                <button type="button" class="styled-button" id="login_submit">
                    <span class="styled-button__real-text-holder">
                        <span class="styled-button__real-text">登录</span>
                        <span class="styled-button__moving-block face">
                            <span class="styled-button__text-holder">
                                <span class="styled-button__text">登录</span>
                            </span>
                        </span><span class="styled-button__moving-block back">
                            <span class="styled-button__text-holder">
                                <span class="styled-button__text">登录</span>
                            </span>
                        </span>
                    </span>
                </button>
            </div>

        </form>
    </main>
 	

 	<script src="include/assets/js/jquery-1.11.1.min.js"></script>
 	<script src="include/assets/js/jquery.backstretch.min.js"></script>
    <script src="include/js/index.js"></script>
	<script src="include/js/login.js"></script>
	<script src="include/js/easyui-lang-zh_CN.js"></script>
	<script src="include/js/jquery.easyui.min.js"></script>
</body>
</html>
