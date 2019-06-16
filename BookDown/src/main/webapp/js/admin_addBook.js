window.onload = function (ev) {

    //处理日期
    handleDate();
    // 获取图书标签
    getBookTag();
    // 提交图书表单
    formcheck();
    imageUpload();
    bookUpload();
}

// 管理员图书照片
function imageUpload() {
    $("#uploadImage").click(function () {
        var fileObj = $("#addbPhoto")[0].files[0];
        if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
            showWarn("请选择上传的图书照片！");
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
                    showSuccess("图书照片上传成功！");
                    $("#hiddenBookImg").val(data["img"]);
                }
            }
        });

    });
}

// 图书文件上传
function bookUpload() {
    $("#uploadBook").click(function () {
        var fileObj = $("#addBook")[0].files[0];
        if (typeof (fileObj) == "undefined" || fileObj.size <= 0) {
            showWarn("请上传本书！");
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
                    showSuccess("图书上传成功！");
                    $("#hiddenBookDownLink").val(data["img"]);
                }
            }
        });

    });
}


// 图书表单验证
function formcheck() {

    $("#admin_add_book").bootstrapValidator({
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            bName: {
                validators: {
                    notEmpty: {
                        message: "书名不能为空"
                    }
                },


            },
            bAuthor: {
                validators: {
                    notEmpty: {
                        message: "作者不能为空"
                    }
                },

            },
            bScore: {
                validators: {
                    notEmpty: {
                        message: "书的评分不能为空"
                    }
                },


            },
            bDescripation: {
                validators: {
                    notEmpty: {
                        message: "书的简介不能为空"
                    }
                },


            },
            bPublishing: {
                validators: {
                    notEmpty: {
                        message: "出版时间不能为空"
                    }
                },


            },
            bIntime: {
                validators: {
                    notEmpty: {
                        message: "添加时间不能为空"
                    }
                },
            },
            bPhoto: {
                validators: {
                    notEmpty: {
                        message: "请上传书的照片"
                    }
                },
            },
            bDownLink: {
                validators: {
                    notEmpty: {
                        message: "请上传文件"
                    }
                },
            },

        }
    });
    $("#btn_addBook").click(function () {

        $('#admin_add_book').bootstrapValidator('validate'); // 提交验证
        if ($("#admin_add_book").data('bootstrapValidator').isValid()) {
            $.ajax({
                url: "/admin_add_book",
                type: "post",
                data: $('#admin_add_book').serialize(),
                dataType: "json",
                success: function (result) {
                    if (result['statue'] == 1) {
                        // 注册成功
                        showSuccess("图书添加成功");
                        // 查看添加的图书
                        location.href = "/admin_content";
                    }
                    showWarn("图书添加失败，请重新添加");
                    return ;
                }
            });
        }else {
            showWarn("图书添加失败，请重新添加");
            return ;
        }


    });
}


//获取图书类型
function getBookTag() {
    $.ajax({
        url: "/getAlltag",
        type: "POST",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $("#edbBookTag").children().remove();
            $.each(data, function (index, item) {
                var option = "<option value='" + item["btId"] + "'>" + item["btName"] + "</option>"
                $("#edbBookTag").append(option);
            })
        }
    });
}


// 处理日期，出版日期，和图书添加日期,ISBN
function handleDate() {

    $.extend($.inputmask, {
        'autounmask': true
    });
    $(".mask_date").inputmask("y-m-d", {"placeholder": "yyyy-mm-dd"});
    $("#addbISBN").inputmask("9999-9999-9999", {placeholder: " ", clearMaskOnLostFocus: true});

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