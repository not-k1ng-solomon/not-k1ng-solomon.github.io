function isCounterEventIdRequired(t) {
	return Boolean(t && t.getAttribute && t.getAttribute("data-event-required"))
}

function injectCounterEventId(t, e) {
	if (!t || !e) return t;
	var n = eventParamRegex.exec(t);
	if (n) return t.replace(n[1], e);
	var i = "baobab_event_id=" + e;
	return t + (t.indexOf("?") === -1 ? "?" : "&") + i
}

function getEventId(t) {
	return t.toString(36) + Math.floor(36 * Math.random() * 36).toString(36)
}

function getCounterData(t, e) {
	var n = e.event || t && t.getAttribute("data-log-event") || "click", i = Date.now(), r = Ya.getHdTime(), o = {
		event: n,
		id: e.nodeId || t.getAttribute("data-log-node"),
		cts: i,
		"event-id": e.eventId || t && t.getAttribute("data-log-event-id") || getEventId(i),
		mc: window.BEM && BEM.blocks["i-mcounter"] ? BEM.blocks["i-mcounter"].get() : "",
		type: e.type,
		data: e.data
	};
	return r && (o.hdtime = r), isCounterEventIdRequired(t) && (t.href = injectCounterEventId(t.href, o["event-id"])), o
}

