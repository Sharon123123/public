$().ready(function() {
	$("#login_form").bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		fields: {
			aName: {
				message: 'This username is not valid',
				validators: {
					notEmpty: {
						message: "用户名不能为空"
					}
				}
			},
			aPwd: {
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
		}
	});
	// 用户登录
	$("#btn_login").click(function () {
		$('#login_form').bootstrapValidator('validate'); // 提交验证
		console.log("验证结果");
		if ($("#login_form").data('bootstrapValidator').isValid()) {

			$.ajax({
				url: "/admin/login",
				type: "post",
				data: $("#login_form").serialize(),
				dataType: "json",
				success: function (result) {
					console.log(result);
					if (result['message'] == "success") {
						showSuccess("登录成功，即将跳转到首页")

						window.location.href = "/adminIndex";
						console.log(result);
					} else {
						showWarn("登录失败，用户不存在或者密码错误");
					}

				}

			});
		}
	});


	$("#register_form").bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		fields: {
			aName: {
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
						url: "/admin/checkAdmin",
						message: '用户名已经存在，请重新输入',
						delay: 1000, // ajax 刷新的时间是1秒一次
						type: 'POST',
						// 自定义提交数据，默认值提交当前input value
						data: function (validator) {
							return {
								aName: $("input[name=aName]").val(),
							};
						}
					}


				}
			},
			aPwd: {
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
			rpassword: {
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
						field: 'aPwd',
						message: '密码输入不一致'
					}
				}
			},
		}
	});
	// 用户注册
	$("#btn_register").click(function () {
		$('#register_form').bootstrapValidator('validate'); // 提交验证
		console.log("验证结果");
		if ($("#register_form").data('bootstrapValidator').isValid()) {

			$.ajax({
				url: "/admin/register",
				type: "post",
				data: $("#register_form").serialize(),
				dataType: "json",
				success: function (result) {
					console.log(result);
					if (result['message'] == "success") {
						showSuccess("登录成功，即将跳转到首页")
						location.href = "/adminIndex";
					} else {
						showWarn("登录失败，用户不存在或者密码错误");
					}

				}

			});
		}
	});

});


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