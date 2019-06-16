window.onload = function (ev) {
    findBook();
    findTags();
    // 获得评论
    getNewComm();
}

// 获取最新评论
function getNewComm() {
    var chat_show = $("#newComm");
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

function findTags() {
    $.ajax({
        url: "/getAlltag",
        type: "GET",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                // 解析数据
                // 清除所用结点
                $("#git_tags").children().remove();

                $.each(result, function (index, item) {
                    var href = '<a href="/tag?tagid=' + item.btId + '" target="_blank" >' + item.btName + '</a>';
                    $("#git_tags").append(href);
                });

            } else {
                //返回数据为空
            }

        },
        error: function () {
            console.log("图书查询异常");
        }
    });
}

function findBook() {
    $.ajax({
        url: "/showBook",
        type: "GET",
        dataType: "json",
        data: "pn=1",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                // 解析数据
                console.log(result['map']);
                login(result['map']['user']);
                build_book(result['lists']);
            } else {
                //返回数据为空
            }

        },
        error: function () {
            console.log("查询异常");
        }
    });
}

function login(result) {
    $("#menu-item-1229").children().remove();
    var hre;
    if (result == null) {
        hre = '<a href="/login">登录</a>'
        $("#menu-item-1229").append(hre);
    } else {
        hre = '<img class="round_icon"  src="' + result['uPhoto'] + '"' + 'alt="' + result['uName'] + '"> <ul class="sub-menu">' +
            '<li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-6476" id="menu-item-6476">' +
            '<a href="/user/userInfo" >个人中心</a></li> ' +
            '<li class="menu-item menu-item-type-post_type menu-item-object-article menu-item-6477" ' +
            'id="menu-item-6477"><a href="/user/logout">退出</a></li> </ul>';
        $("#menu-item-1229").append(hre);

    }

}

function build_book(result) {

    // 清除原有的元素
    $("#cardslist").children().remove();
    $.each(result, function (index, item) {

        var card = '<div class="card col span_1_of_4" role="main" style="width:25%">' +
            '<div class="card-item" id="card_item">' +
            ' <div class="thumb-img focus">' +
            '<a id="img_ur" href="/bookInfo?id=' + item.bId + '" title="' + item.bName + '">' +
            ' <img alt="' + item.bName + '" class="thumb" rel="external nofollow"' +
            '  src="' + item.bPhoto + '" style="width:190px;height:260px"/>' +
            '</a>' + '</div>' +
            ' <h3><a alt="' + item.bName + '" href="/bookInfo?id=' + item.bId + '" target="_blank"' +
            '  title="' + item.bName + '">' + item.bName + '</a>' +
            ' </h3>' + '<p> 作者： ' + item.bAuthor + '  著' + '</br>' +
            '  豆瓣：' + item.bScore + ' </br>' +
            ' </p>' + '</div>' + '</div>';

        $("#cardslist").append(card);


    })

}

