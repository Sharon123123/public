<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <meta charset="UTF-8">
    <meta content="no-transform" http-equiv="Cache-Control"/>
    <meta content="no-siteapp" http-equiv="Cache-Control"/>
    <meta content="IE=edge,IE=10,IE=9,IE=8" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
          name="viewport">
    <link href="./images/favicon.ico" rel="icon" type="image/x-icon"/>
    <link href='./css/plugins/styles.css' id='mbdb-styles-css'
          media='all' rel='stylesheet'
          type='text/css'/>
    <link href='./css/book-grid.css' id='mbdb-book-grid-styles-css'
          media='all' rel='stylesheet'
          type='text/css'/>
    <link href='./css/style.css' id='style-css' media='all'
          rel='stylesheet' type='text/css'/>
    <script src='js/plugins/jquery-1.8.3.min.js' type='text/javascript'></script>
    <script src='./js/single-book.js'
            type='text/javascript'></script>
    <meta content="书城精品电子书下载,电子书免费下载,kindle电子书下载,电子书分享,mobi下载,epub下载,azw3下载,豆瓣电子书下载,电子书城"
          name="keywords">
    <meta content="书城精品电子书下载,，分享的免费电子书格式有mobi，epub，azw3等格式，并根据豆瓣评分排序，提供的电子书均为精品，有得到，喜马拉雅，微信读书，知乎等推荐书籍"
          name="description">
    <style id="custom-background-css" type="text/css">body.custom-background {
        background-image: url("./images/bg.png");
        background-position: left top;
        background-size: auto;
        background-repeat: repeat;
        background-attachment: scroll;
    }</style>
    <!--<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>-->
    <!--<script> (adsbygoogle = window.adsbygoogle || []).push({-->
    <!--google_ad_client: "ca-pub-6164134980280974",-->
    <!--enable_page_level_ads: true-->
    <!--});</script>-->
    <title> 书城 </title>
    <script> function s_check() {
        if ($("#s_input").val() == '' || $("#s_input").val() == '输入书名或者作者并回车') {
            return false;
        }
        return true;
    }

    $(document).on('keydown', '#s_form', function () {
        var e = e || event, keycode = e.which || e.keyCode;
        if (keycode == 13) {
            if (!s_check()) {
                return false;
            }
            $("#s_input").trigger("click");
        }
    });
    window._deel = {
        name: 'bookset',
        url: 'https://bookset.me/wp-content/themes/twentyseventeen',
        ajaxpager: '',
        commenton: 0,
        roll: [0, 0]
    } </script>

    <style type="text/css">header h2 a {
        color: #27937b;
    }</style>

</head>
<body class="home blog custom-background">
<header id="header" class="header" style="background-color: #58B4AB;">
    <%--::before--%>
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

            <form method="get" name="s_form" id="s_form"
                  onsubmit="location.href='/search?content=' + encodeURIComponent(this.s.value).replace(/%20/g, '+'); return false;"
                  action="/" style="width:330px;height:50px;float:right;border:none;">
                <li id="menu-item-s" style="float:left; padding-top: 0.6px;"
                    class="menu-item menu-item-type-post_type menu-item-object-post menu-item-s">
                    <input type="text" name="s" id="s_input"
                           style="width:280px;background:#eee;height:50px;line-height:50px;" placeholder="输入书名或者作者">
                </li>
                <li style="border:none;">
                    <div class="toggle-search" onclick='javascript:if (s_check()){$("#s_form").submit();}'>
                        <i class="fa fa-search" style="padding-top: 3px;"></i>
                    </div>
                </li>
            </form>

            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1229"
                id="menu-item-1229" style="float: right">

            </li>
        </ul>
    </div>
    <%--<div class="screen-mini">
        <button data-type="screen-nav" class="btn btn-inverse screen-nav">
            <i class="fa fa-list"></i>
            "&nbsp;菜单"
        </button>
        </button>
    </div>
    :: after
    </div>
    :: after--%>
</header>
<section class="container">
    <div class="content-wrap">
        <div class="content">
            <div class="pagewrapper" style="padding-top:.1px">
                <div class="cardlist" id="cardslist" role="main"></div>
            </div>
            <div class="pagination">
                <ul>
                    <li class="prev-page"></li>
                    <li class="active"><span>1</span></li>
                    <li><a href='/page?pn=2'>2</a></li>
                    <li><a href='/page?pn=3'>3</a></li>
                    <li><a href='/page?pn=4'>4</a></li>
                    <li><a href='/page?pn=5'>5</a></li>
                    <li><span> ... </span></li>
                    <li class="next-page"><a href=/page?pn=2">下一页</a></li>
                </ul>
            </div>
        </div>
    </div>
    <aside class="sidebar">
        <div class="widget git_tag">
            <div class="title"><h2>其他电子书 标签</h2></div>
            <div class="git_tags" id="git_tags">

            </div>
        </div>
        <div class="widget git_comment">
            <div class="title"><h2>最新评论</h2></div>
            <ul  id="newComm">
            </ul>
        </div>
    </aside>
</section>
<footer class="footer"
        style="border-top: 1px solid ;background-image: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAUAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAAgAKAwERAAIRAQMRAf/EAEwAAQEAAAAAAAAAAAAAAAAAAAAJAQEAAAAAAAAAAAAAAAAAAAAAEAEBAAAAAAAAAAAAAAAAAAAAlREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ah7DAhg//2Q=='); background-repeat: repeat;">
    <div class="footer-inner">
        <div class="footer-copyright">
            <div>友情链接：<a href="#" target="_blank">如有乐享</a></div>
            Copyright © 2019-2019 书城 本站图书资源均来自互联网，仅供学习交流使用
            <span class="trackcode pull-right">
            <script>
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                    dataLayer.push(arguments);
                }

                gtag('js', new Date());
                gtag('config', 'UA-112006693-1');
            </script>
        </span>
        </div>
    </div>
</footer>
<script src='./js/global.js' type='text/javascript'></script>
</body>
</html>
