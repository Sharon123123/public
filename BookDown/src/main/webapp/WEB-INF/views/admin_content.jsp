<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1 , user-scalable=no">
    <title>书城 后台管理</title>
    <link rel="stylesheet" href="../../css/plugins/bootstrap.css"/>
    <link rel="stylesheet" href="../../css/plugins/bootstrap-maizi.css"/>
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
                <li class="active"><a href="/admin_content"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;图书管理</a>
                </li>
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
                <a href="/admin_content" class="list-group-item active">图书明细</a>
                <a href="/admin_addcontent" class="list-group-item">添加图书</a>
            </div>
        </div>
        <div class="col-md-10">
            <div class="page-header">
                <h1>图书明细</h1>
            </div>
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="/admin_content">图书明细</a>
                </li>
                <li>
                    <a href="/admin_addcontent">添加图书</a>
                </li>
            </ul>
            <table class="table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>书名</th>
                    <th>作者</th>
                    <th>标签</th>
                    <th>评分</th>
                    <th>出版时间</th>
                    <th>添加时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach items="${allBook.lists}" var="item" varStatus="s">
                    <tr>
                        <th scope="row">${s.count}</th>
                        <td>${item.bName.trim()}</td>
                        <td>${item.bAuthor.trim()}</td>
                        <td>${item.bBooktag.trim()}</td>
                        <td>${item.bScore.trim()}</td>
                        <td>${item.bPublishing.trim()}</td>
                        <td>${item.bIntime.trim()}</td>
                        <td>
                            <div role="presentation" class="dropdown">
                                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="#"
                                        role="button" aria-haspopup="true" aria-expanded="false">
                                    操作<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a href="" id="${item.bId}" data-toggle="modal" class="editBook">编辑</a>
                                    </li>
                                    <li><a href="" id="${item.bId}" data-toggle="modal" class="delBook">删除</a>
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
                    <li><a href="/admin_content?pn=1">首页</a></li>
                    <c:choose>
                        <c:when test="${allBook.currPage !=1}">
                            <li class="prev-page"><a href='/admin_content?pn=${allBook.currPage-1}'>上一页</a></li>
                        </c:when>
                    </c:choose>

                    <c:choose>
                        <c:when test="${allBook.totalPage <=6}">
                            <%--1.总页数不足6页--%>
                            <c:set var="begin" value="1"/>
                            <c:set var="end" value="${allBook.totalPage}"/>
                        </c:when>
                        <c:otherwise>
                            <%--2.通过公式设置begin=当前页-3，end=当前页+3--%>
                            <c:set var="begin" value="${allBook.currPage-3}"/>
                            <c:set var="end" value="${allBook.currPage+3}"/>

                            <%--3. 开始页小于1，从新赋值begin=1，end=6--%>
                            <c:if test="${begin <1}">
                                <c:set var="begin" value="1"/>
                                <c:set var="end" value="6"/>
                            </c:if>
                            <%--4. 结束页大于总页数，重新赋值 begin=${bookPage.currPage-5},end=${bookPage.totalPage}--%>
                            <c:if test="${end >allBook.totalPage}">
                                <c:set var="begin" value="${allBook.totalPage-5}"/>
                                <c:set var="end" value="${allBook.totalPage}"/>
                            </c:if>
                        </c:otherwise>
                    </c:choose>

                    <%-- 获得begin 和 end 的值循环 --%>
                    <c:forEach begin="${begin}" end="${end}" var="i">
                        <c:choose>
                            <c:when test="${i eq allBook.currPage}">
                                <li class="active"><span>${i}</span></li>
                            </c:when>
                            <c:otherwise>
                                <li><a href="/admin_content?pn=${i}">${i}</a></li>
                            </c:otherwise>
                        </c:choose>
                    </c:forEach>
                    <%-- 显示点点--%>
                    <c:if test="${end <allBook.totalPage}">
                        <li><span>...</span></li>
                    </c:if>

                    <%--下一页--%>
                    <c:choose>
                        <c:when test="${allBook.currPage !=allBook.totalPage}">
                            <li class="next-page"><a href="/admin_content?pn=${allBook.currPage+1}">下一页</a></li>
                        </c:when>
                    </c:choose>
                    <%--末页--%>
                    <li><a href="/admin_content?pn=${allBook.totalPage}">末页</a></li>
                </ul>
            </nav>

            <%--编辑图书--%>
            <div class="modal fade " id="editModal" tabindex="-1" role="dialog" aria-labelledby="myLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                            </button>
                            <h4 class="modal-title" id="myLabel">更新图书信息</h4>
                        </div>
                        <div class="modal-body">
                            <form id="admin_edit_user" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" for="edbID" style="text-align: left">图书ID:</label>
                                    <div class="col-sm-5">
                                        <input type="text" id="edbID" name="bId"  class="form-control ">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-3 control-label" for="edbName" style="text-align: left">书名:</label>
                                    <div class="col-sm-5">
                                        <input type="text" id="edbName" name="bName" class="form-control ">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class=" col-sm-3 control-label" for="edbPhoto" style="text-align: left">图书页面：</label>
                                    <div class="col-sm-5">
                                        <img id="edbPhoto" class="img-rounded" style="width: 190px;height: 260px">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-3 control-label" for="edbAuthor" style="text-align: left">作者:</label>
                                    <div class="col-sm-5">
                                        <input type="text" id="edbAuthor" name="bAuthor" class="form-control ">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="edbDescripation" class="col-sm-3 control-label" style="text-align: left">图书简介:</label>
                                    <div class="col-sm-9">
                                        <textarea type="text" id="edbDescripation" name="bDescripation" class="form-control" rows="4"></textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edbTimes" class="col-sm-3 control-label" style="text-align: left">下载量:</label>
                                    <div class="col-sm-5">
                                        <input type="text" id="edbTimes" name="bTimes" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edbIntime" class="col-sm-3 control-label" style="text-align: left">添加时间:</label>
                                    <div class="col-sm-5">
                                        <input type="text" id="edbIntime" name="bIntime" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="edbBookTag" class=" col-sm-3 control-label" style="text-align: left">图书类型:</label>
                                    <div class="col-sm-5">
                                        <select id="edbBookTag" name="bBookTag" class="form-control span5">
                                            <%--动态添加标签--%>
                                        </select>
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
<script src="../../js/admin_content.js"></script>
</body>
</html>