Ya.ready = function (t) {
	function e() {
		window.removeEventListener ? (window.removeEventListener("DOMContentLoaded", e, !1), window.removeEventListener("load", e, !1)) : window.detachEvent("onload", e), t()
	}
	
	"complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? t() : window.addEventListener ? (window.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("load", e, !1)) : window.attachEvent("onload", e)
}, Date.now || (Date.now = function () {
	return (new Date).getTime()
});
var eventParamRegex = /baobab_event_id=(\w+)/;
Ya.ready(function () {
	function t(t) {
		return window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle
	}
	
	function e() {
		var t = document.querySelector('[data-log-node="' + Ya.clckId + '"]') || document.body;
		w(null, "471.143.1007", null, a.getBaobabData()), w(null, null, null, {
			event: "tech",
			type: "coords",
			nodeId: Ya.clckId,
			data: {nodes: r(t), pageNodes: i(document)}
		})
	}
	
	function n() {
		window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(e, 0)
	}
	
	function i(t) {
		for (var e = [".b-page[data-log-node]", ".main .content__left[data-log-node], .main[data-log-node]", ".main__top[data-log-node]", ".serp-header[data-log-node], .header3[data-log-node]", ".navigation[data-log-node]", ".serp-footer[data-log-node]", ".related[data-log-node]", ".pager[data-log-node]", ".more[data-log-node]", ".region-change[data-log-node]", ".competitors[data-log-node]"], n = {}, i = 0; i < e.length; i++) {
			var r = e[i], o = s(t.querySelector(r));
			if (o && o.id) {
				var a = o.offsetHeight + o.marginTop + o.marginBottom;
				n[o.id] = [o.left, o.top, o.offsetWidth, o.offsetHeight, a]
			}
		}
		return n
	}
	
	function r(t) {
		var e = o(t.querySelectorAll(".serp-list .distr-default-search, .serp-item")),
			n = o(t.querySelectorAll(".misspell__level"));
		for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i]);
		return e
	}
	
	function o(t) {
		var e = {};
		if (0 === t.length) return e;
		for (var n = [], i = 0; i < t.length; i++) {
			var r = t[i], o = s(r);
			o && n.push(o)
		}
		for (i = 0; i < n.length; i++) {
			var a = n[i - 1], u = n[i], c = n[i + 1],
				l = u.offsetHeight + ((a ? Math.max(u.marginTop - a.marginBottom, 0) : u.marginTop) || 0) + ((c ? Math.max(u.marginBottom - c.marginTop, 0) : u.marginBottom) || 0) + ((a && c ? Math.min(a.marginBottom, c.marginTop) : 0) || 0);
			e[u.id] = [u.left, u.top, u.offsetWidth, u.offsetHeight, l]
		}
		return e
	}
	
	function s(e) {
		function n() {
			return window.getComputedStyle ? window.getComputedStyle.apply(window, arguments) : 0
		}
		
		if (!e) return null;
		var i = t(e) || {}, r = a.offset(e);
		if (i && "none" === i.display) return {
			element: e,
			id: e.getAttribute("data-log-node"),
			left: r.left,
			top: r.top,
			offsetWidth: 0,
			offsetHeight: 0,
			marginTop: 0,
			marginBottom: 0
		};
		var o = n(e, ":before").marginTop, s = n(e, ":after").marginBottom;
		return {
			element: e,
			id: e.getAttribute("data-log-node"),
			left: r.left,
			top: r.top,
			offsetWidth: e.offsetWidth,
			offsetHeight: e.offsetHeight,
			marginTop: Math.max(parseInt(i.marginTop, 10) || 0, parseInt(o, 10) || 0),
			marginBottom: Math.max(parseInt(i.marginBottom, 10) || 0, parseInt(s, 10) || 0)
		}
	}
	
	var a = {
		offset: function (t) {
			for (var e = t.offsetParent, n = t.offsetTop, i = t.offsetLeft; e !== document.body;) i += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
			return {top: n, left: i}
		}, isInArea: function (t, e, n) {
			if (!(e && e instanceof Element)) return !1;
			var i = this.offset(e), r = i.top;
			return n && (r += e.offsetHeight), i.left < t.right && r < t.bottom && r > t.top
		}, titleCount: function (t, e) {
			if (!e || !e.length) return {};
			for (var n = !1, i = 0, r = 0, o = 0; o < e.length; o++) {
				var s = e[o], a = s.querySelector(".organic__title") || s.querySelector(".serp-item__title");
				if (this.isInArea(t, a, !0)) n = !0, s.querySelector(".organic_adv") ? i++ : r++; else if (n) break
			}
			return {organic: r, adv: i}
		}, getViewportParams: function () {
			var t = window.innerWidth || document.documentElement.clientWidth, e = window.scrollY || window.pageYOffset,
				n = window.innerHeight || document.documentElement.clientHeight,
				i = {top: e, right: t, bottom: e + n, left: 0},
				r = this.titleCount(i, document.querySelectorAll(".serp-item"));
			return {
				serpTitlesCount: r.organic,
				serpAdvTitlesCount: r.adv,
				bannerInArea: this.isInArea(i, document.querySelectorAll(".serp-adv__banner")),
				winWidth: t,
				winHeight: n
			}
		}, getBaobabData: function () {
			var t = this.getViewportParams();
			return {
				event: "tech",
				type: "serp-page-loaded",
				nodeId: Ya.clckId,
				data: {
					vis: document.visibilityState || "unknown",
					visible: {webCount: t.serpTitlesCount, directCount: t.serpAdvTitlesCount, banner: t.bannerInArea},
					viewportSize: {width: t.winWidth, height: t.winHeight}
				}
			}
		}
	};
	"onvisibilitychange" in document && "visible" !== document.visibilityState ? document.addEventListener("visibilitychange", function t() {
		"visible" === document.visibilityState && (document.removeEventListener("visibilitychange", t), n())
	}) : n()
}), function (t) {
	function e(e, i, r) {
		var s = !1;
		if (o) {
			var a = [];
			t.each(u, function () {
				r.hasOwnProperty(this) && (s = !0) && a.push({name: this, val: r[this]})
			}), s && (t.each(r, function (t) {
				a.push({name: t, val: this})
			}), r = a)
		}
		t.each(r, function (r, o) {
			if (s && (r = o.name, o = o.val), t.isFunction(o) && (!n || o.toString().indexOf(".__base") > -1)) {
				var a = e[r] || function () {
				};
				i[r] = function () {
					var t = this.__base;
					this.__base = a;
					var e = o.apply(this, arguments);
					return this.__base = t, e
				}
			} else i[r] = o
		})
	}
	
	var n = function () {
		"_"
	}.toString().indexOf("_") > -1, i = function () {
	}, r = Object.create || function (t) {
		var e = function () {
		};
		return e.prototype = t, new e
	}, o = !0, s = {toString: ""};
	for (var a in s) s.hasOwnProperty(a) && (o = !1);
	var u = o ? ["toString", "valueOf"] : null;
	t.inherit = function () {
		var n = arguments, o = t.isFunction(n[0]), s = o ? n[0] : i, a = n[o ? 1 : 0] || {}, u = n[o ? 2 : 1],
			c = a.__constructor || o && s.prototype.__constructor ? function () {
				return this.__constructor.apply(this, arguments)
			} : function () {
			};
		if (!o) return c.prototype = a, c.prototype.__self = c.prototype.constructor = c, t.extend(c, u);
		t.extend(c, s);
		var l = s.prototype, d = c.prototype = r(l);
		return d.__self = d.constructor = c, e(l, d, a), u && e(s, c, u), c
	}, t.inheritSelf = function (t, n, i) {
		var r = t.prototype;
		return e(r, r, n), i && e(t, t, i), t
	}
}(jQuery), function (t) {
	var e = 0, n = "__" + +new Date, i = function () {
		return "uniq" + ++e
	};
	t.identify = function (t, e) {
		if (!t) return i();
		var r = "uniqueID" in t ? "uniqueID" : n;
		return e || r in t ? t[r] : t[r] = i()
	}
}(jQuery), function (t) {
	t.isEmptyObject || (t.isEmptyObject = function (t) {
		for (var e in t) return !1;
		return !0
	})
}(jQuery), function (t) {
	t.extend({
		debounce: function (t, e, n, i) {
			3 == arguments.length && "boolean" != typeof n && (i = n, n = !1);
			var r;
			return function () {
				var o = arguments;
				i = i || this, n && !r && t.apply(i, o), clearTimeout(r), r = setTimeout(function () {
					n || t.apply(i, o), r = null
				}, e)
			}
		}, throttle: function (t, e, n) {
			var i, r, o;
			return function () {
				r = arguments, o = !0, n = n || this, i || function () {
					o ? (t.apply(n, r), o = !1, i = setTimeout(arguments.callee, e)) : i = null
				}()
			}
		}
	})
}(jQuery), function (t) {
	var e = "__" + +new Date + "storage", n = function (e, n) {
		return t.identify(e) + (n ? t.identify(n) : "")
	}, i = {
		buildEventName: function (t) {
			return t
		}, on: function (i, r, o, s, a) {
			if ("string" == typeof i) {
				t.isFunction(r) && (s = o, o = r, r = void 0);
				for (var u, c = n(o, s), l = this[e] || (this[e] = {}), d = i.split(" "), f = 0; i = d[f++];) if (i = this.buildEventName(i), u = l[i] || (l[i] = {
					ids: {},
					list: {}
				}), !(c in u.ids)) {
					var h = u.list, m = {fn: o, data: r, ctx: s, special: a};
					h.last ? (h.last.next = m, m.prev = h.last) : h.first = m, u.ids[c] = h.last = m
				}
			} else {
				var p = this;
				t.each(i, function (t, e) {
					p.on(t, e, r, a)
				})
			}
			return this
		}, onFirst: function (t, e, n, i) {
			return this.on(t, e, n, i, {one: !0})
		}, un: function (i, r, o) {
			if ("string" == typeof i || void 0 === i) {
				var s = this[e];
				if (s) if (i) {
					for (var a, u = i.split(" "), c = 0; i = u[c++];) if (i = this.buildEventName(i), a = s[i]) if (r) {
						var l = n(r, o), d = a.ids;
						if (l in d) {
							var f = a.list, h = d[l], m = h.prev, p = h.next;
							m ? m.next = p : h === f.first && (f.first = p), p ? p.prev = m : h === f.last && (f.last = m), delete d[l]
						}
					} else delete this[e][i]
				} else delete this[e]
			} else {
				var v = this;
				t.each(i, function (t, e) {
					v.un(t, e, o)
				})
			}
			return this
		}, trigger: function (n, i) {
			var r, o = this, s = o[e];
			if ("string" == typeof n ? n = t.Event(o.buildEventName(r = n)) : n.type = o.buildEventName(r = n.type), n.target || (n.target = o), s && (s = s[n.type])) for (var a, u = s.list.first; u;) n.data = u.data, a = u.fn.call(u.ctx || o, n, i), void 0 !== a && (n.result = a, a === !1 && (n.preventDefault(), n.stopPropagation())), u.special && u.special.one && o.un(r, u.fn, u.ctx), u = u.next;
			return this
		}
	};
	t.observable = t.inherit(i, i)
}(jQuery), function (t) {
	var e = t.event.special.leftclick = {
		setup: function () {
			t(this).bind("click", e.handler)
		}, teardown: function () {
			t(this).unbind("click", e.handler)
		}, handler: function (e) {
			e.button || (e.type = "leftclick", t.event.handle.apply(this, arguments), e.type = "click")
		}
	}
}(jQuery), function (t, e) {
	function n(t, e, n) {
		return (t ? "__elem_" + t : "") + "__mod" + (e ? "_" + e : "") + (n ? "_" + n : "")
	}
	
	function i(e, i, r) {
		t.isFunction(e) ? i[n(r, "*", "*")] = e : t.each(e, function (e, o) {
			t.isFunction(o) ? i[n(r, e, "*")] = o : t.each(o, function (t, o) {
				i[n(r, e, t)] = o
			})
		})
	}
	
	function r(t, e) {
		return e ? Array.isArray(e) ? function (n) {
			for (var i = 0, r = e.length; i < r;) if (n.hasMod(t, e[i++])) return !0;
			return !1
		} : function (n) {
			return n.hasMod(t, e)
		} : function (e) {
			return e.hasMod(t)
		}
	}
	
	var o = [], s = {}, a = {};
	this.BEM = t.inherit(t.observable, {
		__constructor: function (t, e, n) {
			var i = this;
			i._modCache = t || {}, i._processingMods = {}, i._params = e, i.params = null, n !== !1 ? i._init() : i.afterCurrentEvent(function () {
				i._init()
			})
		}, _init: function () {
			return this._initing || this.hasMod("js", "inited") || (this._initing = !0, this.params || (this.params = t.extend(this.getDefaultParams(), this._params), delete this._params), this.setMod("js", "inited"), delete this._initing, this.hasMod("js", "inited") && this.trigger("init")), this
		}, changeThis: function (t, e) {
			return t.bind(e || this)
		}, afterCurrentEvent: function (t, e) {
			this.__self.afterCurrentEvent(this.changeThis(t, e))
		}, trigger: function (t, e) {
			return this.__base(t = this.buildEvent(t), e).__self.trigger(t, e), this
		}, buildEvent: function (e) {
			return "string" == typeof e && (e = t.Event(e)), e.block = this, e
		}, hasMod: function (t, e, n) {
			var i = arguments.length, r = !1;
			1 == i ? (n = "", e = t, t = void 0, r = !0) : 2 == i && ("string" == typeof t ? (n = e, e = t, t = void 0) : (n = "", r = !0));
			var o = this.getMod(t, e) === n;
			return r ? !o : o
		}, getMod: function (t, e) {
			var n = typeof t;
			if ("string" === n || "undefined" === n) {
				e = t || e;
				var i = this._modCache;
				return e in i ? i[e] : i[e] = this._extractModVal(e)
			}
			return this._getElemMod(e, t)
		}, _getElemMod: function (t, e, n) {
			return this._extractModVal(t, e, n)
		}, getMods: function (t) {
			var e = t && "string" != typeof t, n = this, i = [].slice.call(arguments, e ? 1 : 0),
				r = n._extractMods(i, e ? t : void 0);
			return e || (i.length ? i.forEach(function (t) {
				n._modCache[t] = r[t]
			}) : n._modCache = r), r
		}, setMod: function (e, n, i) {
			void 0 === i && (i = n, n = e, e = void 0);
			var r = this;
			if (!e || e[0]) {
				var o = (e && e[0] ? t.identify(e[0]) : "") + "_" + n;
				if (this._processingMods[o]) return r;
				var s, a = e ? r._getElemMod(n, e, s = r.__self._extractElemNameFrom(e)) : r.getMod(n);
				if (a === i) return r;
				this._processingMods[o] = !0;
				var u = !0, c = [n, i, a];
				e && c.unshift(e), [["*", "*"], [n, "*"], [n, i]].forEach(function (t) {
					u = r._callModFn(s, t[0], t[1], c) !== !1 && u
				}), !e && u && (r._modCache[n] = i), u && r._afterSetMod(n, i, a, e, s), delete this._processingMods[o]
			}
			return r
		}, _afterSetMod: function (t, e, n, i, r) {
		}, toggleMod: function (t, e, n, i, r) {
			"string" == typeof t && (r = i, i = n, n = e, e = t, t = void 0), void 0 === i ? i = "" : "boolean" == typeof i && (r = i, i = "");
			var o = this.getMod(t, e);
			return (o == n || o == i) && this.setMod(t, e, "boolean" == typeof r ? r ? n : i : this.hasMod(t, e, n) ? i : n), this
		}, delMod: function (t, e) {
			return e || (e = t, t = void 0), this.setMod(t, e, "")
		}, _callModFn: function (t, e, i, r) {
			var o = n(t, e, i);
			return this[o] ? this[o].apply(this, r) : void 0
		}, _extractModVal: function (t, e) {
			return ""
		}, _extractMods: function (t, e) {
			return {}
		}, channel: function (t, e) {
			return this.__self.channel(t, e)
		}, getDefaultParams: function () {
			return {}
		}, del: function (t) {
			var e = [].slice.call(arguments);
			return "string" == typeof t && e.unshift(this), this.__self.del.apply(this.__self, e), this
		}, destruct: function () {
		}
	}, {
		_name: "i-bem", blocks: s, decl: function (e, n, o) {
			if ("string" == typeof e ? e = {block: e} : e.name && (e.block = e.name), e.baseBlock && !s[e.baseBlock]) throw'baseBlock "' + e.baseBlock + '" for "' + e.block + '" is undefined';
			n || (n = {}), n.onSetMod && (i(n.onSetMod, n), delete n.onSetMod), n.onElemSetMod && (t.each(n.onElemSetMod, function (t, e) {
				i(e, n, t)
			}), delete n.onElemSetMod);
			var a = s[e.baseBlock || e.block] || this;
			if (e.modName) {
				var u = r(e.modName, e.modVal);
				t.each(n, function (e, i) {
					t.isFunction(i) && (n[e] = function () {
						var t;
						if (u(this)) t = i; else {
							var r = a.prototype[e];
							r && r !== n[e] && (t = this.__base)
						}
						return t ? t.apply(this, arguments) : void 0
					})
				})
			}
			if (o && "boolean" == typeof o.live) {
				var c = o.live;
				o.live = function () {
					return c
				}
			}
			var l;
			return e.block == a._name ? (l = t.inheritSelf(a, n, o))._processLive(!0) : (l = s[e.block] = t.inherit(a, n, o))._name = e.block, l
		}, _processLive: function (t) {
			return !1
		}, create: function (t, e) {
			return "string" == typeof t && (t = {block: t}), new s[t.block](t.mods, e)
		}, getName: function () {
			return this._name
		}, _extractElemNameFrom: function (t) {
		}, afterCurrentEvent: function (t, e) {
			1 == o.push({fn: t, ctx: e}) && setTimeout(this._runAfterCurrentEventFns, 0)
		}, _runAfterCurrentEventFns: function () {
			var t = o.length;
			if (t) for (var e, n = o.splice(0, t); e = n.shift();) e.fn.call(e.ctx || this)
		}, changeThis: function (t, e) {
			return t.bind(e || this)
		}, del: function (t) {
			var e = "string" == typeof t, n = e ? 0 : 1, i = arguments.length;
			for (e && (t = this); n < i;) delete t[arguments[n++]];
			return this
		}, channel: function (e, n) {
			return "boolean" == typeof e && (n = e, e = void 0), e || (e = "default"), n ? void (a[e] && (a[e].un(), delete a[e])) : a[e] || (a[e] = new t.observable)
		}
	})
}(jQuery), function () {
	Object.keys || (Object.keys = function (t) {
		var e = [];
		for (var n in t) t.hasOwnProperty(n) && e.push(n);
		return e
	})
}(), function () {
	var t = Array.prototype, e = Object.prototype.toString, n = {
		indexOf: function (t, e) {
			e = +(e || 0);
			var n = this, i = n.length;
			if (i > 0 && e < i) for (e = e < 0 ? Math.ceil(e) : Math.floor(e), e < -i && (e = 0), e < 0 && (e += i); e < i;) {
				if (e in n && n[e] === t) return e;
				++e
			}
			return -1
		}, forEach: function (t, e) {
			for (var n = -1, i = this, r = i.length; ++n < r;) n in i && (e ? t.call(e, i[n], n, i) : t(i[n], n, i))
		}, map: function (t, e) {
			for (var n = -1, i = this, r = i.length, o = new Array(r); ++n < r;) n in i && (o[n] = e ? t.call(e, i[n], n, i) : t(i[n], n, i));
			return o
		}, filter: function (t, e) {
			for (var n = -1, i = this, r = i.length, o = []; ++n < r;) n in i && (e ? t.call(e, i[n], n, i) : t(i[n], n, i)) && o.push(i[n]);
			return o
		}, reduce: function (t, e) {
			var n, i = -1, r = this, o = r.length;
			if (arguments.length < 2) {
				for (; ++i < o;) if (i in r) {
					n = r[i];
					break
				}
			} else n = e;
			for (; ++i < o;) i in r && (n = t(n, r[i], i, r));
			return n
		}, some: function (t, e) {
			for (var n = -1, i = this, r = i.length; ++n < r;) if (n in i && (e ? t.call(e, i[n], n, i) : t(i[n], n, i))) return !0;
			return !1
		}, every: function (t, e) {
			for (var n = -1, i = this, r = i.length; ++n < r;) if (n in i && !(e ? t.call(e, i[n], n, i) : t(i[n], n, i))) return !1;
			return !0
		}
	};
	for (var i in n) t[i] || (t[i] = n[i]);
	Array.isArray || (Array.isArray = function (t) {
		return "[object Array]" === e.call(t)
	})
}(), function () {
	var t = Array.prototype.slice;
	Function.prototype.bind || (Function.prototype.bind = function (e) {
		var n = this, i = t.call(arguments, 1);
		return function () {
			return n.apply(e, i.concat(t.call(arguments)))
		}
	})
}(), function (t, e, n) {
	function i(t, e, n) {
		n.push(s, t, s, e)
	}
	
	function r(t, e, n, r) {
		r.push(t), n && i(e, n, r)
	}
	
	function o(t, e, o, s, u) {
		r(t, n, n, u), u.push(a, e), s && i(o, s, u)
	}
	
	var s = "_", a = "__";
	t.INTERNAL = {
		NAME_PATTERN: "[a-zA-Z0-9-]+", MOD_DELIM: s, ELEM_DELIM: a, buildModPostfix: function (t, e, n) {
			var r = n || [];
			return i(t, e, r), n ? r : r.join("")
		}, buildClass: function (t, e, i, s, a) {
			var u = typeof i;
			if ("string" == u ? "string" != typeof s && "number" != typeof s && (a = s, s = i, i = e, e = n) : "undefined" != u ? (a = i, i = n) : e && "string" != typeof e && (a = e, e = n), !(e || i || a)) return t;
			var c = a || [];
			return e ? o(t, e, i, s, c) : r(t, i, s, c), a ? c : c.join("")
		}, buildClasses: function (t, i, s, a) {
			i && "string" != typeof i && (a = s, s = i, i = n);
			var u = a || [];
			return i ? o(t, i, n, n, u) : r(t, n, n, u), s && e.each(s, function (e, n) {
				n && (u.push(" "), i ? o(t, i, e, n, u) : r(t, e, n, u))
			}), a ? u : u.join("")
		}
	}
}(BEM, jQuery), function (t, e, n) {
	function i(t, n) {
		var i = t[0];
		e.each(a(i), function (s, a) {
			o(a, i, s, n);
			var u = m[a.uniqId];
			u ? u.domElem.index(i) < 0 && (u.domElem = u.domElem.add(t), e.extend(u._params, a)) : r(s, t, a)
		})
	}
	
	function r(t, i, r, s, u) {
		"boolean" == typeof r && (u = s, s = r, r = n);
		var c = i[0];
		r = o(r || a(c)[t], c, t);
		var l = r.uniqId;
		if (m[l]) return m[l]._init();
		h[l] = h[l] ? h[l].add(i) : i;
		var d = c.parentNode;
		d && 11 !== d.nodeType || e.unique(h[l]);
		var f = _[t] || S.decl(t, {}, {live: !0});
		if (!(f._liveInitable = !!f._processLive()) || s || r.live === !1) {
			s && i.addClass("i-bem");
			var p = new f(h[l], r, !!s);
			return delete h[l], u && u.apply(p, Array.prototype.slice.call(arguments, 4)), p
		}
	}
	
	function o(t, n, i, r) {
		(t || (t = {})).uniqId || (t.uniqId = (t.id ? i + "-id-" + t.id : e.identify()) + (r || e.identify()));
		var o = e.identify(n), s = p[o] || (p[o] = {});
		return s[i] || (s[i] = t), t
	}
	
	function s(t, e, n) {
		var i = t.find(e);
		return n ? i : i.add(t.filter(e))
	}
	
	function a(t) {
		var n = e.identify(t);
		return p[n] || (p[n] = u(t))
	}
	
	function u(t) {
		var n, i, r = t.getAttribute("data-bem");
		return r ? e.parseJSON(r) : (n = t.onclick || t.ondblclick, n || "body" != t.tagName.toLowerCase() || (i = e(t), (r = i.attr("onclick") || i.attr("ondblclick")) && (n = Function(r))), n ? n() : {})
	}
	
	function c(t) {
		delete p[e.identify(t)], t.onclick = null
	}
	
	function l(t, e) {
		1 === t.domElem.length ? t.destruct(!0) : t.domElem = t.domElem.not(e)
	}
	
	var d = e(window), f = e(document), h = {}, m = {}, p = {}, v = {}, g = {}, _ = t.blocks, b = t.INTERNAL,
		y = b.NAME_PATTERN, E = b.MOD_DELIM, w = b.ELEM_DELIM, M = b.buildModPostfix, k = b.buildClass;
	e.fn.bem = function (t, e) {
		return r(t, this, e, !0)
	};
	var S = t.DOM = t.decl("i-bem__dom", {
		__constructor: function (t, n, i) {
			var r = this;
			r.domElem = t, r._eventNameCache = {}, r._elemCache = {}, m[r._uniqId = n.uniqId || e.identify(r)] = r, r._needSpecialUnbind = !1, r.__base(null, n, i)
		}, findBlocksInside: function (t, e) {
			return this._findBlocks("find", t, e)
		}, findBlockInside: function (t, e) {
			return this._findBlocks("find", t, e, !0)
		}, findBlocksOutside: function (t, e) {
			return this._findBlocks("parents", t, e)
		}, findBlockOutside: function (t, e) {
			return this._findBlocks("closest", t, e)[0] || null
		}, findBlocksOn: function (t, e) {
			return this._findBlocks("", t, e)
		}, findBlockOn: function (t, e) {
			return this._findBlocks("", t, e, !0)
		}, _findBlocks: function (t, i, o, s) {
			o || (o = i, i = n);
			var a = i ? "string" == typeof i ? this.findElem(i) : i : this.domElem, u = "string" == typeof o,
				c = u ? o : o.block || o.blockName,
				l = "." + (u ? k(c) : k(c, o.modName, o.modVal)) + (s ? ":first" : ""), d = a.filter(l);
			if (t && (d = d.add(a[t](l))), s) return d[0] ? r(c, d.eq(0), !0) : null;
			var f = [], h = {};
			return e.each(d, function (t, n) {
				var i = r(c, e(n), !0);
				h[i._uniqId] || (h[i._uniqId] = !0, f.push(i))
			}), f
		}, bindToDomElem: function (t, n, i) {
			var r = this;
			return i ? t.bind(r._buildEventName(n), function (t) {
				return (t.data || (t.data = {})).domElem = e(this), i.apply(r, arguments)
			}) : e.each(n, function (e, n) {
				r.bindToDomElem(t, e, n)
			}), r
		}, bindToDoc: function (t, e) {
			return this._needSpecialUnbind = !0, this.bindToDomElem(f, t, e)
		}, bindToWin: function (t, e) {
			var n, i, r = e;
			return "resize" === t && (e = function () {
				var t = d.height(), e = d.width();
				n === t && i === e || (n = t, i = e, r.apply(this, arguments))
			}), this._needSpecialUnbind = !0, this.bindToDomElem(d, t, e)
		}, bindTo: function (t, n, i) {
			return !n || e.isFunction(n) ? (i = n, n = t, t = this.domElem) : "string" == typeof t && (t = this.elem(t)), this.bindToDomElem(t, n, i)
		}, unbindFromDomElem: function (t, e) {
			return t.unbind(this._buildEventName(e)), this
		}, unbindFromDoc: function (t) {
			return this.unbindFromDomElem(f, t)
		}, unbindFromWin: function (t) {
			return this.unbindFromDomElem(d, t)
		}, unbindFrom: function (t, e) {
			return e ? "string" == typeof t && (t = this.elem(t)) : (e = t, t = this.domElem), this.unbindFromDomElem(t, e)
		}, _buildEventName: function (t) {
			var e = this;
			return t.indexOf(" ") > 1 ? t.split(" ").map(function (t) {
				return e._buildOneEventName(t)
			}).join(" ") : e._buildOneEventName(t)
		}, _buildOneEventName: function (t) {
			var e = this, n = e._eventNameCache;
			if (t in n) return n[t];
			var i = "." + e._uniqId;
			if (t.indexOf(".") < 0) return n[t] = t + i;
			var r = ".bem_" + e.__self._name;
			return n[t] = t.split(".").map(function (t, e) {
				return 0 == e ? t + r : r + "_" + t
			}).join("") + i
		}, trigger: function (t, e) {
			return this.__base(t = this.buildEvent(t), e).domElem && this._ctxTrigger(t, e), this
		}, _ctxTrigger: function (t, n) {
			var i = this, r = v[i.__self._buildCtxEventName(t.type)], o = {};
			r && i.domElem.each(function () {
				for (var s = this, a = r.counter; s && a;) {
					var u = e.identify(s, !0);
					if (u) {
						if (o[u]) break;
						var c = r.ctxs[u];
						c && (e.each(c, function (e, r) {
							r.fn.call(r.ctx || i, t, n)
						}), a--), o[u] = !0
					}
					s = s.parentNode
				}
			})
		}, setMod: function (t, n, i) {
			if (t && void 0 !== i && t.length > 1) {
				var r = this;
				return t.each(function () {
					var o = e(this);
					o.__bemElemName = t.__bemElemName, r.setMod(o, n, i)
				}), r
			}
			return this.__base(t, n, i)
		}, _extractModVal: function (t, e, n) {
			var i, r = (e || this.domElem)[0];
			return r && (i = r.className.match(this.__self._buildModValRE(t, n || e))), i ? i[2] : ""
		}, _extractMods: function (t, e) {
			var n = {}, i = !t.length, r = 0;
			return ((e || this.domElem)[0].className.match(this.__self._buildModValRE("(" + (i ? y : t.join("|")) + ")", e, "g")) || []).forEach(function (t) {
				var e = (t = t.trim()).lastIndexOf(E), i = t.substr(0, e - 1).lastIndexOf(E);
				n[t.substr(i + 1, e - i - 1)] = t.substr(e + 1), ++r
			}), r < t.length && t.forEach(function (t) {
				t in n || (n[t] = "")
			}), n
		}, _afterSetMod: function (t, n, i, r, o) {
			var s = this.__self, a = s._buildModClassPrefix(t, o), u = s._buildModValRE(t, o), c = "" === n;
			(r || this.domElem).each(function () {
				var t = this.className;
				t.indexOf(a) > -1 ? this.className = t.replace(u, c ? "" : "$1" + a + n) : c || e(this).addClass(a + n)
			}), o && this.dropElemCache(o, t, i).dropElemCache(o, t, n)
		}, findElem: function (t, e, n, i) {
			arguments.length % 2 ? (i = n, n = e, e = t, t = this.domElem) : "string" == typeof t && (t = this.findElem(t));
			var r = this.__self;
			return s(t, "." + e.split(" ").map(function (t) {
				return k(r._name, t, n, i)
			}).join(",."))
		}, _elem: function (t, e, n) {
			var i, r = t + M(e, n);
			return (i = this._elemCache[r]) || (i = this._elemCache[r] = this.findElem(t, e, n), i.__bemElemName = t), i
		}, elem: function (t, n, i) {
			if (n && "string" != typeof n) return n.__bemElemName = t, n;
			if (t.indexOf(" ") < 0) return this._elem(t, n, i);
			var r = e([]), o = this;
			return t.split(" ").forEach(function (t) {
				r = r.add(o._elem(t, n, i))
			}), r
		}, dropElemCache: function (t, e, n) {
			if (t) {
				var i = this, r = M(e, n);
				t.indexOf(" ") < 0 ? delete i._elemCache[t + r] : t.split(" ").forEach(function (t) {
					delete i._elemCache[t + r]
				})
			} else this._elemCache = {};
			return this
		}, elemParams: function (t) {
			var e;
			return "string" == typeof t ? (e = t, t = this.elem(t)) : e = this.__self._extractElemNameFrom(t), u(t[0])[k(this.__self.getName(), e)] || {}
		}, elemify: function (t, n) {
			return (t = e(t)).__bemElemName = n, t
		}, containsDomElem: function (t) {
			var e = !1;
			return this.domElem.each(function () {
				return !(e = t.parents().andSelf().index(this) > -1)
			}), e
		}, buildSelector: function (t, e, n) {
			return this.__self.buildSelector(t, e, n)
		}, destruct: function (t) {
			var n = this, i = n.__self;
			n._isDestructing = !0, n._needSpecialUnbind && i.doc.add(i.win).unbind("." + n._uniqId), n.dropElemCache().domElem.each(function (t, n) {
				var i = a(n);
				e.each(i, function (t, e) {
					var i = m[e.uniqId];
					i ? i._isDestructing || l(i, n) : delete h[e.uniqId]
				}), c(n)
			}), t || n.domElem.remove(), delete m[n.un()._uniqId], delete n.domElem, delete n._elemCache, n.__base()
		}
	}, {
		scope: null, doc: f, win: d, _processLive: function (t) {
			var e = this, n = e._liveInitable;
			if ("live" in e) {
				void 0 === n ^ t && (n = e.live() !== !1, e.live = function () {
				})
			}
			return n
		}, init: function (t, n, r) {
			t && !e.isFunction(t) || (r = n, n = t, t = f);
			var o = e.identify();
			return s(t, ".i-bem").each(function () {
				i(e(this), o)
			}), n && this.afterCurrentEvent(function () {
				n.call(r || this, t)
			}), this._runAfterCurrentEventFns(), t
		}, destruct: function (t, i, r) {
			"boolean" != typeof t && (r = i, i = t, t = n), s(i, ".i-bem", r).each(function (t, n) {
				var i = a(this);
				e.each(i, function (t, e) {
					if (e.uniqId) {
						var i = m[e.uniqId];
						i ? l(i, n) : delete h[e.uniqId]
					}
				}), c(this)
			}), t || (r ? i.empty() : i.remove())
		}, update: function (t, e, n, i) {
			this.destruct(t, !0), this.init(t.html(e), n, i)
		}, replace: function (t, n) {
			this.destruct(!0, t), this.init(e(n).replaceAll(t))
		}, append: function (t, n) {
			this.init(e(n).appendTo(t))
		}, prepend: function (t, n) {
			this.init(e(n).prependTo(t))
		}, before: function (t, n) {
			this.init(e(n).insertBefore(t))
		}, after: function (t, n) {
			this.init(e(n).insertAfter(t))
		}, _buildCtxEventName: function (t) {
			return this._name + ":" + t
		}, _liveClassBind: function (t, n, i, r) {
			var o = this;
			if (n.indexOf(" ") > -1) n.split(" ").forEach(function (e) {
				o._liveClassBind(t, e, i, r)
			}); else {
				var s = g[n], a = e.identify(i);
				s || (s = g[n] = {}, f.bind(n, o.changeThis(o._liveClassTrigger, o))), s = s[t] || (s[t] = {
					uniqIds: {},
					fns: []
				}), a in s.uniqIds || (s.fns.push({
					uniqId: a,
					fn: o._buildLiveEventFn(i, r)
				}), s.uniqIds[a] = s.fns.length - 1)
			}
			return this
		}, _liveClassUnbind: function (t, n, i) {
			var r = g[n];
			if (r) if (i) {
				if (r = r[t]) {
					var o = e.identify(i);
					if (o in r.uniqIds) {
						var s = r.uniqIds[o], a = r.fns.length - 1;
						for (r.fns.splice(s, 1); s < a;) r.uniqIds[r.fns[s++].uniqId] = s - 1;
						delete r.uniqIds[o]
					}
				}
			} else delete r[t];
			return this
		}, _liveClassTrigger: function (t) {
			var n = g[t.type];
			if (n) {
				var i = t.target, r = [];
				for (var o in n) n.hasOwnProperty(o) && r.push(o);
				do {
					for (var s = " " + i.className + " ", a = 0; o = r[a++];) if (s.indexOf(" " + o + " ") > -1) {
						for (var u, c = 0, l = n[o].fns, d = !1; u = l[c++];) u.fn.call(e(i), t) === !1 && (d = !0);
						if (d && t.preventDefault(), d || t.isPropagationStopped()) return;
						r.splice(--a, 1)
					}
				} while (r.length && (i = i.parentNode))
			}
		}, _buildLiveEventFn: function (t, n) {
			var i = this;
			return function (o) {
				var s = [i._name, ((o.data || (o.data = {})).domElem = e(this)).closest(i.buildSelector()), !0],
					a = r.apply(null, n ? s.concat([t, o]) : s);
				if (a && !n && t) return t.apply(a, arguments)
			}
		}, liveInitOnEvent: function (t, e, n) {
			return this.liveBindTo(t, e, n, !0)
		}, liveBindTo: function (t, i, r, o) {
			i && !e.isFunction(i) || (r = i, i = t, t = n), t && "string" != typeof t || (t = {elem: t}), t.elemName && (t.elem = t.elemName);
			var s = this;
			return t.elem && t.elem.indexOf(" ") > 0 ? (t.elem.split(" ").forEach(function (e) {
				s._liveClassBind(k(s._name, e, t.modName, t.modVal), i, r, o)
			}), s) : s._liveClassBind(k(s._name, t.elem, t.modName, t.modVal), i, r, o)
		}, liveUnbindFrom: function (t, i, r) {
			i && !e.isFunction(i) || (r = i, i = t, t = n);
			var o = this;
			return t && t.indexOf(" ") > 1 ? (t.split(" ").forEach(function (t) {
				o._liveClassUnbind(k(o._name, t), i, r)
			}), o) : o._liveClassUnbind(k(o._name, t), i, r)
		}, _liveInitOnBlockEvent: function (t, e, n, i) {
			var r = this._name;
			return _[e].on(t, function (t) {
				if (t.block.domElem) {
					var e = arguments, o = t.block[i](r);
					n && o.forEach(function (t) {
						n.apply(t, e)
					})
				}
			}), this
		}, liveInitOnBlockEvent: function (t, e, n) {
			return this._liveInitOnBlockEvent(t, e, n, "findBlocksOn")
		}, liveInitOnBlockInsideEvent: function (t, e, n) {
			return this._liveInitOnBlockEvent(t, e, n, "findBlocksOutside")
		}, liveInitOnBlockInit: function (t, e) {
			return this.liveInitOnBlockEvent("init", t, e)
		}, liveInitOnBlockInsideInit: function (t, e) {
			return this.liveInitOnBlockInsideEvent("init", t, e)
		}, on: function (t, e, n, i, r) {
			return t.jquery ? this._liveCtxBind(t, e, n, i, r) : this.__base(t, e, n, i)
		}, un: function (t, e, n, i) {
			return t.jquery ? this._liveCtxUnbind(t, e, n, i) : this.__base(t, e, n)
		}, liveCtxBind: function (t, e, n, i, r) {
			return this._liveCtxBind(t, e, n, i, r)
		}, _liveCtxBind: function (t, i, r, o, s) {
			var a = this;
			if ("string" == typeof i) if (e.isFunction(r) && (s = o, o = r, r = n), i.indexOf(" ") > -1) i.split(" ").forEach(function (e) {
				a._liveCtxBind(t, e, r, o, s)
			}); else {
				var u = a._buildCtxEventName(i), c = v[u] || (v[u] = {counter: 0, ctxs: {}});
				t.each(function () {
					var t = e.identify(this), n = c.ctxs[t];
					n || (n = c.ctxs[t] = {}, ++c.counter), n[e.identify(o) + (s ? e.identify(s) : "")] = {
						fn: o,
						data: r,
						ctx: s
					}
				})
			} else e.each(i, function (e, n) {
				a._liveCtxBind(t, e, n, r)
			});
			return a
		}, liveCtxUnbind: function (t, e, n, i) {
			return this._liveCtxUnbind(t, e, n, i)
		}, _liveCtxUnbind: function (t, n, i, r) {
			var o = this, s = v[n = o._buildCtxEventName(n)];
			return s && (t.each(function () {
				var t, n = e.identify(this, !0);
				n && (t = s.ctxs[n]) && (i && delete t[e.identify(i) + (r ? e.identify(r) : "")], i && !e.isEmptyObject(t) || (s.counter--, delete s.ctxs[n]))
			}), s.counter || delete v[n]), o
		}, _extractElemNameFrom: function (t) {
			if (t.__bemElemName) return t.__bemElemName;
			var e = t[0].className.match(this._buildElemNameRE());
			return e ? e[1] : n
		}, extractParams: u, _buildModClassPrefix: function (t, e) {
			return k(this._name) + (e ? w + ("string" == typeof e ? e : this._extractElemNameFrom(e)) : "") + E + t + E
		}, _buildModValRE: function (t, e, n) {
			return new RegExp("(\\s|^)" + this._buildModClassPrefix(t, e) + "(" + y + ")(?=\\s|$)", n)
		}, _buildElemNameRE: function () {
			return new RegExp(this._name + w + "(" + y + ")(?:\\s|$)")
		}, buildSelector: function (t, e, n) {
			return "." + k(this._name, t, e, n)
		}, getBlockByUniqId: function (t) {
			return m[t]
		}, getWindowSize: function () {
			return {width: d.width(), height: d.height()}
		}
	});
	e(function () {
		t.DOM.scope = e("body")
	})
}(BEM, jQuery), function () {
	String.prototype.trim || (String.prototype.trim = function () {
		for (var t = this.replace(/^\s\s*/, ""), e = /\s/, n = t.length; e.test(t.charAt(--n));) ;
		return t.slice(0, n + 1)
	})
}(), $(function () {
	BEM.DOM.init()
}), BEM.DOM.decl("input", {
	onSetMod: {
		js: function () {
			this._val = this.elem("control").val(), this._originalVal = this.params.value || this._val, this.bindFocus(), this._valueChanged()
		}, focused: function (t, e) {
			var n = "yes" === e;
			n ? this._focused || this._focus() : this._focused && this._blur(), this.afterCurrentEvent(function () {
				this.trigger(n ? "focus" : "blur")
			})
		}
	}, bindFocus: function () {
		this.bindTo(this.elem("control"), {
			focus: this._onFocus,
			blur: this._onBlur,
			input: this._update,
			mousedown: this._update,
			mouseup: this._update,
			keyup: this._update
		})
	}, val: function (t, e) {
		if (void 0 === t) return this._val;
		if (this._val !== t) {
			var n = this.elem("control");
			n.val() !== t && n.val(t), this._val = t, this.trigger("change", e)
		}
		return this._valueChanged()
	}, _onFocus: function () {
		return this._focused = !0, this.setMod("focused", "yes")
	}, _onBlur: function () {
		return this._focused = !1, this._valueChanged().delMod("focused")
	}, _valueChanged: function () {
		return this._originalVal === this._val ? this.delMod("value-changed") : this.setMod("value-changed", "yes")
	}, _focus: function () {
		this.elem("control").focus(), this._update()
	}, _blur: function () {
		this.elem("control").blur()
	}, _update: function () {
		this.val(this.elem("control").val())
	}
}, {}), BEM.DOM.decl("suggest", {
	onSetMod: {
		js: {
			inited: function () {
				this._lastBlurTime = 0, this._clear()
			}
		}
	}, getDefaultParams: function () {
		return {submitBySelect: !0, updateOnEnterByKeyboard: !1, onFocus: "request"}
	}, init: function () {
		this.params.form.on("submit", function () {
			this._clear(), this._popup.hide()
		}, this), this._model = this.initModel(), this._view = this.initView(), this._model.on({response: this.setItems}, this), this._input = this.params["suggest-input"], this._popup = this.params["suggest-popup"], this.bindEvents()
	}, initModel: function () {
		return BEM.create("suggest-model", this.params)
	}, getModel: function () {
		return this._model
	}, initView: function () {
		return BEM.create({block: "suggest-view"}, this.params.templates)
	}, getView: function () {
		return this._view
	}, bindEvents: function () {
		var t = this;
		return t._input.bindEvents({
			keydown: t._onKeyDown,
			change: t._onChange,
			focus: t._onFocus,
			blur: t._onBlur
		}, t), BEM.blocks["suggest-item"].on(t.domElem, {
			mouseover: function (t) {
				t.block.onEnter()
			}, mouseout: function (t) {
				t.block.onLeave()
			}, mousedown: function () {
				t._onDownItem()
			}, leftclick: function (e) {
				t._onSelectItem(e.block, !1)
			}
		}), t._popup.on({
			preshow: function () {
				this.trigger("preshow")
			}, show: function () {
				this.trigger("show")
			}, hide: function (t, e) {
				this.trigger("hide", e)
			}
		}, this), t
	}, setItems: function (t, e) {
		var n = this;
		return e.data.items.length ? n._input.val() !== e.val ? n._clear() : (n._text = e.val, n._pos = e.pos, n._meta = e.data.meta || {}, n._popup.show(n._view.html(e.data.items)), n._items = n.findBlocksInside("suggest-item"), n.trigger("update", {
			val: n._text,
			pos: n._pos,
			items: n._items
		}), n) : (n._popup.hide(), n._clear())
	}, getItems: function () {
		return this._items || []
	}, isBlur: function () {
		return this._isBlur
	}, _onChange: function (t, e) {
		this._model.request(this._input.realVal(this._input.val()), this._input.getCaretPosition(), e)
	}, _onFocus: function () {
		this._isBlur = !0, this.params.onFocus && this._isLastBlurTimeLater(300) && (this.getItems().length && this._input.val() === this._text ? this._popup.show() : "request" === this.params.onFocus && this._onChange())
	}, _onBlur: function () {
		this._lastBlurTime = (new Date).getTime(), this._isBlur ? (this._clear(), this._popup.hide()) : this._isMouseDown && this._input.get().setMod("focused", "yes")
	}, _onKeyDown: function (t) {
		var e = this.__self.keyboard, n = t.which;
		!this._popup.isShown() || n !== e.up && n !== e.down || t.preventDefault()
	}, _getItemIndex: function (t) {
		return this.getItems().indexOf(t)
	}, _clear: function () {
		return this._isBlur = !0, this._isMouseDown = !1, this
	}, _isLastBlurTimeLater: function (t) {
		return (new Date).getTime() - this._lastBlurTime > t
	}, _onDownItem: function () {
		this._isBlur = !1
	}, _onSelectItem: function (t, e) {
		var n = this, i = n._getItemIndex(t);
		return n._text = n._input.realVal(t.onSelect(e).val()), n._isBlur = !0, n._items = [], n.trigger("select", {
			val: n._text,
			pos: n._pos,
			item: t,
			meta: n._meta,
			itemIndex: i,
			byKeyboard: e
		}), n.params.submitBySelect && n.params.form.submit(), i
	}
}, {keyboard: {enter: 13, left: 37, up: 38, right: 39, down: 40}}), BEM.DOM.decl("suggest-detect", {
	onSetMod: {
		js: {
			inited: function () {
				this.bindToDoc("keydown", function (t) {
					this.__self._pressedKeyCode = t.which
				}, this).bindToDoc("keyup", function () {
					this.__self._pressedKeyCode = null
				}, this)
			}
		}
	}
}, {
	_pressedKeyCode: null, isPressedEscape: function () {
		return 27 === this._pressedKeyCode
	}
}), BEM.decl("suggest-model", {
	onSetMod: {
		js: {
			inited: function () {
				this._requests = []
			}
		}
	}, destruct: function () {
		return this._provider && this._provider.destruct(), this.__base.apply(this, arguments)
	}, getProvider: function () {
		return this._provider ? this._provider : (this._provider = this.setProvider(this.params), this._provider)
	}, setProvider: function (t) {
		return this._provider = BEM.create("suggest-provider", t), this._provider
	}, getCancelRequestConditions: function () {
		return [{block: "suggest", show: !1}, {block: "suggest", event: "select"}, {
			block: "suggest",
			event: "out"
		}, {block: "suggest-item", show: !1}, {block: "suggest-popup", event: "hide"}, {suggest: !1}]
	}, request: function (t, e, n) {
		if (this._isNeedRequest(n)) {
			var i = {val: t, requestTime: (new Date).getTime()};
			return this.trigger("request", {val: t, pos: e}), this.getProvider().get(t, e, function (t, e, n) {
				i.responseTime = (new Date).getTime(), this._requests.push(i), this._onResponse(t, e, n)
			}.bind(this)), this
		}
	}, isTimeInRequestInterval: function (t) {
		for (var e = this._requests.length - 1; e >= 0; e--) if (t > this._requests[e].requestTime && t < this._requests[e].responseTime) return !0;
		return !1
	}, _isNeedRequest: function (t) {
		return !t || !this.getCancelRequestConditions().some(function (e) {
			return Object.keys(e).every(function (n) {
				return e[n] === t[n]
			})
		})
	}, _onResponse: function (t, e, n) {
		this.trigger("response", {val: t, pos: e, data: n})
	}
}), BEM.decl("suggest-provider", {
	getDefaultParams: function () {
		return {type: "GET", dataType: "jsonp"}
	}, get: function (t, e, n) {
		$.ajax(this._extendParamsData(this.getRequestData(t, e))).done(function (i) {
			n.call(this, t, e, this.convert(i))
		}.bind(this)).error(function () {
			n.call(this, t, e, {items: []})
		}.bind(this))
	}, convert: function (t) {
		return {items: t[1], meta: t[2]}
	}, getRequestData: function (t, e) {
		return {part: t, pos: e}
	}, getRequestUrl: function () {
		return this.params.url
	}, _extendParamsData: function (t) {
		return this.params.url = this.getRequestUrl(), this.params.data = $.extend(this.params.data || {}, t), this.params
	}
}), BEM.decl("suggest-view", {
	html: function (t) {
		return this.build(t)
	}, build: function (t) {
		var e = this.buildItems(t), n = [], i = this.params;
		return e.personal.length && (n.push(i.items.replace("%%title%%", i.persGroupTitle).replace("%%items%%", e.personal.join(""))), e.items.length && n.push(i.groupDelimiter)), e.items.length && n.push(i.items.replace("%%title%%", i.searchGroupTitle).replace("%%items%%", e.items.join(""))), n.join("")
	}, buildItems: function (t) {
		return t.reduce(function (t, e) {
			var n = this.__self._getPrefs(e);
			return t[n.pers ? "personal" : "items"].push(this.buildItem(e, n)), t
		}.bind(this), {personal: [], items: []})
	}, buildItem: function (t, e) {
		var n = this.__self, i = n._getType(t, e), r = n._highlight(n._getText(t), e), o = n._getFact(t);
		if ("fact" === i || "weather" === i) return this.params.itemWithFact.replace("%%content%%", r).replace("%%fact%%", o);
		if ("nav" !== i && "icon" !== i) return this.params.item.replace("%%content%%", r)
	}
}, {
	_getPrefs: function (t) {
		if (!Array.isArray(t)) return {};
		var e = t[t.length - 1];
		return $.isPlainObject(e) ? e : {}
	}, _getType: function (t) {
		return Array.isArray(t) ? t[0] || "text" : "text"
	}, _getText: function (t) {
		return Array.isArray(t) ? t[1] : t
	}, _getFact: function (t) {
		return Array.isArray(t) ? t[2] : ""
	}, _highlight: function (t, e) {
		function n(t) {
			return t ? t.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/`/g, "&#x60;").replace(/'/g, "&#x27;") : ""
		}
		
		if (!e.hl) return t;
		var i, r = e.hl.sort(function (t, e) {
			return t[0] - e[0]
		}).filter(function (t) {
			return t[0] >= 0
		}), o = [], s = 0;
		return r.length ? (r.forEach(function (e) {
			i = s > e[0] ? s : e[0], o.push(t.slice(s, i)), o.push("<b>" + n(t.slice(i, s = e[1])) + "</b>")
		}, this), o.push(t.slice(s)), o.filter(function (t) {
			return Boolean(t)
		}).join("")) : t
	}
}), BEM.decl("suggest-popup", {
	onSetMod: {
		js: {
			inited: function () {
				this._popup = this.params.popup.setParent(this.params.parent), this._popup.on("hide", function () {
					BEM.blocks["suggest-detect"].isPressedEscape() && this.trigger("hide", {})
				}, this), this.bindSuggestEvents()
			}
		}
	}, show: function (t) {
		return t && this._popup.setContent(t), this.isShown() ? this : (this.trigger("preshow"), this._popup.show(this.params.owner), this.trigger("show"), this)
	}, hide: function (t) {
		return this.isShown() && (this._popup.hide(), this.trigger("hide", t || {})), this
	}, setContent: function (t) {
		return this._popup.setContent(t), this
	}, isShown: function () {
		return !!this._popup && this._popup.isShown()
	}, owner: function (t) {
		return t ? (this.params.owner = t, this) : this.params.owner
	}, get: function () {
		return this._popup
	}, destruct: function () {
		if (this._popup) return this._popup.destruct()
	}, bindSuggestEvents: function () {
		return this.params.suggest.on({
			select: function (t, e) {
				this.hide(e)
			}, update: function (t, e) {
				e.items.length || this.hide({response: "empty"})
			}
		}, this), this
	}
}), BEM.decl("suggest-input", {
	onSetMod: {
		js: {
			inited: function () {
				var t = this;
				t._input = t.params.input, t.disableBrowserAutocomplete(), t.realVal(t.val()), t.bindEvents({
					change: function (e, n) {
						t.trigger("change", n)
					}, clear: $.throttle(function (e, n) {
						t.trigger("clear", n)
					}, 300)
				}, t), t.bindSuggestEvents()
			}
		}
	}, get: function () {
		return this._input
	}, getControl: function () {
		return this._input.elem("control")
	}, val: function (t) {
		return void 0 === t ? this._input.elem("control").val() : this._input.elem("control").val(t)
	}, realVal: function (t) {
		return void 0 === t ? this._realVal : ("string" == typeof t && (this._realVal = t), this._realVal)
	}, getCaretPosition: function () {
		var t, e = this.getControl()[0], n = this.val().length;
		return document.selection ? (t = document.selection.createRange(), t.moveStart("character", -n), t.text.length) : "number" == typeof e.selectionStart ? e.selectionStart : n
	}, disableBrowserAutocomplete: function () {
		var t = this._input.hasMod("focused");
		t && this._input.delMod("focused"), this.getControl().attr({
			autocomplete: "off",
			autocorrect: "off",
			autocapitalize: "off",
			spellcheck: "false",
			"aria-autocomplete": "list"
		}), t && this._input.setMod("focused", "yes")
	}, bindEvents: function (t, e) {
		return Object.keys(t).forEach(function (n) {
			this._eventsFilter(n).on(n, t[n].bind(e || this))
		}, this), this
	}, bindSuggestEvents: function () {
		var t = this.params.suggest;
		return t.on({
			out: function (t, e) {
				this.a11yDeactive(), this._changeValueByEvent(t, e)
			}
		}, this), BEM.blocks["suggest-item"].on(t.domElem, {
			select: this._changeValueByEvent, enter: function (t, e) {
				this.a11yActive(e.id), e.byKeyboard && this.params.updateOnEnterByKeyboard && this._changeValueByEvent(t, e)
			}
		}, this), this
	}, a11yActive: function (t) {
		this.getControl().attr("aria-activedescendant", t)
	}, a11yDeactive: function () {
		this.getControl().removeAttr("aria-activedescendant")
	}, _eventsFilter: function (t) {
		return ["blur", "focus", "change", "clear"].indexOf(t) > -1 ? this._input : this.getControl()
	}, _changeValueByEvent: function (t, e) {
		this.val(e && e.val || this.realVal(), $.extend({block: t.block.__self.getName(), event: t.type}, e))
	}
}), BEM.DOM.decl("suggest-item", {
	val: function () {
		if (this.params.val) return this.params.val;
		var t = this.elem("text");
		return (t.length ? t : this.domElem).text()
	}, onEnter: function () {
		return this.setMod("selected", "yes").triggerEvent("enter", {val: this.val()})
	}, onLeave: function () {
		return this.delMod("selected")
	}, onSelect: function () {
		return this.triggerEvent("select", {val: this.val()})
	}, triggerEvent: function (t, e) {
		return this.trigger(t, {val: e.val, id: this.domElem.attr("id"), show: !1, byKeyboard: e.byKeyboard})
	}
}, {
	live: function () {
		this.liveBindTo("mouseover mouseout mousedown leftclick", function (t) {
			this.trigger(t.type, t)
		})
	}
}), BEM.DOM.decl("suggest-form", {
	onSetMod: {
		js: {
			inited: function () {
				this._isReady = !1, this.initNodes()
			}
		}
	}, getDefaultParams: function () {
		return {inputName: "input", buttonName: "button", popupName: "popup"}
	}, isReady: function () {
		return this._isReady
	}, initNodes: function () {
		var t = this.getNodes();
		t.forEach(function (t) {
			t.suggest.init()
		}), this._isReady = !0, this.trigger("ready", {nodes: t})
	}, getNodes: function () {
		return this.getNodeList().map(function (t) {
			var e = t.suggest, n = e.params;
			return n.input = t.input, n.button = t.button, n.form = this, n["suggest-popup"] = BEM.create("suggest-popup", {
				suggest: e,
				popup: e.findBlockOn(this.params.popupName),
				owner: n.input,
				parent: this.findBlockOutside(this.params.parentName)
			}), n["suggest-input"] = BEM.create("suggest-input", {
				suggest: e,
				input: n.input,
				updateOnEnterByKeyboard: n.updateOnEnterByKeyboard
			}), this.bindFormEvents(t), t
		}, this)
	}, bindFormEvents: function (t) {
		var e = this;
		return t.button && t.button.bindTo("click", function (t) {
			e.trigger("button-click", t)
		}), e.bindTo("submit", function (t, n) {
			e.onSubmit(t, n)
		}), e
	}, submit: function (t) {
		return this.domElem.trigger("submit", t || {}), this
	}, onSubmit: function (t, e) {
		t.data = e || {}, this.trigger("submit", t)
	}, getNodeList: function () {
		var t = this, e = [];
		return t.elem("node").each(function (n, i) {
			var r = $(i), o = t.findBlockInside(r, "suggest"),
				s = {input: t.findElem(r, "input"), button: t.findElem(r, "button")};
			e.push({
				node: r,
				suggest: o,
				input: t.findBlockOn(s.input, t.params.inputName),
				button: t.findBlockOn(s.button, t.params.buttonName),
				popup: o.findBlockOn(t.params.popupName)
			})
		}), e
	}
}), function (t) {
	var e = t.browser.opera && t.browser.version < 12.1 ? "keypress" : "keydown";
	BEM.DOM.decl("popup", {
		onSetMod: {
			js: function () {
				this._viewport = this.__self.win, this._scope = BEM.DOM.scope, this._inContainer = null, this._owner = null, this._parent = null, this._isShown = !1
			}, visibility: {
				visible: function () {
					this._onShown()
				}, "": function () {
					this._onHidden()
				}
			}
		}, show: function (e) {
			var n;
			if (e instanceof BEM) n = e.domElem; else if (e instanceof t) n = e; else if (!e) return;
			return n ? (this._owner && n[0] !== this._owner[0] && this.delMod("visibility"), this._owner = n) : this._userPosition = e, this.repaint()
		}, hide: function () {
			return this.delMod("visibility")
		}, toggle: function (t) {
			return this._isShown ? this.hide() : this.show(t || this._owner)
		}, repaint: function () {
			return this._moveToContainer(), this._show(), this
		}, setParent: function (t) {
			return t instanceof BEM && (this._parent = t), this
		}, setContent: function (t) {
			return BEM.DOM.update(this.elem("content"), t), this._isShown && this.repaint(), this
		}, isShown: function () {
			return this._isShown
		}, _show: function () {
			return this.setMod("visibility", "visible"), this
		}, _onShown: function () {
			this.bindToDoc(e, function (e) {
				27 === e.which && (e.preventDefault(), t(this.__self.doc[0].activeElement).blur(), this.hide())
			}), this._isShown = !0, this.trigger("show")
		}, _onHidden: function () {
			this.unbindFromDoc(e), this._isShown = !1, this.trigger("hide")
		}, _moveToContainer: function (t) {
			t || (t = this._parent ? this._parent.domElem : this._scope), this._inContainer ? t.children(":last")[0] === this.domElem[0] || this.domElem.appendTo(t) : this._inContainer = Boolean(this.domElem.appendTo(t))
		}, destruct: function () {
			var t = arguments;
			return this._childs.forEach(function (e) {
				e.destruct.apply(e, t)
			}), this.__base.apply(this, t)
		}
	}, {
		live: function () {
			this.liveBindTo("close", "leftclick tap", function () {
				this.hide()
			})
		}
	})
}(jQuery), BEM.DOM.decl("video-thumb", {
	onSetMod: {
		js: {
			inited: function () {
				var t = this;
				Ya.ready(function () {
					setTimeout(t.loadImage.bind(t), 0)
				})
			}
		}
	}, loadImage: function () {
		this.domElem && this.params.bgImg && this.domElem.css("background-image", "url(" + this.params.bgImg + ")")
	}
}, {}), BEM.decl("i-mcounter", {}, {
	entropy: 0,
	cellSize: 100,
	previous: "",
	current: "",
	moves: {total: 0, cells: {}},
	init: function () {
		this.bind()
	},
	bind: function () {
		var t = this;
		$(window).unbind("mousemove.i-mcounter").bind("mousemove.i-mcounter", function (e) {
			t.track(e.clientX, e.clientY)
		})
	},
	track: function (t, e) {
		this.current = this.getKey(t, e), this.shouldTrack() && (this.updateCellCounter(), this.moves.total++, this.previous = this.current)
	},
	shouldTrack: function () {
		return this.current !== this.previous || !this.previous
	},
	updateCellCounter: function () {
		var t = this.moves.cells;
		this.current in t || (t[this.current] = 0), t[this.current]++
	},
	getKey: function (t, e) {
		return Math.floor(t / 100) + "." + Math.floor(e / 100)
	},
	getCellPosition: function (t) {
		return Math.floor(t / this.cellSize)
	},
	get: function () {
		return this.calculate(), this.entropy
	},
	calculate: function () {
		var t = 0, e = this.moves.cells, n = this;
		$.each(e, function (e, i) {
			var r = n.moves.total, o = i / r;
			t -= o * Math.log(o) / Math.log(2)
		}), this.entropy = t
	}
}).init(), function (t, e, n, i, r) {
	"use strict";
	
	function o() {
		var t = j.concat(["2129=" + S, "1036=" + (k.domainLookupStart - S), "1037=" + (k.domainLookupEnd - k.domainLookupStart), "1038=" + (k.connectEnd - k.connectStart), k.secureConnectionStart ? "1383=" + (k.connectEnd - k.secureConnectionStart) : null, "1039=" + (k.responseStart - k.connectEnd), "1040=" + (k.responseEnd - k.responseStart), "1040.906=" + (k.responseEnd - k.domainLookupStart), "1310.2084=" + (k.domLoading - k.responseStart), "1310.2085=" + (k.domInteractive - k.responseStart), "1310.1309=" + (k.domContentLoadedEventEnd - k.domContentLoadedEventStart), "1310.1007=" + (k.domContentLoadedEventStart - k.responseStart)]),
			e = {
				2127: k.unloadEventStart,
				2128: k.unloadEventEnd,
				2109: k.redirectStart,
				2110: k.redirectEnd,
				2111: k.fetchStart,
				2112: k.domainLookupStart,
				2113: k.domainLookupEnd,
				2114: k.connectStart,
				2115: k.secureConnectionStart,
				2116: k.connectEnd,
				2117: k.requestStart,
				2119: k.responseStart,
				2120: k.responseEnd,
				2769: k.domLoading,
				2770: k.domInteractive,
				2123: k.domContentLoadedEventStart,
				2131: k.domContentLoadedEventEnd
			};
		Object.keys(e).forEach(function (n) {
			var i = e[n];
			i && t.push(n + "=" + (i - S))
		}), w("690.1033", t)
	}
	
	function s() {
		if (F && (Ya.isPrerender || !I.isVisibilityChanged())) {
			for (var t = M.getEntriesByType("paint"), e = 0; e < t.length; e++) {
				var n = t[e];
				if ("first-contentful-paint" === n.name) return void _("1926.2794", n.startTime)
			}
			if (i) try {
				new i(function (t, e) {
					s(), e.disconnect()
				}).observe({entryTypes: ["paint"]})
			} catch (t) {
			}
		}
	}
	
	function a() {
		I.sendTimeMark = _, I.sendResTiming = E, I.getTimeMarks = y;
		for (var t = I.__defRes; t.length;) {
			var n = t.shift();
			E(n[0], n[1])
		}
		for (var i = I.__defTimes; i.length;) {
			var r = i.shift();
			_(r[0], r[1])
		}
		for (var o = e.querySelectorAll("[data-rCid]"), s = 0, a = o.length; s < a; s++) {
			var u = o[s], c = "LINK" === u.tagName ? u.href : u.src;
			E(u.getAttribute("data-rCid"), c)
		}
	}
	
	function u() {
		if (i && (Ya.isPrerender || !I.isVisibilityChanged())) {
			var t = new i(function (t) {
				for (var e = t.getEntries(), n = 0; n < e.length; n++) {
					var i = e[n];
					$ = i.renderTime || i.loadTime
				}
			});
			try {
				t.observe({type: "largest-contentful-paint", buffered: !0})
			} catch (t) {
			}
			addEventListener("visibilitychange", function n() {
				if ("hidden" === e.visibilityState) {
					removeEventListener("visibilitychange", n);
					try {
						"function" == typeof t.takeRecords && t.takeRecords(), t.disconnect()
					} catch (t) {
					}
					c()
				}
			}), addEventListener("beforeunload", c)
		}
	}
	
	function c() {
		null != $ && (_("largest-contentful-paint", $), $ = null)
	}
	
	function l() {
		try {
			new i(function (t, e) {
				var n = t.getEntries()[0];
				if (n) {
					b("first-input", n.processingStart - n.startTime), e.disconnect()
				}
			}).observe({type: "first-input", buffered: !0})
		} catch (t) {
		}
	}
	
	function d() {
		if (i) {
			var t = new i(function (t) {
				var e = t.getEntries();
				null == z && (z = 0);
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.hadRecentInput || (z += i.value)
				}
			});
			try {
				t.observe({type: "layout-shift", buffered: !0})
			} catch (t) {
			}
			addEventListener("visibilitychange", function n() {
				if ("hidden" === e.visibilityState) {
					removeEventListener("visibilitychange", n);
					try {
						"function" == typeof t.takeRecords && t.takeRecords(), t.disconnect()
					} catch (t) {
					}
					f()
				}
			}), addEventListener("beforeunload", f)
		}
	}
	
	function f() {
		if (null != z) {
			var t = Math.round(1e6 * z) / 1e6;
			w("690.2096.4004", j.concat("s=" + t)), z = null
		}
	}
	
	function h() {
		if (i && (Ya.isPrerender || !I.isVisibilityChanged())) {
			for (var t = e.querySelectorAll('img,[data-rcid],[style*="background"]'), n = [], r = 0; r < t.length; r++) {
				var o = t[r];
				if (!("lazy" === o.loading || 1 === Ya.lazyImage && o.getAttribute("data-image-url"))) {
					var s;
					o.src ? s = o.src : (s = getComputedStyle(o).backgroundImage, 0 === s.indexOf("url(") && (s = s.slice(4, -1), '"' !== s[0] && "'" !== s[0] || (s = s.slice(1, -1)))), s && (0 === s.indexOf("data:") && (s = Y), n.push({
						elem: o,
						url: s
					}))
				}
			}
			requestAnimationFrame(function () {
				var t = m(n);
				try {
					p(t)
				} catch (t) {
				}
			})
		}
	}
	
	function m(t) {
		for (var n = e.documentElement, i = n.clientWidth, r = n.clientHeight, o = [], s = 0; s < t.length; s++) {
			var a = t[s], u = a.elem.getBoundingClientRect();
			u.width < R || u.height < R || (u.bottom <= 0 || u.top >= r || u.right <= 0 || u.left >= i || o.push(a))
		}
		return o
	}
	
	function p(t) {
		if (t.length) {
			for (var n = e.createElement("link"), o = {}, s = 0; s < t.length; s++) {
				var a = t[s];
				a.url !== Y ? (n.href = a.url, o[n.href] = !0) : U = !0
			}
			if (U && (C = O, B = O), 0 === (K = Object.keys(o).length)) return v("e0");
			var u, c = new i(function (t) {
				for (var e = t.getEntries(), n = 0; n < e.length; n++) {
					var i = e[n];
					if (o[i.name]) {
						var s = i.responseEnd;
						s || (W = !0, s = O + i.duration), (C === r || s < C) && (C = s), (B === r || s > B) && (B = s), ++H === K && (c.disconnect(), v("ok"), clearTimeout(u))
					}
				}
			});
			c.observe({type: "resource", buffered: !0}), u = setTimeout(function () {
				try {
					c.disconnect(), v("tm")
				} catch (t) {
				}
			}, V)
		}
	}
	
	function v(t) {
		w("690.2096.277", ["ft=" + C, "lt=" + B, "er=" + K, "fr=" + H, "t=" + (t || "unk"), U && "d=1", W && "u=1"])
	}
	
	function g() {
		for (; I.__rumListeners.length;) I.__rumListeners.shift()();
		I.onRumInited = function (t) {
			t()
		}
	}
	
	function _(t, e) {
		return e = Math.round(1e3 * (e || I.getTime())) / 1e3, w("690.2096.207", j.concat(["1701=" + t, "143.2129=" + S, "207=" + e])), P[t] = P[t] || [], P[t].push(e), e
	}
	
	function b(t, e) {
		var n = I.getTime(), i = n - e;
		w("690.2096.2877", j.concat(["1701=" + t, "207.2154=" + i, "207.1428=" + n, "2877=" + e]))
	}
	
	function y() {
		return P
	}
	
	function E(t, e) {
		function n() {
			var o = M.getEntriesByName(e);
			if (!o.length) return void (i++ < 10 && setTimeout(n, 300));
			var s = o[0], a = {
				1701: t,
				143: Ya.loadPageId,
				287: Ya.regionId,
				2323: s.transferSize,
				2136: s.duration,
				2322: s.startTime,
				2137: s.workerStart,
				2111: s.fetchStart,
				2112: s.domainLookupStart,
				2113: s.domainLookupEnd,
				2114: s.connectStart,
				2115: s.secureConnectionStart,
				2116: s.connectEnd,
				2117: s.requestStart,
				2119: s.responseStart,
				2120: s.responseEnd,
				2428: i,
				143.2129: S,
				143.2112: T,
				143.2119: x
			};
			w("690.2096.2044", Object.keys(a).map(function (t) {
				var e = a[t];
				if (e !== r) return "number" == typeof e && (e = Math.round(1e3 * e) / 1e3), t + "=" + e
			}))
		}
		
		if (F) {
			var i = 0;
			setTimeout(n, 0)
		}
	}
	
	function w(t, e) {
		I.send(Ya.clck, "/" + ["path=" + t, "vars=" + e.filter(Boolean).join(","), "*"].join("/"))
	}
	
	var M = t.performance, k = M && M.timing, S = k && k.navigationStart;
	if (S !== r) {
		var C, B, I = Ya.Rum, x = k.responseStart - S, T = k.domainLookupStart - S, O = k.responseEnd,
			N = M.navigation || {}, D = e.visibilityState, q = {visible: 1, hidden: 2, prerender: 3}[D],
			A = n.connection || {}, L = {
				bluetooth: 2064,
				cellular: 2065,
				ethernet: 2066,
				none: 1229,
				wifi: 2067,
				wimax: 2068,
				other: 861,
				unknown: 836
			}[A.type] || 2771,
			j = ["143=" + Ya.loadPageId, "287=" + Ya.regionId, N.type && "770.76=" + N.type, N.redirectCount && "1384.1385=" + N.redirectCount, "1484=" + (q ? q : 1), L && "2437=" + L, A.downlinkMax !== r && "2439=" + A.downlinkMax, A.effectiveType && "2870=" + A.effectiveType, A.rtt !== r && "rtt=" + A.rtt, A.downlink !== r && "dwl=" + A.downlink],
			F = "function" == typeof M.getEntriesByType, P = {}, R = 10, V = 15e3, Y = "data-uri", K = 0, H = 0, U = !1,
			W = !1;
		Ya.isPrerender && j.push("3105=1"), Ya.prerenderStatus && j.push("prerender.status=" + Ya.prerenderStatus), Ya.ready(function () {
			setTimeout(function () {
				o(), s(), u(), l(), d(), h(), a(), g()
			}, 0)
		});
		var $, z
	}
}(window, document, navigator, window.PerformanceObserver);
