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
    <link rel="stylesheet" href="../../css/plugins/bootstrapValidator.css">
    <link rel="stylesheet" href="../../css/plugins/bootstrap-fileupload.css">
    <link rel="stylesheet" href="../../css/plugins/datepicker.css">
    <link rel="stylesheet" href="../../css/plugins/daterangepicker.css">
    <link rel="stylesheet" href="../../css/plugins/datetimepicker.css">

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
                <a href="/admin_content" class="list-group-item ">图书明细</a>
                <a href="/admin_addcontent" class="list-group-item active">添加图书</a>
            </div>
        </div>
        <div class="col-md-10">
            <div class="page-header">
                <h1>添加图书</h1>
            </div>
            <ul class="nav nav-tabs">
                <li>
                    <a href="/admin_content">图书明细</a>
                </li>
                <li class="active">
                    <a href="/admin_addcontent">添加图书</a>
                </li>
            </ul>
            <form id="admin_add_book" class="form-horizontal" style="margin-top: 20px;">

                <div class="form-group">
                    <label class="control-label col-sm-3" style="text-align: left">书的图片：</label>
                    <div class="col-sm-5">
                        <div class="fileupload fileupload-new" data-provides="fileupload">
                            <div class="fileupload-new thumbnail" style="width: 190px; height: 260px;">
                                <img src="" alt=""/>
                            </div>
                            <div class="fileupload-preview fileupload-exists thumbnail"
                                 style="max-width: 190px; max-height: 260px; line-height: 20px; "></div>
                            <div style="margin-left: 20px;">
													<span class="btn btn-file">
                                                        <span class="fileupload-new">选择图片</span>
													    <span class="fileupload-exists">更换</span>
													    <input type="file" id="addbPhoto"
                                                               class="default"/>
                                                    </span>
                                <a href="javascript:void(0); " class="btn fileupload-exists" id="uploadImage">上传</a>
                                <%--隐藏图片上传成功 传回来的地址--%>
                                <input type="text" id="hiddenBookImg" name="bPhoto" style="display: none">
                            </div>
                        </div>
                    </div>

                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="edbName" style="text-align: left">书名:</label>
                    <div class="col-sm-4">
                        <input type="text" id="edbName" name="bName" class="form-control span4">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" for="edbAuthor" style="text-align: left">作者:</label>
                    <div class="col-sm-4">
                        <input type="text" id="edbAuthor" name="bAuthor" class="form-control span4">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">出版日期：</label>
                    <div class="col-sm-7">
                        <input class="span6  m-wrap mask_date" name="bPublishing" type="text"/>
                        <span class="help-inline">年-月-日</span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="edbBookTag" class=" col-sm-3 control-label" style="text-align: left">图书类型:</label>
                    <div class="col-sm-5">
                        <select id="edbBookTag" name="bBookTag" class="form-control span3">
                            <%--动态添加标签--%>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">评分:</label>
                    <div class="col-sm-5">
                        <input type="text" id="addBScore" name="bScore" class=" span4 form-control ">
                        <span class="help-inline ">如：8.6分/123456评</span>
                    </div>
                </div>


                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">ISBN:</label>
                    <div class="col-sm-5">
                        <input type="text" id="addbISBN" name="bISBN" class=" span5 form-control ">
                        <span class="help-inline">如：书的ISBN号</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">添加日期：</label>
                    <div class="col-sm-5">
                        <input class="span6 m-wrap mask_date" name="bIntime" type="text"/>
                        <span class="help-inline">年-月-日</span>
                    </div>
                </div>


                <div class="form-group">
                    <label for="edbDescripation" class="col-sm-3 control-label" style="text-align: left">图书简介:</label>
                    <div class="col-sm-9">
                        <textarea type="text" id="edbDescripation" name="bDescripation" class="form-control"
                                  rows="4"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">作者简介:</label>
                    <div class="col-sm-9">
                        <textarea type="text" id="addbAuthorDescripation" name="authorDescripation" class="form-control"
                                  rows="4"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label" style="text-align: left">文件：</label>
                    <div class="col-sm-5">
                        <div class="fileupload fileupload-new" data-provides="fileupload">
                            <div class="input-append">
                                <div class="uneditable-input">
                                    <i class="icon-file fileupload-exists"></i>
                                    <span class="fileupload-preview"></span>
                                </div>
                                <span class="btn btn-file">
													<span class="fileupload-new">选择文件</span>
													<span class="fileupload-exists">更改</span>
													<input type="file" id="addBook" class="default"/>
													</span>
                                <a href=" javascript:void(0);" class="btn fileupload-exists" id="uploadBook"
                                   data-dismiss="fileupload">上传</a>
                                <input type="text" id="hiddenBookDownLink" name="bDownLink" style="display: none">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group col-sm-12">
                    <div class="form-inline">
                        <button type="button" id="btn_addBook" class="btn btn-success col-sm-4 pull-right"> 确认添加
                        </button>
                        <button type="reset" class="btn btn-success col-sm-4 pull-left"> 清除</button>
                    </div>
                </div>

            </form>

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
<script src="../../js/plugins/bootstrap-datetimepicker.js"></script>
<script src="../../js/plugins/bootstrap-datepicker.js"></script>
<script src="../../js/plugins/date.js"></script>
<script src="../../js/plugins/daterangepicker.js"></script>
<script src="../../js/plugins/jquery.inputmask.bundle.min.js"></script>
<script src="../../js/admin_addBook.js"></script>
</body>
</html>