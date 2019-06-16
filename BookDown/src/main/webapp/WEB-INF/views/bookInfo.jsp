<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <script src='../../js/plugins/jquery-1.9.1.min.js' type='text/javascript'></script>
    <link href="../../css/plugins/bootstrap.css" rel="stylesheet">
    <link href="../../css/plugins/bootstrapValidator.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="../../js/plugins/bootstrap.js" type="text/javascript"></script>
    <script src="../../js/plugins/bootstrapValidator.js" type="text/javascript"></script>

    <meta http-equiv="Cache-Control" content="no-transform"/>
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,IE=10,IE=9,IE=8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <link href="../../images/favicon.ico" rel="icon" type="image/x-icon"/>
    <link rel='stylesheet' id='mbdb-styles-css'
          href='../../css/plugins/styles.css' type='text/css'
          media='all'/>
    <link rel='stylesheet' id='mbdb-book-grid-styles-css'
          href='../../css/book-grid.css' type='text/css'
          media='all'/>
    <link rel='stylesheet' id='style-css' href='../../css/style.css'
          type='text/css' media='all'/>
    <script type='text/javascript' src='../../js/global.js'></script>
    <script type="text/javascript" src="../../js/BookInfo.js"></script>
    <script type='text/javascript'
            src='../../js/single-book.js'></script>
    <%-- 关键字替换，标签--%>
    <meta name="keywords" content="azw3, epub, mobi, 心理学, 思维, 自我成长, 认知, book">
    <%-- 书的内容描述 --%>
    <meta name="description"
          content="我们每天都在使用大脑，但是我们最缺乏了解的恰恰是自己的大脑。 对大部分人而言，大脑给我们带来的第一个困惑是如何将自己的注意力集中到重要的事情上。每天都有一些重要的事情要处理，但是我们的注意力总是被意外的消息弹窗、微信群里分享的文章、邻桌和我无关的聊天所打断。 这一切到底是如何发生的？《认知迭代》的作者通过亲身调研，为我们提供了一个有趣的视角。 为了解决自己注意力不集中的问题，作者去参加了一项大脑强化训练，在经过三天枯燥且成绩令人绝望的训">
    <style type="text/css" id="custom-background-css">body .custom-background {
        background-image: url("../../images/bg.png");
        background-position: left top;
        background-size: auto;
        background-repeat: repeat;
        background-attachment: scroll;
    }</style>
    <%--<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script> (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-6164134980280974",
        enable_page_level_ads: true
    });</script>--%>

    <%-- 标题--%>
    <%--<title> 认知迭代 【英】卡罗琳•威廉姆斯 著(作者) 电子书下载 &#8211; 书城 </title>--%>
    <title> ${bookInfo.bName} ${bookInfo.bAuthor} 著(作者) 电子书下载 &#8211; 书城 </title>
    <script> function s_check() {
        if ($("#s_input").val() == '' || $("#s_input").val() == '请输入作者或者书名') {
            return false;
        }
        return true;
    }

    /* 搜书*/
    $(document).on('keydown', '#s_form', function () {
        var e = e || event, keycode = e.which || e.keyCode;
        if (keycode == 13) {
            if (!s_check()) {
                return false;
            }
            $("#s_input").trigger("click");
        }
    });

    </script>

