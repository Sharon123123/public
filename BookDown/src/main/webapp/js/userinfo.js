$(function () {

    // 用户头像上传
    imageUpload();
    userRegisterValied();

});


// 管理员用户用户头像上传
function imageUpload() {
    $("#uploadImage").click(function () {
        var fileObj = $("#adduPhoto")[0].files[0];
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
                if (data["message"] == "success") {
                    // 头像上传成功：
                    showSuccess("头像上传成功！");
                    $("#hiddenUserImg").val(data["img"]);
                }
            }
        });

    });
}

// 添加用户表单验证,并提交信息
function userRegisterValied() {
    // 用户注册表单验证
    $("#updateUserInfo").bootstrapValidator({
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
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
            uEmail: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    },
                }

            }
        }
    });
    // 用户表单注册信息提交
    $("#updateUser").click(function () {

        $('#updateUserInfo').bootstrapValidator('validate'); // 提交验证
        if ($("#updateUserInfo").data('bootstrapValidator').isValid()) {
            $.ajax({
                url: "/userUpdate_info",
                type: "post",
                data: $('#updateUserInfo').serialize(),
                dataType: "json",
                success: function (result) {

                    if (result['result'] == 1) {
                        // 注册成功
                        showSuccess("用户信息更新成功");
                       location.href="/user/userInfo";
                    }else {
                        showWarn("用户信息更新失败，请重试");
                    }
                }
            });
        }


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
