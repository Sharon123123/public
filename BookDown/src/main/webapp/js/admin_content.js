window.onload = function (ev) {
    // 图书删除
    deleteBook();
    // 获取所有图书标签
    getBookTag();

    // 编辑图书
    editBook();
    // 图书信息提交
    formComment();
}

// 管理员删除图书
function deleteBook() {
    $(document).on("click", '.delBook', function () {

        var bName = $(this).parents("tr").find("td:eq(0)").text();
        var id = $(this).attr("id");
        if (confirm("确认删除[ " + bName + " ] 吗？")) {
            $.ajax({
                url: "/book_delete?id=" + id,
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

// 图书编辑，数据回显在模态框里
function editBook() {
    $(document).on("click", '.editBook', function () {
        //数据回显,到模态框里
        var id = $(this).attr("id");
        var bId, bPhoto, bName, bAuthor, bBookTag, bIntime, bDescripation, bTimes;
        $.ajax({
            url: "/get_one_book?id=" + id,
            type: "POST",
            dataType: "json",
            cache: false,
            processData: false,
            contentType: "application/json;charset=utf-8",
            success: function (result) {

                bId = result["bId"];
                bPhoto = result["bPhoto"];
                bName = result["bName"];
                bAuthor = result["bAuthor"];
                bBookTag = result["bBookTag"];
                bDescripation = result["bDescripation"];
                bIntime = result["bIntime"];
                bTimes = result["bTimes"];


                $("#edbTimes").val(bTimes);
                $("#edbName").val(bName);
                $("#edbAuthor").val(bAuthor);
                $("#edbID").val(id);
                $("#edbID").attr("disabled", true);
                $("#edbDescripation").val(bDescripation);
                $("#edbIntime").val(bIntime);
                $("#edbBookTag").find("option[value='" + bBookTag + "']").attr('selected', true);
                $("#edbPhoto").attr("src", bPhoto);
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

// 修改的图书表单提交
function formComment() {
    $("#editSubmit").click(function () {

        $("#edbID").attr("disabled", false);
        $.ajax({
            url: "/update_book",
            type: "post",
            dataType: "json",
            data: $("#admin_edit_user").serialize(),
            success: function (data) {
                if (data["message"] == 1) {
                    showSuccess("图书数据更新成功！");
                    // 关闭模态框
                    $("#editModal").modal("hide");
                    // 更新数据
                    window.location.reload();
                } else {
                    showWarn("图书更新数据失败，请重试")
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