</head>
<body class="post-template-default single single-post postid-6583 single-format-standard custom-background">
<header id="header" class="header" style="background-color: #58B4AB;">
    <%-- ::before--%>
    <style type="text/css">.navbar .nav li:hover a, .navbar .nav li.current-menu-item a, .navbar .nav li.current-menu-parent a, .navbar .nav li.current_page_item a, .navbar .nav li.current-post-ancestor a, .toggle-search, #submit, .pagination ul > .active > a, .pagination ul > .active > span, .bdcs-container .bdcs-search-form-submit, .metacat a {
        background: #58B4AB;
    }

    .footer, .title h2, .card-item .cardpricebtn {
        color: #58B4AB;
    }

    .bdcs-container .bdcs-search-form-submit, .bdcs-container .bdcs-search {
        border-color: #58B4AB;
    }

    .pagination ul > li > a:hover, .navbar .nav li a:focus, .navbar .nav li a:hover, .toggle-search:hover, #submit:hover, .cardpricebtn .cardbuy {
        background-color: ;
    }

    .tooltip-inner {
        background-color:;
    }

    .tooltip.top .tooltip-arrow {
        border-top-color:;
    }

    .tooltip.right .tooltip-arrow {
        border-right-color:;
    }

    .tooltip.left .tooltip-arrow {
        border-left-color:;
    }

    .tooltip.bottom .tooltip-arrow {
        border-bottom-color:;
    }
    </style>
    <div class="container-inner">
        <div class="g-logo pull_center">
            <a href="/">
                <div class="h1logo">
                    <span class="g-mono" style="font-family:楷体;">书城</span>
                    <span class="g-bloger" style="font-family:楷体;">精品电子书免费下载</span>
                </div>
            </a>
        </div>
    </div>
    <div id="toubuads"></div>
    <%--<div id="nav-header" class="navbar fancybox-overlay-fixed"
         style="border-bottom: 4px solid rgb(88,180,171) ;position: fixed;top: 0px;">
        ::before--%>
    <div class="navbar" id="nav-header" style="border-bottom: 4px solid #58B4AB ;">
        <style type="text/css">.bdsharebuttonbox a {
            cursor: pointer;
            border-bottom: 0;
            margin-right: 5px;
            width: 28px;
            height: 28px;
            line-height: 28px;
            color: #fff
        }

        .bds_renren {
            background: #94b3eb
        }

        .bds_qzone {
            background: #fac33f
        }

        .bds_more {
            background: #40a57d
        }

        .bds_weixin {
            background: #7ad071
        }

        .bdsharebuttonbox a:hover {
            background-color: #7fb4ab;
            color: #fff;
            border-bottom: 0
        }</style>
        <ul class="nav">
            <li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-1225"
                id="menu-item-1225">
                <a href="/">首页</a></li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2996" id="menu-item-2996"><a
                    href="/rating?choice=0">排行</a></li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1228"
                id="menu-item-1228">
                <a href="/tag?tagid=110">心理</a>
                <ul class="sub-menu">
                    <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-6475"
                        id="menu-item-6475"><a
                            href="/tag?tagid=111">心理学</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-3800"
                        id="menu-item-3800"><a
                            href="/tag?tagid=114">推理</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-1465"
                        id="menu-item-1465"><a
                            href="/tag?tagid=113">悬疑</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-2882"
                        id="menu-item-2882"><a
                            href="/tag?tagid=112">思维</a>
                    </li>
                </ul>
            </li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-3313" id="menu-item-3313">
                <a href="/tag?tagid=117">文学</a>
            </li>
            <li class="menu-item menu-item-type-post_type menu-item-object-post menu-item-5001" id="menu-item-5001"><a
                    href="/tag?tagid=123">管理</a></li>
            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4744" id="menu-item-4744"><a
                    href="/tag?tagid=124">经济</a></li>
            <li class="menu-item menu-item-type-post_type menu-item-object-post menu-item-5387" id="menu-item-5387"><a
                    href="/rating?choice=1">网站推荐</a></li>
            <%-- <li class="menu-item menu-item-type-post_type menu-item-object-post menu-item-6487" id="menu-item-6487"><a
                     href="/login">登录</a></li>--%>

            <form method="get" name="s_form" id="s_form"
                  onsubmit="location.href='/search?content=' + encodeURIComponent(this.s.value).replace(/%20/g, '+'); return false;"
                  action="/" style="width:330px;height:50px;float:right;border:none;">
                <li id="menu-item-s" style="float:left;"
                    class="menu-item menu-item-type-post_type menu-item-object-post menu-item-s">
                    <input type="text" name="s" id="s_input"
                           style="width:280px;background:#eee;height:50px;line-height:50px;" placeholder="输入书名或者作者">
                </li>
                <li style="border:none;">
                    <div class="toggle-search" onclick='javascript:if (s_check()){$("#s_form").submit();}'>
                        <i class="fa fa-search"></i>
                    </div>
                </li>
            </form>

            <c:if test="${not empty user}">
                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1229"
                    id="menu-item-1229" style="float: right">
                    <img src="${user.uPhoto}" class="round_icon" alt="${user.uName}">
                    <ul class="sub-menu">
                        <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-6476"
                            id="menu-item-6476">
                                <%-- 使用bootstrap 的模态框--%>
                            <a href="/user/userInfo">个人中心</a>
                        </li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-6477"
                            id="menu-item-6477">
                            <a href="/user/logout">注销</a>
                        </li>
                    </ul>
                </li>
            </c:if>


        </ul>
    </div>

    <%-- 个人中心模态框--%>
    <div class="modal fade" id="usermode" tabindex="-1" role="dialog" aria-labelledby="usermodeLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="usermodalLabel">个人中心</h4>
                </div>
                <div class="modal-body">
                    表单
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">更新</button>
                </div>
            </div>
        </div>
    </div>

