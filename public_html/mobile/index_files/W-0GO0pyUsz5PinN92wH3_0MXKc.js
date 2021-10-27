function FastClick(t, e) {
	"use strict";
	var n;
	if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10, this.layer = t, this.tapDelay = e.tapDelay || 200, !FastClick.notNeeded(t)) {
		for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, s = 0, r = i.length; s < r; s++) o[i[s]] = function (t, e) {
			return function () {
				return t.apply(e, arguments)
			}
		}(o[i[s]], o);
		deviceIsAndroid && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, n, i) {
			var o = Node.prototype.removeEventListener;
			"click" === e ? o.call(t, e, n.hijacked || n, i) : o.call(t, e, n, i)
		}, t.addEventListener = function (e, n, i) {
			var o = Node.prototype.addEventListener;
			"click" === e ? o.call(t, e, n.hijacked || (n.hijacked = function (t) {
				t.propagationStopped || n(t)
			}), i) : o.call(t, e, n, i)
		}), "function" == typeof t.onclick && (n = t.onclick, t.addEventListener("click", function (t) {
			n(t)
		}, !1), t.onclick = null)
	}
}

function init() {
	FastClick.attach(document.body)
}

!function (t) {
	function e(t, e, n) {
		return t = String(t || ""), e = String(e || ""), n = String(n || ""), Boolean(t && (t.indexOf("kaspersky-labs.com/") !== -1 || /(?:miscellaneous|extension)_bindings/.test(t) || /^(?:chrome|file):/.test(t) || /^(?:moz|chrome)-extension:\/\//.test(t) || 0 === t.indexOf("resource://") || t.indexOf("webnetc.top") !== -1 || t.indexOf("local.adguard.com") !== -1 || t.indexOf("ntp is not defined") !== -1) || e && (/(?:__adgRemoveDirect|ucapi|gj\.track\.uc\.cn|__show__deepen)/.test(e) || /__firefox__\.(?:favicons|metadata|reader)\./.test(e)) || n && /(?:moz|chrome)-extension:\/\//.test(n))
	}
	
	function n(t, n, i, s, r, u) {
		var c, l = "690.2354", p = r && r.stack, h = [];
		e(n, t, p) ? l = "690.2854" : null == u && (l = "690.2361"), c = {
			143: o.loadPageId || "2543.1030",
			"-label": u,
			"-msg": t,
			"-url": n,
			"-line": i,
			"-col": s,
			"-stack": p,
			"-static-host": o.staticHost,
			"-project": "granny",
			"-ua": navigator.userAgent,
			"-silent": a[l] > 10 ? "yes" : "no"
		};
		for (var d in c) c.hasOwnProperty(d) && null != c[d] && h.push(d + "=" + encodeURIComponent(c[d]));
		w(null, l, h.join(","), {
			clck: o.clck || "//yandex.ru/clck/click",
			sts: ["dtype=stred", "pid=1", "cid=73018"]
		}), a[l]++
	}
	
	function i(t, e, i, o, s, a) {
		n(t, e, i, o, s, a), r.push({message: t, url: e, line: i, col: o, error: s})
	}
	
	var o = t.Ya || {}, s = t.jserrors, r = t.jserrors = [],
		a = t.jsErrorsByTypeCount = {690.2354: 0, 690.2361: 0, 690.2854: 0};
	if (s) for (var u = 0, c = s.length; u < c; u++) i.apply(null, s[u]);
	t.onerror = function () {
		i.apply(null, arguments)
	}, t.logSerpJsError = function (t) {
		var e = t.catchType || "unknown";
		i(t.message, t.fileName, t.lineNumber, t.columnNumber, t, e)
	}
}(window), Ya.ready = function (t) {
	function e() {
		window.removeEventListener ? (window.removeEventListener("DOMContentLoaded", e, !1), window.removeEventListener("load", e, !1)) : window.detachEvent("onload", e), t()
	}
	
	"complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? t() : window.addEventListener ? (window.addEventListener("DOMContentLoaded", e, !1), window.addEventListener("load", e, !1)) : window.attachEvent("onload", e)
}, Ya.ready(function () {
	function t(t) {
		return window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle
	}
	
	function e() {
		var t = document.querySelector('[data-log-node="' + Ya.clckId + '"]') || document.body;
		w(null, "471.143.1007", null, a.getBaobabData()), w(null, null, null, {
			event: "tech",
			type: "coords",
			nodeId: Ya.clckId,
			data: {nodes: o(t), pageNodes: i(document)}
		})
	}
	
	function n() {
		window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(e, 0)
	}
	
	function i(t) {
		for (var e = [".b-page[data-log-node]", ".main .content__left[data-log-node], .main[data-log-node]", ".main__top[data-log-node]", ".serp-header[data-log-node], .header3[data-log-node]", ".navigation[data-log-node]", ".serp-footer[data-log-node]", ".related[data-log-node]", ".pager[data-log-node]", ".more[data-log-node]", ".region-change[data-log-node]", ".competitors[data-log-node]"], n = {}, i = 0; i < e.length; i++) {
			var o = e[i], s = r(t.querySelector(o));
			if (s && s.id) {
				var a = s.offsetHeight + s.marginTop + s.marginBottom;
				n[s.id] = [s.left, s.top, s.offsetWidth, s.offsetHeight, a]
			}
		}
		return n
	}
	
	function o(t) {
		var e = s(t.querySelectorAll(".serp-list .distr-default-search, .serp-item")),
			n = s(t.querySelectorAll(".misspell__level"));
		for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i]);
		return e
	}
	
	function s(t) {
		var e = {};
		if (0 === t.length) return e;
		for (var n = [], i = 0; i < t.length; i++) {
			var o = t[i], s = r(o);
			s && n.push(s)
		}
		for (i = 0; i < n.length; i++) {
			var a = n[i - 1], u = n[i], c = n[i + 1],
				l = u.offsetHeight + ((a ? Math.max(u.marginTop - a.marginBottom, 0) : u.marginTop) || 0) + ((c ? Math.max(u.marginBottom - c.marginTop, 0) : u.marginBottom) || 0) + ((a && c ? Math.min(a.marginBottom, c.marginTop) : 0) || 0);
			e[u.id] = [u.left, u.top, u.offsetWidth, u.offsetHeight, l]
		}
		return e
	}
	
	function r(e) {
		function n() {
			return window.getComputedStyle ? window.getComputedStyle.apply(window, arguments) : 0
		}
		
		if (!e) return null;
		var i = t(e) || {}, o = a.offset(e);
		if (i && "none" === i.display) return {
			element: e,
			id: e.getAttribute("data-log-node"),
			left: o.left,
			top: o.top,
			offsetWidth: 0,
			offsetHeight: 0,
			marginTop: 0,
			marginBottom: 0
		};
		var s = n(e, ":before").marginTop, r = n(e, ":after").marginBottom;
		return {
			element: e,
			id: e.getAttribute("data-log-node"),
			left: o.left,
			top: o.top,
			offsetWidth: e.offsetWidth,
			offsetHeight: e.offsetHeight,
			marginTop: Math.max(parseInt(i.marginTop, 10) || 0, parseInt(s, 10) || 0),
			marginBottom: Math.max(parseInt(i.marginBottom, 10) || 0, parseInt(r, 10) || 0)
		}
	}
	
	var a = {
		offset: function (t) {
			for (var e = t.offsetParent, n = t.offsetTop, i = t.offsetLeft; e !== document.body;) i += e.offsetLeft, n += e.offsetTop, e = e.offsetParent;
			return {top: n, left: i}
		}, isInArea: function (t, e, n) {
			if (!(e && e instanceof Element)) return !1;
			var i = this.offset(e), o = i.top;
			return n && (o += e.offsetHeight), i.left < t.right && o < t.bottom && o > t.top
		}, titleCount: function (t, e) {
			if (!e || !e.length) return {};
			for (var n = !1, i = 0, o = 0, s = 0; s < e.length; s++) {
				var r = e[s], a = r.querySelector(".organic__title") || r.querySelector(".serp-item__title");
				if (this.isInArea(t, a, !0)) n = !0, r.querySelector(".organic_adv") ? i++ : o++; else if (n) break
			}
			return {organic: o, adv: i}
		}, getViewportParams: function () {
			var t = window.innerWidth || document.documentElement.clientWidth, e = window.scrollY || window.pageYOffset,
				n = window.innerHeight || document.documentElement.clientHeight,
				i = {top: e, right: t, bottom: e + n, left: 0},
				o = this.titleCount(i, document.querySelectorAll(".serp-item"));
			return {
				serpTitlesCount: o.organic,
				serpAdvTitlesCount: o.adv,
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
}), function (t, e, n, i, o) {
	"use strict";
	
	function s() {
		var t = N.concat(["2129=" + S, "1036=" + (C.domainLookupStart - S), "1037=" + (C.domainLookupEnd - C.domainLookupStart), "1038=" + (C.connectEnd - C.connectStart), C.secureConnectionStart ? "1383=" + (C.connectEnd - C.secureConnectionStart) : null, "1039=" + (C.responseStart - C.connectEnd), "1040=" + (C.responseEnd - C.responseStart), "1040.906=" + (C.responseEnd - C.domainLookupStart), "1310.2084=" + (C.domLoading - C.responseStart), "1310.2085=" + (C.domInteractive - C.responseStart), "1310.1309=" + (C.domContentLoadedEventEnd - C.domContentLoadedEventStart), "1310.1007=" + (C.domContentLoadedEventStart - C.responseStart)]),
			e = {
				2127: C.unloadEventStart,
				2128: C.unloadEventEnd,
				2109: C.redirectStart,
				2110: C.redirectEnd,
				2111: C.fetchStart,
				2112: C.domainLookupStart,
				2113: C.domainLookupEnd,
				2114: C.connectStart,
				2115: C.secureConnectionStart,
				2116: C.connectEnd,
				2117: C.requestStart,
				2119: C.responseStart,
				2120: C.responseEnd,
				2769: C.domLoading,
				2770: C.domInteractive,
				2123: C.domContentLoadedEventStart,
				2131: C.domContentLoadedEventEnd
			};
		Object.keys(e).forEach(function (n) {
			var i = e[n];
			i && t.push(n + "=" + (i - S))
		}), E("690.1033", t)
	}
	
	function r() {
		if (q && (Ya.isPrerender || !x.isVisibilityChanged())) {
			for (var t = w.getEntriesByType("paint"), e = 0; e < t.length; e++) {
				var n = t[e];
				if ("first-contentful-paint" === n.name) return void v("1926.2794", n.startTime)
			}
			if (i) try {
				new i(function (t, e) {
					r(), e.disconnect()
				}).observe({entryTypes: ["paint"]})
			} catch (t) {
			}
		}
	}
	
	function a() {
		x.sendTimeMark = v, x.sendResTiming = k, x.getTimeMarks = b;
		for (var t = x.__defRes; t.length;) {
			var n = t.shift();
			k(n[0], n[1])
		}
		for (var i = x.__defTimes; i.length;) {
			var o = i.shift();
			v(o[0], o[1])
		}
		for (var s = e.querySelectorAll("[data-rCid]"), r = 0, a = s.length; r < a; r++) {
			var u = s[r], c = "LINK" === u.tagName ? u.href : u.src;
			k(u.getAttribute("data-rCid"), c)
		}
	}
	
	function u() {
		if (i && (Ya.isPrerender || !x.isVisibilityChanged())) {
			var t = new i(function (t) {
				for (var e = t.getEntries(), n = 0; n < e.length; n++) {
					var i = e[n];
					X = i.renderTime || i.loadTime
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
		null != X && (v("largest-contentful-paint", X), X = null)
	}
	
	function l() {
		try {
			new i(function (t, e) {
				var n = t.getEntries()[0];
				if (n) {
					y("first-input", n.processingStart - n.startTime), e.disconnect()
				}
			}).observe({type: "first-input", buffered: !0})
		} catch (t) {
		}
	}
	
	function p() {
		if (i) {
			var t = new i(function (t) {
				var e = t.getEntries();
				null == K && (K = 0);
				for (var n = 0; n < e.length; n++) {
					var i = e[n];
					i.hadRecentInput || (K += i.value)
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
					h()
				}
			}), addEventListener("beforeunload", h)
		}
	}
	
	function h() {
		if (null != K) {
			var t = Math.round(1e6 * K) / 1e6;
			E("690.2096.4004", N.concat("s=" + t)), K = null
		}
	}
	
	function d() {
		if (i && (Ya.isPrerender || !x.isVisibilityChanged())) {
			for (var t = e.querySelectorAll('img,[data-rcid],[style*="background"]'), n = [], o = 0; o < t.length; o++) {
				var s = t[o];
				if (!("lazy" === s.loading || 1 === Ya.lazyImage && s.getAttribute("data-image-url"))) {
					var r;
					s.src ? r = s.src : (r = getComputedStyle(s).backgroundImage, 0 === r.indexOf("url(") && (r = r.slice(4, -1), '"' !== r[0] && "'" !== r[0] || (r = r.slice(1, -1)))), r && (0 === r.indexOf("data:") && (r = H), n.push({
						elem: s,
						url: r
					}))
				}
			}
			requestAnimationFrame(function () {
				var t = _(n);
				try {
					m(t)
				} catch (t) {
				}
			})
		}
	}
	
	function _(t) {
		for (var n = e.documentElement, i = n.clientWidth, o = n.clientHeight, s = [], r = 0; r < t.length; r++) {
			var a = t[r], u = a.elem.getBoundingClientRect();
			u.width < Y || u.height < Y || (u.bottom <= 0 || u.top >= o || u.right <= 0 || u.left >= i || s.push(a))
		}
		return s
	}
	
	function m(t) {
		if (t.length) {
			for (var n = e.createElement("link"), s = {}, r = 0; r < t.length; r++) {
				var a = t[r];
				a.url !== H ? (n.href = a.url, s[n.href] = !0) : V = !0
			}
			if (V && (M = D, T = D), 0 === (U = Object.keys(s).length)) return g("e0");
			var u, c = new i(function (t) {
				for (var e = t.getEntries(), n = 0; n < e.length; n++) {
					var i = e[n];
					if (s[i.name]) {
						var r = i.responseEnd;
						r || (W = !0, r = D + i.duration), (M === o || r < M) && (M = r), (T === o || r > T) && (T = r), ++z === U && (c.disconnect(), g("ok"), clearTimeout(u))
					}
				}
			});
			c.observe({type: "resource", buffered: !0}), u = setTimeout(function () {
				try {
					c.disconnect(), g("tm")
				} catch (t) {
				}
			}, j)
		}
	}
	
	function g(t) {
		E("690.2096.277", ["ft=" + M, "lt=" + T, "er=" + U, "fr=" + z, "t=" + (t || "unk"), V && "d=1", W && "u=1"])
	}
	
	function f() {
		for (; x.__rumListeners.length;) x.__rumListeners.shift()();
		x.onRumInited = function (t) {
			t()
		}
	}
	
	function v(t, e) {
		return e = Math.round(1e3 * (e || x.getTime())) / 1e3, E("690.2096.207", N.concat(["1701=" + t, "143.2129=" + S, "207=" + e])), R[t] = R[t] || [], R[t].push(e), e
	}
	
	function y(t, e) {
		var n = x.getTime(), i = n - e;
		E("690.2096.2877", N.concat(["1701=" + t, "207.2154=" + i, "207.1428=" + n, "2877=" + e]))
	}
	
	function b() {
		return R
	}
	
	function k(t, e) {
		function n() {
			var s = w.getEntriesByName(e);
			if (!s.length) return void (i++ < 10 && setTimeout(n, 300));
			var r = s[0], a = {
				1701: t,
				143: Ya.loadPageId,
				287: Ya.regionId,
				2323: r.transferSize,
				2136: r.duration,
				2322: r.startTime,
				2137: r.workerStart,
				2111: r.fetchStart,
				2112: r.domainLookupStart,
				2113: r.domainLookupEnd,
				2114: r.connectStart,
				2115: r.secureConnectionStart,
				2116: r.connectEnd,
				2117: r.requestStart,
				2119: r.responseStart,
				2120: r.responseEnd,
				2428: i,
				143.2129: S,
				143.2112: B,
				143.2119: I
			};
			E("690.2096.2044", Object.keys(a).map(function (t) {
				var e = a[t];
				if (e !== o) return "number" == typeof e && (e = Math.round(1e3 * e) / 1e3), t + "=" + e
			}))
		}
		
		if (q) {
			var i = 0;
			setTimeout(n, 0)
		}
	}
	
	function E(t, e) {
		x.send(Ya.clck, "/" + ["path=" + t, "vars=" + e.filter(Boolean).join(","), "*"].join("/"))
	}
	
	var w = t.performance, C = w && w.timing, S = C && C.navigationStart;
	if (S !== o) {
		var M, T, x = Ya.Rum, I = C.responseStart - S, B = C.domainLookupStart - S, D = C.responseEnd,
			P = w.navigation || {}, L = e.visibilityState, A = {visible: 1, hidden: 2, prerender: 3}[L],
			O = n.connection || {}, F = {
				bluetooth: 2064,
				cellular: 2065,
				ethernet: 2066,
				none: 1229,
				wifi: 2067,
				wimax: 2068,
				other: 861,
				unknown: 836
			}[O.type] || 2771,
			N = ["143=" + Ya.loadPageId, "287=" + Ya.regionId, P.type && "770.76=" + P.type, P.redirectCount && "1384.1385=" + P.redirectCount, "1484=" + (A ? A : 1), F && "2437=" + F, O.downlinkMax !== o && "2439=" + O.downlinkMax, O.effectiveType && "2870=" + O.effectiveType, O.rtt !== o && "rtt=" + O.rtt, O.downlink !== o && "dwl=" + O.downlink],
			q = "function" == typeof w.getEntriesByType, R = {}, Y = 10, j = 15e3, H = "data-uri", U = 0, z = 0, V = !1,
			W = !1;
		Ya.isPrerender && N.push("3105=1"), Ya.prerenderStatus && N.push("prerender.status=" + Ya.prerenderStatus), Ya.ready(function () {
			setTimeout(function () {
				s(), r(), u(), l(), p(), d(), a(), f()
			}, 0)
		});
		var X, K
	}
}(window, document, navigator, window.PerformanceObserver), window.MBEM = window.MBEM || {}, function () {
	var t = function (t) {
		this.type = t, this.propagationStopped = !1
	};
	t.prototype.stopPropagation = function () {
		this.propagationStopped = !0
	};
	var e = function () {
	};
	e.prototype.on = function (t, e, n) {
		if ("object" == typeof t) {
			for (var i in t) t.hasOwnProperty(i) && this.on(i, t[i], e);
			return this
		}
		var o = this._handlerStorage || (this._handlerStorage = {});
		return (o[t] || (o[t] = [])).push({fn: e, ctx: n}), this
	}, e.prototype.un = function (t, e) {
		for (var n = this._handlerStorage || (this._handlerStorage = {}), i = n[t] || (n[t] = []), o = 0; o < i.length; ++o) if (i[o].fn === e) return i.splice(o, 1), this;
		return this
	}, e.prototype.trigger = function (e, n) {
		for (var i, o = new t(e), s = this, r = this._handlerStorage || (this._handlerStorage = {}), a = r[e] || (r[e] = []), u = 0; u < a.length; ++u) {
			var c = a[u];
			if (i = c.fn.call(c.ctx || s, o, n), i === !1 && o.stopPropagation(), o.propagationStopped) break
		}
		return i
	}, MBEM.Observable = e
}(), MBEM.arrayFrom = function (t) {
	return Array.prototype.slice.call(t)
}, MBEM.closest = function (t, e) {
	for (var n = new RegExp("\\b" + e + "\\b"); t;) {
		if (n.test(t.className)) return t;
		t = t.parentNode
	}
}, function () {
	MBEM.cls = {
		list: function (t) {
			return t.split(/\s+/).filter(Boolean)
		}, contains: function (t, e) {
			return MBEM.cls.list(t.className).indexOf(e) > -1
		}, add: function (t, e) {
			var n = MBEM.cls.list(t.className);
			return n.indexOf(e) === -1 && n.push(e), t.className = n.join(" "), this
		}, remove: function (t, e) {
			var n = MBEM.cls.list(t.className), i = n.indexOf(e);
			return i > -1 && n.splice(i, 1), t.className = n.join(" "), this
		}, toggle: function (t, e, n) {
			return void 0 === n && (n = !MBEM.cls.contains(t, e)), MBEM.cls[n ? "add" : "remove"](t, e)
		}
	}
}(), MBEM.extend = function (t, e) {
	for (var n in e) if (e.hasOwnProperty(n)) {
		var i = e[n];
		i instanceof Array || i instanceof Date || "object" != typeof i || null === i ? t[n] = i : (t[n] = t[n] || {}, MBEM.extend(t[n], i))
	}
	return t
}, function () {
	var t = "__uniqMBEM" + Math.random().toString().substr(2, 5), e = MBEM.blocks = {};
	MBEM.prototype = Object.create(MBEM.Observable.prototype), MBEM.prototype.getDefaultParams = function () {
		return {}
	};
	var n = MBEM._propListeners = "__uniqMBEMListeners" + Math.random().toString().substr(2, 5);
	MBEM.prototype.bindTo = function (t, e, i) {
		return "function" == typeof e && (i = e, e = t, t = this.domElem), "string" == typeof t ? t = this.elem(t) : Array.isArray(t) || (t = [t]), e.split(" ").forEach(function (e) {
			t.forEach(function (t) {
				var o = i.bind(this);
				o.origHandler = i, t[n] || (t[n] = {}), t[n][e] || (t[n][e] = []), t[n][e].push(o), t.addEventListener(e, o, !1)
			}, this)
		}, this), this
	}, MBEM.prototype.elem = function (t, e, n) {
		var i = [], o = t.split(" ").map(function (t) {
			var o = this.__self.className(t, e, n);
			return MBEM.cls.contains(this.domElem, o) && i.push(this.domElem), "." + o
		}, this).join(",");
		return i.concat(MBEM.arrayFrom(this.domElem.querySelectorAll(o)))
	};
	var i = function () {
	};
	MBEM.override = function (t, e) {
		return "function" == typeof e && e.toString().indexOf("__base") > -1 ? (t = t || i, function () {
			var n = this.__base;
			this.__base = t;
			var i = e.apply(this, arguments);
			return this.__base = n, i
		}) : e
	}, MBEM.staticProto = {}, MBEM.staticProto.className = function (t, e, n) {
		var i = this._name;
		return t && (i += "__" + t), void 0 !== e && n !== !1 && (i += "_" + e + (n !== !0 && void 0 !== n ? "_" + n : "")), i
	}, MBEM.decl = function (t, n, i) {
		n = n || {};
		var o, s, r, a, u, c = !1;
		"object" == typeof t && t.baseBlock ? (c = !0, u = t.baseBlock, t = t.block) : u = t, u in e ? (s = e[u].prototype, o = r = e[u]) : (c = !0, s = MBEM.prototype, r = MBEM.staticProto), c && (s = Object.create(s), o = function (t) {
			this.__internalConstructor(t), this.__constructor(t), this.__afterConstructor(t)
		}, o.prototype = s, o.prototype.constructor = o, o.prototype.__self = o, o._name = t, e[t] = o);
		for (var l in n) n.hasOwnProperty(l) && (s[l] = MBEM.override(s[l], n[l]));
		for (a in r) i && i.hasOwnProperty(a) || o[a] || (o[a] = r[a]);
		if (i) for (a in i) i.hasOwnProperty(a) && (o[a] = MBEM.override(r[a], i[a]));
		return o
	}, MBEM.getBlock = function (e, n) {
		return e[t] && e[t][n]
	}, MBEM.consoleError = function () {
		if (window.console && window.console.error) try {
			window.console.error.apply(window.console, arguments)
		} catch (t) {
		}
	}, MBEM.prototype.__internalConstructor = function (e) {
		e = e || {}, this.domElem = e.node, this.params = MBEM.extend(this.getDefaultParams(), e.params || {}), e.node && ((e.node[t] || (e.node[t] = {}))[this.__self._name] = this)
	}, MBEM.prototype.__constructor = function () {
	}, MBEM.prototype.__afterConstructor = function () {
	}, MBEM.initBlockFromNode = function (t, e, n) {
		var i;
		return (i = MBEM.getBlock(t, e)) ? i : (n || (n = MBEM.getNodeParams(t)[e]), MBEM._createBlockFromNode({
			node: t,
			block: e,
			params: n
		}))
	}, MBEM.createBlock = function (t) {
		return e[t.block] ? new e[t.block](t) : void MBEM.consoleError("Block is not declared", t.block)
	}, MBEM._createBlockFromNode = MBEM.createBlock, MBEM.getNodeParams = function (t) {
		var e;
		try {
			e = JSON.parse(t.getAttribute("data-bem")) || {}
		} catch (e) {
			return void MBEM.consoleError("Incorrect params", t)
		}
		return e
	}
}(), Function.prototype.bind || (Function.prototype.bind = function (t) {
	var e = this;
	return function () {
		return e.apply(t, arguments)
	}
}), function () {
	var t = {};
	MBEM.channel = function (e) {
		if (void 0 !== e && t[e]) return t[e];
		var n = new MBEM.Observable;
		return void 0 !== e && (t[e] = n), n
	}
}(), function () {
	var t = function (t) {
		return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
	}, e = function (t) {
		return (/[/]{2}/.test(t) ? "" : "http://") + t
	};
	MBEM.decl("mini-suggest", {
		__constructor: function () {
			this.__base.apply(this, arguments);
			var t;
			this._input = t = this.elem("input")[0], this._val = t.value, this._popup = void 0, this._popupHasContent = !1, this._popupDelayTime = 0, this._popupTouchStartScroll = 0, this._focused = !1, this._freezeFocusDelayTime = 0, this._prevRequestText = null, this.bindTo("click", function (t) {
				MBEM.cls.contains(t.target, "mini-suggest__button") || this._input.focus()
			}), this.bindTo("submit", function (t) {
				this._onSubmit() === !1 && t.preventDefault()
			}), this.bindTo(t, "focus", this._onFocus), this.bindTo(t, "blur deactivate", this._onBlur), this.bindTo(t, "input", this._onValueChange), 9 === document.documentMode && this.bindTo(document, "selectionchange", function () {
				document.activeElement === this._input && this._onValueChange()
			}), this.bindTo("button", "click", function () {
				this.trigger("button-click")
			}), this.bindTo("touchstart mousedown", this._freezeFocus), this.bindTo("input-clear", "click MSPointerUp", this._onClearClick), this._updateInputVal(), this.bindTo(window, "orientationchange resize", function () {
				this._popupShown && this.repositionPopup()
			}), document.activeElement === this._input && this._onFocus()
		}, getDefaultParams: function () {
			return {popupOffset: 3}
		}, _moveCaretToEnd: function () {
			var t = this._val.length;
			try {
				if (void 0 !== this._input.createTextRange) {
					var e = this._input.createTextRange();
					e.collapse(!1), e.select()
				} else "number" == typeof this._input.selectionStart && (this._input.scrollLeft = 999999, this._input.setSelectionRange(t, t))
			} catch (t) {
			}
		}, _getCaretPosition: function () {
			var t, e = this._val.length;
			return document.selection ? (t = document.selection.createRange(), t.moveStart("character", -e), t.text.length) : "number" == typeof this._input.selectionStart ? this._input.selectionStart : e
		}, _freezeFocus: function () {
			this._freezeFocusDelayTime = Date.now() + 1e3
		}, _appendTpah: function (t) {
			this._input.value = t.getAttribute("data-tpah") + " ", this._updateInputVal(), this._moveCaretToEnd(), this._input.focus(), this._update(), this.trigger("input-change", {type: "tpah"})
		}, _processItemClick: function (t, e, n) {
			var i, o;
			if ("tpah" === e) this._appendTpah(t), this.trigger("item-tpah", {
				itemIndex: 0 | t.getAttribute("data-index"),
				val: t.getAttribute("data-tpah")
			}); else if ("fact" === e || "fulltext" === e) this._submitTime = Date.now(), this._input.value = this._val = n, this._updateInputVal(), this._moveCaretToEnd(), this.trigger("input-change", {type: "suggest-item"}), this.trigger("item-select", this._getItemEventProps(t, e, n)) !== !1 && this._onSubmit() !== !1 && this.domElem.submit(); else if ("nav" === e) return i = this.trigger("item-select", this._getItemEventProps(t, e, n)), i !== !1 && (o = t.getAttribute("data-safeclick")) && ((new Image).src = this.params.clickHost + o, this._addMetrikaCookie(t)), i === !1;
			return !0
		}, _getItemEventProps: function (t, e, n) {
			return {
				node: t,
				type: e,
				byKeyboard: !1,
				itemIndex: 0 | t.getAttribute("data-index"),
				val: "nav" === e ? this._val : n
			}
		}, _processPopupClick: function (t, e) {
			var n = MBEM.closest(t, "mini-suggest__item"), i = n && n.getAttribute("data-type"),
				o = n && n.getAttribute("data-text");
			return !n || ("click" === e || "nav" !== i) && this._processItemClick(n, i, o)
		}, _onPopupClick: function (t) {
			return MBEM.cls.contains(t.target, "mini-suggest__popup-spacer") ? (this._popupDelayTime = 0, this._freezeFocusDelayTime = 0, void this._outClick()) : this._popupDelayTime > Date.now() || this._popupDisableClicks ? (this._input.focus(), this._freezeFocus(), void t.preventDefault()) : void (this._processPopupClick(t.target, "click") ? t.preventDefault() : this._hidePopup())
		}, _getTouchCoords: function (t) {
			var e = t.touches && t.touches.length ? t.touches : t.changedTouches, n = e && e[0] || t;
			return {x: n.pageX || n.clientX || 0, y: n.pageY || n.clientY || 0}
		}, _onPopupTouchStart: function (t) {
			MBEM.cls.contains(t.target, "mini-suggest__popup-spacer") || (this._popupTouchStartCoords = this._getTouchCoords(t), "touchstart" === t.type && (this._popupTouchStarted = !0, this._popupDisableClicks = !1), this._freezeFocus())
		}, _onPopupTouchEnd: function (t) {
			if (!MBEM.cls.contains(t.target, "mini-suggest__popup-spacer")) {
				var e = this._getTouchCoords(t), n = e.x - this._popupTouchStartCoords.x,
					i = e.y - this._popupTouchStartCoords.y;
				if (n * n + i * i > 64) return void (this._freezeFocusDelayTime = 0);
				if (this._popupDelayTime > Date.now()) return void this._freezeFocus();
				this._freezeFocus(), this._processPopupClick(t.target, "touchend") && (t.preventDefault(), this._popupTouchStarted && (this._popupDisableClicks = !0))
			}
		}, _createPopup: function () {
			if (!this._popup) {
				var t = this._popup = document.createElement("div");
				t.className = "mini-suggest__popup mini-suggest__popup_hidden_yes mini-suggest__popup_svg_" + (this.__self._hasSvg() ? "yes" : "no"), this.bindTo(t, "click", this._onPopupClick), this.bindTo(t, "mousedown touchstart", this._onPopupTouchStart), this.bindTo(t, "touchend", this._onPopupTouchEnd);
				var e = this._popupContent = document.createElement("div");
				e.className = "mini-suggest__popup-content", t.appendChild(e);
				var n = document.createElement("div");
				n.className = "mini-suggest__popup-spacer", t.appendChild(n), document.body.appendChild(t)
			}
		}, _outClick: function () {
			if (this._popupDelayTime > Date.now() || this._freezeFocusDelayTime > Date.now()) return void this._input.focus();
			this._onBlur()
		}, _drawItem: function (t, e) {
			var n = t[0], i = {
				tag: "div",
				className: "mini-suggest__item mini-suggest__item_type_" + n,
				attrs: 'data-index="' + e + '" data-type="' + n + '"',
				content: ""
			};
			return i = this._buildItem(t, i), i.content ? "<" + i.tag + ' class="' + i.className + '" ' + i.attrs + ">" + i.content + "</" + i.tag + ">" : ""
		}, _buildItem: function (n, i) {
			var o, s, r, a, u = n[0], c = "nav" === u;
			return c || "fact" === u ? (o = c ? n[1] : n[2], s = n[3] || n[1], i.content = '<span class="mini-suggest__item-title">' + t(o) + '</span><span class="mini-suggest__item-info">' + t(s) + "</span>", c ? (i.tag = "a", i.attrs += ' href="' + e(n[4]) + '" target="_blank" rel="noopener"', (a = "object" == typeof n[5] && null !== n[5] ? n[5].counter : n[5]) && this.params.clickHost && (i.attrs += ' data-safeclick="' + t(a) + '"')) : i.attrs += ' data-text="' + t(s) + '"') : "tpah" === u ? (i.attrs += '  data-tpah="' + t(n[1]) + '"', r = n[1], n[3] && n[3].tpah && (r = r.substr(n[3].tpah[0])), i.content = t(r)) : "fulltext" === u && (i.attrs += ' data-text="' + t(n[1]) + '"', i.content = t(n[1])), i
		}, _processResponse: function (t) {
			var e, n = [];
			return this._createPopup(), t[2] && n.push.apply(n, t[2].map(function (t) {
				return ["tpah"].concat(t)
			})), !t[3] || "nav" !== t[3][0] && "fact" !== t[3][0] || n.push(t[3]), e = t[t.length - 1], e && e.suggestions && n.push.apply(n, e.suggestions.map(function (t) {
				return ["fulltext"].concat(t)
			})), n
		}, _drawPopup: function (t) {
			t.length ? (this._popupContent.innerHTML = this._getItemsHTML(t), this._popupHasContent = !0, this.trigger("popup-update", {items: t}), this._showPopup()) : (this._popupHasContent = !1, this._hidePopup())
		}, _getItemsHTML: function (t) {
			return t.map(this._drawItem, this).join("")
		}, _onSuggestData: function (t) {
			this._drawPopup(t)
		}, _update: function (t) {
			!t && (this._prevRequestText === this._val || this._submitTime && Date.now() - this._submitTime < 500) || (this._prevRequestText = this._val, this._request(this._val), this.trigger("request", {text: this._val}))
		}, _onSubmit: function () {
			this._freezeFocus();
			try {
				document.activeElement && document.activeElement.blur()
			} catch (t) {
			}
			return this.trigger("submit")
		}, _showPopup: function () {
			!this._popupShown && this._focused && (this._popupShown = !0, this.repositionPopup(), MBEM.cls.remove(this._popup, "mini-suggest__popup_hidden_yes"), this._popupDelayTime = Date.now() + 500, this.trigger("popup-show"))
		}, _hidePopup: function () {
			this._popupShown && (MBEM.cls.add(this._popup, "mini-suggest__popup_hidden_yes"), this._popupShown = !1, this.trigger("popup-hide"))
		}, repositionPopup: function () {
			this._popupShown && (this._popup.style.top = MBEM.offset(this._input).top + this._input.offsetHeight + this.params.popupOffset + "px")
		}, _onFocus: function () {
			this._focused || this._input.selectionStart === this._input.value.length && (this._input.scrollLeft = this._input.scrollWidth), MBEM.cls.add(document.body, "body_search_yes"), this._focused = !0, this._popupHasContent && this._showPopup(), this._fixScrollTop(), clearTimeout(this._blurTimeout), this._update()
		}, _fixScrollTop: function () {
			window.pageYOffset < 1 && (document.body.scrollTop = 0)
		}, _onBlur: function () {
			this._freezeFocusDelayTime > Date.now() || (this._focused = !1, this._hidePopup(), clearTimeout(this._blurTimeout), this._blurTimeout = setTimeout(this._afterBlur.bind(this), 300))
		}, _afterBlur: function () {
			MBEM.cls.remove(document.body, "body_search_yes")
		}, _onValueChange: function () {
			this._input.value !== this._val && (this._updateInputVal(), this._update(), this.trigger("input-change", {type: "user"}))
		}, _updateInputVal: function () {
			this._val = this._input.value, this._val || (this._popupHasContent = !1), MBEM.cls.toggle(this.domElem, this.__self.className("", "has-value", "yes"), !!this._val)
		}, _onClearClick: function () {
			this._freezeFocus(), this._input.focus(), this._input.value = "", this._updateInputVal(), this._update(), this.trigger("input-change", {type: "clear"})
		}, _appendHiddenInput: function (t, e) {
			var n = this.domElem.querySelector("input[name=" + t + "]");
			n || (n = document.createElement("input"), n.type = "hidden", n.name = t, this.domElem.appendChild(n)), n.value = e
		}, _addMetrikaCookie: function (t) {
			var e = this._val, n = this._reqID, i = t.href,
				o = [e, i, this._getNavSource(), n].map(encodeURIComponent).join(":"), s = Date.now();
			document.cookie = "sc_" + s + "=" + o + ";path=/watch;domain=." + (location.hostname.match(/yandex\..+$/) || [])[0] + ";expires=" + new Date(s + 6e5).toUTCString() + ";secure"
		}, _getNavSource: function () {
			return null
		}, _getMainUrlParams: function (t) {
			return {svg: this.__self._hasSvg() ? 1 : 0, part: t, pos: this._getCaretPosition()}
		}
	}, {
		_hasSvg: function () {
			return document.documentElement.className.indexOf("svg_yes") !== -1
		}, _encode: t
	})
}(), Date.now || (Date.now = function () {
	return (new Date).getTime()
}), MBEM.offset = function (t) {
	if (!t) return {top: 0, left: 0};
	var e = t.getBoundingClientRect(), n = document.documentElement.getBoundingClientRect();
	return {top: e.top - n.top, left: e.left - n.left}
}, MBEM.decl("mini-suggest", {
	__constructor: function () {
		this.params.counter && (this._renderTime = 0, this._isSendBeaconAvailable = "sendBeacon" in navigator && navigator.userAgent.indexOf("UCBrowser") === -1, this._clearCounters(), this.on("submit", this._handleSubmit, this).on("request", this._handleRequest, this).on("response", this._handleResponse, this).on("input-change", this._handleInputChange, this).on("popup-update", this._handlePopupUpdate, this).on("item-select", this._handleItemSelect, this).on("item-tpah", this._handleItemTpah, this).on("popup-show", this._handlePopupShow, this).on("button-click", this._handleButtonClick, this)), this.__base.apply(this, arguments)
	}, _handleSubmit: function () {
		("button_by_mouse" === this._path.submit || "keyboard" === this._path.submit && "keyboard" !== this._path.state) && this._addAction("submit"), this._sendCounters()
	}, _handleRequest: function () {
		++this._responses.rqs
	}, _handleResponse: function (t, e) {
		void 0 !== e.duration && (this._params.times += (this._params.times ? "." : "") + e.duration), this._renderTime = Date.now(), ++this._responses.rsp, e.items.length || ++this._responses.ersp, e.fromCache && ++this._responses.cchd
	}, _handlePopupUpdate: function (t, e) {
		this._params.render_times += (this._params.render_times ? "." : "") + (Date.now() - this._renderTime), ++this._responses.rndr;
		var n = e.items.some(function (t) {
			return t[3] && "Pers" === t[3].src
		});
		this._path.personal = n ? "nah_not_used" : "nah_not_shown"
	}, _handleItemSelect: function (t, e) {
		var n = e.node.getAttribute("data-log-type") || ("nav" === e.type ? "nav" : "phrase");
		e.personal && (this._path.personal = "nah_used"), this._addAction(n, e.itemIndex + 1), this._path.state = e.byKeyboard ? "keyboard" : "mouse", this._path.index = e.itemIndex + 1, this._selectedText = e.val, this._path.submit = e.byKeyboard ? "keyboard" : "click_by_mouse", "nav" === e.type && this._sendCounters()
	}, _handleItemTpah: function (t, e) {
		this._selectedText = e.val, this._path.state = "tpah", this._addAction("word", e.itemIndex + 1), ++this._responses.clks
	}, _handlePopupShow: function () {
		"not_shown" === this._path.state && (this._path.state = "not_used")
	}, _handleButtonClick: function () {
		"keyboard" !== this._path.submit && (this._path.submit = "button_by_mouse")
	}, _handleInputChange: function (t, e) {
		var n;
		"user" === e.type ? this._params.user_input.length < this._input.value.length ? this._addAction("add") : this._addAction("del") : "clear" === e.type && this._params.user_input.length && this._addAction("clear"), "user" === e.type || "clear" === e.type ? (n = this._calcInputChange(this._prevVal, this._input.value), "add" === n.type ? (this._params.user_input += (this._params.user_input && !this._changedByUser ? "!" : "") + n.text, this._userInputVal += n.text) : "del" === n.type ? this._userInputVal.substr(this._userInputVal.length - n.text.length) === n.text && (this._params.user_input = this._params.user_input.slice(0, this._params.user_input.length - n.text.length), this._userInputVal = this._userInputVal.slice(0, this._userInputVal.length - n.text.length)) : (this._params.user_input = n.text, this._userInputVal = n.text), this._changedByUser = !0) : this._changedByUser = !1, "user" !== e.type && "clear" !== e.type && "tpah" !== e.type || (this._firstChange = this._firstChange || Date.now(), this._lastChange = Date.now(), this._startInputTime || (this._startInputTime = this._firstChange)), this._selectedText && (this._path.state = "edit"), this._ratio.actionsCount++, this._prevVal = this._input.value
	}, _onFocus: function () {
		this.__base.apply(this, arguments), this._startInputTime = this._startInputTime || Date.now();
		var t = this._blurTime && Date.now() - this._blurTime;
		t && t > 300 && (this._blurDuration += t, this._blurTime = null, this._lastChange && (this._blurDurationLastChange += t), this._firstChange && (this._blurDurationFirstChange += t))
	}, _onBlur: function () {
		this.__base.apply(this, arguments), this._blurTime = Date.now()
	}, _sendCounters: function () {
		this._params.text = this._input.value,
			this._params.pos = this._getCaretPosition(), this._attachReqID();
		var t = this._getUrl();
		this._clearCounters(), this._sendStatUrl(t)
	}, _sendStatUrl: function (t) {
		if (t += (t.indexOf("?") > -1 ? "&" : "?") + "_=" + Date.now(), this._isSendBeaconAvailable) {
			if (navigator.sendBeacon(t, " ")) return
		}
		var e = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
		e.open("get", t, !0), e.withCredentials = !0, e.send()
	}, _clearCounters: function () {
		this._params = {
			user_input: "",
			text: "",
			exprt: "",
			log: "",
			region: "",
			times: "",
			render_times: ""
		}, this._path = {
			service: this.params.counter.service,
			state: "not_shown",
			index: 0,
			personal: "nah_not_shown",
			submit: "button_by_mouse"
		}, this._ratio = {
			len: 0,
			queryLen: 0,
			actionsCount: 0
		}, this._firstChange = 0, this._lastChange = 0, this._sinceChange = {
			first: 0,
			last: 0
		}, this._startInputTime = null, this._selectedText = "", this._reqID = this.__self._generateReqID(this.params.counter.yandexuid), this._tpah = [], this._firstActionTime = 0, this._prevVal = "", this._userInputVal = "", this._changedByUser = !0, this._responses = {
			rqs: 0,
			rsp: 0,
			rndr: 0,
			ersp: 0,
			clks: 0,
			cchd: 0
		}, this._blurDuration = 0, this._blurTime = null, this._blurDurationFirstChange = 0, this._blurDurationLastChange = 0
	}, _addAction: function (t, e) {
		var n;
		this._firstActionTime ? n = Date.now() - this._firstActionTime : (this._firstActionTime = Date.now(), n = 0);
		var i = {action: t, time: n};
		void 0 !== e && (i.index = e), this._tpah.push(i)
	}, _attachReqID: function () {
		this._appendHiddenInput("suggest_reqid", this._reqID)
	}, _getUrl: function () {
		return this.params.counter.url + "/" + this._getUrlParams().join("/").replace(/(\/+)/g, "/")
	}, _getParamsList: function () {
		return [this.params.counter.params, this._getPath(), this._params, this._getRatio(), this._getSinceChange(), this._getSession(), this._getResponsesShows(), {suggest_reqid: this._reqID}, this._getTpah()]
	}, _getPath: function () {
		return {path: [this._path.service, this._path.state, "p" + this._path.index, this._path.personal, this._path.submit].join(".")}
	}, _getRatio: function () {
		return {ratio: [this._userInputVal.length, this._params.text.length, this._ratio.actionsCount].join(".")}
	}, _getSinceChange: function () {
		return {
			since_first_change: this._getSinceTime("first"),
			since_last_change: this._getSinceTime("last"),
			total_input_time: this._getTotalInputTime()
		}
	}, _getSinceTime: function (t) {
		var e = "_" + t + "Change";
		if (!this[e]) return 0;
		var n = "first" === t ? this._blurDurationFirstChange : this._blurDurationLastChange;
		return Date.now() - this[e] - n
	}, _getTotalInputTime: function () {
		return this._startInputTime && Date.now() - this._startInputTime - this._blurDuration || 0
	}, _getSession: function () {
		return {session: Date.now() + Math.round(1e4 * Math.random())}
	}, _getResponsesShows: function () {
		return this._responses
	}, _getTpah: function () {
		return {
			tpah_log: "[" + this._tpah.map(function (t) {
				return "[" + [t.action, "p" + (t.index || 0), t.time].join(",") + "]"
			}).join(",") + "]"
		}
	}, _getUrlParams: function () {
		return this._getParamsList().concat({"*data": "url=http://ya.ru"}).reduce(function (t, e) {
			return t.concat(this._getParams(e))
		}.bind(this), []).concat(["/"])
	}, _getParams: function (t) {
		return Object.keys(t).reduce(function (e, n) {
			return "" === t[n] ? e : (e.push(n + "=" + encodeURIComponent(t[n]).replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%2C/g, ",")), e)
		}, [])
	}, _calcInputChange: function (t, e) {
		return e.length > t.length && 0 === e.indexOf(t) ? {
			type: "add",
			text: e.substr(t.length)
		} : e.length < t.length && 0 === t.indexOf(e) ? {type: "del", text: t.substr(e.length)} : {
			type: "other",
			text: e
		}
	}, _getMainUrlParams: function () {
		var t = this.__base.apply(this, arguments);
		return this._reqID && (t.suggest_reqid = this._reqID), t
	}
}, {
	_generateReqID: function (t) {
		return (t = t || this._random(9) + this._random(9)) + Date.now().toString().slice(-7) + this._random(7)
	}, _random: function (t) {
		return Math.random().toString().slice(2, Math.min(t, 10) + 2)
	}
}), MBEM.channel("suggest").on("init", function () {
	Ya.Rum.sendTimeMark("2295"), Ya.isBemInited = 1
}), MBEM.decl("mini-suggest", {
	__constructor: function () {
		this.__base.apply(this, arguments), this._cachedUrls = {}
	}, _initDataCallback: function () {
		return this._callbackName ? this._callbackName : (this._callbackName = "onSuggestResponse" + Math.random().toString().substr(2, 5), this._callbackStorage = {}, window[this._callbackName] = function (t) {
			var e = this._processResponse(t), n = "string" == typeof t[0] && this._callbackStorage[t[0]],
				i = n && n.url, o = Date.now();
			this.trigger("response", {
				data: t,
				items: e,
				url: i,
				duration: n && o - n.start,
				fromCache: this._cachedUrls[i] && o - this._cachedUrls[i] < 6e4
			}), i && (this._cachedUrls[i] = o), "string" == typeof t[0] && t[0].toLowerCase() === this._prevRequestText.toLowerCase() && this._onSuggestData(e)
		}.bind(this), this._callbackName)
	}, _request: function (t) {
		var e, n, i = document.createElement("script"), o = this._initDataCallback();
		n = this._getMainUrlParams(t), n.callback = o, e = MBEM.appendUrlParams(this.params.url, n), this._callbackStorage[t.toLowerCase()] = {
			start: Date.now(),
			url: e
		}, i.src = e, i.onload = i.onerror = function () {
			i.parentNode.removeChild(i)
		}, document.head.appendChild(i)
	}
}), MBEM.appendUrlParams = function (t, e) {
	return t + (t.indexOf("?") > -1 ? "&" : "?") + Object.keys(e).map(function (t) {
		return t + "=" + encodeURIComponent(e[t])
	}).join("&")
}, Ya.ready(function () {
	var t = document.forms[0], e = t.text, n = t.elements[t.elements.length - 2], i = t.elements[t.elements.length - 1],
		o = {
			url: t.getAttribute("data-suggest-url"),
			yandexuid: Ya.ymUid,
			counter: {
				service: "granny-touch",
				url: "//yandex." + (t.getAttribute("tld") || "ru") + "/clck/jclck",
				timeout: 300,
				params: {dtype: "stred", pid: "0", cid: "2873"}
			},
			popupOffset: 11
		};
	t.className += " mini-suggest", e.className += " mini-suggest__input", e.setAttribute("autocomplete", "off"), e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", "false"), e.setAttribute("aria-autocomplete", "list"), n.className += " mini-suggest__input-clear", i.className += " mini-suggest__button", document.getElementsByTagName("TABLE")[0].className += " yandex-search__layout-table", MBEM.initBlockFromNode(t, "mini-suggest", o), MBEM.channel("suggest").trigger("init"), window.onpageshow = function (n) {
		n.persisted && (e.value = e.getAttribute("value"), MBEM.getBlock(t, "mini-suggest")._onBlur())
	}
}), function (t) {
	var e = ".mini-suggest__popup{position:absolute;z-index:2;left:0;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mini-suggest__popup_hidden_yes{display:none}.mini-suggest__popup-content{padding:10px 13px 0}.mini-suggest__popup-spacer{position:absolute;top:100%;left:0;width:100%;height:325px}.mini-suggest__item{position:relative;-webkit-transition:background-color .15s linear;transition:background-color .15s linear}.mini-suggest__item_type_tpah{display:inline-block;overflow:hidden;box-sizing:border-box;max-width:100%;margin:0 8px 8px 0;padding:0 14px;line-height:34px;vertical-align:top;white-space:nowrap;text-overflow:ellipsis;border-radius:4px;background:#f2f2f2}.mini-suggest__item_type_tpah:active{background:#ccc}.mini-suggest__item_type_fulltext{overflow:hidden;margin:0 -13px;padding:9px 13px 12px;line-height:20px;text-overflow:ellipsis}.mini-suggest__item_type_fulltext:first-child{margin-top:-9px}.mini-suggest__item_type_fact,.mini-suggest__item_type_nav{display:block;margin:0 -13px;padding:10px 13px;text-decoration:none;outline:0;-webkit-tap-highlight-color:transparent}.mini-suggest__item-info,.mini-suggest__item-title{font-size:15px;line-height:20px}.mini-suggest__item-title{display:block;font-weight:700;color:#000}.mini-suggest__item_type_nav .mini-suggest__item-title{color:#04b}.mini-suggest__item-info{display:inline-block;margin-top:2px;color:#999}.mini-suggest__item_type_nav .mini-suggest__item-info{color:#070}.mini-suggest__item_type_fact:active,.mini-suggest__item_type_fulltext:active,.mini-suggest__item_type_nav:active{background:#f0f0f0}.mini-suggest__item-info,.mini-suggest__item-title{pointer-events:none}.mini-suggest__popup{font:15px/15px 'Helvetica Neue',Roboto,'Segoe UI',Arial,Helvetica,sans-serif;word-wrap:normal;border-bottom:1px solid rgba(0,0,0,.1);-webkit-tap-highlight-color:transparent}.mini-suggest__popup:after,.mini-suggest__popup:before{position:absolute;z-index:-1;left:0;width:100%;content:''}.mini-suggest__popup:before{bottom:-1px;border-radius:.1px;-webkit-box-shadow:0 8px 25px -5px rgba(0,0,0,.25);box-shadow:0 8px 25px -5px rgba(0,0,0,.25);height:50%}.mini-suggest__popup:after{top:0;height:100%;background:#fff;display:none}:not(.mini-suggest__item_type_fulltext)+.mini-suggest__item_type_fulltext{padding-top:12px}:not(.mini-suggest__item_type_nav)+.mini-suggest__item_type_nav{margin-top:2px;padding-top:10px}:not(.mini-suggest__item_type_fact)+.mini-suggest__item_type_fact{padding-top:10px}.mini-suggest__item_type_tpah+.mini-suggest__item_type_fact,.mini-suggest__item_type_tpah+.mini-suggest__item_type_fulltext,.mini-suggest__item_type_tpah+.mini-suggest__item_type_nav{margin-top:2px}:not(.mini-suggest__item_type_fact)+.mini-suggest__item_type_fact:before,:not(.mini-suggest__item_type_fulltext)+.mini-suggest__item_type_fulltext:before,:not(.mini-suggest__item_type_nav)+.mini-suggest__item_type_nav:before{position:absolute;top:0;right:13px;left:13px;height:1px;content:'';background:#f0f0f0}.mini-suggest__popup-content{background:#fff}",
		n = t.createElement("style");
	t.body.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(t.createTextNode(e))
}(document), 1 === Ya.lazyImage && Ya.ready(function () {
	setTimeout(function () {
		var t, e;
		for (t = 0, e = document.querySelectorAll(".image[data-image-url]"); t < e.length; t++) e[t].src = e[t].getAttribute("data-image-url"), e[t].removeAttribute("data-image-url");
		for (t = 0, e = document.querySelectorAll(".image[data-bg-url]"); t < e.length; t++) e[t].style.backgroundImage = "url(" + e[t].getAttribute("data-bg-url") + ")", e[t].removeAttribute("data-bg-url")
	}, 0)
});
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
	deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
	deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
	deviceIsIOSWithTargetBlankBug = deviceIsIOS && /OS (7|8)_\d/.test(navigator.userAgent),
	deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
	deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function (t) {
	"use strict";
	switch (t.nodeName.toLowerCase()) {
		case"a":
			if (deviceIsIOSWithTargetBlankBug && "_blank" === t.target) return !0;
			break;
		case"button":
		case"select":
		case"textarea":
			if (t.disabled) return !0;
			break;
		case"input":
			if (deviceIsIOS && "file" === t.type || deviceIsAndroid && "checkbox" === t.type || t.disabled) return !0;
			break;
		case"label":
		case"video":
			return !0
	}
	return /\bneedsclick\b/.test(t.className)
}, FastClick.prototype.needsFocus = function (t) {
	"use strict";
	switch (t.nodeName.toLowerCase()) {
		case"textarea":
			return !0;
		case"select":
			return !deviceIsAndroid;
		case"input":
			switch (t.type) {
				case"button":
				case"checkbox":
				case"file":
				case"image":
				case"radio":
				case"submit":
					return !1
			}
			return !t.disabled && !t.readOnly;
		default:
			return /\bneedsfocus\b/.test(t.className)
	}
}, FastClick.prototype.sendClick = function (t, e) {
	"use strict";
	var n, i, o;
	document.activeElement && document.activeElement !== t && document.activeElement.blur(), i = e.changedTouches[0], o = document.createEvent("MouseEvents"), o.initMouseEvent("mousedown", !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), o.forwardedTouchEvent = !0, t.dispatchEvent(o), n = document.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
}, FastClick.prototype.focus = function (t) {
	"use strict";
	var e;
	deviceIsIOS && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
}, FastClick.prototype.updateScrollParent = function (t) {
	"use strict";
	var e, n;
	if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
		n = t;
		do {
			if (n.scrollHeight > n.offsetHeight) {
				e = n, t.fastClickScrollParent = n;
				break
			}
			n = n.parentElement
		} while (n)
	}
	e && (e.fastClickLastScrollTop = e.scrollTop)
}, FastClick.prototype.getTargetElementFromEventTarget = function (t) {
	"use strict";
	return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
}, FastClick.prototype.onTouchStart = function (t) {
	"use strict";
	var e, n, i;
	if (t.targetTouches.length > 1) return !0;
	if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], deviceIsIOS) {
		if (i = window.getSelection(), i.rangeCount && !i.isCollapsed) return !0;
		if (!deviceIsIOS4) {
			if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
			this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
		}
	}
	return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
}, FastClick.prototype.touchHasMoved = function (t) {
	"use strict";
	var e = t.changedTouches[0], n = this.touchBoundary;
	return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
}, FastClick.prototype.onTouchMove = function (t) {
	"use strict";
	return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
}, FastClick.prototype.findControl = function (t) {
	"use strict";
	return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
}, FastClick.prototype.onTouchEnd = function (t) {
	"use strict";
	var e, n, i, o, s, r = this.targetElement;
	if (!this.trackingClick || t.defaultPrevented) return this.targetElement = null, this.trackingClick = !1, !0;
	if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
	if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (s = t.changedTouches[0], r = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset) || r, r.fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (i = r.tagName.toLowerCase())) {
		if (e = this.findControl(r)) {
			if (this.focus(r), deviceIsAndroid) return !1;
			r = e
		}
	} else if (this.needsFocus(r)) return t.timeStamp - n > 100 || deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, t), deviceIsIOS && "select" === i || (this.targetElement = null, t.preventDefault()), !1);
	return !(!deviceIsIOS || deviceIsIOS4 || !(o = r.fastClickScrollParent) || o.fastClickLastScrollTop === o.scrollTop) || (this.needsClick(r) || (t.preventDefault(), this.sendClick(r, t)), !1)
}, FastClick.prototype.onTouchCancel = function () {
	"use strict";
	this.trackingClick = !1, this.targetElement = null
}, FastClick.prototype.onMouse = function (t) {
	"use strict";
	return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
}, FastClick.prototype.onClick = function (t) {
	"use strict";
	var e;
	return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t), e || (this.targetElement = null), e)
}, FastClick.prototype.destroy = function () {
	"use strict";
	var t = this.layer;
	deviceIsAndroid && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
}, FastClick.notNeeded = function (t) {
	"use strict";
	var e, n, i;
	if (void 0 === window.ontouchstart) return !0;
	if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
		if (!deviceIsAndroid) return !0;
		if (e = document.querySelector("meta[name=viewport]")) {
			if (e.content.indexOf("user-scalable=no") !== -1) return !0;
			if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
		}
	}
	if (deviceIsBlackBerry10 && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
		if (e.content.indexOf("user-scalable=no") !== -1) return !0;
		if (document.documentElement.scrollWidth <= window.outerWidth) return !0
	}
	return "none" === t.style.msTouchAction || !!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [0, 0])[1] >= 27 && (e = document.querySelector("meta[name=viewport]")) && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))
}, FastClick.attach = function (t, e) {
	"use strict";
	return new FastClick(t, e)
}, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
	"use strict";
	return FastClick
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick, "complete" === document.readyState ? init() : document.addEventListener("DOMContentLoaded", init);
