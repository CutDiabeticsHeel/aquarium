import "./chunk-75W262AB.js";
import { a as On } from "./chunk-JPCRPYS4.js";
import { a as yt } from "./chunk-SATPH3RP.js";
import { a as an } from "./chunk-BPX2FCSX.js";
import "./chunk-QHDNOTBI.js";
function An(i, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    ((t.enumerable = t.enumerable || !1),
      (t.configurable = !0),
      "value" in t && (t.writable = !0),
      Object.defineProperty(i, t.key, t));
  }
}
function Co(i, e, n) {
  return (e && An(i.prototype, e), n && An(i, n), i);
}
var me,
  Hr,
  To,
  Ge,
  Ot,
  At,
  er,
  Yn,
  Xt,
  tr,
  Fn,
  bt,
  it,
  Hn,
  In = function () {
    return me || (typeof window < "u" && (me = window.gsap) && me.registerPlugin && me);
  },
  zn = 1,
  jt = [],
  M = [],
  st = [],
  hr = Date.now,
  ln = function (e, n) {
    return n;
  },
  ko = function () {
    var e = tr.core,
      n = e.bridge || {},
      t = e._scrollers,
      r = e._proxies;
    (t.push.apply(t, M),
      r.push.apply(r, st),
      (M = t),
      (st = r),
      (ln = function (l, a) {
        return n[l](a);
      }));
  },
  xt = function (e, n) {
    return ~st.indexOf(e) && st[st.indexOf(e) + 1][n];
  },
  _r = function (e) {
    return !!~Fn.indexOf(e);
  },
  Le = function (e, n, t, r, o) {
    return e.addEventListener(n, t, { passive: r !== !1, capture: !!o });
  },
  Ae = function (e, n, t, r) {
    return e.removeEventListener(n, t, !!r);
  },
  Yr = "scrollLeft",
  Fr = "scrollTop",
  cn = function () {
    return (bt && bt.isPressed) || M.cache++;
  },
  Ir = function (e, n) {
    var t = function r(o) {
      if (o || o === 0) {
        zn && (Ge.history.scrollRestoration = "manual");
        var l = bt && bt.isPressed;
        ((o = r.v = Math.round(o) || (bt && bt.iOS ? 1 : 0)),
          e(o),
          (r.cacheID = M.cache),
          l && ln("ss", o));
      } else (n || M.cache !== r.cacheID || ln("ref")) && ((r.cacheID = M.cache), (r.v = e()));
      return r.v + r.offset;
    };
    return ((t.offset = 0), e && t);
  },
  Se = {
    s: Yr,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: Ir(function (i) {
      return arguments.length
        ? Ge.scrollTo(i, oe.sc())
        : Ge.pageXOffset || Ot[Yr] || At[Yr] || er[Yr] || 0;
    }),
  },
  oe = {
    s: Fr,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: Se,
    sc: Ir(function (i) {
      return arguments.length
        ? Ge.scrollTo(Se.sc(), i)
        : Ge.pageYOffset || Ot[Fr] || At[Fr] || er[Fr] || 0;
    }),
  },
  Ye = function (e, n) {
    return (
      ((n && n._ctx && n._ctx.selector) || me.utils.toArray)(e)[0] ||
      (typeof e == "string" && me.config().nullTargetWarn !== !1
        ? console.warn("Element not found:", e)
        : null)
    );
  },
  Eo = function (e, n) {
    for (var t = n.length; t--;) if (n[t] === e || n[t].contains(e)) return !0;
    return !1;
  },
  wt = function (e, n) {
    var t = n.s,
      r = n.sc;
    _r(e) && (e = Ot.scrollingElement || At);
    var o = M.indexOf(e),
      l = r === oe.sc ? 1 : 2;
    (!~o && (o = M.push(e) - 1), M[o + l] || Le(e, "scroll", cn));
    var a = M[o + l],
      f =
        a ||
        (M[o + l] =
          Ir(xt(e, t), !0) ||
          (_r(e)
            ? r
            : Ir(function (y) {
                return arguments.length ? (e[t] = y) : e[t];
              })));
    return ((f.target = e), a || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f);
  },
  zr = function (e, n, t) {
    var r = e,
      o = e,
      l = hr(),
      a = l,
      f = n || 50,
      y = Math.max(500, f * 3),
      D = function (_, W) {
        var I = hr();
        W || I - l > f
          ? ((o = r), (r = _), (a = l), (l = I))
          : t
            ? (r += _)
            : (r = o + ((_ - o) / (I - a)) * (l - a));
      },
      k = function () {
        ((o = r = t ? 0 : r), (a = l = 0));
      },
      g = function (_) {
        var W = a,
          I = o,
          z = hr();
        return (
          (_ || _ === 0) && _ !== r && D(_),
          l === a || z - a > y ? 0 : ((r + (t ? I : -I)) / ((t ? z : l) - W)) * 1e3
        );
      };
    return { update: D, reset: k, getVelocity: g };
  },
  gr = function (e, n) {
    return (
      n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  },
  Ln = function (e) {
    var n = Math.max.apply(Math, e),
      t = Math.min.apply(Math, e);
    return Math.abs(n) >= Math.abs(t) ? n : t;
  },
  Bn = function () {
    ((tr = me.core.globals().ScrollTrigger), tr && tr.core && ko());
  },
  Xn = function (e) {
    return (
      (me = e || In()),
      !Hr &&
        me &&
        typeof document < "u" &&
        document.body &&
        ((Ge = window),
        (Ot = document),
        (At = Ot.documentElement),
        (er = Ot.body),
        (Fn = [Ge, Ot, At, er]),
        (To = me.utils.clamp),
        (Hn = me.core.context || function () {}),
        (Xt = "onpointerenter" in er ? "pointer" : "mouse"),
        (Yn = J.isTouch =
          Ge.matchMedia && Ge.matchMedia("(hover: none), (pointer: coarse)").matches
            ? 1
            : "ontouchstart" in Ge || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
              ? 2
              : 0),
        (it = J.eventTypes =
          (
            "ontouchstart" in At
              ? "touchstart,touchmove,touchcancel,touchend"
              : "onpointerdown" in At
                ? "pointerdown,pointermove,pointercancel,pointerup"
                : "mousedown,mousemove,mouseup,mouseup"
          ).split(",")),
        setTimeout(function () {
          return (zn = 0);
        }, 500),
        (Hr = 1)),
      tr || Bn(),
      Hr
    );
  };
Se.op = oe;
M.cache = 0;
var J = (function () {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return (
    (e.init = function (t) {
      (Hr || Xn(me) || console.warn("Please gsap.registerPlugin(Observer)"), tr || Bn());
      var r = t.tolerance,
        o = t.dragMinimum,
        l = t.type,
        a = t.target,
        f = t.lineHeight,
        y = t.debounce,
        D = t.preventDefault,
        k = t.onStop,
        g = t.onStopDelay,
        u = t.ignore,
        _ = t.wheelSpeed,
        W = t.event,
        I = t.onDragStart,
        z = t.onDragEnd,
        Y = t.onDrag,
        q = t.onPress,
        b = t.onRelease,
        ze = t.onRight,
        G = t.onLeft,
        x = t.onUp,
        Ee = t.onDown,
        Be = t.onChangeX,
        h = t.onChangeY,
        ue = t.onChange,
        w = t.onToggleX,
        pt = t.onToggleY,
        se = t.onHover,
        Me = t.onHoverEnd,
        Pe = t.onMove,
        X = t.ignoreCheck,
        ee = t.isNormalizer,
        te = t.onGestureStart,
        s = t.onGestureEnd,
        ae = t.onWheel,
        Yt = t.onEnable,
        Tt = t.onDisable,
        Ke = t.onClick,
        dt = t.scrollSpeed,
        ve = t.capture,
        re = t.allowClicks,
        De = t.lockAxis,
        ye = t.onLockAxis;
      ((this.target = a = Ye(a) || At),
        (this.vars = t),
        u && (u = me.utils.toArray(u)),
        (r = r || 1e-9),
        (o = o || 0),
        (_ = _ || 1),
        (dt = dt || 1),
        (l = l || "wheel,touch,pointer"),
        (y = y !== !1),
        f || (f = parseFloat(Ge.getComputedStyle(er).lineHeight) || 22));
      var kt,
        Re,
        Oe,
        L,
        Z,
        Xe,
        Ne,
        c = this,
        We = 0,
        gt = 0,
        Et = t.passive || (!D && t.passive !== !1),
        $ = wt(a, Se),
        ht = wt(a, oe),
        Mt = $(),
        Ft = ht(),
        fe = ~l.indexOf("touch") && !~l.indexOf("pointer") && it[0] === "pointerdown",
        Pt = _r(a),
        Q = a.ownerDocument || Ot,
        et = [0, 0, 0],
        Je = [0, 0, 0],
        _t = 0,
        ur = function () {
          return (_t = hr());
        },
        ne = function (v, F) {
          return (
            ((c.event = v) && u && Eo(v.target, u)) ||
            (F && fe && v.pointerType !== "touch") ||
            (X && X(v, F))
          );
        },
        Or = function () {
          (c._vx.reset(), c._vy.reset(), Re.pause(), k && k(c));
        },
        mt = function () {
          var v = (c.deltaX = Ln(et)),
            F = (c.deltaY = Ln(Je)),
            p = Math.abs(v) >= r,
            S = Math.abs(F) >= r;
          (ue && (p || S) && ue(c, v, F, et, Je),
            p &&
              (ze && c.deltaX > 0 && ze(c),
              G && c.deltaX < 0 && G(c),
              Be && Be(c),
              w && c.deltaX < 0 != We < 0 && w(c),
              (We = c.deltaX),
              (et[0] = et[1] = et[2] = 0)),
            S &&
              (Ee && c.deltaY > 0 && Ee(c),
              x && c.deltaY < 0 && x(c),
              h && h(c),
              pt && c.deltaY < 0 != gt < 0 && pt(c),
              (gt = c.deltaY),
              (Je[0] = Je[1] = Je[2] = 0)),
            (L || Oe) &&
              (Pe && Pe(c), Oe && (I && Oe === 1 && I(c), Y && Y(c), (Oe = 0)), (L = !1)),
            Xe && !(Xe = !1) && ye && ye(c),
            Z && (ae(c), (Z = !1)),
            (kt = 0));
        },
        Jt = function (v, F, p) {
          ((et[p] += v),
            (Je[p] += F),
            c._vx.update(v),
            c._vy.update(F),
            y ? kt || (kt = requestAnimationFrame(mt)) : mt());
        },
        Zt = function (v, F) {
          (De && !Ne && ((c.axis = Ne = Math.abs(v) > Math.abs(F) ? "x" : "y"), (Xe = !0)),
            Ne !== "y" && ((et[2] += v), c._vx.update(v, !0)),
            Ne !== "x" && ((Je[2] += F), c._vy.update(F, !0)),
            y ? kt || (kt = requestAnimationFrame(mt)) : mt());
        },
        Dt = function (v) {
          if (!ne(v, 1)) {
            v = gr(v, D);
            var F = v.clientX,
              p = v.clientY,
              S = F - c.x,
              m = p - c.y,
              C = c.isDragging;
            ((c.x = F),
              (c.y = p),
              (C || ((S || m) && (Math.abs(c.startX - F) >= o || Math.abs(c.startY - p) >= o))) &&
                (Oe || (Oe = C ? 2 : 1), C || (c.isDragging = !0), Zt(S, m)));
          }
        },
        Ht = (c.onPress = function (T) {
          ne(T, 1) ||
            (T && T.button) ||
            ((c.axis = Ne = null),
            Re.pause(),
            (c.isPressed = !0),
            (T = gr(T)),
            (We = gt = 0),
            (c.startX = c.x = T.clientX),
            (c.startY = c.y = T.clientY),
            c._vx.reset(),
            c._vy.reset(),
            Le(ee ? a : Q, it[1], Dt, Et, !0),
            (c.deltaX = c.deltaY = 0),
            q && q(c));
        }),
        O = (c.onRelease = function (T) {
          if (!ne(T, 1)) {
            Ae(ee ? a : Q, it[1], Dt, !0);
            var v = !isNaN(c.y - c.startY),
              F = c.isDragging,
              p = F && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3),
              S = gr(T);
            (!p &&
              v &&
              (c._vx.reset(),
              c._vy.reset(),
              D &&
                re &&
                me.delayedCall(0.08, function () {
                  if (hr() - _t > 300 && !T.defaultPrevented) {
                    if (T.target.click) T.target.click();
                    else if (Q.createEvent) {
                      var m = Q.createEvent("MouseEvents");
                      (m.initMouseEvent(
                        "click",
                        !0,
                        !0,
                        Ge,
                        1,
                        S.screenX,
                        S.screenY,
                        S.clientX,
                        S.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null,
                      ),
                        T.target.dispatchEvent(m));
                    }
                  }
                })),
              (c.isDragging = c.isGesturing = c.isPressed = !1),
              k && F && !ee && Re.restart(!0),
              Oe && mt(),
              z && F && z(c),
              b && b(c, p));
          }
        }),
        It = function (v) {
          return v.touches && v.touches.length > 1 && (c.isGesturing = !0) && te(v, c.isDragging);
        },
        tt = function () {
          return (c.isGesturing = !1) || s(c);
        },
        rt = function (v) {
          if (!ne(v)) {
            var F = $(),
              p = ht();
            (Jt((F - Mt) * dt, (p - Ft) * dt, 1), (Mt = F), (Ft = p), k && Re.restart(!0));
          }
        },
        nt = function (v) {
          if (!ne(v)) {
            ((v = gr(v, D)), ae && (Z = !0));
            var F = (v.deltaMode === 1 ? f : v.deltaMode === 2 ? Ge.innerHeight : 1) * _;
            (Jt(v.deltaX * F, v.deltaY * F, 0), k && !ee && Re.restart(!0));
          }
        },
        zt = function (v) {
          if (!ne(v)) {
            var F = v.clientX,
              p = v.clientY,
              S = F - c.x,
              m = p - c.y;
            ((c.x = F), (c.y = p), (L = !0), k && Re.restart(!0), (S || m) && Zt(S, m));
          }
        },
        Qt = function (v) {
          ((c.event = v), se(c));
        },
        vt = function (v) {
          ((c.event = v), Me(c));
        },
        fr = function (v) {
          return ne(v) || (gr(v, D) && Ke(c));
        };
      ((Re = c._dc = me.delayedCall(g || 0.25, Or).pause()),
        (c.deltaX = c.deltaY = 0),
        (c._vx = zr(0, 50, !0)),
        (c._vy = zr(0, 50, !0)),
        (c.scrollX = $),
        (c.scrollY = ht),
        (c.isDragging = c.isGesturing = c.isPressed = !1),
        Hn(this),
        (c.enable = function (T) {
          return (
            c.isEnabled ||
              (Le(Pt ? Q : a, "scroll", cn),
              l.indexOf("scroll") >= 0 && Le(Pt ? Q : a, "scroll", rt, Et, ve),
              l.indexOf("wheel") >= 0 && Le(a, "wheel", nt, Et, ve),
              ((l.indexOf("touch") >= 0 && Yn) || l.indexOf("pointer") >= 0) &&
                (Le(a, it[0], Ht, Et, ve),
                Le(Q, it[2], O),
                Le(Q, it[3], O),
                re && Le(a, "click", ur, !0, !0),
                Ke && Le(a, "click", fr),
                te && Le(Q, "gesturestart", It),
                s && Le(Q, "gestureend", tt),
                se && Le(a, Xt + "enter", Qt),
                Me && Le(a, Xt + "leave", vt),
                Pe && Le(a, Xt + "move", zt)),
              (c.isEnabled = !0),
              (c.isDragging = c.isGesturing = c.isPressed = L = Oe = !1),
              c._vx.reset(),
              c._vy.reset(),
              (Mt = $()),
              (Ft = ht()),
              T && T.type && Ht(T),
              Yt && Yt(c)),
            c
          );
        }),
        (c.disable = function () {
          c.isEnabled &&
            (jt.filter(function (T) {
              return T !== c && _r(T.target);
            }).length || Ae(Pt ? Q : a, "scroll", cn),
            c.isPressed && (c._vx.reset(), c._vy.reset(), Ae(ee ? a : Q, it[1], Dt, !0)),
            Ae(Pt ? Q : a, "scroll", rt, ve),
            Ae(a, "wheel", nt, ve),
            Ae(a, it[0], Ht, ve),
            Ae(Q, it[2], O),
            Ae(Q, it[3], O),
            Ae(a, "click", ur, !0),
            Ae(a, "click", fr),
            Ae(Q, "gesturestart", It),
            Ae(Q, "gestureend", tt),
            Ae(a, Xt + "enter", Qt),
            Ae(a, Xt + "leave", vt),
            Ae(a, Xt + "move", zt),
            (c.isEnabled = c.isPressed = c.isDragging = !1),
            Tt && Tt(c));
        }),
        (c.kill = c.revert =
          function () {
            c.disable();
            var T = jt.indexOf(c);
            (T >= 0 && jt.splice(T, 1), bt === c && (bt = 0));
          }),
        jt.push(c),
        ee && _r(a) && (bt = c),
        c.enable(W));
    }),
    Co(i, [
      {
        key: "velocityX",
        get: function () {
          return this._vx.getVelocity();
        },
      },
      {
        key: "velocityY",
        get: function () {
          return this._vy.getVelocity();
        },
      },
    ]),
    i
  );
})();
J.version = "3.15.0";
J.create = function (i) {
  return new J(i);
};
J.register = Xn;
J.getAll = function () {
  return jt.slice();
};
J.getById = function (i) {
  return jt.filter(function (e) {
    return e.vars.id === i;
  })[0];
};
In() && me.registerPlugin(J);
var d,
  ir,
  R,
  B,
  $e,
  H,
  Sn,
  tn,
  Dr,
  Sr,
  vr,
  Br,
  Ce,
  on,
  _n,
  He,
  Nn,
  Wn,
  sr,
  io,
  un,
  so,
  Fe,
  mn,
  ao,
  lo,
  Lt,
  vn,
  Cn,
  ar,
  Tn,
  Cr,
  yn,
  fn,
  Xr = 1,
  Te = Date.now,
  pn = Te(),
  je = 0,
  yr = 0,
  qn = function (e, n, t) {
    var r = Ve(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
    return ((t["_" + n + "Clamp"] = r), r ? e.substr(6, e.length - 7) : e);
  },
  Gn = function (e, n) {
    return n && (!Ve(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
  },
  Mo = function i() {
    return yr && requestAnimationFrame(i);
  },
  Un = function () {
    return (on = 1);
  },
  Vn = function () {
    return (on = 0);
  },
  ut = function (e) {
    return e;
  },
  br = function (e) {
    return Math.round(e * 1e5) / 1e5 || 0;
  },
  co = function () {
    return typeof window < "u";
  },
  uo = function () {
    return d || (co() && (d = window.gsap) && d.registerPlugin && d);
  },
  Vt = function (e) {
    return !!~Sn.indexOf(e);
  },
  fo = function (e) {
    return (e === "Height" ? Tn : R["inner" + e]) || $e["client" + e] || H["client" + e];
  },
  po = function (e) {
    return (
      xt(e, "getBoundingClientRect") ||
      (Vt(e)
        ? function () {
            return ((en.width = R.innerWidth), (en.height = Tn), en);
          }
        : function () {
            return St(e);
          })
    );
  },
  Po = function (e, n, t) {
    var r = t.d,
      o = t.d2,
      l = t.a;
    return (l = xt(e, "getBoundingClientRect"))
      ? function () {
          return l()[r];
        }
      : function () {
          return (n ? fo(o) : e["client" + o]) || 0;
        };
  },
  Do = function (e, n) {
    return !n || ~st.indexOf(e)
      ? po(e)
      : function () {
          return en;
        };
  },
  ft = function (e, n) {
    var t = n.s,
      r = n.d2,
      o = n.d,
      l = n.a;
    return Math.max(
      0,
      (t = "scroll" + r) && (l = xt(e, t))
        ? l() - po(e)()[o]
        : Vt(e)
          ? ($e[t] || H[t]) - fo(r)
          : e[t] - e["offset" + r],
    );
  },
  Nr = function (e, n) {
    for (var t = 0; t < sr.length; t += 3)
      (!n || ~n.indexOf(sr[t + 1])) && e(sr[t], sr[t + 1], sr[t + 2]);
  },
  Ve = function (e) {
    return typeof e == "string";
  },
  ke = function (e) {
    return typeof e == "function";
  },
  wr = function (e) {
    return typeof e == "number";
  },
  Nt = function (e) {
    return typeof e == "object";
  },
  mr = function (e, n, t) {
    return e && e.progress(n ? 0 : 1) && t && e.pause();
  },
  rr = function (e, n, t) {
    if (e.enabled) {
      var r = e._ctx
        ? e._ctx.add(function () {
            return n(e, t);
          })
        : n(e, t);
      r && r.totalTime && (e.callbackAnimation = r);
    }
  },
  nr = Math.abs,
  go = "left",
  ho = "top",
  kn = "right",
  En = "bottom",
  qt = "width",
  Gt = "height",
  Tr = "Right",
  kr = "Left",
  Er = "Top",
  Mr = "Bottom",
  ie = "padding",
  Ze = "margin",
  cr = "Width",
  Mn = "Height",
  ce = "px",
  Qe = function (e) {
    return R.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
  },
  Ro = function (e) {
    var n = Qe(e).position;
    e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
  },
  $n = function (e, n) {
    for (var t in n) t in e || (e[t] = n[t]);
    return e;
  },
  St = function (e, n) {
    var t =
        n &&
        Qe(e)[_n] !== "matrix(1, 0, 0, 1, 0, 0)" &&
        d
          .to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          })
          .progress(1),
      r = e.getBoundingClientRect
        ? e.getBoundingClientRect()
        : e.scrollingElement.getBoundingClientRect();
    return (t && t.progress(0).kill(), r);
  },
  rn = function (e, n) {
    var t = n.d2;
    return e["offset" + t] || e["client" + t] || 0;
  },
  _o = function (e) {
    var n = [],
      t = e.labels,
      r = e.duration(),
      o;
    for (o in t) n.push(t[o] / r);
    return n;
  },
  Oo = function (e) {
    return function (n) {
      return d.utils.snap(_o(e), n);
    };
  },
  Pn = function (e) {
    var n = d.utils.snap(e),
      t =
        Array.isArray(e) &&
        e.slice(0).sort(function (r, o) {
          return r - o;
        });
    return t
      ? function (r, o, l) {
          l === void 0 && (l = 0.001);
          var a;
          if (!o) return n(r);
          if (o > 0) {
            for (r -= l, a = 0; a < t.length; a++) if (t[a] >= r) return t[a];
            return t[a - 1];
          } else for (a = t.length, r += l; a--;) if (t[a] <= r) return t[a];
          return t[0];
        }
      : function (r, o, l) {
          l === void 0 && (l = 0.001);
          var a = n(r);
          return !o || Math.abs(a - r) < l || a - r < 0 == o < 0 ? a : n(o < 0 ? r - e : r + e);
        };
  },
  Ao = function (e) {
    return function (n, t) {
      return Pn(_o(e))(n, t.direction);
    };
  },
  Wr = function (e, n, t, r) {
    return t.split(",").forEach(function (o) {
      return e(n, o, r);
    });
  },
  ge = function (e, n, t, r, o) {
    return e.addEventListener(n, t, { passive: !r, capture: !!o });
  },
  de = function (e, n, t, r) {
    return e.removeEventListener(n, t, !!r);
  },
  qr = function (e, n, t) {
    ((t = t && t.wheelHandler), t && (e(n, "wheel", t), e(n, "touchmove", t)));
  },
  Kn = { startColor: "green", endColor: "red", indent: 0, fontSize: "16px", fontWeight: "normal" },
  Gr = { toggleActions: "play", anticipatePin: 0 },
  nn = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
  Jr = function (e, n) {
    if (Ve(e)) {
      var t = e.indexOf("="),
        r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
      (~t && (e.indexOf("%") > t && (r *= n / 100), (e = e.substr(0, t - 1))),
        (e =
          r +
          (e in nn
            ? nn[e] * n
            : ~e.indexOf("%")
              ? (parseFloat(e) * n) / 100
              : parseFloat(e) || 0)));
    }
    return e;
  },
  Ur = function (e, n, t, r, o, l, a, f) {
    var y = o.startColor,
      D = o.endColor,
      k = o.fontSize,
      g = o.indent,
      u = o.fontWeight,
      _ = B.createElement("div"),
      W = Vt(t) || xt(t, "pinType") === "fixed",
      I = e.indexOf("scroller") !== -1,
      z = W ? H : t.tagName === "IFRAME" ? t.contentDocument.body : t,
      Y = e.indexOf("start") !== -1,
      q = Y ? y : D,
      b =
        "border-color:" +
        q +
        ";font-size:" +
        k +
        ";color:" +
        q +
        ";font-weight:" +
        u +
        ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return (
      (b += "position:" + ((I || f) && W ? "fixed;" : "absolute;")),
      (I || f || !W) && (b += (r === oe ? kn : En) + ":" + (l + parseFloat(g)) + "px;"),
      a && (b += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
      (_._isStart = Y),
      _.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")),
      (_.style.cssText = b),
      (_.innerText = n || n === 0 ? e + "-" + n : e),
      z.children[0] ? z.insertBefore(_, z.children[0]) : z.appendChild(_),
      (_._offset = _["offset" + r.op.d2]),
      Zr(_, 0, r, Y),
      _
    );
  },
  Zr = function (e, n, t, r) {
    var o = { display: "block" },
      l = t[r ? "os2" : "p2"],
      a = t[r ? "p2" : "os2"];
    ((e._isFlipped = r),
      (o[t.a + "Percent"] = r ? -100 : 0),
      (o[t.a] = r ? "1px" : 0),
      (o["border" + l + cr] = 1),
      (o["border" + a + cr] = 0),
      (o[t.p] = n + "px"),
      d.set(e, o));
  },
  P = [],
  bn = {},
  Rr,
  Jn = function () {
    return Te() - je > 34 && (Rr || (Rr = requestAnimationFrame(Ct)));
  },
  or = function () {
    (!Fe || !Fe.isPressed || Fe.startX > H.clientWidth) &&
      (M.cache++,
      Fe ? Rr || (Rr = requestAnimationFrame(Ct)) : Ct(),
      je || Kt("scrollStart"),
      (je = Te()));
  },
  dn = function () {
    ((lo = R.innerWidth), (ao = R.innerHeight));
  },
  xr = function (e) {
    (M.cache++,
      (e === !0 ||
        (!Ce &&
          !so &&
          !B.fullscreenElement &&
          !B.webkitFullscreenElement &&
          (!mn || lo !== R.innerWidth || Math.abs(R.innerHeight - ao) > R.innerHeight * 0.25))) &&
        tn.restart(!0));
  },
  $t = {},
  Lo = [],
  mo = function i() {
    return de(E, "scrollEnd", i) || Wt(!0);
  },
  Kt = function (e) {
    return (
      ($t[e] &&
        $t[e].map(function (n) {
          return n();
        })) ||
      Lo
    );
  },
  Ue = [],
  vo = function (e) {
    for (var n = 0; n < Ue.length; n += 5)
      (!e || (Ue[n + 4] && Ue[n + 4].query === e)) &&
        ((Ue[n].style.cssText = Ue[n + 1]),
        Ue[n].getBBox && Ue[n].setAttribute("transform", Ue[n + 2] || ""),
        (Ue[n + 3].uncache = 1));
  },
  yo = function () {
    return M.forEach(function (e) {
      return ke(e) && ++e.cacheID && (e.rec = e());
    });
  },
  Dn = function (e, n) {
    var t;
    for (He = 0; He < P.length; He++)
      ((t = P[He]), t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0)));
    ((Cr = !0), n && vo(n), n || Kt("revert"));
  },
  bo = function (e, n) {
    (M.cache++,
      (n || !Ie) &&
        M.forEach(function (t) {
          return ke(t) && t.cacheID++ && (t.rec = 0);
        }),
      Ve(e) && (R.history.scrollRestoration = Cn = e));
  },
  Ie,
  Ut = 0,
  Zn,
  Yo = function () {
    if (Zn !== Ut) {
      var e = (Zn = Ut);
      requestAnimationFrame(function () {
        return e === Ut && Wt(!0);
      });
    }
  },
  wo = function () {
    (H.appendChild(ar), (Tn = (!Fe && ar.offsetHeight) || R.innerHeight), H.removeChild(ar));
  },
  Qn = function (e) {
    return Dr(
      ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end",
    ).forEach(function (n) {
      return (n.style.display = e ? "none" : "block");
    });
  },
  Wt = function (e, n) {
    if ((($e = B.documentElement), (H = B.body), (Sn = [R, B, $e, H]), je && !e && !Cr)) {
      ge(E, "scrollEnd", mo);
      return;
    }
    (wo(), (Ie = E.isRefreshing = !0), Cr || yo());
    var t = Kt("refreshInit");
    (io && E.sort(),
      n || Dn(),
      M.forEach(function (r) {
        ke(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
      }),
      P.slice(0).forEach(function (r) {
        return r.refresh();
      }),
      (Cr = !1),
      P.forEach(function (r) {
        if (r._subPinOffset && r.pin) {
          var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight",
            l = r.pin[o];
          (r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - l), r.refresh());
        }
      }),
      (yn = 1),
      Qn(!0),
      P.forEach(function (r) {
        var o = ft(r.scroller, r._dir),
          l = r.vars.end === "max" || (r._endClamp && r.end > o),
          a = r._startClamp && r.start >= o;
        (l || a) &&
          r.setPositions(a ? o - 1 : r.start, l ? Math.max(a ? o : r.start + 1, o) : r.end, !0);
      }),
      Qn(!1),
      (yn = 0),
      t.forEach(function (r) {
        return r && r.render && r.render(-1);
      }),
      M.forEach(function (r) {
        ke(r) &&
          (r.smooth &&
            requestAnimationFrame(function () {
              return (r.target.style.scrollBehavior = "smooth");
            }),
          r.rec && r(r.rec));
      }),
      bo(Cn, 1),
      tn.pause(),
      Ut++,
      (Ie = 2),
      Ct(2),
      P.forEach(function (r) {
        return ke(r.vars.onRefresh) && r.vars.onRefresh(r);
      }),
      (Ie = E.isRefreshing = !1),
      Kt("refresh"));
  },
  wn = 0,
  Qr = 1,
  Pr,
  Ct = function (e) {
    if (e === 2 || (!Ie && !Cr)) {
      ((E.isUpdating = !0), Pr && Pr.update(0));
      var n = P.length,
        t = Te(),
        r = t - pn >= 50,
        o = n && P[0].scroll();
      if (
        ((Qr = wn > o ? -1 : 1),
        Ie || (wn = o),
        r && (je && !on && t - je > 200 && ((je = 0), Kt("scrollEnd")), (vr = pn), (pn = t)),
        Qr < 0)
      ) {
        for (He = n; He-- > 0;) P[He] && P[He].update(0, r);
        Qr = 1;
      } else for (He = 0; He < n; He++) P[He] && P[He].update(0, r);
      E.isUpdating = !1;
    }
    Rr = 0;
  },
  xn = [
    go,
    ho,
    En,
    kn,
    Ze + Mr,
    Ze + Tr,
    Ze + Er,
    Ze + kr,
    "display",
    "flexShrink",
    "float",
    "zIndex",
    "gridColumnStart",
    "gridColumnEnd",
    "gridRowStart",
    "gridRowEnd",
    "gridArea",
    "justifySelf",
    "alignSelf",
    "placeSelf",
    "order",
  ],
  jr = xn.concat([
    qt,
    Gt,
    "boxSizing",
    "max" + cr,
    "max" + Mn,
    "position",
    Ze,
    ie,
    ie + Er,
    ie + Tr,
    ie + Mr,
    ie + kr,
  ]),
  Fo = function (e, n, t) {
    lr(t);
    var r = e._gsap;
    if (r.spacerIsNative) lr(r.spacerState);
    else if (e._gsap.swappedIn) {
      var o = n.parentNode;
      o && (o.insertBefore(e, n), o.removeChild(n));
    }
    e._gsap.swappedIn = !1;
  },
  gn = function (e, n, t, r) {
    if (!e._gsap.swappedIn) {
      for (var o = xn.length, l = n.style, a = e.style, f; o--;) ((f = xn[o]), (l[f] = t[f]));
      ((l.position = t.position === "absolute" ? "absolute" : "relative"),
        t.display === "inline" && (l.display = "inline-block"),
        (a[En] = a[kn] = "auto"),
        (l.flexBasis = t.flexBasis || "auto"),
        (l.overflow = "visible"),
        (l.boxSizing = "border-box"),
        (l[qt] = rn(e, Se) + ce),
        (l[Gt] = rn(e, oe) + ce),
        (l[ie] = a[Ze] = a[ho] = a[go] = "0"),
        lr(r),
        (a[qt] = a["max" + cr] = t[qt]),
        (a[Gt] = a["max" + Mn] = t[Gt]),
        (a[ie] = t[ie]),
        e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)),
        (e._gsap.swappedIn = !0));
    }
  },
  Ho = /([A-Z])/g,
  lr = function (e) {
    if (e) {
      var n = e.t.style,
        t = e.length,
        r = 0,
        o,
        l;
      for ((e.t._gsap || d.core.getCache(e.t)).uncache = 1; r < t; r += 2)
        ((l = e[r + 1]),
          (o = e[r]),
          l ? (n[o] = l) : n[o] && n.removeProperty(o.replace(Ho, "-$1").toLowerCase()));
    }
  },
  Vr = function (e) {
    for (var n = jr.length, t = e.style, r = [], o = 0; o < n; o++) r.push(jr[o], t[jr[o]]);
    return ((r.t = e), r);
  },
  Io = function (e, n, t) {
    for (var r = [], o = e.length, l = t ? 8 : 0, a; l < o; l += 2)
      ((a = e[l]), r.push(a, a in n ? n[a] : e[l + 1]));
    return ((r.t = e.t), r);
  },
  en = { left: 0, top: 0 },
  jn = function (e, n, t, r, o, l, a, f, y, D, k, g, u, _) {
    (ke(e) && (e = e(f)),
      Ve(e) &&
        e.substr(0, 3) === "max" &&
        (e = g + (e.charAt(4) === "=" ? Jr("0" + e.substr(3), t) : 0)));
    var W = u ? u.time() : 0,
      I,
      z,
      Y;
    if ((u && u.seek(0), isNaN(e) || (e = +e), wr(e)))
      (u && (e = d.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, g, e)),
        a && Zr(a, t, r, !0));
    else {
      ke(n) && (n = n(f));
      var q = (e || "0").split(" "),
        b,
        ze,
        G,
        x;
      ((Y = Ye(n, f) || H),
        (b = St(Y) || {}),
        (!b || (!b.left && !b.top)) &&
          Qe(Y).display === "none" &&
          ((x = Y.style.display),
          (Y.style.display = "block"),
          (b = St(Y)),
          x ? (Y.style.display = x) : Y.style.removeProperty("display")),
        (ze = Jr(q[0], b[r.d])),
        (G = Jr(q[1] || "0", t)),
        (e = b[r.p] - y[r.p] - D + ze + o - G),
        a && Zr(a, G, r, t - G < 20 || (a._isStart && G > 20)),
        (t -= t - G));
    }
    if ((_ && ((f[_] = e || -0.001), e < 0 && (e = 0)), l)) {
      var Ee = e + t,
        Be = l._isStart;
      ((I = "scroll" + r.d2),
        Zr(
          l,
          Ee,
          r,
          (Be && Ee > 20) || (!Be && (k ? Math.max(H[I], $e[I]) : l.parentNode[I]) <= Ee + 1),
        ),
        k && ((y = St(a)), k && (l.style[r.op.p] = y[r.op.p] - r.op.m - l._offset + ce)));
    }
    return (
      u &&
        Y &&
        ((I = St(Y)),
        u.seek(g),
        (z = St(Y)),
        (u._caScrollDist = I[r.p] - z[r.p]),
        (e = (e / u._caScrollDist) * g)),
      u && u.seek(W),
      u ? e : Math.round(e)
    );
  },
  zo = /(webkit|moz|length|cssText|inset)/i,
  eo = function (e, n, t, r) {
    if (e.parentNode !== n) {
      var o = e.style,
        l,
        a;
      if (n === H) {
        ((e._stOrig = o.cssText), (a = Qe(e)));
        for (l in a)
          !+l && !zo.test(l) && a[l] && typeof o[l] == "string" && l !== "0" && (o[l] = a[l]);
        ((o.top = t), (o.left = r));
      } else o.cssText = e._stOrig;
      ((d.core.getCache(e).uncache = 1), n.appendChild(e));
    }
  },
  xo = function (e, n, t) {
    var r = n,
      o = r;
    return function (l) {
      var a = Math.round(e());
      return (
        a !== r && a !== o && Math.abs(a - r) > 3 && Math.abs(a - o) > 3 && ((l = a), t && t()),
        (o = r),
        (r = Math.round(l)),
        r
      );
    };
  },
  $r = function (e, n, t) {
    var r = {};
    ((r[n.p] = "+=" + t), d.set(e, r));
  },
  to = function (e, n) {
    var t = wt(e, n),
      r = "_scroll" + n.p2,
      o = function l(a, f, y, D, k) {
        var g = l.tween,
          u = f.onComplete,
          _ = {};
        y = y || t();
        var W = xo(t, y, function () {
          (g.kill(), (l.tween = 0));
        });
        return (
          (k = (D && k) || 0),
          (D = D || a - y),
          g && g.kill(),
          (f[r] = a),
          (f.inherit = !1),
          (f.modifiers = _),
          (_[r] = function () {
            return W(y + D * g.ratio + k * g.ratio * g.ratio);
          }),
          (f.onUpdate = function () {
            (M.cache++, l.tween && Ct());
          }),
          (f.onComplete = function () {
            ((l.tween = 0), u && u.call(g));
          }),
          (g = l.tween = d.to(e, f)),
          g
        );
      };
    return (
      (e[r] = t),
      (t.wheelHandler = function () {
        return o.tween && o.tween.kill() && (o.tween = 0);
      }),
      ge(e, "wheel", t.wheelHandler),
      E.isTouch && ge(e, "touchmove", t.wheelHandler),
      o
    );
  },
  E = (function () {
    function i(n, t) {
      (ir || i.register(d) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        vn(this),
        this.init(n, t));
    }
    var e = i.prototype;
    return (
      (e.init = function (t, r) {
        if (((this.progress = this.start = 0), this.vars && this.kill(!0, !0), !yr)) {
          this.update = this.refresh = this.kill = ut;
          return;
        }
        t = $n(Ve(t) || wr(t) || t.nodeType ? { trigger: t } : t, Gr);
        var o = t,
          l = o.onUpdate,
          a = o.toggleClass,
          f = o.id,
          y = o.onToggle,
          D = o.onRefresh,
          k = o.scrub,
          g = o.trigger,
          u = o.pin,
          _ = o.pinSpacing,
          W = o.invalidateOnRefresh,
          I = o.anticipatePin,
          z = o.onScrubComplete,
          Y = o.onSnapComplete,
          q = o.once,
          b = o.snap,
          ze = o.pinReparent,
          G = o.pinSpacer,
          x = o.containerAnimation,
          Ee = o.fastScrollEnd,
          Be = o.preventOverlaps,
          h = t.horizontal || (t.containerAnimation && t.horizontal !== !1) ? Se : oe,
          ue = !k && k !== 0,
          w = Ye(t.scroller || R),
          pt = d.core.getCache(w),
          se = Vt(w),
          Me = ("pinType" in t ? t.pinType : xt(w, "pinType") || (se && "fixed")) === "fixed",
          Pe = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
          X = ue && t.toggleActions.split(" "),
          ee = "markers" in t ? t.markers : Gr.markers,
          te = se ? 0 : parseFloat(Qe(w)["border" + h.p2 + cr]) || 0,
          s = this,
          ae =
            t.onRefreshInit &&
            function () {
              return t.onRefreshInit(s);
            },
          Yt = Po(w, se, h),
          Tt = Do(w, se),
          Ke = 0,
          dt = 0,
          ve = 0,
          re = wt(w, h),
          De,
          ye,
          kt,
          Re,
          Oe,
          L,
          Z,
          Xe,
          Ne,
          c,
          We,
          gt,
          Et,
          $,
          ht,
          Mt,
          Ft,
          fe,
          Pt,
          Q,
          et,
          Je,
          _t,
          ur,
          ne,
          Or,
          mt,
          Jt,
          Zt,
          Dt,
          Ht,
          O,
          It,
          tt,
          rt,
          nt,
          zt,
          Qt,
          vt;
        if (
          ((s._startClamp = s._endClamp = !1),
          (s._dir = h),
          (I *= 45),
          (s.scroller = w),
          (s.scroll = x ? x.time.bind(x) : re),
          (Re = re()),
          (s.vars = t),
          (r = r || t.animation),
          "refreshPriority" in t && ((io = 1), t.refreshPriority === -9999 && (Pr = s)),
          (pt.tweenScroll = pt.tweenScroll || { top: to(w, oe), left: to(w, Se) }),
          (s.tweenTo = De = pt.tweenScroll[h.p]),
          (s.scrubDuration = function (p) {
            ((It = wr(p) && p),
              It
                ? O
                  ? O.duration(p)
                  : (O = d.to(r, {
                      ease: "expo",
                      totalProgress: "+=0",
                      inherit: !1,
                      duration: It,
                      paused: !0,
                      onComplete: function () {
                        return z && z(s);
                      },
                    }))
                : (O && O.progress(1).kill(), (O = 0)));
          }),
          r &&
            ((r.vars.lazy = !1),
            (r._initted && !s.isReverted) ||
              (r.vars.immediateRender !== !1 &&
                t.immediateRender !== !1 &&
                r.duration() &&
                r.render(0, !0, !0)),
            (s.animation = r.pause()),
            (r.scrollTrigger = s),
            s.scrubDuration(k),
            (Dt = 0),
            f || (f = r.vars.id)),
          b &&
            ((!Nt(b) || b.push) && (b = { snapTo: b }),
            "scrollBehavior" in H.style && d.set(se ? [H, $e] : w, { scrollBehavior: "auto" }),
            M.forEach(function (p) {
              return ke(p) && p.target === (se ? B.scrollingElement || $e : w) && (p.smooth = !1);
            }),
            (kt = ke(b.snapTo)
              ? b.snapTo
              : b.snapTo === "labels"
                ? Oo(r)
                : b.snapTo === "labelsDirectional"
                  ? Ao(r)
                  : b.directional !== !1
                    ? function (p, S) {
                        return Pn(b.snapTo)(p, Te() - dt < 500 ? 0 : S.direction);
                      }
                    : d.utils.snap(b.snapTo)),
            (tt = b.duration || { min: 0.1, max: 2 }),
            (tt = Nt(tt) ? Sr(tt.min, tt.max) : Sr(tt, tt)),
            (rt = d
              .delayedCall(b.delay || It / 2 || 0.1, function () {
                var p = re(),
                  S = Te() - dt < 500,
                  m = De.tween;
                if ((S || Math.abs(s.getVelocity()) < 10) && !m && !on && Ke !== p) {
                  var C = (p - L) / $,
                    pe = r && !ue ? r.totalProgress() : C,
                    A = S ? 0 : ((pe - Ht) / (Te() - vr)) * 1e3 || 0,
                    j = d.utils.clamp(-C, 1 - C, (nr(A / 2) * A) / 0.185),
                    be = C + (b.inertia === !1 ? 0 : j),
                    K,
                    U,
                    N = b,
                    ot = N.onStart,
                    V = N.onInterrupt,
                    qe = N.onComplete;
                  if (
                    ((K = kt(be, s)),
                    wr(K) || (K = be),
                    (U = Math.max(0, Math.round(L + K * $))),
                    p <= Z && p >= L && U !== p)
                  ) {
                    if (m && !m._initted && m.data <= nr(U - p)) return;
                    (b.inertia === !1 && (j = K - C),
                      De(
                        U,
                        {
                          duration: tt(
                            nr((Math.max(nr(be - pe), nr(K - pe)) * 0.185) / A / 0.05 || 0),
                          ),
                          ease: b.ease || "power3",
                          data: nr(U - p),
                          onInterrupt: function () {
                            return rt.restart(!0) && V && rr(s, V);
                          },
                          onComplete: function () {
                            (s.update(),
                              (Ke = re()),
                              r &&
                                !ue &&
                                (O
                                  ? O.resetTo("totalProgress", K, r._tTime / r._tDur)
                                  : r.progress(K)),
                              (Dt = Ht = r && !ue ? r.totalProgress() : s.progress),
                              Y && Y(s),
                              qe && rr(s, qe));
                          },
                        },
                        p,
                        j * $,
                        U - p - j * $,
                      ),
                      ot && rr(s, ot, De.tween));
                  }
                } else s.isActive && Ke !== p && rt.restart(!0);
              })
              .pause())),
          f && (bn[f] = s),
          (g = s.trigger = Ye(g || (u !== !0 && u))),
          (vt = g && g._gsap && g._gsap.stRevert),
          vt && (vt = vt(s)),
          (u = u === !0 ? g : Ye(u)),
          Ve(a) && (a = { targets: g, className: a }),
          u &&
            (_ === !1 ||
              _ === Ze ||
              (_ =
                !_ && u.parentNode && u.parentNode.style && Qe(u.parentNode).display === "flex"
                  ? !1
                  : ie),
            (s.pin = u),
            (ye = d.core.getCache(u)),
            ye.spacer
              ? (ht = ye.pinState)
              : (G &&
                  ((G = Ye(G)),
                  G && !G.nodeType && (G = G.current || G.nativeElement),
                  (ye.spacerIsNative = !!G),
                  G && (ye.spacerState = Vr(G))),
                (ye.spacer = fe = G || B.createElement("div")),
                fe.classList.add("pin-spacer"),
                f && fe.classList.add("pin-spacer-" + f),
                (ye.pinState = ht = Vr(u))),
            t.force3D !== !1 && d.set(u, { force3D: !0 }),
            (s.spacer = fe = ye.spacer),
            (Zt = Qe(u)),
            (ur = Zt[_ + h.os2]),
            (Q = d.getProperty(u)),
            (et = d.quickSetter(u, h.a, ce)),
            gn(u, fe, Zt),
            (Ft = Vr(u))),
          ee)
        ) {
          ((gt = Nt(ee) ? $n(ee, Kn) : Kn),
            (c = Ur("scroller-start", f, w, h, gt, 0)),
            (We = Ur("scroller-end", f, w, h, gt, 0, c)),
            (Pt = c["offset" + h.op.d2]));
          var fr = Ye(xt(w, "content") || w);
          ((Xe = this.markerStart = Ur("start", f, fr, h, gt, Pt, 0, x)),
            (Ne = this.markerEnd = Ur("end", f, fr, h, gt, Pt, 0, x)),
            x && (Qt = d.quickSetter([Xe, Ne], h.a, ce)),
            !Me &&
              !(st.length && xt(w, "fixedMarkers") === !0) &&
              (Ro(se ? H : w),
              d.set([c, We], { force3D: !0 }),
              (Or = d.quickSetter(c, h.a, ce)),
              (Jt = d.quickSetter(We, h.a, ce))));
        }
        if (x) {
          var T = x.vars.onUpdate,
            v = x.vars.onUpdateParams;
          x.eventCallback("onUpdate", function () {
            (s.update(0, 0, 1), T && T.apply(x, v || []));
          });
        }
        if (
          ((s.previous = function () {
            return P[P.indexOf(s) - 1];
          }),
          (s.next = function () {
            return P[P.indexOf(s) + 1];
          }),
          (s.revert = function (p, S) {
            if (!S) return s.kill(!0);
            var m = p !== !1 || !s.enabled,
              C = Ce;
            m !== s.isReverted &&
              (m &&
                ((nt = Math.max(re(), s.scroll.rec || 0)),
                (ve = s.progress),
                (zt = r && r.progress())),
              Xe &&
                [Xe, Ne, c, We].forEach(function (pe) {
                  return (pe.style.display = m ? "none" : "block");
                }),
              m && ((Ce = s), s.update(m)),
              u && (!ze || !s.isActive) && (m ? Fo(u, fe, ht) : gn(u, fe, Qe(u), ne)),
              m || s.update(m),
              (Ce = C),
              (s.isReverted = m));
          }),
          (s.refresh = function (p, S, m, C) {
            if (!((Ce || !s.enabled) && !S)) {
              if (u && p && je) {
                ge(i, "scrollEnd", mo);
                return;
              }
              (!Ie && ae && ae(s),
                (Ce = s),
                De.tween && !m && (De.tween.kill(), (De.tween = 0)),
                O && O.pause(),
                W &&
                  r &&
                  (r.revert({ kill: !1 }).invalidate(),
                  r.getChildren
                    ? r.getChildren(!0, !0, !1).forEach(function (Rt) {
                        return Rt.vars.immediateRender && Rt.render(0, !0, !0);
                      })
                    : r.vars.immediateRender && r.render(0, !0, !0)),
                s.isReverted || s.revert(!0, !0),
                (s._subPinOffset = !1));
              var pe = Yt(),
                A = Tt(),
                j = x ? x.duration() : ft(w, h),
                be = $ <= 0.01 || !$,
                K = 0,
                U = C || 0,
                N = Nt(m) ? m.end : t.end,
                ot = t.endTrigger || g,
                V = Nt(m) ? m.start : t.start || (t.start === 0 || !g ? 0 : u ? "0 0" : "0 100%"),
                qe = (s.pinnedContainer = t.pinnedContainer && Ye(t.pinnedContainer, s)),
                at = (g && Math.max(0, P.indexOf(s))) || 0,
                he = at,
                _e,
                we,
                Bt,
                Ar,
                xe,
                le,
                lt,
                sn,
                Rn,
                pr,
                ct,
                dr,
                Lr;
              for (
                ee && Nt(m) && ((dr = d.getProperty(c, h.p)), (Lr = d.getProperty(We, h.p)));
                he-- > 0;
              )
                ((le = P[he]),
                  le.end || le.refresh(0, 1) || (Ce = s),
                  (lt = le.pin),
                  lt &&
                    (lt === g || lt === u || lt === qe) &&
                    !le.isReverted &&
                    (pr || (pr = []), pr.unshift(le), le.revert(!0, !0)),
                  le !== P[he] && (at--, he--));
              for (
                ke(V) && (V = V(s)),
                  V = qn(V, "start", s),
                  L =
                    jn(
                      V,
                      g,
                      pe,
                      h,
                      re(),
                      Xe,
                      c,
                      s,
                      A,
                      te,
                      Me,
                      j,
                      x,
                      s._startClamp && "_startClamp",
                    ) || (u ? -0.001 : 0),
                  ke(N) && (N = N(s)),
                  Ve(N) &&
                    !N.indexOf("+=") &&
                    (~N.indexOf(" ")
                      ? (N = (Ve(V) ? V.split(" ")[0] : "") + N)
                      : ((K = Jr(N.substr(2), pe)),
                        (N = Ve(V)
                          ? V
                          : (x
                              ? d.utils.mapRange(
                                  0,
                                  x.duration(),
                                  x.scrollTrigger.start,
                                  x.scrollTrigger.end,
                                  L,
                                )
                              : L) + K),
                        (ot = g))),
                  N = qn(N, "end", s),
                  Z =
                    Math.max(
                      L,
                      jn(
                        N || (ot ? "100% 0" : j),
                        ot,
                        pe,
                        h,
                        re() + K,
                        Ne,
                        We,
                        s,
                        A,
                        te,
                        Me,
                        j,
                        x,
                        s._endClamp && "_endClamp",
                      ),
                    ) || -0.001,
                  K = 0,
                  he = at;
                he--;
              )
                ((le = P[he] || {}),
                  (lt = le.pin),
                  lt &&
                    le.start - le._pinPush <= L &&
                    !x &&
                    le.end > 0 &&
                    ((_e = le.end - (s._startClamp ? Math.max(0, le.start) : le.start)),
                    ((lt === g && le.start - le._pinPush < L) || lt === qe) &&
                      isNaN(V) &&
                      (K += _e * (1 - le.progress)),
                    lt === u && (U += _e)));
              if (
                ((L += K),
                (Z += K),
                s._startClamp && (s._startClamp += K),
                s._endClamp && !Ie && ((s._endClamp = Z || -0.001), (Z = Math.min(Z, ft(w, h)))),
                ($ = Z - L || ((L -= 0.01) && 0.001)),
                be && (ve = d.utils.clamp(0, 1, d.utils.normalize(L, Z, nt))),
                (s._pinPush = U),
                Xe &&
                  K &&
                  ((_e = {}),
                  (_e[h.a] = "+=" + K),
                  qe && (_e[h.p] = "-=" + re()),
                  d.set([Xe, Ne], _e)),
                u && !(yn && s.end >= ft(w, h)))
              )
                ((_e = Qe(u)),
                  (Ar = h === oe),
                  (Bt = re()),
                  (Je = parseFloat(Q(h.a)) + U),
                  !j &&
                    Z > 1 &&
                    ((ct = (se ? B.scrollingElement || $e : w).style),
                    (ct = { style: ct, value: ct["overflow" + h.a.toUpperCase()] }),
                    se &&
                      Qe(H)["overflow" + h.a.toUpperCase()] !== "scroll" &&
                      (ct.style["overflow" + h.a.toUpperCase()] = "scroll")),
                  gn(u, fe, _e),
                  (Ft = Vr(u)),
                  (we = St(u, !0)),
                  (sn = Me && wt(w, Ar ? Se : oe)()),
                  _
                    ? ((ne = [_ + h.os2, $ + U + ce]),
                      (ne.t = fe),
                      (he = _ === ie ? rn(u, h) + $ + U : 0),
                      he &&
                        (ne.push(h.d, he + ce),
                        fe.style.flexBasis !== "auto" && (fe.style.flexBasis = he + ce)),
                      lr(ne),
                      qe &&
                        P.forEach(function (Rt) {
                          Rt.pin === qe && Rt.vars.pinSpacing !== !1 && (Rt._subPinOffset = !0);
                        }),
                      Me && re(nt))
                    : ((he = rn(u, h)),
                      he && fe.style.flexBasis !== "auto" && (fe.style.flexBasis = he + ce)),
                  Me &&
                    ((xe = {
                      top: we.top + (Ar ? Bt - L : sn) + ce,
                      left: we.left + (Ar ? sn : Bt - L) + ce,
                      boxSizing: "border-box",
                      position: "fixed",
                    }),
                    (xe[qt] = xe["max" + cr] = Math.ceil(we.width) + ce),
                    (xe[Gt] = xe["max" + Mn] = Math.ceil(we.height) + ce),
                    (xe[Ze] = xe[Ze + Er] = xe[Ze + Tr] = xe[Ze + Mr] = xe[Ze + kr] = "0"),
                    (xe[ie] = _e[ie]),
                    (xe[ie + Er] = _e[ie + Er]),
                    (xe[ie + Tr] = _e[ie + Tr]),
                    (xe[ie + Mr] = _e[ie + Mr]),
                    (xe[ie + kr] = _e[ie + kr]),
                    (Mt = Io(ht, xe, ze)),
                    Ie && re(0)),
                  r
                    ? ((Rn = r._initted),
                      un(1),
                      r.render(r.duration(), !0, !0),
                      (_t = Q(h.a) - Je + $ + U),
                      (mt = Math.abs($ - _t) > 1),
                      Me && mt && Mt.splice(Mt.length - 2, 2),
                      r.render(0, !0, !0),
                      Rn || r.invalidate(!0),
                      r.parent || r.totalTime(r.totalTime()),
                      un(0))
                    : (_t = $),
                  ct &&
                    (ct.value
                      ? (ct.style["overflow" + h.a.toUpperCase()] = ct.value)
                      : ct.style.removeProperty("overflow-" + h.a)));
              else if (g && re() && !x)
                for (we = g.parentNode; we && we !== H;)
                  (we._pinOffset && ((L -= we._pinOffset), (Z -= we._pinOffset)),
                    (we = we.parentNode));
              (pr &&
                pr.forEach(function (Rt) {
                  return Rt.revert(!1, !0);
                }),
                (s.start = L),
                (s.end = Z),
                (Re = Oe = Ie ? nt : re()),
                !x && !Ie && (Re < nt && re(nt), (s.scroll.rec = 0)),
                s.revert(!1, !0),
                (dt = Te()),
                rt && ((Ke = -1), rt.restart(!0)),
                (Ce = 0),
                r &&
                  ue &&
                  (r._initted || zt) &&
                  r.progress() !== zt &&
                  r.progress(zt || 0, !0).render(r.time(), !0, !0),
                (be || ve !== s.progress || x || W || (r && !r._initted)) &&
                  (r &&
                    !ue &&
                    (r._initted || ve || r.vars.immediateRender !== !1) &&
                    r.totalProgress(x && L < -0.001 && !ve ? d.utils.normalize(L, Z, 0) : ve, !0),
                  (s.progress = be || (Re - L) / $ === ve ? 0 : ve)),
                u && _ && (fe._pinOffset = Math.round(s.progress * _t)),
                O && O.invalidate(),
                isNaN(dr) ||
                  ((dr -= d.getProperty(c, h.p)),
                  (Lr -= d.getProperty(We, h.p)),
                  $r(c, h, dr),
                  $r(Xe, h, dr - (C || 0)),
                  $r(We, h, Lr),
                  $r(Ne, h, Lr - (C || 0))),
                be && !Ie && s.update(),
                D && !Ie && !Et && ((Et = !0), D(s), (Et = !1)));
            }
          }),
          (s.getVelocity = function () {
            return ((re() - Oe) / (Te() - vr)) * 1e3 || 0;
          }),
          (s.endAnimation = function () {
            (mr(s.callbackAnimation),
              r &&
                (O
                  ? O.progress(1)
                  : r.paused()
                    ? ue || mr(r, s.direction < 0, 1)
                    : mr(r, r.reversed())));
          }),
          (s.labelToScroll = function (p) {
            return (
              (r && r.labels && (L || s.refresh() || L) + (r.labels[p] / r.duration()) * $) || 0
            );
          }),
          (s.getTrailing = function (p) {
            var S = P.indexOf(s),
              m = s.direction > 0 ? P.slice(0, S).reverse() : P.slice(S + 1);
            return (
              Ve(p)
                ? m.filter(function (C) {
                    return C.vars.preventOverlaps === p;
                  })
                : m
            ).filter(function (C) {
              return s.direction > 0 ? C.end <= L : C.start >= Z;
            });
          }),
          (s.update = function (p, S, m) {
            if (!(x && !m && !p)) {
              var C = Ie === !0 ? nt : s.scroll(),
                pe = p ? 0 : (C - L) / $,
                A = pe < 0 ? 0 : pe > 1 ? 1 : pe || 0,
                j = s.progress,
                be,
                K,
                U,
                N,
                ot,
                V,
                qe,
                at;
              if (
                (S &&
                  ((Oe = Re),
                  (Re = x ? re() : C),
                  b && ((Ht = Dt), (Dt = r && !ue ? r.totalProgress() : A))),
                I &&
                  u &&
                  !Ce &&
                  !Xr &&
                  je &&
                  (!A && L < C + ((C - Oe) / (Te() - vr)) * I
                    ? (A = 1e-4)
                    : A === 1 && Z > C + ((C - Oe) / (Te() - vr)) * I && (A = 0.9999)),
                A !== j && s.enabled)
              ) {
                if (
                  ((be = s.isActive = !!A && A < 1),
                  (K = !!j && j < 1),
                  (V = be !== K),
                  (ot = V || !!A != !!j),
                  (s.direction = A > j ? 1 : -1),
                  (s.progress = A),
                  ot &&
                    !Ce &&
                    ((U = A && !j ? 0 : A === 1 ? 1 : j === 1 ? 2 : 3),
                    ue &&
                      ((N = (!V && X[U + 1] !== "none" && X[U + 1]) || X[U]),
                      (at = r && (N === "complete" || N === "reset" || N in r)))),
                  Be &&
                    (V || at) &&
                    (at || k || !r) &&
                    (ke(Be)
                      ? Be(s)
                      : s.getTrailing(Be).forEach(function (Bt) {
                          return Bt.endAnimation();
                        })),
                  ue ||
                    (O && !Ce && !Xr
                      ? (O._dp._time - O._start !== O._time && O.render(O._dp._time - O._start),
                        O.resetTo
                          ? O.resetTo("totalProgress", A, r._tTime / r._tDur)
                          : ((O.vars.totalProgress = A), O.invalidate().restart()))
                      : r && r.totalProgress(A, !!(Ce && (dt || p)))),
                  u)
                ) {
                  if ((p && _ && (fe.style[_ + h.os2] = ur), !Me)) et(br(Je + _t * A));
                  else if (ot) {
                    if (((qe = !p && A > j && Z + 1 > C && C + 1 >= ft(w, h)), ze))
                      if (!p && (be || qe)) {
                        var he = St(u, !0),
                          _e = C - L;
                        eo(
                          u,
                          H,
                          he.top + (h === oe ? _e : 0) + ce,
                          he.left + (h === oe ? 0 : _e) + ce,
                        );
                      } else eo(u, fe);
                    (lr(be || qe ? Mt : Ft),
                      (mt && A < 1 && be) || et(Je + (A === 1 && !qe ? _t : 0)));
                  }
                }
                (b && !De.tween && !Ce && !Xr && rt.restart(!0),
                  a &&
                    (V || (q && A && (A < 1 || !fn))) &&
                    Dr(a.targets).forEach(function (Bt) {
                      return Bt.classList[be || q ? "add" : "remove"](a.className);
                    }),
                  l && !ue && !p && l(s),
                  ot && !Ce
                    ? (ue &&
                        (at &&
                          (N === "complete"
                            ? r.pause().totalProgress(1)
                            : N === "reset"
                              ? r.restart(!0).pause()
                              : N === "restart"
                                ? r.restart(!0)
                                : r[N]()),
                        l && l(s)),
                      (V || !fn) &&
                        (y && V && rr(s, y),
                        Pe[U] && rr(s, Pe[U]),
                        q && (A === 1 ? s.kill(!1, 1) : (Pe[U] = 0)),
                        V || ((U = A === 1 ? 1 : 3), Pe[U] && rr(s, Pe[U]))),
                      Ee &&
                        !be &&
                        Math.abs(s.getVelocity()) > (wr(Ee) ? Ee : 2500) &&
                        (mr(s.callbackAnimation),
                        O ? O.progress(1) : mr(r, N === "reverse" ? 1 : !A, 1)))
                    : ue && l && !Ce && l(s));
              }
              if (Jt) {
                var we = x ? (C / x.duration()) * (x._caScrollDist || 0) : C;
                (Or(we + (c._isFlipped ? 1 : 0)), Jt(we));
              }
              Qt && Qt((-C / x.duration()) * (x._caScrollDist || 0));
            }
          }),
          (s.enable = function (p, S) {
            s.enabled ||
              ((s.enabled = !0),
              ge(w, "resize", xr),
              se || ge(w, "scroll", or),
              ae && ge(i, "refreshInit", ae),
              p !== !1 && ((s.progress = ve = 0), (Re = Oe = Ke = re())),
              S !== !1 && s.refresh());
          }),
          (s.getTween = function (p) {
            return p && De ? De.tween : O;
          }),
          (s.setPositions = function (p, S, m, C) {
            if (x) {
              var pe = x.scrollTrigger,
                A = x.duration(),
                j = pe.end - pe.start;
              ((p = pe.start + (j * p) / A), (S = pe.start + (j * S) / A));
            }
            (s.refresh(
              !1,
              !1,
              { start: Gn(p, m && !!s._startClamp), end: Gn(S, m && !!s._endClamp) },
              C,
            ),
              s.update());
          }),
          (s.adjustPinSpacing = function (p) {
            if (ne && p) {
              var S = ne.indexOf(h.d) + 1;
              ((ne[S] = parseFloat(ne[S]) + p + ce), (ne[1] = parseFloat(ne[1]) + p + ce), lr(ne));
            }
          }),
          (s.disable = function (p, S) {
            if (
              (p !== !1 && s.revert(!0, !0),
              s.enabled &&
                ((s.enabled = s.isActive = !1),
                S || (O && O.pause()),
                (nt = 0),
                ye && (ye.uncache = 1),
                ae && de(i, "refreshInit", ae),
                rt && (rt.pause(), De.tween && De.tween.kill() && (De.tween = 0)),
                !se))
            ) {
              for (var m = P.length; m--;) if (P[m].scroller === w && P[m] !== s) return;
              (de(w, "resize", xr), se || de(w, "scroll", or));
            }
          }),
          (s.kill = function (p, S) {
            (s.disable(p, S), O && !S && O.kill(), f && delete bn[f]);
            var m = P.indexOf(s);
            (m >= 0 && P.splice(m, 1),
              m === He && Qr > 0 && He--,
              (m = 0),
              P.forEach(function (C) {
                return C.scroller === s.scroller && (m = 1);
              }),
              m || Ie || (s.scroll.rec = 0),
              r && ((r.scrollTrigger = null), p && r.revert({ kill: !1 }), S || r.kill()),
              Xe &&
                [Xe, Ne, c, We].forEach(function (C) {
                  return C.parentNode && C.parentNode.removeChild(C);
                }),
              Pr === s && (Pr = 0),
              u &&
                (ye && (ye.uncache = 1),
                (m = 0),
                P.forEach(function (C) {
                  return C.pin === u && m++;
                }),
                m || (ye.spacer = 0)),
              t.onKill && t.onKill(s));
          }),
          P.push(s),
          s.enable(!1, !1),
          vt && vt(s),
          r && r.add && !$)
        ) {
          var F = s.update;
          ((s.update = function () {
            ((s.update = F), M.cache++, L || Z || s.refresh());
          }),
            d.delayedCall(0.01, s.update),
            ($ = 0.01),
            (L = Z = 0));
        } else s.refresh();
        u && Yo();
      }),
      (i.register = function (t) {
        return (ir || ((d = t || uo()), co() && window.document && i.enable(), (ir = yr)), ir);
      }),
      (i.defaults = function (t) {
        if (t) for (var r in t) Gr[r] = t[r];
        return Gr;
      }),
      (i.disable = function (t, r) {
        ((yr = 0),
          P.forEach(function (l) {
            return l[r ? "kill" : "disable"](t);
          }),
          de(R, "wheel", or),
          de(B, "scroll", or),
          clearInterval(Br),
          de(B, "touchcancel", ut),
          de(H, "touchstart", ut),
          Wr(de, B, "pointerdown,touchstart,mousedown", Un),
          Wr(de, B, "pointerup,touchend,mouseup", Vn),
          tn.kill(),
          Nr(de));
        for (var o = 0; o < M.length; o += 3) (qr(de, M[o], M[o + 1]), qr(de, M[o], M[o + 2]));
      }),
      (i.enable = function () {
        if (((R = window), (B = document), ($e = B.documentElement), (H = B.body), d)) {
          if (
            ((Dr = d.utils.toArray),
            (Sr = d.utils.clamp),
            (vn = d.core.context || ut),
            (un = d.core.suppressOverwrites || ut),
            (Cn = R.history.scrollRestoration || "auto"),
            (wn = R.pageYOffset || 0),
            d.core.globals("ScrollTrigger", i),
            H)
          ) {
            ((yr = 1),
              (ar = document.createElement("div")),
              (ar.style.height = "100vh"),
              (ar.style.position = "absolute"),
              wo(),
              Mo(),
              J.register(d),
              (i.isTouch = J.isTouch),
              (Lt = J.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
              (mn = J.isTouch === 1),
              ge(R, "wheel", or),
              (Sn = [R, B, $e, H]),
              d.matchMedia
                ? ((i.matchMedia = function (D) {
                    var k = d.matchMedia(),
                      g;
                    for (g in D) k.add(g, D[g]);
                    return k;
                  }),
                  d.addEventListener("matchMediaInit", function () {
                    (yo(), Dn());
                  }),
                  d.addEventListener("matchMediaRevert", function () {
                    return vo();
                  }),
                  d.addEventListener("matchMedia", function () {
                    (Wt(0, 1), Kt("matchMedia"));
                  }),
                  d.matchMedia().add("(orientation: portrait)", function () {
                    return (dn(), dn);
                  }))
                : console.warn("Requires GSAP 3.11.0 or later"),
              dn(),
              ge(B, "scroll", or));
            var t = H.hasAttribute("style"),
              r = H.style,
              o = r.borderTopStyle,
              l = d.core.Animation.prototype,
              a,
              f;
            for (
              l.revert ||
                Object.defineProperty(l, "revert", {
                  value: function () {
                    return this.time(-0.01, !0);
                  },
                }),
                r.borderTopStyle = "solid",
                a = St(H),
                oe.m = Math.round(a.top + oe.sc()) || 0,
                Se.m = Math.round(a.left + Se.sc()) || 0,
                o ? (r.borderTopStyle = o) : r.removeProperty("border-top-style"),
                t || (H.setAttribute("style", ""), H.removeAttribute("style")),
                Br = setInterval(Jn, 250),
                d.delayedCall(0.5, function () {
                  return (Xr = 0);
                }),
                ge(B, "touchcancel", ut),
                ge(H, "touchstart", ut),
                Wr(ge, B, "pointerdown,touchstart,mousedown", Un),
                Wr(ge, B, "pointerup,touchend,mouseup", Vn),
                _n = d.utils.checkPrefix("transform"),
                jr.push(_n),
                ir = Te(),
                tn = d.delayedCall(0.2, Wt).pause(),
                sr = [
                  B,
                  "visibilitychange",
                  function () {
                    var D = R.innerWidth,
                      k = R.innerHeight;
                    B.hidden ? ((Nn = D), (Wn = k)) : (Nn !== D || Wn !== k) && xr();
                  },
                  B,
                  "DOMContentLoaded",
                  Wt,
                  R,
                  "load",
                  Wt,
                  R,
                  "resize",
                  xr,
                ],
                Nr(ge),
                P.forEach(function (D) {
                  return D.enable(0, 1);
                }),
                f = 0;
              f < M.length;
              f += 3
            )
              (qr(de, M[f], M[f + 1]), qr(de, M[f], M[f + 2]));
          } else if (B) {
            var y = function D() {
              (i.enable(), B.removeEventListener("DOMContentLoaded", D));
            };
            B.addEventListener("DOMContentLoaded", y);
          }
        }
      }),
      (i.config = function (t) {
        "limitCallbacks" in t && (fn = !!t.limitCallbacks);
        var r = t.syncInterval;
        ((r && clearInterval(Br)) || ((Br = r) && setInterval(Jn, r)),
          "ignoreMobileResize" in t && (mn = i.isTouch === 1 && t.ignoreMobileResize),
          "autoRefreshEvents" in t &&
            (Nr(de) || Nr(ge, t.autoRefreshEvents || "none"),
            (so = (t.autoRefreshEvents + "").indexOf("resize") === -1)));
      }),
      (i.scrollerProxy = function (t, r) {
        var o = Ye(t),
          l = M.indexOf(o),
          a = Vt(o);
        (~l && M.splice(l, a ? 6 : 2), r && (a ? st.unshift(R, r, H, r, $e, r) : st.unshift(o, r)));
      }),
      (i.clearMatchMedia = function (t) {
        P.forEach(function (r) {
          return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
        });
      }),
      (i.isInViewport = function (t, r, o) {
        var l = (Ve(t) ? Ye(t) : t).getBoundingClientRect(),
          a = l[o ? qt : Gt] * r || 0;
        return o
          ? l.right - a > 0 && l.left + a < R.innerWidth
          : l.bottom - a > 0 && l.top + a < R.innerHeight;
      }),
      (i.positionInViewport = function (t, r, o) {
        Ve(t) && (t = Ye(t));
        var l = t.getBoundingClientRect(),
          a = l[o ? qt : Gt],
          f =
            r == null
              ? a / 2
              : r in nn
                ? nn[r] * a
                : ~r.indexOf("%")
                  ? (parseFloat(r) * a) / 100
                  : parseFloat(r) || 0;
        return o ? (l.left + f) / R.innerWidth : (l.top + f) / R.innerHeight;
      }),
      (i.killAll = function (t) {
        if (
          (P.slice(0).forEach(function (o) {
            return o.vars.id !== "ScrollSmoother" && o.kill();
          }),
          t !== !0)
        ) {
          var r = $t.killAll || [];
          (($t = {}),
            r.forEach(function (o) {
              return o();
            }));
        }
      }),
      i
    );
  })();
E.version = "3.15.0";
E.saveStyles = function (i) {
  return i
    ? Dr(i).forEach(function (e) {
        if (e && e.style) {
          var n = Ue.indexOf(e);
          (n >= 0 && Ue.splice(n, 5),
            Ue.push(
              e,
              e.style.cssText,
              e.getBBox && e.getAttribute("transform"),
              d.core.getCache(e),
              vn(),
            ));
        }
      })
    : Ue;
};
E.revert = function (i, e) {
  return Dn(!i, e);
};
E.create = function (i, e) {
  return new E(i, e);
};
E.refresh = function (i) {
  return i ? xr(!0) : (ir || E.register()) && Wt(!0);
};
E.update = function (i) {
  return ++M.cache && Ct(i === !0 ? 2 : 0);
};
E.clearScrollMemory = bo;
E.maxScroll = function (i, e) {
  return ft(i, e ? Se : oe);
};
E.getScrollFunc = function (i, e) {
  return wt(Ye(i), e ? Se : oe);
};
E.getById = function (i) {
  return bn[i];
};
E.getAll = function () {
  return P.filter(function (i) {
    return i.vars.id !== "ScrollSmoother";
  });
};
E.isScrolling = function () {
  return !!je;
};
E.snapDirectional = Pn;
E.addEventListener = function (i, e) {
  var n = $t[i] || ($t[i] = []);
  ~n.indexOf(e) || n.push(e);
};
E.removeEventListener = function (i, e) {
  var n = $t[i],
    t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
E.batch = function (i, e) {
  var n = [],
    t = {},
    r = e.interval || 0.016,
    o = e.batchMax || 1e9,
    l = function (y, D) {
      var k = [],
        g = [],
        u = d
          .delayedCall(r, function () {
            (D(k, g), (k = []), (g = []));
          })
          .pause();
      return function (_) {
        (k.length || u.restart(!0), k.push(_.trigger), g.push(_), o <= k.length && u.progress(1));
      };
    },
    a;
  for (a in e)
    t[a] = a.substr(0, 2) === "on" && ke(e[a]) && a !== "onRefreshInit" ? l(a, e[a]) : e[a];
  return (
    ke(o) &&
      ((o = o()),
      ge(E, "refresh", function () {
        return (o = e.batchMax());
      })),
    Dr(i).forEach(function (f) {
      var y = {};
      for (a in t) y[a] = t[a];
      ((y.trigger = f), n.push(E.create(y)));
    }),
    n
  );
};
var ro = function (e, n, t, r) {
    return (n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1);
  },
  hn = function i(e, n) {
    (n === !0
      ? e.style.removeProperty("touch-action")
      : (e.style.touchAction =
          n === !0 ? "auto" : n ? "pan-" + n + (J.isTouch ? " pinch-zoom" : "") : "none"),
      e === $e && i(H, n));
  },
  Kr = { auto: 1, scroll: 1 },
  Bo = function (e) {
    var n = e.event,
      t = e.target,
      r = e.axis,
      o = (n.changedTouches ? n.changedTouches[0] : n).target,
      l = o._gsap || d.core.getCache(o),
      a = Te(),
      f;
    if (!l._isScrollT || a - l._isScrollT > 2e3) {
      for (
        ;
        o &&
        o !== H &&
        ((o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth) ||
          !(Kr[(f = Qe(o)).overflowY] || Kr[f.overflowX]));
      )
        o = o.parentNode;
      ((l._isScroll = o && o !== t && !Vt(o) && (Kr[(f = Qe(o)).overflowY] || Kr[f.overflowX])),
        (l._isScrollT = a));
    }
    (l._isScroll || r === "x") && (n.stopPropagation(), (n._gsapAllow = !0));
  },
  So = function (e, n, t, r) {
    return J.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: n,
      onWheel: (r = r && Bo),
      onPress: r,
      onDrag: r,
      onScroll: r,
      onEnable: function () {
        return t && ge(B, J.eventTypes[0], oo, !1, !0);
      },
      onDisable: function () {
        return de(B, J.eventTypes[0], oo, !0);
      },
    });
  },
  Xo = /(input|label|select|textarea)/i,
  no,
  oo = function (e) {
    var n = Xo.test(e.target.tagName);
    (n || no) && ((e._gsapAllow = !0), (no = n));
  },
  No = function (e) {
    (Nt(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = "wheel,touch"),
      (e.debounce = !!e.debounce),
      (e.id = e.id || "normalizer"));
    var n = e,
      t = n.normalizeScrollX,
      r = n.momentum,
      o = n.allowNestedScroll,
      l = n.onRelease,
      a,
      f,
      y = Ye(e.target) || $e,
      D = d.core.globals().ScrollSmoother,
      k = D && D.get(),
      g =
        Lt &&
        ((e.content && Ye(e.content)) || (k && e.content !== !1 && !k.smooth() && k.content())),
      u = wt(y, oe),
      _ = wt(y, Se),
      W = 1,
      I =
        (J.isTouch && R.visualViewport
          ? R.visualViewport.scale * R.visualViewport.width
          : R.outerWidth) / R.innerWidth,
      z = 0,
      Y = ke(r)
        ? function () {
            return r(a);
          }
        : function () {
            return r || 2.8;
          },
      q,
      b,
      ze = So(y, e.type, !0, o),
      G = function () {
        return (b = !1);
      },
      x = ut,
      Ee = ut,
      Be = function () {
        ((f = ft(y, oe)), (Ee = Sr(Lt ? 1 : 0, f)), t && (x = Sr(0, ft(y, Se))), (q = Ut));
      },
      h = function () {
        ((g._gsap.y = br(parseFloat(g._gsap.y) + u.offset) + "px"),
          (g.style.transform =
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)"),
          (u.offset = u.cacheID = 0));
      },
      ue = function () {
        if (b) {
          requestAnimationFrame(G);
          var ee = br(a.deltaY / 2),
            te = Ee(u.v - ee);
          if (g && te !== u.v + u.offset) {
            u.offset = te - u.v;
            var s = br((parseFloat(g && g._gsap.y) || 0) - u.offset);
            ((g.style.transform =
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + s + ", 0, 1)"),
              (g._gsap.y = s + "px"),
              (u.cacheID = M.cache),
              Ct());
          }
          return !0;
        }
        (u.offset && h(), (b = !0));
      },
      w,
      pt,
      se,
      Me,
      Pe = function () {
        (Be(),
          w.isActive() &&
            w.vars.scrollY > f &&
            (u() > f ? w.progress(1) && u(f) : w.resetTo("scrollY", f)));
      };
    return (
      g && d.set(g, { y: "+=0" }),
      (e.ignoreCheck = function (X) {
        return (
          (Lt && X.type === "touchmove" && ue(X)) ||
          (W > 1.05 && X.type !== "touchstart") ||
          a.isGesturing ||
          (X.touches && X.touches.length > 1)
        );
      }),
      (e.onPress = function () {
        b = !1;
        var X = W;
        ((W = br(((R.visualViewport && R.visualViewport.scale) || 1) / I)),
          w.pause(),
          X !== W && hn(y, W > 1.01 ? !0 : t ? !1 : "x"),
          (pt = _()),
          (se = u()),
          Be(),
          (q = Ut));
      }),
      (e.onRelease = e.onGestureStart =
        function (X, ee) {
          if ((u.offset && h(), !ee)) Me.restart(!0);
          else {
            M.cache++;
            var te = Y(),
              s,
              ae;
            (t &&
              ((s = _()),
              (ae = s + (te * 0.05 * -X.velocityX) / 0.227),
              (te *= ro(_, s, ae, ft(y, Se))),
              (w.vars.scrollX = x(ae))),
              (s = u()),
              (ae = s + (te * 0.05 * -X.velocityY) / 0.227),
              (te *= ro(u, s, ae, ft(y, oe))),
              (w.vars.scrollY = Ee(ae)),
              w.invalidate().duration(te).play(0.01),
              ((Lt && w.vars.scrollY >= f) || s >= f - 1) &&
                d.to({}, { onUpdate: Pe, duration: te }));
          }
          l && l(X);
        }),
      (e.onWheel = function () {
        (w._ts && w.pause(), Te() - z > 1e3 && ((q = 0), (z = Te())));
      }),
      (e.onChange = function (X, ee, te, s, ae) {
        if (
          (Ut !== q && Be(),
          ee && t && _(x(s[2] === ee ? pt + (X.startX - X.x) : _() + ee - s[1])),
          te)
        ) {
          u.offset && h();
          var Yt = ae[2] === te,
            Tt = Yt ? se + X.startY - X.y : u() + te - ae[1],
            Ke = Ee(Tt);
          (Yt && Tt !== Ke && (se += Ke - Tt), u(Ke));
        }
        (te || ee) && Ct();
      }),
      (e.onEnable = function () {
        (hn(y, t ? !1 : "x"),
          E.addEventListener("refresh", Pe),
          ge(R, "resize", Pe),
          u.smooth && ((u.target.style.scrollBehavior = "auto"), (u.smooth = _.smooth = !1)),
          ze.enable());
      }),
      (e.onDisable = function () {
        (hn(y, !0), de(R, "resize", Pe), E.removeEventListener("refresh", Pe), ze.kill());
      }),
      (e.lockAxis = e.lockAxis !== !1),
      (a = new J(e)),
      (a.iOS = Lt),
      Lt && !u() && u(1),
      Lt && d.ticker.add(ut),
      (Me = a._dc),
      (w = d.to(a, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: t ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: xo(u, u(), function () {
            return w.pause();
          }),
        },
        onUpdate: Ct,
        onComplete: Me.vars.onComplete,
      })),
      a
    );
  };
