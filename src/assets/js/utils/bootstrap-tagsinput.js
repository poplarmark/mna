!(function (t) {
    "use strict";
    function e(e, i) {
        (this.isInit = !0),
            (this.itemsArray = []),
            (this.$element = t(e)),
            this.$element.hide(),
            (this.isSelect = "SELECT" === e.tagName),
            (this.multiple = this.isSelect && e.hasAttribute("multiple")),
            (this.objectItems = i && i.itemValue),
            (this.placeholderText = e.hasAttribute("placeholder") ? this.$element.attr("placeholder") : ""),
            (this.inputSize = Math.max(1, this.placeholderText.length)),
            (this.$container = t('<div class="bootstrap-tagsinput"></div>')),
            (this.$input = t('<input type="text" placeholder="' + this.placeholderText + '"/>').appendTo(this.$container)),
            this.$element.before(this.$container),
            this.build(i),
            (this.isInit = !1);
    }
    function i(t, e) {
        if ("function" != typeof t[e]) {
            var i = t[e];
            t[e] = function (t) {
                return t[i];
            };
        }
    }
    function n(t, e) {
        if ("function" != typeof t[e]) {
            var i = t[e];
            t[e] = function () {
                return i;
            };
        }
    }
    function a(t) {
        return t ? s.text(t).html() : "";
    }
    function o(t) {
        var e = 0;
        if (document.selection) {
            t.focus();
            var i = document.selection.createRange();
            i.moveStart("character", -t.value.length), (e = i.text.length);
        } else (t.selectionStart || "0" == t.selectionStart) && (e = t.selectionStart);
        return e;
    }
    var r = {
        tagClass: function (t) {
            return "label label-info";
        },
        focusClass: "focus",
        itemValue: function (t) {
            return t ? t.toString() : t;
        },
        itemText: function (t) {
            return this.itemValue(t);
        },
        itemTitle: function (t) {
            return null;
        },
        freeInput: !0,
        addOnBlur: !0,
        maxTags: void 0,
        maxChars: void 0,
        confirmKeys: [13, 44],
        delimiter: ",",
        delimiterRegex: null,
        cancelConfirmKeysOnEmpty: !1,
        onTagExists: function (t, e) {
            e.hide().fadeIn();
        },
        trimValue: !1,
        allowDuplicates: !1,
        triggerChange: !0,
    };
    (e.prototype = {
        constructor: e,
        add: function (e, i, n) {
            var o = this;
            if (!(o.options.maxTags && o.itemsArray.length >= o.options.maxTags) && (!1 === e || e)) {
                if (("string" == typeof e && o.options.trimValue && (e = t.trim(e)), "object" == typeof e && !o.objectItems)) throw "Can't add objects when itemValue option is not set";
                if (!e.toString().match(/^\s*$/)) {
                    if ((o.isSelect && !o.multiple && o.itemsArray.length > 0 && o.remove(o.itemsArray[0]), "string" == typeof e && "INPUT" === this.$element[0].tagName)) {
                        var r = o.options.delimiterRegex ? o.options.delimiterRegex : o.options.delimiter,
                            s = e.split(r);
                        if (s.length > 1) {
                            for (var l = 0; l < s.length; l++) this.add(s[l], !0);
                            return void (i || o.pushVal(o.options.triggerChange));
                        }
                    }
                    var u = o.options.itemValue(e),
                        p = o.options.itemText(e),
                        c = o.options.tagClass(e),
                        h = o.options.itemTitle(e),
                        m = t.grep(o.itemsArray, function (t) {
                            return o.options.itemValue(t) === u;
                        })[0];
                    if (!m || o.options.allowDuplicates) {
                        if (!(o.items().toString().length + e.length + 1 > o.options.maxInputLength)) {
                            var f = t.Event("beforeItemAdd", { item: e, cancel: !1, options: n });
                            if ((o.$element.trigger(f), !f.cancel)) {
                                o.itemsArray.push(e);
                                var d = t('<span class="tag ' + a(c) + (null !== h ? '" title="' + h : "") + '">' + a(p) + '<span data-role="remove"></span></span>');
                                d.data("item", e), o.findInputWrapper().before(d), d.after(" ");
                                var g = t('option[value="' + encodeURIComponent(u) + '"]', o.$element).length || t('option[value="' + a(u) + '"]', o.$element).length;
                                if (o.isSelect && !g) {
                                    var v = t("<option selected>" + a(p) + "</option>");
                                    v.data("item", e), v.attr("value", u), o.$element.append(v);
                                }
                                i || o.pushVal(o.options.triggerChange),
                                    (o.options.maxTags === o.itemsArray.length || o.items().toString().length === o.options.maxInputLength) && o.$container.addClass("bootstrap-tagsinput-max"),
                                    t(".typeahead, .twitter-typeahead", o.$container).length && o.$input.typeahead("val", ""),
                                    this.isInit ? o.$element.trigger(t.Event("itemAddedOnInit", { item: e, options: n })) : o.$element.trigger(t.Event("itemAdded", { item: e, options: n }));
                            }
                        }
                    } else if (o.options.onTagExists) {
                        var y = t(".tag", o.$container).filter(function () {
                            return t(this).data("item") === m;
                        });
                        o.options.onTagExists(e, y);
                    }
                }
            }
        },
        remove: function (e, i, n) {
            var a = this;
            if (
                (a.objectItems &&
                    (e = (e =
                        "object" == typeof e
                            ? t.grep(a.itemsArray, function (t) {
                                  return a.options.itemValue(t) == a.options.itemValue(e);
                              })
                            : t.grep(a.itemsArray, function (t) {
                                  return a.options.itemValue(t) == e;
                              }))[e.length - 1]),
                e)
            ) {
                var o = t.Event("beforeItemRemove", { item: e, cancel: !1, options: n });
                if ((a.$element.trigger(o), o.cancel)) return;
                t(".tag", a.$container)
                    .filter(function () {
                        return t(this).data("item") === e;
                    })
                    .remove(),
                    t("option", a.$element)
                        .filter(function () {
                            return t(this).data("item") === e;
                        })
                        .remove(),
                    -1 !== t.inArray(e, a.itemsArray) && a.itemsArray.splice(t.inArray(e, a.itemsArray), 1);
            }
            i || a.pushVal(a.options.triggerChange), a.options.maxTags > a.itemsArray.length && a.$container.removeClass("bootstrap-tagsinput-max"), a.$element.trigger(t.Event("itemRemoved", { item: e, options: n }));
        },
        removeAll: function () {
            for (t(".tag", this.$container).remove(), t("option", this.$element).remove(); this.itemsArray.length > 0; ) this.itemsArray.pop();
            this.pushVal(this.options.triggerChange);
        },
        refresh: function () {
            var e = this;
            t(".tag", e.$container).each(function () {
                var i = t(this),
                    n = i.data("item"),
                    o = e.options.itemValue(n),
                    r = e.options.itemText(n),
                    s = e.options.tagClass(n);
                i.attr("class", null),
                    i.addClass("tag " + a(s)),
                    (i.contents().filter(function () {
                        return 3 == this.nodeType;
                    })[0].nodeValue = a(r)),
                    e.isSelect &&
                        t("option", e.$element)
                            .filter(function () {
                                return t(this).data("item") === n;
                            })
                            .attr("value", o);
            });
        },
        items: function () {
            return this.itemsArray;
        },
        pushVal: function () {
            var e = this,
                i = t.map(e.items(), function (t) {
                    return e.options.itemValue(t).toString();
                });
            e.$element.val(i, !0), e.options.triggerChange && e.$element.trigger("change");
        },
        build: function (e) {
            var a = this;
            if (((a.options = t.extend({}, r, e)), a.objectItems && (a.options.freeInput = !1), i(a.options, "itemValue"), i(a.options, "itemText"), n(a.options, "tagClass"), a.options.typeahead)) {
                var s = a.options.typeahead || {};
                n(s, "source"),
                    a.$input.typeahead(
                        t.extend({}, s, {
                            source: function (e, i) {
                                function n(t) {
                                    for (var e = [], n = 0; n < t.length; n++) {
                                        var r = a.options.itemText(t[n]);
                                        (o[r] = t[n]), e.push(r);
                                    }
                                    i(e);
                                }
                                this.map = {};
                                var o = this.map,
                                    r = s.source(e);
                                t.isFunction(r.success) ? r.success(n) : t.isFunction(r.then) ? r.then(n) : t.when(r).then(n);
                            },
                            updater: function (t) {
                                return a.add(this.map[t]), this.map[t];
                            },
                            matcher: function (t) {
                                return -1 !== t.toLowerCase().indexOf(this.query.trim().toLowerCase());
                            },
                            sorter: function (t) {
                                return t.sort();
                            },
                            highlighter: function (t) {
                                var e = RegExp("(" + this.query + ")", "gi");
                                return t.replace(e, "<strong>$1</strong>");
                            },
                        })
                    );
            }
            if (a.options.typeaheadjs) {
                var l = null,
                    u = {},
                    p = a.options.typeaheadjs;
                t.isArray(p) ? ((l = p[0]), (u = p[1])) : (u = p),
                    a.$input.typeahead(l, u).on(
                        "typeahead:selected",
                        t.proxy(function (t, e) {
                            u.valueKey ? a.add(e[u.valueKey]) : a.add(e), a.$input.typeahead("val", "");
                        }, a)
                    );
            }
            a.$container.on(
                "click",
                t.proxy(function (t) {
                    a.$element.attr("disabled") || a.$input.removeAttr("disabled"), a.$input.focus();
                }, a)
            ),
                a.options.addOnBlur &&
                    a.options.freeInput &&
                    a.$input.on(
                        "focusout",
                        t.proxy(function (e) {
                            0 === t(".typeahead, .twitter-typeahead", a.$container).length && (a.add(a.$input.val()), a.$input.val(""));
                        }, a)
                    ),
                a.$container.on({
                    focusin: function () {
                        a.$container.addClass(a.options.focusClass);
                    },
                    focusout: function () {
                        a.$container.removeClass(a.options.focusClass);
                    },
                }),
                a.$container.on(
                    "keydown",
                    "input",
                    t.proxy(function (e) {
                        var i = t(e.target),
                            n = a.findInputWrapper();
                        if (a.$element.attr("disabled")) return void a.$input.attr("disabled", "disabled");
                        switch (e.which) {
                            case 8:
                                if (0 === o(i[0])) {
                                    var r = n.prev();
                                    r.length && a.remove(r.data("item"));
                                }
                                break;
                            case 46:
                                if (0 === o(i[0])) {
                                    var s = n.next();
                                    s.length && a.remove(s.data("item"));
                                }
                                break;
                            case 37:
                                var l = n.prev();
                                0 === i.val().length && l[0] && (l.before(n), i.focus());
                                break;
                            case 39:
                                var u = n.next();
                                0 === i.val().length && u[0] && (u.after(n), i.focus());
                        }
                        i.val().length, i.attr("size", Math.max(this.inputSize, i.val().length));
                    }, a)
                ),
                a.$container.on(
                    "keypress",
                    "input",
                    t.proxy(function (e) {
                        var i = t(e.target);
                        if (a.$element.attr("disabled")) return void a.$input.attr("disabled", "disabled");
                        var n,
                            o,
                            r,
                            s = i.val(),
                            l = a.options.maxChars && s.length >= a.options.maxChars;
                        a.options.freeInput &&
                            ((n = e),
                            (o = a.options.confirmKeys),
                            (r = !1),
                            t.each(o, function (t, e) {
                                if ("number" == typeof e && n.which === e) return (r = !0), !1;
                                if (n.which === e.which) {
                                    var i = !e.hasOwnProperty("altKey") || n.altKey === e.altKey,
                                        a = !e.hasOwnProperty("shiftKey") || n.shiftKey === e.shiftKey,
                                        o = !e.hasOwnProperty("ctrlKey") || n.ctrlKey === e.ctrlKey;
                                    if (i && a && o) return (r = !0), !1;
                                }
                            }),
                            r || l) &&
                            (0 !== s.length && (a.add(l ? s.substr(0, a.options.maxChars) : s), i.val("")), !1 === a.options.cancelConfirmKeysOnEmpty && e.preventDefault()),
                            i.val().length,
                            i.attr("size", Math.max(this.inputSize, i.val().length));
                    }, a)
                ),
                a.$container.on(
                    "click",
                    "[data-role=remove]",
                    t.proxy(function (e) {
                        a.$element.attr("disabled") || a.remove(t(e.target).closest(".tag").data("item"));
                    }, a)
                ),
                a.options.itemValue === r.itemValue &&
                    ("INPUT" === a.$element[0].tagName
                        ? a.add(a.$element.val())
                        : t("option", a.$element).each(function () {
                              a.add(t(this).attr("value"), !0);
                          }));
        },
        destroy: function () {
            this.$container.off("keypress", "input"), this.$container.off("click", "[role=remove]"), this.$container.remove(), this.$element.removeData("tagsinput"), this.$element.show();
        },
        focus: function () {
            this.$input.focus();
        },
        input: function () {
            return this.$input;
        },
        findInputWrapper: function () {
            for (var e = this.$input[0], i = this.$container[0]; e && e.parentNode !== i; ) e = e.parentNode;
            return t(e);
        },
    }),
        (t.fn.tagsinput = function (i, n, a) {
            var o = [];
            return (
                this.each(function () {
                    var r = t(this).data("tagsinput");
                    if (r) {
                        if (i || n) {
                            if (void 0 !== r[i]) {
                                if (3 === r[i].length && void 0 !== a) var s = r[i](n, null, a);
                                else var s = r[i](n);
                                void 0 !== s && o.push(s);
                            }
                        } else o.push(r);
                    } else (r = new e(this, i)), t(this).data("tagsinput", r), o.push(r), "SELECT" === this.tagName && t("option", t(this)).attr("selected", "selected"), t(this).val(t(this).val());
                }),
                "string" == typeof i ? (o.length > 1 ? o : o[0]) : o
            );
        }),
        (t.fn.tagsinput.Constructor = e);
    var s = t("<div />");
    t(function () {
        t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
    });
})(window.jQuery);