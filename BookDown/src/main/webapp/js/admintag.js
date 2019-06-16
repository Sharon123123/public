window.onload=function (ev) {

    // 添加图书标签
    addTag();

}

function addTag() {
$("#addTag").click(function () {
   var tagname = $("#bookTag").val();
    $.ajax({
        url: "/admin_add_tag?tag="+tagname.trim(),
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data["message"] == 1) {
                showSuccess("图书标签添加成功！");
                // 更新数据
                window.location.reload();
            } else {
                showWarn("图书标签添加失败，请重试")
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