E.sort = function (i) {
  if (ke(i)) return P.sort(i);
  var e = R.pageYOffset || 0;
  return (
    E.getAll().forEach(function (n) {
      return (n._sortY = n.trigger
        ? e + n.trigger.getBoundingClientRect().top
        : n.start + R.innerHeight);
    }),
    P.sort(
      i ||
        function (n, t) {
          return (
            (n.vars.refreshPriority || 0) * -1e6 +
            (n.vars.containerAnimation ? 1e6 : n._sortY) -
            ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6)
          );
        },
    )
  );
};
E.observe = function (i) {
  return new J(i);
};
E.normalizeScroll = function (i) {
  if (typeof i > "u") return Fe;
  if (i === !0 && Fe) return Fe.enable();
  if (i === !1) {
    (Fe && Fe.kill(), (Fe = i));
    return;
  }
  var e = i instanceof J ? i : No(i);
  return (Fe && Fe.target === e.target && Fe.kill(), Vt(e.target) && (Fe = e), e);
};
E.core = {
  _getVelocityProp: zr,
  _inputObserver: So,
  _scrollers: M,
  _proxies: st,
  bridge: {
    ss: function () {
      (je || Kt("scrollStart"), (je = Te()));
    },
    ref: function () {
      return Ce;
    },
  },
};
uo() && d.registerPlugin(E);
function Wo() {
  if (!document.querySelector(".welcome")) return;
  let i = new an(".main-section-swiper", {
    keyboard: { enabled: !0 },
    pagination: { el: ".swiper-pagination", type: "bullets", clickable: !0 },
    autoplay: { delay: 3500 },
    loop: !0,
  });
  new IntersectionObserver(
    (z) => {
      z.forEach((Y) => {
        Y.isIntersecting ? i.autoplay.start() : i.autoplay.stop();
      });
    },
    { threshold: 0.3 },
  ).observe(document.querySelector(".main-section-swiper"));
  let n = document.querySelector(".about-theatre__learn-more"),
    t = yt.timeline({ paused: !0, repeat: -1, defaults: { duration: 0.5, ease: "sine.inOut" } });
  (t.to(n, { scale: 1.1 }).to(n, { scale: 0.9 }).to(n, { scale: 1.1 }).to(n, { scale: 1 }),
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      (n.addEventListener("mouseenter", () => {
        t.play();
      }),
      n.addEventListener("mouseleave", () => {
        yt.to(t, {
          timeScale: 0,
          duration: 0.5,
          onComplete: () => {
            (t.pause(), t.timeScale(1));
          },
        });
      })));
  let o = new an(".about-theatre__swiper", {
    effect: "cards",
    cardsEffect: { perSlideOffset: 10, perSlideRotate: 2, slideShadows: !1 },
    pagination: { el: ".swiper-pagination" },
    navigation: { nextEl: ".about-theatre__arrow-next", prevEl: ".about-theatre__arrow-back" },
  });
  yt.registerPlugin(E);
  let l;
  function a() {
    window.innerWidth <= 1301 ||
      (l = E.create({
        trigger: ".about-theatre",
        start: "top top",
        end: () => "+=" + Math.max(f() - 397, 0),
        pin: ".about-theatre__swiper",
        pinSpacing: !1,
        invalidateOnRefresh: !0,
        anticipatePin: 1,
      }));
  }
  function f() {
    let z = document.querySelector(".about-theatre__text.open");
    return z ? z.scrollHeight : 300;
  }
  document.querySelectorAll(".accordion-wrapper").forEach(function (z) {
    let Y = z.querySelector(".about-theatre__learn-more"),
      q = z.querySelector(".about-theatre__text"),
      b = document.querySelector(".about-theatre__swiper");
    Y.addEventListener("click", function () {
      if (!q.classList.contains("open"))
        ((q.style.maxHeight = q.scrollHeight + "px"),
          (Y.textContent = "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"),
          q.classList.add("open"),
          setTimeout(() => {
            (l && (l.kill(), (l = null)), a(), E.refresh());
          }, 1e3));
      else if (
        ((q.style.maxHeight = "200px"),
        (Y.textContent =
          "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435"),
        q.classList.remove("open"),
        window.innerWidth > 1301)
      ) {
        let ze = b.getBoundingClientRect().top - b.parentElement.getBoundingClientRect().top;
        (l && (l.kill(), (l = null)),
          yt.set(b, { y: ze }),
          yt.to(b, { y: 0, duration: 0.9, ease: "power2.inOut" }));
      }
    });
  });
  let y = document.querySelector(".main-section__title"),
    D = document.querySelector(".main-section__link"),
    k = y.innerHTML.split("<br>");
  y.innerHTML = k
    .map(
      (z) => `
                <span class="line">
                    ${z
                      .trim()
                      .split("")
                      .map((Y) =>
                        Y === " " ? "<span>&nbsp;</span>" : `<span class="letter">${Y}</span>`,
                      )
                      .join("")}
                </span>
            `,
    )
    .join("");
  let g = y.querySelectorAll(".letter"),
    u = yt.timeline(),
    _ = () => {
      (u.set(y, { clipPath: "inset(0 100% 0 0)" }),
        u.to(y, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" }),
        u.fromTo(
          g,
          { y: -120, rotateX: -180, opacity: 0, filter: "blur(15px)", delay: 2.5 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.04,
            ease: "expo.out",
            delay: 2.5,
          },
          "-=0.8",
        ),
        u.fromTo(
          D,
          { filter: "blur(100px)" },
          { filter: "blur(0px)", ease: "expo.out", duration: 1.2 },
          "<",
        ));
    },
    W = document.querySelector(".main-header");
  yt.set(W, { opacity: 0, position: "absolute", "background-color": "none" });
  let I = () => {
    yt.to(W, { opacity: 1, duration: 1, delay: 2, ease: "power2.out" });
  };
  (document.readyState === "complete"
    ? (I(), _())
    : window.addEventListener("load", I, { once: !0 }),
    On.bind("[data-fancybox]", {}));
}
Wo();
/*! Bundled license information:

gsap/Observer.js:
  (*!
   * Observer 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
