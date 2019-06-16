<%--
  Created by IntelliJ IDEA.
  User: Admin
  Date: 2019/3/26
  Time: 20:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>图书图片上传</title>
</head>
<body>
<h1>图片上传</h1>
<form method="post" enctype="multipart/form-data" action="${pageContext.request.contextPath}/addbook">
    <input type="file" name="pictureFile" id="pictureFile" value="请选择图片"/>
    <input type="submit" value="上传">
</form>


</body>
</html>