</header>
<section class="container">
    <div class="content-wrap">
        <div class="content">
            <div class="breadcrumbs"><a title="返回首页" href="../../index.jsp"><i class="fa fa-home"></i></a>
                <small>></small>
                <span class="muted">${bookInfo.bName}</span>
            </div>
            <header class="article-header">
                <h1 class="article-title">
                    <a href="#">${bookInfo.bName}
                        ${bookInfo.bAuthor} 著(作者) 电子书下载</a></h1>
                <div class="meta">
                    <span id="mute-category" class="muted">
                        <i class="fa fa-list-alt"></i>
                        <a href="../../index.jsp"> book</a>
                    </span>
                    <span class="muted">
                            <i class="fa fa-clock-o"></i> ${bookInfo.bIntime}
                        </span>
                    <span class="muted">
                            <i class="fa fa-eye"></i> ${bookInfo.bLook} 次浏览
                        </span>
                    <span class="muted"><i class="fa fa-comment-o"></i>
                            <a href="/#">0个评论</a>
                        </span>
                    <span class="muted"></span>
                </div>
            </header>
            <article class="article-content">
                <div id="mbm-book-page" itemscope itemtype="http://schema.org/Book">
                    <meta itemprop="name" content="${bookInfo.bName}">
                    <span class="mbm-book-cover">
                        <img rel="external nofollow" src="${bookInfo.bPhoto}" alt="Book Cover: ${bookInfo.bName}"
                             itemprop="image"/>
                    </span>
                    <div id="mbm-book-links1">
                        <div class="mbm-book-download-links"><span style="color:#FF9933"><i
                                class="fa fa-download"></i><strong>点击下载：</strong></span>
                            <UL class="mbm-book-download-links-list" style="list-style-type:none;">
                                <li class="mbm-book-download-links-listitem" style="display:block;margin: 0 3% 0 0;">
                                    <a id="book_down_link" class="mbm-book-download-links-link" target="_blank"
                                       target="_blank"
                                       href="/downbook?id=${bookInfo.bId}"><span
                                            class="mbm-book-download-links-text">电子书下载</span></a>
                                </li>
                            </ul>
                            <span class="mbm-book-download-links-after"></span></div>
                    </div>
                    <div class="mbm-book-details-outer">
                        <div class="mbm-book-details">
                            <span class="mbm-book-details-published-data">
                                <span class="mbm-book-published">
                                    <span class="mbm-book-details-published-label">
                                        <span class="mbm-book-published-label">时间:</span>
                                    </span>
                                    <span class="mbm-book-published-text" itemprop="datePublished"
                                          content="${bookInfo.bPublishing}">${bookInfo.bPublishing}</span>
                                    <span class="mbm-book-published-after"></span>
                                </span>
                            </span><br/>
                            <span class="mbm-book-details-publisher-label">书名:</span> 
                            <span class="mbm-book-details-publisher-data">
                                <a target="_blank" rel="external nofollow" href="/#">${bookInfo.bName}</a>
                            </span><br/>
                            <span class="mbm-book-details-editors-label">作者:</span>
                            <span class="mbm-book-details-editors-data">
                                <a target="_blank" href="/#">${bookInfo.bAuthor} 著</a></span><br/>
                            <span class="mbm-book-details-tags-label">标签:</span>
                            <span class="mbm-book-details-tags-data">
                                <div class="mbm-book-tag" style="display:inline;">
                                    <a class="mbm-book-tag-link" target="_blank" HREF="/tag?tagid=${booktype.btId}">
                                        <span class="mbm-book-tag-text">${booktype.btName}</span>
                                    </a>
                                </div></span><br/>
                            <span class="mbm-book-details-tags-label">豆瓣:</span>
                            <span class="mbm-book-details-tags-label">${bookInfo.bScore}</span> <br/>
                            <span class="mbm-book-details-publisher-label">ISBN:</span> 
                            <span class="mbm-book-details-publisher-data">${bookInfo.bIsbn}</span><br/>
                        </div>
                    </div> <!-- mbm-book-details -->
                    <div class="mbm-book-excerpt">
                        <span class="mbm-book-excerpt-label">内容简介:</span>
                        <span class="mbm-book-excerpt-text">
                            <p>${bookInfo.bDescripation}</p>
                        </span>
                        <span class="mbm-book-excerpt-after"></span></div>
                    <div style='clear:both;'>
                        <h2>作者简介</h2>
                        <span class='mbm-book-excerpt-text'>${bookInfo.authorDescripation}</span>
                    </div>
                </div> <!-- mbm-book-page -->
                <hr/>
                <div class="open-message">本站大部分内容收集于互联网，只做学习和交流使用，版权归原作者所有。本站发布的内容若侵犯到您的权益，请联系本站处理。</div>
            </article>
            <div id="respond" class="no_webshot">

                <div class="panel panel-info ">
                    <div class="panel-heading">
                        <i class="fa fa-wechat" aria-hidden="true"></i>
                        评论区
                    </div>
                    <div class="panel-body " id="chats" style="display: block">
                        <div class="scroller" id="scroller_style"
                             style="position: relative;height: 100px;overflow: auto;overflow-y: auto;">
                            <ul class="chats " id="chat_show" role="${bookInfo.bId}">
                            </ul>
                        </div>

                        <c:if test="${not empty user}">
                            <form id="chatForm">
                                <div class="chat-form">
                                    <input type="text" style="display: none" name="bId" value="${bookInfo.bId}">
                                    <input type="text" style="display: none" name="uId" value="${user.uId}">
                                    <div class="input-cont">
                                        <input class="m-wrap" id="comm" name="Comm" placeholder="留下脚迹........"
                                               type="text"/>
                                    </div>
                                    <div class="btn-cont">
                                        <span class="arrow"></span>
                                        <a class="btn blue icn-only" href="" id="chatCommit">留言</a>
                                    </div>
                                </div>
                            </form>
                        </c:if>
                        <c:if test="${empty user}">
                            <div class="comt-author pull-right">
                                若想评论 <a href="/login">请登录</a>
                            </div>
                        </c:if>
                    </div>
                </div>


            </div>
        </div>
    </div>
    <aside class="sidebar">
        <div class="widget git_tag">
            <div class="title"><h2>其他电子书标签</h2></div>
            <div class="git_tags" id="git_tag">
                <c:forEach items="${booktypes}" var="item">
                    <a href="/tag?tagid=${item.btId}" target="_blank">${item.btName}</a>
                </c:forEach>
            </div>
        </div>
        <div class="widget git_comment">
            <div class="title"><h2>最新评论</h2></div>
            <ul id="bookinfo">
            </ul>
        </div>
    </aside>
</section>
<footer style="border-top: 1px solid ;background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAAgAKAwERAAIRAQMRAf/EAEwAAQEAAAAAAAAAAAAAAAAAAAAJAQEAAAAAAAAAAAAAAAAAAAAAEAEBAAAAAAAAAAAAAAAAAAAAlREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ah7DAhg//2Q=='); background-repeat: repeat;"
        class="footer">
    <div class="footer-inner">
        <div class="footer-copyright">
            <div>友情链接：<a href="http://51.ruyo.net/" target="_blank">如有乐享</a></div>
            Copyright © 2019-2019 书城 本站图书资源均来自互联网，仅供学习交流使用<span class="trackcode pull-right"><script>var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?867e9077558c759606bf5c053a75de22";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();</script><!-- Global site tag (gtag.js) - Google Analytics --><script async
                                                                                   src="https://www.googletagmanager.com/gtag/js?id=UA-112006693-1"></script><script> window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'UA-112006693-1');</script></span></div>
    </div>
</footer>

</body>
</html>
