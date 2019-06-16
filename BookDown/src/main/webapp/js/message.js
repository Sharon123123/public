$(function () {

        $("#loginform").bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                uName: {
                    message: 'This username is not valid',
                    validators: {
                        notEmpty: {
                            message: "用户名不能为空"
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
                        }

                    }

                },
            }
        });
        // 用户登录
        $("#logincommit").click(function () {
            $('#loginform').bootstrapValidator('validate'); // 提交验证

            if ($("#loginform").data('bootstrapValidator').isValid()) {

                $.ajax({
                    url: "/user/login",
                    type: "post",
                    data: $("#loginform").serialize(),
                    dataType: "json",
                    success: function (result) {
                        console.log(result);
                        if (result['message'] == "success") {
                            showSuccess("登录成功，即将跳转到首页")

                            window.location.href = "/";
                            console.log(result);
                        } else {
                            showWarn("登录失败，用户不存在或者密码错误");
                        }

                    }

                });
            }
        });

        // 用户注册表单验证
        $("#registerform").bootstrapValidator({
            feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-times',
                validating: 'fa fa-refresh'
            },
            fields: {
                uName: {
                    message: 'This username is not valid',
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
                                console.log("表单验证结果:" + data);
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
        $("#registercommit").click(function () {

            $('#registerform').bootstrapValidator('validate'); // 提交验证
            if ($("#registerform").data('bootstrapValidator').isValid()) {
                $.ajax({
                    url: "/user/register",
                    type: "post",
                    data: $("#registerform").serialize(),
                    dataType: "json",
                    success: function (result) {
                        if (result['statue'] == 0) {
                            // 注册成功
                            showSuccess("注册成功，即将跳转到首页")
                            window.location.href = "/"


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
);


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









