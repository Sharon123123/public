<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <title>书城后台系统管理</title>
    <link rel="stylesheet" href="../../css/plugins/bootstrap.css"/>
    <link rel="stylesheet" href="../../css/plugins/bootstrap-maizi.css"/>
    <link rel="stylesheet" href="../../css/plugins/bootstrapValidator.css">
</head>
<body>
<!--导航-->
<nav class="navbar navbar-default">
    <div class="container">
        <!--小屏幕导航按钮和logo-->
        <div class="navbar-header">
            <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a href="/adminIndex" class="navbar-brand">书城后台</a>
        </div>
        <!--小屏幕导航按钮和logo-->
        <!--导航-->
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="/adminIndex"><span
                        class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;首页</a></li>
                <li><a href="/adminUser_list"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;用户管理</a>
                </li>
                <li><a href="/admin_content"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;图书管理</a>
                </li>
                <li class="active"><a href="/admintag"><span
                        class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;标签管理</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <img src="../../images/fbi.png" class="img-circle"
                         style="width: 45px;height: 45px; margin-right: 10px;">
                    <span>${admin.aName}</span> &nbsp;
                </li>
                <li><a href="/admin/logout"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;退出</a></li>
            </ul>
        </div>
        <!--导航-->

    </div>
</nav>
<!--导航-->

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="page-header">
                <h1>图书标签管理</h1>
            </div>
            <div class="col-md-12 pad0">
                <form>
                    <div class="col-md-10">
                        <input id="bookTag" name="btName" class="form-control" placeholder="请输入要添加的标签">
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-default" id="addTag">添加</button>
                    </div>
                </form>
            </div>
            <div class="col-md-12 taglist">
                <c:if test="${not empty bookType }">
                    <c:forEach items="${bookType}" var="item">
                        <div class="alert alert-info alert-dismissible pull-left" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <strong>${item.btName.trim()}</strong>
                        </div>
                    </c:forEach>
                </c:if>
            </div>
        </div>
    </div>
</div>

<!--footer-->
<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <p>
                    Copyright © 2019-2019 书城 本站图书资源均来自互联网，仅供学习交流使用
                </p>
            </div>
        </div>
    </div>
</footer>
<!--footer-->


<script src="../../js/plugins/jquery-1.9.1.min.js"></script>
<script src="../../js/plugins/bootstrap.js"></script>
<script src="../../js/plugins/bootstrapValidator.js"></script>
<script src="../../js/admintag.js"></script>
</body>
</html>