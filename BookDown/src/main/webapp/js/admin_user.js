window.onload = function () {

    // 获取用户所有类型
    getUserType();
    // 模态框数据绑定
    editUser();
    // 删除用户事件
    deleteUser();
    // 检测管理员更新用户名是否可用
    editCommint();
    // 更新用户表单提交
    formComment();
    userRegisterValied();
    // 管理员上传用户头像
    imageUpload();


}

// 管理员用户用户头像上传
function imageUpload() {
    $("#uploadImage").click(function () {
        var fileObj = $("#adduPhoto")[0].files[0];
        console.log(fileObj);
        if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
            showWarn("请选择上传的头像！");
            return;
        }
        var formFile = new FormData();
        formFile.append("file", fileObj);
        $.ajax({
            url: '/adminUpImage',
            type: 'post',
            dataType: 'json',
            data: formFile,
            cache: false,   //上传文件无需缓存
            processData: false,   // 用于对参数进行序列化处理，这里必须设为false
            contentType: false, // 必须
            success: function (data) {
                console.log(data);
                if (data["message"] == "success") {
                    // 头像上传成功：
                    showSuccess("头像上传成功！");
                    $("#hiddenImg").val(data["img"]);
                }
            }
        });

    });
}


// 添加用户表单验证,并提交信息
function userRegisterValied() {
    // 用户注册表单验证
    $("#admin_add_user").bootstrapValidator({
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            uName: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 5,
                        message: '用户名由2-4个字符组成'
                    },
                    threshold: 2, // 有2个字符以上才发送ajax 请求
                    remote: {
                        // ajax 验证，server result：{"valid",true or false}
                        url: "/checkusername",
                        message: '用户名已经存在，请重新输入',
                        delay: 1000, // ajax 刷新的时间是1秒一次
                        type: 'POST',
                        // 自定义提交数据，默认值提交当前input value
                        data: function (validator) {
                            return {
                                uName: $("input[name=uName]").val(),
                                // userServlet 判断调用方法关键字
                                // method: "checkUserName"
                            };
                        }
                    }
                }
            },
            uPwd: {
                message: '密码验证失败',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 10,
                        message: '密码由6-10位字符组成'
                    },
                }

            },
            confirmPwd: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 10,
                        message: '密码由6-10位字符组成'
                    },
                    identical: {
                        field: 'uPwd',
                        message: '密码输入不一致'
                    }
                }
            },
            uPhone: {
                threshold: 11,
                validators: {
                    notEmpty: {
                        message: '手机号不能为空'
                    },
                    regexp: {
                        regexp: /^1[3|5|8]{1}[0-9]{9}$/,
                        message: '请输入正确的手机号!'
                    },
                    stringlength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    }
                }
            },
        }
    });
    // 用户表单注册信息提交
    $("#addCommint").click(function () {

        $('#admin_add_user').bootstrapValidator('validate'); // 提交验证
        if ($("#admin_add_user").data('bootstrapValidator').isValid()) {
             $.ajax({
                 url: "/adminAddUser",
                 type: "post",
                 data: $('#admin_add_user').serialize(),
                 dataType: "json",
                 success: function (result) {
                     console.log(result);
                     if (result['statue'] == 0) {
                         // 注册成功
                         showSuccess("用户添加成功");
                         // 关闭模态框
                         $("#myModal").modal("hide");
                         // 更新网页
                         location.reload(true);


                     } else if (result['statue'] == 1) {
                         showMsg("注册失败，请重新填写信息")
                     } else {
                         showWarn("注册失败，用户名重复，请重新输入用户名");
                     }
                 }
             });
        }


    });

}

// 获取用户类型
function getUserType() {
    $.ajax({
        url: "/get_user_type",
        type: "POST",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $(".Typeid").children().remove();
            $.each(data,function (index,item) {
                var option="<option value='"+item["dId"]+"'>"+item["dName"]+"</option>"
                $(".Typeid").append(option);
            })
        }
    });
}

// 用户删除
function deleteUser() {
    /* 为删除用于添加按钮事件*/
    $(document).on("click", '.delUesr', function () {
        // alert($(this).attr("id"));
        var uName = $(this).parents("tr").find("td:eq(1)").text();
        var id = $(this).attr("id");
        if (confirm("确认删除[ " + uName + " ]吗？")) {
            $.ajax({
                url: "/adminDelete?id=" + id,
                type: "POST",
                dataType: "json",
                cache: false,
                processData: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    alert(data["message"]);
                    // 更新网页
                    location.reload();
                }
            });
        }
    });
}

// 用户编辑，数据回显在模态框里
function editUser() {
    $(document).on("click", '.editUser', function () {
        //数据回显,到模态框里
        var id = $(this).attr("id");
        var uName, uPhoto, uPhone, uEmail, uType,uId;
        $.ajax({
            url: "/checkUser?id=" + id,
            type: "POST",
            dataType: "json",
            cache: false,
            processData: false,
            contentType: "application/json;charset=utf-8",
            success: function (result) {

                uName = result["uName"];
                uPhone = result["uPhone"];
                uPhoto = result["uPhoto"];
                uEmail = result["uEmail"];
                uType = result["uTypeid"]

                $("#eduName").val(uName);
                $("#eduID").val(id);
                $("#eduID").attr("disabled",true);
                $("#eduPhone").val(uPhone);
                $("#eduEmail").val(uEmail);
                $("#eduTypeid").find("option[value='"+uType+"']").attr('selected',true);
                $("#eduPhoto").attr("src", uPhoto);

            },
            error: function () {
                console.log("查询异常");
            }
        });
        /* 弹出模态框*/
        $("#editModal").modal({
            backdrop: "static"
        });

    });
}
// 修改的表单提交
function formComment() {
    $("#editSubmit").click(function () {

        $("#eduID").attr("disabled",false);
        $.ajax({
            url: "/adminUpdateUser",
            type: "post",
            dataType: "json",
            data:$("#admin_edit_user").serialize(),
            success: function (data) {
                if (data["message"] == 1) {
                    showSuccess("用户数据更新成功！");
                    // 关闭模态框
                    $("#editModal").modal("hide");
                    // 更新数据
                    window.location.reload();
                } else {
                    showWarn("用户更新数据失败，请重试")
                }

            }
        });
    });
}

// 更改用户名，并检查用户名是否重复
function editCommint() {
    $("#eduName").change(function () {
        var uName = $("eduName").val();
        // 请求校验用户名是否合法
        $.ajax({
            url: "/checkusername?uName=" + uName,
            type: "POST",
            dataType: "json",
            cache: false,
            processData: false,
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data["valid"]) {
                    showSuccess("该用户名可以使用!");
                    $("#editSubmit").attr('disabled',true);
                } else {
                    showWarn("该用户已存在，请更换！");
                    $("#editSubmit").attr('disabled',false);
                }
            }
        });
    });
}



// 使用弹出框，给予用户体验
function ShowTip(tip, type) {
    var $tip = $('tip');
    if ($tip.length == 0) {
        $tip = $('<span id="tip" style="font-weight: bold;position: fixed;bottom: 20%;left: 50%;z-index: 9999"></span>');
        $('body').append($tip);
    }
    $tip.stop(true).attr('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(2000).fadeOut(500);

}

// 提示信息
function showMsg(msg) {
    ShowTip(msg, 'info');
}

function showSuccess(msg) {
    ShowTip(msg, 'success');
}

function showWarn(msg) {
    ShowTip(msg, 'warning');
}