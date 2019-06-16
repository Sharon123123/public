<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <title>用户管理</title>
    <link rel="stylesheet" href="../../css/plugins/bootstrap-maizi.css"/>
    <link rel="stylesheet" href="../../css/plugins/bootstrap.min.new.css"/>
    <link rel="stylesheet" href="../../css/plugins/bootstrapValidator.css">
    <link rel="stylesheet" href="../../css/plugins/bootstrap-fileupload.css">

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
                <li class="active"><a href="/adminUser_list"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;用户管理</a>
                </li>
                <li><a href="/admin_content"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;图书管理</a></li>
                <li><a href="/admintag"><span class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;标签管理</a></li>
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
        <div class="col-md-2">
            <div class="list-group">
                <a href="/adminUser_list" class="list-group-item active">用户管理</a>
                <a href="" role="button" class="list-group-item" data-toggle="modal" data-target="#myModal">添加用户</a>
            </div>
        </div>
        <div class="col-md-10">
            <div class="page-header">
                <h1>用户管理</h1>
            </div>
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="/adminUser_list">用户列表</a>
                </li>
                <li>
                    <a href="" role="button" data-toggle="modal" data-target="#myModal">添加用户</a>
                </li>
            </ul>
            <table class="table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>手机号</th>
                    <th>邮箱</th>
                    <th>用户类型</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${pageUser.lists}" var="item" varStatus="s">
                    <tr>
                        <th scope="row">${s.count}</th>
                        <td>${item.uId}</td>
                        <td>${item.uName}</td>
                        <td>${item.uPhone}</td>
                        <td>${item.uEmail}</td>
                        <td>${item.uTypeid}</td>
                        <td>
                            <div role="presentation" class="dropdown">
                                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#"
                                        role="button" aria-haspopup="true" aria-expanded="false">
                                    操作<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a href="" id="${item.uId}" data-toggle="modal" class="editUser">编辑</a>
                                    </li>
                                    <li><a href="" id="${item.uId}" data-toggle="modal" class="delUesr">删除</a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>

            <%-- 分页 --%>
            <nav class="pull-right">
                <ul class="pagination">
                    <li><a href="/adminUser_list?pn=1">首页</a></li>
                    <c:choose>
                        <c:when test="${pageUser.currPage !=1}">
                            <li class="prev-page"><a href='/adminUser_list?pn=${pageUser.currPage-1}'>上一页</a></li>
                        </c:when>
                    </c:choose>

                    <c:choose>
                        <c:when test="${pageUser.totalPage <=6}">
                            <%--1.总页数不足6页--%>
                            <c:set var="begin" value="1"/>
                            <c:set var="end" value="${pageUser.totalPage}"/>
                        </c:when>
                        <c:otherwise>
                            <%--2.通过公式设置begin=当前页-3，end=当前页+3--%>
                            <c:set var="begin" value="${pageUser.currPage-3}"/>
                            <c:set var="end" value="${pageUser.currPage+3}"/>

                            <%--3. 开始页小于1，从新赋值begin=1，end=6--%>
                            <c:if test="${begin <1}">
                                <c:set var="begin" value="1"/>
                                <c:set var="end" value="6"/>
                            </c:if>
                            <%--4. 结束页大于总页数，重新赋值 begin=${bookPage.currPage-5},end=${bookPage.totalPage}--%>
                            <c:if test="${end >pageUser.totalPage}">
                                <c:set var="begin" value="${pageUser.totalPage-5}"/>
                                <c:set var="end" value="${pageUser.totalPage}"/>
                            </c:if>
                        </c:otherwise>
                    </c:choose>

                    <%-- 获得begin 和 end 的值循环 --%>
                    <c:forEach begin="${begin}" end="${end}" var="i">
                        <c:choose>
                            <c:when test="${i eq pageUser.currPage}">
                                <li class="active"><span>${i}</span></li>
                            </c:when>
                            <c:otherwise>
                                <li><a href="/adminUser_list?pn=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <%-- 显示点点--%>
                    <c:if test="${end <pageUser.totalPage}">
                        <li><span>...</span></li>
                    </c:if>

                    <%--下一页--%>
                    <c:choose>
                        <c:when test="${pageUser.currPage !=pageUser.totalPage}">
                            <li class="next-page"><a href="/adminUser_list?pn=${pageUser.currPage+1}">下一页</a></li>
                        </c:when>
                    </c:choose>
                    <%--末页--%>
                    <li><a href="/adminUser_list?pn=${pageUser.totalPage}">末页</a></li>
                </ul>
            </nav>
        </div>
    </div>
</div>


