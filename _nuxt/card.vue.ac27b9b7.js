import {r as M, s as K, x as _e, y as ee, z as me, A as te, l as se, B as ae, C as P, D as fe, E as he, u as c, G as D, H as ge, I as ve, h as O, o as _, c as f, a as s, n as Z, F as U, g as G, J as ne, w as be, d as m, t as u, _ as V, b as $, K as oe, L as we, i as R, p as xe, e as ye, j as ke, M as $e, k as Se, N as Ce, O as ze} from "./entry.c3fd9bbf.js";
import {_ as je} from "./avatar-256.d7772ac0.js";
import {_ as Ae} from "./nuxt-link.92e35659.js";
function H(e) {
    return fe() ? (he(e),
    !0) : !1
}
function L(e) {
    return typeof e == "function" ? e() : c(e)
}
const J = typeof window < "u" && typeof document < "u"
  , Me = Object.prototype.toString
  , Re = e=>Me.call(e) === "[object Object]"
  , ie = ()=>{}
;
function Ie(e, a) {
    function t(...r) {
        return new Promise((l,o)=>{
            Promise.resolve(e(()=>a.apply(this, r), {
                fn: a,
                thisArg: this,
                args: r
            })).then(l).catch(o)
        }
        )
    }
    return t
}
const le = e=>e();
function Te(e=le) {
    const a = M(!0);
    function t() {
        a.value = !1
    }
    function r() {
        a.value = !0
    }
    const l = (...o)=>{
        a.value && e(...o)
    }
    ;
    return {
        isActive: ee(a),
        pause: t,
        resume: r,
        eventFilter: l
    }
}
function Ee(...e) {
    if (e.length !== 1)
        return _e(...e);
    const a = e[0];
    return typeof a == "function" ? ee(me(()=>({
        get: a,
        set: ie
    }))) : M(a)
}
function Ne(e, a, t={}) {
    const {eventFilter: r=le, ...l} = t;
    return P(e, Ie(r, a), l)
}
function Le(e, a, t={}) {
    const {eventFilter: r, ...l} = t
      , {eventFilter: o, pause: n, resume: d, isActive: i} = Te(r);
    return {
        stop: Ne(e, a, {
            ...l,
            eventFilter: o
        }),
        pause: n,
        resume: d,
        isActive: i
    }
}
function De(e, a=!0) {
    te() ? se(e) : a ? e() : ae(e)
}
function Oe(e, a=1e3, t={}) {
    const {immediate: r=!0, immediateCallback: l=!1} = t;
    let o = null;
    const n = M(!1);
    function d() {
        o && (clearInterval(o),
        o = null)
    }
    function i() {
        n.value = !1,
        d()
    }
    function h() {
        const g = L(a);
        g <= 0 || (n.value = !0,
        l && e(),
        d(),
        o = setInterval(e, g))
    }
    if (r && J && h(),
    K(a) || typeof a == "function") {
        const g = P(a, ()=>{
            n.value && J && h()
        }
        );
        H(g)
    }
    return H(i),
    {
        isActive: n,
        pause: i,
        resume: h
    }
}
function Ys(e=1e3, a={}) {
    const {controls: t=!1, immediate: r=!0, callback: l} = a
      , o = M(0)
      , n = ()=>o.value += 1
      , d = ()=>{
        o.value = 0
    }
      , i = Oe(l ? ()=>{
        n(),
        l(o.value)
    }
    : n, e, {
        immediate: r
    });
    return t ? {
        counter: o,
        reset: d,
        ...i
    } : o
}
function Xs(e=!1, a={}) {
    const {truthyValue: t=!0, falsyValue: r=!1} = a
      , l = K(e)
      , o = M(e);
    function n(d) {
        if (arguments.length)
            return o.value = d,
            o.value;
        {
            const i = L(t);
            return o.value = o.value === i ? L(r) : i,
            o.value
        }
    }
    return l ? n : [o, n]
}
function re(e) {
    var a;
    const t = L(e);
    return (a = t == null ? void 0 : t.$el) != null ? a : t
}
const q = J ? window : void 0;
function Q(...e) {
    let a, t, r, l;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([t,r,l] = e,
    a = q) : [a,t,r,l] = e,
    !a)
        return ie;
    Array.isArray(t) || (t = [t]),
    Array.isArray(r) || (r = [r]);
    const o = []
      , n = ()=>{
        o.forEach(g=>g()),
        o.length = 0
    }
      , d = (g,b,j,S)=>(g.addEventListener(b, j, S),
    ()=>g.removeEventListener(b, j, S))
      , i = P(()=>[re(a), L(l)], ([g,b])=>{
        if (n(),
        !g)
            return;
        const j = Re(b) ? {
            ...b
        } : b;
        o.push(...t.flatMap(S=>r.map(w=>d(g, S, w, j))))
    }
    , {
        immediate: !0,
        flush: "post"
    })
      , h = ()=>{
        i(),
        n()
    }
    ;
    return H(h),
    h
}
function qe() {
    const e = M(!1);
    return te() && se(()=>{
        e.value = !0
    }
    ),
    e
}
function Ue(e) {
    const a = qe();
    return D(()=>(a.value,
    !!e()))
}
function Ve(e, a={}) {
    const {window: t=q} = a
      , r = Ue(()=>t && "matchMedia"in t && typeof t.matchMedia == "function");
    let l;
    const o = M(!1)
      , n = h=>{
        o.value = h.matches
    }
      , d = ()=>{
        l && ("removeEventListener"in l ? l.removeEventListener("change", n) : l.removeListener(n))
    }
      , i = ve(()=>{
        r.value && (d(),
        l = t.matchMedia(L(e)),
        "addEventListener"in l ? l.addEventListener("change", n) : l.addListener(n),
        o.value = l.matches)
    }
    );
    return H(()=>{
        i(),
        d(),
        l = void 0
    }
    ),
    o
}
const F = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , W = "__vueuse_ssr_handlers__"
  , Fe = We();
