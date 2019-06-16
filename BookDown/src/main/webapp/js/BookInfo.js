window.onload=function (ev) {
    getNewComm();
    getChats();
    addChat();

}

function getNewComm() {
    var chat_show = $("#bookinfo");
    $.ajax({
        url: "/get_chat_time",
        type: "GET",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                chat_show.children().remove();
                $.each(result, function (index, item) {
                    var chatIn = '<li><a title=" '+ item['userName']+' 的评论"><img  class="avatar rand_avatar photo" src="'+ item['userPhoto'] + '"/>' +
                        '<div class="muted"><i class="fa fa-wechat"></i>在 '+item['commtime']+' 说：《'+item['bookName']+'》  '+item['comm']+'</div></a> </li>';
                    chat_show.append(chatIn);
                });
            }

        }

    });
}

// 评论
function addChat() {
    $("#chatCommit").click(function () {

        var comm = $("#comm").val();
        if (comm == null || comm == "" || comm == "留下脚迹........") {
            showWarn("评论不能为空！");
            return;
        }
        $.ajax({
            url: "/addchat",
            type: "post",
            data: $('#chatForm').serialize(),
            dataType: "json",
            success: function (result) {
                if (result['statue'] == 1) {
                    // 评论成功
                    showSuccess("评论成功");
                    // 查看评论
                    getChats();
                }else {
                    showWarn("评论失败，请再试一次！");
                    return;
                }
            }
        });
    });
}

function getChats() {
    var scorrel_style = $("#scroller_style");
    var chat_show = $("#chat_show");
    var bId = chat_show.attr("role");
    var style;

    $.ajax({
        url: "/get_chat?bId=" + bId,
        type: "GET",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                style = "position: relative;height: 400px;overflow: auto;overflow-y: auto;";
                scorrel_style.attr("style", style);
                chat_show.children().remove();
                $.each(result, function (index, item) {
                    var chatIn = '<li class="in"><img class="avatar" src="' + item['userPhoto'] + '"/><div class="message">' +
                        '<span class="arrow"></span><a class="name">' + item['userName'] + '' +
                        ' </a><span class="datetime">在 ' + item['commtime'] + ' 说</span> <span class="body">' + item['comm'] + '</span> </div> </li>';
                    chat_show.append(chatIn);
                });
            }else {
                style = "position: relative;height: 100px;overflow: auto;overflow-y: auto;";
                scorrel_style.attr("style", style);
                chat_show.children().remove();
                var out = '<li class="in"><div ><h2  style="text-align: center">暂时无人评论！</h2></div></li>';
                chat_show.append(out);
            }


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