<%--编辑用户--%>
<div class="modal fade " id="editModal" tabindex="-1" role="dialog" aria-labelledby="myLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myLabel">编辑用户</h4>
            </div>
            <div class="modal-body">
                <form id="admin_edit_user" class="form-horizontal">

                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="eduID" style="text-align: left">用户ID:</label>
                        <div class="col-sm-5">
                            <input type="text" id="eduID" name="uId"  class="form-control ">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class=" col-sm-3 control-label" for="eduPhoto" style="text-align: left">用户头像：</label>
                        <div class="col-sm-5">
                            <img id="eduPhoto" class="img-rounded" style="width: 100px;height: 100px">
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label" for="eduName" style="text-align: left">用户名:</label>
                        <div class="col-sm-5">
                            <input type="text" id="eduName" name="uName" class="form-control ">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="eduEmail" class="col-sm-3 control-label" style="text-align: left">请输入用户邮箱</label>
                        <div class="col-sm-5">
                            <input type="email" id="eduEmail" name="uEmail" class="form-control">
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="eduTypeid" class=" col-sm-3 control-label" style="text-align: left">用户类型</label>
                        <div class="col-sm-5">
                            <select id="eduTypeid" name="uTypeid" class="form-control span5 Typeid">

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="eduPhone" class="col-sm-3 control-label" style="text-align: left">请输入用户手机号</label>
                        <div class="col-sm-5">
                            <input type="text" id="eduPhone" name="uPhone" class="form-control span5">
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="editSubmit">更新信息</button>
            </div>
        </div>
    </div>
</div>

<!-- 添加用户 -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">添加用户</h4>
            </div>
            <div class="modal-body">
                <form id="admin_add_user" class="form-horizontal" >
                    <div class="control-group">
                        <label class="control-label col-sm-3" style="text-align: left">用户头像：</label>
                        <div class="controls">
                            <div class="fileupload fileupload-new" data-provides="fileupload">
                                <div class="fileupload-new thumbnail" style="width: 150px; height: 150px;">
                                    <img src="" alt=""/>
                                </div>
                                <div class="fileupload-preview fileupload-exists thumbnail"
                                     style="max-width: 150px; max-height: 150px; line-height: 20px;"></div>
                                <div style="margin-left: 150px;">
													<span class="btn btn-file">
                                                        <span class="fileupload-new">选择图片</span>
													    <span class="fileupload-exists">更换</span>
													    <input type="file" name="uPhoto" id="adduPhoto" class="default"/>
                                                    </span>
                                    <a href="#" class="btn fileupload-exists" id="uploadImage">上传</a>
                                    <%--隐藏图片上传成功 传回来的地址--%>
                                    <input type="text" id="hiddenImg" name="uPhoto" style="display: none">
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="adduName" class="col-sm-3 control-label" style="text-align: left">用户名:</label>
                        <div class="col-sm-5">
                            <input type="text" id="adduName" name="uName" class="form-control "
                                   placeholder="用户名有2-4个字符组成">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="adduPwd" class="col-sm-3 control-label" style="text-align: left">密码:</label>
                        <div class="col-sm-5">
                            <input type="password" id="adduPwd" name="uPwd" class="form-control " placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="adduName" class="col-sm-3 control-label" style="text-align: left">确认密码:</label>
                        <div class="col-sm-5">
                            <input type="password" id="addurPwd" name="confirmPwd" class="form-control "
                                   placeholder="请再次输入密码">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="adduEmail" class="col-sm-3 control-label" style="text-align: left">请输入用户邮箱：</label>
                        <div class="col-sm-5">
                            <input type="email" id="adduEmail" name="uEmail" class="form-control">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="adduEmail" class="col-sm-3 control-label" style="text-align: left">性别：</label>
                        <div class="col-sm-5 controls">
                            <label class="radio">
                                <div class="radio">
                                    <span>
                                        <input name="uSex" type="radio" value="1" checked>男
                                    </span>
                                </div>
                            </label>
                            <label class="radio">
                                <div class="radio">
                                    <span>
                                        <input name="uSex" type="radio" value="0">女
                                    </span>
                                </div>
                            </label>

                        </div>
                    </div>

                    <div class="form-group">
                        <label for="adduTypeid" class=" col-sm-3 control-label" style="text-align: left">用户类型：</label>
                        <div class="col-sm-5">
                            <select id="adduTypeid" name="uTypeid" class="form-control span5 Typeid">

                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="adduPhone" class="col-sm-3 control-label" style="text-align: left">请输入用户手机号</label>
                        <div class="col-sm-5">
                            <input type="text" id="adduPhone" name="uPhone" class="form-control span5">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="addCommint">添加用户</button>
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
<script src="../../js/plugins/bootstrap-fileupload.js"></script>
<script src="../../js/admin_user.js"></script>

</body>
</html>