<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page language="java" pageEncoding="utf-8" %>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
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
                <li class="active"><a href="/adminIndex"><span
                        class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;首页</a></li>
                <li><a href="/adminUser_list"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;用户管理</a></li>
                <li><a href="/admin_content"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;图书管理</a></li>
                <li><a href="/admintag"><span class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;标签管理</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <img src="../../images/fbi.png" class="img-circle"
                         style="width: 45px;height: 45px; margin-right: 10px;">
                    <span>${admin.aName}</span>
                </li>


                <li><a href="/admin/logout"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;退出</a></li>
            </ul>
        </div>
        <!--导航-->

    </div>
</nav>
<!--导航-->

<!--警告框-->
<div class="container">
    <div class="row">

        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">网站用户数据统计</div>
                <div class="panel-body">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>统计项目</th>
                            <th>当前数量</th>
                        </tr>
                        </thead>
                        <tbody id="userNum"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="portlet box blue">

                <div class="portlet-title">
                    <div class="caption"><i class="icon-reorder"></i>图书类型</div>
                </div>

                <div class="portlet-body">
                    <div id="interactive" class="chart"></div>
                </div>

            </div>


        </div>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">近三周用户访客统计</div>
                <div class="panel-body">
                    <canvas id="canvas" class="col-md-12"></canvas>
                </div>
            </div>
        </div>
        <%-- 服务器状态 --%>
        <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">服务器状态</div>
                <div class="panel-body">
                    <p>内存使用率：30%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                             aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div>
                    </div>
                    <p>数据库使用率：15%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
                             aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style="width: 15%"></div>
                    </div>
                    <p>磁盘使用率：30%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"
                             aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div>
                    </div>
                    <p>CPU使用率：40%</p>
                    <div class="progress">
                        <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"
                             aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"></div>
                    </div>
                </div>
            </div>
        </div>

        <%-- 留言板--%>
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">留言板</div>
                <div class="panel-body">
                    <div class="col-md-7">
                        <div class="media well">
                            <div class="media-left">
                                <img class="img-rounded" src="../../images/love.png" alt="技术大哥">
                            </div>
                            <div class="media-body">
                                It's not about how badly you want something. It's about what you are capable of !
                                <blockquote>
                                    <small class="pull-right"><cite title="《疯狂动物城》">《疯狂动物城》</cite></small>
                                </blockquote>

                            </div>
                        </div>
                        <div class="media well">
                            <div class="media-body text-right">
                                Don't hide, don't be afraid of the dark,follow the lights,then you can find tomorrow.
                                <blockquote>
                                    <small class="pull-left"><cite title="《疯狂原始人》">《疯狂原始人》</cite></small>
                                </blockquote>
                            </div>
                            <div class="media-right">
                                <img class="img-rounded" src="../../images/weather.png" alt="技术大哥">
                            </div>
                        </div>
                        <div class="media well">
                            <div class="media-left">
                                <img class="img-rounded" src="../../images/smile.png" alt="技术大哥">
                            </div>
                            <div class="media-body">
                                I love it when I catch you looking at me then you smile and look away
                                <blockquote>
                                    <small class="pull-right"><cite title="匿名">匿名</cite></small>
                                </blockquote>

                            </div>
                        </div>
                        <div class="media well">
                            <div class="media-body text-right">
                                当时我的心一直像小鹿乱撞，那应该是我这辈子最性感的一刻了，至少在此之前没有过。
                                <blockquote>
                                    <small class="pull-left"><cite title="《疯狂原始人》">一位不知名人士</cite></small>
                                </blockquote>
                            </div>
                            <div class="media-right">
                                <img class="img-rounded" src="../../images/sky.png">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">团队联系手册</div>
                            <div class="panel-body">
                                <ul class="list-group">
                                    <li class="list-group-item">站长(404)：<span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;13134848615
                                    </li>
                                    <li class="list-group-item">技术(别松手)：<span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;13456127694
                                    </li>
                                    <li class="list-group-item">推广(你来呀)：<span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;13457815482
                                    </li>
                                </ul>
                            </div>
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
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="../../js/plugins/Chart.js"></script>
<script src="../../js/adminIndex.js"></script>
</body>
</html>