jQuery(document).ready(function () {
    function a(a, b, c) {
        var d, e, f;
        document.selection ? (a.focus(), sel = document.selection.createRange(), sel.text = c ? b + sel.text + c : b, a.focus()) : a.selectionStart || "0" == a.selectionStart ? (d = a.selectionStart, e = a.selectionEnd, f = e, a.value = c ? a.value.substring(0, d) + b + a.value.substring(d, e) + c + a.value.substring(e, a.value.length) : a.value.substring(0, d) + b + a.value.substring(e, a.value.length), f += c ? b.length + c.length : b.length - e + d, d == e && c && (f -= c.length), a.focus(), a.selectionStart = f, a.selectionEnd = f) : (a.value += b + c, a.focus())
    }

    var b, c, d, e;
    Date.prototype.format = function (a) {
        var b, c = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            S: this.getMilliseconds()
        };
        /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (b in c) new RegExp("(" + b + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? c[b] : ("00" + c[b]).substr(("" + c[b]).length)));
        return a
    }, b = (new Date).format("yyyy-MM-dd hh:mm:ss"), c = b.toLocaleString(), d = document.getElementById("comment") || 0, e = {
        daka: function () {
            a(d, "签到成功！签到时间：" + c, "，每日打卡，生活更精彩哦~")
        }, del: function () {
            a(d, "<del>", "</del>")
        }, strong: function () {
            a(d, "<strong>", "</strong>")
        }, center: function () {
            a(d, "<center>", "</center>")
        }, italic: function () {
            a(d, "<em>", "</em>")
        }, img: function () {
            var b = prompt("请输入图片地址", "http://");
            var ttl = document.title;
            b && a(d, '<img src="' + b + '" alt="' + ttl + '" title="' + ttl + '" />', "")
        }
    }, window.SIMPALED = {}, window.SIMPALED.Editor = e
}), !function (a) {
    a(function () {
        a.support.transition = function () {
            var a = function () {
                var a, b = document.createElement("bootstrap"), c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (a in c) if (void 0 !== b.style[a]) return c[a]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function (a) {
    a(function () {
        a.support.transition = function () {
            var a = function () {
                var a, b = document.createElement("bootstrap"), c = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                for (a in c) if (void 0 !== b.style[a]) return c[a]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function (a) {
    var b, c = function (b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    c.prototype = {
        constructor: c, toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function () {
            var b = this, c = a.Event("show");
            this.$element.trigger(c), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
                var c = a.support.transition && b.$element.hasClass("fade");
                b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
                    b.$element.focus().trigger("shown")
                }) : b.$element.focus().trigger("shown")
            }))
        }, hide: function (b) {
            b && b.preventDefault(), b = a.Event("hide"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
        }, enforceFocus: function () {
            var b = this;
            a(document).on("focusin.modal", function (a) {
                b.$element[0] === a.target || b.$element.has(a.target).length || b.$element.focus()
            })
        }, escape: function () {
            var a = this;
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) {
                27 == b.which && a.hide()
            }) : this.isShown || this.$element.off("keyup.dismiss.modal")
        }, hideWithTransition: function () {
            var b = this, c = setTimeout(function () {
                b.$element.off(a.support.transition.end), b.hideModal()
            }, 500);
            this.$element.one(a.support.transition.end, function () {
                clearTimeout(c), b.hideModal()
            })
        }, hideModal: function () {
            var a = this;
            this.$element.hide(), this.backdrop(function () {
                a.removeBackdrop(), a.$element.trigger("hidden")
            })
        }, removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
        }, backdrop: function (b) {
            var c, d = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                if (c = a.support.transition && d, this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), c && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
                c ? this.$backdrop.one(a.support.transition.end, b) : b()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b) : b()) : b && b()
        }
    }, b = a.fn.modal, a.fn.modal = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("modal"),
                f = a.extend({}, a.fn.modal.defaults, d.data(), "object" == typeof b && b);
            e || d.data("modal", e = new c(this, f)), "string" == typeof b ? e[b]() : f.show && e.show()
        })
    }, a.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function () {
        return a.fn.modal = b, this
    }, a(document).on("click.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")),
            f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f).one("hide", function () {
            c.focus()
        })
    })
}(window.jQuery), !function (a) {
    function b() {
        a(e).each(function () {
            c(a(this)).removeClass("open")
        })
    }

    function c(b) {
        var c, d = b.attr("data-target");
        return d || (d = b.attr("href"), d = d && /#/.test(d) && d.replace(/.*(?=#[^\s]*$)/, "")), c = d && a(d), c && c.length || (c = b.parent()), c
    }

    var d, e = "[data-toggle=dropdown]", f = function (b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function () {
            c.parent().removeClass("open")
        })
    };
    f.prototype = {
        constructor: f, toggle: function () {
            var d, e, f = a(this);
            return f.is(".disabled, :disabled") ? void 0 : (d = c(f), e = d.hasClass("open"), b(), e || d.toggleClass("open"), f.focus(), !1)
        }, keydown: function (b) {
            var d, f, g, h, i;
            if (/(38|40|27)/.test(b.keyCode) && (d = a(this), b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled"))) {
                if (g = c(d), h = g.hasClass("open"), !h || h && 27 == b.keyCode) return 27 == b.which && g.find(e).focus(), d.click();
                f = a("[role=menu] li:not(.divider):visible a", g), f.length && (i = f.index(f.filter(":focus")), 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < f.length - 1 && i++, ~i || (i = 0), f.eq(i).focus())
            }
        }
    }, d = a.fn.dropdown, a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = d, this
    }, a(document).on("click.dropdown.data-api", b).on("click.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.dropdown-menu", function (a) {
        a.stopPropagation()
    }).on("click.dropdown.data-api", e, f.prototype.toggle).on("keydown.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown)
}(window.jQuery), !function (a) {
    var b, c = function (b) {
        this.element = a(b)
    };
    c.prototype = {
        constructor: c, show: function () {
            var b, c, d, e = this.element, f = e.closest("ul:not(.dropdown-menu)"), g = e.attr("data-target");
            g || (g = e.attr("href"), g = g && g.replace(/.*(?=#[^\s]*$)/, "")), e.parent("li").hasClass("active") || (b = f.find(".active:last a")[0], d = a.Event("show", {relatedTarget: b}), e.trigger(d), d.isDefaultPrevented() || (c = a(g), this.activate(e.parent("li"), f), this.activate(c, c.parent(), function () {
                e.trigger({type: "shown", relatedTarget: b})
            })))
        }, activate: function (b, c, d) {
            function e() {
                f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
            }

            var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
            g ? f.one(a.support.transition.end, e) : e(), f.removeClass("in")
        }
    }, b = a.fn.tab, a.fn.tab = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("tab");
            e || d.data("tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function () {
        return a.fn.tab = b, this
    }, a(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), !function (a) {
    var b, c = function (a, b) {
        this.init("tooltip", a, b)
    };
    c.prototype = {
        constructor: c, init: function (b, c, d) {
            var e, f, g, h, i;
            for (this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(" "), i = g.length; i--;) h = g[i], "click" == h ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this)));
            this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (b) {
            return b = a.extend({}, a.fn[this.type].defaults, this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b
        }, enter: function (b) {
            var c, d = a.fn[this.type].defaults, e = {};
            return this._options && a.each(this._options, function (a, b) {
                d[a] != b && (e[a] = b)
            }, this), c = a(b.currentTarget)[this.type](e).data(this.type), c.options.delay && c.options.delay.show ? (clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function () {
                "in" == c.hoverState && c.show()
            }, c.options.delay.show), void 0) : c.show()
        }, leave: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", this.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide()
            }, c.options.delay.hide), void 0) : c.hide()
        }, show: function () {
            var b, c, d, e, f, g, h = a.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                switch (b = this.tip(), this.setContent(), this.options.animation && b.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f) {
                    case"bottom":
                        g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"top":
                        g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"left":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
                        break;
                    case"right":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
                }
                this.applyPlacement(g, f), this.$element.trigger("shown")
            }
        }, applyPlacement: function (a, b) {
            var c, d, e, f, g = this.tip(), h = g[0].offsetWidth, i = g[0].offsetHeight;
            g.offset(a).addClass(b).addClass("in"), c = g[0].offsetWidth, d = g[0].offsetHeight, "top" == b && d != i && (a.top = a.top + i - d, f = !0), "bottom" == b || "top" == b ? (e = 0, a.left < 0 && (e = -2 * a.left, a.left = 0, g.offset(a), c = g[0].offsetWidth, d = g[0].offsetHeight), this.replaceArrow(e - h + c, c, "left")) : this.replaceArrow(d - i, d, "top"), f && g.offset(a)
        }, replaceArrow: function (a, b, c) {
            this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
        }, setContent: function () {
            var a = this.tip(), b = this.getTitle();
            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        }, hide: function () {
            function b() {
                var b = setTimeout(function () {
                    c.off(a.support.transition.end).detach()
                }, 500);
                c.one(a.support.transition.end, function () {
                    clearTimeout(b), c.detach()
                })
            }

            var c = this.tip(), d = a.Event("hide");
            return this.$element.trigger(d), d.isDefaultPrevented() ? void 0 : (c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? b() : c.detach(), this.$element.trigger("hidden"), this)
        }, fixTitle: function () {
            var a = this.$element;
            (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var b = this.$element[0];
            return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                width: b.offsetWidth,
                height: b.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
        }, tip: function () {
            return this.$tip = this.$tip || a(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (b) {
            var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this;
            c.tip().hasClass("in") ? c.hide() : c.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }, b = a.fn.tooltip, a.fn.tooltip = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("tooltip"), f = "object" == typeof b && b;
            e || d.data("tooltip", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }, a.fn.tooltip.Constructor = c, a.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = b, this
    }
}(window.jQuery), !function (a) {
    var b, c = function (a, b) {
        this.init("popover", a, b)
    };
    c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {
        constructor: c, setContent: function () {
            var a = this.tip(), b = this.getTitle(), c = this.getContent();
            a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in")
        }, hasContent: function () {
            return this.getTitle() || this.getContent()
        }, getContent: function () {
            var a, b = this.$element, c = this.options;
            return a = ("function" == typeof c.content ? c.content.call(b[0]) : c.content) || b.attr("data-content")
        }, tip: function () {
            return this.$tip || (this.$tip = a(this.options.template)), this.$tip
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    }), b = a.fn.popover, a.fn.popover = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("popover"), f = "object" == typeof b && b;
            e || d.data("popover", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }, a.fn.popover.Constructor = c, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), a.fn.popover.noConflict = function () {
        return a.fn.popover = b, this
    }
}(window.jQuery), eval(function (a, b, c, d, e, f) {
    if (e = function (a) {
        return (62 > a ? "" : e(parseInt(a / 62))) + ((a %= 62) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
    }, 0 == "0".replace(0, e)) {
        for (; c--;) f[e(c)] = d[c];
        d = [function (a) {
            return f[a] || a
        }], e = function () {
            return "([6P-RT-Y]|[1-3]\\w)"
        }, c = 1
    }
    for (; c--;) d[c] && (a = a.replace(new RegExp("\\b" + e(c) + "\\b", "g"), d[c]));
    return a
}('6 q=1s;19.2I=!0;(U(){U L(a){U m(a){6 f=a.24(0);T(f!==92)V f;6 b=a.1n(1);V(f=r[b])?f:"0"<=b&&b<="7"?2J(a.W(1),8):b==="u"||b==="x"?2J(a.W(2),16):a.24(1)}U e(a){T(a<32)V(a<16?"\\\\x0":"\\\\x")+a.toString(16);a=2K.2L(a);T(a==="\\\\"||a==="-"||a==="["||a==="]")a="\\\\"+a;V a}U h(a){P(6 f=a.W(1,a.Q-1).1a(/\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\S\\s]|[^\\\\]/g),a=[],b=[],o=f[0]==="^",c=o?1:0,i=f.Q;c<i;++c){6 j=f[c];T(/\\\\[bdsw]/i.1i(j))a.R(j);14{6 j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.R([j,d]);d<65||j>25||(d<65||j>90||b.R([1j.1F(65,j)|32,1j.26(d,90)|32]),d<97||j>25||b.R([1j.1F(97,j)&-33,1j.26(d,25)&-33]))}}b.sort(U(a,f){V a[0]-f[0]||f[1]-a[1]});f=[];j=[27,27];P(c=0;c<b.Q;++c)i=b[c],i[0]<=j[1]+1?j[1]=1j.1F(j[1],i[1]):f.R(j=i);b=["["];o&&b.R("^");b.R.2O(b,a);P(c=0;c<f.Q;++c)i=f[c],b.R(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.R("-"),b.R(e(i[1])));b.R("]");V b.1G("")}U y(a){P(6 f=a.2P.1a(/\\[(?:[^\\\\\\]]|\\\\[\\S\\s])*]|\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\\\d+|\\\\[^\\dux]|\\(\\?[!:=]|[()^]|[^()[\\\\^]+/g),b=f.Q,d=[],c=0,i=0;c<b;++c){6 j=f[c];j==="("?++i:"\\\\"===j.1n(0)&&(j=+j.W(1))&&j<=i&&(d[j]=-1)}P(c=1;c<d.Q;++c)-1===d[c]&&(d[c]=++t);P(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===1t 0&&(f[c]="(?:")):"\\\\"===j.1n(0)&&(j=+j.W(1))&&j<=i&&(f[c]="\\\\"+d[i]);P(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");T(a.2Q&&s)P(c=0;c<b;++c)j=f[c],a=j.1n(0),j.Q>=2&&a==="["?f[c]=h(j):a!=="\\\\"&&(f[c]=j.1e(/[A-Za-z]/g,U(a){a=a.24(0);V"["+2K.2L(a&-33,a|32)+"]"}));V f.1G("")}P(6 t=0,s=!1,l=!1,p=0,d=a.Q;p<d;++p){6 g=a[p];T(g.2Q)l=!0;14 T(/[a-z]/i.1i(g.2P.1e(/\\\\u[\\da-f]{4}|\\\\x[\\da-f]{2}|\\\\[^UXux]/gi,""))){s=!0;l=!1;1b}}P(6 r={b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.Q;p<d;++p){g=a[p];T(g.2S||g.multiline)29 Error(""+g);n.R("(?:"+y(g)+")")}V 2T(n.1G("|"),l?"gi":"g")}U M(a){U m(a){2a(a.1u){15 1:T(e.1i(a.17))1b;P(6 g=a.1o;g;g=g.1c)m(g);g=a.2U;T("BR"===g||"LI"===g)h[s]="\\n",t[s<<1]=y++,t[s++<<1|1]=a;1b;15 3:15 4:g=a.1v,g.Q&&(g=p?g.1e(/\\r\\n?/g,"\\n"):g.1e(/[\\t\\n\\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.Q,t[s++<<1|1]=a)}}6 e=/(?:^|\\s)2b(?:\\s|$)/,h=[],y=0,t=[],s=0,l;a.1H?l=a.1H.2X:19.1I&&(l=1w.2Y.1I(a,q).2Z("30-31"));6 p=l&&"1J"===l.W(0,3);m(a);V{a:h.1G("").1e(/\\n$/,""),c:t}}U B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.R.2O(h,a.e))}U x(a,m){U e(a){P(6 l=a.d,p=[l,"1f"],d=0,g=a.a.1a(y)||[],r={},n=0,z=g.Q;n<z;++n){6 f=g[n],b=r[f],o=1t 0,c;T(1K b==="2c")c=!1;14{6 i=h[f.1n(0)];T(i)o=f.1a(i[1]),b=i[0];14{P(c=0;c<t;++c)T(i=m[c],o=f.1a(i[1])){b=i[0];1b}o||(b="1f")}T((c=b.Q>=5&&"X-"===b.W(0,5))&&!(o&&1K o[1]==="2c"))c=!1,b="34";c||(r[f]=b)}i=d;d+=f.Q;T(c){c=o[1];6 j=f.2d(c),k=j+c.Q;o[2]&&(k=f.Q-o[2].Q,j=k-c.Q);b=b.W(5);B(l+i,f.W(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.W(k),e,p)}14 p.R(l+i,b)}a.e=p}6 h={},y;(U(){P(6 e=a.concat(m),l=[],p={},d=0,g=e.Q;d<g;++d){6 r=e[d],n=r[3];T(n)P(6 k=n.Q;--k>=0;)h[n.1n(k)]=r;r=r[1];n=""+r;p.2e(n)||(l.R(r),p[n]=q)}l.R(/[\\S\\s]/);y=L(l)})();6 t=m.Q;V e}U u(a){6 m=[],e=[];a.2f?m.R(["1k",/^(?:\'\'\'(?:[^\'\\\\]|\\\\[\\S\\s]|\'\'?(?=[^\']))*(?:\'\'\'|$)|"""(?:[^"\\\\]|\\\\[\\S\\s]|""?(?=[^"]))*(?:"""|$)|\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|"(?:[^"\\\\]|\\\\[\\S\\s])*(?:"|$))/,q,"\'\\""]):a.1p?m.R(["1k",/^(?:\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|"(?:[^"\\\\]|\\\\[\\S\\s])*(?:"|$)|`(?:[^\\\\`]|\\\\[\\S\\s])*(?:`|$))/,q,"\'\\"`"]):m.R(["1k",/^(?:\'(?:[^\\n\\r\'\\\\]|\\\\.)*(?:\'|$)|"(?:[^\\n\\r"\\\\]|\\\\.)*(?:"|$))/,q,"\\"\'"]);a.35&&e.R(["1k",/^@"(?:[^"]|"")*(?:"|$)/,q]);6 h=a.1d;h&&(a.1g?(h>1?m.R(["1l",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.R(["1l",/^#(?:(?:define|2g|14|endif|error|ifdef|include|ifndef|line|pragma|1L|warning)\\b|[^\\n\\r]*)/,q,"#"]),e.R(["1k",/^<(?:(?:(?:\\.\\.\\/)*|\\/?)(?:[\\w-]+(?:\\/[\\w-]+)+)?[\\w-]+\\.h|[a-z]\\w*)>/,q])):m.R(["1l",/^#[^\\n\\r]*/,q,"#"]));a.1g&&(e.R(["1l",/^\\/\\/[^\\n\\r]*/,q]),e.R(["1l",/^\\/\\*[\\S\\s]*?(?:\\*\\/|$)/,q]));a.1q&&e.R(["X-36",/^(?:^^\\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|,|-=|->|\\/|\\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\\^=|\\^\\^|\\^\\^=|{|\\||\\|=|\\|\\||\\|\\|=|~|1b|15|37|1M|do|14|1O|38|V|29|1x|1K)\\s*(\\/(?=[^*/])(?:[^/[\\\\]|\\\\[\\S\\s]|\\[(?:[^\\\\\\]]|\\\\[\\S\\s])*(?:]|$))+\\/)/]);(h=a.2h)&&e.R(["2i",h]);a=(""+a.Y).1e(/^ | $/g,"");a.Q&&e.R(["39",2T("^(?:"+a.1e(/[\\s,]+/g,"|")+")\\\\b"),q]);m.R(["1f",/^\\s+/,q," \\r\\n\\t\\3a"]);e.R(["2j",/^@[$_a-z][\\w$@]*/i,q],["2i",/^(?:[@_]?[A-Z]+[a-z][\\w$@]*|\\w+_t\\b)/,q],["1f",/^[$_a-z][\\w$@]*/i,q],["2j",/^(?:0x[\\da-f]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+-]?\\d+)?)[a-z]*/i,q,"0123456789"],["1f",/^\\\\[\\S\\s]?/,q],["1P",/^.[^\\s\\w"-$\'./@\\\\`]*/,q]);V x(m,e)}U D(a,m){U e(a){2a(a.1u){15 1:T(k.1i(a.17))1b;T("BR"===a.2U)h(a),a.18&&a.18.3c(a);14 P(a=a.1o;a;a=a.1c)e(a);1b;15 3:15 4:T(p){6 b=a.1v,d=b.1a(t);T(d){6 c=b.W(0,d.3d);a.1v=c;(b=b.W(d.3d+d[0].Q))&&a.18.3e(s.2k(b),a.1c);h(a);c||a.18.3c(a)}}}}U h(a){U b(a,d){6 e=d?a.cloneNode(!1):a,f=a.18;T(f){6 f=b(f,1),g=a.1c;f.1m(e);P(6 h=g;h;h=g)g=h.1c,f.1m(h)}V e}P(;!a.1c;)T(a=a.18,!a)V;P(6 a=b(a.1c,0),e;(e=a.18)&&e.1u===1;)a=e;d.R(a)}6 k=/(?:^|\\s)2b(?:\\s|$)/,t=/\\r\\n?|\\n/,s=a.3f,l;a.1H?l=a.1H.2X:19.1I&&(l=s.2Y.1I(a,q).2Z("30-31"));6 p=l&&"1J"===l.W(0,3);P(l=s.1Q("LI");a.1o;)l.1m(a.1o);P(6 d=[l],g=0;g<d.Q;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",m);6 r=s.1Q("OL");r.17="linenums";P(6 n=1j.1F(0,m-1|0)||0,g=0,z=d.Q;g<z;++g)l=d[g],l.17="L"+(g+n)%10,l.1o||l.1m(s.2k("\\3a")),r.1m(l);a.1m(r)}U k(a,m){P(6 e=m.Q;--e>=0;){6 h=m[e];A.2e(h)?19.1R&&1R.warn("cannot 3g language handler %s",h):A[h]=a}}U C(a,m){T(!a||!A.2e(a))a=/^\\s*</.1i(m)?"1y-3h":"1y-1S";V A[a]}U E(a){6 m=a.g;1x{6 e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);6 k=/\\bMSIE\\b/.1i(navigator.userAgent),m=/\\n/g,t=a.a,s=t.Q,e=0,l=a.c,p=l.Q,h=0,d=a.e,g=d.Q,a=0;d[g]=s;6 r,n;P(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;P(n=r=0;n<g;){P(6 z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}P(d.Q=r;h<p;){6 o=l[h+2]||s,c=d[a+2]||s,b=1j.26(o,c),i=l[h+1],j;T(i.1u!==1&&(j=t.W(e,b))){k&&(j=j.1e(m,"\\r"));i.1v=j;6 u=i.3f,v=u.1Q("SPAN");v.17=d[a+1];6 x=i.18;x.replaceChild(v,i);v.1m(i);e<o&&(l[h+1]=i=u.2k(t.W(b,o)),x.3e(i,v.1c))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}2l(w){"1R"in 19&&1R.log(w&&w.2m?w.2m:w)}}6 v=["1b,37,do,14,P,T,V,1T"],w=[[v,"auto,15,char,const,1y,double,enum,extern,3i,2n,3j,long,register,short,signed,sizeof,static,struct,2a,typedef,union,unsigned,1t,volatile"],"2l,1U,1M,1V,1z,2o,operator,private,protected,public,this,29,1W,1x,1K"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,3k,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,3l,final,1O,implements,1z,38,1s,native,2p,strictfp,2q,synchronized,throws,transient"],H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,2r,3o,group,implicit,in,interface,internal,into,is,lock,object,out,3g,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,2c,select,uint,ulong,unchecked,unsafe,ushort,6"],w=[w,"debugger,1X,3k,U,get,1s,2t,undefined,6,3p,3q,27"],I=[v,"2u,as,assert,1U,3r,del,2g,except,exec,1O,3o,2S,1z,in,is,lambda,nonlocal,2v,or,pass,2x,raise,1x,3p,3s,False,True,None"],J=[v,"alias,2u,begin,15,1U,3r,defined,2y,end,ensure,1V,in,module,2z,nil,2v,or,2A,rescue,retry,self,2q,2B,1W,1L,1Y,1A,3t,3s,2C,2D"],v=[v,"15,done,2g,esac,1X,fi,U,in,2E,2t,2B,1A"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|2m|(const_)?iterator|(multi)?(2t|map)|bitset|u?(3j|3i)\\d*)/,N=/\\S/,O=u({Y:[F,H,w,"3u,1M,3v,do,3w,2y,1X,3x,2r,P,2n,T,1z,3y,2E,my,2z,no,3A,2x,2p,2A,3B,3C,1L,1Y,1A,3D,3E,1T,2C,2D"+I,J,v],1d:!0,1g:!0,1p:!0,1q:!0}),A={};k(O,["1y-1S"]);k(x([],[["1f",/^[^<?]+/],["3F",/^<!\\w[^>]*(?:>|$)/],["1l",/^<\\!--[\\S\\s]*?(?:--\\>|$)/],["X-",/^<\\?([\\S\\s]+?)(?:\\?>|$)/],["X-",/^<%([\\S\\s]+?)(?:%>|$)/],["1P",/^(?:<[%?]|[%?]>)/],["X-",/^<1Z\\b[^>]*>([\\S\\s]+?)<\\/1Z\\b[^>]*>/i],["X-js",/^<3G\\b[^>]*>([\\S\\s]*?)(<\\/3G\\b[^>]*>)/i],["X-20",/^<1r\\b[^>]*>([\\S\\s]*?)(<\\/1r\\b[^>]*>)/i],["X-in.21",/^(<\\/?[a-z][^<>]*>)/i]]),["1y-3h","htm","html","mxml","xhtml","xml","xsl"]);k(x([["1f",/^\\s+/,q," \\t\\r\\n"],["2G",/^(?:"[^"]*"?|\'[^\']*\'?)/,q,"\\"\'"]],[["21",/^^<\\/?[a-z](?:[\\w-.:]*\\w)?|\\/?>$/i],["3H",/^(?!1r[\\s=]|on)[a-z](?:[\\w:-]*\\w)?/i],["X-uq.3J",/^=\\s*([^\\s"\'>]*(?:[^\\s"\'/>]|\\/(?=\\s)))/],["1P",/^[/<->]+/],["X-js",/^on\\w+\\s*=\\s*"([^"]+)"/i],["X-js",/^on\\w+\\s*=\\s*\'([^\']+)\'/i],["X-js",/^on\\w+\\s*=\\s*([^\\s"\'>]+)/i],["X-20",/^1r\\s*=\\s*"([^"]+)"/i],["X-20",/^1r\\s*=\\s*\'([^\']+)\'/i],["X-20",/^1r\\s*=\\s*([^\\s"\'>]+)/i]]),["in.21"]);k(x([],[["2G",/^[\\S\\s]+/]]),["uq.3J"]);k(u({Y:F,1d:!0,1g:!0,2h:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({Y:"1s,1W,1V"}),["json"]);k(u({Y:H,1d:!0,1g:!0,35:!0,2h:K}),["cs"]);k(u({Y:G,1g:!0}),["java"]);k(u({Y:v,1d:!0,1p:!0}),["bsh","csh","sh"]);k(u({Y:I,1d:!0,1p:!0,2f:!0}),["cv","py"]);k(u({Y:"3u,1M,3v,do,3w,2y,1X,3x,2r,P,2n,T,1z,3y,2E,my,2z,no,3A,2x,2p,2A,3B,3C,1L,1Y,1A,3D,3E,1T,2C,2D",1d:!0,1p:!0,1q:!0}),["perl","pl","pm"]);k(u({Y:J,1d:!0,1p:!0,1q:!0}),["rb"]);k(u({Y:w,1g:!0,1q:!0}),["js"]);k(u({Y:"all,2u,by,2l,1U,14,3l,1V,1O,P,T,in,is,isnt,loop,2o,no,2v,1s,of,off,on,or,V,2q,2B,1W,1x,1Y,1A,3t,1T,yes",1d:3,1g:!0,multilineStrings:!0,2f:!0,1q:!0}),["coffee"]);k(x([],[["1k",/^[\\S\\s]+/]]),["36"]);19.prettyPrintOne=U(a,m,e){6 h=1w.1Q("PRE");h.3K=a;e&&D(h,e);E({g:m,i:e,h:h});V h.3K};19.prettyPrint=U(a){U m(){P(6 e=19.2I?l.22()+3L:3q;p<h.Q&&l.22()<e;p++){6 n=h[p],k=n.17;T(k.2d("3M")>=0){6 k=k.1a(g),f,b;T(b=!k){b=n;P(6 o=1t 0,c=b.1o;c;c=c.1c)6 i=c.1u,o=i===1?o?b:c:i===3?N.1i(c.1v)?b:o:o;b=(f=o===b?1t 0:o)&&"CODE"===f.23}b&&(k=f.17.1a(g));k&&(k=k[1]);b=!1;P(o=n.18;o;o=o.18)T((o.23==="1J"||o.23==="1S"||o.23==="1Z")&&o.17&&o.17.2d("3M")>=0){b=!0;1b}b||((b=(b=n.17.1a(/\\blinenums\\b(?::(\\d+))?/))?b[1]&&b[1].Q?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.Q?setTimeout(m,3L):a&&a()}P(6 e=[1w.2H("1J"),1w.2H("1S"),1w.2H("1Z")],h=[],k=0;k<e.Q;++k)P(6 t=0,s=e[k].Q;t<s;++t)h.R(e[k][t]);6 e=q,l=3N;l.22||(l={22:U(){V+2o 3N}});6 p=0,d,g=/\\blang(?:uage)?-([\\w.]+)(?!\\S)/;m()};19.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"3H",PR_ATTRIB_VALUE:"2G",PR_COMMENT:"1l",PR_DECLARATION:"3F",PR_KEYWORD:"39",PR_LITERAL:"2j",PR_NOCODE:"2b",PR_PLAIN:"1f",PR_PUNCTUATION:"1P",PR_SOURCE:"34",PR_STRING:"1k",PR_TAG:"21",PR_TYPE:"2i"}})();', [], 236, "||||||var|||||||||||||||||||||||||||||||||||||||||||||for|length|push||if|function|return|substring|lang|keywords||||||else|case||className|parentNode|window|match|break|nextSibling|hashComments|replace|pln|cStyleComments||test|Math|str|com|appendChild|charAt|firstChild|multiLineStrings|regexLiterals|style|null|void|nodeType|nodeValue|document|try|default|import|until|||||max|join|currentStyle|getComputedStyle|pre|typeof|undef|delete||finally|pun|createElement|console|code|while|class|false|true|eval|unless|xmp|css|tag|now|tagName|charCodeAt|122|min|NaN||throw|switch|nocode|string|indexOf|hasOwnProperty|tripleQuotedStrings|elif|types|typ|lit|createTextNode|catch|stack|goto|new|package|super|foreach||set|and|not||print|elsif|next|redo|then|BEGIN|END|local||atv|getElementsByTagName|PR_SHOULD_USE_CONTINUATION|parseInt|String|fromCharCode|||apply|source|ignoreCase||global|RegExp|nodeName|||whiteSpace|defaultView|getPropertyValue|white|space|||src|verbatimStrings|regex|continue|instanceof|kwd|xa0||removeChild|index|insertBefore|ownerDocument|override|markup|float|int|export|extends|||from|with|Infinity|def|yield|when|caller|die|dump|exit|last||our|require|sub|use|wantarray|dec|script|atn||val|innerHTML|250|prettyprint|Date".split("|"), 0, {})), !function (a, b, c, d) {
    "use strict";
    var e = c(a), f = c(b), g = c.fancybox = function () {
        g.open.apply(this, arguments)
    }, h = navigator.userAgent.match(/msie/), i = null, j = b.createTouch !== d, k = function (a) {
        return a && a.hasOwnProperty && a instanceof c
    }, l = function (a) {
        return a && "string" === c.type(a)
    }, m = function (a) {
        return l(a) && a.indexOf("%") > 0
    }, n = function (a) {
        return a && !(a.style.overflow && "hidden" === a.style.overflow) && (a.clientWidth && a.scrollWidth > a.clientWidth || a.clientHeight && a.scrollHeight > a.clientHeight)
    }, o = function (a, b) {
        var c = parseInt(a, 10) || 0;
        return b && m(a) && (c = g.getViewport()[b] / 100 * c), Math.ceil(c)
    }, p = function (a, b) {
        return o(a, b) + "px"
    };
    c.extend(g, {
        version: "2.1.4",
        defaults: {
            padding: 10,
            margin: 20,
            width: 640,
            height: 420,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !j,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {dataType: "html", headers: {"X-fancyBox": !0}},
            iframe: {scrolling: "auto", preload: !0},
            swf: {wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always"},
            keys: {
                next: {13: "left", 34: "up", 39: "left", 40: "up"},
                prev: {8: "right", 33: "down", 37: "right", 38: "down"},
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {next: "left", prev: "right"},
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (h ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="关闭" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="下一张" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="上一张" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 150,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 150,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {overlay: !0, title: !0},
            onCancel: c.noop,
            beforeLoad: c.noop,
            afterLoad: c.noop,
            beforeShow: c.noop,
            afterShow: c.noop,
            beforeChange: c.noop,
            beforeClose: c.noop,
            afterClose: c.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {timer: null, isActive: !1},
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (a, b) {
            return a && (c.isPlainObject(b) || (b = {}), !1 !== g.close(!0)) ? (c.isArray(a) || (a = k(a) ? c(a).get() : [a]), c.each(a, function (e, f) {
                var h, i, j, m, n, o, p, q = {};
                "object" === c.type(f) && (f.nodeType && (f = c(f)), k(f) ? (q = {
                    href: f.data("fancybox-href") || f.attr("href"),
                    title: f.data("fancybox-title") || f.attr("title"),
                    isDom: !0,
                    element: f
                }, c.metadata && c.extend(!0, q, f.metadata())) : q = f), h = b.href || q.href || (l(f) ? f : null), i = b.title !== d ? b.title : q.title || "", j = b.content || q.content, m = j ? "html" : b.type || q.type, !m && q.isDom && (m = f.data("fancybox-type"), m || (n = f.prop("class").match(/fancybox\.(\w+)/), m = n ? n[1] : null)), l(h) && (m || (g.isImage(h) ? m = "image" : g.isSWF(h) ? m = "swf" : "#" === h.charAt(0) ? m = "inline" : l(f) && (m = "html", j = f)), "ajax" === m && (o = h.split(/\s+/, 2), h = o.shift(), p = o.shift())), j || ("inline" === m ? h ? j = c(l(h) ? h.replace(/.*(?=#[^\s]+$)/, "") : h) : q.isDom && (j = f) : "html" === m ? j = h : m || h || !q.isDom || (m = "inline", j = f)), c.extend(q, {
                    href: h,
                    type: m,
                    content: j,
                    title: i,
                    selector: p
                }), a[e] = q
            }), g.opts = c.extend(!0, {}, g.defaults, b), b.keys !== d && (g.opts.keys = b.keys ? c.extend({}, g.defaults.keys, b.keys) : !1), g.group = a, g._start(g.opts.index)) : void 0
        },
        cancel: function () {
            var a = g.coming;
            a && !1 !== g.trigger("onCancel") && (g.hideLoading(), g.ajaxLoad && g.ajaxLoad.abort(), g.ajaxLoad = null, g.imgPreload && (g.imgPreload.onload = g.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), g.coming = null, g.current || g._afterZoomOut(a))
        },
        close: function (a) {
            g.cancel(), !1 !== g.trigger("beforeClose") && (g.unbindEvents(), g.isActive && (g.isOpen && a !== !0 ? (g.isOpen = g.isOpened = !1, g.isClosing = !0, c(".fancybox-item, .fancybox-nav").remove(), g.wrap.stop(!0, !0).removeClass("fancybox-opened"), g.transitions[g.current.closeMethod]()) : (c(".fancybox-wrap").stop(!0).trigger("onReset").remove(), g._afterZoomOut())))
        },
        play: function (a) {
            var b = function () {
                clearTimeout(g.player.timer)
            }, d = function () {
                b(), g.current && g.player.isActive && (g.player.timer = setTimeout(g.next, g.current.playSpeed))
            }, e = function () {
                b(), c("body").unbind(".player"), g.player.isActive = !1, g.trigger("onPlayEnd")
            }, f = function () {
                g.current && (g.current.loop || g.current.index < g.group.length - 1) && (g.player.isActive = !0, c("body").bind({
                    "afterShow.player onUpdate.player": d,
                    "onCancel.player beforeClose.player": e,
                    "beforeLoad.player": b
                }), d(), g.trigger("onPlayStart"))
            };
            a === !0 || !g.player.isActive && a !== !1 ? f() : e()
        },
        next: function (a) {
            var b = g.current;
            b && (l(a) || (a = b.direction.next), g.jumpto(b.index + 1, a, "next"))
        },
        prev: function (a) {
            var b = g.current;
            b && (l(a) || (a = b.direction.prev), g.jumpto(b.index - 1, a, "prev"))
        },
        jumpto: function (a, b, c) {
            var e = g.current;
            e && (a = o(a), g.direction = b || e.direction[a >= e.index ? "next" : "prev"], g.router = c || "jumpto", e.loop && (0 > a && (a = e.group.length + a % e.group.length), a %= e.group.length), e.group[a] !== d && (g.cancel(), g._start(a)))
        },
        reposition: function (a, b) {
            var d, e = g.current, f = e ? e.wrap : null;
            f && (d = g._getPosition(b), a && "scroll" === a.type ? (delete d.position, f.stop(!0, !0).animate(d, 200)) : (f.css(d), e.pos = c.extend({}, e.dim, d)))
        },
        update: function (a) {
            var b = a && a.type, c = !b || "orientationchange" === b;
            c && (clearTimeout(i), i = null), g.isOpen && !i && (i = setTimeout(function () {
                var d = g.current;
                d && !g.isClosing && (g.wrap.removeClass("fancybox-tmp"), (c || "load" === b || "resize" === b && d.autoResize) && g._setDimension(), "scroll" === b && d.canShrink || g.reposition(a), g.trigger("onUpdate"), i = null)
            }, c && !j ? 0 : 300))
        },
        toggle: function (a) {
            g.isOpen && (g.current.fitToView = "boolean" === c.type(a) ? a : !g.current.fitToView, j && (g.wrap.removeAttr("style").addClass("fancybox-tmp"), g.trigger("onUpdate")), g.update())
        },
        hideLoading: function () {
            f.unbind(".loading"), c("#fancybox-loading").remove()
        },
        showLoading: function () {
            var a, b;
            g.hideLoading(), a = c('<div id="fancybox-loading"><div></div></div>').click(g.cancel).appendTo("body"), f.bind("keydown.loading", function (a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(), g.cancel())
            }), g.defaults.fixed || (b = g.getViewport(), a.css({
                position: "absolute",
                top: .5 * b.h + b.y,
                left: .5 * b.w + b.x
            }))
        },
        getViewport: function () {
            var b = g.current && g.current.locked || !1, c = {x: e.scrollLeft(), y: e.scrollTop()};
            return b ? (c.w = b[0].clientWidth, c.h = b[0].clientHeight) : (c.w = j && a.innerWidth ? a.innerWidth : e.width(), c.h = j && a.innerHeight ? a.innerHeight : e.height()), c
        },
        unbindEvents: function () {
            g.wrap && k(g.wrap) && g.wrap.unbind(".fb"), f.unbind(".fb"), e.unbind(".fb")
        },
        bindEvents: function () {
            var a, b = g.current;
            b && (e.bind("orientationchange.fb" + (j ? "" : " resize.fb") + (b.autoCenter && !b.locked ? " scroll.fb" : ""), g.update), a = b.keys, a && f.bind("keydown.fb", function (e) {
                var f = e.which || e.keyCode, h = e.target || e.srcElement;
                return 27 === f && g.coming ? !1 : (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || h && (h.type || c(h).is("[contenteditable]")) || c.each(a, function (a, h) {
                    return b.group.length > 1 && h[f] !== d ? (g[a](h[f]), e.preventDefault(), !1) : c.inArray(f, h) > -1 ? (g[a](), e.preventDefault(), !1) : void 0
                }), void 0)
            }), c.fn.mousewheel && b.mouseWheel && g.wrap.bind("mousewheel.fb", function (a, d, e, f) {
                for (var h = a.target || null, i = c(h), j = !1; i.length && !(j || i.is(".fancybox-skin") || i.is(".fancybox-wrap"));) j = n(i[0]), i = c(i).parent();
                0 === d || j || g.group.length > 1 && !b.canShrink && (f > 0 || e > 0 ? g.prev(f > 0 ? "down" : "left") : (0 > f || 0 > e) && g.next(0 > f ? "up" : "right"), a.preventDefault())
            }))
        },
        trigger: function (a, b) {
            var d, e = b || g.coming || g.current;
            if (e) {
                if (c.isFunction(e[a]) && (d = e[a].apply(e, Array.prototype.slice.call(arguments, 1))), d === !1) return !1;
                e.helpers && c.each(e.helpers, function (b, d) {
                    d && g.helpers[b] && c.isFunction(g.helpers[b][a]) && (d = c.extend(!0, {}, g.helpers[b].defaults, d), g.helpers[b][a](d, e))
                }), c.event.trigger(a + ".fb")
            }
        },
        isImage: function (a) {
            return l(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
        },
        isSWF: function (a) {
            return l(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (a) {
            var b, d, e, f, h, i = {};
            if (a = o(a), b = g.group[a] || null, !b) return !1;
            if (i = c.extend(!0, {}, g.opts, b), f = i.margin, h = i.padding, "number" === c.type(f) && (i.margin = [f, f, f, f]), "number" === c.type(h) && (i.padding = [h, h, h, h]), i.modal && c.extend(!0, i, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {overlay: {closeClick: !1}}
            }), i.autoSize && (i.autoWidth = i.autoHeight = !0), "auto" === i.width && (i.autoWidth = !0), "auto" === i.height && (i.autoHeight = !0), i.group = g.group, i.index = a, g.coming = i, !1 === g.trigger("beforeLoad")) return g.coming = null, void 0;
            if (e = i.type, d = i.href, !e) return g.coming = null, g.current && g.router && "jumpto" !== g.router ? (g.current.index = a, g[g.router](g.direction)) : !1;
            if (g.isActive = !0, ("image" === e || "swf" === e) && (i.autoHeight = i.autoWidth = !1, i.scrolling = "visible"), "image" === e && (i.aspectRatio = !0), "iframe" === e && j && (i.scrolling = "scroll"), i.wrap = c(i.tpl.wrap).addClass("fancybox-" + (j ? "mobile" : "desktop") + " fancybox-type-" + e + " fancybox-tmp " + i.wrapCSS).appendTo(i.parent || "body"), c.extend(i, {
                skin: c(".fancybox-skin", i.wrap),
                outer: c(".fancybox-outer", i.wrap),
                inner: c(".fancybox-inner", i.wrap)
            }), c.each(["Top", "Right", "Bottom", "Left"], function (a, b) {
                i.skin.css("padding" + b, p(i.padding[a]))
            }), g.trigger("onReady"), "inline" === e || "html" === e) {
                if (!i.content || !i.content.length) return g._error("content")
            } else if (!d) return g._error("href");
            "image" === e ? g._loadImage() : "ajax" === e ? g._loadAjax() : "iframe" === e ? g._loadIframe() : g._afterLoad()
        },
        _error: function (a) {
            c.extend(g.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: g.coming.tpl.error
            }), g._afterLoad()
        },
        _loadImage: function () {
            var a = g.imgPreload = new Image;
            a.onload = function () {
                this.onload = this.onerror = null, g.coming.width = this.width, g.coming.height = this.height, g._afterLoad()
            }, a.onerror = function () {
                this.onload = this.onerror = null, g._error("image")
            }, a.src = g.coming.href, a.complete !== !0 && g.showLoading()
        },
        _loadAjax: function () {
            var a = g.coming;
            g.showLoading(), g.ajaxLoad = c.ajax(c.extend({}, a.ajax, {
                url: a.href, error: function (a, b) {
                    g.coming && "abort" !== b ? g._error("ajax", a) : g.hideLoading()
                }, success: function (b, c) {
                    "success" === c && (a.content = b, g._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var a = g.coming,
                b = c(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", j ? "auto" : a.iframe.scrolling).attr("src", a.href);
            c(a.wrap).bind("onReset", function () {
                try {
                    c(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {
                }
            }), a.iframe.preload && (g.showLoading(), b.one("load", function () {
                c(this).data("ready", 1), j || c(this).bind("load.fb", g.update), c(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), g._afterLoad()
            })), a.content = b.appendTo(a.inner), a.iframe.preload || g._afterLoad()
        },
        _preloadImages: function () {
            var a, b, c = g.group, d = g.current, e = c.length, f = d.preload ? Math.min(d.preload, e - 1) : 0;
            for (b = 1; f >= b; b += 1) a = c[(d.index + b) % e], "image" === a.type && a.href && ((new Image).src = a.href)
        },
        _afterLoad: function () {
            var a, b, d, e, f, h, i = g.coming, j = g.current, l = "fancybox-placeholder";
            if (g.hideLoading(), i && g.isActive !== !1) {
                if (!1 === g.trigger("afterLoad", i, j)) return i.wrap.stop(!0).trigger("onReset").remove(), g.coming = null, void 0;
                switch (j && (g.trigger("beforeChange", j), j.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), g.unbindEvents(), a = i, b = i.content, d = i.type, e = i.scrolling, c.extend(g, {
                    wrap: a.wrap,
                    skin: a.skin,
                    outer: a.outer,
                    inner: a.inner,
                    current: a,
                    previous: j
                }), f = a.href, d) {
                    case"inline":
                    case"ajax":
                    case"html":
                        a.selector ? b = c("<div>").html(b).find(a.selector) : k(b) && (b.data(l) || b.data(l, c('<div class="' + l + '"></div>').insertAfter(b).hide()), b = b.show().detach(), a.wrap.bind("onReset", function () {
                            c(this).find(b).length && b.hide().replaceAll(b.data(l)).data(l, !1)
                        }));
                        break;
                    case"image":
                        b = a.tpl.image.replace("{href}", f);
                        break;
                    case"swf":
                        b = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + f + '"></param>', h = "", c.each(a.swf, function (a, c) {
                            b += '<param name="' + a + '" value="' + c + '"></param>', h += " " + a + '="' + c + '"'
                        }), b += '<embed src="' + f + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                }
                k(b) && b.parent().is(a.inner) || a.inner.append(b), g.trigger("beforeShow"), a.inner.css("overflow", "yes" === e ? "scroll" : "no" === e ? "hidden" : e), g._setDimension(), g.reposition(), g.isOpen = !1, g.coming = null, g.bindEvents(), g.isOpened ? j.prevMethod && g.transitions[j.prevMethod]() : c(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), g.transitions[g.isOpened ? a.nextMethod : a.openMethod](), g._preloadImages()
            }
        },
        _setDimension: function () {
            var a, b, d, e, f, h, i, j, k, l, n, q, r, s, t, u = g.getViewport(), v = 0, w = !1, x = !1, y = g.wrap,
                z = g.skin, A = g.inner, B = g.current, C = B.width, D = B.height, E = B.minWidth, F = B.minHeight,
                G = B.maxWidth, H = B.maxHeight, I = B.scrolling, J = B.scrollOutside ? B.scrollbarWidth : 0,
                K = B.margin, L = o(K[1] + K[3]), M = o(K[0] + K[2]);
            if (y.add(z).add(A).width("auto").height("auto").removeClass("fancybox-tmp"), a = o(z.outerWidth(!0) - z.width()), b = o(z.outerHeight(!0) - z.height()), d = L + a, e = M + b, f = m(C) ? (u.w - d) * o(C) / 100 : C, h = m(D) ? (u.h - e) * o(D) / 100 : D, "iframe" === B.type) {
                if (s = B.content, B.autoHeight && 1 === s.data("ready")) try {
                    s[0].contentWindow.document.location && (A.width(f).height(9999), t = s.contents().find("body"), J && t.css("overflow-x", "hidden"), h = t.height())
                } catch (N) {
                }
            } else (B.autoWidth || B.autoHeight) && (A.addClass("fancybox-tmp"), B.autoWidth || A.width(f), B.autoHeight || A.height(h), B.autoWidth && (f = A.width()), B.autoHeight && (h = A.height()), A.removeClass("fancybox-tmp"));
            if (C = o(f), D = o(h), k = f / h, E = o(m(E) ? o(E, "w") - d : E), G = o(m(G) ? o(G, "w") - d : G), F = o(m(F) ? o(F, "h") - e : F), H = o(m(H) ? o(H, "h") - e : H), i = G, j = H, B.fitToView && (G = Math.min(u.w - d, G), H = Math.min(u.h - e, H)), q = u.w - L, r = u.h - M, B.aspectRatio ? (C > G && (C = G, D = o(C / k)), D > H && (D = H, C = o(D * k)), E > C && (C = E, D = o(C / k)), F > D && (D = F, C = o(D * k))) : (C = Math.max(E, Math.min(C, G)), B.autoHeight && "iframe" !== B.type && (A.width(C), D = A.height()), D = Math.max(F, Math.min(D, H))), B.fitToView) if (A.width(C).height(D), y.width(C + a), l = y.width(), n = y.height(), B.aspectRatio) for (; (l > q || n > r) && C > E && D > F && !(v++ > 19);) D = Math.max(F, Math.min(H, D - 10)), C = o(D * k), E > C && (C = E, D = o(C / k)), C > G && (C = G, D = o(C / k)), A.width(C).height(D), y.width(C + a), l = y.width(), n = y.height(); else C = Math.max(E, Math.min(C, C - (l - q))), D = Math.max(F, Math.min(D, D - (n - r)));
            J && "auto" === I && h > D && q > C + a + J && (C += J), A.width(C).height(D), y.width(C + a), l = y.width(), n = y.height(), w = (l > q || n > r) && C > E && D > F, x = B.aspectRatio ? i > C && j > D && f > C && h > D : (i > C || j > D) && (f > C || h > D), c.extend(B, {
                dim: {
                    width: p(l),
                    height: p(n)
                },
                origWidth: f,
                origHeight: h,
                canShrink: w,
                canExpand: x,
                wPadding: a,
                hPadding: b,
                wrapSpace: n - z.outerHeight(!0),
                skinSpace: z.height() - D
            }), !s && B.autoHeight && D > F && H > D && !x && A.height("auto")
        },
        _getPosition: function (a) {
            var b = g.current, c = g.getViewport(), d = b.margin, e = g.wrap.width() + d[1] + d[3],
                f = g.wrap.height() + d[0] + d[2], h = {position: "absolute", top: d[0], left: d[3]};
            return b.autoCenter && b.fixed && !a && f <= c.h && e <= c.w ? h.position = "fixed" : b.locked || (h.top += c.y, h.left += c.x), h.top = p(Math.max(h.top, h.top + (c.h - f) * b.topRatio)), h.left = p(Math.max(h.left, h.left + (c.w - e) * b.leftRatio)), h
        },
        _afterZoomIn: function () {
            var a = g.current;
            a && (g.isOpen = g.isOpened = !0, g.wrap.css("overflow", "visible").addClass("fancybox-opened"), g.update(), (a.closeClick || a.nextClick && g.group.length > 1) && g.inner.css("cursor", "pointer").bind("click.fb", function (b) {
                c(b.target).is("a") || c(b.target).parent().is("a") || (b.preventDefault(), g[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && c(a.tpl.closeBtn).appendTo(g.skin).bind("click.fb", function (a) {
                a.preventDefault(), g.close()
            }), a.arrows && g.group.length > 1 && ((a.loop || a.index > 0) && c(a.tpl.prev).appendTo(g.outer).bind("click.fb", g.prev), (a.loop || a.index < g.group.length - 1) && c(a.tpl.next).appendTo(g.outer).bind("click.fb", g.next)), g.trigger("afterShow"), a.loop || a.index !== a.group.length - 1 ? g.opts.autoPlay && !g.player.isActive && (g.opts.autoPlay = !1, g.play()) : g.play(!1))
        },
        _afterZoomOut: function (a) {
            a = a || g.current, c(".fancybox-wrap").trigger("onReset").remove(), c.extend(g, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), g.trigger("afterClose", a)
        }
    }), g.transitions = {
        getOrigPosition: function () {
            var a = g.current, b = a.element, c = a.orig, d = {}, e = 50, f = 50, h = a.hPadding, i = a.wPadding,
                j = g.getViewport();
            return !c && a.isDom && b.is(":visible") && (c = b.find("img:first"), c.length || (c = b)), k(c) ? (d = c.offset(), c.is("img") && (e = c.outerWidth(), f = c.outerHeight())) : (d.top = j.y + (j.h - f) * a.topRatio, d.left = j.x + (j.w - e) * a.leftRatio), ("fixed" === g.wrap.css("position") || a.locked) && (d.top -= j.y, d.left -= j.x), d = {
                top: p(d.top - h * a.topRatio),
                left: p(d.left - i * a.leftRatio),
                width: p(e + i),
                height: p(f + h)
            }
        }, step: function (a, b) {
            var c, d, e, f = b.prop, h = g.current, i = h.wrapSpace, j = h.skinSpace;
            ("width" === f || "height" === f) && (c = b.end === b.start ? 1 : (a - b.start) / (b.end - b.start), g.isClosing && (c = 1 - c), d = "width" === f ? h.wPadding : h.hPadding, e = a - d, g.skin[f](o("width" === f ? e : e - i * c)), g.inner[f](o("width" === f ? e : e - i * c - j * c)))
        }, zoomIn: function () {
            var a = g.current, b = a.pos, d = a.openEffect, e = "elastic" === d, f = c.extend({opacity: 1}, b);
            delete f.position, e ? (b = this.getOrigPosition(), a.openOpacity && (b.opacity = .1)) : "fade" === d && (b.opacity = .1), g.wrap.css(b).animate(f, {
                duration: "none" === d ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: e ? this.step : null,
                complete: g._afterZoomIn
            })
        }, zoomOut: function () {
            var a = g.current, b = a.closeEffect, c = "elastic" === b, d = {opacity: .1};
            c && (d = this.getOrigPosition(), a.closeOpacity && (d.opacity = .1)), g.wrap.animate(d, {
                duration: "none" === b ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: c ? this.step : null,
                complete: g._afterZoomOut
            })
        }, changeIn: function () {
            var a, b = g.current, c = b.nextEffect, d = b.pos, e = {opacity: 1}, f = g.direction, h = 200;
            d.opacity = .1, "elastic" === c && (a = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (d[a] = p(o(d[a]) - h), e[a] = "+=" + h + "px") : (d[a] = p(o(d[a]) + h), e[a] = "-=" + h + "px")), "none" === c ? g._afterZoomIn() : g.wrap.css(d).animate(e, {
                duration: b.nextSpeed,
                easing: b.nextEasing,
                complete: g._afterZoomIn
            })
        }, changeOut: function () {
            var a = g.previous, b = a.prevEffect, d = {opacity: .1}, e = g.direction, f = 200;
            "elastic" === b && (d["down" === e || "up" === e ? "top" : "left"] = ("up" === e || "left" === e ? "-" : "+") + "=" + f + "px"), a.wrap.animate(d, {
                duration: "none" === b ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function () {
                    c(this).trigger("onReset").remove()
                }
            })
        }
    }, g.helpers.overlay = {
        defaults: {closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !j, fixed: !0},
        overlay: null,
        fixed: !1,
        create: function (a) {
            a = c.extend({}, this.defaults, a), this.overlay && this.close(), this.overlay = c('<div class="fancybox-overlay"></div>').appendTo("body"), this.fixed = !1, a.fixed && g.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !1)
        },
        open: function (a) {
            var b = this;
            a = c.extend({}, this.defaults, a), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a), this.fixed || (e.bind("resize.overlay", c.proxy(this.update, this)), this.update()), a.closeClick && this.overlay.bind("click.overlay", function (a) {
                c(a.target).hasClass("fancybox-overlay") && (g.isActive ? g.close() : b.close())
            }), this.overlay.css(a.css).show()
        },
        close: function () {
            c(".fancybox-overlay").remove(), e.unbind("resize.overlay"), this.overlay = null, this.margin !== !1 && (c("body").css("margin-right", this.margin), this.margin = !1), this.el && this.el.removeClass("fancybox-lock")
        },
        update: function () {
            var a, c = "100%";
            this.overlay.width(c).height("100%"), h ? (a = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), f.width() > a && (c = f.width())) : f.width() > e.width() && (c = f.width()), this.overlay.width(c).height(f.height())
        },
        onReady: function (a, d) {
            c(".fancybox-overlay").stop(!0, !0), this.overlay || (this.margin = f.height() > e.height() || "scroll" === c("body").css("overflow-y") ? c("body").css("margin-right") : !1, this.el = b.all && !b.querySelector ? c("html") : c("body"), this.create(a)), a.locked && this.fixed && (d.locked = this.overlay.append(d.wrap), d.fixed = !1), a.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (a, b) {
            b.locked && (this.el.addClass("fancybox-lock"), this.margin !== !1 && c("body").css("margin-right", o(this.margin) + b.scrollbarWidth)), this.open(a)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (a) {
            this.overlay && !g.isActive && this.overlay.fadeOut(a.speedOut, c.proxy(this.close, this))
        }
    }, g.helpers.title = {
        defaults: {type: "inside", position: "bottom"}, beforeShow: function (a) {
            var b, d, e = g.current, f = e.title, i = a.type;
            if (c.isFunction(f) && (f = f.call(e.element, e)), l(f) && "" !== c.trim(f)) {
                switch (b = c('<div class="fancybox-title fancybox-title-' + i + '-wrap">' + f + "</div>"), i) {
                    case"inside":
                        d = g.skin;
                        break;
                    case"outside":
                        d = g.wrap;
                        break;
                    case"over":
                        d = g.inner;
                        break;
                    default:
                        d = g.skin, b.appendTo("body"), h && b.width(b.width()), b.wrapInner('<span class="child"></span>'), g.current.margin[2] += Math.abs(o(b.css("margin-bottom")))
                }
                b["top" === a.position ? "prependTo" : "appendTo"](d)
            }
        }
    }, c.fn.fancybox = function (a) {
        var b, d = c(this), e = this.selector || "", h = function (f) {
            var h, i, j = c(this).blur(), k = b;
            f.ctrlKey || f.altKey || f.shiftKey || f.metaKey || j.is(".fancybox-wrap") || (h = a.groupAttr || "data-fancybox-group", i = j.attr(h), i || (h = "rel", i = j.get(0)[h]), i && "" !== i && "nofollow" !== i && (j = e.length ? c(e) : d, j = j.filter("[" + h + '="' + i + '"]'), k = j.index(this)), a.index = k, g.open(j, a) !== !1 && f.preventDefault())
        };
        return a = a || {}, b = a.index || 0, e && a.live !== !1 ? f.undelegate(e, "click.fb-start").delegate(e + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", h) : d.unbind("click.fb-start").bind("click.fb-start", h), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, f.ready(function () {
        c.scrollbarWidth === d && (c.scrollbarWidth = function () {
            var a = c('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(), d = b.innerWidth() - b.height(99).innerWidth();
            return a.remove(), d
        }), c.support.fixedPosition === d && (c.support.fixedPosition = function () {
            var a = c('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            return a.remove(), b
        }()), c.extend(g.defaults, {
            scrollbarWidth: c.scrollbarWidth(),
            fixed: c.support.fixedPosition,
            parent: c("body")
        })
    })
}(window, document, jQuery), function (a) {
    function b(b) {
        var c = b || window.event, d = [].slice.call(arguments, 1), e = 0, f = 0, g = 0, b = a.event.fix(c);
        return b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), g = e, void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (g = 0, f = -1 * e), void 0 !== c.wheelDeltaY && (g = c.wheelDeltaY / 120), void 0 !== c.wheelDeltaX && (f = -1 * c.wheelDeltaX / 120), d.unshift(b, e, f, g), (a.event.dispatch || a.event.handle).apply(this, d)
    }

    var c, d = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks) for (c = d.length; c;) a.event.fixHooks[d[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var a = d.length; a;) this.addEventListener(d[--a], b, !1); else this.onmousewheel = b
        }, teardown: function () {
            if (this.removeEventListener) for (var a = d.length; a;) this.removeEventListener(d[--a], b, !1); else this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        }, unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
}(jQuery), window.jQuery, $(document).ready(function () {
    $(".fancybox").fancybox(), $("#showdiv").fancybox({centerOnScroll: !0})
}), !function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    "use strict";
    var b = window.Slick || {};
    b = function () {
        function b(b, d) {
            var e, f, g = this;
            if (g.defaults = {
                accessibility: !0,
                arrows: !0,
                autoplay: !1,
                autoplaySpeed: 6e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (a, b) {
                    return '<button type="button">' + (b + 1) + "</button>"
                },
                dots: !1,
                draggable: !0,
                easing: "linear",
                fade: !1,
                infinite: !0,
                lazyLoad: "ondemand",
                onBeforeChange: null,
                onAfterChange: null,
                onInit: null,
                onReInit: null,
                pauseOnHover: !0,
                responsive: null,
                slide: "div",
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 300,
                swipe: !0,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                vertical: !1
            }, g.initials = {
                animating: !1,
                autoPlayTimer: null,
                currentSlide: 0,
                currentLeft: null,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1
            }, a.extend(g, g.initials), g.activeBreakpoint = null, g.animType = null, g.animProp = null, g.breakpoints = [], g.breakpointSettings = [], g.cssTransitions = !1, g.paused = !1, g.positionProp = null, g.$slider = a(b), g.$slidesCache = null, g.transformType = null, g.transitionType = null, g.windowWidth = 0, g.windowTimer = null, g.options = a.extend({}, g.defaults, d), g.originalSettings = g.options, e = g.options.responsive || null, e && e.length > -1) {
                for (f in e) e.hasOwnProperty(f) && (g.breakpoints.push(e[f].breakpoint), g.breakpointSettings[e[f].breakpoint] = e[f].settings);
                g.breakpoints.sort(function (a, b) {
                    return b - a
                })
            }
            g.autoPlay = a.proxy(g.autoPlay, g), g.autoPlayClear = a.proxy(g.autoPlayClear, g), g.changeSlide = a.proxy(g.changeSlide, g), g.setPosition = a.proxy(g.setPosition, g), g.swipeHandler = a.proxy(g.swipeHandler, g), g.dragHandler = a.proxy(g.dragHandler, g), g.keyHandler = a.proxy(g.keyHandler, g), g.autoPlayIterator = a.proxy(g.autoPlayIterator, g), g.instanceUid = c++, g.init()
        }

        var c = 0;
        return b
    }(), b.prototype.addSlide = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).remove(), e.$slideTrack.append(e.$slides), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateSlide = function (b, c) {
        var d = {}, e = this;
        e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({left: b}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({top: b}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? a({animStart: e.currentLeft}).animate({animStart: b}, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function (a) {
                e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function () {
                c && c.call()
            }
        }) : (e.applyTransition(), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.applyTransition = function (a) {
        var b = this, c = {};
        c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function () {
        var a = this;
        a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
    }, b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow = a('<button type="button" class="slick-prev">Previous</button>').appendTo(b.$slider), b.$nextArrow = a('<button type="button" class="slick-next">Next</button>').appendTo(b.$slider), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled"))
    }, b.prototype.buildDots = function () {
        var b, c, d = this;
        if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
            for (c = '<ul class="slick-dots">', b = 0; b <= d.getDotCount(); b += 1) c += "<li>" + d.options.customPaging.call(this, d, b) + "</li>";
            c += "</ul>", d.$dots = a(c).appendTo(d.$slider), d.$dots.find("li").first().addClass("slick-active")
        }
    }, b.prototype.buildOut = function () {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), b.options.centerMode === !0 && (b.options.infinite = !0, b.options.slidesToScroll = 1, 0 === b.options.slidesToShow % 2 && (b.options.slidesToShow = 3)), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.options.accessibility === !0 && b.$list.prop("tabIndex", 0), b.setSlideClasses(0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.checkResponsive = function () {
        var b, c, d = this;
        if (d.originalSettings.responsive && d.originalSettings.responsive.length > -1 && null !== d.originalSettings.responsive) {
            c = null;
            for (b in d.breakpoints) d.breakpoints.hasOwnProperty(b) && a(window).width() < d.breakpoints[b] && (c = d.breakpoints[b]);
            null !== c ? null !== d.activeBreakpoint ? c !== d.activeBreakpoint && (d.activeBreakpoint = c, d.options = a.extend({}, d.defaults, d.breakpointSettings[c]), d.refresh()) : (d.activeBreakpoint = c, d.options = a.extend({}, d.defaults, d.breakpointSettings[c]), d.refresh()) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = a.extend({}, d.defaults, d.originalSettings), d.refresh())
        }
    }, b.prototype.changeSlide = function (b) {
        var c = this;
        switch (b.data.message) {
            case"previous":
                c.slideHandler(c.currentSlide - c.options.slidesToScroll);
                break;
            case"next":
                c.slideHandler(c.currentSlide + c.options.slidesToScroll);
                break;
            case"index":
                c.slideHandler(a(b.target).parent().index() * c.options.slidesToScroll);
                break;
            default:
                return !1
        }
    }, b.prototype.destroy = function () {
        var b = this;
        b.autoPlayClear(), b.touchObject = {}, a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()), b.$slides.unwrap().unwrap(), b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style"), b.$slider.removeClass("slick-slider"), b.$slider.removeClass("slick-initialized"), b.$list.off(".slick"), a(window).off(".slick-" + b.instanceUid)
    }, b.prototype.disableTransition = function (a) {
        var b = this, c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({zIndex: 1e3}), c.$slides.eq(a).animate({opacity: 1}, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: 1e3
        }), b && setTimeout(function () {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.filterSlides = function (a) {
        var b = this;
        null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).remove(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.getCurrent = function () {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function () {
        var a, b = this, c = 0, d = 0, e = 0;
        for (a = b.options.infinite === !0 ? b.slideCount + b.options.slidesToShow - b.options.slidesToScroll : b.slideCount; a > c;) e++, d += b.options.slidesToScroll, c = d + b.options.slidesToShow;
        return e
    }, b.prototype.getLeft = function (a) {
        var b, c, d = this, e = 0;
        return d.slideOffset = 0, c = d.$slides.first().outerHeight(), d.options.infinite === !0 ? (d.slideCount > d.options.slidesToShow && (d.slideOffset = -1 * d.slideWidth * d.options.slidesToShow, e = -1 * c * d.options.slidesToShow), 0 !== d.slideCount % d.options.slidesToScroll && a + d.options.slidesToScroll > d.slideCount && d.slideCount > d.options.slidesToShow && (d.slideOffset = -1 * d.slideCount % d.options.slidesToShow * d.slideWidth, e = -1 * d.slideCount % d.options.slidesToShow * c)) : 0 !== d.slideCount % d.options.slidesToShow && a + d.options.slidesToScroll > d.slideCount && d.slideCount > d.options.slidesToShow && (d.slideOffset = d.options.slidesToShow * d.slideWidth - d.slideCount % d.options.slidesToShow * d.slideWidth, e = d.slideCount % d.options.slidesToShow * c), d.options.centerMode === !0 && (d.slideOffset += d.slideWidth * Math.floor(d.options.slidesToShow / 2) - d.slideWidth), b = d.options.vertical === !1 ? -1 * a * d.slideWidth + d.slideOffset : -1 * a * c + e
    }, b.prototype.init = function () {
        var b = this;
        a(b.$slider).hasClass("slick-initialized") || (a(b.$slider).addClass("slick-initialized"), b.buildOut(), b.setProps(), b.startLoad(), b.loadSlider(), b.initializeEvents(), b.checkResponsive()), null !== b.options.onInit && b.options.onInit.call(this, b)
    }, b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {message: "previous"}, a.changeSlide), a.$nextArrow.on("click.slick", {message: "next"}, a.changeSlide))
    }, b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {message: "index"}, b.changeSlide)
    }, b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {action: "start"}, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {action: "move"}, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {action: "end"}, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, b.swipeHandler), b.options.pauseOnHover === !0 && b.options.autoplay === !0 && (b.$list.on("mouseenter.slick", b.autoPlayClear), b.$list.on("mouseleave.slick", b.autoPlay)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, function () {
            b.checkResponsive(), b.setPosition()
        }), a(window).on("resize.slick.slick-" + b.instanceUid, function () {
            a(window).width !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
                b.windowWidth = a(window).width(), b.checkResponsive(), b.setPosition()
            }, 50))
        }), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
    }, b.prototype.keyHandler = function (a) {
        var b = this;
        37 === a.keyCode ? b.changeSlide({data: {message: "previous"}}) : 39 === a.keyCode && b.changeSlide({data: {message: "next"}})
    }, b.prototype.lazyLoad = function () {
        var b, c, d, e, f = this;
        f.options.centerMode === !0 ? (d = f.options.slidesToShow + f.currentSlide - 1, e = d + f.options.slidesToShow + 2) : (d = f.options.infinite ? f.options.slidesToShow + f.currentSlide : f.currentSlide, e = d + f.options.slidesToShow), b = f.$slider.find(".slick-slide").slice(d, e), a("img[data-lazy]", b).not("[src]").each(function () {
            a(this).css({opacity: 0}).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function () {
                a(this).animate({opacity: 1}, 200)
            })
        }), f.currentSlide >= f.slideCount - f.options.slidesToShow ? (c = f.$slider.find(".slick-cloned").slice(0, f.options.slidesToShow), a("img[data-lazy]", c).not("[src]").each(function () {
            a(this).css({opacity: 0}).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function () {
                a(this).animate({opacity: 1}, 200)
            })
        })) : 0 === f.currentSlide && (c = f.$slider.find(".slick-cloned").slice(-1 * f.options.slidesToShow), a("img[data-lazy]", c).not("[src]").each(function () {
            a(this).css({opacity: 0}).attr("src", a(this).attr("data-lazy")).removeClass("slick-loading").load(function () {
                a(this).animate({opacity: 1}, 200)
            })
        }))
    }, b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(), a.$slideTrack.css({opacity: 1}), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.postSlide = function (a) {
        var b = this;
        null !== b.options.onAfterChange && b.options.onAfterChange.call(this, b, a), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay()
    }, b.prototype.progressiveLazyLoad = function () {
        var b, c, d = this;
        b = a("img[data-lazy]").not("[src]").length, b > 0 && (c = a(a("img[data-lazy]", d.$slider).not("[src]").get(0)), c.attr("src", c.attr("data-lazy")).removeClass("slick-loading").load(function () {
            d.progressiveLazyLoad()
        }))
    }, b.prototype.refresh = function () {
        var b = this;
        b.destroy(), a.extend(b, b.initials), b.init()
    }, b.prototype.reinit = function () {
        var a = this;
        a.$slides = a.$slideTrack.children(a.options.slide).addClass("slick-slide"), a.slideCount = a.$slides.length, a.currentSlide >= a.slideCount && 0 !== a.currentSlide && (a.currentSlide = a.currentSlide - a.options.slidesToScroll), a.setProps(), a.setupInfinite(), a.buildArrows(), a.updateArrows(), a.initArrowEvents(), a.buildDots(), a.updateDots(), a.initDotEvents(), a.setSlideClasses(0), a.setPosition(), null !== a.options.onReInit && a.options.onReInit.call(this, a)
    }, b.prototype.removeSlide = function (a, b) {
        var c = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : c.slideCount - 1) : a = b === !0 ? --a : a, c.slideCount < 1 || 0 > a || a > c.slideCount - 1 ? !1 : (c.unload(), c.$slideTrack.children(this.options.slide).eq(a).remove(), c.$slides = c.$slideTrack.children(this.options.slide), c.$slideTrack.children(this.options.slide).remove(), c.$slideTrack.append(c.$slides), c.$slidesCache = c.$slides, c.reinit(), void 0)
    }, b.prototype.setCSS = function (a) {
        var b, c, d = this, e = {};
        b = "left" == d.positionProp ? a + "px" : "0px", c = "top" == d.positionProp ? a + "px" : "0px", e[d.positionProp] = a, d.transformsEnabled === !1 ? d.$slideTrack.css(e) : (e = {}, d.cssTransitions === !1 ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
    }, b.prototype.setDimensions = function () {
        var a = this;
        a.options.centerMode === !0 ? a.$slideTrack.children(".slick-slide").width(a.slideWidth) : a.$slideTrack.children(".slick-slide").width(a.slideWidth), a.options.vertical === !1 ? (a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length)), a.options.centerMode === !0 && a.$list.css({padding: "0px " + a.options.centerPadding})) : (a.$list.height(a.$slides.first().outerHeight() * a.options.slidesToShow), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight() * a.$slideTrack.children(".slick-slide").length)), a.options.centerMode === !0 && a.$list.css({padding: a.options.centerPadding + " 0px"}))
    }, b.prototype.setFade = function () {
        var b, c = this;
        c.$slides.each(function (d, e) {
            b = -1 * c.slideWidth * d, a(e).css({position: "relative", left: b, top: 0, zIndex: 800, opacity: 0})
        }), c.$slides.eq(c.currentSlide).css({zIndex: 900, opacity: 1})
    }, b.prototype.setPosition = function () {
        var a = this;
        a.setValues(), a.setDimensions(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade()
    }, b.prototype.setProps = function () {
        var a = this;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== document.body.style.WebkitTransition || void 0 !== document.body.style.MozTransition || void 0 !== document.body.style.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), void 0 !== document.body.style.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition"), void 0 !== document.body.style.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition"), void 0 !== document.body.style.msTransform && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType
    }, b.prototype.setValues = function () {
        var a = this;
        a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.slideWidth = a.options.vertical === !1 ? Math.ceil(a.listWidth / a.options.slidesToShow) : Math.ceil(a.listWidth)
    }, b.prototype.setSlideClasses = function (a) {
        var b, c, d, e = this;
        e.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), c = e.$slider.find(".slick-slide"), e.options.centerMode === !0 ? (b = Math.floor(e.options.slidesToShow / 2), a >= b && a <= e.slideCount - 1 - b ? e.$slides.slice(a - b, a + b + 1).addClass("slick-active") : (d = e.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active")), 0 === a ? c.eq(c.length - 1 - e.options.slidesToShow).addClass("slick-center") : a === e.slideCount - 1 && c.eq(e.options.slidesToShow).addClass("slick-center"), e.$slides.eq(a).addClass("slick-center")) : a > 0 && a < e.slideCount - e.options.slidesToShow ? e.$slides.slice(a, a + e.options.slidesToShow).addClass("slick-active") : (d = e.options.infinite === !0 ? e.options.slidesToShow + a : a, c.slice(d, d + e.options.slidesToShow).addClass("slick-active")), "ondemand" === e.options.lazyLoad && e.lazyLoad()
    }, b.prototype.setupInfinite = function () {
        var b, c, d, e = this;
        if ((e.options.fade === !0 || e.options.vertical === !0) && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (c = null, e.slideCount > e.options.slidesToShow)) {
            for (d = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone().attr("id", "").prependTo(e.$slideTrack).addClass("slick-cloned");
            for (b = 0; d > b; b += 1) c = b, a(e.$slides[c]).clone().attr("id", "").appendTo(e.$slideTrack).addClass("slick-cloned");
            e.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.slideHandler = function (a) {
        var b, c, d, e, f = null, g = this;
        return g.animating === !0 ? !1 : (b = a, f = g.getLeft(b), d = g.getLeft(g.currentSlide), e = 0 !== g.slideCount % g.options.slidesToScroll ? g.options.slidesToScroll : 0, g.currentLeft = null === g.swipeLeft ? d : g.swipeLeft, g.options.infinite === !1 && (0 > a || a > g.slideCount - g.options.slidesToShow + e) ? (b = g.currentSlide, g.animateSlide(d, function () {
            g.postSlide(b)
        }), !1) : (g.options.autoplay === !0 && clearInterval(g.autoPlayTimer), c = 0 > b ? 0 !== g.slideCount % g.options.slidesToScroll ? g.slideCount - g.slideCount % g.options.slidesToScroll : g.slideCount - g.options.slidesToScroll : b > g.slideCount - 1 ? 0 : b, g.animating = !0, null !== g.options.onBeforeChange && a !== g.currentSlide && g.options.onBeforeChange.call(this, g, g.currentSlide, c), g.currentSlide = c, g.setSlideClasses(g.currentSlide), g.updateDots(), g.updateArrows(), g.options.fade === !0 ? (g.fadeSlide(c, function () {
            g.postSlide(c)
        }), !1) : (g.animateSlide(f, function () {
            g.postSlide(c)
        }), void 0)))
    }, b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function () {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? "left" : 360 >= d && d >= 315 ? "left" : d >= 135 && 225 >= d ? "right" : "vertical"
    }, b.prototype.swipeEnd = function (b) {
        var c = this;
        if (c.$list.removeClass("dragging"), void 0 === c.touchObject.curX) return !1;
        if (c.touchObject.swipeLength >= c.touchObject.minSwipe) switch (a(b.target).on("click.slick", function (b) {
            b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(b.target).off("click.slick")
        }), c.swipeDirection()) {
            case"left":
                c.slideHandler(c.currentSlide + c.options.slidesToScroll), c.touchObject = {};
                break;
            case"right":
                c.slideHandler(c.currentSlide - c.options.slidesToScroll), c.touchObject = {}
        } else c.touchObject.startX !== c.touchObject.curX && (c.slideHandler(c.currentSlide), c.touchObject = {})
    }, b.prototype.swipeHandler = function (a) {
        var b = this;
        if ("ontouchend" in document && b.options.swipe === !1) return !1;
        if (b.options.draggable === !1 && !a.originalEvent.touches) return !1;
        switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, a.data.action) {
            case"start":
                b.swipeStart(a);
                break;
            case"move":
                b.swipeMove(a);
                break;
            case"end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function (a) {
        var b, c, d, e, f = this;
        return e = void 0 !== a.originalEvent ? a.originalEvent.touches : null, b = f.getLeft(f.currentSlide), !f.$list.hasClass("dragging") || e && 1 !== e.length ? !1 : (f.touchObject.curX = void 0 !== e ? e[0].pageX : a.clientX, f.touchObject.curY = void 0 !== e ? e[0].pageY : a.clientY, f.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(f.touchObject.curX - f.touchObject.startX, 2))), c = f.swipeDirection(), "vertical" !== c ? (void 0 !== a.originalEvent && f.touchObject.swipeLength > 4 && a.preventDefault(), d = f.touchObject.curX > f.touchObject.startX ? 1 : -1, f.swipeLeft = f.options.vertical === !1 ? b + f.touchObject.swipeLength * d : b + f.touchObject.swipeLength * (f.$list.height() / f.listWidth) * d, f.options.fade === !0 || f.options.touchMove === !1 ? !1 : f.animating === !0 ? (f.swipeLeft = null, !1) : (f.setCSS(f.swipeLeft), void 0)) : void 0)
    }, b.prototype.swipeStart = function (a) {
        var b, c = this;
        return 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow ? (c.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, c.$list.addClass("dragging"), void 0)
    }, b.prototype.unfilterSlides = function () {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).remove(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && (b.$prevArrow.remove(), b.$nextArrow.remove()), b.$slides.removeClass("slick-slide slick-active slick-visible").removeAttr("style")
    }, b.prototype.updateArrows = function () {
        var a = this;
        a.options.arrows === !0 && a.options.infinite !== !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.removeClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled"), a.$nextArrow.removeClass("slick-disabled")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && (a.$nextArrow.addClass("slick-disabled"), a.$prevArrow.removeClass("slick-disabled")))
    }, b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active"), a.$dots.find("li").eq(a.currentSlide / a.options.slidesToScroll).addClass("slick-active"))
    }, a.fn.slick = function (a) {
        var c = this;
        return c.each(function (c, d) {
            d.slick = new b(d, a)
        })
    }, a.fn.slickAdd = function (a, b, c) {
        var d = this;
        return d.each(function (d, e) {
            e.slick.addSlide(a, b, c)
        })
    }, a.fn.slickCurrentSlide = function () {
        var a = this;
        return a.get(0).slick.getCurrent()
    }, a.fn.slickFilter = function (a) {
        var b = this;
        return b.each(function (b, c) {
            c.slick.filterSlides(a)
        })
    }, a.fn.slickGoTo = function (a) {
        var b = this;
        return b.each(function (b, c) {
            c.slick.slideHandler(a)
        })
    }, a.fn.slickNext = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.changeSlide({data: {message: "next"}})
        })
    }, a.fn.slickPause = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.autoPlayClear(), b.slick.paused = !0
        })
    }, a.fn.slickPlay = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.paused = !1, b.slick.autoPlay()
        })
    }, a.fn.slickPrev = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.changeSlide({data: {message: "previous"}})
        })
    }, a.fn.slickRemove = function (a, b) {
        var c = this;
        return c.each(function (c, d) {
            d.slick.removeSlide(a, b)
        })
    }, a.fn.slickSetOption = function (a, b, c) {
        var d = this;
        return d.each(function (d, e) {
            e.slick.options[a] = b, c === !0 && (e.slick.unload(), e.slick.reinit())
        })
    }, a.fn.slickUnfilter = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.unfilterSlides()
        })
    }, a.fn.unslick = function () {
        var a = this;
        return a.each(function (a, b) {
            b.slick.destroy()
        })
    }
}), $(".slick").slick({dots: !0, ade: !0, autoplay: !0}), function (a) {
    Date.now = Date.now || function () {
        return +new Date
    }, a.ias = function (b) {
        function c() {
            var b, c;
            return u.onChangePage(function (a, b, c) {
                v && v.setPage(a, c), s.onPageChange.call(this, a, c, b)
            }), s.triggerPageThreshold > 0 ? d() : a(s.next).attr("href") && (c = t.getCurrentScrollOffset(s.scrollContainer), q(function () {
                i(c)
            })), v && v.havePage() && (f(), b = v.getPage(), t.forceScrollTop(function () {
                var c;
                b > 1 ? (k(b), c = h(!0), a("html, body").scrollTop(c)) : d()
            })), w
        }

        function d() {
            g(), s.scrollContainer.scroll(e)
        }

        function e() {
            var a, b;
            a = t.getCurrentScrollOffset(s.scrollContainer), b = h(), a >= b && (l() >= s.triggerPageThreshold ? (f(), q(function () {
                i(a)
            })) : i(a))
        }

        function f() {
            s.scrollContainer.unbind("scroll", e)
        }

        function g() {
            a(s.pagination).hide()
        }

        function h(b) {
            var c, d;
            return c = a(s.container).find(s.item).last(), 0 === c.size() ? 0 : (d = c.offset().top + c.height(), b || (d += s.thresholdMargin), d)
        }

        function i(b, c) {
            var e;
            return (e = a(s.next).attr("href")) ? (s.beforePageChange && a.isFunction(s.beforePageChange) && s.beforePageChange(b, e) === !1 || (u.pushPages(b, e), f(), n(), j(e, function (b, h) {
                var i, j = s.onLoadItems.call(this, h);
                j !== !1 && (a(h).hide(), i = a(s.container).find(s.item).last(), i.after(h), a(h).fadeIn()), e = a(s.next, b).attr("href"), a(s.pagination).replaceWith(a(s.pagination, b)), o(), g(), e ? d() : f(), s.onRenderComplete.call(this, h), c && c.call(this)
            })), void 0) : (s.noneleft && a(s.container).find(s.item).last().after(s.noneleft), f())
        }

        function j(b, c, d) {
            var e, f, g, h = [], i = Date.now();
            d = d || s.loaderDelay, a.get(b, null, function (b) {
                e = a(s.container, b).eq(0), 0 === e.length && (e = a(b).filter(s.container).eq(0)), e && e.find(s.item).each(function () {
                    h.push(this)
                }), c && (g = this, f = Date.now() - i, d > f ? setTimeout(function () {
                    c.call(g, b, h)
                }, d - f) : c.call(g, b, h))
            }, "html")
        }

        function k(b) {
            var c = h(!0);
            c > 0 && i(c, function () {
                f(), u.getCurPageNum(c) + 1 < b ? (k(b), a("html,body").animate({scrollTop: c}, 400, "swing")) : (a("html,body").animate({scrollTop: c}, 1e3, "swing"), d())
            })
        }

        function l() {
            var a = t.getCurrentScrollOffset(s.scrollContainer);
            return u.getCurPageNum(a)
        }

        function m() {
            var b = a(".ias_loader");
            return 0 === b.size() && (b = a('<div class="ias_loader">' + s.loader + "</div>"), b.hide()), b
        }

        function n() {
            var b, c = m();
            s.customLoaderProc !== !1 ? s.customLoaderProc(c) : (b = a(s.container).find(s.item).last(), b.after(c), c.fadeIn())
        }

        function o() {
            var a = m();
            a.remove()
        }

        function p(b) {
            var c = a(".ias_trigger");
            return 0 === c.size() && (c = a('<div class="ias_trigger"><a href="#">' + s.trigger + "</a></div>"), c.hide()), a("a", c).unbind("click").bind("click", function () {
                return r(), b.call(), !1
            }), c
        }

        function q(b) {
            var c, d = p(b);
            s.customTriggerProc !== !1 ? s.customTriggerProc(d) : (c = a(s.container).find(s.item).last(), c.after(d), d.fadeIn())
        }

        function r() {
            var a = p();
            a.remove()
        }

        var s = a.extend({}, a.ias.defaults, b), t = new a.ias.util, u = new a.ias.paging(s.scrollContainer),
            v = s.history ? new a.ias.history : !1, w = this;
        c()
    }, a.ias.defaults = {
        container: "#container",
        scrollContainer: a(window),
        item: ".item",
        pagination: "#pagination",
        next: ".next",
        noneleft: !1,
        loader: '<img src="images/loader.gif"/>',
        loaderDelay: 600,
        triggerPageThreshold: 3,
        trigger: "Load more items",
        thresholdMargin: 0,
        history: !0,
        onPageChange: function () {
        },
        beforePageChange: function () {
        },
        onLoadItems: function () {
        },
        onRenderComplete: function () {
        },
        customLoaderProc: !1,
        customTriggerProc: !1
    }, a.ias.util = function () {
        function b() {
            a(window).load(function () {
                c = !0
            })
        }

        var c = !1, d = !1, e = this;
        b(), this.forceScrollTop = function (b) {
            a("html,body").scrollTop(0), d || (c ? (b.call(), d = !0) : setTimeout(function () {
                e.forceScrollTop(b)
            }, 1))
        }, this.getCurrentScrollOffset = function (a) {
            var b, c;
            return b = a.get(0) === window ? a.scrollTop() : a.offset().top, c = a.height(), b + c
        }
    }, a.ias.paging = function () {
        function b() {
            a(window).scroll(c)
        }

        function c() {
            var b, c, f, j, k;
            b = i.getCurrentScrollOffset(a(window)), c = d(b), f = e(b), h !== c && (j = f[0], k = f[1], g.call({}, c, j, k)), h = c
        }

        function d(a) {
            for (var b = f.length - 1; b > 0; b--) if (a > f[b][0]) return b + 1;
            return 1
        }

        function e(a) {
            for (var b = f.length - 1; b >= 0; b--) if (a > f[b][0]) return f[b];
            return null
        }

        var f = [[0, document.location.toString()]], g = function () {
        }, h = 1, i = new a.ias.util;
        b(), this.getCurPageNum = function (b) {
            return b = b || i.getCurrentScrollOffset(a(window)), d(b)
        }, this.onChangePage = function (a) {
            g = a
        }, this.pushPages = function (a, b) {
            f.push([a, b])
        }
    }, a.ias.history = function () {
        function a() {
            c = !!(window.history && history.pushState && history.replaceState), c = !1
        }

        var b = !1, c = !1;
        a(), this.setPage = function (a, b) {
            this.updateState({page: a}, "", b)
        }, this.havePage = function () {
            return this.getState() !== !1
        }, this.getPage = function () {
            var a;
            return this.havePage() ? (a = this.getState(), a.page) : 1
        }, this.getState = function () {
            var a, b, d;
            if (c) {
                if (b = history.state, b && b.ias) return b.ias
            } else if (a = "#/page/" === window.location.hash.substring(0, 7)) return d = parseInt(window.location.hash.replace("#/page/", ""), 10), {page: d};
            return !1
        }, this.updateState = function (a, c, d) {
            b ? this.replaceState(a, c, d) : this.pushState(a, c, d)
        }, this.pushState = function (a, d, e) {
            var f;
            c ? history.pushState({ias: a}, d, e) : (f = a.page > 0 ? "#/page/" + a.page : "", window.location.hash = f), b = !0
        }, this.replaceState = function (a, b, d) {
            c ? history.replaceState({ias: a}, b, d) : this.pushState(a, b, d)
        }
    }
}(jQuery), !function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j)) ; else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit) return !1
                } else c.trigger("appear"), b = 0
            })
        }

        var h, i = this, j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this, c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d, e, f = c.data(j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", f) : c.css("background-image", "url('" + f + "')"), c[j.effect](j.effect_speed), b.loaded = !0, d = a.grep(i, function (a) {
                            return !a.loaded
                        }), i = a(d), j.load && (e = i.length, j.load.call(b, e, j))
                    }).attr("src", c.data(j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {threshold: 0})
        }, "above-the-top": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-screen": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-screen": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }, "in-viewport": function (b) {
            return a.inviewport(b, {threshold: 0})
        }, "above-the-fold": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-fold": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-fold": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }
    })
}(jQuery, window, document), !function () {
    var a = jQuery.event.special, b = "D" + +new Date, c = "D" + (+new Date + 1);
    a.scrollstart = {
        setup: function () {
            var c, d = function (b) {
                var d = this, e = arguments;
                c ? clearTimeout(c) : (b.type = "scrollstart", jQuery.event.dispatch.apply(d, e)), c = setTimeout(function () {
                    c = null
                }, a.scrollstop.latency)
            };
            jQuery(this).bind("scroll", d).data(b, d)
        }, teardown: function () {
            jQuery(this).unbind("scroll", jQuery(this).data(b))
        }
    }, a.scrollstop = {
        latency: 300, setup: function () {
            var b, d = function (c) {
                var d = this, e = arguments;
                b && clearTimeout(b), b = setTimeout(function () {
                    b = null, c.type = "scrollstop", jQuery.event.dispatch.apply(d, e)
                }, a.scrollstop.latency)
            };
            jQuery(this).bind("scroll", d).data(c, d)
        }, teardown: function () {
            jQuery(this).unbind("scroll", jQuery(this).data(c))
        }
    }
}(), +function (a) {
    a(document).ready(function () {
        function b() {
            $new_comm.show(), $new_sucs.show(), a("textarea").each(function () {
                this.value = ""
            }), l = ""
        }

        function c() {
            t > 0 ? ($submit.val(t), t--, setTimeout(c, 1e3)) : ($submit.val(u).attr("disabled", !1).fadeTo("slow", 1), t = 15)
        }

        function d(b, c) {
            c || (c = 1e3), b ? a(b).length > 0 && a("html,body").animate({scrollTop: a(b).offset().top}, c) : a("html,body").animate({scrollTop: 0}, c)
        }

        // function e() {
        //     return a.browser.msie && "6.0" == a.browser.version ? !0 : !1
        // }

        function f(a) {
            a = " :" + a + ": ", myField = document.getElementById("comment"), document.selection ? (myField.focus(), sel = document.selection.createRange(), sel.text = a, myField.focus()) : g(a)
        }

        function g(a) {
            myField = document.getElementById("comment"), myField.selectionStart || "0" == myField.selectionStart ? (startPos = myField.selectionStart, endPos = myField.selectionEnd, cursorPos = startPos, myField.value = myField.value.substring(0, startPos) + a + myField.value.substring(endPos, myField.value.length), cursorPos += a.length, myField.focus(), myField.selectionStart = cursorPos, myField.selectionEnd = cursorPos) : (myField.value += a, myField.focus())
        }

        var h, i, j, k, l, m, o, p, q, r, s, t, u;
        a(".toggle-search").click(function () {
            a(".toggle-search").toggleClass("active"), a(".search-expand").fadeToggle(250), setTimeout(function () {
                a(".search-expand input").focus()
            }, 300)
        }), a(".content .avatar, .sidebar .avatar, .pagecontent .avatar").lazyload({
            placeholder: _deel.url + "/assets/img/default.png",
            event: "scrollstop"
        }), a(".wp-smiley").lazyload({
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
            event: "scrollstop"
        }), _deel.ajaxpager && a.ias({
            thresholdMargin: -100,
            triggerPageThreshold: 5,
            history: !1,
            container: ".content",
            item: ".excerpt",
            pagination: ".pagination",
            next: ".next-page a",
            loader: '<div class="pagination-loading"><i class="fa fa-spinner fa-spin"></i> 数据载入中...</div>',
            trigger: "下一页",
            onPageChange: function (a, b) {
                window._gaq && window._gaq.push(["_trackPageview", jQuery("<a/>").attr("href", b)[0].pathname.replace(/^[^\/]/, "/")])
            }
        }), window.prettyPrint && window.prettyPrint(), a(".article-tags a, .post-tags a").each(function () {
            a(this).tooltip({container: "body", placement: "top", title: "查看关于 " + a(this).text() + " 的文章"})
        }), window._bd_share_config = {
            common: {
                bdText: "『" + a("title").text() + "』" + a(".article-content p:lt(2)").text(),
                bdMini: "2",
                bdMiniList: !1,
                bdPic: a(".article-content img:first") ? a(".article-content img:first").attr("src") : "",
                bdStyle: "0",
                bdSize: "24"
            }, share: [{bdCustomStyle: "/"}]
        }, a(".article-content").length && a(".article-content a").tooltip({container: "body"}), a(".git_reader").length && a(".git_reader a").tooltip({container: "body"}), a(".readers").length && a(".readers .avatar").parent().tooltip({container: "body"}), a(".social").length && a(".social a").tooltip({container: "body"}), a(".git_tags").length && a(".git_tags a").tooltip({container: "body"}), a(".article-content").removeAttr("height"), !e() && a(".sidebar").length && (h = a(".sidebar .widget"), i = h.length, i && 0 < _deel.roll[0] <= i && 0 < _deel.roll[1] <= i && a(window).scroll(function () {
            var b, c = document.documentElement.scrollTop + document.body.scrollTop;
            c > h.eq(i - 1).offset().top + h.eq(i - 1).height() ? 0 == a(".widgetRoller").length ? (h.parent().append('<div class="widgetRoller"></div>'), h.eq(_deel.roll[0] - 1).clone().appendTo(".widgetRoller"), _deel.roll[0] !== _deel.roll[1] && h.eq(_deel.roll[1] - 1).clone().appendTo(".widgetRoller"), b = 10, "hasfixed" == a("body").attr("id") && (b = 69), a(".widgetRoller").css({
                position: "fixed",
                top: 10,
                zIndex: 0,
                width: 360
            })) : a(".widgetRoller").fadeIn(300) : a(".widgetRoller").hide()
        }), a(window).scroll(function () {
            var b = a(".rollto");
            document.documentElement.scrollTop + document.body.scrollTop > 200 ? b.fadeIn() : b.fadeOut()
        })), j = a("#nav-header").offset().top, a(window).scroll(function () {
            a(window).scrollTop() > j && a(window).width() > 719 ? a("#nav-header").addClass("fixed") : a("#nav-header").removeClass("fixed")
        }), a(".navbar .nav:first").after('<div class="screen-mini"><button data-type="screen-nav" class="btn btn-inverse screen-nav"><i class="fa fa-list"></i>&nbsp;菜单</button></div>'), a("body").append('<div class="rollto"><button class="btn btn-inverse" data-type="totop" title="回顶部"><i class="fa fa-arrow-up"></i></button>' + (_deel.commenton ? '<button class="btn btn-inverse" data-type="torespond" title="发评论"><i class="fa fa-comment-o"></i></button>' : "") + "</div>"), function (a) {
            a.extend({
                tipsBox: function (b) {
                    var c, d, e;
                    b = a.extend({
                        obj: null,
                        str: "+1",
                        startSize: "12px",
                        endSize: "30px",
                        interval: 600,
                        color: "red",
                        callback: function () {
                        }
                    }, b), a("body").append("<span class='num'>" + b.str + "</span>"), c = a(".num"), d = b.obj.offset().left + b.obj.width() / 2, e = b.obj.offset().top - b.obj.height(), c.css({
                        position: "absolute",
                        left: d + "px",
                        top: e + "px",
                        "z-index": 9999,
                        "font-size": b.startSize,
                        "line-height": b.endSize,
                        color: b.color
                    }), c.animate({
                        "font-size": b.endSize,
                        opacity: "0",
                        top: e - parseInt(b.endSize) + "px"
                    }, b.interval, function () {
                        c.remove(), b.callback()
                    })
                }
            })
        }(jQuery), a.fn.postLike = function () {
            var b, c, d, e;
            var h = window.location.host;
            return a(this).hasClass("actived") ? alert("已经点过赞啦！") : (a(this).addClass("actived"), b = a(this).data("id"), c = a(this).data("action"), d = a(this).children(".count"), e = {
                action: "bigfa_like",
                um_id: b,
                um_action: c
            }, a.post("//" + h + "/wp-admin/admin-ajax.php", e, function (b) {
                a(d).html(b)
            }), a.tipsBox({
                obj: a(this), str: "+1", callback: function () {
                }
            }), !1)
        }, a(document).on("click", "#Addlike", function () {
            a(this).postLike()
        }), a(document).on("click", function (b) {
            var c, e, g, h, i, j, l;
            if (b = b || window.event, c = b.target || b.srcElement, e = a(c), !e.hasClass("disabled")) switch (e.parent().attr("data-type") && (e = a(e.parent()[0])), e.parent().parent().attr("data-type") && (e = a(e.parent().parent()[0])), g = e.attr("data-type")) {
                case"screen-nav":
                    h = a(".navbar .nav"), i = a(".navbar .nav"), h.toggleClass("active"), i.slideToggle(300);
                    break;
                case"totop":
                    d();
                    break;
                case"torespond":
                    d("#comment-ad"), a("#comment").focus(), j = document.getElementsByName("message"), j[0].focus();
                case"comment-insert-smilie":
                    if (!a("#comment-smilies").length) {
                        a("#commentform .comt-box").append('<div id="comment-smilies" class="hide"></div>'), l = "";
                        for (key in k.smilies) l += '<img data-simle="' + key + '" data-type="comment-smilie" src="' + _deel.url + "/assets/img/smilies/icon_" + k.smilies[key] + '.gif">';
                        a("#comment-smilies").html(l)
                    }
                    a("#comment-smilies").slideToggle(100);
                    break;
                case"comment-smilie":
                    f(e.attr("data-simle")), e.parent().slideUp(300);
                    break;
                case"switch-author":
                    a(".comt-comterinfo").slideToggle(300), a("#author").focus()
            }
        }), k = {
            smilies: {
                mrgreen: "mrgreen",
                razz: "razz",
                sad: "sad",
                smile: "smile",
                oops: "redface",
                grin: "biggrin",
                eek: "surprised",
                "???": "confused",
                cool: "cool",
                lol: "lol",
                mad: "mad",
                twisted: "twisted",
                roll: "rolleyes",
                wink: "wink",
                idea: "idea",
                arrow: "arrow",
                neutral: "neutral",
                cry: "cry",
                "?": "question",
                evil: "evil",
                shock: "eek",
                "!": "exclaim"
            }
        }, a(".commentlist .url").attr("target", "_blank"), a("#comment-author-info p input").focus(function () {
            a(this).parent("p").addClass("on")
        }), a("#comment-author-info p input").blur(function () {
            a(this).parent("p").removeClass("on")
        }), a("#comment").focus(function () {
            ("" == a("#author").val() || "" == a("#email").val()) && a(".comt-comterinfo").slideDown(300)
        }), m = '<div class="comt-tip comt-loading">正在提交, 请稍候...</div>', o = '<div class="comt-tip comt-error">#</div>', p = '">提交成功', q = "取消编辑", r = 1, s = [], s.push(""), $comments = a("#comments-title"), $cancel = a("#cancel-comment-reply-link"), cancel_text = $cancel.text(), $submit = a("#commentform #submit"), $submit.attr("disabled", !1), a(".comt-tips").append(m + o), a(".comt-loading").hide(), a(".comt-error").hide(), $body = window.opera ? "CSS1Compat" == document.compatMode ? a("html") : a("body") : a("html,body"), a("#commentform").submit(function () {
            return a(".comt-loading").show(), $submit.attr("disabled", !0).fadeTo("slow", .5), l && a("#comment").after('<input type="text" name="edit_id" id="edit_id" value="' + l + '" style="display:none;" />'), a.ajax({
                url: _deel.url.replaceAll("www.bookset.me", "bookset.me") + "/inc/theme-ajax.php",
                data: a(this).serialize(),
                type: a(this).attr("method"),
                error: function (b) {
                    a(".comt-loading").hide(), a(".comt-error").show().html(b.responseText), setTimeout(function () {
                        $submit.attr("disabled", !1).fadeTo("slow", 1), a(".comt-error").fadeOut()
                    }, 3e3)
                },
                success: function (b) {
                    a(".comt-loading").hide(), s.push(a("#comment").val()), a("textarea").each(function () {
                        this.value = ""
                    });
                    var d = addComment, e = d.I("cancel-comment-reply-link"), f = d.I("wp-temp-form-div"),
                        g = d.I(d.respondId), h = (d.I("comment_post_ID").value, d.I("comment_parent").value);
                    !l && $comments.length && (n = parseInt($comments.text().match(/\d+/)), $comments.text($comments.text().replace(n, n + 1))), new_htm = '" id="new_comm_' + r + '"></', new_htm = "0" == h ? '\n<ol style="clear:both;" class="commentlist commentnew' + new_htm + "ol>" : '\n<ul class="children' + new_htm + "ul>", ok_htm = '\n<span id="success_' + r + p, ok_htm += "</span><span></span>\n", "0" == h ? a("#postcomments .commentlist").length ? a("#postcomments .commentlist").before(new_htm) : a("#respond").after(new_htm) : a("#respond").after(new_htm), a("#comment-author-info").slideUp(), console.log(a("#new_comm_" + r)), a("#new_comm_" + r).hide().append(b), a("#new_comm_" + r + " li").append(ok_htm), a("#new_comm_" + r).fadeIn(4e3), $body.animate({scrollTop: a("#new_comm_" + r).offset().top - 200}, 500), a(".comt-avatar .avatar").attr("src", a(".commentnew .avatar:last").attr("src")), c(), r++, l = "", a("*").remove("#edit_id"), e.style.display = "none", e.onclick = null, d.I("comment_parent").value = "0", f && g && (f.parentNode.insertBefore(g, f), f.parentNode.removeChild(f))
                }
            }), !1
        }), addComment = {
            moveForm: function (c, d, e, f, g) {
                var h, i = this, j = i.I(c), k = i.I(e), m = i.I("cancel-comment-reply-link"),
                    n = i.I("comment_parent"), o = i.I("comment_post_ID");
                l && b(), g ? (i.I("comment").value = s[g], l = i.I("new_comm_" + g).innerHTML.match(/(comment-)(\d+)/)[2], $new_sucs = a("#success_" + g), $new_sucs.hide(), $new_comm = a("#new_comm_" + g), $new_comm.hide(), $cancel.text(q)) : $cancel.text(cancel_text), i.respondId = e, f = f || !1, i.I("wp-temp-form-div") || (h = document.createElement("div"), h.id = "wp-temp-form-div", h.style.display = "none", k.parentNode.insertBefore(h, k)), j ? j.parentNode.insertBefore(k, j.nextSibling) : (temp = i.I("wp-temp-form-div"), i.I("comment_parent").value = "0", temp.parentNode.insertBefore(k, temp), temp.parentNode.removeChild(temp)), $body.animate({scrollTop: a("#respond").offset().top - 180}, 400), o && f && (o.value = f), n.value = d, m.style.display = "", m.onclick = function () {
                    l && b();
                    var a = addComment, c = a.I("wp-temp-form-div"), d = a.I(a.respondId);
                    return a.I("comment_parent").value = "0", c && d && (c.parentNode.insertBefore(d, c), c.parentNode.removeChild(c)), this.style.display = "none", this.onclick = null, !1
                };
                try {
                    i.I("comment").focus()
                } catch (p) {
                }
                return !1
            }, I: function (a) {
                return document.getElementById(a)
            }
        }, t = 15, u = $submit.val()
    })
}(window.jQuery), $(document).ready(function (a) {
    a(".collapseButton").click(function () {
        a(this).parent().parent().find(".xContent").slideToggle("fast")
    })
}), !function (a) {
    a.extend(a.fn, {
        posfixed: function (b) {
            var c, d, e, f = {direction: "top", type: "while", hide: !1, distance: 0};
            a.extend(f, b), a.browser.msie && 6 == a.browser.version && (a("html").css("overflow", "hidden"), a("body").css({
                height: "100%",
                overflow: "auto"
            })), c = this, d = a(c).offset().top, e = a(c).offset().left, f.distance, "while" == f.type && (a.browser.msie && 6 == a.browser.version ? a("body").scroll(function () {
                var b = a(c).offset().top - a("body").scrollTop();
                b <= f.distance && (a(c).css("position", "absolute"), a(c).css("top", f.distance + "px"), a(c).css("left", e + "px")), a(c).offset().top <= d && a(c).css("position", "static")
            }) : a(window).scroll(function () {
                var b, e;
                "top" == f.direction ? (b = a(c).offset().top - a(window).scrollTop(), b <= f.distance && (a(c).css("position", "fixed"), a(c).css(f.direction, f.distance + "px")), a(c).offset().top <= d && a(c).css("position", "static")) : (e = a(window).height() - a(c).offset().top + a(window).scrollTop() - a(c).outerHeight(), e <= f.distance && (a(c).css("position", "fixed"), a(c).css(f.direction, f.distance + "px")), a(c).offset().top >= d && a(c).css("position", "static"))
            })), "always" == f.type && (a.browser.msie && 6 == a.browser.version ? (f.hide && a(c).hide(), a("body").scroll(function () {
                a("body").scrollTop() > 300 ? a(c).fadeIn(200) : a(c).fadeOut(200)
            }), a(c).css("position", "absolute"), a(c).css(f.direction, f.distance + "px"), null != f.tag && (null != f.tag.obj ? "right" == f.tag.direction ? (a(c).css("left", f.tag.obj.offset().left + f.tag.obj.width() + f.tag.distance + "px"), a(window).resize(function () {
                a(c).css("left", f.obj.tag.offset().left + f.tag.obj.width() + f.tag.distance + "px")
            })) : (console.log(f.tag.obj.offset().left - f.tag.obj.width() - f.tag.distance), a(c).css("left", f.tag.obj.offset().left - a(c).outerWidth() - f.tag.distance + "px"), a(window).resize(function () {
                a(c).css("left", f.tag.obj.offset().left - a(c).outerWidth() - f.tag.distance + "px")
            })) : a(c).css(f.tag.direction, f.tag.distance + "px"))) : (f.hide && a(c).hide(), a(window).scroll(function () {
                a(window).scrollTop() > 300 ? a(c).fadeIn(200) : a(c).fadeOut(200)
            }), a(c).offset().left, a(c).css("position", "fixed"), a(c).css(f.direction, f.distance + "px"), null != f.tag && (null != f.tag.obj ? "right" == f.tag.direction ? (a(c).css("left", f.tag.obj.offset().left + f.tag.obj.width() + f.tag.distance + "px"), a(window).resize(function () {
                a(c).css("left", f.obj.tag.offset().left + f.tag.obj.width() + f.tag.distance + "px")
            })) : (console.log(f.tag.obj.offset().left - f.tag.obj.width() - f.tag.distance), a(c).css("left", f.tag.obj.offset().left - a(c).outerWidth() - f.tag.distance + "px"), a(window).resize(function () {
                a(c).css("left", f.tag.obj.offset().left - a(c).outerWidth() - f.tag.distance + "px")
            })) : a(c).css(f.tag.direction, f.tag.distance + "px"))))
        }
    })
}(jQuery), !function (a) {
    var b, c = $("#callboard"), d = c.find("ul"), e = c.find("li"), f = c.find("li").length,
        g = e.first().outerHeight(!0);
    a.autoAnimation = function () {
        var a, e;
        1 >= f || (a = arguments.callee, e = c.find("li").first(), e.animate({marginTop: -g}, 500, function () {
            clearTimeout(b), e.appendTo(d).css({marginTop: 2}), b = setTimeout(a, 3e3)
        }))
    }, c.mouseenter(function () {
        clearTimeout(b)
    }).mouseleave(function () {
        b = setTimeout(a.autoAnimation, 3e3)
    })
}(window), setTimeout(window.autoAnimation, 3e3);
$(function () {
    $('#nav-header').posfixed({distance: 0, pos: 'top', type: 'while', hide: false})
});
$(".hidetoc").click(function () {
    $("#article-index").remove()
});
$(window).scroll(function () {
    if ($(this).scrollTop() > 450) {
        $("#article-index").css({'display': 'block', 'top': '10%',})
    } else {
        $("#article-index").css('display', 'none')
    }
});
