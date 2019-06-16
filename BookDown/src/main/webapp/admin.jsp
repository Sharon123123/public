<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>管理员登录</title>

    <script src='./js/plugins/jquery-1.9.1.min.js' type='text/javascript'></script>
    <link href="./css/plugins/bootstrap.css" rel="stylesheet">
    <link href="./css/plugins/bootstrapValidator.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="./css/admin.css" rel="stylesheet">
    <script src="./js/plugins/bootstrap.js" type="text/javascript"></script>
    <script src="./js/plugins/bootstrapValidator.js" type="text/javascript"></script>
    <script type="text/javascript" src="./js/admin.js"></script>

</head>
<body>

<div class="container">
    <div class="form row">
        <h3 class="form-title col-md-offset-3">书城 后台管理员登录</h3>
        <form method="post" action="/admin/login" class="form-horizontal col-sm-offset-3 col-md-offset-3"
              id="login_form">


            <div class="col-sm-10 col-md-10">

                <div class="form-group">
                    <i class="fa fa-user fa-lg "></i>
                    <input class="form-control " type="text" placeholder="用户名" name="aName"/>
                </div>
                <div class="form-group">
                    <i class="fa fa-lock fa-lg "></i>
                    <input class="form-control required" type="password" placeholder="请输入密码" name="aPwd"/>
                </div>
                <div class="form-group">
                    <hr/>
                    <a href="#myModal" id="btnshow" data-toggle="modal" data-target=".bs-example-modal-lg"
                       class="btn default fileinput-exists">没有账号？前往去注册</a>
                </div>
                <div class="form-group">
                    <%--<input type="submit" class="btn btn-success  " value="登录 "/>--%>
                    <button type="button" id="btn_login" class="btn btn-success  btn-block"> 登 录</button>


                </div>
            </div>
        </form>
    </div>

    <div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">用户注册</h4>
                </div>
                <div class="modal-body">

                    <div class="form row">
                        <form class="form-horizontal" id="register_form">
                            <div class="form-group">
                                <i class="fa fa-user fa-lg"></i>
                                <input class="form-control required" type="text" placeholder="用户名"
                                       name="aName"
                                       autofocus="autofocus"/>

                            </div>
                            <div class="form-group">
                                <i class="fa fa-lock fa-lg"></i>
                                <input class="form-control required" type="password" placeholder="你的密码"
                                       id="register_password"
                                       name="aPwd"/>
                            </div>
                            <div class="form-group">
                                <i class="fa fa-check fa-lg"></i>
                                <input class="form-control required" type="password"
                                       placeholder="再次输入你的密码"
                                       name="rpassword"/>
                            </div>
                            <div class="form-group">
                                <input type="button" id="btn_register" class="btn btn-success  btn-sm btn-block"
                                       value="注 册 "/>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <%--<button type="button" class="btn btn-primary">提交更改</button>--%>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>


</div>
</body>
</html>