function We() {
    return W in F || (F[W] = F[W] || {}),
    F[W]
}
function ce(e, a) {
    return Fe[e] || a
}
function Be(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number"
}
const He = {
    boolean: {
        read: e=>e === "true",
        write: e=>String(e)
    },
    object: {
        read: e=>JSON.parse(e),
        write: e=>JSON.stringify(e)
    },
    number: {
        read: e=>Number.parseFloat(e),
        write: e=>String(e)
    },
    any: {
        read: e=>e,
        write: e=>String(e)
    },
    string: {
        read: e=>e,
        write: e=>String(e)
    },
    map: {
        read: e=>new Map(JSON.parse(e)),
        write: e=>JSON.stringify(Array.from(e.entries()))
    },
    set: {
        read: e=>new Set(JSON.parse(e)),
        write: e=>JSON.stringify(Array.from(e))
    },
    date: {
        read: e=>new Date(e),
        write: e=>e.toISOString()
    }
}
  , Y = "vueuse-storage";
function Pe(e, a, t, r={}) {
    var l;
    const {flush: o="pre", deep: n=!0, listenToStorageChanges: d=!0, writeDefaults: i=!0, mergeDefaults: h=!1, shallow: g, window: b=q, eventFilter: j, onError: S=p=>{
        console.error(p)
    }
    } = r
      , w = (g ? ge : M)(a);
    if (!t)
        try {
            t = ce("getDefaultStorage", ()=>{
                var p;
                return (p = q) == null ? void 0 : p.localStorage
            }
            )()
        } catch (p) {
            S(p)
        }
    if (!t)
        return w;
    const k = L(a)
      , T = Be(k)
      , C = (l = r.serializer) != null ? l : He[T]
      , {pause: E, resume: I} = Le(w, ()=>x(w.value), {
        flush: o,
        deep: n,
        eventFilter: j
    });
    return b && d && (Q(b, "storage", z),
    Q(b, Y, N)),
    z(),
    w;
    function x(p) {
        try {
            if (p == null)
                t.removeItem(e);
            else {
                const v = C.write(p)
                  , y = t.getItem(e);
                y !== v && (t.setItem(e, v),
                b && b.dispatchEvent(new CustomEvent(Y,{
                    detail: {
                        key: e,
                        oldValue: y,
                        newValue: v,
                        storageArea: t
                    }
                })))
            }
        } catch (v) {
            S(v)
        }
    }
    function A(p) {
        const v = p ? p.newValue : t.getItem(e);
        if (v == null)
            return i && k !== null && t.setItem(e, C.write(k)),
            k;
        if (!p && h) {
            const y = C.read(v);
            return typeof h == "function" ? h(y, k) : T === "object" && !Array.isArray(y) ? {
                ...k,
                ...y
            } : y
        } else
            return typeof v != "string" ? v : C.read(v)
    }
    function N(p) {
        z(p.detail)
    }
    function z(p) {
        if (!(p && p.storageArea !== t)) {
            if (p && p.key == null) {
                w.value = k;
                return
            }
            if (!(p && p.key !== e)) {
                E();
                try {
                    (p == null ? void 0 : p.newValue) !== C.write(w.value) && (w.value = A(p))
                } catch (v) {
                    S(v)
                } finally {
                    p ? ae(I) : I()
                }
            }
        }
    }
}
function Je(e) {
    return Ve("(prefers-color-scheme: dark)", e)
}
function Ke(e={}) {
    const {selector: a="html", attribute: t="class", initialValue: r="auto", window: l=q, storage: o, storageKey: n="vueuse-color-scheme", listenToStorageChanges: d=!0, storageRef: i, emitAuto: h, disableTransition: g=!0} = e
      , b = {
        auto: "",
        light: "light",
        dark: "dark",
        ...e.modes || {}
    }
      , j = Je({
        window: l
    })
      , S = D(()=>j.value ? "dark" : "light")
      , w = i || (n == null ? Ee(r) : Pe(n, r, o, {
        window: l,
        listenToStorageChanges: d
    }))
      , k = D(()=>w.value === "auto" ? S.value : w.value)
      , T = ce("updateHTMLAttrs", (x,A,N)=>{
        const z = typeof x == "string" ? l == null ? void 0 : l.document.querySelector(x) : re(x);
        if (!z)
            return;
        let p;
        if (g) {
            p = l.document.createElement("style");
            const v = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
            p.appendChild(document.createTextNode(v)),
            l.document.head.appendChild(p)
        }
        if (A === "class") {
            const v = N.split(/\s/g);
            Object.values(b).flatMap(y=>(y || "").split(/\s/g)).filter(Boolean).forEach(y=>{
                v.includes(y) ? z.classList.add(y) : z.classList.remove(y)
            }
            )
        } else
            z.setAttribute(A, N);
        g && (l.getComputedStyle(p).opacity,
        document.head.removeChild(p))
    }
    );
    function C(x) {
        var A;
        T(a, t, (A = b[x]) != null ? A : x)
    }
    function E(x) {
        e.onChanged ? e.onChanged(x, C) : C(x)
    }
    P(k, E, {
        flush: "post",
        immediate: !0
    }),
    De(()=>E(k.value));
    const I = D({
        get() {
            return h ? w.value : k.value
        },
        set(x) {
            w.value = x
        }
    });
    try {
        return Object.assign(I, {
            store: w,
            system: S,
            state: k
        })
    } catch {
        return I
    }
}
function ea(e={}) {
    const {valueDark: a="dark", valueLight: t=""} = e
      , r = Ke({
        ...e,
        onChanged: (o,n)=>{
            var d;
            e.onChanged ? (d = e.onChanged) == null || d.call(e, o === "dark", n, o) : n(o)
        }
        ,
        modes: {
            dark: a,
            light: t
        }
    });
    return D({
        get() {
            return r.value === "dark"
        },
        set(o) {
            const n = o ? "dark" : "light";
            r.system.value === n ? r.value = "auto" : r.value = n
        }
    })
}
const Ze = "" + globalThis.__publicAssetsURL("images/avatar-128.webp")
  , Ge = "" + globalThis.__publicAssetsURL("images/avatar-384.webp")
  , Qe = "" + globalThis.__publicAssetsURL("images/avatar-512.webp")
  , de = "" + globalThis.__publicAssetsURL("images/avatar-128.jpg")
  , Ye = "" + globalThis.__publicAssetsURL("images/avatar-256.jpg")
  , Xe = "" + globalThis.__publicAssetsURL("images/avatar-384.jpg")
  , et = "" + globalThis.__publicAssetsURL("images/avatar-512.jpg")
  , tt = Ze + " 1x, " + je + " 2x, " + Ge + " 3x, " + Qe + " 4x"
  , st = de + " 1x, " + Ye + " 2x, " + Xe + " 3x, " + et + " 4x"
  , at = s("div", {
    class: "relative"
}, [s("img", {
    src: "https://cdn.discordapp.com/avatar-decoration-presets/a_8ffa2ba9bff18e96b76c2e66fd0d7fa3.png?size=240&passthrough=true",
    alt: "avatar",
    "aria-hidden": "true",
    draggable: "false",
    class: "absolute -right-2 -top-3 z-40 h-[108px] min-w-[108px]"
}), s("circle", {
    cx: "68",
    cy: "68",
    r: "14",
    fill: "white",
    class: "absolute right-3 top-0 z-50 h-8 w-8"
})], -1)
  , nt = {
    "aria-hidden": "true",
    class: "relative h-[92px] w-[92px] rounded-full border-[6px] border-[#e0f5ff]"
}
  , ot = {
    width: "92",
    height: "80",
    viewBox: "0 0 92 80",
    class: "absolute"
}
  , it = s("div", null, [s("div", null, [s("circle", {
    cx: "40",
    cy: "40",
    r: "40",
    fill: "white"
}), s("circle", {
    cx: "68",
    cy: "68",
    r: "14",
    fill: "purple"
})])], -1)
  , lt = G('<div class="z-50 h-[80px] w-[80px]"><div class="grid h-full w-full"><picture><source type="image/webp" srcset="' + tt + '"><source type="image/jpg" srcset="' + st + '"><img src="' + de + '" alt="avatar" width="80" height="80" aria-hidden="true" draggable="false" class="block rounded-full"></picture></div></div>', 1)
  , rt = s("div", {
    class: "absolute bottom-0 right-0 h-6 w-6 rounded-full border-[6px] border-[#e0f5ff]"
}, null, -1)
  , ct = O({
    __name: "card-avatar",
    props: {
        status: {}
    },
    setup(e) {
        const a = {
            online: "bg-green-600",
            idle: "bg-amber-400",
            dnd: "bg-red-700",
            offline: "bg-slate-500"
        };
        return (t,r)=>(_(),
        f(U, null, [at, s("div", nt, [s("div", ot, [it, lt, s("div", {
            class: Z(["absolute bottom-1 right-1 h-4 w-4 rounded-full", a[t.status]])
        }, null, 2), rt])])], 64))
    }
})
  , ue = O({
    __name: "external-link",
    props: {
        href: {},
        text: {}
    },
    setup(e) {
        return (a,t)=>{
            const r = Ae;
            return _(),
            ne(r, {
                to: a.href,
                target: "_blank",
                class: "underline-offset-2 hover:underline"
            }, {
                default: be(()=>[m(u(a.text ?? a.href), 1)]),
                _: 1
            }, 8, ["to"])
        }
    }
})
  , dt = {}
  , ut = {
    class: "mb-3"
}
  , pt = s("h2", {
    class: "mb-2 text-xs font-bold uppercase leading-4 text-zinc-700"
}, "About Me", -1)
  , _t = {
    class: "whitespace-pre-line"
}
  , mt = s("span", {
    class: "inline-block"
}, [s("img", {
    src: "https://cdn.discordapp.com/emojis/1105972056350273698.webp?size=44&quality=lossless",
    alt: "transgender-cat",
    class: "inline-block h-5 w-5 align-bottom",
    draggable: "false"
})], -1)
  , ft = s("span", null, u(" She/Her"), -1)
  , ht = s("span", null, u(" 15 year old"), -1)
  , gt = s("span", {
    class: "inline-block"
}, [s("img", {
    src: "https://cdn.discordapp.com/emojis/1077014562085294090.webp?size=44&quality=lossless",
    alt: "pink-arrow",
    class: "inline-block h-5 w-5 align-bottom",
    draggable: "false"
})], -1)
  , vt = s("span", {
    class: "inline-block"
}, [s("img", {
    src: "https://cdn.discordapp.com/emojis/1012713973596037151.webp?size=44&quality=lossless",
    alt: "ghost-love",
    class: "inline-block h-5 w-5 align-bottom",
    draggable: "false"
})], -1)
  , bt = s("span", {
    class: "inline-block"
}, [s("img", {
    src: "https://cdn.discordapp.com/emojis/1077014562085294090.webp?size=44&quality=lossless",
    alt: "pink-arrow",
    class: "inline-block h-5 w-5 align-bottom",
    draggable: "false"
})], -1)
  , wt = s("img", {
    src: "https://cdn.discordapp.com/emojis/743960005924880494.webp?size=44&quality=lossless",
    "iara-label": ":iara_snuggie:",
    alt: "flushed-girl",
    draggable: "false",
    class: "inline-block h-5 w-5 align-bottom"
}, null, -1)
  , xt = s("span", {
    class: "inline-block"
}, [s("img", {
    src: "https://cdn.discordapp.com/emojis/1077014562085294090.webp?size=44&quality=lossless",
    alt: "pink-arrow",
    class: "inline-block h-5 w-5 align-bottom",
    draggable: "false"
})], -1)
  , yt = s("span", null, u("I Love Gaming and Anime"), -1)
  , kt = s("img", {
    src: "https://cdn.discordapp.com/emojis/1026592770074353684.webp?size=44&quality=lossless",
    "iara-label": ":iara_snuggie:",
    alt: "yay",
    draggable: "false",
    class: "inline-block h-5 w-5 align-bottom"
}, null, -1);
function $t(e, a) {
    const t = ue;
    return _(),
    f("div", ut, [pt, s("div", _t, [mt, m(" " + u("‎  ") + " "), ft, m(u(" · ") + " "), $(t, {
        href: "https://www.16personalities.com/infp-personality",
        text: "INFP-T"
    }), m(u(" · ") + " "), ht, m(u(`
`) + " " + u(`
`) + " "), gt, m(" " + u(" ") + " "), $(t, {
        class: "text-blue-500",
        href: "https://mishu.dev/",
        text: "https://mishu.dev/ "
    }), m(u("‎  ") + " " + u(" Owner") + " "), vt, m(" " + u(`
`) + " "), bt, m(" " + u(" ") + " " + u("Beginner Developer ") + " "), wt, m(" " + u(`
`) + " "), xt, m(" " + u(" ") + " "), yt, m(" " + u(" ") + " "), kt, m(" " + u(`
`))])])
}
const St = V(dt, [["render", $t]])
  , Ct = "" + new URL("map.6a81af6e.svg",import.meta.url).href
  , zt = {}
  , jt = {
    class: "mb-3"
}
  , At = G('<h2 class="mb-2 text-xs font-bold uppercase leading-4 text-zinc-700">Member Since</h2><div class="flex items-center gap-x-2"><span class="inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 20" class="inline-block h-5 w-5 fill-zinc-700 align-bottom"><path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z"></path></svg></span>  Apr 10, 2017 <div class="h-1 w-1 rounded-full bg-zinc-500"></div><span class="inline-block"><img src="' + Ct + '" alt="map" class="inline-block h-5 w-5 align-bottom" draggable="false"></span>  Nov 13, 2007</div>', 2)
  , Mt = [At];
