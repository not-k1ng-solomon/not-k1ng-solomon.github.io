﻿(function () {
	try {
		(function (Jc) {
			function Hi(a) {
				return a.replace(Ii, function (b, c, d, e) {
					return "" + c + e
				})
			}
			
			function Kc(a, b) {
				if (!b) return !1;
				var c = M(a);
				return (new RegExp(b)).test("" + c.pathname + c.hash + c.search)
			}
			
			function Ji(a, b) {
				return Da(a, b, function (c) {
					var d = n(c, "settings.dr");
					return {rc: Ki(a, d), isEnabled: n(c, "settings.auto_goals")}
				})
			}
			
			function Li(a, b) {
				function c() {
					var m = l + "0", p = l + "1";
					h[m] ? h[p] ? (l = l.slice(0, -1), --k) : (g[p] = e(8), h[p] = 1) : (g[m] = e(8), h[m] = 1)
				}
				
				function d() {
					var m = l + "1";
					h[l + "0"] ? h[m] ? (l = l.slice(0, -1), --k) : (l += "1",
						h[l] = 1) : (l += "0", h[l] = 1)
				}
				
				function e(m) {
					void 0 === m && (m = 1);
					var p = f.slice(k, k + m);
					k += m;
					return p
				}
				
				for (var f = Ye(a, b, ""), g = {}, h = {}, k = 1, l = ""; k < f.length - 1;) ("0" === e() ? d : c)();
				return g
			}
			
			function Mi(a, b, c, d, e) {
				c = Dd(a, a.document.body, c);
				d = Dd(a, a.document.body, d);
				N(e.target, [c, d]) && Ed(a, b)
			}
			
			function Ze(a, b, c, d) {
				(c = Ni(a, d, c)) && Ed(a, b, c)
			}
			
			function $e(a, b) {
				var c = af(a, b);
				return Oi(a, c)
			}
			
			function af(a, b) {
				var c = Dd(a, a.document.body, b);
				return c ? Pi(a, c) : ""
			}
			
			function Ed(a, b, c) {
				(b = Ea(a, b)) && b.params(cc(["__ym", "dr", c || q(bf, Qi)(a)]))
			}
			
			function Dd(a, b, c) {
				var d = null;
				try {
					if (c) {
						var e = Fd(c, a, b);
						var f = e && e.length ? e[0] : null
					} else f = d;
					d = f
				} catch (g) {
				}
				return d
			}
			
			function Ye(a, b, c) {
				try {
					var d = xa(a.atob(b));
					return I(function (e) {
						e = e.charCodeAt(0).toString(2);
						return cf("0", 8 - e.length) + e
					}, d).join(c)
				} catch (e) {
					return ""
				}
			}
			
			function bf(a) {
				return Ta(a, 10, 99)
			}
			
			function Pi(a, b) {
				if (!b) return "";
				var c = [], d = n(a, "document");
				df(a, b, function (e) {
					e.nodeType === d.TEXT_NODE && e.textContent ? c.push(e.textContent.trim()) : e instanceof HTMLImageElement && e.alt && c.push(e.alt.trim())
				});
				return 0 === c.length ? "" : c.join(" ")
			}
			
			function Ri(a, b, c) {
				var d;
				a = ef(a, b);
				return (d = {}, d.mf = "https://adstat.yandex.ru/track?service=metrika&id=" + a, d.rt = "https://" + a + ".mc.yandex.ru/watch/3/1", d)[c]
			}
			
			function Si(a, b, c, d) {
				d = n(d, "target");
				(d = Lc("button,input", a, d)) && "submit" === d.type && (d = ff(a, d)) && (c.push(d), pa(a, G([!1, a, b, c, d], gf), 300))
			}
			
			function gf(a, b, c, d, e) {
				var f = ub(b)(e, d), g = -1 !== f;
				if (a || g) g && d.splice(f, 1), a = hf(b, e), a = "?" + dc(a), d = G([b, c, "Form goal. Counter " + c.id + ". Form: " + a + "."], jf), Gd(b, c, "form", d)(a)
			}
			
			function jf(a, b, c) {
				return Ti(a, b).then(function (d) {
					d && lb(a, b, c)()
				})
			}
			
			function Ui(a) {
				a = Vi(a);
				return Ia(a) ? B("x", a) : a
			}
			
			function Wi(a) {
				return B("x", Xi(a) || [])
			}
			
			function Xi(a) {
				var b = n(a, "speechSynthesis.getVoices");
				if (!b) return "";
				a = E(b, a.speechSynthesis);
				return vb(function (c) {
					return I(v(c, n), Yi)
				}, a())
			}
			
			function Zi(a) {
				if (a = $i(a)) try {
					for (var b = [], c = 0; c < kf.length; c += 1) {
						var d = a(kf[c]);
						b.push(d)
					}
					var e = b
				} catch (f) {
					e = []
				} else e = [];
				return e ? B("x", e) : ""
			}
			
			function aj(a) {
				var b = bj(a);
				return b ? B("x", I(function (c) {
					c = b[c];
					return B("x", I(q(K, ca("concat", ""), v(c, n)), ["matches", "media"]))
				}, ya(b))) : ""
			}
			
			function cj(a, b) {
				var c = b.kc;
				if (!dj(a, c)) return "";
				var d = [];
				var e = ej(a, c);
				if (null != e) try {
					var f = e.toDataURL()
				} catch (H) {
					f = ""
				} else f = "";
				(e = f) && d.push(e);
				var g = c.getContextAttributes();
				try {
					var h = qa(c.getSupportedExtensions, "getSupportedExtensions") ? c.getSupportedExtensions() || [] : []
				} catch (H) {
					h = []
				}
				h = B(";", h);
				e = Hd(c.getParameter(c.ALIASED_LINE_WIDTH_RANGE), c);
				f = Hd(c.getParameter(c.ALIASED_POINT_SIZE_RANGE), c);
				var k = c.getParameter(c.ALPHA_BITS);
				g = g && g.antialias ? "yes" : "no";
				var l = c.getParameter(c.BLUE_BITS), m = c.getParameter(c.DEPTH_BITS), p = c.getParameter(c.GREEN_BITS),
					u = c.getExtension("EXT_texture_filter_anisotropic") || c.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || c.getExtension("MOZ_EXT_texture_filter_anisotropic");
				if (u) {
					var r = c.getParameter(u.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
					0 === r && (r = 2)
				}
				r = {
					sd: h,
					"webgl aliased line width range": e,
					"webgl aliased point size range": f,
					"webgl alpha bits": k,
					"webgl antialiasing": g,
					"webgl blue bits": l,
					"webgl depth bits": m,
					"webgl green bits": p,
					"webgl max anisotropy": u ? r : null,
					"webgl max combined texture image units": c.getParameter(c.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
					"webgl max cube map texture size": c.getParameter(c.MAX_CUBE_MAP_TEXTURE_SIZE),
					"webgl max fragment uniform vectors": c.getParameter(c.MAX_FRAGMENT_UNIFORM_VECTORS),
					"webgl max render buffer size": c.getParameter(c.MAX_RENDERBUFFER_SIZE),
					"webgl max texture image units": c.getParameter(c.MAX_TEXTURE_IMAGE_UNITS),
					"webgl max texture size": c.getParameter(c.MAX_TEXTURE_SIZE),
					"webgl max varying vectors": c.getParameter(c.MAX_VARYING_VECTORS),
					"webgl max vertex attribs": c.getParameter(c.MAX_VERTEX_ATTRIBS),
					"webgl max vertex texture image units": c.getParameter(c.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
					"webgl max vertex uniform vectors": c.getParameter(c.MAX_VERTEX_UNIFORM_VECTORS),
					"webgl max viewport dims": Hd(c.getParameter(c.MAX_VIEWPORT_DIMS), c),
					"webgl red bits": c.getParameter(c.RED_BITS),
					"webgl renderer": c.getParameter(c.RENDERER),
					"webgl shading language version": c.getParameter(c.SHADING_LANGUAGE_VERSION),
					"webgl stencil bits": c.getParameter(c.STENCIL_BITS),
					"webgl vendor": c.getParameter(c.VENDOR),
					"webgl version": c.getParameter(c.VERSION)
				};
				Id(d, r, ": ");
				a:{
					try {
						var w = c.getExtension("WEBGL_debug_renderer_info");
						if (w) {
							var y = {
								"webgl unmasked vendor": c.getParameter(w.UNMASKED_VENDOR_WEBGL),
								"webgl unmasked renderer": c.getParameter(w.UNMASKED_RENDERER_WEBGL)
							};
							break a
						}
					} catch (H) {
					}
					y = {}
				}
				Id(d, y);
				if (!c.getShaderPrecisionFormat) return B("~", d);
				Id(d, fj(c));
				return B("~", d)
			}
			
			function Id(a, b, c) {
				void 0 === c && (c = ":");
				D(function (d) {
					return a.push("" +
						d[0] + c + d[1])
				}, Na(b))
			}
			
			function gj(a) {
				var b = hj(a);
				return b ? S(function (c, d, e) {
					d = "" + (e + 1);
					var f = b.supportsVersion;
					return O(f) ? f.call(b, e + 1) ? c + d : c + "0" : c
				}, "", ij(19)) + b.canMakePayments() : ""
			}
			
			function hj(a) {
				var b = n(a, "ApplePaySession"), c = M(a).protocol;
				return !b || "https:" !== c || Hb(a) ? "" : b
			}
			
			function jj(a) {
				var b = a.o, c = cb(a.N);
				if (c) {
					var d = Math.random();
					a = {x: c.scrollLeft, y: c.scrollTop};
					if (c.Ta) {
						if (d = Jd[c.Ta], !d || 10 > Math.abs(a.x - d.x) && 10 > Math.abs(a.y - d.y)) return
					} else {
						for (; Jd[d];) d = Math.random();
						c.Ta = d
					}
					Jd[c.Ta] = a;
					if (c !==
						b.document) {
						d = db(b, c);
						b = ta(b);
						var e = [];
						c = c[ma];
						!c || 0 > c ? a = [] : (ua(e, 16), z(e, b), z(e, a.x), z(e, a.y), z(e, c), a = e);
						a = P(d, a)
					} else a = [];
					return a
				}
			}
			
			function lf(a) {
				var b = a.o, c = a.N;
				mf(a);
				if (c.touches && c.touches.length) {
					var d = cb(c);
					if (d && d !== b.document) return P(db(b, d), vb(function (e) {
						return nf(b, ta(b), "touch", d, [e.pageX, e.pageY], 0, 0)
					}, xa(c.touches)))
				}
			}
			
			function kj(a) {
				var b = a.o;
				a = ta(b);
				var c = Kd(b), d = of(b);
				b = [];
				var e = c[0];
				c = c[1];
				var f = d[0];
				d = d[1];
				ua(b, 28);
				z(b, a);
				z(b, e);
				z(b, c);
				z(b, f);
				z(b, d);
				return b
			}
			
			function pf(a) {
				var b =
					[];
				return Fa(a.o, b, 13) ? [] : b
			}
			
			function lj(a) {
				var b = a.o;
				a = a.N;
				var c = cb(a);
				if (c) {
					var d;
					"wheel" === a.type ? d = 0 < a.deltaY ? 1 : 0 > a.deltaY ? 2 : 0 : "mousewheel" === a.type && a.wheelDelta && (d = 0 < a.wheelDelta ? 2 : 0 > a.wheelDelta ? 1 : 0);
					if (d) {
						var e = Mc(b, a);
						a = db(b, c);
						b = ta(b);
						e = [e.x, e.y];
						c = c[ma];
						if (!c || 0 > c) c = []; else {
							var f = [];
							ua(f, 31);
							z(f, b);
							z(f, c);
							z(f, e[0]);
							z(f, e[1]);
							ua(f, 0);
							ua(f, 0);
							ua(f, d);
							c = f
						}
						return P(a, c)
					}
				}
			}
			
			function mf(a) {
				var b = a.o;
				a = Ld(b);
				var c = W(b)(U);
				if (!(10 > c - qf || 10 > Math.abs(a.x - Md.x) && 10 > Math.abs(a.y - Md.y))) return qf = c,
					Md = a, b = ta(b), c = [], ua(c, 3), z(c, b), z(c, a.x), z(c, a.y), c
			}
			
			function mj(a) {
				var b = a.o, c = a.N, d = W(b)(U), e = d - rf;
				if (!(10 > e)) {
					b = Mc(b, c);
					c = Nd.x - b.x;
					var f = Nd.y - b.y;
					c = c * c + f * f;
					if (!(0 >= c || 16 > c && 100 > e || 20 > e && 256 > c)) return rf = d, Nd = b, ec(a)
				}
			}
			
			function nj(a, b) {
				var c = a.document;
				if (N(c.readyState, ["interactive", "complete"])) Ib(a, b); else {
					var d = ja(a), e = d.C, f = d.Ha, g = function () {
						f(c, ["DOMContentLoaded"], g);
						f(a, ["load"], g);
						b()
					};
					e(c, ["DOMContentLoaded"], g);
					e(a, ["load"], g)
				}
			}
			
			function oj(a, b) {
				var c = pj(a), d = da(a, "r", b), e = x(a, "rts.p");
				return Da(a, b, E(S, null, function (f, g) {
					var h = {id: g.mc, M: g.M};
					h = d({K: g.Pc, F: ha(g.jc), D: g.H, oa: g.oa}, h, g.Rc)["catch"](e);
					return f.then(v(h, K))
				}, J.resolve(""), c))["catch"](e)
			}
			
			function sf(a, b, c) {
				b = fc(a, void 0, b);
				b = tf(a, b.b("phc_settings") || "");
				var d = n(b, "clientId"), e = n(b, "orderId"), f = n(b, "service_id"), g = n(b, "phones") || [];
				return d && e && g ? qj(a, c.qb, {Tb: rj}).Ib(g).then(function (h) {
					return sj(c, {ga: d, ia: e, Pb: f}, h.O, g, h.T)
				})["catch"](function () {
				}) : J.resolve()
			}
			
			function rj(a, b, c) {
				a = tj(c.Ca);
				if ("href" === c.Xa) {
					var d =
						c.da;
					b = d.href;
					c = b.replace(a, c.$);
					if (b !== c) return d.href = c, !0
				} else if ((a = null === (d = c.da.textContent) || void 0 === d ? void 0 : d.replace(a, c.$)) && a !== c.da.textContent) return c.da.textContent = a, !0;
				return !1
			}
			
			function sj(a, b, c, d, e) {
				var f;
				b.ga && b.ia && (b.ga === a.ga && b.ia === a.ia || F(a, b, {
					O: {},
					Pa: !0
				}), 0 < e && Ja(a.T, [e]), D(function (g) {
					var h, k, l = g[0];
					g = g[1];
					var m = +(a.O[l] && a.O[l][g] ? a.O[l][g] : 0);
					F(a.O, (h = {}, h[l] = (k = {}, k[g] = m, k), h))
				}, d), D(function (g) {
					var h, k, l = g[0];
					g = g[1];
					var m = 1 + (a.O[l] ? a.O[l][g] : 0);
					F(a.O, (h = {}, h[l] = (k =
						{}, k[g] = m, k), h))
				}, c), a.vb && (a.Pa || c.length) && ((b = Ea(a.o, a.qb)) && b.params("__ym", "phc", (f = {}, f.clientId = a.ga, f.orderId = a.ia, f.service_id = a.Pb, f.phones = a.O, f.performance = a.T, f)), a.Pa = !1))
			}
			
			function uj(a, b) {
				try {
					var c = b.origin
				} catch (e) {
				}
				if (c) {
					var d = Oa(q(Ka, va(c)), [/^http:\/\/([\w\-.]+\.)?webvisor\.com\/?$/, /^https:\/\/([\w\-.]+\.)?metri[kc]a\.yandex\.(ru|ua|by|kz|com|com\.tr)\/?$/]);
					c = N(c.replace(/\/?$/, "/"), vj);
					if (d || c) d = wb(a, b.data), "appendremote" === n(d, "action") && ("3" === n(d, "version") || c ? uf(a, b, d, !1) :
						vf(n(d, "resource") || "") && uf(a, b, d, !0))
				}
			}
			
			function wj(a, b) {
				var c = eb(a);
				if (c) {
					c = c("div");
					var d = Jb(a);
					if (d) {
						c.innerHTML = '<iframe name="RemoteIframe" allowtransparency="true" style="position: absolute; left: -999px; top: -999px; width: 1px; height: 1px;"></iframe>';
						var e = c.firstChild;
						e.onload = function () {
							gc(e.contentWindow, {src: b})
						};
						a._ym__remoteIframeEl = e;
						d.appendChild(c);
						c.removeChild(e);
						var f = null;
						c.attachShadow ? f = c.attachShadow({mode: "open"}) : c.createShadowRoot ? f = c.createShadowRoot() : c.webkitCreateShadowRoot &&
							(f = c.webkitCreateShadowRoot());
						f ? f.appendChild(e) : (d.appendChild(e), a._ym__remoteIframeContainer = e)
					}
				}
			}
			
			function wf(a, b, c) {
				var d;
				b = xf(a, b, {Tb: xj, Gc: (d = {}, d.href = !0, d)});
				c = Z(Boolean, I(function (f) {
					return "*" === f ? f : hc(f)
				}, c));
				var e = I(q(K, ca("concat", [""]), yj("reverse"), za), c);
				c = ib(a);
				d = yf(a, c, 1E3);
				b = E(b.Ib, b, e, !1);
				d.C(b);
				zj(a, c);
				zf(a, c);
				b()
			}
			
			function xj(a, b, c) {
				var d = eb(a), e = c.da, f = c.Ca, g = e.parentNode, h = e.textContent;
				if ("text" === c.Xa && h && d && g) {
					c = d("SPAN");
					Af(c);
					var k = h.split(""), l = h.replace(/\s/g, "").length;
					D(ca("appendChild", c), S(function (m, p) {
						var u = m.bb, r = m.Xb, w = d("SPAN");
						w.innerHTML = p;
						var y = Aj.test(p);
						Af(w);
						y && (w.style.opacity = "" + (l - r - 1) / l);
						u.push(w);
						return {bb: u, Xb: r + (y ? 1 : 0)}
					}, {bb: [], Xb: 0}, k).bb);
					Bj(a, b, c, f);
					g.insertBefore(c, e);
					e.textContent = "";
					return !0
				}
				return !1
			}
			
			function Bj(a, b, c, d) {
				function e() {
					D(v(["style", "opacity", ""], cc), xa(c.childNodes));
					if (b) {
						var k = Ea(a, b);
						k && k.extLink("tel:" + d, {})
					}
					g();
					h()
				}
				
				var f = ja(a), g = C, h = C;
				g = f.C(c, ["mouseenter"], function (k) {
					if (k.target === c) {
						var l = pa(a, e, 200, "ph.h.e");
						(h ||
							C)();
						h = f.C(c, ["mouseleave"], function (m) {
							m.target === c && Ua(a, l)
						})
					}
				})
			}
			
			function zf(a, b) {
				return Od(a).then(function () {
					var c, d = a.document.body, e = (c = {}, c.attributes = !0, c.childList = !0, c.subtree = !0, c);
					ka("MutationObserver", a.MutationObserver) && (new MutationObserver(b.J)).observe(d, e)
				})
			}
			
			function zj(a, b) {
				return ja(a).C(a, ["load"], b.J)
			}
			
			function xf(a, b, c) {
				function d(k) {
					var l;
					return f(a, b, k) ? null === (l = h[k.Ca]) || void 0 === l ? void 0 : l.Ga : null
				}
				
				var e, f = c.Tb;
				c = c.Gc;
				var g = void 0 === c ? (e = {}, e.href = !0, e.text = !0, e) : c, h;
				return {
					Ib: function (k) {
						return new J(function (l,
						                       m) {
							k && k.length || m();
							h = Bf()(k);
							l(Od(a).then(function () {
								var p = W(a), u = p(U), r = g.href ? Cj(a, h) : [], w = g.text ? Cf(a, h) : [];
								return {O: Z(Ia, Z(Boolean, I(d, r.concat(w)))), T: p(U) - u}
							})["catch"](function () {
								return {O: [], T: 0}
							}))
						})
					}
				}
			}
			
			function Cj(a, b) {
				var c = a.document.body;
				if (!c) return [];
				var d = Df(b);
				return S(function (e, f) {
					var g = n(f, "href"), h = decodeURI(g || "");
					if ("tel:" === h.slice(0, 4)) {
						var k = (d.exec(h) || [])[0], l = k ? hc(k) : "", m = b[l];
						V(m) || !l && "*" !== m.Ga[0] || (e.push({
							Xa: "href",
							da: f,
							Ca: l,
							$: Ef(k, b[l].$),
							Vc: g
						}), g = hc(h.slice(4)),
							l = Bf()([l ? m.Ga : [g, ""]]), e.push.apply(e, Cf(a, l, f)))
					}
					return e
				}, [], xa(c.querySelectorAll("a")))
			}
			
			function Cf(a, b, c) {
				void 0 === c && (c = a.document.body);
				if (!c) return [];
				var d = [], e = Df(b);
				df(a, c, function (f) {
					if (f !== c && "script" !== (n(f, "parentNode.nodeName") || "").toLowerCase()) {
						var g = Z(Boolean, e.exec(f.textContent || "") || []);
						D(function (h) {
							var k = hc(h);
							V(b[k]) || d.push({Xa: "text", da: f, Ca: k, $: Ef(h, b[k].$), Vc: f.textContent || ""})
						}, g)
					}
				}, function (f) {
					return e.test(f.textContent || "") ? 1 : 0
				}, a.NodeFilter.SHOW_TEXT);
				return d
			}
			
			function Bf() {
				return Pd(function (a, b) {
					var c = I(hc, b), d = c[0];
					c = c[1];
					a[d] = {$: c, Ga: b};
					var e = Ff(d);
					e !== d && (a[e] = {$: Ff(c), Ga: b});
					return a
				}, {})
			}
			
			function Ef(a, b) {
				for (var c = [], d = a.split(""), e = b.split(""), f = 0, g = 0; g < a.length && !(f >= e.length); g += 1) {
					var h = d[g];
					"0" <= h && "9" >= h ? (c.push(e[f]), f += 1) : c.push(d[g])
				}
				return B("", c) + b.slice(f + 1)
			}
			
			function Ff(a) {
				var b = {7: "8", 8: "7"};
				return 11 === a.length && b[a[0]] ? "" + b[a[0]] + a.slice(1) : a
			}
			
			function Df(a) {
				return new RegExp("(?:" + B("|", I(Gf, ya(a))) + ")")
			}
			
			function df(a, b, c, d, e) {
				function f(g) {
					return O(d) ?
						d(g) ? a.NodeFilter.FILTER_ACCEPT : a.NodeFilter.FILTER_REJECT : a.NodeFilter.FILTER_ACCEPT
				}
				
				void 0 === e && (e = -1);
				if (O(c) && f(b) === a.NodeFilter.FILTER_ACCEPT && (c(b), !Hf(b))) for (b = a.document.createTreeWalker(b, e, d ? {acceptNode: f} : null, !1); b.nextNode() && !1 !== c(b.currentNode);) ;
			}
			
			function Od(a, b) {
				function c(e) {
					n(b, d) ? e() : pa(a, v(e, c), 100)
				}
				
				void 0 === b && (b = a);
				var d = (b.nodeType ? "contentWindow." : "") + "document.body";
				return new J(c)
			}
			
			function hf(a, b, c) {
				return If(a, b, ["i", "n", "p"], void 0, c)
			}
			
			function Dj(a, b, c) {
				var d, e;
				var f =
					n(c, "ecommerce") || {};
				var g = n(c, "event") || "";
				f = (g = Jf[g]) ? Qd(g, f, "items") : void 0;
				if (!f) a:{
					f = c;
					!Ia(c) && Nc(a, Kb(c)) && (f = na(f));
					if (Ia(f) && (a = Jf[f[1]], "event" === f[0] && a)) {
						f = Qd(a, f[2], "items");
						break a
					}
					f = void 0
				}
				(c = f || Ej(c)) && b && b((d = {}, d.__ym = (e = {}, e.ecommerce = [c], e), d))
			}
			
			function Ej(a) {
				var b = n(a, "ecommerce") || {};
				a = Z(mb(Fj), ya(b));
				a = S(function (c, d) {
					c[d] = b[d];
					return c
				}, {}, a);
				return ya(a).length ? a : void 0
			}
			
			function Gj(a, b, c) {
				var d = !1, e = "";
				if (!ic(b)) return Lb(c, "Ecommerce data should be an object"), d;
				var f = b.goods;
				switch (a) {
					case "detail":
					case "add":
					case "remove":
						Ia(f) && f.length ? (d = Rd(function (g) {
							return ic(g) && (Va(g.id) || Nc(c, g.id) || Va(g.name))
						}, f)) || (e = "All items in 'goods' should be objects and contain 'id' or 'name' field") : e = "Ecommerce data should contain 'goods' non-empty array";
						break;
					case "purchase":
						Nc(c, b.id) || Va(b.id) ? d = !0 : e = "Purchase object should contain string or number 'id' field"
				}
				Lb(c, e);
				return d
			}
			
			function Qd(a, b, c) {
				var d, e;
				if (b) {
					var f = b.purchase || b;
					b = ya(f);
					var g = f[c];
					if (g) {
						var h = (d = {}, d[a] = (e = {},
							e.products = I(Hj, g), e), d);
						1 < b.length && (h[a].actionField = S(function (k, l) {
							if (l === c) return k;
							if ("currency" === l) return h.currencyCode = f.currency, k;
							k[Sd[l] || l] = f[l];
							return k
						}, {}, b));
						return h
					}
				}
			}
			
			function Hj(a) {
				var b = {};
				D(function (c) {
					var d = Sd[c] || c;
					-1 !== c.indexOf("item_category") ? (d = Sd.item_category, b[d] = b[d] ? b[d] + ("/" + a[c]) : a[c]) : b[d] = a[c]
				}, ya(a));
				return b
			}
			
			function Ij(a, b, c, d) {
				var e;
				if (a = Ea(a, c)) {
					var f = d.data;
					c = "" + c.id;
					var g = d.sended || [];
					d.sended || (d.sended = g);
					N(c, g) || !a.params || d.counter && "" + d.counter !==
					c || (a.params(f), g.push(c), d.parent && b.Lb((e = {}, e.type = "params", e.data = f, e)))
				}
			}
			
			function Jj(a, b, c) {
				if (c && (c = Kf(a, c), c = Lf(a, c))) {
					c = "?" + dc(c);
					var d = lb(a, b, "Button goal. Counter " + b.id + ". Button: " + c + ".");
					Gd(a, b, "btn", d)(c)
				}
			}
			
			function Kj(a, b) {
				var c = Aa(a);
				if ("" !== c.b("cc")) return 0;
				var d = v("cc", c.l);
				d(0);
				var e = W(a), f = L(a);
				f = q(T(Wa({Da: 1}) + ".c"), Mb(function (g) {
					d(g + "&" + e(Xa))
				}), v("cc", f.l));
				da(a, "6", b)({}).then(f)["catch"](q(Mb(function () {
					var g = e(Xa);
					c.l("cc", "&" + g)
				}), x(a, "cc")))
			}
			
			function Lj(a, b) {
				var c;
				a((c =
					{}, c.clickmap = V(b) ? !0 : b, c))
			}
			
			function Mj(a, b, c, d, e) {
				function f() {
					k && k.stop()
				}
				
				if (!b.ra) return J.resolve(C);
				var g = da(a, "4", b), h = {D: {"wv-type": "0"}, F: ha()};
				c = new Nj(a, c, function (l, m, p) {
					if (g) {
						m = "wv-data=" + Mf(l, !0);
						for (var u = l.length, r = 0, w = 255, y = 255, H, X, Ga; u;) {
							H = 21 < u ? 21 : u;
							u -= H;
							do X = "string" === typeof l ? l.charCodeAt(r) : l[r], r += 1, 255 < X && (Ga = X >> 8, X &= 255, X ^= Ga), w += X, y += w; while (--H);
							w = (w & 255) + (w >> 8);
							y = (y & 255) + (y >> 8)
						}
						l = (w & 255) + (w >> 8) << 8 | (y & 255) + (y >> 8);
						g(F({}, h, {K: m, D: {"wv-check": 65535 === l ? 0 : l, "wv-type": "0"}}),
							b, p)["catch"](x(a, "m.n.m.s"))
					}
				});
				var k = Oj(a, c, d, e);
				return Da(a, b, function (l) {
					l && L(a).l("isEU", n(l, "settings.eu"));
					if (!Td(a) && k) {
						var m = xb(a), p = m.b("visorc");
						N(p, ["w", "b"]) || (p = "");
						Nf(a) && Of(a, jc, "visorc") && !Pj.test(Ya(a) || "") || (p = "b");
						l = n(l, "settings.webvisor.recp");
						if (!a.isFinite(l) || 0 > l || 1 < l) p = "w";
						p || (p = L(a).b("hitId") % 1E4 / 1E4 < l ? "w" : "b");
						m.l("visorc", p, 30);
						"w" === p && k.start()
					}
					return f
				})
			}
			
			function Oj(a, b, c, d) {
				var e = a.document, f = [], g = ja(a), h = ":submit" + Math.random(), k = [], l = E(b.flush, b),
					m = ra(function (r,
					                 w) {
						x(a, "hfv." + r, function () {
							try {
								var y = w.type
							} catch (H) {
								return
							}
							y = N(y, d);
							b.push(w, {type: r});
							y && l()
						})()
					}), p = x(a, "sfv", function () {
						if (!Ud(a)) {
							var r = c(a), w = Qj(a);
							D(function (y) {
								f.push(g.C(y.target, [y.event], m(y.type)))
							}, r);
							D(function (y) {
								f.push(g.C(y.target, [y.event], x(a, "hff." + y.type + "." + y.event, function (H) {
									D(va({o: a, N: H, flush: l}), y.G)
								})))
							}, w);
							k = Pf(a, "form", e);
							e.attachEvent && (r = Pf(a, "form *", e), D(function (y) {
								f.push(g.C(y, ["submit"], m("form")))
							}, k), D(function (y) {
									Vd(y) && f.push(g.C(y, ["change"], m("formInput")))
								},
								r));
							D(function (y) {
								var H = y.submit;
								if (O(H) || "object" === typeof H && Rj.test("" + H)) y[h] = H, y.submit = x(a, "fv", function () {
									var X = {target: y, type: "submit"};
									m("document")(X);
									return y[h]()
								})
							}, k)
						}
					}), u = x(a, "ufv", function () {
						D(za, f);
						D(function (r) {
							r && (r.submit = r[h])
						}, k);
						b.flush()
					});
				return {start: p, stop: u}
			}
			
			function Qf(a, b) {
				var c = Z(function (e) {
					return 0 < e.G.length
				}, b), d = Rf({target: a.document, type: "document"});
				return I(q(K, d, Sj(a)), c)
			}
			
			function Sf(a, b) {
				var c = a.o, d = [], e = b.form;
				if (!b[ma] && e) {
					var f = e.elements;
					e = e.length;
					for (var g =
						0; g < e; g += 1) {
						var h = f[g];
						Oc(h) && !h[ma] && Ja(d, db(c, h))
					}
				} else Ja(d, db(c, b));
				return d
			}
			
			function Wd(a) {
				if (kc) {
					kc = !1;
					var b = ta(a.o), c = [];
					Fa(a.o, c, 15) ? a = [] : (z(c, b), a = c);
					return a
				}
			}
			
			function Tf(a) {
				if (!kc) {
					kc = !0;
					a = ta(a.o);
					var b = [];
					ua(b, 14);
					z(b, a);
					return b
				}
			}
			
			function Tj(a, b, c) {
				var d = b[ma];
				if (d) {
					a:{
						var e = ta(a), f = b[ma];
						if (0 < f) {
							var g = [];
							b = Xd(a, b);
							var h = yb[f], k = b[0] + "x" + b[1], l = b[2] + "x" + b[3];
							if (k !== h.Eb) {
								h.Eb = k;
								if (Fa(a, g, 9)) {
									a = [];
									break a
								}
								z(g, e);
								z(g, f);
								z(g, b[0]);
								z(g, b[1])
							}
							if (l !== h.size) {
								h.size = l;
								if (Fa(a, g, 10)) {
									a = [];
									break a
								}
								z(g,
									e);
								z(g, f);
								z(g, b[2]);
								z(g, b[3])
							}
							if (g.length) {
								a = g;
								break a
							}
						}
						a = []
					}
					Ja(c, a)
				}
				return d
			}
			
			function lc(a, b, c) {
				void 0 === c && (c = !1);
				if ("button" === b.getAttribute("type")) return !1;
				var d = b && nb("ym-record-keys", b), e = Uf(b);
				a = Vf(a, b) || c && e;
				return !d && a
			}
			
			function Vf(a, b) {
				return Wf(a, b) || mc(a, b) ? !0 : Xf(a, b)
			}
			
			function Uf(a) {
				if (!a) return !1;
				var b = a.placeholder, c = a.type;
				a = Z(Yf, [a.className, a.id, a.name]);
				return c && N(c, Uj) || Oa(Ka(Vj), a) || Yf(b) && Wj.test(b)
			}
			
			function Yf(a) {
				return !!(a && 2 < a.length)
			}
			
			function Zf(a, b) {
				return b && nb("(ym-disable-submit|-metrika-noform)",
					b)
			}
			
			function Xf(a, b) {
				if (Ba(b)) return !1;
				if (Hf(b)) {
					var c = b.parentNode;
					return (Ba(c) ? 0 : 11 === c.nodeType) ? !1 : Xf(a, b.parentNode)
				}
				if (Xj.test(b.className)) return !0;
				c = $f(a);
				if (!c) return !1;
				var d = c.call(b, ".ym-hide-content *");
				return d && (Yj.test(b.className) || c.call(b, ".ym-hide-content .ym-show-content *")) ? !1 : d
			}
			
			function Zj(a, b, c, d, e) {
				var f;
				b = {F: ha(), D: (f = {}, f["page-url"] = b, f["pointer-click"] = c, f)};
				d(b, e)["catch"](x(a, "c.s.c"))
			}
			
			function ak(a, b, c, d, e) {
				if (nc(a, "ymDisabledClickmap") || Ud(a) || !b || !b.element) return !1;
				a = La(b.element);
				if (e && !e(b.element, a) || N(b.button, [2, 3]) && "A" !== a || Oa(sa(a), d)) return !1;
				d = b.element;
				if (b && c) {
					if (50 > b.time - c.time) return !1;
					e = Math.abs(c.position.x - b.position.x);
					a = Math.abs(c.position.y - b.position.y);
					b = b.time - c.time;
					if (c.element === d && 2 > e && 2 > a && 1E3 > b) return !1
				}
				for (; d;) {
					if (bk(d)) return !1;
					d = d.parentElement
				}
				return !0
			}
			
			function ck(a, b) {
				var c = null;
				try {
					if (c = b.target || b.srcElement) !c.ownerDocument && c.documentElement ? c = c.documentElement : c.ownerDocument !== a.document && (c = null)
				} catch (d) {
				}
				return c
			}
			
			function dk(a) {
				var b = a.which;
				a = a.button;
				return b || void 0 === a ? b : 1 === a || 3 === a ? 1 : 2 === a ? 3 : 4 === a ? 2 : 0
			}
			
			function Mc(a, b) {
				var c = Jb(a), d = Ld(a);
				return {
					x: b.pageX || b.clientX + d.x - (c.clientLeft || 0) || 0,
					y: b.pageY || b.clientY + d.y - (c.clientTop || 0) || 0
				}
			}
			
			function ek(a) {
				var b = x(a, "i.clch", fk);
				ja(a).C(a.document, ["click"], E(b, null, a), {passive: !1});
				return function (c) {
					var d = la.aa, e = a.Ya[la.Ja], f = !!e._informer;
					e._informer = F({domain: "informer.yandex.ru"}, c);
					f || gc(a, {src: d + "//informer.yandex.ru/metrika/informer.js"})
				}
			}
			
			function gk(a) {
				var b =
					void 0;
				void 0 === b && (b = hk);
				var c = n(a, "navigator") || {};
				b = I(v(c, n), b);
				b = B("x", b);
				try {
					var d = n(a, "navigator.getGamepads");
					var e = qa(d, "getGamepads") && a.navigator.getGamepads() || []
				} catch (f) {
					e = []
				}
				return b + "x" + Kb(e)
			}
			
			function ik(a) {
				try {
					var b = Kb(a) ? a : [];
					return B(",", [a.name, a.description, q(xa, Nb(Boolean), fb(jk), oc(","))(b)])
				} catch (c) {
					return ""
				}
			}
			
			function jk(a) {
				return B(",", [a.description, a.suffixes, a.type])
			}
			
			function fj(a) {
				return S(function (b, c) {
					var d = c[0], e = c[1];
					b[d + " precision"] = n(e, "precision") || "n";
					b[d + " precision rangeMin"] =
						n(e, "rangeMin") || "n";
					b[d + " precision rangeMax"] = n(e, "rangeMax") || "n";
					return b
				}, {}, [["webgl vertex shader high float", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT)], ["webgl vertex shader medium", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT)], ["webgl vertex shader low float", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_FLOAT)], ["webgl fragment shader high float", a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT)], ["webgl fragment shader medium float", a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,
					a.MEDIUM_FLOAT)], ["webgl fragment shader low float", a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_FLOAT)], ["webgl vertex shader high int", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_INT)], ["webgl vertex shader medium int", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_INT)], ["webgl vertex shader low int", a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.LOW_INT)], ["webgl fragment shader high int", a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT)], ["webgl fragment shader medium int",
					a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.MEDIUM_INT)], ["webgl fragment shader low int precision", a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.LOW_INT)]])
			}
			
			function ej(a, b) {
				var c = b.createBuffer();
				if (!c || !b.getParameter || !ka("getParameter", b.getParameter)) return "";
				b.bindBuffer(b.ARRAY_BUFFER, c);
				var d = new a.Float32Array(kk);
				b.bufferData(b.ARRAY_BUFFER, d, b.STATIC_DRAW);
				c.Ec = 3;
				c.Kc = 3;
				d = b.createProgram();
				var e = b.createShader(b.VERTEX_SHADER);
				if (!d || !e) return "";
				b.shaderSource(e, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
				b.compileShader(e);
				b.attachShader(d, e);
				e = b.createShader(b.FRAGMENT_SHADER);
				if (!e) return "";
				b.shaderSource(e, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
				b.compileShader(e);
				b.attachShader(d, e);
				b.linkProgram(d);
				b.useProgram(d);
				d.bd = b.getAttribLocation(d, "attrVertex");
				d.Mc = b.getUniformLocation(d, "uniformOffset");
				b.enableVertexAttribArray(d.Fd);
				b.vertexAttribPointer(d.bd, c.Ec, b.FLOAT, !1, 0, 0);
				b.uniform2f(d.Mc, 1, 1);
				b.drawArrays(b.TRIANGLE_STRIP,
					0, c.Kc);
				return b.canvas
			}
			
			function dj(a, b) {
				if (!O(a.Float32Array)) return !1;
				var c = n(b, "canvas");
				if (!c || !ka("toDataUrl", c.toDataURL)) return !1;
				try {
					b.createBuffer()
				} catch (d) {
					return !1
				}
				return !0
			}
			
			function Hd(a, b) {
				b.clearColor(0, 0, 0, 1);
				b.enable(b.DEPTH_TEST);
				b.depthFunc(b.LEQUAL);
				b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT);
				return "[" + n(a, "0") + ", " + n(a, "1") + "]"
			}
			
			function lk(a) {
				a = n(a, "screen") || {};
				return B("x", I(v(a, n), mk))
			}
			
			function bj(a) {
				var b = n(a, "matchMedia");
				if (!b || !ka("matchMedia", b)) return "";
				var c = ca("matchMedia",
					a);
				return S(function (d, e) {
					d[e] = c("(" + e + ")");
					return d
				}, {}, nk)
			}
			
			function Vi(a) {
				a = eb(a);
				if (!a) return "";
				a = a("video");
				try {
					var b = ca("canPlayType", a), c = vb(function (d) {
						return I(q(K, ca("concat", d + "; codecs=")), ok)
					}, ag);
					return I(b, [].concat(ag, c))
				} catch (d) {
					return "canPlayType"
				}
			}
			
			function pk(a) {
				a = n(a, "navigator") || {};
				return a.doNotTrack || a.msDoNotTrack || "unknown"
			}
			
			function qk(a, b, c, d, e) {
				var f = e(U);
				return rk(a, c, b)(Pc(function (g) {
					D(function (h) {
						bg(a, "d.s", h)
					}, g);
					g = e(Xa);
					d.l("ds", g)
				}, function (g) {
					var h = g.Da, k = g.host;
					if (n(h, "settings")) return Ob(jb("ds.e"));
					d.l("ds", e(Xa));
					g = e(U) - f;
					k = k[1];
					var l, m;
					h = ha((l = {}, l.di = h, l.dit = g, l.dip = k, l));
					l = (m = {}, m["page-url"] = M(a).href, m);
					return da(a, "S", cg)({F: h, D: l}, cg)["catch"](x(a, "ds.rs"))
				}))
			}
			
			function sk(a, b, c, d, e) {
				return new J(function (f, g) {
					var h = L(a);
					if (h.b("dSync", !1)) return g();
					h.l("dSync", !0);
					h = d.b("ds", 0);
					h = parseInt("" + h, 10);
					return 60 >= b(Xa) - h ? g() : tk(a) ? f(void 0) : dg(e) ? g() : f(uk(a, c))
				})
			}
			
			function rk(a, b, c) {
				var d = da(a, "s", b);
				return vk(I(function (e) {
					return wk(d(xk, I(function (f) {
						var g =
							f[1], h = f[2];
						f = B("", I(function (k) {
							return String.fromCharCode(k.charCodeAt(0) + 10)
						}, f[0].split("")));
						return "http" + (h ? "s" : "") + "://" + f + ":" + g + "/p"
					}, e), {Yb: !1, Tc: !0}).then(function (f) {
						return F({}, f, {host: e[f.$c]})
					}))
				}, c))
			}
			
			function yk(a, b, c) {
				var d = b || {}, e = da(a, "u", c), f = Aa(a);
				return {
					b: function (g, h) {
						return V(d[g]) ? f.b(g, h) : d[g]
					}, l: function (g, h) {
						var k, l = "" + h;
						d[g] = l;
						f.l(g, l);
						return e({D: (k = {}, k.key = g, k.value = l, k)}, [la.aa + "//mc.yandex.ru/user_storage_set"], {})["catch"](x(a, "u.d.s.s"))
					}
				}
			}
			
			function zk(a, b) {
				if (a.Zc()) {
					var c =
						null;
					try {
						c = b.target || b.srcElement
					} catch (w) {
					}
					if (c) {
						3 === c.nodeType && (c = c.parentNode);
						for (var d = c && c.nodeName && ("" + c.nodeName).toLowerCase(); n(c, "parentNode.nodeName") && ("a" !== d && "area" !== d || !c.href && !c.getAttribute("xlink:href"));) d = (c = c.parentNode) && c.nodeName && ("" + c.nodeName).toLowerCase();
						var e = c.href ? c : null
					} else e = null;
					if (e && !nb("ym-disable-tracklink", e)) {
						var f = a.o, g = a.globalStorage;
						c = a.nc;
						var h = a.oc, k = a.Bc, l = a.sender, m = a.vc, p = h.wa, u = e.href;
						d = zb(e && e.innerHTML && e.innerHTML.replace(/<\/?[^>]+>/gi,
							""));
						d = u === d ? "" : d;
						if (nb("ym-external-link", e)) Qc(f, h, {url: u, ha: !0, title: d, sender: l}); else {
							p = p ? Yd(f, p).hostname : M(f).hostname;
							m = RegExp("\\.(" + B("|", I(Ak, m)) + ")$", "i");
							var r = e.protocol + "//" + e.hostname + e.pathname;
							m = eg.test(r) || eg.test(u) || m.test(u) || m.test(r);
							e = e.hostname;
							fg(p) === fg(e) ? m ? Qc(f, h, {
								url: u,
								ya: !0,
								title: d,
								sender: l
							}) : ((k = (f = g.b("pai", C)()) && f + "-" + k) && c.l("pai", k), d && c.l("il", zb(d).slice(0, 100))) : u && Bk.test(u) || Qc(f, h, {
								url: u,
								Aa: !0,
								ha: !0,
								ya: m,
								title: d,
								sender: l
							})
						}
					}
				}
			}
			
			function Qc(a, b, c, d) {
				var e, f =
					ha();
				c.ya && f.l("dl", "1");
				c.ha && f.l("ln", "1");
				f = {
					F: f,
					title: c.title,
					Aa: !!c.Aa,
					H: c.H,
					D: (e = {}, e["page-url"] = c.url, e["page-ref"] = b.wa || M(a).href, e)
				};
				e = "Link";
				c.ya ? e = c.ha ? "Ext link - File" : "File" : c.ha && (e = "Ext link");
				c.sender(f, b).then(d || C).then(lb(a, b, e + ". Counter " + b.id + ". Url: " + c.url, c))["catch"](x(a, "cl.p.s")).then(G([a, c.ba || C, c.o], ob))
			}
			
			function Ck(a, b) {
				var c, d, e = (c = {}, c.string = !0, c.object = !0, c["boolean"] = b, c)[typeof b] || !1;
				a((d = {}, d.trackLinks = e, d))
			}
			
			function Rc(a, b) {
				return q(gg(b), Zd(a))
			}
			
			function pc(a,
			            b) {
				return q(Dk(b), Zd(a))
			}
			
			function Zd(a) {
				a = L(a);
				var b = a.b("dsjf") || va({});
				a.qa("dsjf", b);
				return b
			}
			
			function lb(a, b, c, d) {
				return hg(b) ? C : v(G(P([a], d ? [c + ". Params:", d] : [c]), Lb), za)
			}
			
			function Lb() {
				var a = na(arguments), b = a.slice(1);
				$d(a[0]).log.apply(Lb, b)
			}
			
			function ig(a) {
				var b = xb(a), c = M(a);
				b = "1" === b.b("debug");
				c = -1 < c.href.indexOf("_ym_debug=1");
				a = a._ym_debug;
				return {Ac: b, Dc: a || c, isEnabled: Oa(Boolean, [b, a, c])}
			}
			
			function Ek(a, b, c) {
				var d;
				(d = ia[b]) || (d = oa);
				d = d.slice();
				d.unshift(Fk);
				d.unshift(Gk);
				return I(q(jg([a,
					b, c]), za), d)
			}
			
			function kg(a, b) {
				var c = M(a), d = c.href, e = c.host, f = -1;
				if (!Va(b) || V(b)) return d;
				c = b.replace(lg, "");
				if (-1 !== c.search(Hk)) return c;
				var g = c.charAt(0);
				if ("?" === g && (f = d.search(/\?/), -1 === f) || "#" === g && (f = d.search(/#/), -1 === f)) return d + c;
				if (-1 !== f) return d.substr(0, f) + c;
				if ("/" === g) {
					if (f = d.indexOf(e), -1 !== f) return d.substr(0, f + e.length) + c
				} else return d = d.split("/"), d[d.length - 1] = c, B("/", d);
				return ""
			}
			
			function mg(a) {
				return {
					L: function (b, c) {
						if (!b.F) return c();
						var d = L(a).b("fid");
						!ng && d && (qc(b, "fid", d),
							ng = !0);
						return c()
					}
				}
			}
			
			function og(a) {
				return {
					L: function (b, c) {
						var d = b.F;
						if (d) {
							var e = L(a).b("adBlockEnabled");
							e && d.l("adb", e)
						}
						c()
					}
				}
			}
			
			function Gk(a) {
				return {
					L: function (b, c) {
						Td(a) || c()
					}
				}
			}
			
			function Td(a) {
				var b;
				return b = (b = !!L(a).b("oo")) || Ud(a)
			}
			
			function Ik(a) {
				a = Jk(a);
				return Kk[a] || a
			}
			
			function Lk(a) {
				a = pg(a);
				return Mk[a] || "ru"
			}
			
			function Ea(a, b) {
				var c = L(a).b("counters", {}), d = Q(b);
				return c[d]
			}
			
			function Fk(a, b, c) {
				return {
					L: function (d, e) {
						Nk(a, d, c, e)
					}
				}
			}
			
			function Nk(a, b, c, d) {
				var e = b.F;
				if (c.cd || !e) d(); else {
					var f = ae(a), g =
						fc(a, "");
					d = q(function () {
						var r = qg(f);
						r = "" + r + Ok(r, g);
						e.l("gdpr", r);
						qc(b, "gdpr", r)
					}, d);
					if (3 === c.id) d(); else {
						var h = L(a), k = h.b("f1");
						if (k) k(d); else if (k = (k = qg(f)) ? I(v(Sc, n), k.split(",")) : [], rg(k)) d(); else {
							var l = be(a), m = M(a),
								p = l && (-1 !== m.href.indexOf("yagdprcheck=1") || g.b("yaGdprCheck"));
							m = g.b("gdpr");
							g.b("yandex_login") ? (k.push("13"), g.l("gdpr", Pb, 525600)) : l ? N(m, pb) ? m === ce ? k.push("12") : k.push("3") : sg(a) || Tc(a) ? k.push("17") : Pk(a) && k.push("28") : k.push("14");
							var u = v(f, Qk);
							rg(k) ? (D(u, k), d()) : (Uc.push(d), h.l("f1",
								function (r, w) {
									var y = 0;
									if (w) {
										var H = Ab(a, w) || "";
										y += H.length
									}
									Uc.push(r);
									1E6 >= y && Uc.push(r)
								}), (0, de[0])(a).then(T("params.eu")).then(function (r) {
								if (r || p) {
									g.l("gdpr_popup", ce);
									Rk(a, c);
									if (Hb(a)) return Sk(a, u, c);
									var w = tg(a, f);
									if (w) return Tk(a, u, w, c)
								}
								r || u("8");
								return J.resolve({value: Pb, Ra: !0})
							}).then(function (r) {
								g.Ma("gdpr_popup");
								if (r) {
									var w = r.value;
									r = r.Ra;
									N(w, pb) && g.l("gdpr", w, r ? void 0 : 525600)
								}
								w = ee(Uc, za);
								ug(a, w, 20)(Pc(x(a, "gdr"), C));
								h.l("f1", za)
							})["catch"](x(a, "gdp.a")))
						}
					}
				}
			}
			
			function Sk(a, b, c) {
				var d = Vc(a,
					c);
				return new J(function (e) {
					var f;
					if (d) {
						var g = d.X, h = q(v("4", b), v(null, e)), k = pa(a, h, 2E3, "gdp.f.t");
						d.Lb((f = {}, f.type = "isYandex", f)).then(function (l) {
							l.isYandex ? (b("5"), g.C(B(",", P(["GDPR-ok-view-default", "GDPR-ok-view-detailed"], fe)), function (m) {
								e({value: vg(m[1].type)})
							})) : (b("6"), e(null))
						})["catch"](h).then(G([a, k], Ua))
					} else e({value: ce, Ra: !0})
				})
			}
			
			function Rk(a, b) {
				var c = Vc(a, b);
				c && c.X.C("isYandex", function () {
					var d;
					return d = {type: "isYandex"}, d.isYandex = be(a), d
				});
				return c
			}
			
			function Tk(a, b, c, d) {
				var e =
					Uk(a, d.dd), f = Vc(a, d);
				if (!f) return J.resolve({value: Pb, Ra: !0});
				var g = gc(a, {src: "https://yastatic.net/s3/gdpr/popup/v2/" + e + ".js"});
				return new J(function (h, k) {
					g ? (b("7"), g.onerror = function () {
						var l;
						b("9");
						f.Kb((l = {}, l.type = "GDPR-ok-view-default", l));
						h(null)
					}, g.onload = function () {
						b("10");
						c.C(B(",", P(["GDPR-ok-view-default", "GDPR-ok-view-detailed"], fe)), function (l) {
							var m;
							l = l.type;
							f.Kb((m = {}, m.type = l, m));
							h({value: vg(l)})
						})
					}) : (b("9"), k(jb("gdp.e")))
				})
			}
			
			function Uk(a, b) {
				var c = b || pg(a);
				return N(c, Vk) ? c : "en"
			}
			
			function wg(a,
			            b) {
				var c = xg(a, b), d = [], e = [];
				if (!c) return null;
				var f = Wk(a, c.Za), g = Xk(f);
				c.X.C("initToParent", function (h) {
					g(d, c.fa[h[1].counterId])
				}).C("parentConnect", function (h) {
					g(e, c.ja[h[1].counterId])
				});
				return {
					X: c.X, Dd: function (h, k) {
						return new J(function (l, m) {
							c.Za(h, k, function (p, u) {
								l([p, u])
							});
							pa(a, v(jb(), m), 5100, "is.o")
						})
					}, Kb: function (h) {
						var k = {Mb: [], hb: [], data: h};
						d.push(k);
						return f(c.fa, k, h)
					}, Lb: function (h) {
						var k = {Mb: [], hb: [], data: h};
						e.push(k);
						return f(c.ja, k, h)
					}
				}
			}
			
			function ge() {
				return function (a, b, c) {
					return {
						L: function (d,
						             e) {
							var f, g = d.F, h = d.D;
							if (g && h) {
								var k = N(h["wv-type"], Yk);
								if (!h["wv-type"] || k) {
									var l = W(a);
									g.ab("rqnl", 1);
									g = g.o();
									for (var m = rc(a), p = 1; m[p];) p += 1;
									d.oa = p;
									m[p] = (f = {}, f.protocol = la.aa, f.host = "mc.yandex.ru", f.resource = k ? "webvisor" : "watch", f.postParams = d.K, f.time = l(U), f.counterType = c.M, f.params = h, f.browserInfo = g, f.counterId = c.id, f.ghid = Qb(a), f);
									he(a)
								}
							}
							e()
						}, Z: function (d, e) {
							yg(a, d);
							e()
						}
					}
				}
			}
			
			function yg(a, b) {
				var c = rc(a);
				b.F && !Za(c) && (delete c[b.oa], he(a))
			}
			
			function he(a) {
				var b = rc(a);
				Aa(a).l("retryReqs", b)
			}
			
			function zg(a,
			            b, c) {
				var d = Wc(a, b, c);
				return function (e, f, g) {
					var h = F({F: ha()}, e);
					h.D || (h.D = {});
					var k = h.D;
					k.wmode = "0";
					k["wv-part"] = "" + g;
					k["wv-hit"] = k["wv-hit"] || "" + Qb(a);
					k["page-url"] = k["page-url"] || a.location.href;
					e = k["wv-type"] ? J.resolve(k["wv-type"]) : Zk(a, f, h);
					k.rn = k.rn || "" + Ta(a);
					return e.then(function (l) {
						var m;
						k["wv-type"] = l;
						l = "webvisor/" + f.id;
						return d(F(h, {D: k}), l, {ma: (m = {}, m["Content-Type"] = "text/plain", m), Wb: "POST"})
					})
				}
			}
			
			function Zk(a, b, c) {
				return Da(a, b, function (d) {
					var e = c.yd;
					d = !!n(d, "settings.publisher.schema");
					var f = "4", g = "2";
					e && (f = "5", g = "3");
					e = !!c.F.b("bt");
					return d && !e ? f : g
				})
			}
			
			function $k(a, b, c, d) {
				b = d.b("cc");
				d = G(["cc", ""], d.l);
				if (b) {
					var e = b.split("&");
					b = e[0];
					if ((e = (e = e[1]) && parseInt(e, 10)) && 1440 < W(a)(Xa) - e) return d();
					c.l("cc", b)
				} else sa(0)(b) || d()
			}
			
			function al(a, b, c, d) {
				return Da(a, b, function (e) {
					if ("0" === n(e, "settings.pcs") && !Xc(a)) if (e = d.b("zzlc"), V(e) || Za(e) || "na" === e) {
						e = "ru";
						var f = Ag(a, 68), g = Bg(a, 79);
						if (f || g) e = "md";
						if (f = eb(a)) {
							var h = f("iframe");
							F(h.style, {display: "none", width: "1px", height: "1px", visibility: "hidden"});
							h.src = "https://mc.yandex." + e + bl("L21ldHJpa2EvenpsYy5odG1s");
							if (e = Jb(a)) {
								e.appendChild(h);
								var k = 0, l = ja(a).C(a, ["message"], x(a, "zz.m", function (m) {
									(m = n(m, "data")) && m.substr && "__ym__zz" === m.substr(0, 8) && (Rb(h), m = m.substr(8), d.l("zzlc", m), c.l("zzlc", m), l(), Ua(a, k))
								}));
								k = pa(a, q(l, v(h, Rb)), 3E3)
							}
						}
					} else c.l("zzlc", e)
				})
			}
			
			function Da(a, b, c) {
				var d = Q(b);
				return new J(function (e) {
					Cg(a)(cl(d)).C(q(c, e))
				})
			}
			
			function dl(a, b, c) {
				b = Q(b);
				var d = Dg(a);
				c = F({wc: d(U)}, c);
				return Cg(a)(el(b, c))
			}
			
			function Eg(a, b, c) {
				var d = ib(a), e =
					[];
				b.C(function (f) {
					e.push(f);
					e.length > c && e.shift();
					return d.J(f)
				});
				d.C = Fg(e);
				return d
			}
			
			function Gg(a, b, c) {
				var d = ib(a);
				b.xb.push(function (e) {
					return d.J(e)
				});
				d.C = q(Mb(b.C), d.C);
				d.J = function (e) {
					fl(a, d.xb, function (f) {
						return f(e)
					}, c)
				};
				return d
			}
			
			function gl(a, b, c) {
				var d, e;
				b = Sb(v(a, n), hl);
				b = V(b) ? null : n(a, b);
				if (n(a, "navigator.onLine") && b && b && n(b, "prototype.constructor.name")) {
					var f = new b((d = {}, d.iceServers = [], d));
					a = n(f, "createDataChannel");
					O(a) && (E(a, f, "y.metrika")(), a = n(f, "createOffer"), O(a) && !a.length && (a =
						E(a, f)(), d = n(a, "then"), O(d) && E(d, a, function (g) {
						var h = n(f, "setLocalDescription");
						O(h) && E(h, f, g, C, C)()
					})(), F(f, (e = {}, e.onicecandidate = function () {
						var g, h = n(f, "close");
						if (O(h)) {
							h = E(h, f);
							try {
								var k = (g = n(f, "localDescription.sdp")) && g.match(/c=IN\s[\w\d]+\s([\w\d:.]+)/)
							} catch (l) {
								f.onicecandidate = C;
								"closed" !== f.iceConnectionState && h();
								return
							}
							k && 0 < k.length && (g = sc(k[1]), c.l("pp", g));
							f.onicecandidate = C;
							h()
						}
					}, e))))
				}
			}
			
			function il(a, b, c) {
				var d, e = xg(a, b);
				if (e) {
					e.X.C("gpu-get", function () {
						var h;
						return h = {}, h.type = "gpu-get",
							h.pu = c.b("pu"), h
					});
					var f = n(a, "opener");
					if (f) {
						var g = pa(a, G([a, b, c], Hg), 200, "pu.m");
						e.Za(f, (d = {}, d.type = "gpu-get", d), function (h, k) {
							var l = n(k, "pu");
							l && (Ua(a, g), c.l("pu", l))
						})
					} else Hg(a, b, c)
				}
			}
			
			function Hg(a, b, c) {
				var d = n(a, "location.host");
				a = ie(a, b);
				c.l("pu", "" + sc(d) + a)
			}
			
			function jl(a, b) {
				var c = Yc(a);
				b.C("initToParent", function (d) {
					var e = d[1];
					c.fa[e.counterId] = {info: e, window: d[0].source}
				}).C("initToChild", function (d) {
					var e = d[0];
					d = d[1];
					e.source === a.parent && b.J("parentConnect", [e, d])
				}).C("parentConnect", function (d) {
					var e =
						d[1];
					e.counterId && (c.ja[e.counterId] = {info: e, window: d[0].source})
				})
			}
			
			function je(a, b, c) {
				return {
					L: function (d, e) {
						var f = d.F;
						if (f && (!c || c.Jb)) {
							var g = a.document.title;
							d.title && (g = d.title);
							var h = qb("getElementsByTagName", a.document);
							"string" !== typeof g && h && (g = h("title"), g = (g = n(g, "0.innerHtml")) ? g : "");
							g = g.slice(0, la.bc);
							f.l("t", g)
						}
						e()
					}
				}
			}
			
			function Bb(a) {
				void 0 === a && (a = kl);
				return function (b, c, d) {
					return {
						L: function (e, f) {
							var g = e.F, h = e.D;
							if (g && h) {
								var k = qc(e);
								D(function (l) {
									var m = gb[l], p = "bi", u = g;
									gb[l] || (m = Ig[l],
										p = "tel", u = k);
									m && (m = A(p + ":" + l, m, null)(b, d, e), u.ab(l, m))
								}, a)
							}
							f()
						}
					}
				}
			}
			
			function Qb(a) {
				var b = L(a), c = b.b("hitId");
				c || (c = Ta(a), b.l("hitId", c));
				return c
			}
			
			function ll(a, b, c, d, e, f, g, h) {
				var k = c.b(f);
				Ba(k) && (c.l(f, g), e(a, b, c, d), k = c.b(f, g));
				V(h) || h.ab(f, "" + k);
				return k
			}
			
			function ml(a, b) {
				if (tc(a)) {
					var c = Ya(a).match(nl);
					if (c && c.length) return c[1] === b
				}
				return !1
			}
			
			function Ag(a, b) {
				if (uc(a) && b) {
					var c = Ya(a).match(ol);
					if (c && c.length) return +c[1] >= b
				}
				return !1
			}
			
			function Bg(a, b) {
				var c = Ya(a);
				return c && (c = c.match(pl)) && 1 < c.length ?
					parseInt(c[1], 10) >= b : !1
			}
			
			function Mf(a, b) {
				void 0 === b && (b = !1);
				for (var c = a.length, d = c - c % 3, e = [], f = 0; f < d; f += 3) {
					var g = (a[f] << 16) + (a[f + 1] << 8) + a[f + 2];
					e.push.apply(e, ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[g >> 18 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[g >> 12 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[g >> 6 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[g & 63]])
				}
				switch (c - d) {
					case 1:
						c = a[d] << 4;
						e.push.apply(e,
							["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[c >> 6 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[c & 63], "=", "="]);
						break;
					case 2:
						c = (a[d] << 10) + (a[d + 1] << 2), e.push.apply(e, ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[c >> 12 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[c >> 6 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[c & 63], "="])
				}
				e = e.join("");
				return b ? Jg(e, !0) : e
			}
			
			function bl(a, b) {
				void 0 ===
				b && (b = !1);
				var c = a, d = "", e = 0;
				if (!c) return "";
				for (b && (c = Jg(c)); c.length % 4;) c += "=";
				do {
					var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),
						g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),
						h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++)),
						k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(e++));
					if (0 > f || 0 > g || 0 > h || 0 > k) return null;
					var l = f << 18 |
						g << 12 | h << 6 | k;
					f = l >> 16 & 255;
					g = l >> 8 & 255;
					l &= 255;
					d = 64 === h ? d + String.fromCharCode(f) : 64 === k ? d + String.fromCharCode(f, g) : d + String.fromCharCode(f, g, l)
				} while (e < c.length);
				return d
			}
			
			function Jg(a, b) {
				void 0 === b && (b = !1);
				return a ? a.replace(b ? /[+/=]/g : /[-*_]/g, function (c) {
					return ql[c] || c
				}) : ""
			}
			
			function Kg(a, b) {
				var c = a.length ? I(function (d, e) {
					var f = b[e];
					return f === d ? null : f
				}, a) : b;
				a.length = 0;
				D(q(K, ca("push", a)), b);
				return Z(sa(null), c).length === a.length ? null : c
			}
			
			function Lg(a, b, c) {
				return I(function (d) {
					var e = d[0], f = d[1];
					if (O(e)) return e(a,
						b) || null;
					if (O(f)) return null;
					var g = !(!b[e] || !b[f]);
					!g && 2 === d.length && (g = 0 === b[e] && 0 === b[f]) && (g = d[1], g = !(Mg[d[0]] || Mg[g]));
					return g ? (d = Math.round(b[e]) - Math.round(b[f]), 0 > d || 36E5 < d ? null : d) : 1 === d.length && b[e] ? Math.round(b[e]) : null
				}, c)
			}
			
			function vc(a, b, c) {
				return {
					L: function (d, e) {
						var f = Ng(c), g = d.F;
						g ? g.b("pv") && !g.b("ar") ? (f.sb = g, e()) : f.xa ? f.xa.push(e) : e() : e()
					}, Z: function (d, e) {
						var f = d.F, g = d.Sc, h = Ng(c);
						if (f) {
							var k = h.xa;
							h.sb === f && k && (g && L(a).l("isEU", n(g, "settings.eu")), D(za, k), h.xa = null)
						}
						e()
					}
				}
			}
			
			function ke(a) {
				return {
					L: function (b,
					             c) {
						var d = a.document, e = b.F;
						if (e && le(a)) {
							var f = ja(a), g = function (h) {
								le(a) || (f.Ha(d, Og, g), c());
								return h
							};
							f.C(d, Og, g);
							e.l("pr", "1")
						} else c()
					}
				}
			}
			
			function Ca(a, b, c) {
				var d = Wc(a, b, c);
				return function (e, f) {
					var g, h = F({F: ha()}, e), k = h.D, l = h.F;
					k = (g = {}, g["page-url"] = k && k["page-url"] || "", g.charset = "utf-8", g);
					"0" !== f.M && (k["cnt-class"] = f.M);
					g = F(h, {D: F(h.D || {}, k)});
					h = "";
					if (g.F) {
						k = Q(f);
						k = me(f)[k] || {};
						var m = k.status;
						"rt" === k.Gb && m ? (1 === m && (h = ef(a, f) + "."), g.F.l("rt", m)) : h = ""
					}
					F(g, {tb: h});
					return d(g, "watch/" + f.id, {
						kb: !(!l.b("pv") ||
							l.b("ar") || l.b("wh"))
					})
				}
			}
			
			function Wc(a, b, c) {
				var d = Cb(a, b);
				return function (e, f, g) {
					void 0 === g && (g = {});
					var h = rl(a);
					e.tb && (h = "" + e.tb + h);
					f = [la.aa + "//" + (h || "mc.yandex.ru") + "/" + f];
					return ne(a, c, e, !0).then(G([e, f, g], d)).then(function (k) {
						e.Sc = k.Da;
						return ne(a, c, e).then(v(k.Da, K))
					})
				}
			}
			
			function rl(a) {
				var b = "mc.yandex.ru", c = n(a, "document.referrer");
				if (!c) return b;
				(a = Yd(a, c).host.match(/(?:^|\.)(?:ya|yandex)\.(?:\w+|com?\.\w+)$/)) ? (a = a[0].split("yandex").reverse()[0].substring(1), a = N(a, Pg) ? a : !1) : a = !1;
				return "mc.yandex." +
					(a || "ru")
			}
			
			function sl(a, b) {
				return a && b ? Qg(a) === Qg(b) : a || b ? !1 : !0
			}
			
			function Qg(a) {
				return (a.split(":")[1] || "").replace(/^\/*/, "").replace(/^www\./, "").split("/")[0]
			}
			
			function ne(a, b, c, d) {
				void 0 === d && (d = !1);
				return new J(function (e, f) {
					function g(l, m) {
						m();
						e()
					}
					
					var h = b.slice();
					h.push({L: g, Z: g});
					var k = ee(h, function (l, m) {
						var p = d ? l.L : l.Z;
						if (p) try {
							p(c, m)
						} catch (u) {
							k(tl), f(u)
						} else m()
					});
					k(Rg)
				})
			}
			
			function Ib(a, b, c) {
				var d = c || "as";
				if (a.postMessage && !a.attachEvent) {
					c = ja(a);
					var e = "__ym__promise_" + Ta(a) + "_" + Ta(a), f = C;
					d =
						x(a, d, function (g) {
							try {
								var h = g.data
							} catch (k) {
								return
							}
							h === e && (f(), g.stopPropagation && g.stopPropagation(), b())
						});
					f = c.C(a, ["message"], d);
					a.postMessage(e, "*")
				} else pa(a, b, 0, d)
			}
			
			function fl(a, b, c, d, e, f) {
				void 0 === d && (d = 1);
				void 0 === e && (e = 200);
				void 0 === f && (f = "itc");
				b = ee(b, c);
				ug(a, b, d, e)(Pc(x(a, f), C))
			}
			
			function ug(a, b, c, d, e) {
				function f(g, h) {
					function k() {
						try {
							var m = b(e(a, c));
							l = l.concat(m)
						} catch (p) {
							g(p)
						}
						b(ul);
						if (b(Zc)) return h(l);
						f.flush ? (b(e(a, 1E4)), h(l)) : pa(a, k, d)
					}
					
					var l = [];
					k()
				}
				
				void 0 === c && (c = 1);
				void 0 === d && (d =
					200);
				void 0 === e && (e = vl);
				return va(f)
			}
			
			function wl(a) {
				return va(function (b, c) {
					c(a)
				})
			}
			
			function wk(a) {
				return va(function (b, c) {
					a.then(c, b)
				})
			}
			
			function vk(a) {
				var b = [], c = !1;
				return va(function (d, e) {
					function f(g) {
						b.push(g) === a.length && d(b)
					}
					
					D(function (g) {
						g(Pc(f, function (h) {
							if (!c) try {
								e(h), c = !0
							} catch (k) {
								f(k)
							}
						}))
					}, a)
				})
			}
			
			function ee(a, b) {
				void 0 === b && (b = K);
				return va({za: a, wb: b, cb: !1, R: 0})
			}
			
			function Rg(a) {
				function b() {
					function d() {
						c = !0;
						a.R += 1
					}
					
					c = !1;
					a.wb(a.za[a.R], function () {
						d()
					});
					c || (a.R += 1, d = E(Rg, null, a))
				}
				
				for (var c =
					!0; !Zc(a) && c;) b()
			}
			
			function vl(a, b) {
				return function (c) {
					var d = W(a), e = d(U);
					return xl(function (f, g) {
						d(U) - e >= b && g(yl)
					}, c)
				}
			}
			
			function zl(a) {
				Zc(a) && Ob($c("i"));
				var b = a.wb(a.za[a.R]);
				a.R += 1;
				return b
			}
			
			function ul(a) {
				a.cb = !1
			}
			
			function yl(a) {
				a.cb = !0
			}
			
			function tl(a) {
				a.R = a.za.length
			}
			
			function Zc(a) {
				return a.cb || a.za.length <= a.R
			}
			
			function Cb(a, b) {
				return function (c, d, e) {
					void 0 === e && (e = {});
					return Sg(a, b, d, c, F(e, {W: c.W || [], K: e.K || c.K}))
				}
			}
			
			function Sg(a, b, c, d, e, f, g) {
				var h;
				void 0 === f && (f = 0);
				void 0 === g && (g = 0);
				var k = F({}, e),
					l = b[g], m = l[0];
				l = l[1];
				var p = F({}, d.D), u = W(a);
				d.F && (p["browser-info"] = ha(d.F.o()).l("st", u(ad)).$a());
				p.t || (u = qc(d, "ti", m).$a()) && (p.t = u);
				u = c[f];
				k.ma && k.ma["Content-Type"] || !k.K || (k.ma = F({}, k.ma, (h = {}, h["Content-Type"] = "application/x-www-form-urlencoded", h)), k.K = "site-info=" + oe(k.K));
				k.Wb = k.K ? "POST" : "GET";
				k.na = p;
				k.W.push(m);
				return l("" + u + (d.Hc ? "/1" : ""), k).then(function (r) {
					return {Da: r, $c: f}
				})["catch"](function (r) {
					var w = g + 1 >= b.length, y = f + 1 >= c.length;
					w && y && Ob(r);
					return Sg(a, b, c, d, e, !y && w ? f + 1 : f, w ? 0 : g + 1)
				})
			}
			
			function Tg(a, b) {
				var c = b.Sa, d = c || "uid";
				c = c ? a.location.hostname : void 0;
				var e = xb(a), f = Aa(a), g = W(a), h = g(ad), k = Ug(a, b), l = k[0];
				k = k[1];
				var m = e.b("d");
				Vg(a, b);
				var p = !1;
				!k && l && (k = l, p = !0);
				if (!k) k = B("", [g(ad), Ta(a)]), p = !0; else if (!m || 15768E3 < h - parseInt(m, 10)) p = !0;
				p && !b.ca && (e.l(d, k, 525600, c), e.l("d", "" + h, 525600, c));
				f.l(d, k);
				return k
			}
			
			function Ug(a, b) {
				var c = Aa(a), d = xb(a), e = b.Sa || "uid";
				return [c.b(e), d.b(e)]
			}
			
			function ta(a) {
				a = W(a);
				return Math.round(a(Al) / 50)
			}
			
			function Al(a) {
				var b = a.T, c = b[1];
				a = b[0] && c ? c() : U(a) - a.Cc;
				return Math.round(a)
			}
			
			function ad(a) {
				return Math.round(U(a) / 1E3)
			}
			
			function Xa(a) {
				return Math.floor(U(a) / 1E3 / 60)
			}
			
			function U(a) {
				var b = a.ib;
				return 0 !== b ? b : pe(a.o, a.T)
			}
			
			function Dg(a) {
				var b = ja(a), c = Wg(a), d = {o: a, ib: 0, T: c, Cc: pe(a, c)}, e = c[1];
				c[0] && e || b.C(a, ["beforeunload", "unload"], function () {
					0 === d.ib && (d.ib = pe(a, d.T))
				});
				return va(d)
			}
			
			function Bl(a) {
				return (10 >= a ? "0" : "") + a
			}
			
			function Xg(a, b, c) {
				void 0 === b && (b = "");
				void 0 === c && (c = "_ym");
				var d = "" + c + b + "_";
				return {
					Qa: Cl(a), b: function (e, f) {
						var g = Yg(a, "" + d + e);
						return Za(g) &&
						!V(f) ? f : g
					}, l: function (e, f) {
						Zg(a, "" + d + e, f);
						return this
					}, Ma: function (e) {
						$g(a, "" + d + e);
						return this
					}
				}
			}
			
			function Zg(a, b, c) {
				var d = qe(a);
				a = Ab(a, c);
				if (!Za(a)) try {
					d.setItem(b, a)
				} catch (e) {
				}
			}
			
			function Yg(a, b) {
				var c = qe(a);
				try {
					return wb(a, c.getItem(b))
				} catch (d) {
				}
				return null
			}
			
			function $g(a, b) {
				var c = qe(a);
				try {
					c.removeItem(b)
				} catch (d) {
				}
			}
			
			function qe(a) {
				try {
					return a.localStorage
				} catch (b) {
				}
				return null
			}
			
			function Nf(a, b, c) {
				bd(a, "metrika_enabled", "1", 0, b, c);
				(c = jc(a, "metrika_enabled")) && bd(a, "metrika_enabled", "", -100, b, void 0);
				return !!c
			}
			
			function jc(a, b) {
				var c = null;
				try {
					c = a.document.cookie
				} catch (d) {
					return null
				}
				return (c = (new RegExp("(?:^|;\\s*)" + b + "=([^;]*)")).exec(c)) && 2 <= c.length ? decodeURIComponent(c[1]) : null
			}
			
			function Of(a, b, c) {
				N(c, ["gdpr", "gdpr_popup", "metrika_enabled"]) ? a = !0 : (c = ae(a), c = ah(c), a = b(a, "gdpr"), a = Z(mb(Dl), c).length ? !0 : N(a, [Pb, El]));
				return a
			}
			
			function vg(a) {
				if (N(a, ["GDPR-ok-view-default", "GDPR-ok-view-detailed"])) return Pb;
				a = a.replace("GDPR-ok-view-detailed-", "");
				return N(a, pb) ? a : Pb
			}
			
			function tg(a, b, c) {
				void 0 ===
				c && (c = K);
				var d = bh(a);
				c(d);
				var e = v(d, Fl);
				re(a, b, function (f) {
					f.C(e)
				});
				return d
			}
			
			function Fl(a, b) {
				var c = n(b, "ymetrikaEvent");
				c && a.J(n(c, "type"), c)
			}
			
			function re(a, b, c, d) {
				void 0 === c && (c = C);
				void 0 === d && (d = !1);
				var e = ib(a);
				if (b && O(b.push)) {
					var f = b.push;
					b.push = function () {
						var g = na(arguments), h = g[0];
						d && e.J(h);
						g = f.apply(b, g);
						d || e.J(h);
						return g
					};
					c(e);
					D(e.J, b);
					return e
				}
			}
			
			function ae(a) {
				a = L(a);
				var b = a.b("dataLayer", []);
				a.l("dataLayer", b);
				return b
			}
			
			function Qk(a, b) {
				var c, d;
				a.push((c = {}, c.ymetrikaEvent = (d = {}, d.type = b,
					d), c))
			}
			
			function yf(a, b, c) {
				function d() {
					f = 0;
					g && (g = !1, f = pa(a, d, c), e.J(h))
				}
				
				var e = ib(a), f, g = !1, h;
				b.C(function (k) {
					g = !0;
					h = k;
					f || d();
					return C
				});
				return e
			}
			
			function Gl(a, b) {
				return a.clearInterval(b)
			}
			
			function Hl(a, b, c, d) {
				return a.setInterval(x(a, "i.err." + (d || "def"), b), c)
			}
			
			function pa(a, b, c, d) {
				return cd(a, x(a, "d.err." + (d || "def"), b), c)
			}
			
			function bh(a) {
				var b = {};
				return {
					C: function (c, d) {
						D(function (e) {
							n(b, e) || (b[e] = ib(a));
							b[e].C(d)
						}, c.split(","));
						return this
					}, Bb: function (c, d) {
						D(function (e) {
							n(b, e) && b[e].Bb(d)
						}, c.split(","));
						return this
					}, J: function (c, d) {
						return S(function (e, f) {
							return n(b, f) ? e.concat(x(a, "e." + f, b[f].J)(d)) : e
						}, [], c.split(","))
					}
				}
			}
			
			function ib(a) {
				var b = [], c = {};
				c.xb = b;
				c.C = q(ca("push", b), v(c, K));
				c.Bb = q(se(ub(a))(b), se(ca("splice", b))(1), v(c, K));
				c.J = q(K, se(za), Fg(b));
				return c
			}
			
			function A(a, b, c) {
				return function () {
					return x(arguments[0], a, b, c).apply(this, arguments)
				}
			}
			
			function x(a, b, c, d, e) {
				var f = c || Ob;
				return function () {
					var g = d;
					try {
						g = f.apply(e || null, arguments)
					} catch (h) {
						bg(a, b, h)
					}
					return g
				}
			}
			
			function pe(a, b) {
				var c = b || Wg(a),
					d = c[0];
				c = c[1];
				return !isNaN(d) && O(c) ? Math.round(c() + d) : a.Date.now ? a.Date.now() : (new a.Date).getTime()
			}
			
			function Wg(a) {
				a = te(a);
				var b = n(a, "timing.navigationStart"), c = n(a, "now");
				c && (c = E(c, a));
				return [b, c]
			}
			
			function te(a) {
				return n(a, "performance") || n(a, "webkitPerformance")
			}
			
			function bg(a, b, c) {
				var d, e, f, g, h;
				if (!(.01 >= a.Math.random())) {
					var k = "u.a.e", l = "";
					c && ("object" === typeof c ? (k = c.message, l = "string" === typeof c.stack && c.stack.replace(/\n/g, "\\n") || "n.s.e.s") : k = "" + c);
					if (!(Il(k) || Oa(q(ca("indexOf", k), sa(-1),
						Tb), Jl) || Kl(k) && .1 <= a.Math.random())) {
						b = (d = {}, d.jserrs = (e = {}, e[la.ta] = (f = {}, f[k] = (g = {}, g[b] = (h = {}, h[a.location.href] = l, h), g), f), e), d);
						a:{
							var m;
							d = la.aa + "//mc.yandex.ru/watch/" + la.Zb;
							try {
								var p = ue(a, "er")[0];
								var u = void 0 === p ? [] : p;
								var r = u[1];
								var w = void 0 === r ? null : r
							} catch (y) {
								break a
							}
							p = (m = {}, m["browser-info"] = "ar:1:pv:1:v:" + la.ta + ":vf:" + wc.version, m["page-url"] = a.location && "" + a.location.href, m);
							a = Ab(a, b);
							if (w && a) w(d, {na: p, W: [], K: "site-info=" + oe(a)})["catch"](C)
						}
					}
				}
			}
			
			function Db(a) {
				return I(function (b) {
					return !b ||
					N(b, a) ? b : 0
				}, Eb)
			}
			
			function ch(a) {
				var b = n(a, "navigator.sendBeacon");
				return b && ka("sendBeacon", b) && !Tc(a) ? Ll(a, E(b, n(a, "navigator"))) : !1
			}
			
			function ve(a) {
				return eb(a) ? Ml(a) : !1
			}
			
			function qc(a, b, c) {
				void 0 === c && (c = null);
				a.eb || (a.eb = Nl());
				b && !Za(c) && a.eb.l(b, c);
				return a.eb
			}
			
			function Ol(a, b) {
				try {
					delete a[b]
				} catch (c) {
					a[b] = void 0
				}
			}
			
			function Ta(a, b, c) {
				var d = V(c);
				V(b) && d ? (d = 1, b = 1073741824) : d ? d = 1 : (d = b, b = c);
				return a.Math.floor(a.Math.random() * (b - d)) + d
			}
			
			function Nc(a, b) {
				return a.isFinite(b) && !a.isNaN(b) && "[object Number]" ===
					we(b)
			}
			
			function xc(a) {
				var b = eb(a);
				return b ? Pl(a, b) : !1
			}
			
			function Lf(a, b, c) {
				var d = La(b);
				return d && If(a, b, Z(Boolean, ["p", Ql[d], "c"]), dh(a), c)
			}
			
			function Kf(a, b) {
				var c = Lc(xe, a, b);
				if (!c) {
					var d = Lc("div", a, b);
					d && (Fd(xe + ",div", a, d).length || (c = d))
				}
				return c
			}
			
			function If(a, b, c, d, e) {
				return S(function (f, g) {
					var h = null;
					g in eh ? h = b.getAttribute && b.getAttribute(eh[g]) : g in Ub && (h = "p" === g ? Ub[g](a, b, e) : "c" === g ? Ub[g](a, b, d) : Ub[g](a, b));
					h && (h = h.slice(0, fh[g] || 100), f[g] = ye[g] ? "" + sc(h) : h);
					return f
				}, {}, c)
			}
			
			function Pf(a, b, c) {
				if (a.document.querySelectorAll &&
					ka("querySelectorAll", n(a, "Element.prototype.querySelectorAll"))) return xa(c.querySelectorAll(b));
				var d = gh(b.split(" "), c);
				return Z(function (e, f) {
					return ub(a)(e, d) === f
				}, d)
			}
			
			function gh(a, b) {
				var c = P(a), d = c.shift();
				if (!d) return [];
				d = b.getElementsByTagName(d);
				return c.length ? vb(v(c, gh), xa(d)) : xa(d)
			}
			
			function Fd(a, b, c) {
				return c ? (a = c.querySelectorAll(a)) ? xa(a) : [] : []
			}
			
			function gc(a, b) {
				var c = a.document, d = F({type: "text/javascript", charset: "utf-8", async: !0}, b), e = eb(a);
				if (e) {
					var f = e("script");
					hh(Na, fb(function (l) {
						var m =
							l[0];
						l = l[1];
						"async" === m && l ? f.async = !0 : f[m] = l
					}))(d);
					try {
						var g = qb("getElementsByTagName", c), h = g("head")[0];
						if (!h) {
							var k = g("html")[0];
							h = e("head");
							k && k.appendChild(h)
						}
						h.insertBefore(f, h.firstChild);
						return f
					} catch (l) {
					}
				}
			}
			
			function Rl(a, b) {
				var c = Ia(a) ? a : [a];
				b = b || document;
				if (b.querySelectorAll) {
					var d = B(", ", I(function (e) {
						return "." + e
					}, c));
					return xa(b.querySelectorAll(d))
				}
				if (b.getElementsByClassName) return vb(q(ca("getElementsByClassName", b), xa), c);
				d = b.getElementsByTagName("*");
				c = "(" + B("|", c) + ")";
				return Z(v(c,
					nb), xa(d))
			}
			
			function ih(a, b, c) {
				for (var d = "", e = jh(), f = La(b) || "*"; b && b.parentNode && !N(f, ["BODY", "HTML"]);) d += e[f] || "*", d += kh(a, b, c) || "", b = b.parentElement, f = La(b) || "*";
				return zb(d, 128)
			}
			
			function kh(a, b, c) {
				if (a = dd(a, b)) {
					a = a.childNodes;
					for (var d = b && b.nodeName, e = 0, f = 0; f < a.length; f += 1) if (d === (a[f] && a[f].nodeName)) {
						if (b === a[f]) return e;
						c && a[f] === c || (e += 1)
					}
				}
				return 0
			}
			
			function dd(a, b) {
				var c = n(a, "document");
				if (!b || b === c.documentElement) return null;
				if (b === Vb(a)) return c.documentElement;
				c = null;
				try {
					c = b.parentNode
				} catch (d) {
				}
				return c
			}
			
			function Xd(a, b) {
				var c = ze(a, b), d = c.left;
				c = c.top;
				var e = ed(a, b);
				return [d, c, e[0], e[1]]
			}
			
			function ed(a, b) {
				var c = n(a, "document");
				return b === Vb(a) || b === c.documentElement ? of(a) : (c = lh(b)) ? [c.width, c.height] : [b.offsetWidth, b.offsetHeight]
			}
			
			function ze(a, b) {
				var c = b, d = n(a, "document"), e = La(c);
				if (!c || !c.ownerDocument || "PARAM" === e || c === Vb(a) || c === d.documentElement) return {
					left: 0,
					top: 0
				};
				if (d = c.getBoundingClientRect && lh(c)) return c = Ld(a), {
					left: Math.round(d.left + c.x),
					top: Math.round(d.top + c.y)
				};
				for (e = d = 0; c;) d += c.offsetLeft,
					e += c.offsetTop, c = c.offsetParent;
				return {left: d, top: e}
			}
			
			function Lc(a, b, c) {
				if (!(b && b.Element && b.Element.prototype && b.document)) return null;
				if (b.Element.prototype.closest && ka("closest", b.Element.prototype.closest) && c.closest) return c.closest(a);
				var d = $f(b);
				if (d) {
					for (; c && 1 === c.nodeType && !d.call(c, a);) c = c.parentElement || c.parentNode;
					return c && 1 === c.nodeType ? c : null
				}
				if (b.document.querySelectorAll && ka("querySelectorAll", n(b, "Element.prototype.querySelectorAll"))) {
					for (a = xa((b.document || b.ownerDocument).querySelectorAll(a)); c &&
					1 === c.nodeType && -1 === ub(b)(c, a);) c = c.parentElement || c.parentNode;
					return c && 1 === c.nodeType ? c : null
				}
				return null
			}
			
			function mh(a) {
				return fd(a) && !Oa(sa(a.type), Sl) ? nh(a) ? !a.checked : !a.value : Tl(a) ? !a.value : Ul(a) ? 0 > a.selectedIndex : !0
			}
			
			function La(a) {
				if (a) try {
					var b = a.nodeName;
					if (Va(b)) return b;
					b = a.tagName;
					if (Va(b)) return b
				} catch (c) {
				}
			}
			
			function oh(a, b) {
				var c = a.document.getElementsByTagName("form");
				return ub(a)(b, xa(c))
			}
			
			function Vl(a, b, c) {
				c = qb("dispatchEvent", c || a.document);
				var d = null, e = n(a, "Event.prototype.constructor");
				if (e && (ka("(Event|Object|constructor)", e) || gd(a) && "[object Event]" === "" + e)) try {
					d = new a.Event(b)
				} catch (f) {
					if ((a = qb("createEvent", n(a, "document"))) && O(a)) {
						try {
							d = a(b)
						} catch (g) {
						}
						d && d.initEvent && d.initEvent(b, !1, !1)
					}
				}
				d && c(d)
			}
			
			function lh(a) {
				try {
					return a.getBoundingClientRect && a.getBoundingClientRect()
				} catch (b) {
					return "object" === typeof b && null !== b && 16389 === (b.zb && b.zb & 65535) ? {
						top: 0,
						bottom: 0,
						left: 0,
						width: 0,
						height: 0,
						right: 0
					} : null
				}
			}
			
			function of(a) {
				var b = Jb(a);
				a = Kd(a);
				return [Math.max(b.scrollWidth, a[0]), Math.max(b.scrollHeight,
					a[1])]
			}
			
			function Ld(a) {
				var b = Vb(a), c = n(a, "document");
				return {
					x: a.pageXOffset || c.documentElement && c.documentElement.scrollLeft || b && b.scrollLeft || 0,
					y: a.pageYOffset || c.documentElement && c.documentElement.scrollTop || b && b.scrollTop || 0
				}
			}
			
			function Kd(a) {
				var b = n(a, "visualViewport.width");
				var c = n(a, "visualViewport.height"), d = n(a, "visualViewport.scale");
				if (b = Ba(b) || Ba(c) ? null : [Math.floor(b), Math.floor(c), d]) return c = b[2], [a.Math.round(b[0] * c), a.Math.round(b[1] * c)];
				b = Jb(a);
				return [n(b, "clientWidth") || a.innerWidth,
					n(b, "clientHeight") || a.innerHeight]
			}
			
			function Jb(a) {
				var b = n(a, "document") || {}, c = b.documentElement;
				return "CSS1Compat" === b.compatMode ? c : Vb(a) || c
			}
			
			function Vb(a) {
				a = n(a, "document");
				try {
					return a.getElementsByTagName("body")[0]
				} catch (b) {
					return null
				}
			}
			
			function nb(a, b) {
				try {
					return (new RegExp("(?:^|\\s)" + a + "(?:\\s|$)")).test(b.className)
				} catch (c) {
					return !1
				}
			}
			
			function cb(a) {
				var b;
				try {
					if (b = a.target || a.srcElement) !b.ownerDocument && b.documentElement ? b = b.documentElement : b.ownerDocument !== document && (b = null)
				} catch (c) {
				}
				return b
			}
			
			function Rb(a) {
				var b = a && a.parentNode;
				b && b.removeChild(a)
			}
			
			function Hf(a) {
				if (Ba(a)) return !1;
				a = a.nodeType;
				return 3 === a || 8 === a
			}
			
			function Wb(a) {
				var b;
				if (b = n(a, "XMLHttpRequest")) if (b = "withCredentials" in new a.XMLHttpRequest) {
					a:{
						if (Wl.test(a.location.host) && a.opera && O(a.opera.version) && (b = a.opera.version(), "string" === typeof b && "12" === b.split(".")[0])) {
							b = !0;
							break a
						}
						b = !1
					}
					b = !b
				}
				return b ? Xl(a) : !1
			}
			
			function Yl(a, b, c, d, e, f, g, h) {
				if (4 === b.readyState) if (200 === b.status || e || g(c), e) 200 === b.status ? f(b.responseText) : g($c("http." +
					b.status + ".st." + b.statusText + ".rt." + ("" + b.responseText).substring(0, 50))); else {
					e = null;
					if (d) try {
						(e = wb(a, b.responseText)) || g(c)
					} catch (k) {
						g(c)
					}
					f(e)
				}
				return h
			}
			
			function ph(a, b, c) {
				(c = dc(c)) && (a += "?" + c);
				b.K && (a += (c ? "&" : "?") + b.K);
				return a
			}
			
			function Ab(a, b) {
				try {
					return a.JSON.stringify(b)
				} catch (c) {
					return null
				}
			}
			
			function dc(a) {
				return a ? q(Na, Pd(function (b, c) {
					var d = c[0], e = c[1];
					V(e) || Ba(e) || b.push(d + "=" + oe(e));
					return b
				}, []), oc("&"))(a) : ""
			}
			
			function oe(a) {
				try {
					return encodeURIComponent(a)
				} catch (b) {
				}
				a = B("", Z(function (b) {
					return 55296 >=
						b.charCodeAt(0)
				}, a.split("")));
				return encodeURIComponent(a)
			}
			
			function qh() {
				var a = na(arguments);
				return Ob(jb(a))
			}
			
			function jb(a) {
				var b = "";
				Ia(a) ? b = B(".", a) : Va(a) && (b = a);
				return $c("err.kn(" + la.ta + ")" + b)
			}
			
			function Zl(a) {
				this.message = a
			}
			
			function rh(a, b, c, d, e) {
				var f = a.addEventListener && a.removeEventListener, g = !f && a.attachEvent && a.detachEvent;
				if (f || g) if (e = e ? f ? "removeEventListener" : "detachEvent" : f ? "addEventListener" : "attachEvent", f) a[e](b, c, d); else a[e]("on" + b, c)
			}
			
			function M(a) {
				return S(function (b, c) {
					var d = n(a,
						"location." + c);
					b[c] = d ? "" + d : "";
					return b
				}, {}, $l)
			}
			
			function sh(a) {
				return function (b) {
					var c = b || {};
					return {
						o: v(c, K), b: function (d, e) {
							var f = c[d];
							return V(f) && !V(e) ? e : f
						}, l: function (d, e) {
							c[d] = e;
							return this
						}, ab: function (d, e) {
							return "" === e || Ba(e) ? this : this.l(d, e)
						}, $a: v(c, a)
					}
				}
			}
			
			function am(a, b, c, d, e) {
				var f = "object" === typeof a ? a : {id: a, M: d, ua: e, H: c};
				a = S(function (g, h) {
					var k = h[1], l = k.Ic;
					k = f[k.Cb];
					g[h[0]] = l ? l(k) : k;
					return g
				}, {}, Na(b));
				th(a, a.H || {});
				return a
			}
			
			function bm(a, b) {
				return S(function (c, d) {
						c[b[d[0]].Cb] = d[1];
						return c
					},
					{}, Na(a))
			}
			
			function th(a, b) {
				var c = Q(a), d = n(b, "__ym.turbo_page"), e = n(b, "__ym.turbo_page_id");
				rb[c] || (rb[c] = {});
				if (d || e) rb[c].Wc = d, rb[c].Xc = e
			}
			
			function cm(a) {
				return Ae(a) || hd(a) || /mobile/i.test(Ya(a)) || !V(n(a, "orientation"))
			}
			
			function le(a) {
				return N("prerender", I(v(n(a, "document"), n), ["webkitVisibilityState", "visibilityState"]))
			}
			
			function dm(a) {
				for (var b = [], c = a.length - 1; 0 <= c; --c) b[a.length - 1 - c] = a[c];
				return b
			}
			
			function Ja(a, b) {
				D(q(K, ca("push", a)), b);
				return a
			}
			
			function xa(a) {
				return a ? Ia(a) ? a : id ? id(a) : "number" ===
				typeof a.length && 0 <= a.length ? uh(a) : [] : []
			}
			
			function ij(a) {
				if (0 > a) return [];
				for (var b = [], c = 0; c <= a; c += 1) b.push(c);
				return b
			}
			
			function em(a, b) {
				if (!uc(a)) return !0;
				try {
					b.call({0: !0, length: -Math.pow(2, 32) + 1}, function () {
						throw 1;
					})
				} catch (c) {
					return !1
				}
				return !0
			}
			
			function jd(a, b, c) {
				return c ? a : b
			}
			
			function ob(a, b, c) {
				try {
					if (O(b)) {
						var d = na(arguments).slice(3);
						Ba(c) ? b.apply(void 0, d) : E.apply(void 0, P([b, c], d))()
					}
				} catch (e) {
					cd(a, v(e, Ob), 0)
				}
			}
			
			function Ob(a) {
				throw a;
			}
			
			function cd(a, b, c) {
				return qb("setTimeout", a)(b, c)
			}
			
			function Ua(a,
			            b) {
				return qb("clearTimeout", a)(b)
			}
			
			function kd() {
				return []
			}
			
			function ld() {
				return {}
			}
			
			function qb(a, b) {
				var c = n(b, a), d = n(b, "constructor.prototype." + a) || c;
				try {
					if (d && d.apply) return function () {
						return d.apply(b, arguments)
					}
				} catch (e) {
					return c
				}
				return d
			}
			
			function yc(a, b) {
				return function () {
					var c = na(arguments), d = c[0];
					c = c.slice(1);
					var e = L(d), f = e.b("m680", {}), g = n(f, a);
					g || (g = t(b), f[a] = g, e.l("m680", f));
					return g.apply(void 0, P([d], c))
				}
			}
			
			function za(a, b) {
				return b ? a(b) : a()
			}
			
			function t(a, b) {
				var c = [], d = [];
				var e = b ? b : K;
				return function () {
					var f =
						na(arguments), g = e.apply(void 0, f), h = vh(g, d);
					if (-1 !== h) return c[h];
					f = a.apply(void 0, f);
					c.push(f);
					d.push(g);
					return f
				}
			}
			
			function Tb(a) {
				return !a
			}
			
			function hb(a, b) {
				return b
			}
			
			function K(a) {
				return a
			}
			
			function ub(a) {
				if (Be) return Be;
				var b = !1;
				try {
					b = [].indexOf && 0 === [void 0].indexOf(void 0)
				} catch (d) {
				}
				var c = a.Array && a.Array.prototype && qa(a.Array.prototype.indexOf, "indexOf");
				return Be = a = b && c ? function (d, e) {
					return c.call(e, d)
				} : fm
			}
			
			function fm(a, b) {
				for (var c = 0; c < b.length; c += 1) if (b[c] === a) return c;
				return -1
			}
			
			function gm(a,
			            b) {
				for (var c = "", d = 0; d < b; d += 1) c += a;
				return c
			}
			
			function hm(a) {
				return V(a) ? [] : zc(function (b, c) {
					b.push([c, a[c]]);
					return b
				}, [], wh(a))
			}
			
			function im(a, b) {
				return zc(function (c, d, e) {
					d = a(d, e);
					return c.concat(Ia(d) ? d : [d])
				}, [], b)
			}
			
			function jm(a, b) {
				return zc(function (c, d, e) {
					c.push(a(d, e));
					return c
				}, [], b)
			}
			
			function km() {
				var a = na(arguments), b = a[0];
				for (a = a.slice(1); a.length;) {
					var c = a.shift(), d;
					for (d in c) nc(c, d) && (b[d] = c[d]);
					nc(c, "toString") && (b.toString = c.toString)
				}
				return b
			}
			
			function wh(a) {
				var b = [], c;
				for (c in a) nc(a,
					c) && b.push(c);
				return b
			}
			
			function lm(a, b) {
				return 1 <= xh(sa(a), b).length
			}
			
			function xh(a, b) {
				return zc(function (c, d, e) {
					a(d, e) && c.push(d);
					return c
				}, [], b)
			}
			
			function nc(a, b) {
				return Ba(a) ? !1 : Ce.call(a, b)
			}
			
			function Ia(a) {
				if (Ac) return Ac(a);
				(Ac = qa(Array.isArray, "isArray")) || (Ac = mm);
				return Ac(a)
			}
			
			function q() {
				var a = na(arguments), b = a.shift();
				return function () {
					var c = b.apply(void 0, arguments);
					return S(yh, c, a)
				}
			}
			
			function cc(a, b) {
				void 0 === b && (b = {});
				if (!a || 1 > a.length) return b;
				S(function (c, d, e) {
					if (e === a.length - 1) return c;
					e === a.length - 2 ? c[d] = a[e + 1] : c[d] || (c[d] = {});
					return c[d]
				}, b, a);
				return b
			}
			
			function n(a, b) {
				return a ? S(function (c, d) {
					if (Ba(c)) return c;
					try {
						return c[d]
					} catch (e) {
					}
					return null
				}, a, b.split(".")) : null
			}
			
			function Pd(a, b) {
				return G([a, b], S)
			}
			
			function Ka(a) {
				return ca("test", a)
			}
			
			function ca(a, b) {
				return E(b[a], b)
			}
			
			function v(a, b) {
				return G([a], b)
			}
			
			function G(a, b) {
				return E.apply(void 0, P([b, null], a))
			}
			
			function nm() {
				var a = na(arguments), b = a[0], c = a[1], d = a.slice(2);
				return function () {
					var e = P(d, na(arguments));
					if (Function.prototype.call) return Function.prototype.call.apply(b,
						P([c], e));
					if (c) {
						for (var f = "_b"; c[f];) f += "_" + f.length;
						c[f] = b;
						e = c[f] && zh(f, e, c);
						delete c[f];
						return e
					}
					return zh(b, e)
				}
			}
			
			function zh(a, b, c) {
				void 0 === b && (b = []);
				c = c || {};
				var d = b.length, e = a;
				O(e) && (e = "d", c[e] = a);
				var f;
				d ? 1 === d ? f = c[e](b[0]) : 2 === d ? f = c[e](b[0], b[1]) : 3 === d ? f = c[e](b[0], b[1], b[2]) : 4 === d && (f = c[e](b[0], b[1], b[2], b[3])) : f = c[e]();
				return f
			}
			
			function zc(a, b, c) {
				for (var d = 0, e = c.length; d < e;) b = a(b, c[d], d), d += 1;
				return b
			}
			
			function ic(a) {
				return !Za(a) && !V(a) && "[object Object]" === we(a)
			}
			
			function Ba(a) {
				return V(a) ||
					Za(a)
			}
			
			function O(a) {
				return "function" === typeof a
			}
			
			function se(a) {
				return aa(function (b, c) {
					return a(c, b)
				})
			}
			
			function aa() {
				var a = na(arguments), b = a.shift();
				return function () {
					var c = na(arguments);
					return b.length > c.length + a.length ? aa.apply(void 0, P([b], a, c)) : b.apply(void 0, P(a, c))
				}
			}
			
			function md(a) {
				return function (b) {
					return function (c) {
						return a(c, b)
					}
				}
			}
			
			function ra(a) {
				return function (b) {
					return function (c) {
						return a(b, c)
					}
				}
			}
			
			function yh(a, b) {
				return b(a)
			}
			
			function om(a, b) {
				for (var c = "", d = 0; d < b.length; d += 1) c += "" + (d ? a :
					"") + b[d];
				return c
			}
			
			function na(a) {
				if (id) try {
					return id(a)
				} catch (b) {
				}
				return uh(a)
			}
			
			function uh(a) {
				for (var b = a.length, c = [], d = 0; d < b; d += 1) c.push(a[d]);
				return c
			}
			
			function De(a, b) {
				De = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (c, d) {
					c.__proto__ = d
				} || function (c, d) {
					for (var e in d) d.hasOwnProperty(e) && (c[e] = d[e])
				};
				return De(a, b)
			}
			
			function Ak(a) {
				return a.replace(/\^/g, "\\^").replace(/\$/g, "\\$").replace(/\./g, "\\.").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\|/g, "\\|").replace(/\(/g, "\\(").replace(/\)/g,
					"\\)").replace(/\?/g, "\\?").replace(/\*/g, "\\*").replace(/\+/g, "\\+").replace(/\{/g, "\\{").replace(/\}/g, "\\}")
			}
			
			function zb(a, b) {
				if (a) {
					var c = ("" + a).replace(lg, "");
					return b && c.length > b ? c.substr(0, b) : c
				}
				return ""
			}
			
			function Qi(a) {
				return "" + a
			}
			
			function Ee(a, b) {
				var c;
				if (!(c = !a)) {
					if (Ah) c = Ah.call(a, b); else a:{
						c = 0;
						for (var d = a.length - b.length, e = 0; e < a.length; e += 1) {
							c = a[e] === b[c] ? c + 1 : 0;
							if (c === b.length) {
								c = e - b.length + 1;
								break a
							}
							if (!c && e > d) break
						}
						c = -1
					}
					c = -1 === c
				}
				return !c
			}
			
			function Va(a) {
				return "string" === typeof a
			}
			
			function we(a) {
				return Object.prototype.toString.call(a)
			}
			
			function qa(a, b) {
				return ka(b, a) && a
			}
			
			function ka(a, b) {
				var c = nd(a, b);
				b && !c && Fe.push([a, b]);
				return c
			}
			
			function nd(a, b) {
				if (!b || "function" !== typeof b) return !1;
				var c = new RegExp("function\\s*(" + a + ")?\\s*\\(\\)\\s*\\{\\s*\\[native[\\s-]code\\]\\s*\\}", "i");
				try {
					return c.test("" + b)
				} catch (d) {
				}
				return !1
			}
			
			function C() {
			}
			
			function pm(a, b) {
				function c() {
					this.constructor = a
				}
				
				De(a, b);
				a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
			}
			
			function P() {
				for (var a = 0, b = 0, c = arguments.length; b < c; b++) a += arguments[b].length;
				a = Array(a);
				var d = 0;
				for (b = 0; b < c; b++) for (var e = arguments[b], f = 0, g = e.length; f < g; f++, d++) a[d] = e[f];
				return a
			}
			
			function sc(a) {
				a = "" + a;
				for (var b = 2166136261, c = a.length, d = 0; d < c; d += 1) b ^= a.charCodeAt(d), b += (b << 1) + (b << 4) + (b << 7) + (b << 8) + (b << 24);
				return b >>> 0
			}
			
			function qm() {
			}
			
			function rm(a, b) {
				return function () {
					a.apply(b, arguments)
				}
			}
			
			function ea(a) {
				if (!(this instanceof ea)) throw new TypeError("Promises must be constructed via new");
				if ("function" !== typeof a) throw new TypeError("not a function");
				this.V = 0;
				this.mb = !1;
				this.Y =
					void 0;
				this.ea = [];
				Bh(a, this)
			}
			
			function Ch(a, b) {
				for (; 3 === a.V;) a = a.Y;
				0 === a.V ? a.ea.push(b) : (a.mb = !0, ea.ob(function () {
					var c = 1 === a.V ? b.Nc : b.Oc;
					if (null === c) (1 === a.V ? Ge : Bc)(b.Wa, a.Y); else {
						try {
							var d = c(a.Y)
						} catch (e) {
							Bc(b.Wa, e);
							return
						}
						Ge(b.Wa, d)
					}
				}))
			}
			
			function Ge(a, b) {
				try {
					if (b === a) throw new TypeError("A promise cannot be resolved with itself.");
					if (b && ("object" === typeof b || "function" === typeof b)) {
						var c = b.then;
						if (b instanceof ea) {
							a.V = 3;
							a.Y = b;
							He(a);
							return
						}
						if ("function" === typeof c) {
							Bh(rm(c, b), a);
							return
						}
					}
					a.V = 1;
					a.Y =
						b;
					He(a)
				} catch (d) {
					Bc(a, d)
				}
			}
			
			function Bc(a, b) {
				a.V = 2;
				a.Y = b;
				He(a)
			}
			
			function He(a) {
				2 === a.V && 0 === a.ea.length && ea.ob(function () {
					a.mb || ea.hc(a.Y)
				});
				for (var b = 0, c = a.ea.length; b < c; b++) Ch(a, a.ea[b]);
				a.ea = null
			}
			
			function sm(a, b, c) {
				this.Nc = "function" === typeof a ? a : null;
				this.Oc = "function" === typeof b ? b : null;
				this.Wa = c
			}
			
			function Bh(a, b) {
				var c = !1;
				try {
					a(function (d) {
						c || (c = !0, Ge(b, d))
					}, function (d) {
						c || (c = !0, Bc(b, d))
					})
				} catch (d) {
					c || (c = !0, Bc(b, d))
				}
			}
			
			function wb(a, b) {
				if (!b) return null;
				try {
					return a.JSON.parse(b)
				} catch (c) {
					return null
				}
			}
			
			function bd(a, b, c, d, e, f) {
				if (Of(a, jc, b)) {
					b = [b + "=" + encodeURIComponent(c)];
					b = b.concat(tm(a));
					d && (c = new Date, c.setTime(c.getTime() + 6E4 * d), b.push("expires=" + c.toUTCString()));
					e && (d = e.replace(um, ""), b.push("domain=" + d));
					b.push("path=" + (f || "/"));
					f = B(";", b);
					try {
						a.document.cookie = f
					} catch (g) {
					}
				}
			}
			
			function fc(a, b, c) {
				void 0 === b && (b = "_ym_");
				void 0 === c && (c = "");
				var d = vm(a), e = 1 === (d || "").split(".").length ? d : "." + d, f = c ? "_" + c : "";
				return {
					Ma: function (g, h, k) {
						bd(a, "" + b + g + f, "", -100, h || e, k);
						return this
					}, b: function (g) {
						return jc(a,
							"" + b + g + f)
					}, l: function (g, h, k, l, m) {
						bd(a, "" + b + g + f, h, k, l || e, m);
						return this
					}
				}
			}
			
			function Yd(a, b) {
				var c = wm(a);
				return c ? (c.href = b, {
					protocol: c.protocol,
					host: c.host,
					port: c.port,
					hostname: c.hostname,
					hash: c.hash,
					search: c.search,
					query: c.search.replace(/^\?/, ""),
					pathname: c.pathname || "/",
					path: (c.pathname || "/") + c.search,
					href: c.href
				}) : {}
			}
			
			function Pa(a, b) {
				a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
				b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
				var c = [0, 0, 0, 0];
				c[3] += a[3] * b[3];
				c[2] += c[3] >>> 16;
				c[3] &= 65535;
				c[2] += a[2] *
					b[3];
				c[1] += c[2] >>> 16;
				c[2] &= 65535;
				c[2] += a[3] * b[2];
				c[1] += c[2] >>> 16;
				c[2] &= 65535;
				c[1] += a[1] * b[3];
				c[0] += c[1] >>> 16;
				c[1] &= 65535;
				c[1] += a[2] * b[2];
				c[0] += c[1] >>> 16;
				c[1] &= 65535;
				c[1] += a[3] * b[1];
				c[0] += c[1] >>> 16;
				c[1] &= 65535;
				c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0];
				c[0] &= 65535;
				return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
			}
			
			function sb(a, b) {
				a = [a[0] >>> 16, a[0] & 65535, a[1] >>> 16, a[1] & 65535];
				b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
				var c = [0, 0, 0, 0];
				c[3] += a[3] + b[3];
				c[2] += c[3] >>> 16;
				c[3] &= 65535;
				c[2] += a[2] + b[2];
				c[1] += c[2] >>>
					16;
				c[2] &= 65535;
				c[1] += a[1] + b[1];
				c[0] += c[1] >>> 16;
				c[1] &= 65535;
				c[0] += a[0] + b[0];
				c[0] &= 65535;
				return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
			}
			
			function Xb(a, b) {
				b %= 64;
				if (32 === b) return [a[1], a[0]];
				if (32 > b) return [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b];
				b -= 32;
				return [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]
			}
			
			function Ma(a, b) {
				b %= 64;
				return 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0]
			}
			
			function Y(a, b) {
				return [a[0] ^ b[0], a[1] ^ b[1]]
			}
			
			function Dh(a) {
				a = Y(a, [0, a[0] >>> 1]);
				a = Pa(a, [4283543511, 3981806797]);
				a = Y(a, [0, a[0] >>> 1]);
				a = Pa(a, [3301882366, 444984403]);
				return a = Y(a, [0, a[0] >>> 1])
			}
			
			function xm(a, b) {
				void 0 === b && (b = 210);
				var c = a || "", d = b || 0, e = c.length % 16, f = c.length - e, g = [0, d];
				d = [0, d];
				var h = [2277735313, 289559509], k = [1291169091, 658871167], l;
				for (l = 0; l < f; l += 16) {
					var m = [c.charCodeAt(l + 4) & 255 | (c.charCodeAt(l + 5) & 255) << 8 | (c.charCodeAt(l + 6) & 255) << 16 | (c.charCodeAt(l + 7) & 255) << 24, c.charCodeAt(l) & 255 | (c.charCodeAt(l + 1) & 255) << 8 | (c.charCodeAt(l + 2) & 255) << 16 | (c.charCodeAt(l + 3) & 255) << 24];
					var p = [c.charCodeAt(l + 12) & 255 | (c.charCodeAt(l + 13) & 255) <<
					8 | (c.charCodeAt(l + 14) & 255) << 16 | (c.charCodeAt(l + 15) & 255) << 24, c.charCodeAt(l + 8) & 255 | (c.charCodeAt(l + 9) & 255) << 8 | (c.charCodeAt(l + 10) & 255) << 16 | (c.charCodeAt(l + 11) & 255) << 24];
					m = Pa(m, h);
					m = Xb(m, 31);
					m = Pa(m, k);
					g = Y(g, m);
					g = Xb(g, 27);
					g = sb(g, d);
					g = sb(Pa(g, [0, 5]), [0, 1390208809]);
					p = Pa(p, k);
					p = Xb(p, 33);
					p = Pa(p, h);
					d = Y(d, p);
					d = Xb(d, 31);
					d = sb(d, g);
					d = sb(Pa(d, [0, 5]), [0, 944331445])
				}
				m = [0, 0];
				p = [0, 0];
				switch (e) {
					case 15:
						p = Y(p, Ma([0, c.charCodeAt(l + 14)], 48));
					case 14:
						p = Y(p, Ma([0, c.charCodeAt(l + 13)], 40));
					case 13:
						p = Y(p, Ma([0, c.charCodeAt(l +
							12)], 32));
					case 12:
						p = Y(p, Ma([0, c.charCodeAt(l + 11)], 24));
					case 11:
						p = Y(p, Ma([0, c.charCodeAt(l + 10)], 16));
					case 10:
						p = Y(p, Ma([0, c.charCodeAt(l + 9)], 8));
					case 9:
						p = Y(p, [0, c.charCodeAt(l + 8)]), p = Pa(p, k), p = Xb(p, 33), p = Pa(p, h), d = Y(d, p);
					case 8:
						m = Y(m, Ma([0, c.charCodeAt(l + 7)], 56));
					case 7:
						m = Y(m, Ma([0, c.charCodeAt(l + 6)], 48));
					case 6:
						m = Y(m, Ma([0, c.charCodeAt(l + 5)], 40));
					case 5:
						m = Y(m, Ma([0, c.charCodeAt(l + 4)], 32));
					case 4:
						m = Y(m, Ma([0, c.charCodeAt(l + 3)], 24));
					case 3:
						m = Y(m, Ma([0, c.charCodeAt(l + 2)], 16));
					case 2:
						m = Y(m, Ma([0, c.charCodeAt(l +
							1)], 8));
					case 1:
						m = Y(m, [0, c.charCodeAt(l)]), m = Pa(m, h), m = Xb(m, 31), m = Pa(m, k), g = Y(g, m)
				}
				g = Y(g, [0, c.length]);
				d = Y(d, [0, c.length]);
				g = sb(g, d);
				d = sb(d, g);
				g = Dh(g);
				d = Dh(d);
				g = sb(g, d);
				d = sb(d, g);
				return ("00000000" + (g[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (g[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (d[1] >>> 0).toString(16)).slice(-8)
			}
			
			function Eh(a) {
				return (a = M(a).hash.split("#")[1]) ? a.split("?")[0] : ""
			}
			
			function zm(a, b) {
				var c = Eh(a);
				Fh = Hl(a, function () {
					var d = Eh(a);
					d !==
					c && (b(), c = d)
				}, 200, "t.h");
				return E(Gl, null, a, Fh)
			}
			
			function Am(a, b, c) {
				var d, e, f = b.M, g = b.jb, h = b.wa, k = L(a), l = ha((d = {}, d.wh = "1", d.pv = "1", d));
				"1" === f && a.fc && a.fc.gd && l.l("ad", "1");
				g && l.l("ut", "1");
				f = k.b("lastReferrer");
				d = M(a).href;
				h = {D: (e = {}, e["page-url"] = h || d, e["page-ref"] = f, e), F: l};
				c(h, b)["catch"](x(a, "g.s"));
				k.l("lastReferrer", d)
			}
			
			function Bm(a, b) {
				if (gd(a)) return Ua(a, b);
				Ie[b] = !0;
				return Ua(a, od[b] || 0)
			}
			
			function Cm(a, b, c) {
				function d() {
					Ie[w] = !0;
					f(!1);
					b()
				}
				
				function e() {
					Ua(a, od[w]);
					if (Ie[w]) f(!1); else {
						var H =
							Math.max(0, c - (m ? p : p + h(U) - u));
						H ? od[w] = pa(a, d, H, "u.t.d.c") : d()
					}
				}
				
				function f(H) {
					D(function (X) {
						var Ga = X[0], Qa = X[1];
						X = X[2];
						H ? r.C(Ga, Qa, X) : r.Ha(Ga, Qa, X)
					}, y)
				}
				
				var g = v(!1, f);
				if (gd(a)) return {id: pa(a, b, c, "u.t.d"), rb: g};
				var h = W(a), k = !1, l = !1, m = !0, p = 0, u = h(U), r = ja(a), w = Gh;
				Gh += 1;
				od[w] = 0;
				var y = [[a, ["blur"], function () {
					m = k = l = !0;
					p += h(U) - u;
					u = h(U);
					e()
				}], [a, ["focus"], function () {
					k || l || (p = 0);
					u = h(U);
					k = l = !0;
					m = !1;
					e()
				}], [a.document, ["click", "mousemove", "keydown", "scroll"], function () {
					l || (k = !0, m = !1, l = !0, e())
				}]];
				f(!0);
				e();
				return {
					id: w,
					rb: g
				}
			}
			
			function fk(a, b) {
				var c, d = cb(b), e = la.Ja;
				if (d && nb("ym-advanced-informer", d)) {
					var f = d.getAttribute("data-lang"), g = parseInt(d.getAttribute("data-cid") || "", 10);
					if (g || 0 === g) n(a, "Ya." + e + ".informer")((c = {}, c.i = d, c.id = g, c.lang = f, c)), c = b || window.event, c.preventDefault ? c.preventDefault() : c.returnValue = !1
				}
			}
			
			function mc(a, b, c) {
				a = b && (Ee(b.className, "ym-disable-keys") || Ee(b.className, "-metrika-nokeys"));
				return c && b ? a || !!Rl(["ym-disable-keys", "-metrika-nokeys"], b).length : a
			}
			
			function Wf(a, b) {
				return fd(b) ? "password" ===
					b.type || b.name && N(b.name.toLowerCase(), Hh) || b.id && N(b.id.toLowerCase(), Hh) : !1
			}
			
			function Ih(a, b) {
				var c = Math.max(0, Math.min(b, 65535));
				Ja(a, [c >> 8, c & 255])
			}
			
			function ua(a, b) {
				Ja(a, [b & 255])
			}
			
			function Fa(a, b, c) {
				ua(b, c);
				return !1
			}
			
			function z(a, b) {
				for (var c = Math.max(0, b | 0); 127 < c;) Ja(a, [c & 127 | 128]), c >>= 7;
				Ja(a, [c])
			}
			
			function Je(a, b) {
				z(a, b.length);
				for (var c = 0; c < b.length; c += 1) z(a, b.charCodeAt(c))
			}
			
			function Ke(a, b) {
				var c = b;
				255 < c.length && (c = c.substr(0, 255));
				a.push(c.length);
				for (var d = 0; d < c.length; d += 1) Ih(a, c.charCodeAt(d))
			}
			
			function Dm(a, b) {
				var c = [];
				if (Fa(a, c, 27)) return [];
				z(c, b);
				return c
			}
			
			function Em(a, b) {
				var c = La(b);
				if (!c) return b[ma] = -1, null;
				var d = +b[ma];
				if (!isFinite(d) || 0 >= d) return null;
				if (b.attributes) for (var e = b; e;) {
					if (e.attributes.od) return null;
					e = e.parentElement
				}
				e = 64;
				var f = dd(a, b), g = f && f[ma] ? f[ma] : 0;
				0 > g && (g = 0);
				c = (c || "").toUpperCase();
				var h = Fm()[c];
				h || (e |= 2);
				var k = kh(a, b);
				k || (e |= 4);
				var l = Xd(a, b);
				(f = f ? Xd(a, f) : null) && l[0] === f[0] && l[1] === f[1] && l[2] === f[2] && l[3] === f[3] && (e |= 8);
				yb[d].Eb = l[0] + "x" + l[1];
				yb[d].size = l[2] +
					"x" + l[3];
				b.id && "string" === typeof b.id && (e |= 32);
				f = [];
				if (Fa(a, f, 1)) return null;
				z(f, d);
				ua(f, e);
				z(f, g);
				h ? ua(f, h) : Ke(f, c);
				k && z(f, k);
				e & 8 || (z(f, l[0]), z(f, l[1]), z(f, l[2]), z(f, l[3]));
				e & 32 && Ke(f, b.id);
				ua(f, 0);
				return f
			}
			
			function Gm(a, b) {
				var c = b[ma];
				if (!c || 0 > c || !Vd(b) || !b.form || Zf(a, b.form)) return [];
				var d = oh(a, b.form);
				if (0 > d) return [];
				if (fd(b)) {
					var e = {
						text: 0,
						color: 0,
						va: 0,
						rd: 0,
						"datetime-local": 0,
						email: 0,
						zb: 0,
						Cd: 0,
						search: 0,
						Ed: 0,
						time: 0,
						url: 0,
						month: 0,
						Gd: 0,
						password: 2,
						Bd: 3,
						pd: 4,
						file: 6,
						image: 7
					};
					e = e[b.type]
				} else {
					e = {
						ld: 1,
						md: 5
					};
					var f = La(b);
					e = V(f) ? "" : e[f]
				}
				if ("number" !== typeof e) return [];
				f = -1;
				for (var g = b.form.elements, h = g.length, k = 0, l = 0; k < h; k += 1) if (g[k].name === b.name) {
					if (g[k] === b) {
						f = l;
						break
					}
					l += 1
				}
				if (0 > f) return [];
				g = [];
				if (Fa(a, g, 7)) return [];
				z(g, c);
				z(g, d);
				z(g, e);
				Je(g, b.name || "");
				z(g, f);
				return g
			}
			
			function nf(a, b, c, d, e, f, g) {
				var h;
				var k = ed(a, d);
				var l = k[0];
				for (k = k[1]; d && (!l || !k);) if (d = dd(a, d)) k = ed(a, d), l = k[0], k = k[1];
				if (!d) return [];
				l = d[ma];
				if (!l || 0 > l) return [];
				k = (h = {}, h.mousemove = 2, h.click = 32, h.dblclick = 33, h.mousedown = 4, h.mouseup =
					30, h.touch = 12, h)[c];
				if (!k) return [];
				h = [];
				d = ze(a, d);
				if (Fa(a, h, k)) return [];
				z(h, b);
				z(h, l);
				z(h, Math.max(0, e[0] - d.left));
				z(h, Math.max(0, e[1] - d.top));
				/^mouse(up|down)|click$/.test(c) && (a = f || g, ua(h, 2 > a ? 1 : a === (f ? 2 : 4) ? 4 : 2));
				return h
			}
			
			function Hm(a, b, c) {
				var d = oh(a, c);
				if (0 > d) return [];
				var e = c.elements, f = e.length;
				c = [];
				for (var g = 0; g < f; g += 1) if (!mh(e[g])) {
					var h = e[g][ma];
					h && 0 < h && c.push(h)
				}
				e = [];
				if (Fa(a, e, 11)) return [];
				z(e, b);
				z(e, d);
				z(e, c.length);
				for (a = 0; a < c.length; a += 1) z(e, c[a]);
				return e
			}
			
			function db(a, b, c) {
				void 0 === c &&
				(c = []);
				for (var d = []; b && !Tj(a, b, c); b = dd(a, b)) d.push(b);
				D(function (e) {
					yb.Ka += 1;
					var f = yb.Ka;
					e[ma] = f;
					yb[f] = {};
					f = Em(a, e);
					e = Gm(a, e);
					f && e && (Ja(c, f), Ja(c, e))
				}, Im(d));
				return c
			}
			
			function Jm(a) {
				var b = a.N;
				if (!kc || b && !b.fromElement) return Tf(a)
			}
			
			function Km(a) {
				var b = a.N;
				if (b && !b.toElement) return Wd(a)
			}
			
			function Jh(a) {
				var b = cb(a.N);
				if (b && Oc(b)) {
					var c = Sf(a, b);
					var d = ta(a.o), e = [];
					Fa(a.o, e, 17) ? a = [] : (z(e, d), z(e, b[ma]), a = e);
					return P(c, a)
				}
			}
			
			function Kh(a) {
				var b = a.o, c = a.N.target;
				if (c && Oc(c)) {
					b = db(b, c);
					var d = ta(a.o), e = [];
					Fa(a.o,
						e, 18) ? a = [] : (z(e, d), z(e, c[ma]), a = e);
					return P(b, a)
				}
			}
			
			function Lh(a) {
				var b = a.o, c = cb(a.N);
				if (!c || Wf(b, c) || mc(b, c)) return [];
				if (Vd(c)) {
					var d = L(b).b("isEU"), e = lc(b, c, d);
					d = lc(b, c);
					if (nh(c)) var f = c.checked; else f = c.value, f = e ? B("", Mh(f.split(""))) : f;
					b = db(b, c);
					e = ta(a.o);
					var g = [];
					Fa(a.o, g, 39) ? a = [] : (z(g, e), z(g, c[ma]), Ke(g, String(f)), ua(g, d ? 1 : 0), a = g);
					return P(b, a)
				}
			}
			
			function ec(a) {
				var b = a.o, c = a.N, d = cb(c);
				if (!d || "SCROLLBAR" === d.nodeName) return [];
				var e = [], f = v(e, Ja);
				d && Oc(d) ? f(Sf(a, d)) : f(db(b, d));
				f = Mc(b, c);
				return P(e,
					nf(b, ta(a.o), c.type, d, [f.x, f.y], c.which, c.button))
			}
			
			function Lm(a) {
				var b = null, c = a.o, d = c.document;
				if (c.getSelection) {
					d = void 0;
					try {
						d = c.getSelection()
					} catch (g) {
						return []
					}
					if (Za(d)) return [];
					var e = "" + d;
					b = d.anchorNode
				} else d.selection && d.selection.createRange && (d = d.selection.createRange(), e = d.text, b = d.parentElement());
				if ("string" !== typeof e) return [];
				try {
					for (; b && 1 !== b.nodeType;) b = b.parentNode
				} catch (g) {
					return []
				}
				if (!b) return [];
				d = lc(c, b) || mc(c, b, !0);
				b = b.getElementsByTagName("*");
				for (var f = 0; f < b.length && !d;) d =
					b[f], d = lc(c, d) || mc(c, d, !0), f += 1;
				if (e !== Le) return Le = e, d = d ? B("", Mh(e.split(""))) : e, e = ta(a.o), 0 === d.length ? d = c = "" : 100 >= d.length ? (c = d, d = "") : 200 >= d.length ? (c = d.substr(0, 100), d = d.substr(100)) : (c = d.substr(0, 97), d = d.substr(d.length - 97)), b = [], Fa(a.o, b, 29) ? a = [] : (z(b, e), Je(b, c), Je(b, d), a = b), a
			}
			
			function Mm(a) {
				return P(ec(a), Lm(a) || [])
			}
			
			function Nh(a) {
				return (a.shiftKey ? 2 : 0) | (a.ctrlKey ? 4 : 0) | (a.altKey ? 1 : 0) | (a.metaKey ? 8 : 0) | (a.ctrlKey || a.altKey ? 16 : 0)
			}
			
			function Oh(a) {
				var b = [];
				Me || (Me = !0, Le && b.push.apply(b, Dm(a.o, ta(a.o))),
					Ib(a.o, function () {
						Me = !1
					}, "fv.c"));
				return b
			}
			
			function Ph(a, b, c, d) {
				var e = cb(b);
				if (!e || Vf(a, e)) return [];
				var f = e && nb("ym-record-keys", e), g = Uf(e);
				b = lc(a, e);
				var h = L(a);
				if (!f && (g && h.b("isEU") || mc(a, e))) a = []; else {
					f = db(a, e);
					h = ta(a);
					g = [];
					if (Fa(a, g, 38)) a = []; else {
						z(g, h);
						Ih(g, c);
						ua(g, d);
						a = e[ma];
						if (!a || 0 > a) a = 0;
						z(g, a);
						ua(g, b ? 1 : 0);
						a = g
					}
					a = P(f, a)
				}
				return a
			}
			
			function Nm(a) {
				var b = a.o, c = a.N, d = c.keyCode, e = Nh(c), f = [], g = v(f, Ja);
				if ({
					3: 1,
					8: 1,
					9: 1,
					13: 1,
					16: 1,
					17: 1,
					18: 1,
					19: 1,
					20: 1,
					27: 1,
					33: 1,
					34: 1,
					35: 1,
					36: 1,
					37: 1,
					38: 1,
					39: 1,
					40: 1,
					45: 1,
					46: 1,
					91: 1,
					92: 1,
					93: 1,
					106: 1,
					110: 1,
					111: 1,
					144: 1,
					145: 1
				}[d] || 112 <= d && 123 >= d || 96 <= d && 105 >= d || e & 16) 19 === d && 4 === (e & -17) && (d = 144), g(Ph(b, c, d, e | 16)), Ne = !1, Ib(b, function () {
					Ne = !0
				}, "fv.kd"), !(67 === d && e & 4) || e & 1 || e & 2 || g(Oh(a));
				return f
			}
			
			function Om(a) {
				var b = a.o;
				a = a.N;
				var c = [];
				Ne && !Oe && 0 !== a.which && (c.push.apply(c, Ph(b, a, a.charCode || a.keyCode, Nh(a))), Oe = !0, Ib(b, function () {
					Oe = !1
				}, "fv.kp"));
				return c
			}
			
			function Qh(a) {
				var b = a.o, c = cb(a.N);
				if (!c || Zf(b, c)) return [];
				var d = [];
				if ("FORM" === c.nodeName) {
					for (var e = c.elements, f = 0; f < e.length; f +=
						1) mh(e[f]) || d.push.apply(d, db(b, e[f]));
					d.push.apply(d, Hm(b, ta(a.o), c))
				}
				return d
			}
			
			function Pm(a) {
				var b = a.flush;
				a = cb(a.N);
				"BODY" === La(a) && b()
			}
			
			function pd(a, b, c) {
				return function () {
					var d = Ea(a, b), e = na(arguments);
					if (d) return c.apply(void 0, e)
				}
			}
			
			function Qm(a, b, c) {
				return function () {
					var d = Ea(a, b), e = na(arguments);
					c.apply(void 0, e);
					return d
				}
			}
			
			function Rm(a, b, c, d) {
				return function () {
					for (var e = [], f = 0; f < arguments.length; f++) e[f] = arguments[f];
					f = Rd(function (g) {
						return !1 === g
					}, e);
					return 0 < e.length && f || !c.length || !d ? d :
						q.apply(void 0, S(function (g, h, k) {
							return !1 === e[k] ? g : g.concat(function () {
								for (var l = [], m = 0; m < arguments.length; m++) l[m] = arguments[m];
								return h.apply(void 0, P([a, b], l))
							})
						}, [], c))(d)
				}
			}
			
			var wc = {construct: "Metrika", callbackPostfix: "", version: "9ezyymqkmijljbr9v"}, Fe = [],
				Ah = qa(String.prototype.indexOf, "indexOf"), lg = /^\s+|\s+$/g, id = qa(Array.from, "from"),
				Rh = qa(Array.prototype.join, "join"), B = Rh ? function (a, b) {
					return Rh.call(b, a)
				} : om, sa = ra(function (a, b) {
					return a === b
				}), Mb = ra(function (a, b) {
					a(b);
					return b
				}), oc = ra(B), va =
					ra(yh), Za = sa(null), V = sa(void 0), Sh = qa(Function.prototype.bind, "bind"), E = Sh ? function () {
					var a = na(arguments);
					return Sh.apply(a[0], P([a[1]], a.slice(2)))
				} : nm, jg = ra(G), yj = ra(ca), Th = qa(Array.prototype.reduce, "reduce"), S = Th ? function (a, b, c) {
					return Th.call(c, a, b)
				} : zc, T = md(n), Kb = T("length"), hh = q, Ac, mm = q(we, sa("[object Array]")),
				Ce = Object.prototype.hasOwnProperty, Na = Object.entries ? function (a) {
					return a ? Object.entries(a) : []
				} : hm, ya = Object.keys ? Object.keys : wh, F = Object.assign || km, Rf = ra(function (a, b) {
					return F({}, a,
						b)
				}), Be, vh = ub(window), Sm = md(vh), L = t(function (a) {
					a = a.Ya = a.Ya || {};
					var b = a._metrika = a._metrika || {};
					return {
						qa: function (c, d) {
							Ce.call(b, c) || (b[c] = d);
							return this
						}, l: function (c, d) {
							b[c] = d;
							return this
						}, b: function (c, d) {
							var e = b[c];
							return Ce.call(b, c) || V(d) ? e : d
						}
					}
				}), Rd = Array.prototype.every ? function (a, b) {
					return Array.prototype.every.call(b, a)
				} : function (a, b) {
					return S(function (c, d) {
						return c ? a(d) : !1
					}, !0, b)
				}, Uh = qa(Array.prototype.filter, "filter"), Z = Uh ? function (a, b) {
					return Uh.call(b, a)
				} : xh, Nb = ra(Z), Sb = jd(function (a,
				                                      b) {
					return Array.prototype.find.call(b, a)
				}, function (a, b) {
					for (var c = 0; c < b.length; c += 1) if (a.call(b, b[c], c)) return b[c]
				}, ka("find", Array.prototype.find)), N = Array.prototype.includes ? function (a, b) {
					return Array.prototype.includes.call(b, a)
				} : lm, mb = md(N), Vh = t(function (a) {
					a = n(a, "navigator") || {};
					var b = n(a, "userAgent") || "";
					return {ub: -1 < (n(a, "vendor") || "").indexOf("Apple"), Vb: b}
				}), Wh = t(v(/gecko/, function (a, b) {
					return -1 !== (n(b, "navigator.userAgent") || "").toLowerCase().search(a)
				})), uc = t(function (a) {
					var b = n(a, "document.documentElement.style");
					a = n(a, "InstallTrigger");
					return !(!(b && "MozAppearance" in b) || Ba(a))
				}), Xh = qa(Array.prototype.map, "map"), I = Xh && em(window, Array.prototype.map) ? function (a, b) {
					return b && 0 < b.length ? Xh.call(b, a) : []
				} : jm, D = I, vb = Array.prototype.flatMap ? function (a, b) {
					return Array.prototype.flatMap.call(b, a)
				} : im, fb = ra(I), Fg = md(I), Oa = jd(function (a, b) {
					return Array.prototype.some.call(b, a)
				}, function (a, b) {
					for (var c = 0; c < b.length; c += 1) if (c in b && a.call(b, b[c], c)) return !0;
					return !1
				}, ka("some", Array.prototype.some)), Yh = t(ub), Tm = ra(function (a,
				                                                                    b) {
					return Array.prototype.sort.call(b, a)
				}), Zh = qa(Array.prototype.reverse, "reverse"), Im = Zh ? function (a) {
					return Zh.call(a)
				} : dm, Xc = t(q(T("String.fromCharCode"), v("fromCharCode", ka), Tb)), Ya = t(T("navigator.userAgent")),
				Ae = t(q(Ya, Ka(/ipad|iphone|ipod/i))), Pe = t(function (a) {
					return n(a, "navigator.platform") || ""
				}), sg = t(function (a) {
					a = Vh(a);
					var b = a.Vb;
					return a.ub && (!b.match(/Safari/) && b.match(/Mobile/) || b.match(/CFNetwork\/[0-9][0-9.]*.*Darwin\/[0-9][0-9.]*/) || -1 !== b.indexOf("FB_IAB") || -1 !== b.indexOf("FBAV") ||
						-1 !== b.indexOf("OKApp") || -1 !== b.indexOf("GSA/"))
				}), tc = t(function (a) {
					a = Vh(a);
					var b = a.Vb;
					return a.ub && !b.match("CriOS")
				}),
				Tc = t(q(Ya, ca("test", /Android.*Version\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]|Android.*Version\/[0-9][0-9.]*\s(?:Mobile\s)?Safari\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]*|; wv\).*Chrome\/[0-9][0-9.]*\sMobile/))),
				Um = /Chrome\/(\d+)\./, Vm = t(function (a) {
					return (a = (n(a, "navigator.userAgent") || "").match(Um)) && a.length ? 76 <= parseInt(a[1], 10) : !1
				}), hd = t(function (a) {
					var b = (Ya(a) || "").toLowerCase();
					a =
						Pe(a);
					return !(-1 === b.indexOf("android") || -1 === b.indexOf(b, "mobile") || !/^android|linux armv/i.test(a))
				}), Wm = "other none unknown wifi ethernet bluetooth cellular wimax mixed".split(" "), Xm = t(function (a) {
					var b = n(a, "navigator.connection.type");
					if (V(b)) return null;
					a = Yh(a)(b, Wm);
					return -1 === a ? b : "" + a
				}), gd = t(q(T("document.addEventListener"), Tb)), $h = t(function (a) {
					var b = n(a, "navigator") || {};
					return S(function (c, d) {
						return c || n(b, d)
					}, "", ["language", "userLanguage", "browserLanguage", "systemLanguage"])
				}), pg = t(function (a) {
					var b =
						n(a, "navigator") || {};
					a = $h(a);
					Va(a) || (a = "", b = n(b, "languages.0"), Va(b) && (a = b));
					return a.toLowerCase().split("-")[0]
				}), Hb = t(function (a) {
					var b = !1;
					try {
						b = a.top !== a
					} catch (c) {
					}
					return b
				}), Ym = t(function (a) {
					var b = !1;
					try {
						b = a.top.contentWindow
					} catch (c) {
					}
					return b
				}), Zm = t(function (a) {
					var b = !1;
					try {
						b = a.navigator.javaEnabled()
					} catch (c) {
					}
					return b
				}), $m = t(function (a) {
					var b = "__webdriver_evaluate __selenium_evaluate __webdriver_script_function __webdriver_script_func __webdriver_script_fn __fxdriver_evaluate __driver_unwrapped __webdriver_unwrapped __driver_evaluate __selenium_unwrapped __fxdriver_unwrapped".split(" "),
						c = n(a, "external");
					c = -1 !== (n(c, "toString") ? "" + c.toString() : "").indexOf("Sequentum");
					var d = n(a, "document.documentElement"), e = ["selenium", "webdriver", "driver"];
					return !!(Oa(v(a, n), ["_selenium", "callSelenium", "_Selenium_IDE_Recorder"]) || Oa(v(n(a, "document"), n), b) || c || d && Oa(E(d.getAttribute, d), e))
				}), an = t(function (a) {
					return !!(Oa(v(a, n), ["_phantom", "__nightmare", "callPhantom"]) || /(PhantomJS)|(HeadlessChrome)/.test(Ya(a)) || n(a, "navigator.webdriver") || n(a, "isChrome") && !n(a, "chrome"))
				}), bn = t(function (a) {
					return Rd(v(a,
						n), ["ia_document.shareURL", "ia_document.referrer"])
				}), cn = t(function (a) {
					a = n(a, "navigator.plugins");
					return !!(a && Kb(a) && Oa(q(T("name"), Ka(/Chrome PDF Viewer/)), a))
				}),
				dn = new RegExp(B("|", "yandex.com/bots;Googlebot;APIs-Google;Mediapartners-Google;AdsBot-Google;FeedFetcher-Google;Google-Read-Aloud;DuplexWeb-Google;Google Favicon;googleweblight;Mail.RU_Bot;StackRambler;Slurp;msnbot;bingbot;www.baidu.com/search/spi_?der.htm".split(";")).replace(/[./]/g, "\\$&")),
				Pk = t(q(T("navigator.userAgent"), Ka(dn))), qd =
					t(function (a) {
						var b = Ya(a) || "", c = b.match(/Mac OS X ([0-9]+)_([0-9]+)/);
						c = c ? [+c[1], +c[2]] : [0, 0];
						b = b.match(/iPhone OS ([1-9]+)_([0-9]+)/);
						return 14 <= (b ? +b[1] : 0) ? !0 : (Ae(a) || 10 < c[0] || 10 === c[0] && 13 <= c[1]) && tc(a)
					}), en = wc.construct, Qe = gd(window), la = {
					dc: 24226447,
					Zb: 26302566,
					ec: 51533966,
					hd: 65446441,
					aa: "https:",
					ta: "680",
					Ja: en,
					cc: Qe ? 512 : 2048,
					ac: Qe ? 512 : 2048,
					bc: Qe ? 100 : 400,
					jd: 100,
					kd: "noindex"
				}, rb = {}, Q = t(function (a) {
					return a.id + ":" + a.M
				}), wa = {id: "id", jb: "ut", M: "type", Sa: "ldc", ca: "nck", wa: "url", xc: "referrer"}, fn = /^\d+$/,
				Fb = {
					id: function (a) {
						a = "" + (a || "0");
						fn.test(a) || (a = "0");
						try {
							var b = parseInt(a, 10)
						} catch (c) {
							b = 0
						}
						return b
					}, M: function (a) {
						return "" + (a || 0 === a ? a : "0")
					}, ca: Boolean, jb: Boolean
				};
			wa.ua = "defer";
			Fb.ua = Boolean;
			wa.cd = "yaDisableGDPR";
			wa.dd = "yaGDPRLang";
			wa.exp = "experiments";
			wa.Oa = "ecommerce";
			Fb.Oa = function (a) {
				if (a) return !0 === a ? "dataLayer" : "" + a
			};
			wa.H = "params";
			wa.Ia = "userParams";
			wa.sa = "accurateTrackBounce";
			wa.Ub = "triggerEvent";
			Fb.Ub = Boolean;
			wa.Jb = "sendTitle";
			Fb.Jb = function (a) {
				return !!a || V(a)
			};
			wa.gb = "trackHash";
			Fb.gb = Boolean;
			wa.lc = "clickmap";
			wa.ra = "webvisor";
			Fb.ra = Boolean;
			wa.Fa = "trackLinks";
			wa.sc = "enableAll";
			var ai = S(function (a, b) {
					var c = b[0];
					a[c] = {Cb: b[1], Ic: Fb[c]};
					return a
				}, {}, Na(wa)), ha = sh(function (a) {
					var b = "";
					a = S(function (c, d) {
						var e = d[0], f = "" + e + ":" + d[1];
						"t" === e ? b = f : c.push(f);
						return c
					}, [], Na(a));
					b && a.push(b);
					return B(":", a)
				}), $l = "hash host hostname href pathname port protocol search".split(" "),
				Pg = "ru ua by kz az kg lv md tj tm uz ee fr co.il com.ge com.am com.tr".split(" "),
				Jk = t(function (a) {
					a = M(a).hostname.split(".");
					return a[a.length - 1]
				}), bi = t(function (a) {
					return -1 !== M(a).hostname.search(/(?:^|\.)(?:ya|yandex|beru|kinopoisk|edadeal)\.(?:\w+|com?\.\w+)$/)
				}), fg = t(function (a) {
					return (a ? a.replace(/^www\./, "") : "").toLowerCase()
				}),
				gn = /^(.*\.)?((yandex(-team)?)\.(com?\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\.ru|ya\.(ru|cc)|yadi\.sk|deli\.yango\.com|yastatic\.net|meteum\.ai|.*\.yandex|turbopages\.org|turbo\.site)$/,
				be = t(function (a) {
					a = M(a).hostname;
					var b = !1;
					a && (b = -1 !== a.search(gn));
					return b
				}),
				hn = /^(.*\.)?((yandex(-team)?)\.(com?\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\.ru|ya\.(ru|cc)|yadi\.sk|.*\.yandex|turbopages\.org|turbo\.site)$/,
				tk = t(function (a) {
					a = M(a).hostname;
					var b = !1;
					a && (b = -1 !== a.search(hn));
					return b
				}), jn = /(?:^|\.)(?:ya|yandex)\.(?:\w+|com?\.\w+)$/, kn = t(function (a) {
					a = M(a).hostname;
					var b = !1;
					a && (b = -1 !== a.search(jn));
					return b
				}), tm = t(function (a) {
					var b = [];
					Vm(a) && "https:" === M(a).protocol && (b.push("SameSite=None"), b.push("Secure"));
					return b
				}), ln = t(function (a) {
					var b = !1;
					if (!a.addEventListener) return b;
					try {
						var c = Object.defineProperty({}, "passive", {
							get: function () {
								b = !0;
								return 1
							}
						});
						a.addEventListener("test", C, c)
					} catch (d) {
					}
					return b
				}),
				mn = ra(function (a, b) {
					return a ? F({capture: !0, passive: !0}, b || {}) : !!b
				}), ja = t(function (a) {
					a = ln(a);
					var b = mn(a), c = {};
					return F(c, {
						C: function (d, e, f, g) {
							D(function (h) {
								var k = b(g);
								rh(d, h, f, k, !1)
							}, e);
							return E(c.Ha, c, d, e, f, g)
						}, Ha: function (d, e, f, g) {
							D(function (h) {
								var k = b(g);
								rh(d, h, f, k, !0)
							}, e)
						}
					})
				}), nn = setTimeout;
			ea.prototype["catch"] = function (a) {
				return this.then(null, a)
			};
			ea.prototype.then = function (a, b) {
				var c = new this.constructor(qm);
				Ch(this, new sm(a, b, c));
				return c
			};
			ea.prototype["finally"] = function (a) {
				var b = this.constructor;
				return this.then(function (c) {
					return b.resolve(a()).then(function () {
						return c
					})
				}, function (c) {
					return b.resolve(a()).then(function () {
						return b.reject(c)
					})
				})
			};
			ea.all = function (a) {
				return new ea(function (b, c) {
					function d(h, k) {
						try {
							if (k && ("object" === typeof k || "function" === typeof k)) {
								var l = k.then;
								if ("function" === typeof l) {
									l.call(k, function (m) {
										d(h, m)
									}, c);
									return
								}
							}
							e[h] = k;
							0 === --f && b(e)
						} catch (m) {
							c(m)
						}
					}
					
					if (!a || "undefined" === typeof a.length) return c(new TypeError("Promise.all accepts an array"));
					var e = Array.prototype.slice.call(a);
					if (0 === e.length) return b([]);
					for (var f = e.length, g = 0; g < e.length; g++) d(g, e[g])
				})
			};
			ea.resolve = function (a) {
				return a && "object" === typeof a && a.constructor === ea ? a : new ea(function (b) {
					b(a)
				})
			};
			ea.reject = function (a) {
				return new ea(function (b, c) {
					c(a)
				})
			};
			ea.race = function (a) {
				return new ea(function (b, c) {
					if (!a || "undefined" === typeof a.length) return c(new TypeError("Promise.race accepts an array"));
					for (var d = 0, e = a.length; d < e; d++) ea.resolve(a[d]).then(b, c)
				})
			};
			ea.ob = "function" === typeof setImmediate && function (a) {
					setImmediate(a)
				} ||
				function (a) {
					nn(a, 0)
				};
			ea.hc = function (a) {
				"undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a)
			};
			var J = window.Promise, on = qa(J, "Promise"), ci = qa(n(J, "resolve"), "resolve"),
				di = qa(n(J, "reject"), "reject"), ei = qa(n(J, "all"), "all");
			if (N(!1, [on, ci, di, ei])) J = ea; else {
				var rd = function (a) {
					return new Promise(a)
				};
				rd.resolve = E(ci, J);
				rd.reject = E(di, J);
				rd.all = E(ei, J);
				J = rd
			}
			var Jl = ["http.0.st..rt.", "network error occurred", "send beacon", "Content Security Policy", "DOM Exception 18"],
				Cc, $c = function (a) {
					return function (b) {
						if (Cc) return new Cc(b);
						if (ka("Error", a.Error)) return Cc = a.Error, new a.Error(b);
						Cc = Zl;
						return new Cc(b)
					}
				}(window), Kl = Ka(/^http./), Il = Ka(/^err.kn/), Wl = /[^a-z0-9.:-]/, Xl = aa(function (a, b, c) {
					var d, e = new a.XMLHttpRequest, f = c.K, g = F(c.kb ? (d = {}, d.wmode = "7", d) : {}, c.na);
					return new J(function (h, k) {
						e.open(c.Wb || "GET", b + "?" + dc(g), !0);
						e.withCredentials = !1 !== c.Yb;
						c.Ea && (e.timeout = c.Ea);
						hh(Na, fb(function (m) {
							e.setRequestHeader(m[0], m[1])
						}))(c.ma);
						var l = aa(Yl)(a, e, jb(c.W), c.kb, c.Tc,
							h, k);
						e.onreadystatechange = l;
						try {
							e.send(f)
						} catch (m) {
						}
					})
				}), pn = t(function (a) {
					a = n(a, "document") || {};
					return ("" + (a.characterSet || a.charset || "")).toLowerCase()
				}), eb = t(q(T("document"), v("createElement", qb))), $f = t(function (a) {
					var b = n(a, "Element.prototype");
					return b ? (a = Sb(function (c) {
						return ka(c, b[c])
					}, ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"])) ? b[a] : null : null
				}), qn = sa("INPUT"), fd = q(La, qn), rn = sa("TEXTAREA"), Tl = q(La, rn), sn = sa("SELECT"),
				Ul = q(La, sn), nh = q(T("type"),
					Ka(/^(checkbox|radio)$/)), Vd = q(La, Ka(/^INPUT|SELECT|TEXTAREA$/)),
				Oc = q(La, Ka(/^INPUT|SELECT|TEXTAREA|BUTTON$/)), Sl = ["submit", "image", "hidden"], tn = aa(Lc),
				fi = "A B BIG BODY BUTTON DD DIV DL DT EM FIELDSET FORM H1 H2 H3 H4 H5 H6 HR I IMG INPUT LI OL P PRE SELECT SMALL SPAN STRONG SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TR U UL ABBR AREA BLOCKQUOTE CAPTION CENTER CITE CODE CANVAS DFN EMBED FONT INS KBD LEGEND LABEL MAP OBJECT Q S SAMP STRIKE TT ARTICLE AUDIO ASIDE FOOTER HEADER MENU METER NAV PROGRESS SECTION TIME VIDEO NOINDEX NOBR MAIN svg circle clippath ellipse defs foreignobject g glyph glyphref image line lineargradient marker mask path pattern polygon polyline radialgradient rect set text textpath title".split(" "),
				jh = t(function () {
					for (var a = 59, b = {}, c = 0; c < fi.length; c += 1) b[fi[c]] = String.fromCharCode(a), a += 1;
					return b
				}), gi = aa(Fd), fh = {}, ye = {};
			fh.p = 500;
			var eh = {i: "id", n: "name", h: "href", ty: "type"};
			ye.h = !0;
			ye.c = !0;
			var Ub = {};
			Ub.p = ih;
			Ub.c = function (a, b, c) {
				(a = zb(n(b, "textContent"))) && c && (c = c(b), c.length && Oa(q(T("textContent"), zb, sa(a)), c) && (a = ""));
				fd(b) && (a = zb(b.getAttribute && b.getAttribute("value") || a));
				return a
			};
			var Yb, xe = "button," + I(function (a) {
						return 'input[type="' + a + '"]'
					}, ["button", "submit", "reset", "file"]).join(",") +
					",a", dh = gi(xe), Ql = (Yb = {}, Yb.A = "h", Yb.BUTTON = "i", Yb.DIV = "i", Yb.INPUT = "ty", Yb),
				Pl = aa(function (a, b, c, d) {
					return new J(function (e, f) {
						var g = Jb(a), h = b("img"), k = q(v(h, Rb), v(jb(d.W), f)), l = cd(a, k, d.Ea || 3E3);
						h.onerror = k;
						h.onload = q(v(h, Rb), v(null, e), G([a, l], Ua));
						k = F({}, d.na);
						delete k.wmode;
						h.src = ph(c, d, k);
						tc(a) && (F(h.style, {
							position: "absolute",
							visibility: "hidden",
							width: "0px",
							height: "0px"
						}), g.appendChild(h))
					})
				}), Ml = aa(function (a, b, c) {
					return new J(function (d, e) {
						var f, g, h = "_ymjsp" + Ta(a), k = F((f = {}, f.callback = h, f),
							c.na), l = G([a, h], Ol);
						a[h] = function (p) {
							try {
								l(), Rb(m), d(p)
							} catch (u) {
								e(u)
							}
						};
						k.wmode = "5";
						var m = gc(a, (g = {}, g.src = ph(b, c, k), g));
						if (!m) return l(), e($c("jp.s"));
						f = v(m, Rb);
						f = q(f, v(jb(c.W), e));
						g = cd(a, f, c.Ea || 1E4);
						g = G([a, g], Ua);
						m.onload = g;
						m.onerror = q(l, g, f)
					})
				}), Ll = aa(function (a, b, c, d) {
					return new J(function (e, f) {
						if (!n(a, "navigator.onLine")) return f();
						var g = F(d.na, {"force-urlencoded": 1});
						return b(c + "?" + dc(g), d.K) ? e("") : f()
					})
				}), Nl = sh(function (a) {
					a = Na(a);
					return B("", I(function (b) {
						var c = b[0];
						b = b[1];
						return Za(b) ? "" :
							c + "(" + b + ")"
					}, a))
				}), Dc;
			var Eb = [ch, 0, Wb, ve, xc];
			var hi = [Wb];
			hi.push(ve);
			var ii = Db(hi), Zb = Db([xc]), un = Db([ch, xc]), sd = Db([0, Wb, ve, xc]);
			var fa = (Dc = {}, Dc.h = ii, Dc.f = ii, Dc.er = Zb, Dc);
			fa.d = Zb;
			fa.s = Db([Wb]);
			fa.S = fa.s;
			fa.u = Zb;
			fa.pi = Zb;
			fa.m = un;
			fa["2"] = Eb;
			fa["6"] = Db([0, Wb]);
			fa.t = Eb;
			fa.a = sd;
			fa.n = Eb;
			fa["4"] = Db([0, Wb, xc]);
			fa.r = sd;
			fa["1"] = sd;
			fa.g = sd;
			fa.c = Zb;
			fa.e = Eb;
			fa.adb = Zb;
			fa["5"] = Eb;
			var ue = t(function (a, b) {
						var c;
						(c = b ? fa[b] : Eb) || (c = []);
						c = S(function (d, e, f) {
							(e = e && e(a)) && d.push([f, e]);
							return d
						}, [], c);
						c.length || qh();
						return c
					},
					hb), pb = ["0", "1", "2", "3"], Pb = pb[0], ce = pb[1], El = pb[2],
				fe = I(q(K, ca("concat", "GDPR-ok-view-detailed-")), pb),
				Sc = P("GDPR-ok GDPR-cross GDPR-cancel 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 GDPR-settings GDPR-ok-view-default GDPR-ok-view-detailed 21 22 23".split(" "), fe, ["28"]),
				Dl = "3 13 14 15 16 17 28".split(" "), ah = q(fb(T("ymetrikaEvent.type")), Nb(mb(Sc))), um = /:\d+$/,
				vm = t(function (a) {
					var b = (M(a).host || "").split(".");
					return 1 === b.length ? b[0] : S(function (c, d, e) {
						e += 1;
						2 <= e && !c && (e = B(".", b.slice(-e)), Nf(a, e) && (c =
							e));
						return c
					}, "", b)
				}), xb = t(fc), Cl = t(function (a) {
					Zg(a, "_ymBRC", "1");
					var b = "1" !== Yg(a, "_ymBRC");
					b || $g(a, "_ymBRC");
					return b
				}), Aa = t(Xg), td = t(Xg, function (a, b, c) {
					return "" + b + c
				}), W = t(Dg), Vg = yc("r", function (a, b) {
					var c = Ug(a, b), d = c[0];
					return !c[1] && d
				}), ie = t(Tg, function (a, b) {
					return "{" + b.Sa + b.ca
				}), me = t(ld, Q), ef = q(ie, sc), xl = aa(function (a, b) {
					for (var c = []; !Zc(b);) {
						var d = zl(b);
						a(d, function (e) {
							return e(b)
						});
						c.push(d)
					}
					return c
				}), Pc = aa(function (a, b, c) {
					return c(a, b)
				}), wm = t(function (a) {
					if (a = eb(a)) return a("a")
				}), Og = ["webkitvisibilitychange",
					"visibilitychange"], kb = G([1, null], jd), ji = G([1, 0], jd), Ng = t(function () {
					return {sb: null, xa: []}
				}, Q), Ra,
				vn = [["domainLookupEnd", "domainLookupStart"], ["connectEnd", "connectStart"], ["responseStart", "requestStart"], ["responseEnd", "responseStart"], ["fetchStart"], ["redirectEnd", "redirectStart"], ["redirectCount"], ["domInteractive", "responseEnd"], ["domContentLoadedEventEnd", "domContentLoadedEventStart"], ["domComplete"], ["loadEventStart"], ["loadEventEnd", "loadEventStart"], ["domContentLoadedEventStart"]],
				Mg = (Ra =
					{}, Ra.responseEnd = 1, Ra.domInteractive = 1, Ra.domContentLoadedEventStart = 1, Ra.domContentLoadedEventEnd = 1, Ra.domComplete = 1, Ra.loadEventStart = 1, Ra.loadEventEnd = 1, Ra.unloadEventStart = 1, Ra.unloadEventEnd = 1, Ra.secureConnectionStart = 1, Ra),
				wn = t(kd), ql = {"*": "+", "-": "/", nd: "=", "+": "*", "/": "-", "=": "_"}, Ec = t(function (a) {
					a = n(a, "console");
					var b = n(a, "log");
					b = nd("log", b) ? E(b, a) : C;
					var c = n(a, "warn");
					c = nd("warn", c) ? E(c, a) : b;
					var d = n(a, "error");
					a = nd("error", d) ? E(d, a) : b;
					return {log: b, error: a, warn: c}
				}), xn = A("p.cd", function (a) {
					if (hd(a) ||
						Ae(a)) {
						var b = Aa(a);
						if (Ba(b.b("jn"))) {
							b.l("jn", !1);
							var c = a.qd || tc(a) ? function () {
							} : /./;
							a = Ec(a);
							c.toString = function () {
								b.l("jn", !0);
								return "Yandex.Metrika counter is initialized"
							};
							a.log("%c%s", "color: inherit", c)
						}
					}
				}), ol = /Firefox\/([0-9]+)/, nl = /([0-9\\.]+) Safari/, yn = /\sYptp\/\d\.(\d+)\s/, pl = /Edg\/(\d+)\./,
				ki = t(function (a) {
					var b;
					a:{
						if ((b = Ya(a)) && (b = yn.exec(b)) && 1 < b.length) {
							b = parseInt(b[1], 10);
							break a
						}
						b = 0
					}
					return 50 <= b && 99 >= b || Bg(a, 79) ? !1 : !qd(a) || sg(a)
				}),
				kf = "monospace;sans-serif;serif;Andale Mono;Arial;Arial Black;Arial Hebrew;Arial MT;Arial Narrow;Arial Rounded MT Bold;Arial Unicode MS;Bitstream Vera Sans Mono;Book Antiqua;Bookman Old Style;Calibri;Cambria;Cambria Math;Century;Century Gothic;Century Schoolbook;Comic Sans;Comic Sans MS;Consolas;Courier;Courier New;Garamond;Geneva;Georgia;Helvetica;Helvetica Neue;Impact;Lucida Bright;Lucida Calligraphy;Lucida Console;Lucida Fax;LUCIDA GRANDE;Lucida Handwriting;Lucida Sans;Lucida Sans Typewriter;Lucida Sans Unicode;Microsoft Sans Serif;Monaco;Monotype Corsiva;MS Gothic;MS Outlook;MS PGothic;MS Reference Sans Serif;MS Sans Serif;MS Serif;MYRIAD;MYRIAD PRO;Palatino;Palatino Linotype;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Tahoma;Times;Times New Roman;Times New Roman PS;Trebuchet MS;Verdana;Wingdings;Wingdings 2;Wingdings 3".split(";"),
				$i = t(function (a) {
					a = eb(a)("canvas");
					var b = n(a, "getContext");
					if (!b) return null;
					try {
						var c = E(b, a)("2d");
						c.font = "72px mmmmmmmmmmlli";
						var d = c.measureText("mmmmmmmmmmlli").width;
						return function (e) {
							c.font = "72px " + e;
							return c.measureText("mmmmmmmmmmlli").width === d
						}
					} catch (e) {
						return null
					}
				}), li = qa(String.prototype.repeat, "repeat"), cf = li ? function (a, b) {
					return li.call(a, b)
				} : gm, mi = /\/$/, zn = t(q(W, va(function (a) {
					return -(new a.o.Date).getTimezoneOffset()
				}))), An = q(W, va(function (a) {
					a = new a.o.Date;
					return B("", I(Bl, [a.getFullYear(),
						a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()]))
				})), Bn = q(W, va(ad)), ni = t(q(W, va(function (a) {
					return a.T[0]
				}))), Cn = t(ld), Dn = t(ld), En = t(function (a) {
					var b = n(a, "webkitRequestFileSystem");
					if (O(b) && !hd(a)) return (new J(E(b, a, 0, 0))).then(function () {
						var d = n(a, "navigator.storage") || {};
						return d.estimate ? d.estimate() : {}
					}).then(function (d) {
						return (d = d.quota) && 12E7 > d ? !0 : !1
					})["catch"](v(!0, K));
					if (uc(a)) return b = n(a, "navigator.serviceWorker"), J.resolve(V(b));
					b = n(a, "openDatabase");
					if (tc(a) && O(b)) {
						var c =
							!1;
						try {
							b(null, null, null, null)
						} catch (d) {
							c = !0
						}
						return J.resolve(c)
					}
					return J.resolve(!n(a, "indexedDB") && (n(a, "PointerEvent") || n(a, "MSPointerEvent")))
				}), Fn = /(\?|&)turbo_uid=([\w\d]+)($|&)/, Gn = t(function (a, b) {
					var c = xb(a), d = M(a).search.match(Fn);
					return d && 2 <= d.length ? (d = d[2], b.ca || c.l("turbo_uid", d), d) : (c = c.b("turbo_uid")) ? c : ""
				}), Hn = t(function (a) {
					return O(n(a, "yandex.getSiteUid")) ? a.yandex.getSiteUid() : null
				}),
				In = [["domainLookupEnd", "domainLookupStart"], ["connectEnd", "connectStart"], ["responseStart", "requestStart"],
					["responseEnd", "responseStart"], ["fetchStart", "navigationStart"], ["redirectEnd", "redirectStart"], [function (a, b) {
						return n(b, "redirectCount") || n(a, "navigation.redirectCount")
					}], ["domInteractive", "domLoading"], ["domContentLoadedEventEnd", "domContentLoadedEventStart"], ["domComplete", "navigationStart"], ["loadEventStart", "navigationStart"], ["loadEventEnd", "loadEventStart"], ["domContentLoadedEventStart", "navigationStart"]],
				Jn = t(kd), R, $a, Kn = t(function (a) {
					a = L(a);
					var b = a.b("counterNum", 0) + 1;
					a.l("counterNum",
						b);
					return b
				}, q(hb, Q)), gb = (R = {}, R.vf = v(wc.version, K), R.nt = Xm, R.fp = function (a, b, c) {
					if (c.D && c.D.nohit) return null;
					b = Q(b);
					c = Cn(a);
					if (c[b]) return null;
					a:{
						var d = ni(a), e = n(a, "performance.getEntriesByType");
						if (O(e)) {
							if (a = Z(q(K, T("name"), sa("first-contentful-paint")), e.call(a.performance, "paint")), a.length) {
								a = a[0].startTime;
								break a
							}
						} else {
							e = n(a, "chrome.loadTimes");
							if (O(e) && (e = e.call(a.chrome), e = n(e, "firstPaintTime"), d && e)) {
								a = 1E3 * e - d;
								break a
							}
							if (a = n(a, "performance.timing.msFirstPaint")) {
								a -= d;
								break a
							}
						}
						a = void 0
					}
					return a ?
						(c[b] = a, Math.round(a)) : null
				}, R.fu = function (a, b, c) {
					var d = c.D;
					if (!d) return null;
					b = (n(a, "document.referrer") || "").replace(mi, "");
					c = (d["page-ref"] || "").replace(mi, "");
					d = d["page-url"];
					a = M(a).href !== d;
					b = b !== c;
					c = 0;
					a && b ? c = 3 : b ? c = 1 : a && (c = 2);
					return c
				}, R.en = pn, R.la = $h, R.ut = function (a, b, c) {
					var d = c.Aa;
					(c = c.D) && (kn(a) || b.jb || d) && (c.ut = "noindex");
					return null
				}, R.v = v(la.ta, K), R.cn = Kn, R.dp = function (a) {
					var b = L(a), c = b.b("bt", {});
					if (V(b.b("bt"))) {
						var d = n(a, "navigator.getBattery");
						try {
							c.p = d ? d.call(a.navigator) : null
						} catch (e) {
						}
						b.l("bt",
							c);
						c.p && c.p.then && c.p.then(function (e) {
							c.ad = e.charging && 0 === e.chargingTime
						})
					}
					return c.ad ? "1" : "0"
				}, R.ls = t(function (a, b) {
					var c = td(a, b.id), d = W(a), e = c.b("lsid");
					return +e ? e : (d = Ta(a, 0, d(U)), c.l("lsid", d), d)
				}, hb), R.hid = Qb, R.z = zn, R.i = An, R.et = Bn, R.c = q(T("navigator.cookieEnabled"), kb), R.rn = q(K, Ta), R.rqn = function (a, b, c) {
					c = c.D;
					if (!c || c.nohit) return null;
					a = td(a, b.id);
					b = (a.b("reqNum", 0) || 0) + 1;
					a.l("reqNum", b);
					if (a.b("reqNum") === b) return b;
					a.Ma("reqNum");
					return null
				}, R.u = ie, R.tp = q(hb, function (a) {
					a = Q(a);
					return rb[a] &&
						rb[a].Wc
				}, kb), R.tpid = q(hb, function (a) {
					a = Q(a);
					return rb[a] && rb[a].Xc || null
				}), R.w = function (a) {
					a = Kd(a);
					return a[0] + "x" + a[1]
				}, R.s = function (a) {
					var b = n(a, "screen");
					if (b) {
						a = n(b, "width");
						var c = n(b, "height");
						b = n(b, "colorDepth") || n(b, "pixelDepth");
						return B("x", [a, c, b])
					}
					return null
				}, R.sk = T("devicePixelRatio"), R.ifr = q(Hb, kb), R.j = q(Zm, kb), R.sti = function (a) {
					return Hb(a) ? Ym(a) ? "1" : null : null
				}, R), Ig = {};
			gb.pri = function (a) {
				if (Tc(a)) return null;
				var b = Dn(a), c = b.Fb;
				V(c) && (b.Fb = null, En(a).then(function (d) {
					b.Fb = d
				}));
				return c ?
					1 : null
			};
			F(gb, ($a = {}, $a.iss = q($m, kb), $a.hdl = q(an, kb), $a.iia = q(bn, kb), $a.cpf = q(cn, kb), $a.ntf = t(function (a) {
				a:switch (n(a, "Notification.permission")) {
					case "denied":
						a = !1;
						break a;
					case "granted":
						a = !0;
						break a;
					default:
						a = null
				}
				return Za(a) ? null : a ? 2 : 1
			}), $a.eu = function (a) {
				return L(a).b("isEU")
			}, $a.ns = ni, $a.np = function (a) {
				if (Ta(a, 0, 100)) a = null; else {
					a = zb(Pe(a), 100);
					for (var b = [], c = 0; c < a.length; c++) {
						var d = a.charCodeAt(c);
						128 > d ? b.push(d) : (127 < d && 2048 > d ? b.push(d >> 6 | 192) : (b.push(d >> 12 | 224), b.push(d >> 6 & 63 | 128)), b.push(d &
							63 | 128))
					}
					a = Mf(b)
				}
				return a
			}, $a.re = q(function (a, b) {
				return !b.ca && Vg(a, b)
			}, kb), $a));
			gb.ds = function (a, b, c) {
				c = c.D;
				if ((void 0 === c ? {} : c).nohit) return null;
				a = te(a);
				b = Q(b);
				if (!a) return null;
				c = n(a, "timing");
				if (!c) return null;
				a = Lg(a, c, In);
				b = Jn(b);
				return (b = Kg(b, a)) && B(",", b)
			};
			gb.dsn = function (a, b, c) {
				c = c.D;
				if ((void 0 === c ? {} : c).nohit) return null;
				a = te(a);
				b = Q(b);
				if (!a) return null;
				c = null;
				if (O(a.getEntriesByType)) {
					var d = n(a.getEntriesByType("navigation"), "0");
					d && (c = d)
				}
				if (!c) return null;
				a = Lg(a, c, vn);
				b = wn(b);
				return (b =
					Kg(b, a)) && B(",", b)
			};
			gb.bu = Hn;
			gb.td = Gn;
			gb.co = function (a) {
				return ji(L(a).b("jn"))
			};
			var kl = ya(gb).concat(ya(Ig)),
				hl = ["RTCPeerConnection", "mozRTCPeerConnection", "webkitRTCPeerConnection"], Yc = t(function () {
					return {ja: {}, pending: {}, fa: {}}
				}), Re = T("postMessage"), Ln = aa(function (a, b, c, d) {
					var e, f = {va: W(a)(U), key: a.Math.random(), dir: 0};
					c.length && (f.va = parseInt(c[0], 10), f.key = parseFloat(c[1]), f.dir = parseInt(c[2], 10));
					F(d, b);
					b = (e = {data: d}, e.__yminfo = B(":", ["__yminfo", f.va, f.key, f.dir]), e);
					return {
						yb: f, Rb: Ab(a, b) ||
							""
					}
				}), Mn = aa(function (a, b, c, d, e) {
					b = b(d);
					var f = Yc(a), g = B(":", [b.yb.va, b.yb.key]);
					if (Re(c)) {
						f.pending[g] = e;
						try {
							c.postMessage(b.Rb, "*")
						} catch (h) {
							delete f.pending[g];
							return
						}
						pa(a, function () {
							delete f.pending[g]
						}, 5E3, "if.s")
					}
				}), Nn = A("s.f", Mn), On = aa(function (a, b, c, d, e, f) {
					var g = null, h = null, k = Yc(a), l = null;
					try {
						g = wb(a, f.data), h = g.__yminfo, l = g.data
					} catch (m) {
						return
					}
					if (!Ba(h) && h.substring && "__yminfo" === h.substring(0, 8) && !Ba(l) && (g = h.split(":"), 4 === g.length)) if (h = b.id, b = g[1], a = g[2], g = g[3], !Ia(l) && l.type && "0" === g &&
					l.counterId) {
						if (!l.toCounter || l.toCounter == h) {
							k = null;
							try {
								k = f.source
							} catch (m) {
							}
							!Za(k) && Re(k) && (f = d.J(l.type, [f, l]), e = I(q(K, Rf(e)), f.concat([{}])), l = c([b, a, l.counterId], e), k.postMessage(l.Rb, "*"))
						}
					} else g === "" + h && Ia(l) && Z(function (m) {
						return !(!m.hid || !m.counterId)
					}, l).length === l.length && (c = k.pending[B(":", [b, a])]) && c.apply(null, [f].concat(l))
				}), Pn = A("s.fh", On), xg = t(function (a, b) {
					var c, d = qb("getElementsByTagName", n(a, "document")), e = Yc(a), f = Re(a), g = bh(a), h = ja(a);
					if (!d || !f) return null;
					d = d.call(a.document,
						"iframe");
					f = (c = {}, c.counterId = b.id, c.hid = "" + Qb(a), c);
					jl(a, g);
					c = Ln(a, f);
					var k = Nn(a, c([]));
					D(function (l) {
						var m = null;
						try {
							m = l.contentWindow
						} catch (p) {
						}
						m && k(m, {type: "initToChild"}, function (p, u) {
							g.J("initToParent", [p, u])
						})
					}, d);
					Hb(a) && k(a.parent, {type: "initToParent"}, function (l, m) {
						g.J("parentConnect", [l, m])
					});
					h.C(a, ["message"], Pn(a, b, c, g, f));
					return {X: g, ja: e.ja, fa: e.fa, Za: k}
				}, q(hb, Q)), el = aa(function (a, b, c) {
					var d = c.o, e = c[a];
					if (e) e.Db.J(b); else {
						e = ib(d);
						var f = Eg(d, e, 1);
						d = Gg(d, f, 20);
						c[a] = {Db: e, Ab: d};
						e.J(b)
					}
				}),
				cl = aa(function (a, b) {
					var c = b.o, d = b[a];
					if (!d) {
						d = ib(c);
						var e = Eg(c, d, 1);
						c = Gg(c, e, 5);
						b[a] = {Db: d, Ab: c};
						return c
					}
					return d.Ab
				}), Cg = t(function (a) {
					return va({o: a})
				}), Se = t(function (a, b, c) {
					var d = L(a);
					b = Aa(a);
					var e = [];
					c = G([a, c, d, b], ll);
					Tc(a) || ml(a, "14.1") || e.push(G([gl, "pp", ""], c));
					var f = ki(a) && !Ag(a, 68);
					f || e.push(G([il, "pu", ""], c));
					f || b.Qa || qd(a) || (e.push(G([al, "zzlc", "na"], c)), e.push(G([$k, "cc", ""], c)));
					return e.length ? {
						Z: function (g, h) {
							if (0 === d.b("isEU")) try {
								D(q(K, za), e)
							} catch (k) {
							}
							h()
						}, L: function (g, h) {
							var k =
								g.F;
							if (k && 0 === d.b("isEU")) try {
								D(va(k), e)
							} catch (l) {
							}
							h()
						}
					} : {}
				}, function (a, b, c) {
					return Q(c)
				}), rc = yc("retryReqs", function (a) {
					return Aa(a).b("retryReqs", {})
				}), Yk = ["0"], pj = A("g.r", function (a) {
					var b = W(a), c = rc(a), d = b(U), e = Qb(a);
					return S(function (f, g) {
						var h = g[0], k = g[1];
						k && !k.d && k.ghid && k.ghid !== e && k.time && 500 < d - k.time && k.time + 864E5 > d && 2 >= k.browserInfo.rqnl && (k.d = 1, f.push({
							protocol: k.protocol,
							host: k.host,
							Rc: k.resource,
							Pc: k.postParams,
							H: k.params,
							jc: k.browserInfo,
							wd: k.ghid,
							time: k.time,
							oa: parseInt(h, 10),
							mc: k.counterId,
							M: k.counterType
						}));
						return f
					}, [], Na(c))
				}), de = [], Wk = aa(function (a, b, c, d, e) {
					return (new J(function (f, g) {
						var h = ya(c), k = q(d.resolve ? d.resolve : K, Mb(f)), l = q(d.reject ? d.reject : K, Mb(g));
						d.resolve = k;
						d.reject = l;
						D(function (m) {
							var p;
							d.hb.push(m);
							var u = c[m], r = pa(a, v(jb(), l), 5100, "is.m");
							b(u.window, F(e, (p = {}, p.toCounter = parseInt(m, 10), p)), function (w, y) {
								Ua(a, r);
								d.Mb.push(m);
								d.resolve && d.resolve(y)
							})
						}, h)
					}))["catch"](x(a, "if.b"))
				}), Xk = aa(function (a, b, c) {
					b = Z(function (d) {
						return !N(c.info.counterId, d.hb)
					}, b);
					D(function (d) {
						var e;
						c.info.counterId && a((e = {}, e[c.info.counterId] = c, e), d, d.data)
					}, b)
				}), Vc = t(wg, q(hb, Q)), Vk = "ru en et fi lt lv pl fr no sr".split(" "), Uc = [],
				qg = q(ah, fb(Sm(Sc)), oc(",")), rg = q(Nb(mb(Sc)), Kb, Boolean), Ok = t(function (a, b) {
					var c = b.b("gdpr");
					return N(c, pb) ? "-" + c : ""
				}), oi = t(kd), Sa, Ha,
				Kk = (Sa = {}, Sa.am = "com.am", Sa.tr = "com.tr", Sa.ge = "com.ge", Sa.il = "co.il", Sa["\u0440\u0444"] = "ru", Sa["xn--p1ai"] = "ru", Sa["\u0443\u043a\u0440"] = "ua", Sa["xn--j1amh"] = "ua", Sa["\u0431\u0435\u043b"] = "by", Sa["xn--90ais"] = "by", Sa),
				pi = {
					"mc.edadeal.ru": {
						Ba: /^([^/]+\.)?edadeal\.ru$/,
						fb: "ru"
					},
					"mc.yandexsport.ru": {Ba: /^([^/]+\.)?yandexsport\.ru$/, fb: "ru"},
					"mc.beru.ru": {Ba: /^([^/]+\.)?beru\.ru$/, fb: "ru"},
					"mc.kinopoisk.ru": {Ba: /^([^/]+\.)?kinopoisk\.ru$/, fb: "ru"}
				},
				Mk = (Ha = {}, Ha.ka = "ge", Ha.ro = "md", Ha.tg = "tj", Ha.tk = "tm", Ha.et = "ee", Ha.hy = "com.am", Ha.he = "co.li", Ha.ky = "kg", Ha.uk = "ua", Ha.be = "by", Ha.tr = "com.tr", Ha.kk = "kz", Ha),
				qi = t(kd), Qn = t(function () {
					var a = q(Nb(q(K, sa("ru"), Tb)), Pd(function (b, c) {
						b[c] = ["mc.yandex." + c];
						return b
					}, {}))(Pg);
					D(function (b) {
						b = b[0];
						a[b] = [b]
					}, Na(pi));
					return a
				}), Rn =
					t(function (a) {
						var b = M(a).hostname;
						return (a = Sb(function (c) {
							return c[1].Ba.test(b)
						}, Na(pi))) ? a[0] : ""
					}), Sn = ra(function (a, b) {
					var c = bi(b), d = Lk(b), e = Rn(b) || Ik(b), f = W(b), g = Aa(b), h = g.b("synced", {});
					c = c ? [e, d] : [];
					h && (c = Z(function (k) {
						var l = (h[k] || 1) + 1440 < f(Xa);
						l && delete h[k];
						return l
					}, c));
					g.l("synced", h);
					return S(function (k, l) {
						D(function (m) {
							k.push({domain: m, Fc: l})
						}, a[l] || []);
						return k
					}, [], c)
				}), Tn = function (a, b) {
					return function (c) {
						var d = Qn(), e = Sn(d);
						return qd(c) || uc(c) ? {} : {
							L: function (f, g) {
								var h = f.F, k = L(c);
								if (!bi(c) ||
									Hb(c) || !h || !h.b("pv")) return g();
								h = e(c);
								if (!h.length) return g();
								if (k.b("startSync")) qi(c).push(g); else {
									k.l("startSync", !0);
									k = de[0];
									if (!k) return g();
									k(c).then(G([c, h], a)).then(g, q(Mb(g), x(c, b)))["catch"](C)
								}
							}
						}
					}
				}(function (a, b) {
					var c = W(a), d = L(a), e = Aa(a), f = ue(a, "c"), g = Cb(a, f);
					return S(function (h, k) {
						function l() {
							var u = e.b("synced");
							d.l("startSync", !1);
							u && (u[k.Fc] = p, e.l("synced", u));
							D(za, qi(a))
						}
						
						var m = g({W: ["sync.cook"]}, [la.aa + "//" + k.domain + "/sync_cookie_image_check"], {Ea: 1500}),
							p;
						m.then(function () {
							p = c(Xa);
							l()
						})["catch"](function () {
							p = c(Xa) - 1435;
							l()
						});
						m = v(m, K);
						return h.then(m)
					}, J.resolve(""), b)["catch"](x(a, "ctl"))
				}, "sy.c"), Un = Ka(/^.+\.mtproxy\.yandex\.net$/), Ud = t(function (a) {
					if ("MetrikaPlayer" === a.name) return !0;
					a = M(a).hostname;
					return Un(a)
				}), ng = !1, Hk = /^[a-z][\w.+-]+:/i, ri = {}, ud, oa = [ke, vc, Bb(), je],
				Vn = Bb("et w v z i u vf".split(" "));
			oa.push(Tn);
			oa.unshift(function (a, b, c) {
				return {
					Z: function (d, e) {
						var f = Ea(a, c);
						(f = f && f.userParams) && d.Ia && f(d.Ia);
						e()
					}
				}
			});
			oa.unshift(function (a, b, c) {
				return {
					L: function (d, e) {
						if (d.H &&
							(th(c, d.H), !d.K && d.F && d.D)) {
							var f = Ab(a, d.H), g = oi(a), h = d.F.b("pv");
							f && !d.D.nohit && (h ? encodeURIComponent(f).length > la.ac ? g.push([d.F, d.H]) : d.D["site-info"] = f : (d.K = f, d.Hc = !0))
						}
						e()
					}, Z: function (d, e) {
						var f = oi(a), g = Ea(a, c), h = g && g.params;
						h && (g = Z(q(T("0"), sa(d.F)), f), D(function (k) {
							h(k[1]);
							k = Yh(a)(k, f);
							f.splice(k, 1)
						}, g));
						e()
					}
				}
			});
			oa.push(og);
			oa.push(mg);
			oa.push(Se);
			oa.push(function (a) {
				return {
					L: function (b, c) {
						var d = b.F, e = Aa(a).b("fip");
						e && d && (d.l("fip", e), qc(b, "fip", ji(e)));
						c()
					}
				}
			});
			oa.push(ge());
			var ia = (ud = {},
				ud.h = oa, ud.er = [], ud);
			ia.adb = [];
			var si = [Bb(), je];
			si.push(Se);
			ia.f = si;
			ia["2"] = oa;
			ia["1"] = function (a, b) {
				return Z(q(mb(b), Tb), a)
			}(oa, [je]);
			ia.a = oa;
			ia.g = oa;
			ia.e = oa;
			var ti = [vc];
			ti.push(function () {
				return function (a) {
					return {
						L: function (b, c) {
							var d = b.F, e = void 0 === d ? ha() : d, f = b.oa, g = rc(a);
							d = e.b("rqnl", 0) + 1;
							e.l("rqnl", d);
							if (e = n(g, B(".", [f, "browserInfo"]))) e.rqnl = d, he(a);
							c()
						}, Z: function (b, c) {
							yg(a, b);
							c()
						}
					}
				}
			}());
			ia.r = ti;
			ia["6"] = [vc];
			ia.t = oa;
			ia["4"] = [Vn];
			var Fc = [ke, vc, Bb()];
			Fc.push(og);
			Fc.push(Se);
			Fc.push(mg);
			Fc.push(ge());
			ia.n = Fc;
			ia.d = [Bb(["hid", "u", "v", "vf"])];
			ia.m = [Bb(["u", "v", "vf"]), ge()];
			ia.s = [];
			ia.u = [];
			ia.S = [Bb(["v", "hid", "u", "vf", "rn"])];
			ia.pi = [];
			oa.unshift(function (a, b, c) {
				return {
					L: function (d, e) {
						var f = d.F, g = d.D;
						if (!f || !g) return e();
						!ri[c.id] && f.b("pv") && c.exp && !g.nohit && (g.exp = c.exp, ri[c.id] = !0);
						f = g["page-ref"];
						var h = g["page-url"];
						f && h !== f ? g["page-ref"] = kg(a, f) : delete g["page-ref"];
						g["page-url"] = kg(a, h).slice(0, la.cc);
						return e()
					}
				}
			});
			ia["5"] = Z(q(mb([ke, vc]), Tb), oa);
			var vd, ui = E(J.reject, J, jb()), ba = (vd = {}, vd.h =
				Ca, vd.er = v(ui, K), vd);
			ba.a = Ca;
			ba["4"] = zg;
			ba.f = Ca;
			ba.n = Ca;
			ba["6"] = function (a, b, c) {
				var d = Cb(a, b);
				return function (e) {
					return ne(a, c, e, !0).then(G([e, ["https://mc.yandex.md/cc"], {kb: !0, Yb: !1}], d))
				}
			};
			ba["1"] = Ca;
			ba.n = Ca;
			ba.c = Cb;
			ba.g = Ca;
			ba.e = Ca;
			ba["2"] = Ca;
			ba.r = function (a, b, c) {
				var d = zg(a, b, c), e = Ca(a, b, c);
				return function (f, g, h) {
					return "webvisor" === h ? d(f, g, f.D["wv-part"]) : e(f, g)
				}
			};
			ba.adb = Wc;
			ba.s = Cb;
			ba.S = Ca;
			ba.u = Cb;
			ba.pi = Cb;
			ba.m = function (a, b, c) {
				return function (d, e) {
					var f, g = d.D;
					g = (f = {}, f["page-url"] = g && g["page-url"] ||
						"", f);
					f = F(d, {D: F(d.D || {}, g)});
					return Wc(a, b, c)(f, "clmap/" + e.id)["catch"](x(a, "c.m"))
				}
			};
			ba.d = Ca;
			ba.t = Ca;
			ba["5"] = Ca;
			var da = A("g.sen", function (a, b, c) {
					var d = ue(a, b);
					c = Ek(a, b, c);
					var e = ba[b], f = e ? e(a, d, c) : Ca(a, d, c);
					return function () {
						var g = na(arguments), h = g.slice(1);
						g = F(g[0], {W: [b]});
						return f.apply(void 0, P([g], h))
					}
				}, ui), hg = t(q(T("id"), mb([26812653])), Q), Wn = A("dc.init", function (a) {
					var b = M(a), c = Ec(a), d = xb(a), e = ig(a), f = e.Dc;
					e = e.Ac;
					f && !e && d.l("debug", "1", void 0, b.host);
					return Td(a) || !f && !e ? {log: C, warn: C, error: C} :
						c
				}), $d = t(Wn), Xn = x(window, "h.p", function (a, b) {
					var c, d, e = da(a, "h", b), f = b.wa || "" + M(a).href, g = b.xc || a.document.referrer,
						h = {F: ha((c = {}, c.pv = 1, c)), D: (d = {}, d["page-url"] = f, d["page-ref"] = g, d)};
					h.H = b.H;
					h.Ia = b.Ia;
					b.ua && h.D && (h.D.nohit = "1");
					return e(h, b).then(function (k) {
						k && (b.ua || lb(a, b, "PageView. Counter " + b.id + ". URL: " + f + ". Referrer: " + g, b.H)(), Ib(a, G([a, b, k], dl)))
					})["catch"](x(a, "h.g.s"))
				}), Gc = t(ld, Q), Yn = A("p.ar", function (a, b) {
					var c = da(a, "a", b);
					return function (d, e, f, g, h, k) {
						var l, m, p = {
							D: {}, F: ha((l = {}, l.pv =
								1, l.ar = 1, l))
						};
						d && (e = ic(e) ? {
							title: e.title,
							Hb: e.referer,
							H: e.params,
							ba: e.callback,
							o: e.ctx
						} : {
							title: e,
							Hb: f,
							H: g,
							ba: h,
							o: k
						}, f = Gc(b), f.url !== d && (f.Qc = f.url, f.url = d), d = d || M(a).href, f = e.Hb || f.Qc || a.document.referrer, g = lb(a, b, "PageView. Counter " + b.id + ". URL: " + d + ". Referrer: " + f, e.H), c(F(p, {
							H: e.H,
							title: e.title,
							D: F(p.D, (m = {}, m["page-url"] = d, m["page-ref"] = f, m))
						}), b).then(g)["catch"](x(a, "p.ar.s")).then(G([a, e.ba || C, e.o], ob)))
					}
				}), Zn = function () {
					function a(b, c, d) {
						this.Va = 1;
						this.lb = 5E3;
						this.o = b;
						this.Ob = c;
						this.Uc =
							d
					}
					
					a.prototype.Qb = function () {
						pa(this.o, q(E(this.flush, this), E(this.Qb, this)), this.lb, "b.f")
					};
					a.prototype.send = function (b, c) {
						this.Uc(b, c || [], this.Va);
						this.Va += 1
					};
					a.prototype.push = function () {
					};
					a.prototype.flush = function () {
					};
					return a
				}(), gg = aa(function (a, b) {
					return b[a] || {}
				}), Dk = aa(function (a, b, c) {
					var d = gg(a, c);
					c[a] = F(d, b)
				}), $n = aa(function (a, b) {
					delete b[a]
				}), ao = A("c.c.cc", function (a) {
					var b = L(a), c = q(v(a, Rc), za, function (d) {
						var e;
						return F({}, d, (e = {}, e.oldCode = !!a.ya_cid, e.clickmap = d.clickmap && !!d.clickmap,
							e))
					});
					return x(a, "g.c.cc", q(E(b.b, b, "counters", {}), ya, fb(c)))
				}), bo = A("gt.c.rs", function (a, b) {
					var c, d = Q(b), e = pc(a, d), f = b.id, g = b.M, h = b.lc, k = b.ra, l = b.gb;
					d = q(v(d, $n), Zd(a));
					e((c = {}, c.id = f, c.type = +g, c.clickmap = h, c.webvisor = !!k, c.trackHash = !!l, c));
					return d
				}), Fh, co = A("th.e", function (a, b) {
					function c() {
						f || (h = nc(a, "onhashchange") ? ja(a).C(a, ["hashchange"], g) : zm(a, g))
					}
					
					var d = da(a, "t", b), e = pc(a, Q(b)), f = !1, g = x(a, "h.h.ch", E(Am, null, a, b, d)), h = C;
					b.gb && (c(), f = !0);
					return {
						Yc: x(a, "tr.hs.h", function (k) {
							var l;
							k ? c() : h();
							f = !!k;
							e((l = {}, l.trackHash = f, l))
						}), unsubscribe: h
					}
				}), eo = {
					1882689622: 1,
					2318205080: 1,
					3115871109: 1,
					3604875100: 1,
					339366994: 1,
					2890452365: 1,
					849340123: 1,
					173872646: 1,
					2343947156: 1,
					655012937: 1,
					3724710748: 1,
					3364370932: 1,
					1996539654: 1,
					2065498185: 1,
					823651274: 1,
					12282461: 1,
					1555719328: 1,
					1417229093: 1,
					138396985: 1
				}, Gh = 1, Ie = {}, od = {}, ho = A("nb.p", function (a, b) {
					function c(H) {
						k() || (H = "number" === typeof H ? H : 15E3, H = Cm(a, d(!1), H), r = H.id, y = H.rb, l())
					}
					
					function d(H) {
						return function (X) {
							var Ga, Qa, Hc;
							void 0 === X && (X = (Ga = {}, Ga.ctx = {}, Ga.callback =
								C, Ga));
							if (H || !u && !h.Qa) {
								u = !0;
								l();
								r && Bm(a, r);
								var wd = m(U);
								Ga = (parseInt(h.b("lastHit"), 10) || 0) < wd - 18E5;
								var fo = .1 > Math.random();
								h.l("lastHit", wd);
								wd = ha((Qa = {}, Qa.nb = "1", Qa.cl = w, Qa.ar = "1", Qa));
								Qa = Gc(b);
								Qa = {D: (Hc = {}, Hc["page-url"] = Qa.url || M(a).href, Hc), F: wd};
								Hc = Ec(a).warn;
								!X.callback && X.ctx && Hc('"callback" argument missing');
								(H || Ga || fo || !sl(a.location.href, a.document.referrer)) && f(Qa, b).then(function () {
									if (!H) {
										var $b = .002, ac = b.id === la.dc ? 1 : .002, bc, xd, Te, yd, Ue;
										void 0 === $b && ($b = 1);
										void 0 === ac && (ac = 1);
										var Ic =
											a.performance;
										if (Ic && O(Ic.getEntriesByType) && ($b = Math.random() > $b, ac = Math.random() > ac, !$b || !ac)) {
											Ic = a.performance.getEntriesByType("resource");
											for (var zd = {}, Ve = {}, Ad = {}, We = 0; We < Ic.length; We += 1) {
												var ab = Ic[We], Bd = ab.name.replace(/^https?:\/\//, "").split("?")[0],
													go = sc(Bd),
													vi = (bc = {}, bc.dns = Math.round(ab.domainLookupEnd - ab.domainLookupStart), bc.tcp = Math.round(ab.connectEnd - ab.connectStart), bc.duration = Math.round(ab.duration), bc.response = Math.round(ab.responseEnd - ab.requestStart), bc);
												"script" !== ab.initiatorType ||
												$b || (Ve[Bd] = F(vi, (xd = {}, xd.name = ab.name, xd.decodedBodySize = ab.decodedBodySize, xd)));
												!eo[go] || zd[Bd] || ac || (zd[Bd] = F(vi, (Te = {}, Te.pages = a.location.href, Te)))
											}
											ya(zd).length && (Ad.timings8 = zd);
											ya(Ve).length && (Ad.scripts = Ve);
											if (ya(Ad).length) da(a, "d", b)({
												F: ha((yd = {}, yd.ar = "1", yd.pv = "1", yd)),
												K: Ab(a, Ad) || void 0,
												D: (Ue = {}, Ue["page-url"] = a.location && "" + a.location.href, Ue)
											}, {id: la.ec, M: "0"})["catch"](x(a, "r.tim.ng2"))
										}
									}
								}).then(G([a, X.callback, X.ctx], ob), x(a, "l.o.l"))
							}
						}
					}
					
					var e, f = da(a, "n", b), g = Q(b), h = td(a, b.id),
						k = v(Rc(a, g), q(za, T("accurateTrackBounce"))),
						l = v((e = {}, e.accurateTrackBounce = !0, e), pc(a, g)), m = W(a), p = m(U), u = !1, r = 0, w = 0,
						y;
					Da(a, b, function (H) {
						w = H.wc - p
					});
					b.sa && c(b.sa);
					return {Jc: d(!0), sa: c, Na: y}
				}), Xe = ["yandex_metrika_callback" + wc.callbackPostfix, "yandex_metrika_callbacks" + wc.callbackPostfix],
				io = A("cb.i", function (a) {
					var b = Xe[0], c = Xe[1];
					if (O(a[b])) a[b]();
					"object" === typeof a[c] && D(function (d, e) {
						a[c][e] = null;
						ob(a, d)
					}, a[c]);
					D(function (d) {
						try {
							delete a[d]
						} catch (e) {
							a[d] = void 0
						}
					}, Xe)
				}), wi = {xd: Ka(/[/&=?#]/)}, Gd =
					A("go.in", function (a, b, c, d) {
						void 0 === c && (c = "goal");
						return function (e, f, g, h) {
							var k, l;
							if (!(!e || wi[c] && wi[c](e))) {
								var m = f, p = g || C;
								O(f) && (p = f, m = void 0, h = g);
								f = lb(a, b, "Reach goal. Counter: " + b.id + ". Goal id: " + e, m);
								g = "goal" === c;
								var u = da(a, "g", b);
								var r = c;
								var w = M(a);
								var y = w.hostname;
								w = w.href;
								var H = Gc(b).url;
								H && (w = Yd(a, H), y = w.hostname, w = w.href);
								r = [r + "://" + y + "/" + e, w || ""];
								e = r[0];
								r = r[1];
								u({
									H: m,
									F: ha((k = {}, k.ar = 1, k)),
									D: (l = {}, l["page-url"] = e, l["page-ref"] = r, l)
								}, b).then(q(g ? f || C : C, d || C))["catch"](x(a, "g.s")).then(E(ob,
									null, a, p, h))
							}
						}
					}), Bk = /^ *(data|javascript):/i,
				eg = new RegExp(B("", ["\\.(" + B("|", "3gp 7z aac ac3 acs ai avi ape apk asf bmp bz2 cab cdr crc32 css csv cue divx dmg djvu? doc(x|m|b)? emf eps exe flac? flv iso swf gif t?gz jpe?g? js m3u8? m4a mp(3|4|e?g?) m4v md5 mkv mov msi ods og(g|m|v) psd rar rss rtf sea sfv sit sha1 svg tar tif?f torrent ts txt vob wave? wma wmv wmf webm ppt(x|m|b)? xls(x|m|b)? pdf phps png xpi g?zip".split(" ")) + ")$"]), "i"),
				jo = ra(function (a, b) {
					Va(b) ? a.push(b) : D(q(K, ca("push", a)),
						b)
				}), ko = A("cl.p", function (a, b) {
					function c(m, p, u, r) {
						void 0 === r && (r = {});
						u ? Qc(a, b, {
							url: u,
							ha: !0,
							ya: m,
							Aa: p,
							sender: d,
							o: r.ctx,
							ba: r.callback,
							title: r.title,
							H: r.params
						}) : f.warn("Empty link")
					}
					
					var d = da(a, "2", b), e = [], f = Ec(a), g = Q(b), h = x(a, "s.s.tr", v(pc(a, g), Ck));
					g = {
						o: a,
						oc: b,
						vc: e,
						sender: d,
						globalStorage: L(a),
						nc: td(a, b.id),
						Bc: Qb(a),
						Zc: v(Rc(a, g), q(za, T("trackLinks")))
					};
					g = x(a, "cl.p.c", v(g, zk));
					g = ja(a).C(a, ["click"], g);
					b.Fa && h(b.Fa);
					var k = x(a, "file.clc", G([!0, !1], c)), l = x(a, "e.l.l.clc", G([!1, !0], c));
					e = x(a, "add.f.e.clc",
						jo(e));
					return {file: k, tc: l, ic: e, Fa: h, Na: g}
				}),
				lo = [[["'(-$&$&$'", 30102, 0], ["'(-$&$&$'", 29009, 0]], [["oWdZ[nc[jh_YW$Yec", 30103, 1], ["oWdZ[nc[jh_YW$Yec", 29010, 1]]],
				mo = [[["oWdZ[nc[jh_YW$Yec", 30103, 1]], [["oWdZ[nc[jh_YW$Yec", 29010, 1]]],
				xk = {D: {t: 'UV|L7,!"T[rwe&D_>ZIb\\aW#98Y.PC6k'}}, cg = {id: 42822899, M: "0"},
				uk = yc("csp", function (a, b) {
					return da(a, "s", b)({}, ["https://ymetrica1.com/watch/3/1"])
				}), dg = q(T("settings.pcs"), sa("1")), no = A("s", function (a, b) {
					return Da(a, b, function (c) {
						var d = W(a), e = yk(a, c.userData, b), f = hd(a),
							g = q(Pe, mb(["iPhone", "iPad"]))(a);
						return (f || g) && sk(a, d, b, e, c).then(function () {
							if (f) var h = lo; else if (g) h = mo; else return;
							return qk(a, h, b, e, d)
						}, C)
					})
				}), oo = t(q(T("performance.memory.jsHeapSizeLimit"), ca("concat", ""))),
				ag = "video/ogg video/mp4 video/webm audio/x-aiff audio/x-m4a audio/mpeg audio/aac audio/wav audio/ogg audio/mp4".split(" "),
				ok = "theora vorbis 1 avc1.4D401E mp4a.40.2 vp8.0 mp4a.40.5".split(" "),
				nk = "prefers-reduced-motion;prefers-reduced-transparency;prefers-color-scheme: dark;prefers-color-scheme: light;pointer: none;pointer: coarse;pointer: fine;any-pointer: none;any-pointer: coarse;any-pointer: fine;scan: interlace;scan: progressive;color-gamut: srgb;color-gamut: p3;color-gamut: rec2020;update: fast;update: slow;update: none;grid: 0;grid: 2;hover: hover;inverted-colors: inverted;inverted-colors: none".split(";"),
				mk = ["availWidth", "availHeight", "availTop"], po = ["webgl", "experimental-webgl"],
				kk = [-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0],
				hk = "appName vendor deviceMemory hardwareConcurrency maxTouchPoints appVersion productSub appCodeName vendorSub".split(" "),
				bk = ra(nb)("(ym-disable-clickmap|ym-clickmap-ignore)"), qo = A("clm.p", function (a, b) {
					if (Xc(a)) return C;
					var c = da(a, "m", b), d = Q(b), e = W(a), f = e(U), g = v(Rc(a, d), q(za, T("clickmap"))), h, k = null;
					d = x(a, "clm.p.c", function (l) {
						var m = g();
						if (m) {
							var p = "object" === typeof m ? m : {}, u = p.filter;
							m = p.isTrackHash || !1;
							var r = I(function (y) {
								return ("" + y).toUpperCase()
							}, p.ignoreTags || []);
							V(h) && (h = p.quota || null);
							var w = !!p.quota;
							l = {element: ck(a, l), position: Mc(a, l), button: dk(l), time: e(U)};
							p = M(a).href;
							if (ak(a, l, k, r, u)) {
								if (w) {
									if (!h) return;
									--h
								}
								r = ed(a, l.element);
								u = r[0];
								r = r[1];
								w = ze(a, l.element);
								u = ["rn", Ta(a), "x", Math.floor(65535 * (l.position.x - w.left) / (u || 1)), "y", Math.floor(65535 * (l.position.y - w.top) / (r || 1)), "t", Math.floor((l.time - f) / 100), "p", ih(a, l.element), "X", l.position.x, "Y", l.position.y];
								u = B(":", u);
								m && (u += ":wh:1");
								Zj(a, p, u, c, b);
								k = l
							}
						}
					});
					return ja(a).C(n(a, "document"), ["click"], d)
				}), ro = t(function (a) {
					var b = L(a), c = b.b("isEU");
					if (V(c)) {
						var d = parseInt(jc(a, "is_gdpr") || "", 10);
						if (N(d, [0, 1])) b.l("isEU", d), c = !!d; else if (a = Aa(a).b("wasSynced"), a = n(a, "params.eu")) b.l("isEU", a), c = !!a
					}
					return c
				}, function (a) {
					return L(a).b("isEU")
				}), so = A("i.e", ro), to = function () {
					function a(b, c) {
						this.o = b;
						this.yc = c
					}
					
					a.prototype.$a = function (b) {
						return wl(vb(E(this.Nb, this), b))
					};
					a.prototype.Nb = function (b, c) {
						var d = this, e = [], f = this.yc(this.o,
							c && c.type, b.type);
						f && (e = vb(function (g) {
							return g({o: d.o, N: b}) || []
						}, f));
						return e
					};
					a.prototype.zc = function (b) {
						return b.length
					};
					a.prototype.isEnabled = function () {
						return !0
					};
					return a
				}(), Nj = function (a) {
					function b(c, d, e) {
						c = a.call(this, c, d, e) || this;
						c.buffer = [];
						c.$b = 7500;
						c.lb = 3E4;
						c.Qb();
						return c
					}
					
					pm(b, a);
					b.prototype.push = function (c, d) {
						var e = this.Ob.Nb(c, d);
						Ja(this.buffer, e);
						this.Ob.zc(this.buffer) > this.$b && this.flush()
					};
					b.prototype.flush = function () {
						var c = this.buffer;
						c.length && (this.send(c), this.buffer = [])
					};
					return b
				}(Zn),
				ma = "metrikaId_" + Math.random(), yb = {Ka: 0},
				xi = "first(-|\\.|_|\\s){0,2}name last(-|\\.|_|\\s){0,2}name zip postal phone address passport (bank|credit)(-|\\.|_|\\s){0,2}card card(-|\\.|_|\\s){0,2}number card(-|\\.|_|\\s){0,2}holder cvv card(-|\\.|_|\\s){0,2}exp card(-|\\.|_|\\s){0,2}name card.*month card.*year card.*month card.*year password email birth(-|\\.|_|\\s){0,2}(day|date) second(-|\\.|_|\\s){0,2}name third(-|\\.|_|\\s){0,2}name patronymic middle(-|\\.|_|\\s){0,2}name birth(-|\\.|_|\\s){0,2}place house street city flat state contact.*".split(" "),
				Uj = ["email", "tel"], Xj = /ym-hide-content/, Yj = /ym-show-content/,
				Vj = new RegExp("(" + B("|", xi) + ")", "i"), Hh = ["password", "passwd", "pswd"],
				Wj = new RegExp("(" + B("|", xi.concat("\u0438\u043c\u044f \u0444\u0430\u043c\u0438\u043b\u0438\u044f \u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u043d\u0434\u0435\u043a\u0441 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0430\u0434\u0440\u0435\u0441 \u043f\u0430\u0441\u043f\u043e\u0440\u0442 \u043d\u043e\u043c\u0435\u0440(-|\\.|_|\\s){0,2}\u043a\u0430\u0440\u0442\u044b \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0430\u044f(-|\\.|_|\\s){0,2}\u043f\u043e\u0447\u0442\u0430 \u0434\u0430\u0442\u0430(-|\\.|_|\\s){0,2}\u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f \u0434\u043e\u043c \u0443\u043b\u0438\u0446\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0433\u043e\u0440\u043e\u0434 \u043e\u0431\u043b\u0430\u0441\u0442\u044c".split(" "))) +
					")", "i"), Fm = t(function () {
					var a;
					return a = {}, a.A = 1, a.ABBR = 2, a.ACRONYM = 3, a.ADDRESS = 4, a.APPLET = 5, a.AREA = 6, a.B = 7, a.BASE = 8, a.BASEFONT = 9, a.BDO = 10, a.BIG = 11, a.BLOCKQUOTE = 12, a.BODY = 13, a.BR = 14, a.BUTTON = 15, a.CAPTION = 16, a.CENTER = 17, a.CITE = 18, a.CODE = 19, a.COL = 20, a.COLGROUP = 21, a.DD = 22, a.DEL = 23, a.DFN = 24, a.DIR = 25, a.DIV = 26, a.DL = 27, a.DT = 28, a.EM = 29, a.FIELDSET = 30, a.FONT = 31, a.FORM = 32, a.FRAME = 33, a.FRAMESET = 34, a.H1 = 35, a.H2 = 36, a.H3 = 37, a.H4 = 38, a.H5 = 39, a.H6 = 40, a.HEAD = 41, a.HR = 42, a.HTML = 43, a.I = 44, a.IFRAME = 45, a.IMG = 46, a.INPUT =
						47, a.INS = 48, a.ISINDEX = 49, a.KBD = 50, a.LABEL = 51, a.LEGEND = 52, a.LI = 53, a.LINK = 54, a.MAP = 55, a.MENU = 56, a.META = 57, a.NOFRAMES = 58, a.NOSCRIPT = 59, a.OBJECT = 60, a.OL = 61, a.OPTGROUP = 62, a.OPTION = 63, a.P = 64, a.PARAM = 65, a.PRE = 66, a.Q = 67, a.S = 68, a.SAMP = 69, a.SCRIPT = 70, a.SELECT = 71, a.SMALL = 72, a.SPAN = 73, a.STRIKE = 74, a.STRONG = 75, a.STYLE = 76, a.SUB = 77, a.SUP = 78, a.TABLE = 79, a.TBODY = 80, a.TD = 81, a.TEXTAREA = 82, a.TFOOT = 83, a.TH = 84, a.THEAD = 85, a.TITLE = 86, a.TR = 87, a.TT = 88, a.U = 89, a.UL = 90, a.VAR = 91, a.NOINDEX = 100, a
				}), uo = function () {
					var a = "first(-|\\.|_|\\s){0,2}name last(-|\\.|_|\\s){0,2}name zip postal phone address passport (bank|credit)(-|\\.|_|\\s){0,2}card card(-|\\.|_|\\s){0,2}number card(-|\\.|_|\\s){0,2}holder cvv card(-|\\.|_|\\s){0,2}exp card(-|\\.|_|\\s){0,2}name card.*month card.*year card.*month card.*year password email birth(-|\\.|_|\\s){0,2}(day|date) second(-|\\.|_|\\s){0,2}name third(-|\\.|_|\\s){0,2}name patronymic middle(-|\\.|_|\\s){0,2}name birth(-|\\.|_|\\s){0,2}place house street city flat state".split(" ");
					return {
						vd: new RegExp("(" + B("|", a) + ")", "i"),
						Ad: new RegExp("(" + B("|", a.concat("\u0438\u043c\u044f;\u0444\u0430\u043c\u0438\u043b\u0438\u044f;\u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e;\u0438\u043d\u0434\u0435\u043a\u0441;\u0442\u0435\u043b\u0435\u0444\u043e\u043d;\u0430\u0434\u0440\u0435\u0441;\u043f\u0430\u0441\u043f\u043e\u0440\u0442;\u041d\u043e\u043c\u0435\u0440(-|\\.|_|\\s){0,2}\u043a\u0430\u0440\u0442\u044b;\u0434\u0430\u0442\u0430(-|\\.|_|\\s){0,2} \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f;\u0434\u043e\u043c;\u0443\u043b\u0438\u0446\u0430;\u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430;\u0433\u043e\u0440\u043e\u0434;\u043e\u0431\u043b\u0430\u0441\u0442\u044c".split(";"))) +
							")", "i"),
						ud: /ym-record-keys/i,
						Lc: "\u2022",
						zd: 88
					}
				}(), Mh = fb(v(uo.Lc, K)), kc = !0, Le = "", Me = !1, Ne = !0, Oe = !1, Sj = ra(function (a, b) {
					var c = G([a, "efv." + b.event], x);
					b.G = I(q(K, c), b.G);
					return b
				}), vo = t(function (a) {
					var b = [], c = [], d = [];
					a.document.attachEvent && !a.opera && (b.push(Wd), c.push(Jm), c.push(Km));
					a.document.addEventListener ? b.push(Kh) : (c.push(Jh), d.push(Kh));
					b = P([{target: a, type: "window", event: "beforeunload", G: [C]}, {
						target: a,
						type: "window",
						event: "unload",
						G: [C]
					}, {event: "click", G: [ec]}, {event: "dblclick", G: [ec]}, {
						event: "mousedown",
						G: [ec]
					}, {event: "mouseup", G: [Mm]}, {event: "keydown", G: [Nm]}, {
						event: "keypress",
						G: [Om]
					}, {event: "copy", G: [Oh]}, {event: "blur", G: b}, {event: "focusin", G: c}, {
						event: "focusout",
						G: d
					}], !a.document.attachEvent || a.opera ? [{
						target: a,
						type: "window",
						event: "focus",
						G: [Tf]
					}, {
						target: a,
						type: "window",
						event: "blur",
						G: [Wd]
					}] : [], a.document.addEventListener ? [{event: "focus", G: [Jh]}, {
						event: "change",
						G: [Lh]
					}, {event: "submit", G: [Qh]}] : [{type: "formInput", event: "change", G: [Lh]}, {
						type: "form",
						event: "submit",
						G: [Qh]
					}]);
					return Qf(a, b)
				}), Qj =
					t(function (a) {
						return P(Vb(a) ? [{target: a, type: "document", event: "mouseleave", G: [Pm]}] : [])
					}), wo = ["submit", "beforeunload", "unload"], xo = t(function (a, b) {
					var c = b(a);
					return S(function (d, e) {
						d[e.type + ":" + e.event] = e.G;
						return d
					}, {}, c)
				}), Rj = /^\s*function submit\(\)/, Pj = /opera mini/i, yo = A("pr.p", function (a, b) {
					var c, d;
					if (le(a)) {
						var e = da(a, "5", b), f = ha((c = {}, c.pq = 1, c.ar = 1, c));
						e({
							F: f,
							D: (d = {}, d["page-url"] = M(a).href, d["page-ref"] = n(a, "document.referrer") || "", d)
						}, b)["catch"](x(a, "pr.p.s"))
					}
				}), Wa = q(ya, T("0")), zo = A("c.m.p",
					function (a, b) {
						var c = Q(b);
						return v(pc(a, c), Lj)
					}), Ao = A("e.a.p", function (a, b) {
					var c = Ea(a, b);
					c = G([q(K, va(!0)), Z(Boolean, I(v(c, n), ["clickmap", "trackLinks", "accurateTrackBounce"]))], I);
					b.sc && c();
					return c
				}), Bo = A("cc.i", function (a, b) {
					var c = G([a, b], Kj);
					c = G([a, c, 300], pa);
					Da(a, b, c)
				}), Co = A("s.f.i", function (a, b) {
					return Da(a, b, function (c) {
						if (n(c, "settings.button_goals") || -1 !== M(a).href.indexOf("yagoalsbuttons=1")) ja(a).C(a, ["click"], x(a, "c.t.c", q(T("target"), G([a, b], pd(a, b, Jj))))), lb(a, b, "Button goal. Counter " +
							b.id + ". Init.")()
					})
				}), Do = A("p.fh", function (a, b) {
					var c, d;
					void 0 === b && (b = !0);
					var e = Aa(a), f = W(a), g = e.b("wasSynced"), h = {id: 3, M: "0"};
					return b && g && g.time + 864E5 > f(U) ? J.resolve(g) : da(a, "f", h)({
						F: ha((c = {}, c.pv = 1, c)),
						D: (d = {}, d["page-url"] = M(a).href, d["page-ref"] = a.document.referrer, d)
					}, h).then(function (k) {
						var l;
						k = (l = {}, l.time = f(U), l.params = n(k, "settings"), l.bkParams = n(k, "userData"), l);
						e.l("wasSynced", k);
						return k
					})["catch"](x(a, "f.h"))
				}), Eo = A("pa.int", function (a, b) {
					return x(a, "pa.c", function () {
						var c, d;
						var e =
							na(arguments), f = C;
						var g = null;
						var h = e.length;
						if (0 !== e.length && e[0]) {
							var k = e.slice(-1)[0];
							O(k) && (f = k, h = e.length + -1);
							var l = e.slice(-2)[0];
							O(l) && (f = l, g = k, h = e.length + -2);
							h = e.slice(0, h);
							g = {pc: g, ba: f, H: 1 === h.length ? e[0] : cc(h)}
						} else g = void 0;
						if (g && (e = g.pc, f = g.H, g = g.ba, ic(f) || Ia(f))) {
							h = da(a, "1", b);
							k = Gc(b).url;
							l = n(f, "__ym.user_id");
							var m = ya(f), p = N("__ymu", m), u = N("__ym", m) && l;
							m = !hg(b);
							l = lb(a, b, u ? "Set user id " + l : (p ? "User p" : "P") + "arams. Counter " + b.id, u ? void 0 : JSON.stringify(f));
							h({
								H: f, F: ha((c = {}, c.pa = 1, c.ar =
									1, c)), D: (d = {}, d["page-url"] = k || M(a).href, d)
							}, b).then(m ? l : C)["catch"](x(a, "p.s")).then(E(ob, null, a, g, e))
						}
					})
				}), Fo = A("exps.int", function (a, b) {
					return x(a, "e.m", function (c, d, e) {
						var f, g;
						void 0 === d && (d = C);
						if (c && 0 < c.length) {
							var h = da(a, "e", b), k = Gc(b).url;
							return h({
								F: ha((f = {}, f.ex = 1, f.ar = 1, f)),
								D: (g = {}, g["page-url"] = k || M(a).href, g.exp = c, g)
							}, b).then(E(ob, null, a, d, e), x(a, "exps.s"))
						}
					})
				}), Go = A("y.p", function (a, b) {
					var c = wg(a, b);
					if (c) {
						var d = ae(a), e = G([a, c, b], Ij);
						tg(a, d, function (f) {
							f.C("params", e)
						});
						c.X.C("params",
							q(T("1"), e))
					}
				}), bb, Gb,
				Sd = (bb = {}, bb.transaction_id = "id", bb.item_id = "id", bb.item_name = "name", bb.item_brand = "brand", bb.promotion_name = "coupon", bb.index = "position", bb.item_variant = "variant", bb.value = "revenue", bb.item_category = "category", bb),
				Jf = (Gb = {}, Gb.view_item = "detail", Gb.add_to_cart = "add", Gb.remove_from_cart = "remove", Gb.begin_checkout = "checkout", Gb.purchase = "purchase", Gb),
				Fj = "currencyCode add delete remove purchase checkout detail".split(" "),
				yi = A("dl.w", function (a, b, c) {
					var d;
					re(a, a[b], function (e) {
						c(e)
					}) ||
					(d = pa(a, function () {
						yi(a, b, c)
					}, 1E3, "ec.dl"));
					return E(Ua, null, a, d)
				}), Ho = A("p.e", function (a, b) {
					var c = Ea(a, b);
					if (c && b.Oa) {
						c = E(c.params, c);
						var d = x(a, "h.ee", G([a, c], Dj));
						return yi(a, b.Oa, function (e) {
							e.C(d)
						})
					}
				}), Io = A("fid", function (a) {
					var b, c = C;
					if (!O(a.PerformanceObserver)) return c;
					var d = L(a);
					if (d.b("fido")) return c;
					d.l("fido", !0);
					var e = new a.PerformanceObserver(x(a, "fid", function (f) {
						f = f.getEntries()[0];
						d.l("fid", a.Math.round(100 * (f.processingStart - f.startTime)));
						c()
					}));
					c = function () {
						return e.disconnect()
					};
					try {
						e.observe((b = {}, b.type = "first-input", b.buffered = !0, b))
					} catch (f) {
					}
					return c
				}), Cd = aa(function (a, b, c, d) {
					var e, f;
					(c = Ea(b, c)) && Gj(a, d, b) && (b = E(c.params, c), (a = Qd(a, d, "goods")) && b && b((e = {}, e.__ym = (f = {}, f.ecommerce = [a], f), e)))
				}), Jo = A("ecm.a", Cd("add")), Ko = A("ecm.r", Cd("remove")), Lo = A("ecm.d", Cd("detail")),
				Mo = A("ecm.p", Cd("purchase")), ff = tn("form"), No = gi("form"), Gf = t(function (a) {
					return B("[^\\d<>]*", a.split(""))
				}), tj = t(function (a) {
					return new RegExp(Gf(a), "g")
				}), hc = q(v("replace", ca), jg([/\D/g, ""]), za), Aj =
					/\S/,
				Af = v(["style", "display:inline;margin:0;padding:0;font-size:inherit;color:inherit;line-height:inherit"], cc),
				vj = ["https://iframe-toloka.com/"],
				vf = Ka(/^https:\/\/(yastatic\.net\/s3\/metrika|s3\.mds\.yandex\.net\/internal-metrika-betas|[\w-]+\.dev\.webvisor\.com|[\w-]+\.dev\.metrika\.yandex\.ru)\/(\w|-|\/|(\.)(?!\.))+\.js$/),
				Oo = ["form", "button", "phone"], uf = t(function (a, b, c, d) {
					var e, f, g, h = c.resource, k = c.data;
					k = void 0 === k ? "" : k;
					if (c.inline) {
						b = L(a);
						var l = {};
						l.getCachedTags = jh;
						l.form = (e = {}, e.closest =
							v(a, ff), e.select = v(a, No), e.getData = v(a, hf), e);
						l.button = (f = {}, f.closest = v(a, Kf), f.select = v(a, dh), f.getData = v(a, Lf), f);
						l.phone = (g = {}, g.hidePhones = G([a, null, [k]], wf), g);
						b.l("_u", l);
						d ? c = h : (d = c.lang, d = void 0 === d ? "" : d, e = c.appVersion, e = void 0 === e ? "" : e, f = c.fileId, f = void 0 === f ? "" : f, c = c.beta, c = void 0 === c ? !1 : c, e = B(".", q(fb(q(K, parseInt)), Nb(Boolean))(e.split("."))), N(f, Oo) && N(d, ["ru", "en", "tr"]) ? (c = (c ? "https://s3.mds.yandex.net/internal-metrika-betas" : "https://yastatic.net/s3/metrika") + (e ? "/" + e : "") + "/form-selector/" +
							(f + "_" + d + ".js"), c = vf(c) ? c : "") : c = "");
						c && gc(a, {src: c})
					} else a._ym__postMessageEvent = b, a._ym__inpageMode = c.inpageMode, a._ym__initMessage = c.initMessage, wj(a, c.resource)
				}, function (a, b, c) {
					return c.id
				}), zi = t(function (a) {
					return Xc(a) || !ka("querySelectorAll", a.document.querySelectorAll)
				}), qj = t(xf), tf = t(wb, hb), Po = A("phc.p", function (a, b) {
					return zi(a) ? C : Da(a, b, function (c) {
						var d = b.id, e = fc(a, void 0, d), f = e.b("phc_settings") || "";
						if (c = n(c, "settings.phchange")) {
							var g = Ab(a, c) || "";
							g !== f && e.l("phc_settings", g)
						} else f &&
						(c = tf(a, f));
						e = n(c, "clientId");
						f = n(c, "orderId");
						c = n(c, "phones") || [];
						e && f && c.length && (f = {
							ga: "",
							ia: "",
							Pb: 0,
							O: {},
							T: [],
							vb: !1,
							Pa: !0,
							o: a,
							qb: b
						}, F(f, {vb: !0}), sf(a, d, f), c = ib(a), e = yf(a, c, 1E3), d = E(sf, null, a, d, f), e.C(d), zf(a, c))
					})
				}), Qo = A("phc.h", function (a, b) {
					return cm(a) || zi(a) ? null : Da(a, b, function (c) {
						if (!n(c, "settings.phchange")) {
							var d = fc(a, "").b("yaHidePhones");
							d = d ? wb(a, d) : "";
							(c = n(c, "settings.phhide") || d) && wf(a, b, c)
						}
					})
				}), Ro = A("up.int", function (a, b) {
					return x(a, "up.c", function (c, d, e) {
						var f, g = Ea(a, b), h = $d(a).warn;
						g ? ic(c) ? (c = (f = {}, f.__ymu = c, f), (f = g.params) && f(c, d || C, e)) : h("Wrong user params") : h("No counter instance found")
					})
				}), So = A("trigger.in", function (a, b) {
					b.Ub && Ib(a, G([a, "yacounter" + b.id + "inited"], Vl), "t.i")
				}), To = A("destruct.e", function (a, b, c) {
					return function () {
						var d = L(a), e = b.id;
						D(function (f, g) {
							return O(f) && x(a, "dest.fr." + g, f)()
						}, c);
						delete d.b("counters")[Q(b)];
						delete a["yaCounter" + e]
					}
				}), Uo = A("fip", function (a, b) {
					if (!ki(a) || uc(a)) {
						var c = Aa(a);
						if (!c.b("fip")) {
							var d = q(fb(q(function (e, f) {
									return A("fip." + f, e)(a)
								},
								E(xm, null))), oc("-"))(b);
							c.l("fip", d)
						}
					}
				}), Vo = v("9-d5ve+.r%7", K), Wo = A("ad", function (a, b) {
					if (!b.ca) {
						var c = L(a);
						if (!c.b("adBlockEnabled")) {
							var d = function (m) {
								N(m, ["2", "1"]) && c.l("adBlockEnabled", m)
							}, e = xb(a), f = e.b("isad");
							if (f) d(f); else {
								var g = v("adStatus", c.l), h = function (m) {
									m = m ? "1" : "2";
									d(m);
									g("complete");
									e.l("isad", m, 1200);
									return m
								}, k = da(a, "adb", b);
								if (!c.b("adStatus")) {
									g("process");
									var l = "metrika/a" + Vo().replace(/[^a-v]+/g, "") + "t.gif";
									nj(a, function () {
										return k({}, l).then(v(!1, h))["catch"](v(!0, h))
									})
								}
							}
						}
					}
				}),
				Xo = A("pa.plgn", function (a, b) {
					var c = Vc(a, b);
					c && c.X.C("pluginInfo", x(a, "c.plgn", function () {
						return bm(b, ai)
					}))
				}), Yo = A("suid.int", function (a, b) {
					return x(a, "suid.c", function (c, d, e) {
						var f = Ea(a, b), g = Ec(a);
						Va(c) || Nc(a, c) ? (c = cc(["__ym", "user_id", c]), f.params(c, d || C, e)) : g.error("Incorrect user ID")
					})
				}), Zo = A("guid.int", function (a, b) {
					return x(a, "guid.c", function (c) {
						var d = Tg(a, b);
						c && ob(a, c, null, d);
						return d
					})
				}), rf = 0, Nd = {x: 0, y: 0}, qf = 0, Md = {x: 0, y: 0}, Jd = {}, Ai = t(function (a) {
					var b = P([{event: "mousemove", G: [mj]}, {
						target: a,
						type: "window", event: "scroll", G: [mf]
					}, {event: "onmousewheel" in a.document ? "mousewheel" : "wheel", G: [lj]}, {
						target: a,
						type: "window",
						event: "beforeunload",
						G: [pf]
					}], Wh(a) ? [{target: a, type: "window", event: "unload", G: [pf]}] : [], [{
						target: a,
						type: "window",
						event: "resize",
						G: [kj]
					}, {event: "touchmove", G: [lf]}, {
						event: "touchstart",
						G: [lf]
					}], a.document.addEventListener ? [{event: "scroll", G: [jj]}] : []);
					return P(vo(a), Qf(a, b))
				}), $o = v(Ai, function (a, b, c, d) {
					return xo(b, a)[c + ":" + d] || []
				}), ap = t(function (a) {
					return P(wo, ["beforeunload"],
						Wh(a) ? ["unload"] : [])
				}), bp = A("wv.p", function (a, b) {
					if (!b.ra) return J.resolve(C);
					var c = new to(a, $o);
					return Mj(a, b, c, Ai, ap(a))
				}), cp = ra(function (a, b) {
					0 === parseFloat(n(b, "settings.c_recp")) && (a.Ua.l("ymoo" + a.pb, a.Sb(Xa)), a.La && a.La.destruct && a.La.destruct())
				}), dp = A("wsa", function (a, b) {
					var c = {pb: Q(b), La: Ea(a, b), Sb: W(a), Ua: Aa(a)}, d = c.Sb(Xa);
					if (c.Ua.Qa) return !1;
					var e = c.Ua.b("ymoo" + c.pb);
					if (e && 30 > d - e) return !0;
					Da(a, b, cp(c))["catch"](x(a, "d.f"));
					return !1
				}), ep = q(function (a) {
					a = n(a, "navigator.plugins") || [];
					return Kb(a) ?
						q(xa, Nb(Boolean), Tm(function (b, c) {
							return b.name > c.name ? 1 : 2
						}), fb(ik))(a) : ""
				}, oc(",")), fp = function (a) {
					return function (b) {
						var c = eb(b);
						if (!c) return "";
						c = c("canvas");
						var d = [], e = a(), f = e.uc;
						e = e.qc;
						try {
							var g = ca("getContext", c);
							d = I(q(K, g), e)
						} catch (h) {
							return ""
						}
						return (g = Sb(K, d)) ? f(b, {canvas: c, kc: g}) : ""
					}
				}(function () {
					return {qc: po, uc: cj}
				}), Yi = ["name", "lang", "localService", "voiceURI", "default"], Ti = t(function (a, b) {
					return Da(a, b, T("settings.form_goals"))
				}, hb), gp = v(!0, gf), hp = A("s.f.i", function (a, b) {
					var c = [];
					ja(a).C(a,
						["click"], x(a, "s.f.c", G([a, b, c], Si)));
					ja(a).C(a, ["submit"], x(a, "s.f.e", q(T("target"), G([a, b, c], gp))));
					jf(a, b, "Form goal. Counter " + b.id + ". Init.")
				}), ip = yc("isp.stat", function (a, b, c) {
					var d, e = Q(b);
					e = me(b)[e].Gb;
					return da(a, "pi", b)({F: ha((d = {}, d[e] = 1, d))}, [c])
				}), jp = yc("isp", function (a, b) {
					Da(a, b, function (c) {
						var d = Sb(function (h) {
							return n(c, "settings." + h)
						}, ["rt", "mf"]);
						if (d && qd(a)) {
							var e = dg(c) && !be(a), f = Q(b), g = me(b);
							g[f] = {Gb: d, status: e ? 3 : 4};
							if (!e) return d = Ri(a, b, d), ip(a, b, d).then(function () {
								g[f].status =
									1
							})["catch"](function () {
								g[f].status = 2
							})
						}
					})["catch"](x(a, "l.isp"))
				}), Bi = /[^\d]/g, kp = /[^\d.,]/g, lp = /[.,]$/, Oi = A("ep.pp", function (a, b) {
					if (!b) return 0;
					a:{
						var c = b.replace(kp, "").replace(lp, "");
						var d = "0" === c[c.length - 1];
						for (var e = c.length; 0 < e && !(3 < c.length - e + 1 && d); --e) {
							var f = c[e - 1];
							if (N(f, [",", "."])) {
								d = f;
								break a
							}
						}
						d = ""
					}
					c = d ? b.split(d) : [b];
					d = d ? c[1] : "00";
					c = parseFloat(c[0].replace(Bi, "") + "." + d.replace(Bi, ""));
					d = Math.pow(10, 8) - .01;
					a.isNaN(c) ? c = 0 : (c = Math.min(c, d), c = Math.max(c, 0));
					return c
				}), mp = [[["EUR", "\u20ac"],
					"978"], [["USD", "\u0423\\.\u0415\\.", "\\$"], "840"], [["UAH", "\u0413\u0420\u041d", "\u20b4"], "980"], ["\u0422\u0413 KZT \u20b8 \u0422\u04a2\u0413 TENGE \u0422\u0415\u041d\u0413\u0415".split(" "), "398"], [["GBP", "\u00a3", "UKL"], "826"], ["RUR RUB \u0420 \u0420\u0423\u0411 \u20bd P \u0420UB P\u0423\u0411 P\u0423B PY\u0411 \u0420Y\u0411 \u0420\u0423B P\u0423\u0411".split(" "), "643"]],
				np = t(function (a) {
					return new RegExp(a.join("|"), "i")
				}), op = A("ep.cp", function (a) {
					if (!a) return "643";
					var b = a.replace(/\s/g, "");
					return (a =
						Sb(function (c) {
							return np(c[0]).test(b)
						}, mp)) ? a[1] : "643"
				}), Ni = A("ep.en", function (a, b, c) {
					a = bf(a);
					b = "" + 100 * b + c + a;
					c = 16 - b.length;
					if (0 > c) return "";
					b = cf("0", c) + b;
					c = b.slice(0, 8);
					b = b.slice(-8);
					c = (+c ^ 92844).toString(35);
					b = (+b ^ 92844).toString(35);
					return "" + c + "z" + b
				}), Ci = q(af, op), Di = A("ep.ctp", function (a, b, c, d) {
					var e = Ci(a, c), f = $e(a, d);
					Ze(a, b, e, f);
					ka("MutationObserver", a.MutationObserver) && (new MutationObserver(function () {
						var g = Ci(a, c), h = $e(a, d);
						if (e !== g || f !== h) e = g, f = h, Ze(a, b, e, f)
					})).observe(a.document.body, {
						attributes: !0,
						childList: !0, subtree: !0, characterData: !0
					})
				}), pp = A("ep.chp", function (a, b, c, d, e) {
					c && Ed(a, b);
					return d || e ? ja(a).C(a.document, ["click"], x(a, "ep.chp.cl", G([a, b, d, e], Mi))) : C
				}), Ki = A("ep.dec", function (a, b) {
					if (!b || Xc(a)) return [];
					var c = Ye(a, b, " ").split(" "), d = c[1], e = c[2], f = c.slice(3);
					c = parseInt(c[0], 2);
					if (1 === c) c = "AT5T6ku06kEsXK3iyBRgo6lk8rCtX4Kjf0qpRe74vtAplOkkpSi8E9FDTBJlIV6szGuWawyILrLlztwl4KEqs1pNFvNdtIrYtROBN1gSGS1adp+myrzmZKoqErtCv20WyWiRlEqZQUzvV3sRa1nScmlxptwLLY7o"; else if (2 === c) c = "Cy2FcreLJLpYXW3BXFJqldVsGMwDcBw2BGnHL5uj1TKstzse3piMo3Osz+EqDotgqs1TIoZvKtMKDaSRFztgUS8qkqZcaETgKWM54tCpTXjV5vW5OrjBpC0jF4mspUBQGd95fNSfv+vz+g+Hze33Hg8by+Yen1PP6zsdl7PQCwX9mf+f7FMb9x/Pw+v2Pp8Xy74eTwuBwTt913u4On1XW6hxOO5nIzFam00tC218S0kaeugpqST+XliLOlMoTpRQkuewUxoy4CT3efWtdFjSAAm+1BkjIhyeU4vGOf13a6U8wzNY4bGo6DIUemE7N3SBojDr7ezXahpWF022y8mma1NuTnZbq8XZZlPStejfG/CsbPhV6/bSnA==";
					else return [];
					c = Li(a, c);
					f = f.join("");
					e = parseInt(d + e, 2);
					var g = "";
					d = "";
					for (var h = 0; d.length < e && f[h];) g += f[h], c[g] && (d += String.fromCharCode(parseInt(c[g], 2)), g = ""), h += 1;
					c = "";
					for (e = 0; e < d.length;) f = d.charCodeAt(e), 128 > f ? (c += String.fromCharCode(f), e++) : 191 < f && 224 > f ? (g = d.charCodeAt(e + 1), c += String.fromCharCode((f & 31) << 6 | g & 63), e += 2) : (g = d.charCodeAt(e + 1), c += String.fromCharCode((f & 15) << 12 | (g & 63) << 6 | d.charCodeAt(e + 2) & 63), e += 3);
					d = wb(a, c);
					return Ia(d) ? d : []
				}), qp = A("ep.i", function (a, b) {
					return ka("querySelectorAll",
						a.document.querySelectorAll) ? Ji(a, b).then(function (c) {
						var d = c.rc, e = d[0], f = d[1], g = d[2], h = d[3], k = d[4], l = d[5], m = d[6], p = d[7],
							u = d[8], r = d[9];
						if (!c.isEnabled) return J.resolve(C);
						var w = Kc(a, e), y = Kc(a, h), H = Kc(a, m), X = Kc(a, u), Ga = "" + e + f + g === "" + h + k + l;
						return Od(a).then(function () {
							w && Di(a, b, f, g);
							y && !Ga && Di(a, b, k, l);
							return pp(a, b, H || X, p, r)
						})
					}) : J.resolve(C)
				}), rp = /[\*\.\?\(\)]/g, sp = t(function (a, b, c) {
						try {
							var d = c.replace("\\s", " ").replace(rp, "");
							$d(a).warn('Function "' + d + '" has been overriden, this may cause issues with Metrika counter')
						} catch (e) {
						}
					},
					hb), tp = A("r.nn", function (a) {
					ig(a).isEnabled && re(a, Fe, function (b) {
						b.C(function (c) {
							sp(a, c[1], c[0]);
							Fe.splice(100)
						})
					})
				});
			"function" == typeof Promise && Promise.resolve();
			var Ii = /(.*[\\?&])(ysclid=[^&]+&?)(.*)/, up = A("yid.e", function (a) {
				var b = M(a), c = b.href;
				if (Ee(b.search, "ysclid")) {
					b = Hi(c);
					var d;
					(null === (d = null === a || void 0 === a ? void 0 : a.history) || void 0 === d ? 0 : d.replaceState) && ka("replaceState", a.history.replaceState) && a.history.replaceState(void 0, "", b)
				}
			}), tb = L(window);
			tb.qa("hitParam", {});
			tb.qa("lastReferrer",
				window.location.href);
			tb.qa("getCounters", ao(window));
			de.push(Do);
			var Ei = function () {
				return function (a, b, c, d) {
					var e = this;
					return x(window, "c.i", function () {
						function f(y) {
							return pd(h, k, y)(h, k)
						}
						
						function g(y) {
							return Rm(h, k, u, y)
						}
						
						(!window || isNaN(a) && !a) && qh();
						var h = window, k = am(a, ai, b, c, d);
						k.id || Lb(h, "Invalid Metrika id: " + k.id);
						var l = Q(k), m = tb.b("counters", {}), p = [], u = [pd, Qm];
						if (m[l]) return Lb(h, "Duplicate counter " + l + " initialization"), m[l];
						var r = !1, w = tb.b("hitParam", {});
						w[l] && (r = !("1" !== k.M || m[l]));
						w[l] =
							1;
						e._webvisor = k.ra || !1;
						m[l] = e;
						tb.l("counters", m);
						tb.qa("counter", e);
						w = bo(window, k);
						p.push(w);
						so(window);
						dp(window, k) && delete m[l];
						f(Wo);
						Uo(h, [fp, ep, gj, pk, Zi, gk, oo, lk, Wi, Ui, aj]);
						f(xn);
						f(Xn);
						f(oj);
						f(Po);
						f(Qo);
						e.hit = g(Yn(h, k))();
						e.params = g(Eo(h, k))();
						l = f(co);
						p.push(n(l, Wa({unsubscribe: 1})));
						e.trackHash = pd(h, k, n(l, Wa({Yc: 1})));
						e.reachGoal = g(Gd(h, k))();
						e.experiments = g(Fo(h, k))();
						f(So);
						r || f(bp);
						r = f(ho);
						p.push(n(r, Wa({Na: 1})));
						e.notBounce = g(n(r, Wa({Jc: 1})))();
						e.accurateTrackBounce = g(n(r, Wa({sa: 1})))();
						f(Go);
						r = f(ko);
						p.push(n(r, Wa({Na: 1})));
						e.extLink = g(n(r, Wa({tc: 1})))();
						e.addFileExtension = g(n(r, Wa({ic: 1})))();
						e.file = g(n(r, Wa({file: 1})))();
						e.trackLinks = g(n(r, Wa({Fa: 1})))();
						p.push(Ho(h, k));
						p.push(Io(h));
						e.ecommerceAdd = g(Jo(h, k))();
						e.ecommerceRemove = g(Ko(h, k))();
						e.ecommerceDetail = g(Lo(h, k))();
						e.ecommercePurchase = g(Mo(h, k))();
						r = f(Ro);
						e.userParams = g(r || C)();
						e.destruct = g(To(h, k, p))(!0, !1);
						f(Xo);
						f(no);
						r = f(Yo);
						e.setUserID = g(r || C)();
						e.getClientID = f(Zo) || C;
						p.push(f(qo));
						e.clickmap = g(zo(h, k))();
						(r = f(qp)) && r.then(ca("push",
							p));
						f(yo);
						e.enableAll = g(Ao(h, k))();
						f(hp);
						f(jp);
						f(Bo);
						f(Co);
						f(up);
						tp(h)
					})()
				}
			}();
			(function (a) {
				var b = L(a);
				b.b("i") || (b.l("i", !0), ja(a).C(a, ["message"], v(a, uj)))
			})(window);
			if (window.Ya && Ei) {
				var Fi = la.Ja;
				window.Ya[Fi] = Ei;
				io(window);
				var Gi = window.Ya[Fi];
				Gi.informer = ek(window);
				Gi.counters = tb.b("getCounters")
			}
			Jc.ed = 1;
			Jc.fd = 10;
			return Jc
		})({})
	} catch (Jc) {
	}
	;
}).call(this)