function Rt(e, a) {
    return _(),
    f("div", jt, Mt)
}
const It = V(zt, [["render", Rt]])
  , Tt = e=>(xe("data-v-374536ef"),
e = e(),
ye(),
e)
  , Et = Tt(()=>s("h2", {
    class: "mb-2 text-xs font-bold uppercase leading-4 text-zinc-700"
}, "Playing a game", -1))
  , Nt = {
    class: "flex"
}
  , Lt = {
    key: 0,
    class: "flex h-[96px] flex-col gap-y-8"
}
  , Dt = {
    class: "flex items-center gap-x-2"
}
  , Ot = ["src", "alt"]
  , qt = ["src", "alt"]
  , Ut = ["src"]
  , Vt = {
    class: "ml-2.5 flex-auto overflow-hidden"
}
  , Ft = {
    class: "overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold"
}
  , Wt = {
    key: 0,
    class: "overflow-hidden text-ellipsis whitespace-nowrap"
}
  , Bt = {
    key: 1,
    class: "overflow-hidden text-ellipsis whitespace-nowrap"
}
  , Ht = {
    key: 2,
    class: "overflow-hidden text-ellipsis whitespace-nowrap"
}
  , X = 1e3
  , Pt = O({
    __name: "card-activity",
    props: {
        spotdata: {},
        testactivities: {},
        singleactivity: {}
    },
    setup(e) {
        const a = e
          , t = X * 60
          , r = t * 60
          , l = oe("user-card-activity-elapsed");
        window.setInterval(()=>{
            var n;
            l.value = o((n = a.singleactivity.timestamps) == null ? void 0 : n.start)
        }
        , 1e3);
        function o(n) {
            if (!n)
                return null;
            const d = Date.now() - n
              , i = (Math.floor(d / X) % 60).toString().padStart(2, "0")
              , h = (Math.floor(d / t) % 60).toString().padStart(2, "0");
            return d < r ? `${h}:${i}` : `${Math.floor(d / r).toString().padStart(2, "0")}:${h}:${i}`
        }
        return (n,d)=>(_(),
        f("div", null, [Et, s("div", Nt, [s("ul", null, [(_(!0),
        f(U, null, we(n.testactivities, (i,h)=>{
            var g;
            return _(),
            f("li", {
                key: i.id
            }, [h !== 0 ? (_(),
            f("div", Lt, [s("div", Dt, [s("div", null, [i.name != "Spotify" && i.assets ? (_(),
            f("img", {
                key: 0,
                src: `https://cdn.discordapp.com/app-assets/${i.application_id}/${i.assets.large_image}.webp`,
                alt: i.assets.large_text,
                draggable: "false",
                class: "h-[60px] w-[60px] rounded-lg object-cover"
            }, null, 8, Ot)) : R("", !0), i.name != "Spotify" && !i.assets ? (_(),
            f("img", {
                key: 1,
                src: `https://dcdn.dstn.to/app-icons/${i.application_id}.png`,
                alt: i.name,
                draggable: "false",
                class: "h-[60px] w-[60px] rounded-lg object-cover"
            }, null, 8, qt)) : R("", !0), i.name == "Spotify" ? (_(),
            f("img", {
                key: 2,
                src: n.spotdata.album_art_url,
                alt: "spotify song",
                draggable: "false",
                class: "h-[60px] max-h-[60px] min-h-[60px] w-[60px] min-w-[60px] max-w-[60px] rounded-lg object-cover"
            }, null, 8, Ut)) : R("", !0)]), s("div", null, [s("div", Vt, [s("div", Ft, u(i.name), 1), i.details ? (_(),
            f("div", Wt, u(i.details), 1)) : R("", !0), i.state ? (_(),
            f("div", Bt, u(i.state), 1)) : R("", !0), c(l) ? (_(),
            f("div", Ht, u(o((g = i.timestamps) == null ? void 0 : g.start)) + " elapsed ", 1)) : R("", !0)])])])])) : R("", !0)])
        }
        ), 128))])])]))
    }
});
const Jt = V(Pt, [["__scopeId", "data-v-374536ef"]])
  , Kt = ["aria-label"]
  , Zt = {
    class: "relative items-center"
}
  , Gt = {
    class: "mr-1 max-w-[200px] text-ellipsis whitespace-nowrap"
}
  , Qt = O({
    __name: "item",
    props: ["role", "classColor"],
    setup(e) {
        return (a,t)=>(_(),
        f("div", {
            class: "mb-1 mr-1 flex items-center rounded bg-[#e0f5ff] p-1 text-xs font-medium",
            "aria-label": e.role,
            role: "listitem"
        }, [s("div", Zt, [s("span", {
            class: Z(["mx-1 flex h-3 w-3 shrink-0 rounded-full", e.classColor])
        }, null, 2)]), s("div", Gt, u(e.role), 1)], 8, Kt))
    }
})
  , Yt = {}
  , Xt = s("h2", {
    class: "mb-2 text-xs font-bold uppercase leading-4 text-zinc-700"
}, "Roles", -1)
  , es = {
    "aria-label": "Roles",
    role: "list",
    class: "mb-3 mt-0.5 flex flex-wrap"
};
function ts(e, a) {
    const t = Qt;
    return _(),
    f(U, null, [Xt, s("div", es, [$(t, {
        role: "TypeScript",
        "class-color": "bg-gradient-to-tl from-blue-700 to-blue-200"
    }), $(t, {
        role: "JavaScript",
        "class-color": "bg-gradient-to-tl from-amber-700 to-amber-200"
    }), $(t, {
        role: "Python",
        "class-color": "bg-gradient-to-tl from-yellow-600 to-amber-200"
    }), $(t, {
        role: "C#",
        "class-color": "bg-gradient-to-tl from-violet-400 to-pink-400"
    })])], 64)
}
const ss = V(Yt, [["render", ts]])
  , as = {}
  , ns = s("h2", {
    class: "mb-2 text-xs font-bold uppercase leading-4 text-zinc-700"
}, "Note", -1)
  , os = {
    class: "-mx-1 mb-3 h-9 w-full p-1 text-xs"
};
function is(e, a) {
    const t = ue;
    return _(),
    f(U, null, [ns, s("div", os, [m(" Website made with "), $(t, {
        href: "https://v3.nuxtjs.org",
        text: "Nuxt v3"
    }), m(" and "), $(t, {
        href: "https://tailwindcss.com",
        text: "TailwindCSS"
    }), m(". ")])], 64)
}
const ls = V(as, [["render", is]])
  , rs = {
    class: "relative flex w-full flex-wrap items-stretch rounded bg-[#d9f7ff] p-3"
}
  , cs = ["onKeyup"]
  , ds = s("path", {
    d: "M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
}, null, -1)
  , us = [ds]
  , ps = {
    key: 0,
    class: "text-right text-xs"
}
  , _s = s("label", {
    for: "email-form"
}, [s("span", {
    class: "font-bold text-indigo-500"
}, "Tip:"), m(" You can press Ctrl + Enter to send")], -1)
  , ms = [_s]
  , fs = O({
    __name: "card-message",
    setup(e) {
        const a = M("")
          , t = M();
        function r() {
            const o = t.value;
            o && (o.href = `mailto:mishudiscord@gmail.com?body=${encodeURIComponent(a.value)}`,
            o.click(),
            a.value = "")
        }
        function l(o) {
            const n = o.target;
            n.style.removeProperty("height"),
            n.style.height = `${n.scrollHeight + 2}px`
        }
        return (o,n)=>(_(),
        f(U, null, [s("div", rs, [ke(s("textarea", {
            id: "mensaje",
            class: "flex-auto resize-none overflow-hidden rounded-r-none bg-transparent outline-0",
            placeholder: "Message @lucialv",
            "aria-label": "Send an email to Lucía",
            "onUpdate:modelValue": n[0] || (n[0] = d=>K(a) ? a.value = d : null),
            onInput: l,
            onKeyup: Se(Ce(r, ["ctrl"]), ["enter"])
        }, null, 40, cs), [[$e, c(a), void 0, {
            trim: !0
        }]]), s("button", {
            class: "flex-none self-start",
            "aria-label": "Send",
            onClick: r
        }, [(_(),
        f("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512",
            class: Z(["right-3 top-3 ml-2 h-8 w-8 rounded-l-none fill-zinc-700", {
                "opacity-20": !c(a).length
            }])
        }, us, 2))])]), c(a) ? (_(),
        f("div", ps, ms)) : R("", !0), s("a", {
            href: "#",
            ref_key: "anchor",
            ref: t,
            class: "hidden",
            "aria-hidden": "false",
            rel: "nofollow",
            target: "_top"
        }, null, 512)], 64))
    }
})
  , hs = ()=>oe("user", ()=>({
    spotify: {
        track_id: "",
        song: "",
        artist: "",
        album_art_url: "",
        album: ""
    },
    listening_to_spotify: !1,
    kv: {},
    discord_user: {
        username: "lucialv",
        public_flags: 0,
        id: "300969054649450496",
        discriminator: "0",
        bot: !1,
        avatar: ""
    },
    discord_status: "offline",
    activities: [],
    active_on_discord_web: !1,
    active_on_discord_mobile: !1,
    active_on_discord_desktop: !1
}));
var B = (e=>(e[e.Event = 0] = "Event",
e[e.Hello = 1] = "Hello",
e[e.Initialize = 2] = "Initialize",
e[e.Heartbeat = 3] = "Heartbeat",
e))(B || {});
const gs = "" + globalThis.__publicAssetsURL("images/banner.webp")
  , pe = "" + globalThis.__publicAssetsURL("images/banner.gif")
  , vs = gs
  , bs = pe
  , ws = {
    class: "w-[350px] font-['Whitney'] drop-shadow-[0_0_0.6rem_#3269eb70] md:w-[400px]"
}
  , xs = {
    class: "relative h-full overflow-hidden rounded-2xl border-4 border-[#85d2fc] bg-gradient-to-b from-[#bce8ff] via-[#bce8ff] to-[#8de3fb]"
}
  , ys = {
    class: "relative"
}
  , ks = s("picture", null, [s("source", {
    type: "image/webp",
    srcset: vs
}), s("source", {
    type: "image/gif",
    srcset: bs
}), s("img", {
    src: pe,
    alt: "banner",
    "aria-hidden": "true",
    draggable: "false",
    class: "block h-full w-full"
})], -1)
  , $s = {
    class: "absolute left-[16px] top-[76px] md:top-[85px]"
}
  , Ss = {
    class: "rounded-full"
}
  , Cs = G('<div><div class="absolute right-8 top-[132.5px] h-8 w-36 rounded-lg bg-[#e0f5ff] md:top-[150px]"></div><div><img src="https://cdn.discordapp.com/emojis/1097524725464432750.webp?size=44&amp;quality=lossless" alt="active-developer" draggable="false" class="absolute right-[120px] top-[135px] z-10 h-[26px] w-[26px] cursor-pointer md:top-[152px]"></div><div><p class="absolute right-[70px] top-20 m-2 w-auto min-w-max origin-top scale-0 rounded-md bg-white p-2 text-xs font-bold text-zinc-900 shadow-md transition-all duration-100 dark:bg-zinc-900 dark:text-white [div:hover+*&gt;&amp;]:scale-100"> Active Developer </p></div><div><img src="https://cdn.discordapp.com/emojis/1097524742686244975.webp?size=44&amp;quality=lossless" alt="hypesquad" draggable="false" class="absolute right-[146px] top-[135px] z-10 h-[26px] w-[26px] cursor-pointer md:top-[152px]"></div><div><p class="absolute right-[90px] top-20 m-2 w-auto min-w-max origin-top scale-0 rounded-md bg-white p-2 text-xs font-bold text-zinc-900 shadow-md transition-all duration-100 dark:bg-zinc-900 dark:text-white [div:hover+*&gt;&amp;]:scale-100"> HypeSquad Balance </p></div><div><img src="https://cdn.discordapp.com/emojis/1097524736101204108.webp?size=44&amp;quality=lossless" alt="nitro" draggable="false" class="absolute right-[92px] top-[135px] z-10 h-[26px] w-[26px] cursor-pointer md:top-[152px]"></div><div><p class="absolute right-2 top-20 m-2 w-auto min-w-max origin-top scale-0 rounded-md bg-white p-2 text-xs font-bold text-zinc-900 shadow-md transition-all duration-100 dark:bg-zinc-900 dark:text-white [div:hover+*&gt;&amp;]:scale-100"> Subscriber since 2 Oct 2023 </p></div><div><img src="https://cdn.discordapp.com/emojis/1112318025182498876.webp?size=44&amp;quality=lossless" alt="boost" draggable="false" class="absolute right-[64px] top-[135px] z-10 h-[26px] w-[26px] cursor-pointer md:top-[152px]"></div><div><p class="absolute right-0 top-20 m-2 w-auto min-w-max origin-top scale-0 rounded-md bg-white p-2 text-xs font-bold text-zinc-900 shadow-md transition-all duration-100 dark:bg-zinc-900 dark:text-white [div:hover+*&gt;&amp;]:scale-100"> Server Boosting since 2 Oct 2023 </p></div><div><img src="https://cdn.discordapp.com/emojis/1118229890756526170.webp?size=44&amp;quality=lossless" alt="icon-username" draggable="false" class="absolute right-[38px] top-[135px] z-10 h-[26px] w-[26px] cursor-pointer md:top-[152px]"></div><div><p class="absolute right-0 top-20 m-2 w-auto min-w-max origin-top scale-0 rounded-md bg-white p-2 text-xs font-bold text-zinc-900 shadow-md transition-all duration-100 dark:bg-zinc-900 dark:text-white [div:hover+*&gt;&amp;]:scale-100"> Originally know as lucialv#0001 </p></div></div>', 1)
  , zs = {
    class: "m-6 mx-4 mt-14 rounded-lg bg-gradient-to-b from-[#e0f5ff] via-[#e0f5ff] to-[#c9f2fe] px-6 py-3"
}
  , js = {
    class: "pb-3"
}
  , As = {
    class: "text-xl font-semibold leading-6"
}
  , Ms = {
    class: "text-zinc-900"
}
  , Rs = {
    class: "text-md font-semibold leading-6"
}
  , Is = {
    class: "text-zinc-900"
}
  , Ts = s("div", {
    class: "text-md font-semibold leading-6"
}, [s("span", {
    class: "text-zinc-500"
}, "she/her")], -1)
  , Es = s("div", {
    "aria-label": "User Badges",
    role: "list"
}, null, -1)
  , Ns = {
    class: "flex-initial pb-7 text-sm"
}
  , Ls = {
    class: "pb-2.5"
}
  , Ds = ["src"]
  , Os = ["src"]
  , qs = {
    key: 2,
    src: "https://cdn.discordapp.com/emojis/1158402064070750208.webp?size=44&quality=lossless",
    "iara-label": ":iara_snuggie:",
    alt: "lesbianherat",
    draggable: "false",
    class: "float-left -my-px mr-1 h-5 w-5"
}
  , Us = {
    key: 3
}
  , Vs = {
    key: 4
}
  , Fs = {
    key: 5
}
  , Ws = {
    key: 6
}
  , Bs = {
    key: 7
}
  , Hs = ["href"]
  , Ps = {
    key: 8
}
  , Js = {
    key: 9
}
  , Ks = s("div", {
    class: "mb-3 h-[1px] w-full bg-[#c0e1ec]"
}, null, -1)
  , ta = O({
    __name: "card",
    setup(e) {
        function a(n) {
            const d = /(https?:\/\/[^\s]+)/g
              , i = n.match(d);
            return i && i.length > 0 ? i[0] : ""
        }
        const t = hs()
          , r = ze()
          , l = D(()=>t.value.activities.find(n=>n.assets));
        function o() {
            let n = -1;
            const d = new WebSocket("wss://api.lanyard.rest/socket");
            d.onopen = ()=>console.info("[WS] Successfully connected"),
            d.onerror = i=>{
                console.log("[WS] Received error: ", i),
                d.close()
            }
            ,
            d.onclose = i=>{
                console.log("[WS] Closed with code %d. Retrying in 1 second.", i.code),
                n !== -1 && (window.clearInterval(n),
                n = -1),
                window.setTimeout(()=>o(), 1e3)
            }
            ,
            d.onmessage = i=>{
                const h = JSON.parse(i.data);
                switch (h.op) {
                case B.Event:
                    t.value = h.d;
                    break;
                case B.Hello:
                    {
                        n !== -1 && window.clearInterval(n),
                        n = window.setInterval(()=>d.send(JSON.stringify({
                            op: B.Heartbeat
                        })), h.d.heartbeat_interval),
                        d.send(JSON.stringify({
                            op: 2,
                            d: {
                                subscribe_to_id: r.public.DISCORD_USER_ID
                            }
                        }));
                        break
                    }
                default:
                    console.info("[WS] Unknown message: %d", h)
                }
            }
        }
        return o(),
        (n,d)=>{
            var k, T, C, E, I, x, A, N, z, p, v, y;
            const i = ct
              , h = St
              , g = It
              , b = Jt
              , j = ss
              , S = ls
              , w = fs;
            return _(),
            f("div", ws, [s("div", xs, [s("div", ys, [ks, s("div", $s, [s("div", Ss, [$(i, {
                status: c(t).discord_status
            }, null, 8, ["status"])])]), Cs]), s("div", zs, [s("div", js, [s("div", As, [s("span", Ms, u(c(t).discord_user.global_name), 1)]), s("div", Rs, [s("span", Is, "@" + u(c(t).discord_user.username), 1)]), Ts, Es]), s("div", Ns, [s("div", Ls, [(T = (k = c(t).activities[0]) == null ? void 0 : k.emoji) != null && T.animated ? (_(),
            f("img", {
                key: 0,
                src: `https://cdn.discordapp.com/emojis/${(E = (C = c(t).activities[0]) == null ? void 0 : C.emoji) == null ? void 0 : E.id}.gif?size=44&quality=lossless`,
                "iara-label": ":iara_snuggie:",
                alt: "animatedemoji",
                draggable: "false",
                class: "float-left -my-px mr-1 h-5 w-5"
            }, null, 8, Ds)) : !((x = (I = c(t).activities[0]) == null ? void 0 : I.emoji) != null && x.animated) && ((N = (A = c(t).activities[0]) == null ? void 0 : A.emoji) != null && N.id) ? (_(),
            f("img", {
                key: 1,
                src: `https://cdn.discordapp.com/emojis/${(p = (z = c(t).activities[0]) == null ? void 0 : z.emoji) == null ? void 0 : p.id}.webp?size=44&quality=lossless`,
                "iara-label": ":iara_snuggie:",
                alt: "webpemoji",
                draggable: "false",
                class: "float-left -my-px mr-1 h-5 w-5"
            }, null, 8, Os)) : (_(),
            f("img", qs)), c(t).activities[4] ? (_(),
            f("span", Us, [m("Playing "), s("strong", null, u(c(t).activities[1].name), 1), m(", "), s("strong", null, u(c(t).activities[2].name), 1), m(", "), s("strong", null, u(c(t).activities[3].name), 1), m(" and "), s("strong", null, u(c(t).activities[4].name), 1), m(".")])) : c(t).activities[3] ? (_(),
            f("span", Vs, [m("Playing "), s("strong", null, u(c(t).activities[1].name), 1), m(", "), s("strong", null, u(c(t).activities[2].name), 1), m(" and "), s("strong", null, u(c(t).activities[3].name), 1), m(".")])) : c(t).activities[2] && !c(t).activities[3] ? (_(),
            f("span", Fs, [m("Playing "), s("strong", null, u(c(t).activities[1].name), 1), m(" and "), s("strong", null, u(c(t).activities[2].name), 1), m(".")])) : c(t).activities[1] && !c(t).activities[2] ? (_(),
            f("span", Ws, [m("Playing "), s("strong", null, u(c(t).activities[1].name), 1), m(". ")])) : c(t).activities[0] && ((v = c(t).activities[0].state) != null && v.includes("https://")) ? (_(),
            f("span", Bs, [s("a", {
                class: "text-blue-700 hover:underline",
                target: "_blank",
                href: a(c(t).activities[0].state)
            }, u(c(t).activities[0].state), 9, Hs)])) : c(t).activities[0] && !((y = c(t).activities[0].state) != null && y.includes("https://")) ? (_(),
            f("span", Ps, u(c(t).activities[0].state), 1)) : (_(),
            f("span", Js, " Im not online right now <3"))]), Ks, $(h), $(g), c(l) ? (_(),
            ne(b, {
                key: 0,
                spotdata: c(t).spotify,
                testactivities: c(t).activities,
                singleactivity: c(l)
            }, null, 8, ["spotdata", "testactivities", "singleactivity"])) : R("", !0), $(j), $(S), $(w)])])])])
        }
    }
});
export {ta as _, ea as a, Xs as b, Ys as c, Ke as u};
