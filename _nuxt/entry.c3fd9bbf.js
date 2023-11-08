function To(e, t) {
    const n = Object.create(null)
      , r = e.split(",");
    for (let o = 0; o < r.length; o++)
        n[r[o]] = !0;
    return t ? o=>!!n[o.toLowerCase()] : o=>!!n[o]
}
const ue = {}
  , Jt = []
  , Je = ()=>{}
  , Ol = ()=>!1
  , Ml = /^on[^a-z]/
  , jn = e=>Ml.test(e)
  , xo = e=>e.startsWith("onUpdate:")
  , be = Object.assign
  , Ro = (e,t)=>{
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
  , Il = Object.prototype.hasOwnProperty
  , re = (e,t)=>Il.call(e, t)
  , J = Array.isArray
  , Qt = e=>$n(e) === "[object Map]"
  , $i = e=>$n(e) === "[object Set]"
  , jl = e=>$n(e) === "[object RegExp]"
  , Y = e=>typeof e == "function"
  , pe = e=>typeof e == "string"
  , Ao = e=>typeof e == "symbol"
  , ce = e=>e !== null && typeof e == "object"
  , Hi = e=>ce(e) && Y(e.then) && Y(e.catch)
  , Li = Object.prototype.toString
  , $n = e=>Li.call(e)
  , $l = e=>$n(e).slice(8, -1)
  , Ni = e=>$n(e) === "[object Object]"
  , Po = e=>pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , bn = To(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , hr = e=>{
    const t = Object.create(null);
    return n=>t[n] || (t[n] = e(n))
}
  , Hl = /-(\w)/g
  , tt = hr(e=>e.replace(Hl, (t,n)=>n ? n.toUpperCase() : ""))
  , Ll = /\B([A-Z])/g
  , Dt = hr(e=>e.replace(Ll, "-$1").toLowerCase())
  , mr = hr(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , Pr = hr(e=>e ? `on ${mr(e)}` : "")
  , xn = (e,t)=>!Object.is(e, t)
  , Yt = (e,t)=>{
    for (let n = 0; n < e.length; n++)
        e[n](t)
}
  , Zn = (e,t,n)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: n
    })
}
  , Vr = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
  , Fi = e=>{
    const t = pe(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t
}
;
let fs;
const zr = ()=>fs || (fs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function gr(e) {
    if (J(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n]
              , o = pe(r) ? Dl(r) : gr(r);
            if (o)
                for (const s in o)
                    t[s] = o[s]
        }
        return t
    } else {
        if (pe(e))
            return e;
        if (ce(e))
            return e
    }
}
const Nl = /;(?![^(]*\))/g
  , Fl = /:([^]+)/
  , Bl = /\/\*[^]*?\*\//g;
function Dl(e) {
    const t = {};
    return e.replace(Bl, "").split(Nl).forEach(n=>{
        if (n) {
            const r = n.split(Fl);
            r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
    }
    ),
    t
}
function yr(e) {
    let t = "";
    if (pe(e))
        t = e;
    else if (J(e))
        for (let n = 0; n < e.length; n++) {
            const r = yr(e[n]);
            r && (t += r + " ")
        }
    else if (ce(e))
        for (const n in e)
            e[n] && (t += n + " ");
    return t.trim()
}
function Ul(e) {
    if (!e)
        return null;
    let {class: t, style: n} = e;
    return t && !pe(t) && (e.class = yr(t)),
    n && (e.style = gr(n)),
    e
}
const Kl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , Wl = To(Kl);
function Bi(e) {
    return !!e || e === ""
}
const _m = e=>pe(e) ? e : e == null ? "" : J(e) || ce(e) && (e.toString === Li || !Y(e.toString)) ? JSON.stringify(e, Di, 2) : String(e)
  , Di = (e,t)=>t && t.__v_isRef ? Di(e, t.value) : Qt(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((n,[r,o])=>(n[`${r} =>`] = o,
    n), {})
} : $i(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : ce(t) && !J(t) && !Ni(t) ? String(t) : t;
let Ne;
class ql {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = Ne,
        !t && Ne && (this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const n = Ne;
            try {
                return Ne = this,
                t()
            } finally {
                Ne = n
            }
        }
    }
    on() {
        Ne = this
    }
    off() {
        Ne = this.parent
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0,
            r = this.effects.length; n < r; n++)
                this.effects[n].stop();
            for (n = 0,
            r = this.cleanups.length; n < r; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0,
                r = this.scopes.length; n < r; n++)
                    this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && (this.parent.scopes[this.index] = o,
                o.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function Vl(e, t=Ne) {
    t && t.active && t.effects.push(e)
}
function zl() {
    return Ne
}
function vm(e) {
    Ne && Ne.cleanups.push(e)
}
const So = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Ui = e=>(e.w & Ct) > 0
  , Ki = e=>(e.n & Ct) > 0
  , Jl = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= Ct
}
  , Ql = e=>{
    const {deps: t} = e;
    if (t.length) {
        let n = 0;
        for (let r = 0; r < t.length; r++) {
            const o = t[r];
            Ui(o) && !Ki(o) ? o.delete(e) : t[n++] = o,
            o.w &= ~Ct,
            o.n &= ~Ct
        }
        t.length = n
    }
}
  , er = new WeakMap;
let mn = 0
  , Ct = 1;
const Jr = 30;
let Ve;
const $t = Symbol("")
  , Qr = Symbol("");
class Oo {
    constructor(t, n=null, r) {
        this.fn = t,
        this.scheduler = n,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        Vl(this, r)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = Ve
          , n = wt;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = Ve,
            Ve = this,
            wt = !0,
            Ct = 1 << ++mn,
            mn <= Jr ? Jl(this) : ds(this),
            this.fn()
        } finally {
            mn <= Jr && Ql(this),
            Ct = 1 << --mn,
            Ve = this.parent,
            wt = n,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        Ve === this ? this.deferStop = !0 : this.active && (ds(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function ds(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++)
            t[n].delete(e);
        t.length = 0
    }
}
let wt = !0;
const Wi = [];
function ln() {
    Wi.push(wt),
    wt = !1
}
function cn() {
    const e = Wi.pop();
    wt = e === void 0 ? !0 : e
}
function $e(e, t, n) {
    if (wt && Ve) {
        let r = er.get(e);
        r || er.set(e, r = new Map);
        let o = r.get(n);
        o || r.set(n, o = So()),
        qi(o)
    }
}
function qi(e, t) {
    let n = !1;
    mn <= Jr ? Ki(e) || (e.n |= Ct,
    n = !Ui(e)) : n = !e.has(Ve),
    n && (e.add(Ve),
    Ve.deps.push(e))
}
function lt(e, t, n, r, o, s) {
    const i = er.get(e);
    if (!i)
        return;
    let a = [];
    if (t === "clear")
        a = [...i.values()];
    else if (n === "length" && J(e)) {
        const l = Number(r);
        i.forEach((c,u)=>{
            (u === "length" || u >= l) && a.push(c)
        }
        )
    } else
        switch (n !== void 0 && a.push(i.get(n)),
        t) {
        case "add":
            J(e) ? Po(n) && a.push(i.get("length")) : (a.push(i.get($t)),
            Qt(e) && a.push(i.get(Qr)));
            break;
        case "delete":
            J(e) || (a.push(i.get($t)),
            Qt(e) && a.push(i.get(Qr)));
            break;
        case "set":
            Qt(e) && a.push(i.get($t));
            break
        }
    if (a.length === 1)
        a[0] && Yr(a[0]);
    else {
        const l = [];
        for (const c of a)
            c && l.push(...c);
        Yr(So(l))
    }
}
function Yr(e, t) {
    const n = J(e) ? e : [...e];
    for (const r of n)
        r.computed && ps(r);
    for (const r of n)
        r.computed || ps(r)
}
function ps(e, t) {
    (e !== Ve || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function Yl(e, t) {
    var n;
    return (n = er.get(e)) == null ? void 0 : n.get(t)
}
const Xl = To("__proto__,__v_isRef,__isVue")
  , Vi = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(Ao))
  , Gl = Mo()
  , Zl = Mo(!1, !0)
  , ec = Mo(!0)
  , hs = tc();
function tc() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...n) {
            const r = oe(this);
            for (let s = 0, i = this.length; s < i; s++)
                $e(r, "get", s + "");
            const o = r[t](...n);
            return o === -1 || o === !1 ? r[t](...n.map(oe)) : o
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...n) {
            ln();
            const r = oe(this)[t].apply(this, n);
            return cn(),
            r
        }
    }
    ),
    e
}
function nc(e) {
    const t = oe(this);
    return $e(t, "has", e),
    t.hasOwnProperty(e)
}
function Mo(e=!1, t=!1) {
    return function(r, o, s) {
        if (o === "__v_isReactive")
            return !e;
        if (o === "__v_isReadonly")
            return e;
        if (o === "__v_isShallow")
            return t;
        if (o === "__v_raw" && s === (e ? t ? bc : Xi : t ? Yi : Qi).get(r))
            return r;
        const i = J(r);
        if (!e) {
            if (i && re(hs, o))
                return Reflect.get(hs, o, s);
            if (o === "hasOwnProperty")
                return nc
        }
        const a = Reflect.get(r, o, s);
        return (Ao(o) ? Vi.has(o) : Xl(o)) || (e || $e(r, "get", o),
        t) ? a : ve(a) ? i && Po(o) ? a : a.value : ce(a) ? e ? Gi(a) : ct(a) : a
    }
}
const rc = zi()
  , oc = zi(!0);
function zi(e=!1) {
    return function(n, r, o, s) {
        let i = n[r];
        if (Bt(i) && ve(i) && !ve(o))
            return !1;
        if (!e && (!tr(o) && !Bt(o) && (i = oe(i),
        o = oe(o)),
        !J(n) && ve(i) && !ve(o)))
            return i.value = o,
            !0;
        const a = J(n) && Po(r) ? Number(r) < n.length : re(n, r)
          , l = Reflect.set(n, r, o, s);
        return n === oe(s) && (a ? xn(o, i) && lt(n, "set", r, o) : lt(n, "add", r, o)),
        l
    }
}
function sc(e, t) {
    const n = re(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && lt(e, "delete", t, void 0),
    r
}
function ic(e, t) {
    const n = Reflect.has(e, t);
    return (!Ao(t) || !Vi.has(t)) && $e(e, "has", t),
    n
}
function ac(e) {
    return $e(e, "iterate", J(e) ? "length" : $t),
    Reflect.ownKeys(e)
}
const Ji = {
    get: Gl,
    set: rc,
    deleteProperty: sc,
    has: ic,
    ownKeys: ac
}
  , lc = {
    get: ec,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , cc = be({}, Ji, {
    get: Zl,
    set: oc
})
  , Io = e=>e
  , br = e=>Reflect.getPrototypeOf(e);
function Dn(e, t, n=!1, r=!1) {
    e = e.__v_raw;
    const o = oe(e)
      , s = oe(t);
    n || (t !== s && $e(o, "get", t),
    $e(o, "get", s));
    const {has: i} = br(o)
      , a = r ? Io : n ? Ho : Rn;
    if (i.call(o, t))
        return a(e.get(t));
    if (i.call(o, s))
        return a(e.get(s));
    e !== o && e.get(t)
}
function Un(e, t=!1) {
    const n = this.__v_raw
      , r = oe(n)
      , o = oe(e);
    return t || (e !== o && $e(r, "has", e),
    $e(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
}
function Kn(e, t=!1) {
    return e = e.__v_raw,
    !t && $e(oe(e), "iterate", $t),
    Reflect.get(e, "size", e)
}
function ms(e) {
    e = oe(e);
    const t = oe(this);
    return br(t).has.call(t, e) || (t.add(e),
    lt(t, "add", e, e)),
    this
}
function gs(e, t) {
    t = oe(t);
    const n = oe(this)
      , {has: r, get: o} = br(n);
    let s = r.call(n, e);
    s || (e = oe(e),
    s = r.call(n, e));
    const i = o.call(n, e);
    return n.set(e, t),
    s ? xn(t, i) && lt(n, "set", e, t) : lt(n, "add", e, t),
    this
}
function ys(e) {
    const t = oe(this)
      , {has: n, get: r} = br(t);
    let o = n.call(t, e);
    o || (e = oe(e),
    o = n.call(t, e)),
    r && r.call(t, e);
    const s = t.delete(e);
    return o && lt(t, "delete", e, void 0),
    s
}
function bs() {
    const e = oe(this)
      , t = e.size !== 0
      , n = e.clear();
    return t && lt(e, "clear", void 0, void 0),
    n
}
function Wn(e, t) {
    return function(r, o) {
        const s = this
          , i = s.__v_raw
          , a = oe(i)
          , l = t ? Io : e ? Ho : Rn;
        return !e && $e(a, "iterate", $t),
        i.forEach((c,u)=>r.call(o, l(c), l(u), s))
    }
}
function qn(e, t, n) {
    return function(...r) {
        const o = this.__v_raw
          , s = oe(o)
          , i = Qt(s)
          , a = e === "entries" || e === Symbol.iterator && i
          , l = e === "keys" && i
          , c = o[e](...r)
          , u = n ? Io : t ? Ho : Rn;
        return !t && $e(s, "iterate", l ? Qr : $t),
        {
            next() {
                const {value: f, done: d} = c.next();
                return d ? {
                    value: f,
                    done: d
                } : {
                    value: a ? [u(f[0]), u(f[1])] : u(f),
                    done: d
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function pt(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function uc() {
    const e = {
        get(s) {
            return Dn(this, s)
        },
        get size() {
            return Kn(this)
        },
        has: Un,
        add: ms,
        set: gs,
        delete: ys,
        clear: bs,
        forEach: Wn(!1, !1)
    }
      , t = {
        get(s) {
            return Dn(this, s, !1, !0)
        },
        get size() {
            return Kn(this)
        },
        has: Un,
        add: ms,
        set: gs,
        delete: ys,
        clear: bs,
        forEach: Wn(!1, !0)
    }
      , n = {
        get(s) {
            return Dn(this, s, !0)
        },
        get size() {
            return Kn(this, !0)
        },
        has(s) {
            return Un.call(this, s, !0)
        },
        add: pt("add"),
        set: pt("set"),
        delete: pt("delete"),
        clear: pt("clear"),
        forEach: Wn(!0, !1)
    }
      , r = {
        get(s) {
            return Dn(this, s, !0, !0)
        },
        get size() {
            return Kn(this, !0)
        },
        has(s) {
            return Un.call(this, s, !0)
        },
        add: pt("add"),
        set: pt("set"),
        delete: pt("delete"),
        clear: pt("clear"),
        forEach: Wn(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(s=>{
        e[s] = qn(s, !1, !1),
        n[s] = qn(s, !0, !1),
        t[s] = qn(s, !1, !0),
        r[s] = qn(s, !0, !0)
    }
    ),
    [e, n, t, r]
}
const [fc,dc,pc,hc] = uc();
function jo(e, t) {
    const n = t ? e ? hc : pc : e ? dc : fc;
    return (r,o,s)=>o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(re(n, o) && o in r ? n : r, o, s)
}
const mc = {
    get: jo(!1, !1)
}
  , gc = {
    get: jo(!1, !0)
}
  , yc = {
    get: jo(!0, !1)
}
  , Qi = new WeakMap
  , Yi = new WeakMap
  , Xi = new WeakMap
  , bc = new WeakMap;
function _c(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function vc(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : _c($l(e))
}
function ct(e) {
    return Bt(e) ? e : $o(e, !1, Ji, mc, Qi)
}
function Hn(e) {
    return $o(e, !1, cc, gc, Yi)
}
function Gi(e) {
    return $o(e, !0, lc, yc, Xi)
}
function $o(e, t, n, r, o) {
    if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const s = o.get(e);
    if (s)
        return s;
    const i = vc(e);
    if (i === 0)
        return e;
    const a = new Proxy(e,i === 2 ? r : n);
    return o.set(e, a),
    a
}
function Xt(e) {
    return Bt(e) ? Xt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Bt(e) {
    return !!(e && e.__v_isReadonly)
}
function tr(e) {
    return !!(e && e.__v_isShallow)
}
function Zi(e) {
    return Xt(e) || Bt(e)
}
function oe(e) {
    const t = e && e.__v_raw;
    return t ? oe(t) : e
}
function ea(e) {
    return Zn(e, "__v_skip", !0),
    e
}
const Rn = e=>ce(e) ? ct(e) : e
  , Ho = e=>ce(e) ? Gi(e) : e;
function Lo(e) {
    wt && Ve && (e = oe(e),
    qi(e.dep || (e.dep = So())))
}
function No(e, t) {
    e = oe(e);
    const n = e.dep;
    n && Yr(n)
}
function ve(e) {
    return !!(e && e.__v_isRef === !0)
}
function at(e) {
    return ta(e, !1)
}
function An(e) {
    return ta(e, !0)
}
function ta(e, t) {
    return ve(e) ? e : new wc(e,t)
}
class wc {
    constructor(t, n) {
        this.__v_isShallow = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = n ? t : oe(t),
        this._value = n ? t : Rn(t)
    }
    get value() {
        return Lo(this),
        this._value
    }
    set value(t) {
        const n = this.__v_isShallow || tr(t) || Bt(t);
        t = n ? t : oe(t),
        xn(t, this._rawValue) && (this._rawValue = t,
        this._value = n ? t : Rn(t),
        No(this))
    }
}
function fe(e) {
    return ve(e) ? e.value : e
}
const Ec = {
    get: (e,t,n)=>fe(Reflect.get(e, t, n)),
    set: (e,t,n,r)=>{
        const o = e[t];
        return ve(o) && !ve(n) ? (o.value = n,
        !0) : Reflect.set(e, t, n, r)
    }
};
function na(e) {
    return Xt(e) ? e : new Proxy(e,Ec)
}
class Cc {
    constructor(t) {
        this.dep = void 0,
        this.__v_isRef = !0;
        const {get: n, set: r} = t(()=>Lo(this), ()=>No(this));
        this._get = n,
        this._set = r
    }
    get value() {
        return this._get()
    }
    set value(t) {
        this._set(t)
    }
}
function wm(e) {
    return new Cc(e)
}
class kc {
    constructor(t, n, r) {
        this._object = t,
        this._key = n,
        this._defaultValue = r,
        this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return Yl(oe(this._object), this._key)
    }
}
class Tc {
    constructor(t) {
        this._getter = t,
        this.__v_isRef = !0,
        this.__v_isReadonly = !0
    }
    get value() {
        return this._getter()
    }
}
function ra(e, t, n) {
    return ve(e) ? e : Y(e) ? new Tc(e) : ce(e) && arguments.length > 1 ? xc(e, t, n) : at(e)
}
function xc(e, t, n) {
    const r = e[t];
    return ve(r) ? r : new kc(e,t,n)
}
class Rc {
    constructor(t, n, r, o) {
        this._setter = n,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this._dirty = !0,
        this.effect = new Oo(t,()=>{
            this._dirty || (this._dirty = !0,
            No(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !o,
        this.__v_isReadonly = r
    }
    get value() {
        const t = oe(this);
        return Lo(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function Ac(e, t, n=!1) {
    let r, o;
    const s = Y(e);
    return s ? (r = e,
    o = Je) : (r = e.get,
    o = e.set),
    new Rc(r,o,s || !o,n)
}
function Et(e, t, n, r) {
    let o;
    try {
        o = r ? e(...r) : e()
    } catch (s) {
        un(s, t, n)
    }
    return o
}
function We(e, t, n, r) {
    if (Y(e)) {
        const s = Et(e, t, n, r);
        return s && Hi(s) && s.catch(i=>{
            un(i, t, n)
        }
        ),
        s
    }
    const o = [];
    for (let s = 0; s < e.length; s++)
        o.push(We(e[s], t, n, r));
    return o
}
function un(e, t, n, r=!0) {
    const o = t ? t.vnode : null;
    if (t) {
        let s = t.parent;
        const i = t.proxy
          , a = n;
        for (; s; ) {
            const c = s.ec;
            if (c) {
                for (let u = 0; u < c.length; u++)
                    if (c[u](e, i, a) === !1)
                        return
            }
            s = s.parent
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            Et(l, null, 10, [e, i, a]);
            return
        }
    }
    Pc(e, n, o, r)
}
function Pc(e, t, n, r=!0) {
    console.error(e)
}
let Pn = !1
  , Xr = !1;
const Te = [];
let Ze = 0;
const Gt = [];
let ot = null
  , Ot = 0;
const oa = Promise.resolve();
let Fo = null;
function Ut(e) {
    const t = Fo || oa;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Sc(e) {
    let t = Ze + 1
      , n = Te.length;
    for (; t < n; ) {
        const r = t + n >>> 1;
        Sn(Te[r]) < e ? t = r + 1 : n = r
    }
    return t
}
function _r(e) {
    (!Te.length || !Te.includes(e, Pn && e.allowRecurse ? Ze + 1 : Ze)) && (e.id == null ? Te.push(e) : Te.splice(Sc(e.id), 0, e),
    sa())
}
function sa() {
    !Pn && !Xr && (Xr = !0,
    Fo = oa.then(aa))
}
function Oc(e) {
    const t = Te.indexOf(e);
    t > Ze && Te.splice(t, 1)
}
function ia(e) {
    J(e) ? Gt.push(...e) : (!ot || !ot.includes(e, e.allowRecurse ? Ot + 1 : Ot)) && Gt.push(e),
    sa()
}
function _s(e, t=Pn ? Ze + 1 : 0) {
    for (; t < Te.length; t++) {
        const n = Te[t];
        n && n.pre && (Te.splice(t, 1),
        t--,
        n())
    }
}
function nr(e) {
    if (Gt.length) {
        const t = [...new Set(Gt)];
        if (Gt.length = 0,
        ot) {
            ot.push(...t);
            return
        }
        for (ot = t,
        ot.sort((n,r)=>Sn(n) - Sn(r)),
        Ot = 0; Ot < ot.length; Ot++)
            ot[Ot]();
        ot = null,
        Ot = 0
    }
}
const Sn = e=>e.id == null ? 1 / 0 : e.id
  , Mc = (e,t)=>{
    const n = Sn(e) - Sn(t);
    if (n === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return n
}
;
function aa(e) {
    Xr = !1,
    Pn = !0,
    Te.sort(Mc);
    const t = Je;
    try {
        for (Ze = 0; Ze < Te.length; Ze++) {
            const n = Te[Ze];
            n && n.active !== !1 && Et(n, null, 14)
        }
    } finally {
        Ze = 0,
        Te.length = 0,
        nr(),
        Pn = !1,
        Fo = null,
        (Te.length || Gt.length) && aa()
    }
}
function Ic(e, t, ...n) {
    if (e.isUnmounted)
        return;
    const r = e.vnode.props || ue;
    let o = n;
    const s = t.startsWith("update:")
      , i = s && t.slice(7);
    if (i && i in r) {
        const u = `${i === "modelValue" ? "model" : i}Modifiers`
          , {number: f, trim: d} = r[u] || ue;
        d && (o = n.map(m=>pe(m) ? m.trim() : m)),
        f && (o = n.map(Vr))
    }
    let a, l = r[a = Pr(t)] || r[a = Pr(tt(t))];
    !l && s && (l = r[a = Pr(Dt(t))]),
    l && We(l, e, 6, o);
    const c = r[a + "Once"];
    if (c) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[a])
            return;
        e.emitted[a] = !0,
        We(c, e, 6, o)
    }
}
function la(e, t, n=!1) {
    const r = t.emitsCache
      , o = r.get(e);
    if (o !== void 0)
        return o;
    const s = e.emits;
    let i = {}
      , a = !1;
    if (!Y(e)) {
        const l = c=>{
            const u = la(c, t, !0);
            u && (a = !0,
            be(i, u))
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l)
    }
    return !s && !a ? (ce(e) && r.set(e, null),
    null) : (J(s) ? s.forEach(l=>i[l] = null) : be(i, s),
    ce(e) && r.set(e, i),
    i)
}
function vr(e, t) {
    return !e || !jn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    re(e, t[0].toLowerCase() + t.slice(1)) || re(e, Dt(t)) || re(e, t))
}
let we = null
  , wr = null;
function rr(e) {
    const t = we;
    return we = e,
    wr = e && e.type.__scopeId || null,
    t
}
function Em(e) {
    wr = e
}
function Cm() {
    wr = null
}
function Bo(e, t=we, n) {
    if (!t || e._n)
        return e;
    const r = (...o)=>{
        r._d && Is(-1);
        const s = rr(t);
        let i;
        try {
            i = e(...o)
        } finally {
            rr(s),
            r._d && Is(1)
        }
        return i
    }
    ;
    return r._n = !0,
    r._c = !0,
    r._d = !0,
    r
}
function Sr(e) {
    const {type: t, vnode: n, proxy: r, withProxy: o, props: s, propsOptions: [i], slots: a, attrs: l, emit: c, render: u, renderCache: f, data: d, setupState: m, ctx: v, inheritAttrs: T} = e;
    let I, b;
    const g = rr(e);
    try {
        if (n.shapeFlag & 4) {
            const _ = o || r;
            I = De(u.call(_, _, f, s, m, d, v)),
            b = l
        } else {
            const _ = t;
            I = De(_.length > 1 ? _(s, {
                attrs: l,
                slots: a,
                emit: c
            }) : _(s, null)),
            b = t.props ? l : $c(l)
        }
    } catch (_) {
        wn.length = 0,
        un(_, e, 1),
        I = de(Se)
    }
    let R = I;
    if (b && T !== !1) {
        const _ = Object.keys(b)
          , {shapeFlag: P} = R;
        _.length && P & 7 && (i && _.some(xo) && (b = Hc(b, i)),
        R = ut(R, b))
    }
    return n.dirs && (R = ut(R),
    R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs),
    n.transition && (R.transition = n.transition),
    I = R,
    rr(g),
    I
}
function jc(e) {
    let t;
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        if (nn(r)) {
            if (r.type !== Se || r.children === "v-if") {
                if (t)
                    return;
                t = r
            }
        } else
            return
    }
    return t
}
const $c = e=>{
    let t;
    for (const n in e)
        (n === "class" || n === "style" || jn(n)) && ((t || (t = {}))[n] = e[n]);
    return t
}
  , Hc = (e,t)=>{
    const n = {};
    for (const r in e)
        (!xo(r) || !(r.slice(9)in t)) && (n[r] = e[r]);
    return n
}
;
function Lc(e, t, n) {
    const {props: r, children: o, component: s} = e
      , {props: i, children: a, patchFlag: l} = t
      , c = s.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (n && l >= 0) {
        if (l & 1024)
            return !0;
        if (l & 16)
            return r ? vs(r, i, c) : !!i;
        if (l & 8) {
            const u = t.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                const d = u[f];
                if (i[d] !== r[d] && !vr(c, d))
                    return !0
            }
        }
    } else
        return (o || a) && (!a || !a.$stable) ? !0 : r === i ? !1 : r ? i ? vs(r, i, c) : !0 : !!i;
    return !1
}
function vs(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length)
        return !0;
    for (let o = 0; o < r.length; o++) {
        const s = r[o];
        if (t[s] !== e[s] && !vr(n, s))
            return !0
    }
    return !1
}
function Do({vnode: e, parent: t}, n) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = n,
        t = t.parent
}
const ca = e=>e.__isSuspense
  , Nc = {
    name: "Suspense",
    __isSuspense: !0,
    process(e, t, n, r, o, s, i, a, l, c) {
        e == null ? Fc(t, n, r, o, s, i, a, l, c) : Bc(e, t, n, r, o, i, a, l, c)
    },
    hydrate: Dc,
    create: Ko,
    normalize: Uc
}
  , Uo = Nc;
function On(e, t) {
    const n = e.props && e.props[t];
    Y(n) && n()
}
function Fc(e, t, n, r, o, s, i, a, l) {
    const {p: c, o: {createElement: u}} = l
      , f = u("div")
      , d = e.suspense = Ko(e, o, r, t, f, n, s, i, a, l);
    c(null, d.pendingBranch = e.ssContent, f, null, r, d, s, i),
    d.deps > 0 ? (On(e, "onPending"),
    On(e, "onFallback"),
    c(null, e.ssFallback, t, n, r, null, s, i),
    Zt(d, e.ssFallback)) : d.resolve(!1, !0)
}
function Bc(e, t, n, r, o, s, i, a, {p: l, um: c, o: {createElement: u}}) {
    const f = t.suspense = e.suspense;
    f.vnode = t,
    t.el = e.el;
    const d = t.ssContent
      , m = t.ssFallback
      , {activeBranch: v, pendingBranch: T, isInFallback: I, isHydrating: b} = f;
    if (T)
        f.pendingBranch = d,
        ze(d, T) ? (l(T, d, f.hiddenContainer, null, o, f, s, i, a),
        f.deps <= 0 ? f.resolve() : I && (l(v, m, n, r, o, null, s, i, a),
        Zt(f, m))) : (f.pendingId++,
        b ? (f.isHydrating = !1,
        f.activeBranch = T) : c(T, o, f),
        f.deps = 0,
        f.effects.length = 0,
        f.hiddenContainer = u("div"),
        I ? (l(null, d, f.hiddenContainer, null, o, f, s, i, a),
        f.deps <= 0 ? f.resolve() : (l(v, m, n, r, o, null, s, i, a),
        Zt(f, m))) : v && ze(d, v) ? (l(v, d, n, r, o, f, s, i, a),
        f.resolve(!0)) : (l(null, d, f.hiddenContainer, null, o, f, s, i, a),
        f.deps <= 0 && f.resolve()));
    else if (v && ze(d, v))
        l(v, d, n, r, o, f, s, i, a),
        Zt(f, d);
    else if (On(t, "onPending"),
    f.pendingBranch = d,
    f.pendingId++,
    l(null, d, f.hiddenContainer, null, o, f, s, i, a),
    f.deps <= 0)
        f.resolve();
    else {
        const {timeout: g, pendingId: R} = f;
        g > 0 ? setTimeout(()=>{
            f.pendingId === R && f.fallback(m)
        }
        , g) : g === 0 && f.fallback(m)
    }
}
function Ko(e, t, n, r, o, s, i, a, l, c, u=!1) {
    const {p: f, m: d, um: m, n: v, o: {parentNode: T, remove: I}} = c;
    let b;
    const g = Kc(e);
    g && t != null && t.pendingBranch && (b = t.pendingId,
    t.deps++);
    const R = e.props ? Fi(e.props.timeout) : void 0
      , _ = {
        vnode: e,
        parent: t,
        parentComponent: n,
        isSVG: i,
        container: r,
        hiddenContainer: o,
        anchor: s,
        deps: 0,
        pendingId: 0,
        timeout: typeof R == "number" ? R : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: !0,
        isHydrating: u,
        isUnmounted: !1,
        effects: [],
        resolve(P=!1, $=!1) {
            const {vnode: F, activeBranch: k, pendingBranch: U, pendingId: K, effects: O, parentComponent: E, container: N} = _;
            if (_.isHydrating)
                _.isHydrating = !1;
            else if (!P) {
                const Q = k && U.transition && U.transition.mode === "out-in";
                Q && (k.transition.afterLeave = ()=>{
                    K === _.pendingId && d(U, N, G, 0)
                }
                );
                let {anchor: G} = _;
                k && (G = v(k),
                m(k, E, _, !0)),
                Q || d(U, N, G, 0)
            }
            Zt(_, U),
            _.pendingBranch = null,
            _.isInFallback = !1;
            let A = _.parent
              , te = !1;
            for (; A; ) {
                if (A.pendingBranch) {
                    A.effects.push(...O),
                    te = !0;
                    break
                }
                A = A.parent
            }
            te || ia(O),
            _.effects = [],
            g && t && t.pendingBranch && b === t.pendingId && (t.deps--,
            t.deps === 0 && !$ && t.resolve()),
            On(F, "onResolve")
        },
        fallback(P) {
            if (!_.pendingBranch)
                return;
            const {vnode: $, activeBranch: F, parentComponent: k, container: U, isSVG: K} = _;
            On($, "onFallback");
            const O = v(F)
              , E = ()=>{
                _.isInFallback && (f(null, P, U, O, k, null, K, a, l),
                Zt(_, P))
            }
              , N = P.transition && P.transition.mode === "out-in";
            N && (F.transition.afterLeave = E),
            _.isInFallback = !0,
            m(F, k, null, !0),
            N || E()
        },
        move(P, $, F) {
            _.activeBranch && d(_.activeBranch, P, $, F),
            _.container = P
        },
        next() {
            return _.activeBranch && v(_.activeBranch)
        },
        registerDep(P, $) {
            const F = !!_.pendingBranch;
            F && _.deps++;
            const k = P.vnode.el;
            P.asyncDep.catch(U=>{
                un(U, P, 0)
            }
            ).then(U=>{
                if (P.isUnmounted || _.isUnmounted || _.pendingId !== P.suspenseId)
                    return;
                P.asyncResolved = !0;
                const {vnode: K} = P;
                ro(P, U, !1),
                k && (K.el = k);
                const O = !k && P.subTree.el;
                $(P, K, T(k || P.subTree.el), k ? null : v(P.subTree), _, i, l),
                O && I(O),
                Do(P, K.el),
                F && --_.deps === 0 && _.resolve()
            }
            )
        },
        unmount(P, $) {
            _.isUnmounted = !0,
            _.activeBranch && m(_.activeBranch, n, P, $),
            _.pendingBranch && m(_.pendingBranch, n, P, $)
        }
    };
    return _
}
function Dc(e, t, n, r, o, s, i, a, l) {
    const c = t.suspense = Ko(t, r, n, e.parentNode, document.createElement("div"), null, o, s, i, a, !0)
      , u = l(e, c.pendingBranch = t.ssContent, n, c, s, i);
    return c.deps === 0 && c.resolve(!1, !0),
    u
}
function Uc(e) {
    const {shapeFlag: t, children: n} = e
      , r = t & 32;
    e.ssContent = ws(r ? n.default : n),
    e.ssFallback = r ? ws(n.fallback) : de(Se)
}
function ws(e) {
    let t;
    if (Y(e)) {
        const n = tn && e._c;
        n && (e._d = !1,
        et()),
        e = e(),
        n && (e._d = !0,
        t = Ke,
        Ma())
    }
    return J(e) && (e = jc(e)),
    e = De(e),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter(n=>n !== e)),
    e
}
function ua(e, t) {
    t && t.pendingBranch ? J(e) ? t.effects.push(...e) : t.effects.push(e) : ia(e)
}
function Zt(e, t) {
    e.activeBranch = t;
    const {vnode: n, parentComponent: r} = e
      , o = n.el = t.el;
    r && r.subTree === n && (r.vnode.el = o,
    Do(r, o))
}
function Kc(e) {
    var t;
    return ((t = e.props) == null ? void 0 : t.suspensible) != null && e.props.suspensible !== !1
}
function km(e, t) {
    return Wo(e, null, t)
}
const Vn = {};
function Ht(e, t, n) {
    return Wo(e, t, n)
}
function Wo(e, t, {immediate: n, deep: r, flush: o, onTrack: s, onTrigger: i}=ue) {
    var a;
    const l = zl() === ((a = ye) == null ? void 0 : a.scope) ? ye : null;
    let c, u = !1, f = !1;
    if (ve(e) ? (c = ()=>e.value,
    u = tr(e)) : Xt(e) ? (c = ()=>e,
    r = !0) : J(e) ? (f = !0,
    u = e.some(_=>Xt(_) || tr(_)),
    c = ()=>e.map(_=>{
        if (ve(_))
            return _.value;
        if (Xt(_))
            return It(_);
        if (Y(_))
            return Et(_, l, 2)
    }
    )) : Y(e) ? t ? c = ()=>Et(e, l, 2) : c = ()=>{
        if (!(l && l.isUnmounted))
            return d && d(),
            We(e, l, 3, [m])
    }
    : c = Je,
    t && r) {
        const _ = c;
        c = ()=>It(_())
    }
    let d, m = _=>{
        d = g.onStop = ()=>{
            Et(_, l, 4)
        }
    }
    , v;
    if (on)
        if (m = Je,
        t ? n && We(t, l, 3, [c(), f ? [] : void 0, m]) : c(),
        o === "sync") {
            const _ = Iu();
            v = _.__watcherHandles || (_.__watcherHandles = [])
        } else
            return Je;
    let T = f ? new Array(e.length).fill(Vn) : Vn;
    const I = ()=>{
        if (g.active)
            if (t) {
                const _ = g.run();
                (r || u || (f ? _.some((P,$)=>xn(P, T[$])) : xn(_, T))) && (d && d(),
                We(t, l, 3, [_, T === Vn ? void 0 : f && T[0] === Vn ? [] : T, m]),
                T = _)
            } else
                g.run()
    }
    ;
    I.allowRecurse = !!t;
    let b;
    o === "sync" ? b = I : o === "post" ? b = ()=>ke(I, l && l.suspense) : (I.pre = !0,
    l && (I.id = l.uid),
    b = ()=>_r(I));
    const g = new Oo(c,b);
    t ? n ? I() : T = g.run() : o === "post" ? ke(g.run.bind(g), l && l.suspense) : g.run();
    const R = ()=>{
        g.stop(),
        l && l.scope && Ro(l.scope.effects, g)
    }
    ;
    return v && v.push(R),
    R
}
function Wc(e, t, n) {
    const r = this.proxy
      , o = pe(e) ? e.includes(".") ? fa(r, e) : ()=>r[e] : e.bind(r, r);
    let s;
    Y(t) ? s = t : (s = t.handler,
    n = t);
    const i = ye;
    rn(this);
    const a = Wo(o, s.bind(r), n);
    return i ? rn(i) : Ft(),
    a
}
function fa(e, t) {
    const n = t.split(".");
    return ()=>{
        let r = e;
        for (let o = 0; o < n.length && r; o++)
            r = r[n[o]];
        return r
    }
}
function It(e, t) {
    if (!ce(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    ve(e))
        It(e.value, t);
    else if (J(e))
        for (let n = 0; n < e.length; n++)
            It(e[n], t);
    else if ($i(e) || Qt(e))
        e.forEach(n=>{
            It(n, t)
        }
        );
    else if (Ni(e))
        for (const n in e)
            It(e[n], t);
    return e
}
function Tm(e, t) {
    const n = we;
    if (n === null)
        return e;
    const r = kr(n) || n.proxy
      , o = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
        let[i,a,l,c=ue] = t[s];
        i && (Y(i) && (i = {
            mounted: i,
            updated: i
        }),
        i.deep && It(a),
        o.push({
            dir: i,
            instance: r,
            value: a,
            oldValue: void 0,
            arg: l,
            modifiers: c
        }))
    }
    return e
}
function Ge(e, t, n, r) {
    const o = e.dirs
      , s = t && t.dirs;
    for (let i = 0; i < o.length; i++) {
        const a = o[i];
        s && (a.oldValue = s[i].value);
        let l = a.dir[r];
        l && (ln(),
        We(l, n, 8, [e.el, a, e, t]),
        cn())
    }
}
function qc() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return qo(()=>{
        e.isMounted = !0
    }
    ),
    Vo(()=>{
        e.isUnmounting = !0
    }
    ),
    e
}
const Be = [Function, Array]
  , da = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Be,
    onEnter: Be,
    onAfterEnter: Be,
    onEnterCancelled: Be,
    onBeforeLeave: Be,
    onLeave: Be,
    onAfterLeave: Be,
    onLeaveCancelled: Be,
    onBeforeAppear: Be,
    onAppear: Be,
    onAfterAppear: Be,
    onAppearCancelled: Be
}
  , Vc = {
    name: "BaseTransition",
    props: da,
    setup(e, {slots: t}) {
        const n = Xo()
          , r = qc();
        let o;
        return ()=>{
            const s = t.default && ha(t.default(), !0);
            if (!s || !s.length)
                return;
            let i = s[0];
            if (s.length > 1) {
                for (const T of s)
                    if (T.type !== Se) {
                        i = T;
                        break
                    }
            }
            const a = oe(e)
              , {mode: l} = a;
            if (r.isLeaving)
                return Or(i);
            const c = Es(i);
            if (!c)
                return Or(i);
            const u = Gr(c, a, r, n);
            or(c, u);
            const f = n.subTree
              , d = f && Es(f);
            let m = !1;
            const {getTransitionKey: v} = c.type;
            if (v) {
                const T = v();
                o === void 0 ? o = T : T !== o && (o = T,
                m = !0)
            }
            if (d && d.type !== Se && (!ze(c, d) || m)) {
                const T = Gr(d, a, r, n);
                if (or(d, T),
                l === "out-in")
                    return r.isLeaving = !0,
                    T.afterLeave = ()=>{
                        r.isLeaving = !1,
                        n.update.active !== !1 && n.update()
                    }
                    ,
                    Or(i);
                l === "in-out" && c.type !== Se && (T.delayLeave = (I,b,g)=>{
                    const R = pa(r, d);
                    R[String(d.key)] = d,
                    I._leaveCb = ()=>{
                        b(),
                        I._leaveCb = void 0,
                        delete u.delayedLeave
                    }
                    ,
                    u.delayedLeave = g
                }
                )
            }
            return i
        }
    }
}
  , zc = Vc;
function pa(e, t) {
    const {leavingVNodes: n} = e;
    let r = n.get(t.type);
    return r || (r = Object.create(null),
    n.set(t.type, r)),
    r
}
function Gr(e, t, n, r) {
    const {appear: o, mode: s, persisted: i=!1, onBeforeEnter: a, onEnter: l, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: f, onLeave: d, onAfterLeave: m, onLeaveCancelled: v, onBeforeAppear: T, onAppear: I, onAfterAppear: b, onAppearCancelled: g} = t
      , R = String(e.key)
      , _ = pa(n, e)
      , P = (k,U)=>{
        k && We(k, r, 9, U)
    }
      , $ = (k,U)=>{
        const K = U[1];
        P(k, U),
        J(k) ? k.every(O=>O.length <= 1) && K() : k.length <= 1 && K()
    }
      , F = {
        mode: s,
        persisted: i,
        beforeEnter(k) {
            let U = a;
            if (!n.isMounted)
                if (o)
                    U = T || a;
                else
                    return;
            k._leaveCb && k._leaveCb(!0);
            const K = _[R];
            K && ze(e, K) && K.el._leaveCb && K.el._leaveCb(),
            P(U, [k])
        },
        enter(k) {
            let U = l
              , K = c
              , O = u;
            if (!n.isMounted)
                if (o)
                    U = I || l,
                    K = b || c,
                    O = g || u;
                else
                    return;
            let E = !1;
            const N = k._enterCb = A=>{
                E || (E = !0,
                A ? P(O, [k]) : P(K, [k]),
                F.delayedLeave && F.delayedLeave(),
                k._enterCb = void 0)
            }
            ;
            U ? $(U, [k, N]) : N()
        },
        leave(k, U) {
            const K = String(e.key);
            if (k._enterCb && k._enterCb(!0),
            n.isUnmounting)
                return U();
            P(f, [k]);
            let O = !1;
            const E = k._leaveCb = N=>{
                O || (O = !0,
                U(),
                N ? P(v, [k]) : P(m, [k]),
                k._leaveCb = void 0,
                _[K] === e && delete _[K])
            }
            ;
            _[K] = e,
            d ? $(d, [k, E]) : E()
        },
        clone(k) {
            return Gr(k, t, n, r)
        }
    };
    return F
}
function Or(e) {
    if (Ln(e))
        return e = ut(e),
        e.children = null,
        e
}
function Es(e) {
    return Ln(e) ? e.children ? e.children[0] : void 0 : e
}
function or(e, t) {
    e.shapeFlag & 6 && e.component ? or(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent),
    e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}
function ha(e, t=!1, n) {
    let r = []
      , o = 0;
    for (let s = 0; s < e.length; s++) {
        let i = e[s];
        const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
        i.type === je ? (i.patchFlag & 128 && o++,
        r = r.concat(ha(i.children, t, a))) : (t || i.type !== Se) && r.push(a != null ? ut(i, {
            key: a
        }) : i)
    }
    if (o > 1)
        for (let s = 0; s < r.length; s++)
            r[s].patchFlag = -2;
    return r
}
function kt(e, t) {
    return Y(e) ? (()=>be({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}
const Lt = e=>!!e.type.__asyncLoader;
function Cs(e) {
    Y(e) && (e = {
        loader: e
    });
    const {loader: t, loadingComponent: n, errorComponent: r, delay: o=200, timeout: s, suspensible: i=!0, onError: a} = e;
    let l = null, c, u = 0;
    const f = ()=>(u++,
    l = null,
    d())
      , d = ()=>{
        let m;
        return l || (m = l = t().catch(v=>{
            if (v = v instanceof Error ? v : new Error(String(v)),
            a)
                return new Promise((T,I)=>{
                    a(v, ()=>T(f()), ()=>I(v), u + 1)
                }
                );
            throw v
        }
        ).then(v=>m !== l && l ? l : (v && (v.__esModule || v[Symbol.toStringTag] === "Module") && (v = v.default),
        c = v,
        v)))
    }
    ;
    return kt({
        name: "AsyncComponentWrapper",
        __asyncLoader: d,
        get __asyncResolved() {
            return c
        },
        setup() {
            const m = ye;
            if (c)
                return ()=>Mr(c, m);
            const v = g=>{
                l = null,
                un(g, m, 13, !r)
            }
            ;
            if (i && m.suspense || on)
                return d().then(g=>()=>Mr(g, m)).catch(g=>(v(g),
                ()=>r ? de(r, {
                    error: g
                }) : null));
            const T = at(!1)
              , I = at()
              , b = at(!!o);
            return o && setTimeout(()=>{
                b.value = !1
            }
            , o),
            s != null && setTimeout(()=>{
                if (!T.value && !I.value) {
                    const g = new Error(`Async component timed out after ${s}ms.`);
                    v(g),
                    I.value = g
                }
            }
            , s),
            d().then(()=>{
                T.value = !0,
                m.parent && Ln(m.parent.vnode) && _r(m.parent.update)
            }
            ).catch(g=>{
                v(g),
                I.value = g
            }
            ),
            ()=>{
                if (T.value && c)
                    return Mr(c, m);
                if (I.value && r)
                    return de(r, {
                        error: I.value
                    });
                if (n && !b.value)
                    return de(n)
            }
        }
    })
}
function Mr(e, t) {
    const {ref: n, props: r, children: o, ce: s} = t.vnode
      , i = de(e, r, o);
    return i.ref = n,
    i.ce = s,
    delete t.vnode.ce,
    i
}
const Ln = e=>e.type.__isKeepAlive
  , Jc = {
    name: "KeepAlive",
    __isKeepAlive: !0,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(e, {slots: t}) {
        const n = Xo()
          , r = n.ctx;
        if (!r.renderer)
            return ()=>{
                const g = t.default && t.default();
                return g && g.length === 1 ? g[0] : g
            }
            ;
        const o = new Map
          , s = new Set;
        let i = null;
        const a = n.suspense
          , {renderer: {p: l, m: c, um: u, o: {createElement: f}}} = r
          , d = f("div");
        r.activate = (g,R,_,P,$)=>{
            const F = g.component;
            c(g, R, _, 0, a),
            l(F.vnode, g, R, _, F, a, P, g.slotScopeIds, $),
            ke(()=>{
                F.isDeactivated = !1,
                F.a && Yt(F.a);
                const k = g.props && g.props.onVnodeMounted;
                k && Ie(k, F.parent, g)
            }
            , a)
        }
        ,
        r.deactivate = g=>{
            const R = g.component;
            c(g, d, null, 1, a),
            ke(()=>{
                R.da && Yt(R.da);
                const _ = g.props && g.props.onVnodeUnmounted;
                _ && Ie(_, R.parent, g),
                R.isDeactivated = !0
            }
            , a)
        }
        ;
        function m(g) {
            Ir(g),
            u(g, n, a, !0)
        }
        function v(g) {
            o.forEach((R,_)=>{
                const P = oo(R.type);
                P && (!g || !g(P)) && T(_)
            }
            )
        }
        function T(g) {
            const R = o.get(g);
            !i || !ze(R, i) ? m(R) : i && Ir(i),
            o.delete(g),
            s.delete(g)
        }
        Ht(()=>[e.include, e.exclude], ([g,R])=>{
            g && v(_=>gn(g, _)),
            R && v(_=>!gn(R, _))
        }
        , {
            flush: "post",
            deep: !0
        });
        let I = null;
        const b = ()=>{
            I != null && o.set(I, jr(n.subTree))
        }
        ;
        return qo(b),
        ga(b),
        Vo(()=>{
            o.forEach(g=>{
                const {subTree: R, suspense: _} = n
                  , P = jr(R);
                if (g.type === P.type && g.key === P.key) {
                    Ir(P);
                    const $ = P.component.da;
                    $ && ke($, _);
                    return
                }
                m(g)
            }
            )
        }
        ),
        ()=>{
            if (I = null,
            !t.default)
                return null;
            const g = t.default()
              , R = g[0];
            if (g.length > 1)
                return i = null,
                g;
            if (!nn(R) || !(R.shapeFlag & 4) && !(R.shapeFlag & 128))
                return i = null,
                R;
            let _ = jr(R);
            const P = _.type
              , $ = oo(Lt(_) ? _.type.__asyncResolved || {} : P)
              , {include: F, exclude: k, max: U} = e;
            if (F && (!$ || !gn(F, $)) || k && $ && gn(k, $))
                return i = _,
                R;
            const K = _.key == null ? P : _.key
              , O = o.get(K);
            return _.el && (_ = ut(_),
            R.shapeFlag & 128 && (R.ssContent = _)),
            I = K,
            O ? (_.el = O.el,
            _.component = O.component,
            _.transition && or(_, _.transition),
            _.shapeFlag |= 512,
            s.delete(K),
            s.add(K)) : (s.add(K),
            U && s.size > parseInt(U, 10) && T(s.values().next().value)),
            _.shapeFlag |= 256,
            i = _,
            ca(R.type) ? R : _
        }
    }
}
  , Qc = Jc;
function gn(e, t) {
    return J(e) ? e.some(n=>gn(n, t)) : pe(e) ? e.split(",").includes(t) : jl(e) ? e.test(t) : !1
}
function Yc(e, t) {
    ma(e, "a", t)
}
function Xc(e, t) {
    ma(e, "da", t)
}
function ma(e, t, n=ye) {
    const r = e.__wdc || (e.__wdc = ()=>{
        let o = n;
        for (; o; ) {
            if (o.isDeactivated)
                return;
            o = o.parent
        }
        return e()
    }
    );
    if (Er(t, r, n),
    n) {
        let o = n.parent;
        for (; o && o.parent; )
            Ln(o.parent.vnode) && Gc(r, t, n, o),
            o = o.parent
    }
}
function Gc(e, t, n, r) {
    const o = Er(t, e, r, !0);
    ya(()=>{
        Ro(r[t], o)
    }
    , n)
}
function Ir(e) {
    e.shapeFlag &= -257,
    e.shapeFlag &= -513
}
function jr(e) {
    return e.shapeFlag & 128 ? e.ssContent : e
}
function Er(e, t, n=ye, r=!1) {
    if (n) {
        const o = n[e] || (n[e] = [])
          , s = t.__weh || (t.__weh = (...i)=>{
            if (n.isUnmounted)
                return;
            ln(),
            rn(n);
            const a = We(t, n, e, i);
            return Ft(),
            cn(),
            a
        }
        );
        return r ? o.unshift(s) : o.push(s),
        s
    }
}
const ft = e=>(t,n=ye)=>(!on || e === "sp") && Er(e, (...r)=>t(...r), n)
  , Zc = ft("bm")
  , qo = ft("m")
  , eu = ft("bu")
  , ga = ft("u")
  , Vo = ft("bum")
  , ya = ft("um")
  , tu = ft("sp")
  , nu = ft("rtg")
  , ru = ft("rtc");
function ba(e, t=ye) {
    Er("ec", e, t)
}
const zo = "components";
function xm(e, t) {
    return va(zo, e, !0, t) || e
}
const _a = Symbol.for("v-ndc");
function ou(e) {
    return pe(e) ? va(zo, e, !1) || e : e || _a
}
function va(e, t, n=!0, r=!1) {
    const o = we || ye;
    if (o) {
        const s = o.type;
        if (e === zo) {
            const a = oo(s, !1);
            if (a && (a === t || a === tt(t) || a === mr(tt(t))))
                return s
        }
        const i = ks(o[e] || s[e], t) || ks(o.appContext[e], t);
        return !i && r ? s : i
    }
}
function ks(e, t) {
    return e && (e[t] || e[tt(t)] || e[mr(tt(t))])
}
function Rm(e, t, n, r) {
    let o;
    const s = n && n[r];
    if (J(e) || pe(e)) {
        o = new Array(e.length);
        for (let i = 0, a = e.length; i < a; i++)
            o[i] = t(e[i], i, void 0, s && s[i])
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let i = 0; i < e; i++)
            o[i] = t(i + 1, i, void 0, s && s[i])
    } else if (ce(e))
        if (e[Symbol.iterator])
            o = Array.from(e, (i,a)=>t(i, a, void 0, s && s[a]));
        else {
            const i = Object.keys(e);
            o = new Array(i.length);
            for (let a = 0, l = i.length; a < l; a++) {
                const c = i[a];
                o[a] = t(e[c], c, a, s && s[a])
            }
        }
    else
        o = [];
    return n && (n[r] = o),
    o
}
function Am(e, t, n={}, r, o) {
    if (we.isCE || we.parent && Lt(we.parent) && we.parent.isCE)
        return t !== "default" && (n.name = t),
        de("slot", n, r && r());
    let s = e[t];
    s && s._c && (s._d = !1),
    et();
    const i = s && wa(s(n))
      , a = st(je, {
        key: n.key || i && i.key || `_ ${t}`
    }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
    return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    s && s._c && (s._d = !0),
    a
}
function wa(e) {
    return e.some(t=>nn(t) ? !(t.type === Se || t.type === je && !wa(t.children)) : !0) ? e : null
}
const Zr = e=>e ? Fa(e) ? kr(e) || e.proxy : Zr(e.parent) : null
  , _n = be(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>Zr(e.parent),
    $root: e=>Zr(e.root),
    $emit: e=>e.emit,
    $options: e=>Jo(e),
    $forceUpdate: e=>e.f || (e.f = ()=>_r(e.update)),
    $nextTick: e=>e.n || (e.n = Ut.bind(e.proxy)),
    $watch: e=>Wc.bind(e)
})
  , $r = (e,t)=>e !== ue && !e.__isScriptSetup && re(e, t)
  , su = {
    get({_: e}, t) {
        const {ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: l} = e;
        let c;
        if (t[0] !== "$") {
            const m = i[t];
            if (m !== void 0)
                switch (m) {
                case 1:
                    return r[t];
                case 2:
                    return o[t];
                case 4:
                    return n[t];
                case 3:
                    return s[t]
                }
            else {
                if ($r(r, t))
                    return i[t] = 1,
                    r[t];
                if (o !== ue && re(o, t))
                    return i[t] = 2,
                    o[t];
                if ((c = e.propsOptions[0]) && re(c, t))
                    return i[t] = 3,
                    s[t];
                if (n !== ue && re(n, t))
                    return i[t] = 4,
                    n[t];
                eo && (i[t] = 0)
            }
        }
        const u = _n[t];
        let f, d;
        if (u)
            return t === "$attrs" && $e(e, "get", t),
            u(e);
        if ((f = a.__cssModules) && (f = f[t]))
            return f;
        if (n !== ue && re(n, t))
            return i[t] = 4,
            n[t];
        if (d = l.config.globalProperties,
        re(d, t))
            return d[t]
    },
    set({_: e}, t, n) {
        const {data: r, setupState: o, ctx: s} = e;
        return $r(o, t) ? (o[t] = n,
        !0) : r !== ue && re(r, t) ? (r[t] = n,
        !0) : re(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (s[t] = n,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s}}, i) {
        let a;
        return !!n[i] || e !== ue && re(e, i) || $r(t, i) || (a = s[0]) && re(a, i) || re(r, i) || re(_n, i) || re(o.config.globalProperties, i)
    },
    defineProperty(e, t, n) {
        return n.get != null ? e._.accessCache[t] = 0 : re(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
    }
};
function Ts(e) {
    return J(e) ? e.reduce((t,n)=>(t[n] = null,
    t), {}) : e
}
let eo = !0;
function iu(e) {
    const t = Jo(e)
      , n = e.proxy
      , r = e.ctx;
    eo = !1,
    t.beforeCreate && xs(t.beforeCreate, e, "bc");
    const {data: o, computed: s, methods: i, watch: a, provide: l, inject: c, created: u, beforeMount: f, mounted: d, beforeUpdate: m, updated: v, activated: T, deactivated: I, beforeDestroy: b, beforeUnmount: g, destroyed: R, unmounted: _, render: P, renderTracked: $, renderTriggered: F, errorCaptured: k, serverPrefetch: U, expose: K, inheritAttrs: O, components: E, directives: N, filters: A} = t;
    if (c && au(c, r, null),
    i)
        for (const G in i) {
            const ee = i[G];
            Y(ee) && (r[G] = ee.bind(n))
        }
    if (o) {
        const G = o.call(n, n);
        ce(G) && (e.data = ct(G))
    }
    if (eo = !0,
    s)
        for (const G in s) {
            const ee = s[G]
              , Ee = Y(ee) ? ee.bind(n, n) : Y(ee.get) ? ee.get.bind(n, n) : Je
              , He = !Y(ee) && Y(ee.set) ? ee.set.bind(n) : Je
              , Oe = Ue({
                get: Ee,
                set: He
            });
            Object.defineProperty(r, G, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Oe.value,
                set: me=>Oe.value = me
            })
        }
    if (a)
        for (const G in a)
            Ea(a[G], r, n, G);
    if (l) {
        const G = Y(l) ? l.call(n) : l;
        Reflect.ownKeys(G).forEach(ee=>{
            Nt(ee, G[ee])
        }
        )
    }
    u && xs(u, e, "c");
    function Q(G, ee) {
        J(ee) ? ee.forEach(Ee=>G(Ee.bind(n))) : ee && G(ee.bind(n))
    }
    if (Q(Zc, f),
    Q(qo, d),
    Q(eu, m),
    Q(ga, v),
    Q(Yc, T),
    Q(Xc, I),
    Q(ba, k),
    Q(ru, $),
    Q(nu, F),
    Q(Vo, g),
    Q(ya, _),
    Q(tu, U),
    J(K))
        if (K.length) {
            const G = e.exposed || (e.exposed = {});
            K.forEach(ee=>{
                Object.defineProperty(G, ee, {
                    get: ()=>n[ee],
                    set: Ee=>n[ee] = Ee
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    P && e.render === Je && (e.render = P),
    O != null && (e.inheritAttrs = O),
    E && (e.components = E),
    N && (e.directives = N)
}
function au(e, t, n=Je) {
    J(e) && (e = to(e));
    for (const r in e) {
        const o = e[r];
        let s;
        ce(o) ? "default"in o ? s = Pe(o.from || r, o.default, !0) : s = Pe(o.from || r) : s = Pe(o),
        ve(s) ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: ()=>s.value,
            set: i=>s.value = i
        }) : t[r] = s
    }
}
function xs(e, t, n) {
    We(J(e) ? e.map(r=>r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Ea(e, t, n, r) {
    const o = r.includes(".") ? fa(n, r) : ()=>n[r];
    if (pe(e)) {
        const s = t[e];
        Y(s) && Ht(o, s)
    } else if (Y(e))
        Ht(o, e.bind(n));
    else if (ce(e))
        if (J(e))
            e.forEach(s=>Ea(s, t, n, r));
        else {
            const s = Y(e.handler) ? e.handler.bind(n) : t[e.handler];
            Y(s) && Ht(o, s, e)
        }
}
function Jo(e) {
    const t = e.type
      , {mixins: n, extends: r} = t
      , {mixins: o, optionsCache: s, config: {optionMergeStrategies: i}} = e.appContext
      , a = s.get(t);
    let l;
    return a ? l = a : !o.length && !n && !r ? l = t : (l = {},
    o.length && o.forEach(c=>sr(l, c, i, !0)),
    sr(l, t, i)),
    ce(t) && s.set(t, l),
    l
}
function sr(e, t, n, r=!1) {
    const {mixins: o, extends: s} = t;
    s && sr(e, s, n, !0),
    o && o.forEach(i=>sr(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const a = lu[i] || n && n[i];
            e[i] = a ? a(e[i], t[i]) : t[i]
        }
    return e
}
const lu = {
    data: Rs,
    props: As,
    emits: As,
    methods: yn,
    computed: yn,
    beforeCreate: Ae,
    created: Ae,
    beforeMount: Ae,
    mounted: Ae,
    beforeUpdate: Ae,
    updated: Ae,
    beforeDestroy: Ae,
    beforeUnmount: Ae,
    destroyed: Ae,
    unmounted: Ae,
    activated: Ae,
    deactivated: Ae,
    errorCaptured: Ae,
    serverPrefetch: Ae,
    components: yn,
    directives: yn,
    watch: uu,
    provide: Rs,
    inject: cu
};
function Rs(e, t) {
    return t ? e ? function() {
        return be(Y(e) ? e.call(this, this) : e, Y(t) ? t.call(this, this) : t)
    }
    : t : e
}
function cu(e, t) {
    return yn(to(e), to(t))
}
function to(e) {
    if (J(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++)
            t[e[n]] = e[n];
        return t
    }
    return e
}
function Ae(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function yn(e, t) {
    return e ? be(Object.create(null), e, t) : t
}
function As(e, t) {
    return e ? J(e) && J(t) ? [...new Set([...e, ...t])] : be(Object.create(null), Ts(e), Ts(t ?? {})) : t
}
function uu(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const n = be(Object.create(null), e);
    for (const r in t)
        n[r] = Ae(e[r], t[r]);
    return n
}
function Ca() {
    return {
        app: null,
        config: {
            isNativeTag: Ol,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let fu = 0;
function du(e, t) {
    return function(r, o=null) {
        Y(r) || (r = be({}, r)),
        o != null && !ce(o) && (o = null);
        const s = Ca()
          , i = new Set;
        let a = !1;
        const l = s.app = {
            _uid: fu++,
            _component: r,
            _props: o,
            _container: null,
            _context: s,
            _instance: null,
            version: Da,
            get config() {
                return s.config
            },
            set config(c) {},
            use(c, ...u) {
                return i.has(c) || (c && Y(c.install) ? (i.add(c),
                c.install(l, ...u)) : Y(c) && (i.add(c),
                c(l, ...u))),
                l
            },
            mixin(c) {
                return s.mixins.includes(c) || s.mixins.push(c),
                l
            },
            component(c, u) {
                return u ? (s.components[c] = u,
                l) : s.components[c]
            },
            directive(c, u) {
                return u ? (s.directives[c] = u,
                l) : s.directives[c]
            },
            mount(c, u, f) {
                if (!a) {
                    const d = de(r, o);
                    return d.appContext = s,
                    u && t ? t(d, c) : e(d, c, f),
                    a = !0,
                    l._container = c,
                    c.__vue_app__ = l,
                    kr(d.component) || d.component.proxy
                }
            },
            unmount() {
                a && (e(null, l._container),
                delete l._container.__vue_app__)
            },
            provide(c, u) {
                return s.provides[c] = u,
                l
            },
            runWithContext(c) {
                Mn = l;
                try {
                    return c()
                } finally {
                    Mn = null
                }
            }
        };
        return l
    }
}
let Mn = null;
function Nt(e, t) {
    if (ye) {
        let n = ye.provides;
        const r = ye.parent && ye.parent.provides;
        r === n && (n = ye.provides = Object.create(r)),
        n[e] = t
    }
}
function Pe(e, t, n=!1) {
    const r = ye || we;
    if (r || Mn) {
        const o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : Mn._context.provides;
        if (o && e in o)
            return o[e];
        if (arguments.length > 1)
            return n && Y(t) ? t.call(r && r.proxy) : t
    }
}
function ka() {
    return !!(ye || we || Mn)
}
function pu(e, t, n, r=!1) {
    const o = {}
      , s = {};
    Zn(s, Cr, 1),
    e.propsDefaults = Object.create(null),
    Ta(e, t, o, s);
    for (const i in e.propsOptions[0])
        i in o || (o[i] = void 0);
    n ? e.props = r ? o : Hn(o) : e.type.props ? e.props = o : e.props = s,
    e.attrs = s
}
function hu(e, t, n, r) {
    const {props: o, attrs: s, vnode: {patchFlag: i}} = e
      , a = oe(o)
      , [l] = e.propsOptions;
    let c = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const u = e.vnode.dynamicProps;
            for (let f = 0; f < u.length; f++) {
                let d = u[f];
                if (vr(e.emitsOptions, d))
                    continue;
                const m = t[d];
                if (l)
                    if (re(s, d))
                        m !== s[d] && (s[d] = m,
                        c = !0);
                    else {
                        const v = tt(d);
                        o[v] = no(l, a, v, m, e, !1)
                    }
                else
                    m !== s[d] && (s[d] = m,
                    c = !0)
            }
        }
    } else {
        Ta(e, t, o, s) && (c = !0);
        let u;
        for (const f in a)
            (!t || !re(t, f) && ((u = Dt(f)) === f || !re(t, u))) && (l ? n && (n[f] !== void 0 || n[u] !== void 0) && (o[f] = no(l, a, f, void 0, e, !0)) : delete o[f]);
        if (s !== a)
            for (const f in s)
                (!t || !re(t, f)) && (delete s[f],
                c = !0)
    }
    c && lt(e, "set", "$attrs")
}
function Ta(e, t, n, r) {
    const [o,s] = e.propsOptions;
    let i = !1, a;
    if (t)
        for (let l in t) {
            if (bn(l))
                continue;
            const c = t[l];
            let u;
            o && re(o, u = tt(l)) ? !s || !s.includes(u) ? n[u] = c : (a || (a = {}))[u] = c : vr(e.emitsOptions, l) || (!(l in r) || c !== r[l]) && (r[l] = c,
            i = !0)
        }
    if (s) {
        const l = oe(n)
          , c = a || ue;
        for (let u = 0; u < s.length; u++) {
            const f = s[u];
            n[f] = no(o, l, f, c[f], e, !re(c, f))
        }
    }
    return i
}
function no(e, t, n, r, o, s) {
    const i = e[n];
    if (i != null) {
        const a = re(i, "default");
        if (a && r === void 0) {
            const l = i.default;
            if (i.type !== Function && !i.skipFactory && Y(l)) {
                const {propsDefaults: c} = o;
                n in c ? r = c[n] : (rn(o),
                r = c[n] = l.call(null, t),
                Ft())
            } else
                r = l
        }
        i[0] && (s && !a ? r = !1 : i[1] && (r === "" || r === Dt(n)) && (r = !0))
    }
    return r
}
function xa(e, t, n=!1) {
    const r = t.propsCache
      , o = r.get(e);
    if (o)
        return o;
    const s = e.props
      , i = {}
      , a = [];
    let l = !1;
    if (!Y(e)) {
        const u = f=>{
            l = !0;
            const [d,m] = xa(f, t, !0);
            be(i, d),
            m && a.push(...m)
        }
        ;
        !n && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    if (!s && !l)
        return ce(e) && r.set(e, Jt),
        Jt;
    if (J(s))
        for (let u = 0; u < s.length; u++) {
            const f = tt(s[u]);
            Ps(f) && (i[f] = ue)
        }
    else if (s)
        for (const u in s) {
            const f = tt(u);
            if (Ps(f)) {
                const d = s[u]
                  , m = i[f] = J(d) || Y(d) ? {
                    type: d
                } : be({}, d);
                if (m) {
                    const v = Ms(Boolean, m.type)
                      , T = Ms(String, m.type);
                    m[0] = v > -1,
                    m[1] = T < 0 || v < T,
                    (v > -1 || re(m, "default")) && a.push(f)
                }
            }
        }
    const c = [i, a];
    return ce(e) && r.set(e, c),
    c
}
function Ps(e) {
    return e[0] !== "$"
}
function Ss(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function Os(e, t) {
    return Ss(e) === Ss(t)
}
function Ms(e, t) {
    return J(t) ? t.findIndex(n=>Os(n, e)) : Y(t) && Os(t, e) ? 0 : -1
}
const Ra = e=>e[0] === "_" || e === "$stable"
  , Qo = e=>J(e) ? e.map(De) : [De(e)]
  , mu = (e,t,n)=>{
    if (t._n)
        return t;
    const r = Bo((...o)=>Qo(t(...o)), n);
    return r._c = !1,
    r
}
  , Aa = (e,t,n)=>{
    const r = e._ctx;
    for (const o in e) {
        if (Ra(o))
            continue;
        const s = e[o];
        if (Y(s))
            t[o] = mu(o, s, r);
        else if (s != null) {
            const i = Qo(s);
            t[o] = ()=>i
        }
    }
}
  , Pa = (e,t)=>{
    const n = Qo(t);
    e.slots.default = ()=>n
}
  , gu = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const n = t._;
        n ? (e.slots = oe(t),
        Zn(t, "_", n)) : Aa(t, e.slots = {})
    } else
        e.slots = {},
        t && Pa(e, t);
    Zn(e.slots, Cr, 1)
}
  , yu = (e,t,n)=>{
    const {vnode: r, slots: o} = e;
    let s = !0
      , i = ue;
    if (r.shapeFlag & 32) {
        const a = t._;
        a ? n && a === 1 ? s = !1 : (be(o, t),
        !n && a === 1 && delete o._) : (s = !t.$stable,
        Aa(t, o)),
        i = t
    } else
        t && (Pa(e, t),
        i = {
            default: 1
        });
    if (s)
        for (const a in o)
            !Ra(a) && !(a in i) && delete o[a]
}
;
function ir(e, t, n, r, o=!1) {
    if (J(e)) {
        e.forEach((d,m)=>ir(d, t && (J(t) ? t[m] : t), n, r, o));
        return
    }
    if (Lt(r) && !o)
        return;
    const s = r.shapeFlag & 4 ? kr(r.component) || r.component.proxy : r.el
      , i = o ? null : s
      , {i: a, r: l} = e
      , c = t && t.r
      , u = a.refs === ue ? a.refs = {} : a.refs
      , f = a.setupState;
    if (c != null && c !== l && (pe(c) ? (u[c] = null,
    re(f, c) && (f[c] = null)) : ve(c) && (c.value = null)),
    Y(l))
        Et(l, a, 12, [i, u]);
    else {
        const d = pe(l)
          , m = ve(l);
        if (d || m) {
            const v = ()=>{
                if (e.f) {
                    const T = d ? re(f, l) ? f[l] : u[l] : l.value;
                    o ? J(T) && Ro(T, s) : J(T) ? T.includes(s) || T.push(s) : d ? (u[l] = [s],
                    re(f, l) && (f[l] = u[l])) : (l.value = [s],
                    e.k && (u[e.k] = l.value))
                } else
                    d ? (u[l] = i,
                    re(f, l) && (f[l] = i)) : m && (l.value = i,
                    e.k && (u[e.k] = i))
            }
            ;
            i ? (v.id = -1,
            ke(v, n)) : v()
        }
    }
}
let ht = !1;
const zn = e=>/svg/.test(e.namespaceURI) && e.tagName !== "foreignObject"
  , Jn = e=>e.nodeType === 8;
function bu(e) {
    const {mt: t, p: n, o: {patchProp: r, createText: o, nextSibling: s, parentNode: i, remove: a, insert: l, createComment: c}} = e
      , u = (b,g)=>{
        if (!g.hasChildNodes()) {
            n(null, b, g),
            nr(),
            g._vnode = b;
            return
        }
        ht = !1,
        f(g.firstChild, b, null, null, null),
        nr(),
        g._vnode = b,
        ht && console.error("Hydration completed but contains mismatches.")
    }
      , f = (b,g,R,_,P,$=!1)=>{
        const F = Jn(b) && b.data === "["
          , k = ()=>T(b, g, R, _, P, F)
          , {type: U, ref: K, shapeFlag: O, patchFlag: E} = g;
        let N = b.nodeType;
        g.el = b,
        E === -2 && ($ = !1,
        g.dynamicChildren = null);
        let A = null;
        switch (U) {
        case en:
            N !== 3 ? g.children === "" ? (l(g.el = o(""), i(b), b),
            A = b) : A = k() : (b.data !== g.children && (ht = !0,
            b.data = g.children),
            A = s(b));
            break;
        case Se:
            N !== 8 || F ? A = k() : A = s(b);
            break;
        case vn:
            if (F && (b = s(b),
            N = b.nodeType),
            N === 1 || N === 3) {
                A = b;
                const te = !g.children.length;
                for (let Q = 0; Q < g.staticCount; Q++)
                    te && (g.children += A.nodeType === 1 ? A.outerHTML : A.data),
                    Q === g.staticCount - 1 && (g.anchor = A),
                    A = s(A);
                return F ? s(A) : A
            } else
                k();
            break;
        case je:
            F ? A = v(b, g, R, _, P, $) : A = k();
            break;
        default:
            if (O & 1)
                N !== 1 || g.type.toLowerCase() !== b.tagName.toLowerCase() ? A = k() : A = d(b, g, R, _, P, $);
            else if (O & 6) {
                g.slotScopeIds = P;
                const te = i(b);
                if (t(g, te, null, R, _, zn(te), $),
                A = F ? I(b) : s(b),
                A && Jn(A) && A.data === "teleport end" && (A = s(A)),
                Lt(g)) {
                    let Q;
                    F ? (Q = de(je),
                    Q.anchor = A ? A.previousSibling : te.lastChild) : Q = b.nodeType === 3 ? La("") : de("div"),
                    Q.el = b,
                    g.component.subTree = Q
                }
            } else
                O & 64 ? N !== 8 ? A = k() : A = g.type.hydrate(b, g, R, _, P, $, e, m) : O & 128 && (A = g.type.hydrate(b, g, R, _, zn(i(b)), P, $, e, f))
        }
        return K != null && ir(K, null, _, g),
        A
    }
      , d = (b,g,R,_,P,$)=>{
        $ = $ || !!g.dynamicChildren;
        const {type: F, props: k, patchFlag: U, shapeFlag: K, dirs: O} = g
          , E = F === "input" && O || F === "option";
        if (E || U !== -1) {
            if (O && Ge(g, null, R, "created"),
            k)
                if (E || !$ || U & 48)
                    for (const A in k)
                        (E && A.endsWith("value") || jn(A) && !bn(A)) && r(b, A, null, k[A], !1, void 0, R);
                else
                    k.onClick && r(b, "onClick", null, k.onClick, !1, void 0, R);
            let N;
            if ((N = k && k.onVnodeBeforeMount) && Ie(N, R, g),
            O && Ge(g, null, R, "beforeMount"),
            ((N = k && k.onVnodeMounted) || O) && ua(()=>{
                N && Ie(N, R, g),
                O && Ge(g, null, R, "mounted")
            }
            , _),
            K & 16 && !(k && (k.innerHTML || k.textContent))) {
                let A = m(b.firstChild, g, b, R, _, P, $);
                for (; A; ) {
                    ht = !0;
                    const te = A;
                    A = A.nextSibling,
                    a(te)
                }
            } else
                K & 8 && b.textContent !== g.children && (ht = !0,
                b.textContent = g.children)
        }
        return b.nextSibling
    }
      , m = (b,g,R,_,P,$,F)=>{
        F = F || !!g.dynamicChildren;
        const k = g.children
          , U = k.length;
        for (let K = 0; K < U; K++) {
            const O = F ? k[K] : k[K] = De(k[K]);
            if (b)
                b = f(b, O, _, P, $, F);
            else {
                if (O.type === en && !O.children)
                    continue;
                ht = !0,
                n(null, O, R, null, _, P, zn(R), $)
            }
        }
        return b
    }
      , v = (b,g,R,_,P,$)=>{
        const {slotScopeIds: F} = g;
        F && (P = P ? P.concat(F) : F);
        const k = i(b)
          , U = m(s(b), g, k, R, _, P, $);
        return U && Jn(U) && U.data === "]" ? s(g.anchor = U) : (ht = !0,
        l(g.anchor = c("]"), k, U),
        U)
    }
      , T = (b,g,R,_,P,$)=>{
        if (ht = !0,
        g.el = null,
        $) {
            const U = I(b);
            for (; ; ) {
                const K = s(b);
                if (K && K !== U)
                    a(K);
                else
                    break
            }
        }
        const F = s(b)
          , k = i(b);
        return a(b),
        n(null, g, k, F, R, _, zn(k), P),
        F
    }
      , I = b=>{
        let g = 0;
        for (; b; )
            if (b = s(b),
            b && Jn(b) && (b.data === "[" && g++,
            b.data === "]")) {
                if (g === 0)
                    return s(b);
                g--
            }
        return b
    }
    ;
    return [u, f]
}
const ke = ua;
function _u(e) {
    return Sa(e)
}
function vu(e) {
    return Sa(e, bu)
}
function Sa(e, t) {
    const n = zr();
    n.__VUE__ = !0;
    const {insert: r, remove: o, patchProp: s, createElement: i, createText: a, createComment: l, setText: c, setElementText: u, parentNode: f, nextSibling: d, setScopeId: m=Je, insertStaticContent: v} = e
      , T = (p,h,y,w=null,x=null,S=null,D=!1,L=null,B=!!h.dynamicChildren)=>{
        if (p === h)
            return;
        p && !ze(p, h) && (w = C(p),
        me(p, x, S, !0),
        p = null),
        h.patchFlag === -2 && (B = !1,
        h.dynamicChildren = null);
        const {type: M, ref: V, shapeFlag: q} = h;
        switch (M) {
        case en:
            I(p, h, y, w);
            break;
        case Se:
            b(p, h, y, w);
            break;
        case vn:
            p == null && g(h, y, w, D);
            break;
        case je:
            E(p, h, y, w, x, S, D, L, B);
            break;
        default:
            q & 1 ? P(p, h, y, w, x, S, D, L, B) : q & 6 ? N(p, h, y, w, x, S, D, L, B) : (q & 64 || q & 128) && M.process(p, h, y, w, x, S, D, L, B, j)
        }
        V != null && x && ir(V, p && p.ref, S, h || p, !h)
    }
      , I = (p,h,y,w)=>{
        if (p == null)
            r(h.el = a(h.children), y, w);
        else {
            const x = h.el = p.el;
            h.children !== p.children && c(x, h.children)
        }
    }
      , b = (p,h,y,w)=>{
        p == null ? r(h.el = l(h.children || ""), y, w) : h.el = p.el
    }
      , g = (p,h,y,w)=>{
        [p.el,p.anchor] = v(p.children, h, y, w, p.el, p.anchor)
    }
      , R = ({el: p, anchor: h},y,w)=>{
        let x;
        for (; p && p !== h; )
            x = d(p),
            r(p, y, w),
            p = x;
        r(h, y, w)
    }
      , _ = ({el: p, anchor: h})=>{
        let y;
        for (; p && p !== h; )
            y = d(p),
            o(p),
            p = y;
        o(h)
    }
      , P = (p,h,y,w,x,S,D,L,B)=>{
        D = D || h.type === "svg",
        p == null ? $(h, y, w, x, S, D, L, B) : U(p, h, x, S, D, L, B)
    }
      , $ = (p,h,y,w,x,S,D,L)=>{
        let B, M;
        const {type: V, props: q, shapeFlag: z, transition: X, dirs: ne} = p;
        if (B = p.el = i(p.type, S, q && q.is, q),
        z & 8 ? u(B, p.children) : z & 16 && k(p.children, B, null, w, x, S && V !== "foreignObject", D, L),
        ne && Ge(p, null, w, "created"),
        F(B, p, p.scopeId, D, w),
        q) {
            for (const ie in q)
                ie !== "value" && !bn(ie) && s(B, ie, null, q[ie], S, p.children, w, x, ae);
            "value"in q && s(B, "value", null, q.value),
            (M = q.onVnodeBeforeMount) && Ie(M, w, p)
        }
        ne && Ge(p, null, w, "beforeMount");
        const le = (!x || x && !x.pendingBranch) && X && !X.persisted;
        le && X.beforeEnter(B),
        r(B, h, y),
        ((M = q && q.onVnodeMounted) || le || ne) && ke(()=>{
            M && Ie(M, w, p),
            le && X.enter(B),
            ne && Ge(p, null, w, "mounted")
        }
        , x)
    }
      , F = (p,h,y,w,x)=>{
        if (y && m(p, y),
        w)
            for (let S = 0; S < w.length; S++)
                m(p, w[S]);
        if (x) {
            let S = x.subTree;
            if (h === S) {
                const D = x.vnode;
                F(p, D, D.scopeId, D.slotScopeIds, x.parent)
            }
        }
    }
      , k = (p,h,y,w,x,S,D,L,B=0)=>{
        for (let M = B; M < p.length; M++) {
            const V = p[M] = L ? bt(p[M]) : De(p[M]);
            T(null, V, h, y, w, x, S, D, L)
        }
    }
      , U = (p,h,y,w,x,S,D)=>{
        const L = h.el = p.el;
        let {patchFlag: B, dynamicChildren: M, dirs: V} = h;
        B |= p.patchFlag & 16;
        const q = p.props || ue
          , z = h.props || ue;
        let X;
        y && xt(y, !1),
        (X = z.onVnodeBeforeUpdate) && Ie(X, y, h, p),
        V && Ge(h, p, y, "beforeUpdate"),
        y && xt(y, !0);
        const ne = x && h.type !== "foreignObject";
        if (M ? K(p.dynamicChildren, M, L, y, w, ne, S) : D || ee(p, h, L, null, y, w, ne, S, !1),
        B > 0) {
            if (B & 16)
                O(L, h, q, z, y, w, x);
            else if (B & 2 && q.class !== z.class && s(L, "class", null, z.class, x),
            B & 4 && s(L, "style", q.style, z.style, x),
            B & 8) {
                const le = h.dynamicProps;
                for (let ie = 0; ie < le.length; ie++) {
                    const ge = le[ie]
                      , qe = q[ge]
                      , Kt = z[ge];
                    (Kt !== qe || ge === "value") && s(L, ge, qe, Kt, x, p.children, y, w, ae)
                }
            }
            B & 1 && p.children !== h.children && u(L, h.children)
        } else
            !D && M == null && O(L, h, q, z, y, w, x);
        ((X = z.onVnodeUpdated) || V) && ke(()=>{
            X && Ie(X, y, h, p),
            V && Ge(h, p, y, "updated")
        }
        , w)
    }
      , K = (p,h,y,w,x,S,D)=>{
        for (let L = 0; L < h.length; L++) {
            const B = p[L]
              , M = h[L]
              , V = B.el && (B.type === je || !ze(B, M) || B.shapeFlag & 70) ? f(B.el) : y;
            T(B, M, V, null, w, x, S, D, !0)
        }
    }
      , O = (p,h,y,w,x,S,D)=>{
        if (y !== w) {
            if (y !== ue)
                for (const L in y)
                    !bn(L) && !(L in w) && s(p, L, y[L], null, D, h.children, x, S, ae);
            for (const L in w) {
                if (bn(L))
                    continue;
                const B = w[L]
                  , M = y[L];
                B !== M && L !== "value" && s(p, L, M, B, D, h.children, x, S, ae)
            }
            "value"in w && s(p, "value", y.value, w.value)
        }
    }
      , E = (p,h,y,w,x,S,D,L,B)=>{
        const M = h.el = p ? p.el : a("")
          , V = h.anchor = p ? p.anchor : a("");
        let {patchFlag: q, dynamicChildren: z, slotScopeIds: X} = h;
        X && (L = L ? L.concat(X) : X),
        p == null ? (r(M, y, w),
        r(V, y, w),
        k(h.children, y, V, x, S, D, L, B)) : q > 0 && q & 64 && z && p.dynamicChildren ? (K(p.dynamicChildren, z, y, x, S, D, L),
        (h.key != null || x && h === x.subTree) && Oa(p, h, !0)) : ee(p, h, y, V, x, S, D, L, B)
    }
      , N = (p,h,y,w,x,S,D,L,B)=>{
        h.slotScopeIds = L,
        p == null ? h.shapeFlag & 512 ? x.ctx.activate(h, y, w, D, B) : A(h, y, w, x, S, D, B) : te(p, h, B)
    }
      , A = (p,h,y,w,x,S,D)=>{
        const L = p.component = xu(p, w, x);
        if (Ln(p) && (L.ctx.renderer = j),
        Ru(L),
        L.asyncDep) {
            if (x && x.registerDep(L, Q),
            !p.el) {
                const B = L.subTree = de(Se);
                b(null, B, h, y)
            }
            return
        }
        Q(L, p, h, y, x, S, D)
    }
      , te = (p,h,y)=>{
        const w = h.component = p.component;
        if (Lc(p, h, y))
            if (w.asyncDep && !w.asyncResolved) {
                G(w, h, y);
                return
            } else
                w.next = h,
                Oc(w.update),
                w.update();
        else
            h.el = p.el,
            w.vnode = h
    }
      , Q = (p,h,y,w,x,S,D)=>{
        const L = ()=>{
            if (p.isMounted) {
                let {next: V, bu: q, u: z, parent: X, vnode: ne} = p, le = V, ie;
                xt(p, !1),
                V ? (V.el = ne.el,
                G(p, V, D)) : V = ne,
                q && Yt(q),
                (ie = V.props && V.props.onVnodeBeforeUpdate) && Ie(ie, X, V, ne),
                xt(p, !0);
                const ge = Sr(p)
                  , qe = p.subTree;
                p.subTree = ge,
                T(qe, ge, f(qe.el), C(qe), p, x, S),
                V.el = ge.el,
                le === null && Do(p, ge.el),
                z && ke(z, x),
                (ie = V.props && V.props.onVnodeUpdated) && ke(()=>Ie(ie, X, V, ne), x)
            } else {
                let V;
                const {el: q, props: z} = h
                  , {bm: X, m: ne, parent: le} = p
                  , ie = Lt(h);
                if (xt(p, !1),
                X && Yt(X),
                !ie && (V = z && z.onVnodeBeforeMount) && Ie(V, le, h),
                xt(p, !0),
                q && Z) {
                    const ge = ()=>{
                        p.subTree = Sr(p),
                        Z(q, p.subTree, p, x, null)
                    }
                    ;
                    ie ? h.type.__asyncLoader().then(()=>!p.isUnmounted && ge()) : ge()
                } else {
                    const ge = p.subTree = Sr(p);
                    T(null, ge, y, w, p, x, S),
                    h.el = ge.el
                }
                if (ne && ke(ne, x),
                !ie && (V = z && z.onVnodeMounted)) {
                    const ge = h;
                    ke(()=>Ie(V, le, ge), x)
                }
                (h.shapeFlag & 256 || le && Lt(le.vnode) && le.vnode.shapeFlag & 256) && p.a && ke(p.a, x),
                p.isMounted = !0,
                h = y = w = null
            }
        }
          , B = p.effect = new Oo(L,()=>_r(M),p.scope)
          , M = p.update = ()=>B.run();
        M.id = p.uid,
        xt(p, !0),
        M()
    }
      , G = (p,h,y)=>{
        h.component = p;
        const w = p.vnode.props;
        p.vnode = h,
        p.next = null,
        hu(p, h.props, w, y),
        yu(p, h.children, y),
        ln(),
        _s(),
        cn()
    }
      , ee = (p,h,y,w,x,S,D,L,B=!1)=>{
        const M = p && p.children
          , V = p ? p.shapeFlag : 0
          , q = h.children
          , {patchFlag: z, shapeFlag: X} = h;
        if (z > 0) {
            if (z & 128) {
                He(M, q, y, w, x, S, D, L, B);
                return
            } else if (z & 256) {
                Ee(M, q, y, w, x, S, D, L, B);
                return
            }
        }
        X & 8 ? (V & 16 && ae(M, x, S),
        q !== M && u(y, q)) : V & 16 ? X & 16 ? He(M, q, y, w, x, S, D, L, B) : ae(M, x, S, !0) : (V & 8 && u(y, ""),
        X & 16 && k(q, y, w, x, S, D, L, B))
    }
      , Ee = (p,h,y,w,x,S,D,L,B)=>{
        p = p || Jt,
        h = h || Jt;
        const M = p.length
          , V = h.length
          , q = Math.min(M, V);
        let z;
        for (z = 0; z < q; z++) {
            const X = h[z] = B ? bt(h[z]) : De(h[z]);
            T(p[z], X, y, null, x, S, D, L, B)
        }
        M > V ? ae(p, x, S, !0, !1, q) : k(h, y, w, x, S, D, L, B, q)
    }
      , He = (p,h,y,w,x,S,D,L,B)=>{
        let M = 0;
        const V = h.length;
        let q = p.length - 1
          , z = V - 1;
        for (; M <= q && M <= z; ) {
            const X = p[M]
              , ne = h[M] = B ? bt(h[M]) : De(h[M]);
            if (ze(X, ne))
                T(X, ne, y, null, x, S, D, L, B);
            else
                break;
            M++
        }
        for (; M <= q && M <= z; ) {
            const X = p[q]
              , ne = h[z] = B ? bt(h[z]) : De(h[z]);
            if (ze(X, ne))
                T(X, ne, y, null, x, S, D, L, B);
            else
                break;
            q--,
            z--
        }
        if (M > q) {
            if (M <= z) {
                const X = z + 1
                  , ne = X < V ? h[X].el : w;
                for (; M <= z; )
                    T(null, h[M] = B ? bt(h[M]) : De(h[M]), y, ne, x, S, D, L, B),
                    M++
            }
        } else if (M > z)
            for (; M <= q; )
                me(p[M], x, S, !0),
                M++;
        else {
            const X = M
              , ne = M
              , le = new Map;
            for (M = ne; M <= z; M++) {
                const Le = h[M] = B ? bt(h[M]) : De(h[M]);
                Le.key != null && le.set(Le.key, M)
            }
            let ie, ge = 0;
            const qe = z - ne + 1;
            let Kt = !1
              , ls = 0;
            const fn = new Array(qe);
            for (M = 0; M < qe; M++)
                fn[M] = 0;
            for (M = X; M <= q; M++) {
                const Le = p[M];
                if (ge >= qe) {
                    me(Le, x, S, !0);
                    continue
                }
                let Ye;
                if (Le.key != null)
                    Ye = le.get(Le.key);
                else
                    for (ie = ne; ie <= z; ie++)
                        if (fn[ie - ne] === 0 && ze(Le, h[ie])) {
                            Ye = ie;
                            break
                        }
                Ye === void 0 ? me(Le, x, S, !0) : (fn[Ye - ne] = M + 1,
                Ye >= ls ? ls = Ye : Kt = !0,
                T(Le, h[Ye], y, null, x, S, D, L, B),
                ge++)
            }
            const cs = Kt ? wu(fn) : Jt;
            for (ie = cs.length - 1,
            M = qe - 1; M >= 0; M--) {
                const Le = ne + M
                  , Ye = h[Le]
                  , us = Le + 1 < V ? h[Le + 1].el : w;
                fn[M] === 0 ? T(null, Ye, y, us, x, S, D, L, B) : Kt && (ie < 0 || M !== cs[ie] ? Oe(Ye, y, us, 2) : ie--)
            }
        }
    }
      , Oe = (p,h,y,w,x=null)=>{
        const {el: S, type: D, transition: L, children: B, shapeFlag: M} = p;
        if (M & 6) {
            Oe(p.component.subTree, h, y, w);
            return
        }
        if (M & 128) {
            p.suspense.move(h, y, w);
            return
        }
        if (M & 64) {
            D.move(p, h, y, j);
            return
        }
        if (D === je) {
            r(S, h, y);
            for (let q = 0; q < B.length; q++)
                Oe(B[q], h, y, w);
            r(p.anchor, h, y);
            return
        }
        if (D === vn) {
            R(p, h, y);
            return
        }
        if (w !== 2 && M & 1 && L)
            if (w === 0)
                L.beforeEnter(S),
                r(S, h, y),
                ke(()=>L.enter(S), x);
            else {
                const {leave: q, delayLeave: z, afterLeave: X} = L
                  , ne = ()=>r(S, h, y)
                  , le = ()=>{
                    q(S, ()=>{
                        ne(),
                        X && X()
                    }
                    )
                }
                ;
                z ? z(S, ne, le) : le()
            }
        else
            r(S, h, y)
    }
      , me = (p,h,y,w=!1,x=!1)=>{
        const {type: S, props: D, ref: L, children: B, dynamicChildren: M, shapeFlag: V, patchFlag: q, dirs: z} = p;
        if (L != null && ir(L, null, y, p, !0),
        V & 256) {
            h.ctx.deactivate(p);
            return
        }
        const X = V & 1 && z
          , ne = !Lt(p);
        let le;
        if (ne && (le = D && D.onVnodeBeforeUnmount) && Ie(le, h, p),
        V & 6)
            xe(p.component, y, w);
        else {
            if (V & 128) {
                p.suspense.unmount(y, w);
                return
            }
            X && Ge(p, null, h, "beforeUnmount"),
            V & 64 ? p.type.remove(p, h, y, x, j, w) : M && (S !== je || q > 0 && q & 64) ? ae(M, h, y, !1, !0) : (S === je && q & 384 || !x && V & 16) && ae(B, h, y),
            w && Ce(p)
        }
        (ne && (le = D && D.onVnodeUnmounted) || X) && ke(()=>{
            le && Ie(le, h, p),
            X && Ge(p, null, h, "unmounted")
        }
        , y)
    }
      , Ce = p=>{
        const {type: h, el: y, anchor: w, transition: x} = p;
        if (h === je) {
            _e(y, w);
            return
        }
        if (h === vn) {
            _(p);
            return
        }
        const S = ()=>{
            o(y),
            x && !x.persisted && x.afterLeave && x.afterLeave()
        }
        ;
        if (p.shapeFlag & 1 && x && !x.persisted) {
            const {leave: D, delayLeave: L} = x
              , B = ()=>D(y, S);
            L ? L(p.el, S, B) : B()
        } else
            S()
    }
      , _e = (p,h)=>{
        let y;
        for (; p !== h; )
            y = d(p),
            o(p),
            p = y;
        o(h)
    }
      , xe = (p,h,y)=>{
        const {bum: w, scope: x, update: S, subTree: D, um: L} = p;
        w && Yt(w),
        x.stop(),
        S && (S.active = !1,
        me(D, p, h, y)),
        L && ke(L, h),
        ke(()=>{
            p.isUnmounted = !0
        }
        , h),
        h && h.pendingBranch && !h.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === h.pendingId && (h.deps--,
        h.deps === 0 && h.resolve())
    }
      , ae = (p,h,y,w=!1,x=!1,S=0)=>{
        for (let D = S; D < p.length; D++)
            me(p[D], h, y, w, x)
    }
      , C = p=>p.shapeFlag & 6 ? C(p.component.subTree) : p.shapeFlag & 128 ? p.suspense.next() : d(p.anchor || p.el)
      , H = (p,h,y)=>{
        p == null ? h._vnode && me(h._vnode, null, null, !0) : T(h._vnode || null, p, h, null, null, null, y),
        _s(),
        nr(),
        h._vnode = p
    }
      , j = {
        p: T,
        um: me,
        m: Oe,
        r: Ce,
        mt: A,
        mc: k,
        pc: ee,
        pbc: K,
        n: C,
        o: e
    };
    let W, Z;
    return t && ([W,Z] = t(j)),
    {
        render: H,
        hydrate: W,
        createApp: du(H, W)
    }
}
function xt({effect: e, update: t}, n) {
    e.allowRecurse = t.allowRecurse = n
}
function Oa(e, t, n=!1) {
    const r = e.children
      , o = t.children;
    if (J(r) && J(o))
        for (let s = 0; s < r.length; s++) {
            const i = r[s];
            let a = o[s];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = bt(o[s]),
            a.el = i.el),
            n || Oa(i, a)),
            a.type === en && (a.el = i.el)
        }
}
function wu(e) {
    const t = e.slice()
      , n = [0];
    let r, o, s, i, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const c = e[r];
        if (c !== 0) {
            if (o = n[n.length - 1],
            e[o] < c) {
                t[r] = o,
                n.push(r);
                continue
            }
            for (s = 0,
            i = n.length - 1; s < i; )
                a = s + i >> 1,
                e[n[a]] < c ? s = a + 1 : i = a;
            c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]),
            n[s] = r)
        }
    }
    for (s = n.length,
    i = n[s - 1]; s-- > 0; )
        n[s] = i,
        i = t[i];
    return n
}
const Eu = e=>e.__isTeleport
  , je = Symbol.for("v-fgt")
  , en = Symbol.for("v-txt")
  , Se = Symbol.for("v-cmt")
  , vn = Symbol.for("v-stc")
  , wn = [];
let Ke = null;
function et(e=!1) {
    wn.push(Ke = e ? null : [])
}
function Ma() {
    wn.pop(),
    Ke = wn[wn.length - 1] || null
}
let tn = 1;
function Is(e) {
    tn += e
}
function Ia(e) {
    return e.dynamicChildren = tn > 0 ? Ke || Jt : null,
    Ma(),
    tn > 0 && Ke && Ke.push(e),
    e
}
function Pm(e, t, n, r, o, s) {
    return Ia($a(e, t, n, r, o, s, !0))
}
function st(e, t, n, r, o) {
    return Ia(de(e, t, n, r, o, !0))
}
function nn(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function ze(e, t) {
    return e.type === t.type && e.key === t.key
}
const Cr = "__vInternal"
  , ja = ({key: e})=>e ?? null
  , Xn = ({ref: e, ref_key: t, ref_for: n})=>(typeof e == "number" && (e = "" + e),
e != null ? pe(e) || ve(e) || Y(e) ? {
    i: we,
    r: e,
    k: t,
    f: !!n
} : e : null);
function $a(e, t=null, n=null, r=0, o=null, s=e === je ? 0 : 1, i=!1, a=!1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ja(t),
        ref: t && Xn(t),
        scopeId: wr,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: s,
        patchFlag: r,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: we
    };
    return a ? (Yo(l, n),
    s & 128 && e.normalize(l)) : n && (l.shapeFlag |= pe(n) ? 8 : 16),
    tn > 0 && !i && Ke && (l.patchFlag > 0 || s & 6) && l.patchFlag !== 32 && Ke.push(l),
    l
}
const de = Cu;
function Cu(e, t=null, n=null, r=0, o=null, s=!1) {
    if ((!e || e === _a) && (e = Se),
    nn(e)) {
        const a = ut(e, t, !0);
        return n && Yo(a, n),
        tn > 0 && !s && Ke && (a.shapeFlag & 6 ? Ke[Ke.indexOf(e)] = a : Ke.push(a)),
        a.patchFlag |= -2,
        a
    }
    if (Ou(e) && (e = e.__vccOpts),
    t) {
        t = Ha(t);
        let {class: a, style: l} = t;
        a && !pe(a) && (t.class = yr(a)),
        ce(l) && (Zi(l) && !J(l) && (l = be({}, l)),
        t.style = gr(l))
    }
    const i = pe(e) ? 1 : ca(e) ? 128 : Eu(e) ? 64 : ce(e) ? 4 : Y(e) ? 2 : 0;
    return $a(e, t, n, r, o, i, s, !0)
}
function Ha(e) {
    return e ? Zi(e) || Cr in e ? be({}, e) : e : null
}
function ut(e, t, n=!1) {
    const {props: r, ref: o, patchFlag: s, children: i} = e
      , a = t ? Na(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && ja(a),
        ref: t && t.ref ? n && o ? J(o) ? o.concat(Xn(t)) : [o, Xn(t)] : Xn(t) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== je ? s === -1 ? 16 : s | 16 : s,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && ut(e.ssContent),
        ssFallback: e.ssFallback && ut(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function La(e=" ", t=0) {
    return de(en, null, e, t)
}
function Sm(e, t) {
    const n = de(vn, null, e);
    return n.staticCount = t,
    n
}
function Om(e="", t=!1) {
    return t ? (et(),
    st(Se, null, e)) : de(Se, null, e)
}
function De(e) {
    return e == null || typeof e == "boolean" ? de(Se) : J(e) ? de(je, null, e.slice()) : typeof e == "object" ? bt(e) : de(en, null, String(e))
}
function bt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : ut(e)
}
function Yo(e, t) {
    let n = 0;
    const {shapeFlag: r} = e;
    if (t == null)
        t = null;
    else if (J(t))
        n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1),
            Yo(e, o()),
            o._c && (o._d = !0));
            return
        } else {
            n = 32;
            const o = t._;
            !o && !(Cr in t) ? t._ctx = we : o === 3 && we && (we.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        Y(t) ? (t = {
            default: t,
            _ctx: we
        },
        n = 32) : (t = String(t),
        r & 64 ? (n = 16,
        t = [La(t)]) : n = 8);
    e.children = t,
    e.shapeFlag |= n
}
function Na(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const o in r)
            if (o === "class")
                t.class !== r.class && (t.class = yr([t.class, r.class]));
            else if (o === "style")
                t.style = gr([t.style, r.style]);
            else if (jn(o)) {
                const s = t[o]
                  , i = r[o];
                i && s !== i && !(J(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i)
            } else
                o !== "" && (t[o] = r[o])
    }
    return t
}
function Ie(e, t, n, r=null) {
    We(e, t, 7, [n, r])
}
const ku = Ca();
let Tu = 0;
function xu(e, t, n) {
    const r = e.type
      , o = (t ? t.appContext : e.appContext) || ku
      , s = {
        uid: Tu++,
        vnode: e,
        type: r,
        parent: t,
        appContext: o,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new ql(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(o.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: xa(r, o),
        emitsOptions: la(r, o),
        emit: null,
        emitted: null,
        propsDefaults: ue,
        inheritAttrs: r.inheritAttrs,
        ctx: ue,
        data: ue,
        props: ue,
        attrs: ue,
        slots: ue,
        refs: ue,
        setupState: ue,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return s.ctx = {
        _: s
    },
    s.root = t ? t.root : s,
    s.emit = Ic.bind(null, s),
    e.ce && e.ce(s),
    s
}
let ye = null;
const Xo = ()=>ye || we;
let Go, Wt, js = "__VUE_INSTANCE_SETTERS__";
(Wt = zr()[js]) || (Wt = zr()[js] = []),
Wt.push(e=>ye = e),
Go = e=>{
    Wt.length > 1 ? Wt.forEach(t=>t(e)) : Wt[0](e)
}
;
const rn = e=>{
    Go(e),
    e.scope.on()
}
  , Ft = ()=>{
    ye && ye.scope.off(),
    Go(null)
}
;
function Fa(e) {
    return e.vnode.shapeFlag & 4
}
let on = !1;
function Ru(e, t=!1) {
    on = t;
    const {props: n, children: r} = e.vnode
      , o = Fa(e);
    pu(e, n, o, t),
    gu(e, r);
    const s = o ? Au(e, t) : void 0;
    return on = !1,
    s
}
function Au(e, t) {
    const n = e.type;
    e.accessCache = Object.create(null),
    e.proxy = ea(new Proxy(e.ctx,su));
    const {setup: r} = n;
    if (r) {
        const o = e.setupContext = r.length > 1 ? Su(e) : null;
        rn(e),
        ln();
        const s = Et(r, e, 0, [e.props, o]);
        if (cn(),
        Ft(),
        Hi(s)) {
            if (s.then(Ft, Ft),
            t)
                return s.then(i=>{
                    ro(e, i, t)
                }
                ).catch(i=>{
                    un(i, e, 0)
                }
                );
            e.asyncDep = s
        } else
            ro(e, s, t)
    } else
        Ba(e, t)
}
function ro(e, t, n) {
    Y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = na(t)),
    Ba(e, n)
}
let $s;
function Ba(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && $s && !r.render) {
            const o = r.template || Jo(e).template;
            if (o) {
                const {isCustomElement: s, compilerOptions: i} = e.appContext.config
                  , {delimiters: a, compilerOptions: l} = r
                  , c = be(be({
                    isCustomElement: s,
                    delimiters: a
                }, i), l);
                r.render = $s(o, c)
            }
        }
        e.render = r.render || Je
    }
    rn(e),
    ln(),
    iu(e),
    cn(),
    Ft()
}
function Pu(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, n) {
            return $e(e, "get", "$attrs"),
            t[n]
        }
    }))
}
function Su(e) {
    const t = n=>{
        e.exposed = n || {}
    }
    ;
    return {
        get attrs() {
            return Pu(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function kr(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(na(ea(e.exposed)),{
            get(t, n) {
                if (n in t)
                    return t[n];
                if (n in _n)
                    return _n[n](e)
            },
            has(t, n) {
                return n in t || n in _n
            }
        }))
}
function oo(e, t=!0) {
    return Y(e) ? e.displayName || e.name : e.name || t && e.__name
}
function Ou(e) {
    return Y(e) && "__vccOpts"in e
}
const Ue = (e,t)=>Ac(e, t, on);
function Fe(e, t, n) {
    const r = arguments.length;
    return r === 2 ? ce(t) && !J(t) ? nn(t) ? de(e, null, [t]) : de(e, t) : de(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && nn(n) && (n = [n]),
    de(e, t, n))
}
const Mu = Symbol.for("v-scx")
  , Iu = ()=>Pe(Mu)
  , Da = "3.3.4"
  , ju = "http://www.w3.org/2000/svg"
  , Mt = typeof document < "u" ? document : null
  , Hs = Mt && Mt.createElement("template")
  , $u = {
    insert: (e,t,n)=>{
        t.insertBefore(e, n || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,n,r)=>{
        const o = t ? Mt.createElementNS(ju, e) : Mt.createElement(e, n ? {
            is: n
        } : void 0);
        return e === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple),
        o
    }
    ,
    createText: e=>Mt.createTextNode(e),
    createComment: e=>Mt.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Mt.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, o, s) {
        const i = n ? n.previousSibling : t.lastChild;
        if (o && (o === s || o.nextSibling))
            for (; t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling)); )
                ;
        else {
            Hs.innerHTML = r ? `<svg>${e}</svg>` : e;
            const a = Hs.content;
            if (r) {
                const l = a.firstChild;
                for (; l.firstChild; )
                    a.appendChild(l.firstChild);
                a.removeChild(l)
            }
            t.insertBefore(a, n)
        }
        return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild]
    }
};
function Hu(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t
}
function Lu(e, t, n) {
    const r = e.style
      , o = pe(n);
    if (n && !o) {
        if (t && !pe(t))
            for (const s in t)
                n[s] == null && so(r, s, "");
        for (const s in n)
            so(r, s, n[s])
    } else {
        const s = r.display;
        o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
        "_vod"in e && (r.display = s)
    }
}
const Ls = /\s*!important$/;
function so(e, t, n) {
    if (J(n))
        n.forEach(r=>so(e, t, r));
    else if (n == null && (n = ""),
    t.startsWith("--"))
        e.setProperty(t, n);
    else {
        const r = Nu(e, t);
        Ls.test(n) ? e.setProperty(Dt(r), n.replace(Ls, ""), "important") : e[r] = n
    }
}
const Ns = ["Webkit", "Moz", "ms"]
  , Hr = {};
function Nu(e, t) {
    const n = Hr[t];
    if (n)
        return n;
    let r = tt(t);
    if (r !== "filter" && r in e)
        return Hr[t] = r;
    r = mr(r);
    for (let o = 0; o < Ns.length; o++) {
        const s = Ns[o] + r;
        if (s in e)
            return Hr[t] = s
    }
    return t
}
const Fs = "http://www.w3.org/1999/xlink";
function Fu(e, t, n, r, o) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(Fs, t.slice(6, t.length)) : e.setAttributeNS(Fs, t, n);
    else {
        const s = Wl(t);
        n == null || s && !Bi(n) ? e.removeAttribute(t) : e.setAttribute(t, s ? "" : n)
    }
}
function Bu(e, t, n, r, o, s, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, o, s),
        e[t] = n ?? "";
        return
    }
    const a = e.tagName;
    if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
        e._value = n;
        const c = a === "OPTION" ? e.getAttribute("value") : e.value
          , u = n ?? "";
        c !== u && (e.value = u),
        n == null && e.removeAttribute(t);
        return
    }
    let l = !1;
    if (n === "" || n == null) {
        const c = typeof e[t];
        c === "boolean" ? n = Bi(n) : n == null && c === "string" ? (n = "",
        l = !0) : c === "number" && (n = 0,
        l = !0)
    }
    try {
        e[t] = n
    } catch {}
    l && e.removeAttribute(t)
}
function qt(e, t, n, r) {
    e.addEventListener(t, n, r)
}
function Du(e, t, n, r) {
    e.removeEventListener(t, n, r)
}
function Uu(e, t, n, r, o=null) {
    const s = e._vei || (e._vei = {})
      , i = s[t];
    if (r && i)
        i.value = r;
    else {
        const [a,l] = Ku(t);
        if (r) {
            const c = s[t] = Vu(r, o);
            qt(e, a, c, l)
        } else
            i && (Du(e, a, i, l),
            s[t] = void 0)
    }
}
const Bs = /(?:Once|Passive|Capture)$/;
function Ku(e) {
    let t;
    if (Bs.test(e)) {
        t = {};
        let r;
        for (; r = e.match(Bs); )
            e = e.slice(0, e.length - r[0].length),
            t[r[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : Dt(e.slice(2)), t]
}
let Lr = 0;
const Wu = Promise.resolve()
  , qu = ()=>Lr || (Wu.then(()=>Lr = 0),
Lr = Date.now());
function Vu(e, t) {
    const n = r=>{
        if (!r._vts)
            r._vts = Date.now();
        else if (r._vts <= n.attached)
            return;
        We(zu(r, n.value), t, 5, [r])
    }
    ;
    return n.value = e,
    n.attached = qu(),
    n
}
function zu(e, t) {
    if (J(t)) {
        const n = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            n.call(e),
            e._stopped = !0
        }
        ,
        t.map(r=>o=>!o._stopped && r && r(o))
    } else
        return t
}
const Ds = /^on[a-z]/
  , Ju = (e,t,n,r,o=!1,s,i,a,l)=>{
    t === "class" ? Hu(e, r, o) : t === "style" ? Lu(e, n, r) : jn(t) ? xo(t) || Uu(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : Qu(e, t, r, o)) ? Bu(e, t, r, s, i, a, l) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r),
    Fu(e, t, r, o))
}
;
function Qu(e, t, n, r) {
    return r ? !!(t === "innerHTML" || t === "textContent" || t in e && Ds.test(t) && Y(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ds.test(t) && pe(n) ? !1 : t in e
}
const mt = "transition"
  , dn = "animation"
  , Tr = (e,{slots: t})=>Fe(zc, Yu(e), t);
Tr.displayName = "Transition";
const Ua = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: !0
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
Tr.props = be({}, da, Ua);
const Rt = (e,t=[])=>{
    J(e) ? e.forEach(n=>n(...t)) : e && e(...t)
}
  , Us = e=>e ? J(e) ? e.some(t=>t.length > 1) : e.length > 1 : !1;
function Yu(e) {
    const t = {};
    for (const E in e)
        E in Ua || (t[E] = e[E]);
    if (e.css === !1)
        return t;
    const {name: n="v", type: r, duration: o, enterFromClass: s=`${n}-enter-from`, enterActiveClass: i=`${n}-enter-active`, enterToClass: a=`${n}-enter-to`, appearFromClass: l=s, appearActiveClass: c=i, appearToClass: u=a, leaveFromClass: f=`${n}-leave-from`, leaveActiveClass: d=`${n}-leave-active`, leaveToClass: m=`${n}-leave-to`} = e
      , v = Xu(o)
      , T = v && v[0]
      , I = v && v[1]
      , {onBeforeEnter: b, onEnter: g, onEnterCancelled: R, onLeave: _, onLeaveCancelled: P, onBeforeAppear: $=b, onAppear: F=g, onAppearCancelled: k=R} = t
      , U = (E,N,A)=>{
        At(E, N ? u : a),
        At(E, N ? c : i),
        A && A()
    }
      , K = (E,N)=>{
        E._isLeaving = !1,
        At(E, f),
        At(E, m),
        At(E, d),
        N && N()
    }
      , O = E=>(N,A)=>{
        const te = E ? F : g
          , Q = ()=>U(N, E, A);
        Rt(te, [N, Q]),
        Ks(()=>{
            At(N, E ? l : s),
            gt(N, E ? u : a),
            Us(te) || Ws(N, r, T, Q)
        }
        )
    }
    ;
    return be(t, {
        onBeforeEnter(E) {
            Rt(b, [E]),
            gt(E, s),
            gt(E, i)
        },
        onBeforeAppear(E) {
            Rt($, [E]),
            gt(E, l),
            gt(E, c)
        },
        onEnter: O(!1),
        onAppear: O(!0),
        onLeave(E, N) {
            E._isLeaving = !0;
            const A = ()=>K(E, N);
            gt(E, f),
            ef(),
            gt(E, d),
            Ks(()=>{
                E._isLeaving && (At(E, f),
                gt(E, m),
                Us(_) || Ws(E, r, I, A))
            }
            ),
            Rt(_, [E, A])
        },
        onEnterCancelled(E) {
            U(E, !1),
            Rt(R, [E])
        },
        onAppearCancelled(E) {
            U(E, !0),
            Rt(k, [E])
        },
        onLeaveCancelled(E) {
            K(E),
            Rt(P, [E])
        }
    })
}
function Xu(e) {
    if (e == null)
        return null;
    if (ce(e))
        return [Nr(e.enter), Nr(e.leave)];
    {
        const t = Nr(e);
        return [t, t]
    }
}
function Nr(e) {
    return Fi(e)
}
function gt(e, t) {
    t.split(/\s+/).forEach(n=>n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set)).add(t)
}
function At(e, t) {
    t.split(/\s+/).forEach(r=>r && e.classList.remove(r));
    const {_vtc: n} = e;
    n && (n.delete(t),
    n.size || (e._vtc = void 0))
}
function Ks(e) {
    requestAnimationFrame(()=>{
        requestAnimationFrame(e)
    }
    )
}
let Gu = 0;
function Ws(e, t, n, r) {
    const o = e._endId = ++Gu
      , s = ()=>{
        o === e._endId && r()
    }
    ;
    if (n)
        return setTimeout(s, n);
    const {type: i, timeout: a, propCount: l} = Zu(e, t);
    if (!i)
        return r();
    const c = i + "end";
    let u = 0;
    const f = ()=>{
        e.removeEventListener(c, d),
        s()
    }
      , d = m=>{
        m.target === e && ++u >= l && f()
    }
    ;
    setTimeout(()=>{
        u < l && f()
    }
    , a + 1),
    e.addEventListener(c, d)
}
function Zu(e, t) {
    const n = window.getComputedStyle(e)
      , r = v=>(n[v] || "").split(", ")
      , o = r(`${mt}Delay`)
      , s = r(`${mt}Duration`)
      , i = qs(o, s)
      , a = r(`${dn}Delay`)
      , l = r(`${dn}Duration`)
      , c = qs(a, l);
    let u = null
      , f = 0
      , d = 0;
    t === mt ? i > 0 && (u = mt,
    f = i,
    d = s.length) : t === dn ? c > 0 && (u = dn,
    f = c,
    d = l.length) : (f = Math.max(i, c),
    u = f > 0 ? i > c ? mt : dn : null,
    d = u ? u === mt ? s.length : l.length : 0);
    const m = u === mt && /\b(transform|all)(,|$)/.test(r(`${mt}Property`).toString());
    return {
        type: u,
        timeout: f,
        propCount: d,
        hasTransform: m
    }
}
function qs(e, t) {
    for (; e.length < t.length; )
        e = e.concat(e);
    return Math.max(...t.map((n,r)=>Vs(n) + Vs(e[r])))
}
function Vs(e) {
    return Number(e.slice(0, -1).replace(",", ".")) * 1e3
}
function ef() {
    return document.body.offsetHeight
}
const zs = e=>{
    const t = e.props["onUpdate:modelValue"] || !1;
    return J(t) ? n=>Yt(t, n) : t
}
;
function tf(e) {
    e.target.composing = !0
}
function Js(e) {
    const t = e.target;
    t.composing && (t.composing = !1,
    t.dispatchEvent(new Event("input")))
}
const Mm = {
    created(e, {modifiers: {lazy: t, trim: n, number: r}}, o) {
        e._assign = zs(o);
        const s = r || o.props && o.props.type === "number";
        qt(e, t ? "change" : "input", i=>{
            if (i.target.composing)
                return;
            let a = e.value;
            n && (a = a.trim()),
            s && (a = Vr(a)),
            e._assign(a)
        }
        ),
        n && qt(e, "change", ()=>{
            e.value = e.value.trim()
        }
        ),
        t || (qt(e, "compositionstart", tf),
        qt(e, "compositionend", Js),
        qt(e, "change", Js))
    },
    mounted(e, {value: t}) {
        e.value = t ?? ""
    },
    beforeUpdate(e, {value: t, modifiers: {lazy: n, trim: r, number: o}}, s) {
        if (e._assign = zs(s),
        e.composing || document.activeElement === e && e.type !== "range" && (n || r && e.value.trim() === t || (o || e.type === "number") && Vr(e.value) === t))
            return;
        const i = t ?? "";
        e.value !== i && (e.value = i)
    }
}
  , nf = ["ctrl", "shift", "alt", "meta"]
  , rf = {
    stop: e=>e.stopPropagation(),
    prevent: e=>e.preventDefault(),
    self: e=>e.target !== e.currentTarget,
    ctrl: e=>!e.ctrlKey,
    shift: e=>!e.shiftKey,
    alt: e=>!e.altKey,
    meta: e=>!e.metaKey,
    left: e=>"button"in e && e.button !== 0,
    middle: e=>"button"in e && e.button !== 1,
    right: e=>"button"in e && e.button !== 2,
    exact: (e,t)=>nf.some(n=>e[`${n}Key`] && !t.includes(n))
}
  , Im = (e,t)=>(n,...r)=>{
    for (let o = 0; o < t.length; o++) {
        const s = rf[t[o]];
        if (s && s(n, t))
            return
    }
    return e(n, ...r)
}
  , of = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
}
  , jm = (e,t)=>n=>{
    if (!("key"in n))
        return;
    const r = Dt(n.key);
    if (t.some(o=>o === r || of[o] === r))
        return e(n)
}
  , $m = {
    beforeMount(e, {value: t}, {transition: n}) {
        e._vod = e.style.display === "none" ? "" : e.style.display,
        n && t ? n.beforeEnter(e) : pn(e, t)
    },
    mounted(e, {value: t}, {transition: n}) {
        n && t && n.enter(e)
    },
    updated(e, {value: t, oldValue: n}, {transition: r}) {
        !t != !n && (r ? t ? (r.beforeEnter(e),
        pn(e, !0),
        r.enter(e)) : r.leave(e, ()=>{
            pn(e, !1)
        }
        ) : pn(e, t))
    },
    beforeUnmount(e, {value: t}) {
        pn(e, t)
    }
};
function pn(e, t) {
    e.style.display = t ? e._vod : "none"
}
const Ka = be({
    patchProp: Ju
}, $u);
let En, Qs = !1;
function sf() {
    return En || (En = _u(Ka))
}
function af() {
    return En = Qs ? En : vu(Ka),
    Qs = !0,
    En
}
const lf = (...e)=>{
    const t = sf().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const o = Wa(r);
        if (!o)
            return;
        const s = t._component;
        !Y(s) && !s.render && !s.template && (s.template = o.innerHTML),
        o.innerHTML = "";
        const i = n(o, !1, o instanceof SVGElement);
        return o instanceof Element && (o.removeAttribute("v-cloak"),
        o.setAttribute("data-v-app", "")),
        i
    }
    ,
    t
}
  , cf = (...e)=>{
    const t = af().createApp(...e)
      , {mount: n} = t;
    return t.mount = r=>{
        const o = Wa(r);
        if (o)
            return n(o, !0, o instanceof SVGElement)
    }
    ,
    t
}
;
function Wa(e) {
    return pe(e) ? document.querySelector(e) : e
}
const uf = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
  , ff = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
  , df = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function pf(e, t) {
    if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype"in t) {
        hf(e);
        return
    }
    return t
}
function hf(e) {
    console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)
}
function ar(e, t={}) {
    if (typeof e != "string")
        return e;
    const n = e.trim();
    if (e[0] === '"' && e[e.length - 1] === '"')
        return n.slice(1, -1);
    if (n.length <= 9) {
        const r = n.toLowerCase();
        if (r === "true")
            return !0;
        if (r === "false")
            return !1;
        if (r === "undefined")
            return;
        if (r === "null")
            return null;
        if (r === "nan")
            return Number.NaN;
        if (r === "infinity")
            return Number.POSITIVE_INFINITY;
        if (r === "-infinity")
            return Number.NEGATIVE_INFINITY
    }
    if (!df.test(e)) {
        if (t.strict)
            throw new SyntaxError("[destr] Invalid JSON");
        return e
    }
    try {
        if (uf.test(e) || ff.test(e)) {
            if (t.strict)
                throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(e, pf)
        }
        return JSON.parse(e)
    } catch (r) {
        if (t.strict)
            throw r;
        return e
    }
}
const mf = /#/g
  , gf = /&/g
  , yf = /=/g
  , Zo = /\+/g
  , bf = /%5e/gi
  , _f = /%60/gi
  , vf = /%7c/gi
  , wf = /%20/gi;
function Ef(e) {
    return encodeURI("" + e).replace(vf, "|")
}
function io(e) {
    return Ef(typeof e == "string" ? e : JSON.stringify(e)).replace(Zo, "%2B").replace(wf, "+").replace(mf, "%23").replace(gf, "%26").replace(_f, "`").replace(bf, "^")
}
function Fr(e) {
    return io(e).replace(yf, "%3D")
}
function lr(e="") {
    try {
        return decodeURIComponent("" + e)
    } catch {
        return "" + e
    }
}
function Cf(e) {
    return lr(e.replace(Zo, " "))
}
function kf(e) {
    return lr(e.replace(Zo, " "))
}
function Tf(e="") {
    const t = {};
    e[0] === "?" && (e = e.slice(1));
    for (const n of e.split("&")) {
        const r = n.match(/([^=]+)=?(.*)/) || [];
        if (r.length < 2)
            continue;
        const o = Cf(r[1]);
        if (o === "__proto__" || o === "constructor")
            continue;
        const s = kf(r[2] || "");
        t[o] === void 0 ? t[o] = s : Array.isArray(t[o]) ? t[o].push(s) : t[o] = [t[o], s]
    }
    return t
}
function xf(e, t) {
    return (typeof t == "number" || typeof t == "boolean") && (t = String(t)),
    t ? Array.isArray(t) ? t.map(n=>`${Fr(e)}=${io(n)}`).join("&") : `${Fr(e)}=${io(t)}` : Fr(e)
}
function Rf(e) {
    return Object.keys(e).filter(t=>e[t] !== void 0).map(t=>xf(t, e[t])).filter(Boolean).join("&")
}
const Af = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/
  , Pf = /^[\s\w\0+.-]{2,}:([/\\]{2})?/
  , Sf = /^([/\\]\s*){2,}[^/\\]/;
function Nn(e, t={}) {
    return typeof t == "boolean" && (t = {
        acceptRelative: t
    }),
    t.strict ? Af.test(e) : Pf.test(e) || (t.acceptRelative ? Sf.test(e) : !1)
}
const Of = /^[\s\0]*(blob|data|javascript|vbscript):$/;
function Mf(e) {
    return !!e && Of.test(e)
}
const If = /\/$|\/\?/;
function ao(e="", t=!1) {
    return t ? If.test(e) : e.endsWith("/")
}
function qa(e="", t=!1) {
    if (!t)
        return (ao(e) ? e.slice(0, -1) : e) || "/";
    if (!ao(e, !0))
        return e || "/";
    const [n,...r] = e.split("?");
    return (n.slice(0, -1) || "/") + (r.length > 0 ? `?${r.join("?")}` : "")
}
function lo(e="", t=!1) {
    if (!t)
        return e.endsWith("/") ? e : e + "/";
    if (ao(e, !0))
        return e || "/";
    const [n,...r] = e.split("?");
    return n + "/" + (r.length > 0 ? `?${r.join("?")}` : "")
}
function jf(e="") {
    return e.startsWith("/")
}
function Ys(e="") {
    return jf(e) ? e : "/" + e
}
function $f(e, t) {
    if (za(t) || Nn(e))
        return e;
    const n = qa(t);
    return e.startsWith(n) ? e : Fn(n, e)
}
function Xs(e, t) {
    if (za(t))
        return e;
    const n = qa(t);
    if (!e.startsWith(n))
        return e;
    const r = e.slice(n.length);
    return r[0] === "/" ? r : "/" + r
}
function Va(e, t) {
    const n = xr(e)
      , r = {
        ...Tf(n.search),
        ...t
    };
    return n.search = Rf(r),
    Ff(n)
}
function za(e) {
    return !e || e === "/"
}
function Hf(e) {
    return e && e !== "/"
}
const Lf = /^\.?\//;
function Fn(e, ...t) {
    let n = e || "";
    for (const r of t.filter(o=>Hf(o)))
        if (n) {
            const o = r.replace(Lf, "");
            n = lo(n) + o
        } else
            n = r;
    return n
}
function Nf(e, t, n={}) {
    return n.trailingSlash || (e = lo(e),
    t = lo(t)),
    n.leadingSlash || (e = Ys(e),
    t = Ys(t)),
    n.encoding || (e = lr(e),
    t = lr(t)),
    e === t
}
function xr(e="", t) {
    const n = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/);
    if (n) {
        const [,f,d=""] = n;
        return {
            protocol: f,
            pathname: d,
            href: f + d,
            auth: "",
            host: "",
            search: "",
            hash: ""
        }
    }
    if (!Nn(e, {
        acceptRelative: !0
    }))
        return t ? xr(t + e) : Gs(e);
    const [,r="",o,s=""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || []
      , [,i="",a=""] = s.match(/([^#/?]*)(.*)?/) || []
      , {pathname: l, search: c, hash: u} = Gs(a.replace(/\/(?=[A-Za-z]:)/, ""));
    return {
        protocol: r,
        auth: o ? o.slice(0, Math.max(0, o.length - 1)) : "",
        host: i,
        pathname: l,
        search: c,
        hash: u
    }
}
function Gs(e="") {
    const [t="",n="",r=""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
        pathname: t,
        search: n,
        hash: r
    }
}
function Ff(e) {
    const t = e.pathname || ""
      , n = e.search ? (e.search.startsWith("?") ? "" : "?") + e.search : ""
      , r = e.hash || ""
      , o = e.auth ? e.auth + "@" : ""
      , s = e.host || "";
    return (e.protocol ? e.protocol + "//" : "") + o + s + t + n + r
}
class Bf extends Error {
    constructor(t, n) {
        super(t, n),
        this.name = "FetchError",
        n != null && n.cause && !this.cause && (this.cause = n.cause)
    }
}
function Df(e) {
    var l, c, u, f, d;
    const t = ((l = e.error) == null ? void 0 : l.message) || ((c = e.error) == null ? void 0 : c.toString()) || ""
      , n = ((u = e.request) == null ? void 0 : u.method) || ((f = e.options) == null ? void 0 : f.method) || "GET"
      , r = ((d = e.request) == null ? void 0 : d.url) || String(e.request) || "/"
      , o = `[${n}] ${JSON.stringify(r)}`
      , s = e.response ? `${e.response.status} ${e.response.statusText}` : "<no response>"
      , i = `${o}: ${s}${t ? ` ${t}` : ""}`
      , a = new Bf(i,e.error ? {
        cause: e.error
    } : void 0);
    for (const m of ["request", "options", "response"])
        Object.defineProperty(a, m, {
            get() {
                return e[m]
            }
        });
    for (const [m,v] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]])
        Object.defineProperty(a, m, {
            get() {
                return e.response && e.response[v]
            }
        });
    return a
}
const Uf = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function Zs(e="GET") {
    return Uf.has(e.toUpperCase())
}
function Kf(e) {
    if (e === void 0)
        return !1;
    const t = typeof e;
    return t === "string" || t === "number" || t === "boolean" || t === null ? !0 : t !== "object" ? !1 : Array.isArray(e) ? !0 : e.buffer ? !1 : e.constructor && e.constructor.name === "Object" || typeof e.toJSON == "function"
}
const Wf = new Set(["image/svg", "application/xml", "application/xhtml", "application/html"])
  , qf = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Vf(e="") {
    if (!e)
        return "json";
    const t = e.split(";").shift() || "";
    return qf.test(t) ? "json" : Wf.has(t) || t.startsWith("text/") ? "text" : "blob"
}
function zf(e, t, n=globalThis.Headers) {
    const r = {
        ...t,
        ...e
    };
    if (t != null && t.params && (e != null && e.params) && (r.params = {
        ...t == null ? void 0 : t.params,
        ...e == null ? void 0 : e.params
    }),
    t != null && t.query && (e != null && e.query) && (r.query = {
        ...t == null ? void 0 : t.query,
        ...e == null ? void 0 : e.query
    }),
    t != null && t.headers && (e != null && e.headers)) {
        r.headers = new n((t == null ? void 0 : t.headers) || {});
        for (const [o,s] of new n((e == null ? void 0 : e.headers) || {}))
            r.headers.set(o, s)
    }
    return r
}
const Jf = new Set([408, 409, 425, 429, 500, 502, 503, 504])
  , Qf = new Set([101, 204, 205, 304]);
function Ja(e={}) {
    const {fetch: t=globalThis.fetch, Headers: n=globalThis.Headers, AbortController: r=globalThis.AbortController} = e;
    async function o(a) {
        const l = a.error && a.error.name === "AbortError" && !a.options.timeout || !1;
        if (a.options.retry !== !1 && !l) {
            let u;
            typeof a.options.retry == "number" ? u = a.options.retry : u = Zs(a.options.method) ? 0 : 1;
            const f = a.response && a.response.status || 500;
            if (u > 0 && (Array.isArray(a.options.retryStatusCodes) ? a.options.retryStatusCodes.includes(f) : Jf.has(f))) {
                const d = a.options.retryDelay || 0;
                return d > 0 && await new Promise(m=>setTimeout(m, d)),
                s(a.request, {
                    ...a.options,
                    retry: u - 1,
                    timeout: a.options.timeout
                })
            }
        }
        const c = Df(a);
        throw Error.captureStackTrace && Error.captureStackTrace(c, s),
        c
    }
    const s = async function(l, c={}) {
        var d;
        const u = {
            request: l,
            options: zf(c, e.defaults, n),
            response: void 0,
            error: void 0
        };
        if (u.options.method = (d = u.options.method) == null ? void 0 : d.toUpperCase(),
        u.options.onRequest && await u.options.onRequest(u),
        typeof u.request == "string" && (u.options.baseURL && (u.request = $f(u.request, u.options.baseURL)),
        (u.options.query || u.options.params) && (u.request = Va(u.request, {
            ...u.options.params,
            ...u.options.query
        }))),
        u.options.body && Zs(u.options.method) && (Kf(u.options.body) ? (u.options.body = typeof u.options.body == "string" ? u.options.body : JSON.stringify(u.options.body),
        u.options.headers = new n(u.options.headers || {}),
        u.options.headers.has("content-type") || u.options.headers.set("content-type", "application/json"),
        u.options.headers.has("accept") || u.options.headers.set("accept", "application/json")) : ("pipeTo"in u.options.body && typeof u.options.body.pipeTo == "function" || typeof u.options.body.pipe == "function") && ("duplex"in u.options || (u.options.duplex = "half"))),
        !u.options.signal && u.options.timeout) {
            const m = new r;
            setTimeout(()=>m.abort(), u.options.timeout),
            u.options.signal = m.signal
        }
        try {
            u.response = await t(u.request, u.options)
        } catch (m) {
            return u.error = m,
            u.options.onRequestError && await u.options.onRequestError(u),
            await o(u)
        }
        if (u.response.body && !Qf.has(u.response.status) && u.options.method !== "HEAD") {
            const m = (u.options.parseResponse ? "json" : u.options.responseType) || Vf(u.response.headers.get("content-type") || "");
            switch (m) {
            case "json":
                {
                    const v = await u.response.text()
                      , T = u.options.parseResponse || ar;
                    u.response._data = T(v);
                    break
                }
            case "stream":
                {
                    u.response._data = u.response.body;
                    break
                }
            default:
                u.response._data = await u.response[m]()
            }
        }
        return u.options.onResponse && await u.options.onResponse(u),
        !u.options.ignoreResponseError && u.response.status >= 400 && u.response.status < 600 ? (u.options.onResponseError && await u.options.onResponseError(u),
        await o(u)) : u.response
    }
      , i = async function(l, c) {
        return (await s(l, c))._data
    };
    return i.raw = s,
    i.native = (...a)=>t(...a),
    i.create = (a={})=>Ja({
        ...e,
        defaults: {
            ...e.defaults,
            ...a
        }
    }),
    i
}
const es = function() {
    if (typeof globalThis < "u")
        return globalThis;
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("unable to locate global object")
}()
  , Yf = es.fetch || (()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!")))
  , Xf = es.Headers
  , Gf = es.AbortController
  , Zf = Ja({
    fetch: Yf,
    Headers: Xf,
    AbortController: Gf
})
  , ed = Zf
  , td = ()=>{
    var e;
    return ((e = window == null ? void 0 : window.__NUXT__) == null ? void 0 : e.config) || {}
}
  , cr = td().app
  , nd = ()=>cr.baseURL
  , rd = ()=>cr.buildAssetsDir
  , od = (...e)=>Fn(Qa(), rd(), ...e)
  , Qa = (...e)=>{
    const t = cr.cdnURL || cr.baseURL;
    return e.length ? Fn(t, ...e) : t
}
;
globalThis.__buildAssetsURL = od,
globalThis.__publicAssetsURL = Qa;
function co(e, t={}, n) {
    for (const r in e) {
        const o = e[r]
          , s = n ? `${n}:${r}` : r;
        typeof o == "object" && o !== null ? co(o, t, s) : typeof o == "function" && (t[s] = o)
    }
    return t
}
const sd = {
    run: e=>e()
}
  , id = ()=>sd
  , Ya = typeof console.createTask < "u" ? console.createTask : id;
function ad(e, t) {
    const n = t.shift()
      , r = Ya(n);
    return e.reduce((o,s)=>o.then(()=>r.run(()=>s(...t))), Promise.resolve())
}
function ld(e, t) {
    const n = t.shift()
      , r = Ya(n);
    return Promise.all(e.map(o=>r.run(()=>o(...t))))
}
function Br(e, t) {
    for (const n of [...e])
        n(t)
}
class cd {
    constructor() {
        this._hooks = {},
        this._before = void 0,
        this._after = void 0,
        this._deprecatedMessages = void 0,
        this._deprecatedHooks = {},
        this.hook = this.hook.bind(this),
        this.callHook = this.callHook.bind(this),
        this.callHookWith = this.callHookWith.bind(this)
    }
    hook(t, n, r={}) {
        if (!t || typeof n != "function")
            return ()=>{}
            ;
        const o = t;
        let s;
        for (; this._deprecatedHooks[t]; )
            s = this._deprecatedHooks[t],
            t = s.to;
        if (s && !r.allowDeprecated) {
            let i = s.message;
            i || (i = `${o} hook has been deprecated` + (s.to ? `, please use ${s.to}` : "")),
            this._deprecatedMessages || (this._deprecatedMessages = new Set),
            this._deprecatedMessages.has(i) || (console.warn(i),
            this._deprecatedMessages.add(i))
        }
        if (!n.name)
            try {
                Object.defineProperty(n, "name", {
                    get: ()=>"_" + t.replace(/\W+/g, "_") + "_hook_cb",
                    configurable: !0
                })
            } catch {}
        return this._hooks[t] = this._hooks[t] || [],
        this._hooks[t].push(n),
        ()=>{
            n && (this.removeHook(t, n),
            n = void 0)
        }
    }
    hookOnce(t, n) {
        let r, o = (...s)=>(typeof r == "function" && r(),
        r = void 0,
        o = void 0,
        n(...s));
        return r = this.hook(t, o),
        r
    }
    removeHook(t, n) {
        if (this._hooks[t]) {
            const r = this._hooks[t].indexOf(n);
            r !== -1 && this._hooks[t].splice(r, 1),
            this._hooks[t].length === 0 && delete this._hooks[t]
        }
    }
    deprecateHook(t, n) {
        this._deprecatedHooks[t] = typeof n == "string" ? {
            to: n
        } : n;
        const r = this._hooks[t] || [];
        delete this._hooks[t];
        for (const o of r)
            this.hook(t, o)
    }
    deprecateHooks(t) {
        Object.assign(this._deprecatedHooks, t);
        for (const n in t)
            this.deprecateHook(n, t[n])
    }
    addHooks(t) {
        const n = co(t)
          , r = Object.keys(n).map(o=>this.hook(o, n[o]));
        return ()=>{
            for (const o of r.splice(0, r.length))
                o()
        }
    }
    removeHooks(t) {
        const n = co(t);
        for (const r in n)
            this.removeHook(r, n[r])
    }
    removeAllHooks() {
        for (const t in this._hooks)
            delete this._hooks[t]
    }
    callHook(t, ...n) {
        return n.unshift(t),
        this.callHookWith(ad, t, ...n)
    }
    callHookParallel(t, ...n) {
        return n.unshift(t),
        this.callHookWith(ld, t, ...n)
    }
    callHookWith(t, n, ...r) {
        const o = this._before || this._after ? {
            name: n,
            args: r,
            context: {}
        } : void 0;
        this._before && Br(this._before, o);
        const s = t(n in this._hooks ? [...this._hooks[n]] : [], r);
        return s instanceof Promise ? s.finally(()=>{
            this._after && o && Br(this._after, o)
        }
        ) : (this._after && o && Br(this._after, o),
        s)
    }
    beforeEach(t) {
        return this._before = this._before || [],
        this._before.push(t),
        ()=>{
            if (this._before !== void 0) {
                const n = this._before.indexOf(t);
                n !== -1 && this._before.splice(n, 1)
            }
        }
    }
    afterEach(t) {
        return this._after = this._after || [],
        this._after.push(t),
        ()=>{
            if (this._after !== void 0) {
                const n = this._after.indexOf(t);
                n !== -1 && this._after.splice(n, 1)
            }
        }
    }
}
function Xa() {
    return new cd
}
function ud(e={}) {
    let t, n = !1;
    const r = i=>{
        if (t && t !== i)
            throw new Error("Context conflict")
    }
    ;
    let o;
    if (e.asyncContext) {
        const i = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
        i ? o = new i : console.warn("[unctx] `AsyncLocalStorage` is not provided.")
    }
    const s = ()=>{
        if (o && t === void 0) {
            const i = o.getStore();
            if (i !== void 0)
                return i
        }
        return t
    }
    ;
    return {
        use: ()=>{
            const i = s();
            if (i === void 0)
                throw new Error("Context is not available");
            return i
        }
        ,
        tryUse: ()=>s(),
        set: (i,a)=>{
            a || r(i),
            t = i,
            n = !0
        }
        ,
        unset: ()=>{
            t = void 0,
            n = !1
        }
        ,
        call: (i,a)=>{
            r(i),
            t = i;
            try {
                return o ? o.run(i, a) : a()
            } finally {
                n || (t = void 0)
            }
        }
        ,
        async callAsync(i, a) {
            t = i;
            const l = ()=>{
                t = i
            }
              , c = ()=>t === i ? l : void 0;
            uo.add(c);
            try {
                const u = o ? o.run(i, a) : a();
                return n || (t = void 0),
                await u
            } finally {
                uo.delete(c)
            }
        }
    }
}
function fd(e={}) {
    const t = {};
    return {
        get(n, r={}) {
            return t[n] || (t[n] = ud({
                ...e,
                ...r
            })),
            t[n],
            t[n]
        }
    }
}
const ur = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : typeof window < "u" ? window : {}
  , ei = "__unctx__"
  , dd = ur[ei] || (ur[ei] = fd())
  , pd = (e,t={})=>dd.get(e, t)
  , ti = "__unctx_async_handlers__"
  , uo = ur[ti] || (ur[ti] = new Set);
function fr(e) {
    const t = [];
    for (const o of uo) {
        const s = o();
        s && t.push(s)
    }
    const n = ()=>{
        for (const o of t)
            o()
    }
    ;
    let r = e();
    return r && typeof r == "object" && "catch"in r && (r = r.catch(o=>{
        throw n(),
        o
    }
    )),
    [r, n]
}
const Ga = pd("nuxt-app", {
    asyncContext: !1
})
  , hd = "__nuxt_plugin";
function md(e) {
    let t = 0;
    const n = {
        provide: void 0,
        globalName: "nuxt",
        versions: {
            get nuxt() {
                return "3.7.4"
            },
            get vue() {
                return n.vueApp.version
            }
        },
        payload: ct({
            data: {},
            state: {},
            _errors: {},
            ...window.__NUXT__ ?? {}
        }),
        static: {
            data: {}
        },
        runWithContext: o=>bd(n, o),
        isHydrating: !0,
        deferHydration() {
            if (!n.isHydrating)
                return ()=>{}
                ;
            t++;
            let o = !1;
            return ()=>{
                if (!o && (o = !0,
                t--,
                t === 0))
                    return n.isHydrating = !1,
                    n.callHook("app:suspense:resolve")
            }
        },
        _asyncDataPromises: {},
        _asyncData: {},
        _payloadRevivers: {},
        ...e
    };
    n.hooks = Xa(),
    n.hook = n.hooks.hook,
    n.callHook = n.hooks.callHook,
    n.provide = (o,s)=>{
        const i = "$" + o;
        Qn(n, i, s),
        Qn(n.vueApp.config.globalProperties, i, s)
    }
    ,
    Qn(n.vueApp, "$nuxt", n),
    Qn(n.vueApp.config.globalProperties, "$nuxt", n);
    {
        window.addEventListener("nuxt.preloadError", s=>{
            n.callHook("app:chunkError", {
                error: s.payload
            })
        }
        ),
        window.useNuxtApp = window.useNuxtApp || he;
        const o = n.hook("app:error", (...s)=>{
            console.error("[nuxt] error caught during app initialization", ...s)
        }
        );
        n.hook("app:mounted", o)
    }
    const r = ct(n.payload.config);
    return n.provide("config", r),
    n
}
async function gd(e, t) {
    if (t.hooks && e.hooks.addHooks(t.hooks),
    typeof t == "function") {
        const {provide: n} = await e.runWithContext(()=>t(e)) || {};
        if (n && typeof n == "object")
            for (const r in n)
                e.provide(r, n[r])
    }
}
async function yd(e, t) {
    const n = []
      , r = [];
    for (const o of t) {
        const s = gd(e, o);
        o.parallel ? n.push(s.catch(i=>r.push(i))) : await s
    }
    if (await Promise.all(n),
    r.length)
        throw r[0]
}
/*! @__NO_SIDE_EFFECTS__ */
function dt(e) {
    return typeof e == "function" ? e : (delete e.name,
    Object.assign(e.setup || (()=>{}
    ), e, {
        [hd]: !0
    }))
}
function bd(e, t, n) {
    const r = ()=>n ? t(...n) : t();
    return Ga.set(e),
    e.vueApp.runWithContext(r)
}
/*! @__NO_SIDE_EFFECTS__ */
function he() {
    var t;
    let e;
    if (ka() && (e = (t = Xo()) == null ? void 0 : t.appContext.app.$nuxt),
    e = e || Ga.tryUse(),
    !e)
        throw new Error("[nuxt] instance unavailable");
    return e
}
/*! @__NO_SIDE_EFFECTS__ */
function ts() {
    return he().$config
}
function Qn(e, t, n) {
    Object.defineProperty(e, t, {
        get: ()=>n
    })
}
const _d = "modulepreload"
  , vd = function(e, t) {
    return e[0] === "." ? new URL(e,t).href : e
}
  , ni = {}
  , wd = function(t, n, r) {
    if (!n || n.length === 0)
        return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(n.map(s=>{
        if (s = vd(s, r),
        s in ni)
            return;
        ni[s] = !0;
        const i = s.endsWith(".css")
          , a = i ? '[rel="stylesheet"]' : "";
        if (!!r)
            for (let u = o.length - 1; u >= 0; u--) {
                const f = o[u];
                if (f.href === s && (!i || f.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${s}"]${a}`))
            return;
        const c = document.createElement("link");
        if (c.rel = i ? "stylesheet" : _d,
        i || (c.as = "script",
        c.crossOrigin = ""),
        c.href = s,
        document.head.appendChild(c),
        i)
            return new Promise((u,f)=>{
                c.addEventListener("load", u),
                c.addEventListener("error", ()=>f(new Error(`Unable to preload CSS for ${s}`)))
            }
            )
    }
    )).then(()=>t()).catch(s=>{
        const i = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (i.payload = s,
        window.dispatchEvent(i),
        !i.defaultPrevented)
            throw s
    }
    )
}
  , vt = (...e)=>wd(...e).catch(t=>{
    const n = new Event("nuxt.preloadError");
    throw n.payload = t,
    window.dispatchEvent(n),
    t
}
)
  , Ed = -1
  , Cd = -2
  , kd = -3
  , Td = -4
  , xd = -5
  , Rd = -6;
function Ad(e, t) {
    return Pd(JSON.parse(e), t)
}
function Pd(e, t) {
    if (typeof e == "number")
        return o(e, !0);
    if (!Array.isArray(e) || e.length === 0)
        throw new Error("Invalid input");
    const n = e
      , r = Array(n.length);
    function o(s, i=!1) {
        if (s === Ed)
            return;
        if (s === kd)
            return NaN;
        if (s === Td)
            return 1 / 0;
        if (s === xd)
            return -1 / 0;
        if (s === Rd)
            return -0;
        if (i)
            throw new Error("Invalid input");
        if (s in r)
            return r[s];
        const a = n[s];
        if (!a || typeof a != "object")
            r[s] = a;
        else if (Array.isArray(a))
            if (typeof a[0] == "string") {
                const l = a[0]
                  , c = t == null ? void 0 : t[l];
                if (c)
                    return r[s] = c(o(a[1]));
                switch (l) {
                case "Date":
                    r[s] = new Date(a[1]);
                    break;
                case "Set":
                    const u = new Set;
                    r[s] = u;
                    for (let m = 1; m < a.length; m += 1)
                        u.add(o(a[m]));
                    break;
                case "Map":
                    const f = new Map;
                    r[s] = f;
                    for (let m = 1; m < a.length; m += 2)
                        f.set(o(a[m]), o(a[m + 1]));
                    break;
                case "RegExp":
                    r[s] = new RegExp(a[1],a[2]);
                    break;
                case "Object":
                    r[s] = Object(a[1]);
                    break;
                case "BigInt":
                    r[s] = BigInt(a[1]);
                    break;
                case "null":
                    const d = Object.create(null);
                    r[s] = d;
                    for (let m = 1; m < a.length; m += 2)
                        d[a[m]] = o(a[m + 1]);
                    break;
                default:
                    throw new Error(`Unknown type ${l}`)
                }
            } else {
                const l = new Array(a.length);
                r[s] = l;
                for (let c = 0; c < a.length; c += 1) {
                    const u = a[c];
                    u !== Cd && (l[c] = o(u))
                }
            }
        else {
            const l = {};
            r[s] = l;
            for (const c in a) {
                const u = a[c];
                l[c] = o(u)
            }
        }
        return r[s]
    }
    return o(0)
}
function Sd(e) {
    return Array.isArray(e) ? e : [e]
}
const Od = ["title", "titleTemplate", "script", "style", "noscript"]
  , Gn = ["base", "meta", "link", "style", "script", "noscript"]
  , Md = ["title", "titleTemplate", "templateParams", "base", "htmlAttrs", "bodyAttrs", "meta", "link", "style", "script", "noscript"]
  , Id = ["base", "title", "titleTemplate", "bodyAttrs", "htmlAttrs", "templateParams"]
  , Za = ["tagPosition", "tagPriority", "tagDuplicateStrategy", "innerHTML", "textContent", "processTemplateParams"]
  , jd = typeof window < "u";
function el(e) {
    let t = 9;
    for (let n = 0; n < e.length; )
        t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
    return ((t ^ t >>> 9) + 65536).toString(16).substring(1, 8).toLowerCase()
}
function ri(e) {
    return e._h || el(e._d ? e._d : `${e.tag}:${e.textContent || e.innerHTML || ""}:${Object.entries(e.props).map(([t,n])=>`${t}:${String(n)}`).join(",")}`)
}
function tl(e, t) {
    const {props: n, tag: r} = e;
    if (Id.includes(r))
        return r;
    if (r === "link" && n.rel === "canonical")
        return "canonical";
    if (n.charset)
        return "charset";
    const o = ["id"];
    r === "meta" && o.push("name", "property", "http-equiv");
    for (const s of o)
        if (typeof n[s] < "u") {
            const i = String(n[s]);
            return t && !t(i) ? !1 : `${r}:${s}:${i}`
        }
    return !1
}
function oi(e, t) {
    return e == null ? t || null : typeof e == "function" ? e(t) : e
}
function nl(e, t) {
    const n = []
      , r = t.resolveKeyData || (s=>s.key)
      , o = t.resolveValueData || (s=>s.value);
    for (const [s,i] of Object.entries(e))
        n.push(...(Array.isArray(i) ? i : [i]).map(a=>{
            const l = {
                key: s,
                value: a
            }
              , c = o(l);
            return typeof c == "object" ? nl(c, t) : Array.isArray(c) ? c : {
                [typeof t.key == "function" ? t.key(l) : t.key]: r(l),
                [typeof t.value == "function" ? t.value(l) : t.value]: c
            }
        }
        ).flat());
    return n
}
function rl(e, t) {
    return Object.entries(e).map(([n,r])=>{
        if (typeof r == "object" && (r = rl(r, t)),
        t.resolve) {
            const o = t.resolve({
                key: n,
                value: r
            });
            if (o)
                return o
        }
        return typeof r == "number" && (r = r.toString()),
        typeof r == "string" && t.wrapValue && (r = r.replace(new RegExp(t.wrapValue,"g"), `\\${t.wrapValue}`),
        r = `${t.wrapValue}${r}${t.wrapValue}`),
        `${n}${t.keyValueSeparator || ""}${r}`
    }
    ).join(t.entrySeparator || "")
}
const Re = e=>({
    keyValue: e,
    metaKey: "property"
})
  , Dr = e=>({
    keyValue: e
})
  , ns = {
    appleItunesApp: {
        unpack: {
            entrySeparator: ", ",
            resolve({key: e, value: t}) {
                return `${it(e)}=${t}`
            }
        }
    },
    articleExpirationTime: Re("article:expiration_time"),
    articleModifiedTime: Re("article:modified_time"),
    articlePublishedTime: Re("article:published_time"),
    bookReleaseDate: Re("book:release_date"),
    charset: {
        metaKey: "charset"
    },
    contentSecurityPolicy: {
        unpack: {
            entrySeparator: "; ",
            resolve({key: e, value: t}) {
                return `${it(e)} ${t}`
            }
        },
        metaKey: "http-equiv"
    },
    contentType: {
        metaKey: "http-equiv"
    },
    defaultStyle: {
        metaKey: "http-equiv"
    },
    fbAppId: Re("fb:app_id"),
    msapplicationConfig: Dr("msapplication-Config"),
    msapplicationTileColor: Dr("msapplication-TileColor"),
    msapplicationTileImage: Dr("msapplication-TileImage"),
    ogAudioSecureUrl: Re("og:audio:secure_url"),
    ogAudioUrl: Re("og:audio"),
    ogImageSecureUrl: Re("og:image:secure_url"),
    ogImageUrl: Re("og:image"),
    ogSiteName: Re("og:site_name"),
    ogVideoSecureUrl: Re("og:video:secure_url"),
    ogVideoUrl: Re("og:video"),
    profileFirstName: Re("profile:first_name"),
    profileLastName: Re("profile:last_name"),
    profileUsername: Re("profile:username"),
    refresh: {
        metaKey: "http-equiv",
        unpack: {
            entrySeparator: ";",
            keyValueSeparator: "=",
            resolve({key: e, value: t}) {
                if (e === "seconds")
                    return `${t}`
            }
        }
    },
    robots: {
        unpack: {
            entrySeparator: ", ",
            resolve({key: e, value: t}) {
                return typeof t == "boolean" ? `${it(e)}` : `${it(e)}:${t}`
            }
        }
    },
    xUaCompatible: {
        metaKey: "http-equiv"
    }
}
  , ol = ["og", "book", "article", "profile"];
function sl(e) {
    var n;
    const t = it(e).split(":")[0];
    return ol.includes(t) ? "property" : ((n = ns[e]) == null ? void 0 : n.metaKey) || "name"
}
function $d(e) {
    var t;
    return ((t = ns[e]) == null ? void 0 : t.keyValue) || it(e)
}
function it(e) {
    const t = e.replace(/([A-Z])/g, "-$1").toLowerCase()
      , n = t.split("-")[0];
    return ol.includes(n) || n === "twitter" ? e.replace(/([A-Z])/g, ":$1").toLowerCase() : t
}
function fo(e) {
    if (Array.isArray(e))
        return e.map(n=>fo(n));
    if (typeof e != "object" || Array.isArray(e))
        return e;
    const t = {};
    for (const [n,r] of Object.entries(e))
        t[it(n)] = fo(r);
    return t
}
function Hd(e, t) {
    const n = ns[t];
    return t === "refresh" ? `${e.seconds};url=${e.url}` : rl(fo(e), {
        entrySeparator: ", ",
        resolve({value: r, key: o}) {
            if (r === null)
                return "";
            if (typeof r == "boolean")
                return `${o}`
        },
        ...n == null ? void 0 : n.unpack
    })
}
const il = ["og:image", "og:video", "og:audio", "twitter:image"];
function al(e) {
    const t = {};
    return Object.entries(e).forEach(([n,r])=>{
        String(r) !== "false" && n && (t[n] = r)
    }
    ),
    t
}
function si(e, t) {
    const n = al(t)
      , r = it(e)
      , o = sl(r);
    if (il.includes(r)) {
        const s = {};
        return Object.entries(n).forEach(([a,l])=>{
            s[`${e}${a === "url" ? "" : `${a.charAt(0).toUpperCase()}${a.slice(1)}`}`] = l
        }
        ),
        ll(s).sort((a,l)=>{
            var c, u;
            return (((c = a[o]) == null ? void 0 : c.length) || 0) - (((u = l[o]) == null ? void 0 : u.length) || 0)
        }
        )
    }
    return [{
        [o]: r,
        ...n
    }]
}
function ll(e) {
    const t = []
      , n = {};
    Object.entries(e).forEach(([o,s])=>{
        if (!Array.isArray(s)) {
            if (typeof s == "object" && s) {
                if (il.includes(it(o))) {
                    t.push(...si(o, s));
                    return
                }
                n[o] = al(s)
            } else
                n[o] = s;
            return
        }
        s.forEach(i=>{
            t.push(...typeof i == "string" ? ll({
                [o]: i
            }) : si(o, i))
        }
        )
    }
    );
    const r = nl(n, {
        key({key: o}) {
            return sl(o)
        },
        value({key: o}) {
            return o === "charset" ? "charset" : "content"
        },
        resolveKeyData({key: o}) {
            return $d(o)
        },
        resolveValueData({value: o, key: s}) {
            return o === null ? "_null" : typeof o == "object" ? Hd(o, s) : typeof o == "number" ? o.toString() : o
        }
    });
    return [...t, ...r].map(o=>(o.content === "_null" && (o.content = null),
    o))
}
async function Ld(e, t, n) {
    const r = {
        tag: e,
        props: await cl(typeof t == "object" && typeof t != "function" && !(t instanceof Promise) ? {
            ...t
        } : {
            [["script", "noscript", "style"].includes(e) ? "innerHTML" : "textContent"]: t
        }, ["templateParams", "titleTemplate"].includes(e))
    };
    return Za.forEach(o=>{
        const s = typeof r.props[o] < "u" ? r.props[o] : n[o];
        typeof s < "u" && ((!["innerHTML", "textContent"].includes(o) || Od.includes(r.tag)) && (r[o] = s),
        delete r.props[o])
    }
    ),
    r.props.body && (r.tagPosition = "bodyClose",
    delete r.props.body),
    r.props.children && (r.innerHTML = r.props.children,
    delete r.props.children),
    r.tag === "script" && (typeof r.innerHTML == "object" && (r.innerHTML = JSON.stringify(r.innerHTML),
    r.props.type = r.props.type || "application/json"),
    r.innerHTML && ["application/ld+json", "application/json"].includes(r.props.type) && (r.innerHTML = r.innerHTML.replace(/</g, "\\u003C"))),
    Array.isArray(r.props.content) ? r.props.content.map(o=>({
        ...r,
        props: {
            ...r.props,
            content: o
        }
    })) : r
}
function Nd(e) {
    return typeof e == "object" && !Array.isArray(e) && (e = Object.keys(e).filter(t=>e[t])),
    (Array.isArray(e) ? e.join(" ") : e).split(" ").filter(t=>t.trim()).filter(Boolean).join(" ")
}
async function cl(e, t) {
    for (const n of Object.keys(e)) {
        if (n === "class") {
            e[n] = Nd(e[n]);
            continue
        }
        if (e[n]instanceof Promise && (e[n] = await e[n]),
        !t && !Za.includes(n)) {
            const r = String(e[n])
              , o = n.startsWith("data-");
            r === "true" || r === "" ? e[n] = o ? "true" : !0 : e[n] || (o && r === "false" ? e[n] = "false" : delete e[n])
        }
    }
    return e
}
const Fd = 10;
async function Bd(e) {
    const t = [];
    return Object.entries(e.resolvedInput).filter(([n,r])=>typeof r < "u" && Md.includes(n)).forEach(([n,r])=>{
        const o = Sd(r);
        t.push(...o.map(s=>Ld(n, s, e)).flat())
    }
    ),
    (await Promise.all(t)).flat().filter(Boolean).map((n,r)=>(n._e = e._i,
    e.mode && (n._m = e.mode),
    n._p = (e._i << Fd) + r,
    n))
}
const ii = {
    base: -10,
    title: 10
}
  , ai = {
    critical: -80,
    high: -10,
    low: 20
};
function dr(e) {
    let t = 100;
    const n = e.tagPriority;
    return typeof n == "number" ? n : (e.tag === "meta" ? (e.props["http-equiv"] === "content-security-policy" && (t = -30),
    e.props.charset && (t = -20),
    e.props.name === "viewport" && (t = -15)) : e.tag === "link" && e.props.rel === "preconnect" ? t = 20 : e.tag in ii && (t = ii[e.tag]),
    typeof n == "string" && n in ai ? t + ai[n] : t)
}
const Dd = [{
    prefix: "before:",
    offset: -1
}, {
    prefix: "after:",
    offset: 1
}]
  , yt = "%separator";
function Pt(e, t, n) {
    if (typeof e != "string" || !e.includes("%"))
        return e;
    function r(i) {
        let a;
        return ["s", "pageTitle"].includes(i) ? a = t.pageTitle : i.includes(".") ? a = i.split(".").reduce((l,c)=>l && l[c] || void 0, t) : a = t[i],
        typeof a < "u" ? (a || "").replace(/"/g, '\\"') : !1
    }
    let o = e;
    try {
        o = decodeURI(e)
    } catch {}
    return (o.match(/%(\w+\.+\w+)|%(\w+)/g) || []).sort().reverse().forEach(i=>{
        const a = r(i.slice(1));
        typeof a == "string" && (e = e.replace(new RegExp(`\\${i}(\\W|$)`,"g"), (l,c)=>`${a}${c}`).trim())
    }
    ),
    e.includes(yt) && (e.endsWith(yt) && (e = e.slice(0, -yt.length).trim()),
    e.startsWith(yt) && (e = e.slice(yt.length).trim()),
    e = e.replace(new RegExp(`\\${yt}\\s*\\${yt}`,"g"), yt),
    e = Pt(e, {
        separator: n
    }, n)),
    e
}
async function Ud(e) {
    const t = {
        tag: e.tagName.toLowerCase(),
        props: await cl(e.getAttributeNames().reduce((n,r)=>({
            ...n,
            [r]: e.getAttribute(r)
        }), {})),
        innerHTML: e.innerHTML
    };
    return t._d = tl(t),
    t
}
async function ul(e, t={}) {
    var u;
    const n = t.document || e.resolvedOptions.document;
    if (!n)
        return;
    const r = {
        shouldRender: e.dirty,
        tags: []
    };
    if (await e.hooks.callHook("dom:beforeRender", r),
    !r.shouldRender)
        return;
    const o = (await e.resolveTags()).map(f=>({
        tag: f,
        id: Gn.includes(f.tag) ? ri(f) : f.tag,
        shouldRender: !0
    }));
    let s = e._dom;
    if (!s) {
        s = {
            elMap: {
                htmlAttrs: n.documentElement,
                bodyAttrs: n.body
            }
        };
        for (const f of ["body", "head"]) {
            const d = (u = n == null ? void 0 : n[f]) == null ? void 0 : u.children;
            for (const m of [...d].filter(v=>Gn.includes(v.tagName.toLowerCase())))
                s.elMap[m.getAttribute("data-hid") || ri(await Ud(m))] = m
        }
    }
    s.pendingSideEffects = {
        ...s.sideEffects || {}
    },
    s.sideEffects = {};
    function i(f, d, m) {
        const v = `${f}:${d}`;
        s.sideEffects[v] = m,
        delete s.pendingSideEffects[v]
    }
    function a({id: f, $el: d, tag: m}) {
        const v = m.tag.endsWith("Attrs");
        s.elMap[f] = d,
        v || (["textContent", "innerHTML"].forEach(T=>{
            m[T] && m[T] !== d[T] && (d[T] = m[T])
        }
        ),
        i(f, "el", ()=>{
            s.elMap[f].remove(),
            delete s.elMap[f]
        }
        )),
        Object.entries(m.props).forEach(([T,I])=>{
            const b = `attr:${T}`;
            if (T === "class")
                for (const g of (I || "").split(" ").filter(Boolean))
                    v && i(f, `${b}:${g}`, ()=>d.classList.remove(g)),
                    !d.classList.contains(g) && d.classList.add(g);
            else
                d.getAttribute(T) !== I && d.setAttribute(T, I === !0 ? "" : String(I)),
                v && i(f, b, ()=>d.removeAttribute(T))
        }
        )
    }
    const l = []
      , c = {
        bodyClose: void 0,
        bodyOpen: void 0,
        head: void 0
    };
    for (const f of o) {
        const {tag: d, shouldRender: m, id: v} = f;
        if (m) {
            if (d.tag === "title") {
                n.title = d.textContent;
                continue
            }
            f.$el = f.$el || s.elMap[v],
            f.$el ? a(f) : Gn.includes(d.tag) && l.push(f)
        }
    }
    for (const f of l) {
        const d = f.tag.tagPosition || "head";
        f.$el = n.createElement(f.tag.tag),
        a(f),
        c[d] = c[d] || n.createDocumentFragment(),
        c[d].appendChild(f.$el)
    }
    for (const f of o)
        await e.hooks.callHook("dom:renderTag", f, n, i);
    c.head && n.head.appendChild(c.head),
    c.bodyOpen && n.body.insertBefore(c.bodyOpen, n.body.firstChild),
    c.bodyClose && n.body.appendChild(c.bodyClose),
    Object.values(s.pendingSideEffects).forEach(f=>f()),
    e._dom = s,
    e.dirty = !1,
    await e.hooks.callHook("dom:rendered", {
        renders: o
    })
}
async function Kd(e, t={}) {
    const n = t.delayFn || (r=>setTimeout(r, 10));
    return e._domUpdatePromise = e._domUpdatePromise || new Promise(r=>n(async()=>{
        await ul(e, t),
        delete e._domUpdatePromise,
        r()
    }
    ))
}
function Wd(e) {
    return t=>{
        var r, o;
        const n = ((o = (r = t.resolvedOptions.document) == null ? void 0 : r.head.querySelector('script[id="unhead:payload"]')) == null ? void 0 : o.innerHTML) || !1;
        return n && t.push(JSON.parse(n)),
        {
            mode: "client",
            hooks: {
                "entries:updated": function(s) {
                    Kd(s, e)
                }
            }
        }
    }
}
const qd = ["templateParams", "htmlAttrs", "bodyAttrs"]
  , Vd = {
    hooks: {
        "tag:normalise": function({tag: e}) {
            ["hid", "vmid", "key"].forEach(r=>{
                e.props[r] && (e.key = e.props[r],
                delete e.props[r])
            }
            );
            const n = tl(e) || (e.key ? `${e.tag}:${e.key}` : !1);
            n && (e._d = n)
        },
        "tags:resolve": function(e) {
            const t = {};
            e.tags.forEach(r=>{
                const o = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p
                  , s = t[o];
                if (s) {
                    let a = r == null ? void 0 : r.tagDuplicateStrategy;
                    if (!a && qd.includes(r.tag) && (a = "merge"),
                    a === "merge") {
                        const l = s.props;
                        ["class", "style"].forEach(c=>{
                            r.props[c] && l[c] && (c === "style" && !l[c].endsWith(";") && (l[c] += ";"),
                            r.props[c] = `${l[c]} ${r.props[c]}`)
                        }
                        ),
                        t[o].props = {
                            ...l,
                            ...r.props
                        };
                        return
                    } else if (r._e === s._e) {
                        s._duped = s._duped || [],
                        r._d = `${s._d}:${s._duped.length + 1}`,
                        s._duped.push(r);
                        return
                    } else if (dr(r) > dr(s))
                        return
                }
                const i = Object.keys(r.props).length + (r.innerHTML ? 1 : 0) + (r.textContent ? 1 : 0);
                if (Gn.includes(r.tag) && i === 0) {
                    delete t[o];
                    return
                }
                t[o] = r
            }
            );
            const n = [];
            Object.values(t).forEach(r=>{
                const o = r._duped;
                delete r._duped,
                n.push(r),
                o && n.push(...o)
            }
            ),
            e.tags = n,
            e.tags = e.tags.filter(r=>!(r.tag === "meta" && (r.props.name || r.props.property) && !r.props.content))
        }
    }
}
  , zd = {
    mode: "server",
    hooks: {
        "tags:resolve": function(e) {
            const t = {};
            e.tags.filter(n=>["titleTemplate", "templateParams", "title"].includes(n.tag) && n._m === "server").forEach(n=>{
                t[n.tag] = n.tag.startsWith("title") ? n.textContent : n.props
            }
            ),
            Object.keys(t).length && e.tags.push({
                tag: "script",
                innerHTML: JSON.stringify(t),
                props: {
                    id: "unhead:payload",
                    type: "application/json"
                }
            })
        }
    }
}
  , li = ["script", "link", "bodyAttrs"];
function ci(e) {
    const t = {}
      , n = {};
    return Object.entries(e.props).forEach(([r,o])=>{
        r.startsWith("on") && typeof o == "function" ? n[r] = o : t[r] = o
    }
    ),
    {
        props: t,
        eventHandlers: n
    }
}
const Jd = {
    hooks: {
        "ssr:render": function(e) {
            e.tags = e.tags.map(t=>(!li.includes(t.tag) || !Object.entries(t.props).find(([n,r])=>n.startsWith("on") && typeof r == "function") || (t.props = ci(t).props),
            t))
        },
        "tags:resolve": function(e) {
            e.tags = e.tags.map(t=>{
                if (!li.includes(t.tag))
                    return t;
                const {props: n, eventHandlers: r} = ci(t);
                return Object.keys(r).length && (t.props = n,
                t._eventHandlers = r),
                t
            }
            )
        },
        "dom:renderTag": function(e, t, n) {
            if (!e.tag._eventHandlers)
                return;
            const r = e.tag.tag === "bodyAttrs" ? t.defaultView : e.$el;
            Object.entries(e.tag._eventHandlers).forEach(([o,s])=>{
                const i = `${e.tag._d || e.tag._p}:${o}`
                  , a = o.slice(2).toLowerCase()
                  , l = `data-h-${a}`;
                if (n(e.id, i, ()=>{}
                ),
                e.$el.hasAttribute(l))
                    return;
                const c = s;
                e.$el.setAttribute(l, ""),
                r.addEventListener(a, c),
                e.entry && n(e.id, i, ()=>{
                    r.removeEventListener(a, c),
                    e.$el.removeAttribute(l)
                }
                )
            }
            )
        }
    }
}
  , Qd = ["link", "style", "script", "noscript"]
  , Yd = {
    hooks: {
        "tag:normalise": ({tag: e})=>{
            e.key && Qd.includes(e.tag) && (e.props["data-hid"] = e._h = el(e.key))
        }
    }
}
  , Xd = {
    hooks: {
        "tags:resolve": e=>{
            const t = n=>{
                var r;
                return (r = e.tags.find(o=>o._d === n)) == null ? void 0 : r._p
            }
            ;
            for (const {prefix: n, offset: r} of Dd)
                for (const o of e.tags.filter(s=>typeof s.tagPriority == "string" && s.tagPriority.startsWith(n))) {
                    const s = t(o.tagPriority.replace(n, ""));
                    typeof s < "u" && (o._p = s + r)
                }
            e.tags.sort((n,r)=>n._p - r._p).sort((n,r)=>dr(n) - dr(r))
        }
    }
}
  , Gd = {
    hooks: {
        "tags:resolve": e=>{
            var i;
            const {tags: t} = e
              , n = (i = t.find(a=>a.tag === "title")) == null ? void 0 : i.textContent
              , r = t.findIndex(a=>a.tag === "templateParams")
              , o = r !== -1 ? t[r].props : {}
              , s = o.separator || "|";
            delete o.separator,
            o.pageTitle = Pt(o.pageTitle || n || "", o, s);
            for (const a of t)
                a.processTemplateParams !== !1 && (["titleTemplate", "title"].includes(a.tag) && typeof a.textContent == "string" ? a.textContent = Pt(a.textContent, o, s) : a.tag === "meta" && typeof a.props.content == "string" ? a.props.content = Pt(a.props.content, o, s) : a.tag === "link" && typeof a.props.href == "string" ? a.props.href = Pt(a.props.href, o, s) : a.processTemplateParams === !0 && (a.innerHTML ? a.innerHTML = Pt(a.innerHTML, o, s) : a.textContent && (a.textContent = Pt(a.textContent, o, s))));
            e.tags = t.filter(a=>a.tag !== "templateParams")
        }
    }
}
  , Zd = {
    hooks: {
        "tags:resolve": e=>{
            const {tags: t} = e;
            let n = t.findIndex(o=>o.tag === "titleTemplate");
            const r = t.findIndex(o=>o.tag === "title");
            if (r !== -1 && n !== -1) {
                const o = oi(t[n].textContent, t[r].textContent);
                o !== null ? t[r].textContent = o || t[r].textContent : delete t[r]
            } else if (n !== -1) {
                const o = oi(t[n].textContent);
                o !== null && (t[n].textContent = o,
                t[n].tag = "title",
                n = -1)
            }
            n !== -1 && delete t[n],
            e.tags = t.filter(Boolean)
        }
    }
};
let fl;
function ep(e={}) {
    const t = tp(e);
    return t.use(Wd()),
    fl = t
}
function ui(e, t) {
    return !e || e === "server" && t || e === "client" && !t
}
function tp(e={}) {
    const t = Xa();
    t.addHooks(e.hooks || {}),
    e.document = e.document || (jd ? document : void 0);
    const n = !e.document;
    e.plugins = [Vd, zd, Jd, Yd, Xd, Gd, Zd, ...(e == null ? void 0 : e.plugins) || []];
    const r = ()=>{
        i.dirty = !0,
        t.callHook("entries:updated", i)
    }
    ;
    let o = 0
      , s = [];
    const i = {
        dirty: !1,
        resolvedOptions: e,
        hooks: t,
        headEntries() {
            return s
        },
        use(a) {
            const l = typeof a == "function" ? a(i) : a;
            ui(l.mode, n) && t.addHooks(l.hooks || {})
        },
        push(a, l) {
            l == null || delete l.head;
            const c = {
                _i: o++,
                input: a,
                ...l
            };
            return ui(c.mode, n) && (s.push(c),
            r()),
            {
                dispose() {
                    s = s.filter(u=>u._i !== c._i),
                    t.callHook("entries:updated", i),
                    r()
                },
                patch(u) {
                    s = s.map(f=>(f._i === c._i && (f.input = c.input = u),
                    f)),
                    r()
                }
            }
        },
        async resolveTags() {
            const a = {
                tags: [],
                entries: [...s]
            };
            await t.callHook("entries:resolve", a);
            for (const l of a.entries) {
                const c = l.resolvedInput || l.input;
                if (l.resolvedInput = await (l.transform ? l.transform(c) : c),
                l.resolvedInput)
                    for (const u of await Bd(l)) {
                        const f = {
                            tag: u,
                            entry: l,
                            resolvedOptions: i.resolvedOptions
                        };
                        await t.callHook("tag:normalise", f),
                        a.tags.push(f.tag)
                    }
            }
            return await t.callHook("tags:beforeResolve", a),
            await t.callHook("tags:resolve", a),
            a.tags
        },
        ssr: n
    };
    return e.plugins.forEach(a=>i.use(a)),
    i.hooks.callHook("init", i),
    i
}
function np() {
    return fl
}
const rp = Da.startsWith("3");
function op(e) {
    return typeof e == "function" ? e() : fe(e)
}
function po(e, t="") {
    if (e instanceof Promise)
        return e;
    const n = op(e);
    return !e || !n ? n : Array.isArray(n) ? n.map(r=>po(r, t)) : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([r,o])=>r === "titleTemplate" || r.startsWith("on") ? [r, fe(o)] : [r, po(o, r)])) : n
}
const sp = {
    hooks: {
        "entries:resolve": function(e) {
            for (const t of e.entries)
                t.resolvedInput = po(t.input)
        }
    }
}
  , dl = "usehead";
function ip(e) {
    return {
        install(n) {
            rp && (n.config.globalProperties.$unhead = e,
            n.config.globalProperties.$head = e,
            n.provide(dl, e))
        }
    }.install
}
function ap(e={}) {
    e.domDelayFn = e.domDelayFn || (n=>Ut(()=>setTimeout(()=>n(), 0)));
    const t = ep(e);
    return t.use(sp),
    t.install = ip(t),
    t
}
const ho = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , mo = "__unhead_injection_handler__";
function lp(e) {
    ho[mo] = e
}
function Hm() {
    if (mo in ho)
        return ho[mo]();
    const e = Pe(dl);
    return e || np()
}
function Ur(e) {
    return e !== null && typeof e == "object"
}
function go(e, t, n=".", r) {
    if (!Ur(t))
        return go(e, {}, n, r);
    const o = Object.assign({}, t);
    for (const s in e) {
        if (s === "__proto__" || s === "constructor")
            continue;
        const i = e[s];
        i != null && (r && r(o, s, i, n) || (Array.isArray(i) && Array.isArray(o[s]) ? o[s] = [...i, ...o[s]] : Ur(i) && Ur(o[s]) ? o[s] = go(i, o[s], (n ? `${n}.` : "") + s.toString(), r) : o[s] = i))
    }
    return o
}
function cp(e) {
    return (...t)=>t.reduce((n,r)=>go(n, r, "", e), {})
}
const up = cp();
function fp(e, t) {
    try {
        return t in e
    } catch {
        return !1
    }
}
var dp = Object.defineProperty
  , pp = (e,t,n)=>t in e ? dp(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n
  , St = (e,t,n)=>(pp(e, typeof t != "symbol" ? t + "" : t, n),
n);
class yo extends Error {
    constructor(t, n={}) {
        super(t, n),
        St(this, "statusCode", 500),
        St(this, "fatal", !1),
        St(this, "unhandled", !1),
        St(this, "statusMessage"),
        St(this, "data"),
        St(this, "cause"),
        n.cause && !this.cause && (this.cause = n.cause)
    }
    toJSON() {
        const t = {
            message: this.message,
            statusCode: _o(this.statusCode, 500)
        };
        return this.statusMessage && (t.statusMessage = pl(this.statusMessage)),
        this.data !== void 0 && (t.data = this.data),
        t
    }
}
St(yo, "__h3_error__", !0);
function bo(e) {
    if (typeof e == "string")
        return new yo(e);
    if (hp(e))
        return e;
    const t = new yo(e.message ?? e.statusMessage ?? "",{
        cause: e.cause || e
    });
    if (fp(e, "stack"))
        try {
            Object.defineProperty(t, "stack", {
                get() {
                    return e.stack
                }
            })
        } catch {
            try {
                t.stack = e.stack
            } catch {}
        }
    if (e.data && (t.data = e.data),
    e.statusCode ? t.statusCode = _o(e.statusCode, t.statusCode) : e.status && (t.statusCode = _o(e.status, t.statusCode)),
    e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage) {
        const n = t.statusMessage;
        pl(t.statusMessage) !== n && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.")
    }
    return e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
}
function hp(e) {
    var t;
    return ((t = e == null ? void 0 : e.constructor) == null ? void 0 : t.__h3_error__) === !0
}
const mp = /[^\u0009\u0020-\u007E]/g;
function pl(e="") {
    return e.replace(mp, "")
}
function _o(e, t=200) {
    return !e || (typeof e == "string" && (e = Number.parseInt(e, 10)),
    e < 100 || e > 999) ? t : e
}
const hl = Symbol("layout-meta")
  , Bn = Symbol("route")
  , Tt = ()=>{
    var e;
    return (e = he()) == null ? void 0 : e.$router
}
  , rs = ()=>ka() ? Pe(Bn, he()._route) : he()._route;
/*! @__NO_SIDE_EFFECTS__ */
const gp = ()=>{
    try {
        if (he()._processingMiddleware)
            return !0
    } catch {
        return !0
    }
    return !1
}
  , Lm = (e,t)=>{
    e || (e = "/");
    const n = typeof e == "string" ? e : Va(e.path || "/", e.query || {}) + (e.hash || "");
    if (t != null && t.open) {
        {
            const {target: a="_blank", windowFeatures: l={}} = t.open
              , c = Object.entries(l).filter(([u,f])=>f !== void 0).map(([u,f])=>`${u.toLowerCase()}=${f}`).join(", ");
            open(n, a, c)
        }
        return Promise.resolve()
    }
    const r = (t == null ? void 0 : t.external) || Nn(n, {
        acceptRelative: !0
    });
    if (r) {
        if (!(t != null && t.external))
            throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
        const a = xr(n).protocol;
        if (a && Mf(a))
            throw new Error(`Cannot navigate to a URL with '${a}' protocol.`)
    }
    const o = gp();
    if (!r && o)
        return e;
    const s = Tt()
      , i = he();
    return r ? (t != null && t.replace ? location.replace(n) : location.href = n,
    o ? i.isHydrating ? new Promise(()=>{}
    ) : !1 : Promise.resolve()) : t != null && t.replace ? s.replace(e) : s.push(e)
}
  , Rr = ()=>ra(he().payload, "error")
  , zt = e=>{
    const t = os(e);
    try {
        const n = he()
          , r = Rr();
        n.hooks.callHook("app:error", t),
        r.value = r.value || t
    } catch {
        throw t
    }
    return t
}
  , yp = async(e={})=>{
    const t = he()
      , n = Rr();
    t.callHook("app:error:cleared", e),
    e.redirect && await Tt().replace(e.redirect),
    n.value = null
}
  , bp = e=>!!(e && typeof e == "object" && "__nuxt_error"in e)
  , os = e=>{
    const t = bo(e);
    return t.__nuxt_error = !0,
    t
}
  , fi = globalThis.requestIdleCallback || (e=>{
    const t = Date.now()
      , n = {
        didTimeout: !1,
        timeRemaining: ()=>Math.max(0, 50 - (Date.now() - t))
    };
    return setTimeout(()=>{
        e(n)
    }
    , 1)
}
)
  , Nm = globalThis.cancelIdleCallback || (e=>{
    clearTimeout(e)
}
)
  , _p = e=>{
    const t = he();
    t.isHydrating ? t.hooks.hookOnce("app:suspense:resolve", ()=>{
        fi(e)
    }
    ) : fi(e)
}
  , vp = "$s";
function wp(...e) {
    const t = typeof e[e.length - 1] == "string" ? e.pop() : void 0;
    typeof e[0] != "string" && e.unshift(t);
    const [n,r] = e;
    if (!n || typeof n != "string")
        throw new TypeError("[nuxt] [useState] key must be a string: " + n);
    if (r !== void 0 && typeof r != "function")
        throw new Error("[nuxt] [useState] init must be a function: " + r);
    const o = vp + n
      , s = he()
      , i = ra(s.payload.state, o);
    if (i.value === void 0 && r) {
        const a = r();
        if (ve(a))
            return s.payload.state[o] = a,
            a;
        i.value = a
    }
    return i
}
function Ep(e={}) {
    const t = e.path || window.location.pathname;
    let n = {};
    try {
        n = ar(sessionStorage.getItem("nuxt:reload") || "{}")
    } catch {}
    if (e.force || (n == null ? void 0 : n.path) !== t || (n == null ? void 0 : n.expires) < Date.now()) {
        try {
            sessionStorage.setItem("nuxt:reload", JSON.stringify({
                path: t,
                expires: Date.now() + (e.ttl ?? 1e4)
            }))
        } catch {}
        if (e.persistState)
            try {
                sessionStorage.setItem("nuxt:reload:state", JSON.stringify({
                    state: he().payload.state
                }))
            } catch {}
        window.location.pathname !== t ? window.location.href = t : window.location.reload()
    }
}
const Cp = !1
  , vo = !1
  , kp = !1
  , Tp = "#__nuxt";
function di(e, t={}) {
    const n = xp(e, t)
      , r = he()
      , o = r._payloadCache = r._payloadCache || {};
    return n in o || (o[n] = Rp().then(s=>s ? ml(n).then(i=>i || (delete o[n],
    null)) : (o[n] = null,
    null))),
    o[n]
}
const pi = "json";
function xp(e, t={}) {
    const n = new URL(e,"http://localhost");
    if (n.search)
        throw new Error("Payload URL cannot contain search params: " + e);
    if (n.host !== "localhost" || Nn(n.pathname, {
        acceptRelative: !0
    }))
        throw new Error("Payload URL must not include hostname: " + e);
    const r = t.hash || (t.fresh ? Date.now() : "");
    return Fn(ts().app.baseURL, n.pathname, r ? `_payload.${r}.${pi}` : `_payload.${pi}`)
}
async function ml(e) {
    const t = fetch(e).then(n=>n.text().then(gl));
    try {
        return await t
    } catch (n) {
        console.warn("[nuxt] Cannot load payload ", e, n)
    }
    return null
}
async function Rp(e=rs().path) {
    return !!he().payload.prerenderedAt
}
let Yn = null;
async function Ap() {
    if (Yn)
        return Yn;
    const e = document.getElementById("__NUXT_DATA__");
    if (!e)
        return {};
    const t = gl(e.textContent || "")
      , n = e.dataset.src ? await ml(e.dataset.src) : void 0;
    return Yn = {
        ...t,
        ...n,
        ...window.__NUXT__
    },
    Yn
}
function gl(e) {
    return Ad(e, he()._payloadRevivers)
}
function Pp(e, t) {
    he()._payloadRevivers[e] = t
}
const hi = {
    NuxtError: e=>os(e),
    EmptyShallowRef: e=>An(e === "_" ? void 0 : e === "0n" ? BigInt(0) : ar(e)),
    EmptyRef: e=>at(e === "_" ? void 0 : e === "0n" ? BigInt(0) : ar(e)),
    ShallowRef: e=>An(e),
    ShallowReactive: e=>Hn(e),
    Ref: e=>at(e),
    Reactive: e=>ct(e)
}
  , Sp = dt({
    name: "nuxt:revive-payload:client",
    order: -30,
    async setup(e) {
        let t, n;
        for (const r in hi)
            Pp(r, hi[r]);
        Object.assign(e.payload, ([t,n] = fr(()=>e.runWithContext(Ap)),
        t = await t,
        n(),
        t)),
        window.__NUXT__ = e.payload
    }
})
  , Op = []
  , Mp = dt({
    name: "nuxt:head",
    enforce: "pre",
    setup(e) {
        const t = ap({
            plugins: Op
        });
        lp(()=>he().vueApp._context.provides.usehead),
        e.vueApp.use(t);
        {
            let n = !0;
            const r = async()=>{
                n = !1,
                await ul(t)
            }
            ;
            t.hooks.hook("dom:beforeRender", o=>{
                o.shouldRender = !n
            }
            ),
            e.hooks.hook("page:start", ()=>{
                n = !0
            }
            ),
            e.hooks.hook("page:finish", ()=>{
                e.isHydrating || r()
            }
            ),
            e.hooks.hook("app:error", r),
            e.hooks.hook("app:suspense:resolve", r)
        }
    }
});
/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Vt = typeof window < "u";
function Ip(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const se = Object.assign;
function Kr(e, t) {
    const n = {};
    for (const r in t) {
        const o = t[r];
        n[r] = Qe(o) ? o.map(e) : e(o)
    }
    return n
}
const Cn = ()=>{}
  , Qe = Array.isArray
  , jp = /\/$/
  , $p = e=>e.replace(jp, "");
function Wr(e, t, n="/") {
    let r, o = {}, s = "", i = "";
    const a = t.indexOf("#");
    let l = t.indexOf("?");
    return a < l && a >= 0 && (l = -1),
    l > -1 && (r = t.slice(0, l),
    s = t.slice(l + 1, a > -1 ? a : t.length),
    o = e(s)),
    a > -1 && (r = r || t.slice(0, a),
    i = t.slice(a, t.length)),
    r = Fp(r ?? t, n),
    {
        fullPath: r + (s && "?") + s + i,
        path: r,
        query: o,
        hash: i
    }
}
function Hp(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "")
}
function mi(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}
function Lp(e, t, n) {
    const r = t.matched.length - 1
      , o = n.matched.length - 1;
    return r > -1 && r === o && sn(t.matched[r], n.matched[o]) && yl(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
}
function sn(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}
function yl(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
        return !1;
    for (const n in e)
        if (!Np(e[n], t[n]))
            return !1;
    return !0
}
function Np(e, t) {
    return Qe(e) ? gi(e, t) : Qe(t) ? gi(t, e) : e === t
}
function gi(e, t) {
    return Qe(t) ? e.length === t.length && e.every((n,r)=>n === t[r]) : e.length === 1 && e[0] === t
}
function Fp(e, t) {
    if (e.startsWith("/"))
        return e;
    if (!e)
        return t;
    const n = t.split("/")
      , r = e.split("/")
      , o = r[r.length - 1];
    (o === ".." || o === ".") && r.push("");
    let s = n.length - 1, i, a;
    for (i = 0; i < r.length; i++)
        if (a = r[i],
        a !== ".")
            if (a === "..")
                s > 1 && s--;
            else
                break;
    return n.slice(0, s).join("/") + "/" + r.slice(i - (i === r.length ? 1 : 0)).join("/")
}
var In;
(function(e) {
    e.pop = "pop",
    e.push = "push"
}
)(In || (In = {}));
var kn;
(function(e) {
    e.back = "back",
    e.forward = "forward",
    e.unknown = ""
}
)(kn || (kn = {}));
function Bp(e) {
    if (!e)
        if (Vt) {
            const t = document.querySelector("base");
            e = t && t.getAttribute("href") || "/",
            e = e.replace(/^\w+:\/\/[^\/]+/, "")
        } else
            e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e),
    $p(e)
}
const Dp = /^[^#]+#/;
function Up(e, t) {
    return e.replace(Dp, "#") + t
}
function Kp(e, t) {
    const n = document.documentElement.getBoundingClientRect()
      , r = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: r.left - n.left - (t.left || 0),
        top: r.top - n.top - (t.top || 0)
    }
}
const Ar = ()=>({
    left: window.pageXOffset,
    top: window.pageYOffset
});
function Wp(e) {
    let t;
    if ("el"in e) {
        const n = e.el
          , r = typeof n == "string" && n.startsWith("#")
          , o = typeof n == "string" ? r ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!o)
            return;
        t = Kp(o, e)
    } else
        t = e;
    "scrollBehavior"in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset)
}
function yi(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const wo = new Map;
function qp(e, t) {
    wo.set(e, t)
}
function Vp(e) {
    const t = wo.get(e);
    return wo.delete(e),
    t
}
let zp = ()=>location.protocol + "//" + location.host;
function bl(e, t) {
    const {pathname: n, search: r, hash: o} = t
      , s = e.indexOf("#");
    if (s > -1) {
        let a = o.includes(e.slice(s)) ? e.slice(s).length : 1
          , l = o.slice(a);
        return l[0] !== "/" && (l = "/" + l),
        mi(l, "")
    }
    return mi(n, e) + r + o
}
function Jp(e, t, n, r) {
    let o = []
      , s = []
      , i = null;
    const a = ({state: d})=>{
        const m = bl(e, location)
          , v = n.value
          , T = t.value;
        let I = 0;
        if (d) {
            if (n.value = m,
            t.value = d,
            i && i === v) {
                i = null;
                return
            }
            I = T ? d.position - T.position : 0
        } else
            r(m);
        o.forEach(b=>{
            b(n.value, v, {
                delta: I,
                type: In.pop,
                direction: I ? I > 0 ? kn.forward : kn.back : kn.unknown
            })
        }
        )
    }
    ;
    function l() {
        i = n.value
    }
    function c(d) {
        o.push(d);
        const m = ()=>{
            const v = o.indexOf(d);
            v > -1 && o.splice(v, 1)
        }
        ;
        return s.push(m),
        m
    }
    function u() {
        const {history: d} = window;
        d.state && d.replaceState(se({}, d.state, {
            scroll: Ar()
        }), "")
    }
    function f() {
        for (const d of s)
            d();
        s = [],
        window.removeEventListener("popstate", a),
        window.removeEventListener("beforeunload", u)
    }
    return window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", u, {
        passive: !0
    }),
    {
        pauseListeners: l,
        listen: c,
        destroy: f
    }
}
function bi(e, t, n, r=!1, o=!1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: r,
        position: window.history.length,
        scroll: o ? Ar() : null
    }
}
function Qp(e) {
    const {history: t, location: n} = window
      , r = {
        value: bl(e, n)
    }
      , o = {
        value: t.state
    };
    o.value || s(r.value, {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0);
    function s(l, c, u) {
        const f = e.indexOf("#")
          , d = f > -1 ? (n.host && document.querySelector("base") ? e : e.slice(f)) + l : zp() + e + l;
        try {
            t[u ? "replaceState" : "pushState"](c, "", d),
            o.value = c
        } catch (m) {
            console.error(m),
            n[u ? "replace" : "assign"](d)
        }
    }
    function i(l, c) {
        const u = se({}, t.state, bi(o.value.back, l, o.value.forward, !0), c, {
            position: o.value.position
        });
        s(l, u, !0),
        r.value = l
    }
    function a(l, c) {
        const u = se({}, o.value, t.state, {
            forward: l,
            scroll: Ar()
        });
        s(u.current, u, !0);
        const f = se({}, bi(r.value, l, null), {
            position: u.position + 1
        }, c);
        s(l, f, !1),
        r.value = l
    }
    return {
        location: r,
        state: o,
        push: a,
        replace: i
    }
}
function _l(e) {
    e = Bp(e);
    const t = Qp(e)
      , n = Jp(e, t.state, t.location, t.replace);
    function r(s, i=!0) {
        i || n.pauseListeners(),
        history.go(s)
    }
    const o = se({
        location: "",
        base: e,
        go: r,
        createHref: Up.bind(null, e)
    }, t, n);
    return Object.defineProperty(o, "location", {
        enumerable: !0,
        get: ()=>t.location.value
    }),
    Object.defineProperty(o, "state", {
        enumerable: !0,
        get: ()=>t.state.value
    }),
    o
}
function Yp(e) {
    return e = location.host ? e || location.pathname + location.search : "",
    e.includes("#") || (e += "#"),
    _l(e)
}
function Xp(e) {
    return typeof e == "string" || e && typeof e == "object"
}
function vl(e) {
    return typeof e == "string" || typeof e == "symbol"
}
const Xe = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0
}
  , wl = Symbol("");
var _i;
(function(e) {
    e[e.aborted = 4] = "aborted",
    e[e.cancelled = 8] = "cancelled",
    e[e.duplicated = 16] = "duplicated"
}
)(_i || (_i = {}));
function an(e, t) {
    return se(new Error, {
        type: e,
        [wl]: !0
    }, t)
}
function nt(e, t) {
    return e instanceof Error && wl in e && (t == null || !!(e.type & t))
}
const vi = "[^/]+?"
  , Gp = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0
}
  , Zp = /[.+*?^${}()[\]/\\]/g;
function eh(e, t) {
    const n = se({}, Gp, t)
      , r = [];
    let o = n.start ? "^" : "";
    const s = [];
    for (const c of e) {
        const u = c.length ? [] : [90];
        n.strict && !c.length && (o += "/");
        for (let f = 0; f < c.length; f++) {
            const d = c[f];
            let m = 40 + (n.sensitive ? .25 : 0);
            if (d.type === 0)
                f || (o += "/"),
                o += d.value.replace(Zp, "\\$&"),
                m += 40;
            else if (d.type === 1) {
                const {value: v, repeatable: T, optional: I, regexp: b} = d;
                s.push({
                    name: v,
                    repeatable: T,
                    optional: I
                });
                const g = b || vi;
                if (g !== vi) {
                    m += 10;
                    try {
                        new RegExp(`(${g})`)
                    } catch (_) {
                        throw new Error(`Invalid custom RegExp for param "${v}" (${g}): ` + _.message)
                    }
                }
                let R = T ? `((?:${g})(?:/(?:${g}))*)` : `(${g})`;
                f || (R = I && c.length < 2 ? `(?:/${R})` : "/" + R),
                I && (R += "?"),
                o += R,
                m += 20,
                I && (m += -8),
                T && (m += -20),
                g === ".*" && (m += -50)
            }
            u.push(m)
        }
        r.push(u)
    }
    if (n.strict && n.end) {
        const c = r.length - 1;
        r[c][r[c].length - 1] += .7000000000000001
    }
    n.strict || (o += "/?"),
    n.end ? o += "$" : n.strict && (o += "(?:/|$)");
    const i = new RegExp(o,n.sensitive ? "" : "i");
    function a(c) {
        const u = c.match(i)
          , f = {};
        if (!u)
            return null;
        for (let d = 1; d < u.length; d++) {
            const m = u[d] || ""
              , v = s[d - 1];
            f[v.name] = m && v.repeatable ? m.split("/") : m
        }
        return f
    }
    function l(c) {
        let u = ""
          , f = !1;
        for (const d of e) {
            (!f || !u.endsWith("/")) && (u += "/"),
            f = !1;
            for (const m of d)
                if (m.type === 0)
                    u += m.value;
                else if (m.type === 1) {
                    const {value: v, repeatable: T, optional: I} = m
                      , b = v in c ? c[v] : "";
                    if (Qe(b) && !T)
                        throw new Error(`Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`);
                    const g = Qe(b) ? b.join("/") : b;
                    if (!g)
                        if (I)
                            d.length < 2 && (u.endsWith("/") ? u = u.slice(0, -1) : f = !0);
                        else
                            throw new Error(`Missing required param "${v}"`);
                    u += g
                }
        }
        return u || "/"
    }
    return {
        re: i,
        score: r,
        keys: s,
        parse: a,
        stringify: l
    }
}
function th(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r)
            return r;
        n++
    }
    return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0
}
function nh(e, t) {
    let n = 0;
    const r = e.score
      , o = t.score;
    for (; n < r.length && n < o.length; ) {
        const s = th(r[n], o[n]);
        if (s)
            return s;
        n++
    }
    if (Math.abs(o.length - r.length) === 1) {
        if (wi(r))
            return 1;
        if (wi(o))
            return -1
    }
    return o.length - r.length
}
function wi(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0
}
const rh = {
    type: 0,
    value: ""
}
  , oh = /[a-zA-Z0-9_]/;
function sh(e) {
    if (!e)
        return [[]];
    if (e === "/")
        return [[rh]];
    if (!e.startsWith("/"))
        throw new Error(`Invalid path "${e}"`);
    function t(m) {
        throw new Error(`ERR (${n})/"${c}": ${m}`)
    }
    let n = 0
      , r = n;
    const o = [];
    let s;
    function i() {
        s && o.push(s),
        s = []
    }
    let a = 0, l, c = "", u = "";
    function f() {
        c && (n === 0 ? s.push({
            type: 0,
            value: c
        }) : n === 1 || n === 2 || n === 3 ? (s.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),
        s.push({
            type: 1,
            value: c,
            regexp: u,
            repeatable: l === "*" || l === "+",
            optional: l === "*" || l === "?"
        })) : t("Invalid state to consume buffer"),
        c = "")
    }
    function d() {
        c += l
    }
    for (; a < e.length; ) {
        if (l = e[a++],
        l === "\\" && n !== 2) {
            r = n,
            n = 4;
            continue
        }
        switch (n) {
        case 0:
            l === "/" ? (c && f(),
            i()) : l === ":" ? (f(),
            n = 1) : d();
            break;
        case 4:
            d(),
            n = r;
            break;
        case 1:
            l === "(" ? n = 2 : oh.test(l) ? d() : (f(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && a--);
            break;
        case 2:
            l === ")" ? u[u.length - 1] == "\\" ? u = u.slice(0, -1) + l : n = 3 : u += l;
            break;
        case 3:
            f(),
            n = 0,
            l !== "*" && l !== "?" && l !== "+" && a--,
            u = "";
            break;
        default:
            t("Unknown state");
            break
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${c}"`),
    f(),
    i(),
    o
}
function ih(e, t, n) {
    const r = eh(sh(e.path), n)
      , o = se(r, {
        record: e,
        parent: t,
        children: [],
        alias: []
    });
    return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o),
    o
}
function ah(e, t) {
    const n = []
      , r = new Map;
    t = ki({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t);
    function o(u) {
        return r.get(u)
    }
    function s(u, f, d) {
        const m = !d
          , v = lh(u);
        v.aliasOf = d && d.record;
        const T = ki(t, u)
          , I = [v];
        if ("alias"in u) {
            const R = typeof u.alias == "string" ? [u.alias] : u.alias;
            for (const _ of R)
                I.push(se({}, v, {
                    components: d ? d.record.components : v.components,
                    path: _,
                    aliasOf: d ? d.record : v
                }))
        }
        let b, g;
        for (const R of I) {
            const {path: _} = R;
            if (f && _[0] !== "/") {
                const P = f.record.path
                  , $ = P[P.length - 1] === "/" ? "" : "/";
                R.path = f.record.path + (_ && $ + _)
            }
            if (b = ih(R, f, T),
            d ? d.alias.push(b) : (g = g || b,
            g !== b && g.alias.push(b),
            m && u.name && !Ci(b) && i(u.name)),
            v.children) {
                const P = v.children;
                for (let $ = 0; $ < P.length; $++)
                    s(P[$], b, d && d.children[$])
            }
            d = d || b,
            (b.record.components && Object.keys(b.record.components).length || b.record.name || b.record.redirect) && l(b)
        }
        return g ? ()=>{
            i(g)
        }
        : Cn
    }
    function i(u) {
        if (vl(u)) {
            const f = r.get(u);
            f && (r.delete(u),
            n.splice(n.indexOf(f), 1),
            f.children.forEach(i),
            f.alias.forEach(i))
        } else {
            const f = n.indexOf(u);
            f > -1 && (n.splice(f, 1),
            u.record.name && r.delete(u.record.name),
            u.children.forEach(i),
            u.alias.forEach(i))
        }
    }
    function a() {
        return n
    }
    function l(u) {
        let f = 0;
        for (; f < n.length && nh(u, n[f]) >= 0 && (u.record.path !== n[f].record.path || !El(u, n[f])); )
            f++;
        n.splice(f, 0, u),
        u.record.name && !Ci(u) && r.set(u.record.name, u)
    }
    function c(u, f) {
        let d, m = {}, v, T;
        if ("name"in u && u.name) {
            if (d = r.get(u.name),
            !d)
                throw an(1, {
                    location: u
                });
            T = d.record.name,
            m = se(Ei(f.params, d.keys.filter(g=>!g.optional).map(g=>g.name)), u.params && Ei(u.params, d.keys.map(g=>g.name))),
            v = d.stringify(m)
        } else if ("path"in u)
            v = u.path,
            d = n.find(g=>g.re.test(v)),
            d && (m = d.parse(v),
            T = d.record.name);
        else {
            if (d = f.name ? r.get(f.name) : n.find(g=>g.re.test(f.path)),
            !d)
                throw an(1, {
                    location: u,
                    currentLocation: f
                });
            T = d.record.name,
            m = se({}, f.params, u.params),
            v = d.stringify(m)
        }
        const I = [];
        let b = d;
        for (; b; )
            I.unshift(b.record),
            b = b.parent;
        return {
            name: T,
            path: v,
            params: m,
            matched: I,
            meta: uh(I)
        }
    }
    return e.forEach(u=>s(u)),
    {
        addRoute: s,
        resolve: c,
        removeRoute: i,
        getRoutes: a,
        getRecordMatcher: o
    }
}
function Ei(e, t) {
    const n = {};
    for (const r of t)
        r in e && (n[r] = e[r]);
    return n
}
function lh(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: ch(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set,
        updateGuards: new Set,
        enterCallbacks: {},
        components: "components"in e ? e.components || null : e.component && {
            default: e.component
        }
    }
}
function ch(e) {
    const t = {}
      , n = e.props || !1;
    if ("component"in e)
        t.default = n;
    else
        for (const r in e.components)
            t[r] = typeof n == "object" ? n[r] : n;
    return t
}
function Ci(e) {
    for (; e; ) {
        if (e.record.aliasOf)
            return !0;
        e = e.parent
    }
    return !1
}
function uh(e) {
    return e.reduce((t,n)=>se(t, n.meta), {})
}
function ki(e, t) {
    const n = {};
    for (const r in e)
        n[r] = r in t ? t[r] : e[r];
    return n
}
function El(e, t) {
    return t.children.some(n=>n === e || El(e, n))
}
const Cl = /#/g
  , fh = /&/g
  , dh = /\//g
  , ph = /=/g
  , hh = /\?/g
  , kl = /\+/g
  , mh = /%5B/g
  , gh = /%5D/g
  , Tl = /%5E/g
  , yh = /%60/g
  , xl = /%7B/g
  , bh = /%7C/g
  , Rl = /%7D/g
  , _h = /%20/g;
function ss(e) {
    return encodeURI("" + e).replace(bh, "|").replace(mh, "[").replace(gh, "]")
}
function vh(e) {
    return ss(e).replace(xl, "{").replace(Rl, "}").replace(Tl, "^")
}
function Eo(e) {
    return ss(e).replace(kl, "%2B").replace(_h, "+").replace(Cl, "%23").replace(fh, "%26").replace(yh, "`").replace(xl, "{").replace(Rl, "}").replace(Tl, "^")
}
function wh(e) {
    return Eo(e).replace(ph, "%3D")
}
function Eh(e) {
    return ss(e).replace(Cl, "%23").replace(hh, "%3F")
}
function Ch(e) {
    return e == null ? "" : Eh(e).replace(dh, "%2F")
}
function pr(e) {
    try {
        return decodeURIComponent("" + e)
    } catch {}
    return "" + e
}
function kh(e) {
    const t = {};
    if (e === "" || e === "?")
        return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let o = 0; o < r.length; ++o) {
        const s = r[o].replace(kl, " ")
          , i = s.indexOf("=")
          , a = pr(i < 0 ? s : s.slice(0, i))
          , l = i < 0 ? null : pr(s.slice(i + 1));
        if (a in t) {
            let c = t[a];
            Qe(c) || (c = t[a] = [c]),
            c.push(l)
        } else
            t[a] = l
    }
    return t
}
function Ti(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (n = wh(n),
        r == null) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue
        }
        (Qe(r) ? r.map(s=>s && Eo(s)) : [r && Eo(r)]).forEach(s=>{
            s !== void 0 && (t += (t.length ? "&" : "") + n,
            s != null && (t += "=" + s))
        }
        )
    }
    return t
}
function Th(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = Qe(r) ? r.map(o=>o == null ? null : "" + o) : r == null ? r : "" + r)
    }
    return t
}
const xh = Symbol("")
  , xi = Symbol("")
  , is = Symbol("")
  , as = Symbol("")
  , Co = Symbol("");
function hn() {
    let e = [];
    function t(r) {
        return e.push(r),
        ()=>{
            const o = e.indexOf(r);
            o > -1 && e.splice(o, 1)
        }
    }
    function n() {
        e = []
    }
    return {
        add: t,
        list: ()=>e.slice(),
        reset: n
    }
}
function _t(e, t, n, r, o) {
    const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || []);
    return ()=>new Promise((i,a)=>{
        const l = f=>{
            f === !1 ? a(an(4, {
                from: n,
                to: t
            })) : f instanceof Error ? a(f) : Xp(f) ? a(an(2, {
                from: t,
                to: f
            })) : (s && r.enterCallbacks[o] === s && typeof f == "function" && s.push(f),
            i())
        }
          , c = e.call(r && r.instances[o], t, n, l);
        let u = Promise.resolve(c);
        e.length < 3 && (u = u.then(l)),
        u.catch(f=>a(f))
    }
    )
}
function qr(e, t, n, r) {
    const o = [];
    for (const s of e)
        for (const i in s.components) {
            let a = s.components[i];
            if (!(t !== "beforeRouteEnter" && !s.instances[i]))
                if (Rh(a)) {
                    const c = (a.__vccOpts || a)[t];
                    c && o.push(_t(c, n, r, s, i))
                } else {
                    let l = a();
                    o.push(()=>l.then(c=>{
                        if (!c)
                            return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${s.path}"`));
                        const u = Ip(c) ? c.default : c;
                        s.components[i] = u;
                        const d = (u.__vccOpts || u)[t];
                        return d && _t(d, n, r, s, i)()
                    }
                    ))
                }
        }
    return o
}
function Rh(e) {
    return typeof e == "object" || "displayName"in e || "props"in e || "__vccOpts"in e
}
function Ri(e) {
    const t = Pe(is)
      , n = Pe(as)
      , r = Ue(()=>t.resolve(fe(e.to)))
      , o = Ue(()=>{
        const {matched: l} = r.value
          , {length: c} = l
          , u = l[c - 1]
          , f = n.matched;
        if (!u || !f.length)
            return -1;
        const d = f.findIndex(sn.bind(null, u));
        if (d > -1)
            return d;
        const m = Ai(l[c - 2]);
        return c > 1 && Ai(u) === m && f[f.length - 1].path !== m ? f.findIndex(sn.bind(null, l[c - 2])) : d
    }
    )
      , s = Ue(()=>o.value > -1 && Oh(n.params, r.value.params))
      , i = Ue(()=>o.value > -1 && o.value === n.matched.length - 1 && yl(n.params, r.value.params));
    function a(l={}) {
        return Sh(l) ? t[fe(e.replace) ? "replace" : "push"](fe(e.to)).catch(Cn) : Promise.resolve()
    }
    return {
        route: r,
        href: Ue(()=>r.value.href),
        isActive: s,
        isExactActive: i,
        navigate: a
    }
}
const Ah = kt({
    name: "RouterLink",
    compatConfig: {
        MODE: 3
    },
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    useLink: Ri,
    setup(e, {slots: t}) {
        const n = ct(Ri(e))
          , {options: r} = Pe(is)
          , o = Ue(()=>({
            [Pi(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
            [Pi(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
        }));
        return ()=>{
            const s = t.default && t.default(n);
            return e.custom ? s : Fe("a", {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value
            }, s)
        }
    }
})
  , Ph = Ah;
function Sh(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t))
                return
        }
        return e.preventDefault && e.preventDefault(),
        !0
    }
}
function Oh(e, t) {
    for (const n in t) {
        const r = t[n]
          , o = e[n];
        if (typeof r == "string") {
            if (r !== o)
                return !1
        } else if (!Qe(o) || o.length !== r.length || r.some((s,i)=>s !== o[i]))
            return !1
    }
    return !0
}
function Ai(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Pi = (e,t,n)=>e ?? t ?? n
  , Mh = kt({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    compatConfig: {
        MODE: 3
    },
    setup(e, {attrs: t, slots: n}) {
        const r = Pe(Co)
          , o = Ue(()=>e.route || r.value)
          , s = Pe(xi, 0)
          , i = Ue(()=>{
            let c = fe(s);
            const {matched: u} = o.value;
            let f;
            for (; (f = u[c]) && !f.components; )
                c++;
            return c
        }
        )
          , a = Ue(()=>o.value.matched[i.value]);
        Nt(xi, Ue(()=>i.value + 1)),
        Nt(xh, a),
        Nt(Co, o);
        const l = at();
        return Ht(()=>[l.value, a.value, e.name], ([c,u,f],[d,m,v])=>{
            u && (u.instances[f] = c,
            m && m !== u && c && c === d && (u.leaveGuards.size || (u.leaveGuards = m.leaveGuards),
            u.updateGuards.size || (u.updateGuards = m.updateGuards))),
            c && u && (!m || !sn(u, m) || !d) && (u.enterCallbacks[f] || []).forEach(T=>T(c))
        }
        , {
            flush: "post"
        }),
        ()=>{
            const c = o.value
              , u = e.name
              , f = a.value
              , d = f && f.components[u];
            if (!d)
                return Si(n.default, {
                    Component: d,
                    route: c
                });
            const m = f.props[u]
              , v = m ? m === !0 ? c.params : typeof m == "function" ? m(c) : m : null
              , I = Fe(d, se({}, v, t, {
                onVnodeUnmounted: b=>{
                    b.component.isUnmounted && (f.instances[u] = null)
                }
                ,
                ref: l
            }));
            return Si(n.default, {
                Component: I,
                route: c
            }) || I
        }
    }
});
function Si(e, t) {
    if (!e)
        return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n
}
const Al = Mh;
function Ih(e) {
    const t = ah(e.routes, e)
      , n = e.parseQuery || kh
      , r = e.stringifyQuery || Ti
      , o = e.history
      , s = hn()
      , i = hn()
      , a = hn()
      , l = An(Xe);
    let c = Xe;
    Vt && e.scrollBehavior && "scrollRestoration"in history && (history.scrollRestoration = "manual");
    const u = Kr.bind(null, C=>"" + C)
      , f = Kr.bind(null, Ch)
      , d = Kr.bind(null, pr);
    function m(C, H) {
        let j, W;
        return vl(C) ? (j = t.getRecordMatcher(C),
        W = H) : W = C,
        t.addRoute(W, j)
    }
    function v(C) {
        const H = t.getRecordMatcher(C);
        H && t.removeRoute(H)
    }
    function T() {
        return t.getRoutes().map(C=>C.record)
    }
    function I(C) {
        return !!t.getRecordMatcher(C)
    }
    function b(C, H) {
        if (H = se({}, H || l.value),
        typeof C == "string") {
            const y = Wr(n, C, H.path)
              , w = t.resolve({
                path: y.path
            }, H)
              , x = o.createHref(y.fullPath);
            return se(y, w, {
                params: d(w.params),
                hash: pr(y.hash),
                redirectedFrom: void 0,
                href: x
            })
        }
        let j;
        if ("path"in C)
            j = se({}, C, {
                path: Wr(n, C.path, H.path).path
            });
        else {
            const y = se({}, C.params);
            for (const w in y)
                y[w] == null && delete y[w];
            j = se({}, C, {
                params: f(y)
            }),
            H.params = f(H.params)
        }
        const W = t.resolve(j, H)
          , Z = C.hash || "";
        W.params = u(d(W.params));
        const p = Hp(r, se({}, C, {
            hash: vh(Z),
            path: W.path
        }))
          , h = o.createHref(p);
        return se({
            fullPath: p,
            hash: Z,
            query: r === Ti ? Th(C.query) : C.query || {}
        }, W, {
            redirectedFrom: void 0,
            href: h
        })
    }
    function g(C) {
        return typeof C == "string" ? Wr(n, C, l.value.path) : se({}, C)
    }
    function R(C, H) {
        if (c !== C)
            return an(8, {
                from: H,
                to: C
            })
    }
    function _(C) {
        return F(C)
    }
    function P(C) {
        return _(se(g(C), {
            replace: !0
        }))
    }
    function $(C) {
        const H = C.matched[C.matched.length - 1];
        if (H && H.redirect) {
            const {redirect: j} = H;
            let W = typeof j == "function" ? j(C) : j;
            return typeof W == "string" && (W = W.includes("?") || W.includes("#") ? W = g(W) : {
                path: W
            },
            W.params = {}),
            se({
                query: C.query,
                hash: C.hash,
                params: "path"in W ? {} : C.params
            }, W)
        }
    }
    function F(C, H) {
        const j = c = b(C)
          , W = l.value
          , Z = C.state
          , p = C.force
          , h = C.replace === !0
          , y = $(j);
        if (y)
            return F(se(g(y), {
                state: typeof y == "object" ? se({}, Z, y.state) : Z,
                force: p,
                replace: h
            }), H || j);
        const w = j;
        w.redirectedFrom = H;
        let x;
        return !p && Lp(r, W, j) && (x = an(16, {
            to: w,
            from: W
        }),
        Oe(W, W, !0, !1)),
        (x ? Promise.resolve(x) : K(w, W)).catch(S=>nt(S) ? nt(S, 2) ? S : He(S) : ee(S, w, W)).then(S=>{
            if (S) {
                if (nt(S, 2))
                    return F(se({
                        replace: h
                    }, g(S.to), {
                        state: typeof S.to == "object" ? se({}, Z, S.to.state) : Z,
                        force: p
                    }), H || w)
            } else
                S = E(w, W, !0, h, Z);
            return O(w, W, S),
            S
        }
        )
    }
    function k(C, H) {
        const j = R(C, H);
        return j ? Promise.reject(j) : Promise.resolve()
    }
    function U(C) {
        const H = _e.values().next().value;
        return H && typeof H.runWithContext == "function" ? H.runWithContext(C) : C()
    }
    function K(C, H) {
        let j;
        const [W,Z,p] = jh(C, H);
        j = qr(W.reverse(), "beforeRouteLeave", C, H);
        for (const y of W)
            y.leaveGuards.forEach(w=>{
                j.push(_t(w, C, H))
            }
            );
        const h = k.bind(null, C, H);
        return j.push(h),
        ae(j).then(()=>{
            j = [];
            for (const y of s.list())
                j.push(_t(y, C, H));
            return j.push(h),
            ae(j)
        }
        ).then(()=>{
            j = qr(Z, "beforeRouteUpdate", C, H);
            for (const y of Z)
                y.updateGuards.forEach(w=>{
                    j.push(_t(w, C, H))
                }
                );
            return j.push(h),
            ae(j)
        }
        ).then(()=>{
            j = [];
            for (const y of p)
                if (y.beforeEnter)
                    if (Qe(y.beforeEnter))
                        for (const w of y.beforeEnter)
                            j.push(_t(w, C, H));
                    else
                        j.push(_t(y.beforeEnter, C, H));
            return j.push(h),
            ae(j)
        }
        ).then(()=>(C.matched.forEach(y=>y.enterCallbacks = {}),
        j = qr(p, "beforeRouteEnter", C, H),
        j.push(h),
        ae(j))).then(()=>{
            j = [];
            for (const y of i.list())
                j.push(_t(y, C, H));
            return j.push(h),
            ae(j)
        }
        ).catch(y=>nt(y, 8) ? y : Promise.reject(y))
    }
    function O(C, H, j) {
        a.list().forEach(W=>U(()=>W(C, H, j)))
    }
    function E(C, H, j, W, Z) {
        const p = R(C, H);
        if (p)
            return p;
        const h = H === Xe
          , y = Vt ? history.state : {};
        j && (W || h ? o.replace(C.fullPath, se({
            scroll: h && y && y.scroll
        }, Z)) : o.push(C.fullPath, Z)),
        l.value = C,
        Oe(C, H, j, h),
        He()
    }
    let N;
    function A() {
        N || (N = o.listen((C,H,j)=>{
            if (!xe.listening)
                return;
            const W = b(C)
              , Z = $(W);
            if (Z) {
                F(se(Z, {
                    replace: !0
                }), W).catch(Cn);
                return
            }
            c = W;
            const p = l.value;
            Vt && qp(yi(p.fullPath, j.delta), Ar()),
            K(W, p).catch(h=>nt(h, 12) ? h : nt(h, 2) ? (F(h.to, W).then(y=>{
                nt(y, 20) && !j.delta && j.type === In.pop && o.go(-1, !1)
            }
            ).catch(Cn),
            Promise.reject()) : (j.delta && o.go(-j.delta, !1),
            ee(h, W, p))).then(h=>{
                h = h || E(W, p, !1),
                h && (j.delta && !nt(h, 8) ? o.go(-j.delta, !1) : j.type === In.pop && nt(h, 20) && o.go(-1, !1)),
                O(W, p, h)
            }
            ).catch(Cn)
        }
        ))
    }
    let te = hn(), Q = hn(), G;
    function ee(C, H, j) {
        He(C);
        const W = Q.list();
        return W.length ? W.forEach(Z=>Z(C, H, j)) : console.error(C),
        Promise.reject(C)
    }
    function Ee() {
        return G && l.value !== Xe ? Promise.resolve() : new Promise((C,H)=>{
            te.add([C, H])
        }
        )
    }
    function He(C) {
        return G || (G = !C,
        A(),
        te.list().forEach(([H,j])=>C ? j(C) : H()),
        te.reset()),
        C
    }
    function Oe(C, H, j, W) {
        const {scrollBehavior: Z} = e;
        if (!Vt || !Z)
            return Promise.resolve();
        const p = !j && Vp(yi(C.fullPath, 0)) || (W || !j) && history.state && history.state.scroll || null;
        return Ut().then(()=>Z(C, H, p)).then(h=>h && Wp(h)).catch(h=>ee(h, C, H))
    }
    const me = C=>o.go(C);
    let Ce;
    const _e = new Set
      , xe = {
        currentRoute: l,
        listening: !0,
        addRoute: m,
        removeRoute: v,
        hasRoute: I,
        getRoutes: T,
        resolve: b,
        options: e,
        push: _,
        replace: P,
        go: me,
        back: ()=>me(-1),
        forward: ()=>me(1),
        beforeEach: s.add,
        beforeResolve: i.add,
        afterEach: a.add,
        onError: Q.add,
        isReady: Ee,
        install(C) {
            const H = this;
            C.component("RouterLink", Ph),
            C.component("RouterView", Al),
            C.config.globalProperties.$router = H,
            Object.defineProperty(C.config.globalProperties, "$route", {
                enumerable: !0,
                get: ()=>fe(l)
            }),
            Vt && !Ce && l.value === Xe && (Ce = !0,
            _(o.location).catch(Z=>{}
            ));
            const j = {};
            for (const Z in Xe)
                Object.defineProperty(j, Z, {
                    get: ()=>l.value[Z],
                    enumerable: !0
                });
            C.provide(is, H),
            C.provide(as, Hn(j)),
            C.provide(Co, l);
            const W = C.unmount;
            _e.add(C),
            C.unmount = function() {
                _e.delete(C),
                _e.size < 1 && (c = Xe,
                N && N(),
                N = null,
                l.value = Xe,
                Ce = !1,
                G = !1),
                W()
            }
        }
    };
    function ae(C) {
        return C.reduce((H,j)=>H.then(()=>U(j)), Promise.resolve())
    }
    return xe
}
function jh(e, t) {
    const n = []
      , r = []
      , o = []
      , s = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < s; i++) {
        const a = t.matched[i];
        a && (e.matched.find(c=>sn(c, a)) ? r.push(a) : n.push(a));
        const l = e.matched[i];
        l && (t.matched.find(c=>sn(c, l)) || o.push(l))
    }
    return [n, r, o]
}
function $h() {
    return Pe(as)
}
const Oi = [{
    name: "cats",
    path: "/cats",
    meta: {},
    alias: [],
    redirect: void 0,
    component: ()=>vt(()=>import("./cats.34ae00c1.js"), ["./cats.34ae00c1.js", "./meta.789f2ef4.js", "./vue.f36acd1f.5dbaf966.js"], import.meta.url).then(e=>e.default || e)
}, {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: ()=>vt(()=>import("./index.ff093608.js"), ["./index.ff093608.js", "./card.vue.ac27b9b7.js", "./avatar-256.d7772ac0.js", "./nuxt-link.92e35659.js", "./card.5451173a.css", "./meta.789f2ef4.js", "./vue.f36acd1f.5dbaf966.js", "./index.24ed8c10.css"], import.meta.url).then(e=>e.default || e)
}, {
    name: "links",
    path: "/links",
    meta: {},
    alias: [],
    redirect: void 0,
    component: ()=>vt(()=>import("./links.88f6cc1d.js"), ["./links.88f6cc1d.js", "./avatar-256.d7772ac0.js", "./meta.789f2ef4.js", "./vue.f36acd1f.5dbaf966.js"], import.meta.url).then(e=>e.default || e)
}, {
    name: "majority",
    path: "/majority",
    meta: {},
    alias: [],
    redirect: void 0,
    component: ()=>vt(()=>import("./majority.ecd33b5a.js"), ["./majority.ecd33b5a.js", "./meta.789f2ef4.js", "./vue.f36acd1f.5dbaf966.js", "./majority.f3173636.css"], import.meta.url).then(e=>e.default || e)
}, {
    name: "menu",
    path: "/menu",
    meta: {},
    alias: [],
    redirect: void 0,
    component: ()=>vt(()=>import("./menu.1de9bcde.js"), ["./menu.1de9bcde.js", "./card.vue.ac27b9b7.js", "./avatar-256.d7772ac0.js", "./nuxt-link.92e35659.js", "./card.5451173a.css", "./meta.789f2ef4.js", "./vue.f36acd1f.5dbaf966.js", "./menu.63834dee.css"], import.meta.url).then(e=>e.default || e)
}]
  , Hh = {
    scrollBehavior(e, t, n) {
        var c;
        const r = he()
          , o = ((c = Tt().options) == null ? void 0 : c.scrollBehaviorType) ?? "auto";
        let s = n || void 0;
        const i = typeof e.meta.scrollToTop == "function" ? e.meta.scrollToTop(e, t) : e.meta.scrollToTop;
        if (!s && t && e && i !== !1 && Lh(t, e) && (s = {
            left: 0,
            top: 0
        }),
        e.path === t.path) {
            if (t.hash && !e.hash)
                return {
                    left: 0,
                    top: 0
                };
            if (e.hash)
                return {
                    el: e.hash,
                    top: Mi(e.hash),
                    behavior: o
                }
        }
        const a = u=>!!(u.meta.pageTransition ?? vo)
          , l = a(t) && a(e) ? "page:transition:finish" : "page:finish";
        return new Promise(u=>{
            r.hooks.hookOnce(l, async()=>{
                await Ut(),
                e.hash && (s = {
                    el: e.hash,
                    top: Mi(e.hash),
                    behavior: o
                }),
                u(s)
            }
            )
        }
        )
    }
};
function Mi(e) {
    try {
        const t = document.querySelector(e);
        if (t)
            return parseFloat(getComputedStyle(t).scrollMarginTop)
    } catch {}
    return 0
}
function Lh(e, t) {
    return t.path !== e.path || JSON.stringify(e.params) !== JSON.stringify(t.params)
}
const Nh = {}
  , Me = {
    ...Nh,
    ...Hh
}
  , Fh = async e=>{
    var l;
    let t, n;
    if (!((l = e.meta) != null && l.validate))
        return;
    const r = he()
      , o = Tt();
    if (([t,n] = fr(()=>Promise.resolve(e.meta.validate(e))),
    t = await t,
    n(),
    t) === !0)
        return;
    const i = os({
        statusCode: 404,
        statusMessage: `Page Not Found: ${e.fullPath}`
    })
      , a = o.beforeResolve(c=>{
        if (a(),
        c === e) {
            const u = o.afterEach(async()=>{
                u(),
                await r.runWithContext(()=>zt(i)),
                window.history.pushState({}, "", e.fullPath)
            }
            );
            return !1
        }
    }
    )
}
  , Bh = [Fh]
  , Tn = {};
function Dh(e, t, n) {
    const {pathname: r, search: o, hash: s} = t
      , i = e.indexOf("#");
    if (i > -1) {
        const c = s.includes(e.slice(i)) ? e.slice(i).length : 1;
        let u = s.slice(c);
        return u[0] !== "/" && (u = "/" + u),
        Xs(u, "")
    }
    const a = Xs(r, e)
      , l = !n || Nf(a, n, {
        trailingSlash: !0
    }) ? a : n;
    return l + (l.includes("?") ? "" : o) + s
}
const Uh = dt({
    name: "nuxt:router",
    enforce: "pre",
    async setup(e) {
        var T, I;
        let t, n, r = ts().app.baseURL;
        Me.hashMode && !r.includes("#") && (r += "#");
        const o = ((T = Me.history) == null ? void 0 : T.call(Me, r)) ?? (Me.hashMode ? Yp(r) : _l(r))
          , s = ((I = Me.routes) == null ? void 0 : I.call(Me, Oi)) ?? Oi;
        let i;
        const a = Dh(r, window.location, e.payload.path)
          , l = Ih({
            ...Me,
            scrollBehavior: (b,g,R)=>{
                var _;
                if (g === Xe) {
                    i = R;
                    return
                }
                return l.options.scrollBehavior = Me.scrollBehavior,
                (_ = Me.scrollBehavior) == null ? void 0 : _.call(Me, b, Xe, i || R)
            }
            ,
            history: o,
            routes: s
        });
        e.vueApp.use(l);
        const c = An(l.currentRoute.value);
        l.afterEach((b,g)=>{
            c.value = g
        }
        ),
        Object.defineProperty(e.vueApp.config.globalProperties, "previousRoute", {
            get: ()=>c.value
        });
        const u = An(l.resolve(a))
          , f = ()=>{
            u.value = l.currentRoute.value
        }
        ;
        e.hook("page:finish", f),
        l.afterEach((b,g)=>{
            var R, _, P, $;
            ((_ = (R = b.matched[0]) == null ? void 0 : R.components) == null ? void 0 : _.default) === (($ = (P = g.matched[0]) == null ? void 0 : P.components) == null ? void 0 : $.default) && f()
        }
        );
        const d = {};
        for (const b in u.value)
            Object.defineProperty(d, b, {
                get: ()=>u.value[b]
            });
        e._route = Hn(d),
        e._middleware = e._middleware || {
            global: [],
            named: {}
        };
        const m = Rr();
        try {
            [t,n] = fr(()=>l.isReady()),
            await t,
            n()
        } catch (b) {
            [t,n] = fr(()=>e.runWithContext(()=>zt(b))),
            await t,
            n()
        }
        const v = e.payload.state._layout;
        return l.beforeEach(async(b,g)=>{
            var R;
            b.meta = ct(b.meta),
            e.isHydrating && v && !Bt(b.meta.layout) && (b.meta.layout = v),
            e._processingMiddleware = !0;
            {
                const _ = new Set([...Bh, ...e._middleware.global]);
                for (const P of b.matched) {
                    const $ = P.meta.middleware;
                    if ($)
                        if (Array.isArray($))
                            for (const F of $)
                                _.add(F);
                        else
                            _.add($)
                }
                for (const P of _) {
                    const $ = typeof P == "string" ? e._middleware.named[P] || await ((R = Tn[P]) == null ? void 0 : R.call(Tn).then(k=>k.default || k)) : P;
                    if (!$)
                        throw new Error(`Unknown route middleware: '${P}'.`);
                    const F = await e.runWithContext(()=>$(b, g));
                    if (!e.payload.serverRendered && e.isHydrating && (F === !1 || F instanceof Error)) {
                        const k = F || bo({
                            statusCode: 404,
                            statusMessage: `Page Not Found: ${a}`
                        });
                        return await e.runWithContext(()=>zt(k)),
                        !1
                    }
                    if (F !== !0 && (F || F === !1))
                        return F
                }
            }
        }
        ),
        l.onError(()=>{
            delete e._processingMiddleware
        }
        ),
        l.afterEach(async(b,g,R)=>{
            delete e._processingMiddleware,
            !e.isHydrating && m.value && await e.runWithContext(yp),
            b.matched.length === 0 && await e.runWithContext(()=>zt(bo({
                statusCode: 404,
                fatal: !1,
                statusMessage: `Page not found: ${b.fullPath}`
            })))
        }
        ),
        e.hooks.hookOnce("app:created", async()=>{
            try {
                await l.replace({
                    ...l.resolve(a),
                    name: void 0,
                    force: !0
                }),
                l.options.scrollBehavior = Me.scrollBehavior
            } catch (b) {
                await e.runWithContext(()=>zt(b))
            }
        }
        ),
        {
            provide: {
                router: l
            }
        }
    }
})
  , Kh = dt({
    name: "nuxt:payload",
    setup(e) {
        Tt().beforeResolve(async(t,n)=>{
            if (t.path === n.path)
                return;
            const r = await di(t.path);
            r && Object.assign(e.static.data, r.data)
        }
        ),
        _p(()=>{
            e.hooks.hook("link:prefetch", async t=>{
                xr(t).protocol || await di(t)
            }
            )
        }
        )
    }
})
  , Wh = dt({
    name: "nuxt:global-components"
})
  , jt = {
    main: ()=>vt(()=>import("./main.9afc02e2.js"), [], import.meta.url).then(e=>e.default || e)
}
  , qh = dt({
    name: "nuxt:prefetch",
    setup(e) {
        const t = Tt();
        e.hooks.hook("app:mounted", ()=>{
            t.beforeEach(async n=>{
                var o;
                const r = (o = n == null ? void 0 : n.meta) == null ? void 0 : o.layout;
                r && typeof jt[r] == "function" && await jt[r]()
            }
            )
        }
        ),
        e.hooks.hook("link:prefetch", n=>{
            var i, a, l, c;
            if (Nn(n))
                return;
            const r = t.resolve(n);
            if (!r)
                return;
            const o = (i = r == null ? void 0 : r.meta) == null ? void 0 : i.layout;
            let s = Array.isArray((a = r == null ? void 0 : r.meta) == null ? void 0 : a.middleware) ? (l = r == null ? void 0 : r.meta) == null ? void 0 : l.middleware : [(c = r == null ? void 0 : r.meta) == null ? void 0 : c.middleware];
            s = s.filter(u=>typeof u == "string");
            for (const u of s)
                typeof Tn[u] == "function" && Tn[u]();
            o && typeof jt[o] == "function" && jt[o]()
        }
        )
    }
})
  , Vh = "__NUXT_COLOR_MODE__"
  , zh = "nuxt-color-mode"
  , rt = window[Vh]
  , Jh = dt(e=>{
    const t = wp("color-mode", ()=>ct({
        preference: rt.preference,
        value: rt.value,
        unknown: !1,
        forced: !1
    })).value;
    Tt().afterEach(o=>{
        const s = o.meta.colorMode;
        s && s !== "system" ? (t.value = s,
        t.forced = !0) : (s === "system" && console.warn("You cannot force the colorMode to system at the page level."),
        t.forced = !1,
        t.value = t.preference === "system" ? rt.getColorScheme() : t.preference)
    }
    );
    let n;
    function r() {
        n || !window.matchMedia || (n = window.matchMedia("(prefers-color-scheme: dark)"),
        n.addEventListener("change", ()=>{
            !t.forced && t.preference === "system" && (t.value = rt.getColorScheme())
        }
        ))
    }
    Ht(()=>t.preference, o=>{
        var s;
        t.forced || (o === "system" ? (t.value = rt.getColorScheme(),
        r()) : t.value = o,
        (s = window.localStorage) == null || s.setItem(zh, o))
    }
    , {
        immediate: !0
    }),
    Ht(()=>t.value, (o,s)=>{
        rt.removeColorScheme(s),
        rt.addColorScheme(o)
    }
    ),
    t.preference === "system" && r(),
    e.hook("app:mounted", ()=>{
        t.unknown && (t.preference = rt.preference,
        t.value = rt.value,
        t.unknown = !1)
    }
    ),
    e.provide("colorMode", t)
}
)
  , Qh = dt({
    name: "nuxt:chunk-reload",
    setup(e) {
        const t = Tt()
          , n = ts()
          , r = new Set;
        t.beforeEach(()=>{
            r.clear()
        }
        ),
        e.hook("app:chunkError", ({error: s})=>{
            r.add(s)
        }
        );
        function o(s) {
            const a = "href"in s && s.href.startsWith("#") ? n.app.baseURL + s.href : Fn(n.app.baseURL, s.fullPath);
            Ep({
                path: a,
                persistState: !0
            })
        }
        e.hook("app:manifest:update", ()=>{
            t.beforeResolve(o)
        }
        ),
        t.onError((s,i)=>{
            r.has(s) && o(i)
        }
        )
    }
});
var Yh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xh(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Pl = {
    exports: {}
};
(function(e, t) {
    (function(n, r) {
        e.exports = r()
    }
    )(Yh, function() {
        return function(n) {
            function r(s) {
                if (o[s])
                    return o[s].exports;
                var i = o[s] = {
                    exports: {},
                    id: s,
                    loaded: !1
                };
                return n[s].call(i.exports, i, i.exports, r),
                i.loaded = !0,
                i.exports
            }
            var o = {};
            return r.m = n,
            r.c = o,
            r.p = "dist/",
            r(0)
        }([function(n, r, o) {
            function s(A) {
                return A && A.__esModule ? A : {
                    default: A
                }
            }
            var i = Object.assign || function(A) {
                for (var te = 1; te < arguments.length; te++) {
                    var Q = arguments[te];
                    for (var G in Q)
                        Object.prototype.hasOwnProperty.call(Q, G) && (A[G] = Q[G])
                }
                return A
            }
              , a = o(1)
              , l = (s(a),
            o(6))
              , c = s(l)
              , u = o(7)
              , f = s(u)
              , d = o(8)
              , m = s(d)
              , v = o(9)
              , T = s(v)
              , I = o(10)
              , b = s(I)
              , g = o(11)
              , R = s(g)
              , _ = o(14)
              , P = s(_)
              , $ = []
              , F = !1
              , k = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded",
                throttleDelay: 99,
                debounceDelay: 50,
                disableMutationObserver: !1
            }
              , U = function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
                if (A && (F = !0),
                F)
                    return $ = (0,
                    R.default)($, k),
                    (0,
                    b.default)($, k.once),
                    $
            }
              , K = function() {
                $ = (0,
                P.default)(),
                U()
            }
              , O = function() {
                $.forEach(function(A, te) {
                    A.node.removeAttribute("data-aos"),
                    A.node.removeAttribute("data-aos-easing"),
                    A.node.removeAttribute("data-aos-duration"),
                    A.node.removeAttribute("data-aos-delay")
                })
            }
              , E = function(A) {
                return A === !0 || A === "mobile" && T.default.mobile() || A === "phone" && T.default.phone() || A === "tablet" && T.default.tablet() || typeof A == "function" && A() === !0
            }
              , N = function(A) {
                k = i(k, A),
                $ = (0,
                P.default)();
                var te = document.all && !window.atob;
                return E(k.disable) || te ? O() : (k.disableMutationObserver || m.default.isSupported() || (console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),
                k.disableMutationObserver = !0),
                document.querySelector("body").setAttribute("data-aos-easing", k.easing),
                document.querySelector("body").setAttribute("data-aos-duration", k.duration),
                document.querySelector("body").setAttribute("data-aos-delay", k.delay),
                k.startEvent === "DOMContentLoaded" && ["complete", "interactive"].indexOf(document.readyState) > -1 ? U(!0) : k.startEvent === "load" ? window.addEventListener(k.startEvent, function() {
                    U(!0)
                }) : document.addEventListener(k.startEvent, function() {
                    U(!0)
                }),
                window.addEventListener("resize", (0,
                f.default)(U, k.debounceDelay, !0)),
                window.addEventListener("orientationchange", (0,
                f.default)(U, k.debounceDelay, !0)),
                window.addEventListener("scroll", (0,
                c.default)(function() {
                    (0,
                    b.default)($, k.once)
                }, k.throttleDelay)),
                k.disableMutationObserver || m.default.ready("[data-aos]", K),
                $)
            };
            n.exports = {
                init: N,
                refresh: U,
                refreshHard: K
            }
        }
        , function(n, r) {}
        , , , , , function(n, r) {
            (function(o) {
                function s(E, N, A) {
                    function te(y) {
                        var w = _e
                          , x = xe;
                        return _e = xe = void 0,
                        W = y,
                        C = E.apply(x, w)
                    }
                    function Q(y) {
                        return W = y,
                        H = setTimeout(Ee, N),
                        Z ? te(y) : C
                    }
                    function G(y) {
                        var w = y - j
                          , x = y - W
                          , S = N - w;
                        return p ? K(S, ae - x) : S
                    }
                    function ee(y) {
                        var w = y - j
                          , x = y - W;
                        return j === void 0 || w >= N || w < 0 || p && x >= ae
                    }
                    function Ee() {
                        var y = O();
                        return ee(y) ? He(y) : void (H = setTimeout(Ee, G(y)))
                    }
                    function He(y) {
                        return H = void 0,
                        h && _e ? te(y) : (_e = xe = void 0,
                        C)
                    }
                    function Oe() {
                        H !== void 0 && clearTimeout(H),
                        W = 0,
                        _e = j = xe = H = void 0
                    }
                    function me() {
                        return H === void 0 ? C : He(O())
                    }
                    function Ce() {
                        var y = O()
                          , w = ee(y);
                        if (_e = arguments,
                        xe = this,
                        j = y,
                        w) {
                            if (H === void 0)
                                return Q(j);
                            if (p)
                                return H = setTimeout(Ee, N),
                                te(j)
                        }
                        return H === void 0 && (H = setTimeout(Ee, N)),
                        C
                    }
                    var _e, xe, ae, C, H, j, W = 0, Z = !1, p = !1, h = !0;
                    if (typeof E != "function")
                        throw new TypeError(d);
                    return N = u(N) || 0,
                    a(A) && (Z = !!A.leading,
                    p = "maxWait"in A,
                    ae = p ? U(u(A.maxWait) || 0, N) : ae,
                    h = "trailing"in A ? !!A.trailing : h),
                    Ce.cancel = Oe,
                    Ce.flush = me,
                    Ce
                }
                function i(E, N, A) {
                    var te = !0
                      , Q = !0;
                    if (typeof E != "function")
                        throw new TypeError(d);
                    return a(A) && (te = "leading"in A ? !!A.leading : te,
                    Q = "trailing"in A ? !!A.trailing : Q),
                    s(E, N, {
                        leading: te,
                        maxWait: N,
                        trailing: Q
                    })
                }
                function a(E) {
                    var N = typeof E > "u" ? "undefined" : f(E);
                    return !!E && (N == "object" || N == "function")
                }
                function l(E) {
                    return !!E && (typeof E > "u" ? "undefined" : f(E)) == "object"
                }
                function c(E) {
                    return (typeof E > "u" ? "undefined" : f(E)) == "symbol" || l(E) && k.call(E) == v
                }
                function u(E) {
                    if (typeof E == "number")
                        return E;
                    if (c(E))
                        return m;
                    if (a(E)) {
                        var N = typeof E.valueOf == "function" ? E.valueOf() : E;
                        E = a(N) ? N + "" : N
                    }
                    if (typeof E != "string")
                        return E === 0 ? E : +E;
                    E = E.replace(T, "");
                    var A = b.test(E);
                    return A || g.test(E) ? R(E.slice(2), A ? 2 : 8) : I.test(E) ? m : +E
                }
                var f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(E) {
                    return typeof E
                }
                : function(E) {
                    return E && typeof Symbol == "function" && E.constructor === Symbol && E !== Symbol.prototype ? "symbol" : typeof E
                }
                  , d = "Expected a function"
                  , m = NaN
                  , v = "[object Symbol]"
                  , T = /^\s+|\s+$/g
                  , I = /^[-+]0x[0-9a-f]+$/i
                  , b = /^0b[01]+$/i
                  , g = /^0o[0-7]+$/i
                  , R = parseInt
                  , _ = (typeof o > "u" ? "undefined" : f(o)) == "object" && o && o.Object === Object && o
                  , P = (typeof self > "u" ? "undefined" : f(self)) == "object" && self && self.Object === Object && self
                  , $ = _ || P || Function("return this")()
                  , F = Object.prototype
                  , k = F.toString
                  , U = Math.max
                  , K = Math.min
                  , O = function() {
                    return $.Date.now()
                };
                n.exports = i
            }
            ).call(r, function() {
                return this
            }())
        }
        , function(n, r) {
            (function(o) {
                function s(O, E, N) {
                    function A(h) {
                        var y = Ce
                          , w = _e;
                        return Ce = _e = void 0,
                        j = h,
                        ae = O.apply(w, y)
                    }
                    function te(h) {
                        return j = h,
                        C = setTimeout(ee, E),
                        W ? A(h) : ae
                    }
                    function Q(h) {
                        var y = h - H
                          , w = h - j
                          , x = E - y;
                        return Z ? U(x, xe - w) : x
                    }
                    function G(h) {
                        var y = h - H
                          , w = h - j;
                        return H === void 0 || y >= E || y < 0 || Z && w >= xe
                    }
                    function ee() {
                        var h = K();
                        return G(h) ? Ee(h) : void (C = setTimeout(ee, Q(h)))
                    }
                    function Ee(h) {
                        return C = void 0,
                        p && Ce ? A(h) : (Ce = _e = void 0,
                        ae)
                    }
                    function He() {
                        C !== void 0 && clearTimeout(C),
                        j = 0,
                        Ce = H = _e = C = void 0
                    }
                    function Oe() {
                        return C === void 0 ? ae : Ee(K())
                    }
                    function me() {
                        var h = K()
                          , y = G(h);
                        if (Ce = arguments,
                        _e = this,
                        H = h,
                        y) {
                            if (C === void 0)
                                return te(H);
                            if (Z)
                                return C = setTimeout(ee, E),
                                A(H)
                        }
                        return C === void 0 && (C = setTimeout(ee, E)),
                        ae
                    }
                    var Ce, _e, xe, ae, C, H, j = 0, W = !1, Z = !1, p = !0;
                    if (typeof O != "function")
                        throw new TypeError(f);
                    return E = c(E) || 0,
                    i(N) && (W = !!N.leading,
                    Z = "maxWait"in N,
                    xe = Z ? k(c(N.maxWait) || 0, E) : xe,
                    p = "trailing"in N ? !!N.trailing : p),
                    me.cancel = He,
                    me.flush = Oe,
                    me
                }
                function i(O) {
                    var E = typeof O > "u" ? "undefined" : u(O);
                    return !!O && (E == "object" || E == "function")
                }
                function a(O) {
                    return !!O && (typeof O > "u" ? "undefined" : u(O)) == "object"
                }
                function l(O) {
                    return (typeof O > "u" ? "undefined" : u(O)) == "symbol" || a(O) && F.call(O) == m
                }
                function c(O) {
                    if (typeof O == "number")
                        return O;
                    if (l(O))
                        return d;
                    if (i(O)) {
                        var E = typeof O.valueOf == "function" ? O.valueOf() : O;
                        O = i(E) ? E + "" : E
                    }
                    if (typeof O != "string")
                        return O === 0 ? O : +O;
                    O = O.replace(v, "");
                    var N = I.test(O);
                    return N || b.test(O) ? g(O.slice(2), N ? 2 : 8) : T.test(O) ? d : +O
                }
                var u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(O) {
                    return typeof O
                }
                : function(O) {
                    return O && typeof Symbol == "function" && O.constructor === Symbol && O !== Symbol.prototype ? "symbol" : typeof O
                }
                  , f = "Expected a function"
                  , d = NaN
                  , m = "[object Symbol]"
                  , v = /^\s+|\s+$/g
                  , T = /^[-+]0x[0-9a-f]+$/i
                  , I = /^0b[01]+$/i
                  , b = /^0o[0-7]+$/i
                  , g = parseInt
                  , R = (typeof o > "u" ? "undefined" : u(o)) == "object" && o && o.Object === Object && o
                  , _ = (typeof self > "u" ? "undefined" : u(self)) == "object" && self && self.Object === Object && self
                  , P = R || _ || Function("return this")()
                  , $ = Object.prototype
                  , F = $.toString
                  , k = Math.max
                  , U = Math.min
                  , K = function() {
                    return P.Date.now()
                };
                n.exports = s
            }
            ).call(r, function() {
                return this
            }())
        }
        , function(n, r) {
            function o(u) {
                var f = void 0
                  , d = void 0;
                for (f = 0; f < u.length; f += 1)
                    if (d = u[f],
                    d.dataset && d.dataset.aos || d.children && o(d.children))
                        return !0;
                return !1
            }
            function s() {
                return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
            }
            function i() {
                return !!s()
            }
            function a(u, f) {
                var d = window.document
                  , m = s()
                  , v = new m(l);
                c = f,
                v.observe(d.documentElement, {
                    childList: !0,
                    subtree: !0,
                    removedNodes: !0
                })
            }
            function l(u) {
                u && u.forEach(function(f) {
                    var d = Array.prototype.slice.call(f.addedNodes)
                      , m = Array.prototype.slice.call(f.removedNodes)
                      , v = d.concat(m);
                    if (o(v))
                        return c()
                })
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var c = function() {};
            r.default = {
                isSupported: i,
                ready: a
            }
        }
        , function(n, r) {
            function o(d, m) {
                if (!(d instanceof m))
                    throw new TypeError("Cannot call a class as a function")
            }
            function s() {
                return navigator.userAgent || navigator.vendor || window.opera || ""
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var i = function() {
                function d(m, v) {
                    for (var T = 0; T < v.length; T++) {
                        var I = v[T];
                        I.enumerable = I.enumerable || !1,
                        I.configurable = !0,
                        "value"in I && (I.writable = !0),
                        Object.defineProperty(m, I.key, I)
                    }
                }
                return function(m, v, T) {
                    return v && d(m.prototype, v),
                    T && d(m, T),
                    m
                }
            }()
              , a = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
              , l = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
              , c = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
              , u = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
              , f = function() {
                function d() {
                    o(this, d)
                }
                return i(d, [{
                    key: "phone",
                    value: function() {
                        var m = s();
                        return !(!a.test(m) && !l.test(m.substr(0, 4)))
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var m = s();
                        return !(!c.test(m) && !u.test(m.substr(0, 4)))
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]),
                d
            }();
            r.default = new f
        }
        , function(n, r) {
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(i, a, l) {
                var c = i.node.getAttribute("data-aos-once");
                a > i.position ? i.node.classList.add("aos-animate") : typeof c < "u" && (c === "false" || !l && c !== "true") && i.node.classList.remove("aos-animate")
            }
              , s = function(i, a) {
                var l = window.pageYOffset
                  , c = window.innerHeight;
                i.forEach(function(u, f) {
                    o(u, c + l, a)
                })
            };
            r.default = s
        }
        , function(n, r, o) {
            function s(c) {
                return c && c.__esModule ? c : {
                    default: c
                }
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var i = o(12)
              , a = s(i)
              , l = function(c, u) {
                return c.forEach(function(f, d) {
                    f.node.classList.add("aos-init"),
                    f.position = (0,
                    a.default)(f.node, u.offset)
                }),
                c
            };
            r.default = l
        }
        , function(n, r, o) {
            function s(c) {
                return c && c.__esModule ? c : {
                    default: c
                }
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var i = o(13)
              , a = s(i)
              , l = function(c, u) {
                var f = 0
                  , d = 0
                  , m = window.innerHeight
                  , v = {
                    offset: c.getAttribute("data-aos-offset"),
                    anchor: c.getAttribute("data-aos-anchor"),
                    anchorPlacement: c.getAttribute("data-aos-anchor-placement")
                };
                switch (v.offset && !isNaN(v.offset) && (d = parseInt(v.offset)),
                v.anchor && document.querySelectorAll(v.anchor) && (c = document.querySelectorAll(v.anchor)[0]),
                f = (0,
                a.default)(c).top,
                v.anchorPlacement) {
                case "top-bottom":
                    break;
                case "center-bottom":
                    f += c.offsetHeight / 2;
                    break;
                case "bottom-bottom":
                    f += c.offsetHeight;
                    break;
                case "top-center":
                    f += m / 2;
                    break;
                case "bottom-center":
                    f += m / 2 + c.offsetHeight;
                    break;
                case "center-center":
                    f += m / 2 + c.offsetHeight / 2;
                    break;
                case "top-top":
                    f += m;
                    break;
                case "bottom-top":
                    f += c.offsetHeight + m;
                    break;
                case "center-top":
                    f += c.offsetHeight / 2 + m
                }
                return v.anchorPlacement || v.offset || isNaN(u) || (d = u),
                f + d
            };
            r.default = l
        }
        , function(n, r) {
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(s) {
                for (var i = 0, a = 0; s && !isNaN(s.offsetLeft) && !isNaN(s.offsetTop); )
                    i += s.offsetLeft - (s.tagName != "BODY" ? s.scrollLeft : 0),
                    a += s.offsetTop - (s.tagName != "BODY" ? s.scrollTop : 0),
                    s = s.offsetParent;
                return {
                    top: a,
                    left: i
                }
            };
            r.default = o
        }
        , function(n, r) {
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function(s) {
                return s = s || document.querySelectorAll("[data-aos]"),
                Array.prototype.map.call(s, function(i) {
                    return {
                        node: i
                    }
                })
            };
            r.default = o
        }
        ])
    })
}
)(Pl);
var Gh = Pl.exports;
const Zh = Xh(Gh);
const em = dt(e=>{
    Zh.init({
        duration: 600,
        easing: "ease-in-out-cubic",
        once: !0
    })
}
)
  , tm = [Sp, Mp, Uh, Kh, Wh, qh, Jh, Qh, em]
  , nm = (e,t)=>t.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, n=>{
    var r;
    return ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ""
}
)
  , ko = (e,t)=>{
    const n = e.route.matched.find(o=>{
        var s;
        return ((s = o.components) == null ? void 0 : s.default) === e.Component.type
    }
    )
      , r = t ?? (n == null ? void 0 : n.meta.key) ?? (n && nm(e.route, n));
    return typeof r == "function" ? r(e.route) : r
}
  , rm = (e,t)=>({
    default: ()=>e ? Fe(Qc, e === !0 ? {} : e, t) : t
})
  , om = kt({
    name: "RouteProvider",
    props: {
        vnode: {
            type: Object,
            required: !0
        },
        route: {
            type: Object,
            required: !0
        },
        vnodeRef: Object,
        renderKey: String,
        trackRootNodes: Boolean
    },
    setup(e) {
        const t = e.renderKey
          , n = e.route
          , r = {};
        for (const o in e.route)
            Object.defineProperty(r, o, {
                get: ()=>t === e.renderKey ? e.route[o] : n[o]
            });
        return Nt(Bn, Hn(r)),
        ()=>Fe(e.vnode, {
            ref: e.vnodeRef
        })
    }
})
  , Sl = (e,t,n)=>(t = t === !0 ? {} : t,
{
    default: ()=>{
        var r;
        return t ? Fe(e, t, n) : (r = n.default) == null ? void 0 : r.call(n)
    }
})
  , sm = kt({
    name: "NuxtPage",
    inheritAttrs: !1,
    props: {
        name: {
            type: String
        },
        transition: {
            type: [Boolean, Object],
            default: void 0
        },
        keepalive: {
            type: [Boolean, Object],
            default: void 0
        },
        route: {
            type: Object
        },
        pageKey: {
            type: [Function, String],
            default: null
        }
    },
    setup(e, {attrs: t, expose: n}) {
        const r = he()
          , o = at()
          , s = Pe(Bn, null);
        n({
            pageRef: o
        });
        const i = Pe(hl, null);
        let a;
        const l = r.deferHydration();
        return ()=>Fe(Al, {
            name: e.name,
            route: e.route,
            ...t
        }, {
            default: c=>{
                const u = lm(s, c.route, c.Component)
                  , f = s && s.matched.length === c.route.matched.length;
                if (!c.Component)
                    return a && !f ? a : void 0;
                if (a && i && !i.isCurrent(c.route))
                    return a;
                if (u && s && (!i || i != null && i.isCurrent(s)))
                    return f ? a : null;
                const d = ko(c, e.pageKey)
                  , m = !!(e.transition ?? c.route.meta.pageTransition ?? vo)
                  , v = m && am([e.transition, c.route.meta.pageTransition, vo, {
                    onAfterLeave: ()=>{
                        r.callHook("page:transition:finish", c.Component)
                    }
                }].filter(Boolean));
                return a = Sl(Tr, m && v, rm(e.keepalive ?? c.route.meta.keepalive ?? kp, Fe(Uo, {
                    suspensible: !0,
                    onPending: ()=>r.callHook("page:start", c.Component),
                    onResolve: ()=>{
                        Ut(()=>r.callHook("page:finish", c.Component).finally(l))
                    }
                }, {
                    default: ()=>Fe(om, {
                        key: d,
                        vnode: c.Component,
                        route: c.route,
                        renderKey: d,
                        trackRootNodes: m,
                        vnodeRef: o
                    })
                }))).default(),
                a
            }
        })
    }
});
function im(e) {
    return Array.isArray(e) ? e : e ? [e] : []
}
function am(e) {
    const t = e.map(n=>({
        ...n,
        onAfterLeave: im(n.onAfterLeave)
    }));
    return up(...t)
}
function lm(e, t, n) {
    if (!e)
        return !1;
    const r = t.matched.findIndex(o=>{
        var s;
        return ((s = o.components) == null ? void 0 : s.default) === (n == null ? void 0 : n.type)
    }
    );
    return !r || r === -1 ? !1 : t.matched.slice(0, r).some((o,s)=>{
        var i, a, l;
        return ((i = o.components) == null ? void 0 : i.default) !== ((l = (a = e.matched[s]) == null ? void 0 : a.components) == null ? void 0 : l.default)
    }
    ) || n && ko({
        route: t,
        Component: n
    }) !== ko({
        route: e,
        Component: n
    })
}
const cm = kt({
    name: "LayoutLoader",
    inheritAttrs: !1,
    props: {
        name: String,
        layoutProps: Object
    },
    async setup(e, t) {
        const n = await jt[e.name]().then(r=>r.default || r);
        return ()=>Fe(n, e.layoutProps, t.slots)
    }
})
  , um = kt({
    name: "NuxtLayout",
    inheritAttrs: !1,
    props: {
        name: {
            type: [String, Boolean, Object],
            default: null
        }
    },
    setup(e, t) {
        const n = he()
          , r = Pe(Bn)
          , o = r === rs() ? $h() : r
          , s = Ue(()=>fe(e.name) ?? o.meta.layout ?? "default")
          , i = at();
        t.expose({
            layoutRef: i
        });
        const a = n.deferHydration();
        return ()=>{
            const l = s.value && s.value in jt
              , c = o.meta.layoutTransition ?? Cp;
            return Sl(Tr, l && c, {
                default: ()=>Fe(Uo, {
                    suspensible: !0,
                    onResolve: ()=>{
                        Ut(a)
                    }
                }, {
                    default: ()=>Fe(fm, {
                        layoutProps: Na(t.attrs, {
                            ref: i
                        }),
                        key: s.value,
                        name: s.value,
                        shouldProvide: !e.name,
                        hasTransition: !!c
                    }, t.slots)
                })
            }).default()
        }
    }
})
  , fm = kt({
    name: "NuxtLayoutProvider",
    inheritAttrs: !1,
    props: {
        name: {
            type: [String, Boolean]
        },
        layoutProps: {
            type: Object
        },
        hasTransition: {
            type: Boolean
        },
        shouldProvide: {
            type: Boolean
        }
    },
    setup(e, t) {
        const n = e.name;
        return e.shouldProvide && Nt(hl, {
            isCurrent: r=>n === (r.meta.layout ?? "default")
        }),
        ()=>{
            var r, o;
            return !n || typeof n == "string" && !(n in jt) ? (o = (r = t.slots).default) == null ? void 0 : o.call(r) : Fe(cm, {
                key: n,
                layoutProps: e.layoutProps,
                name: n
            }, t.slots)
        }
    }
})
  , dm = (e,t)=>{
    const n = e.__vccOpts || e;
    for (const [r,o] of t)
        n[r] = o;
    return n
}
  , pm = {};
function hm(e, t) {
    const n = sm
      , r = um;
    return et(),
    st(r, {
        name: "main"
    }, {
        default: Bo(()=>[de(n)]),
        _: 1
    })
}
const mm = dm(pm, [["render", hm]])
  , gm = {
    __name: "nuxt-error-page",
    props: {
        error: Object
    },
    setup(e) {
        const n = e.error;
        (n.stack || "").split(`
`).splice(1).map(f=>({
            text: f.replace("webpack:/", "").replace(".vue", ".js").trim(),
            internal: f.includes("node_modules") && !f.includes(".cache") || f.includes("internal") || f.includes("new Promise")
        })).map(f=>`<span class="stack ${f.internal ? " internal" : ""}">${f.text}</span>`).join(`
`);
        const r = Number(n.statusCode || 500)
          , o = r === 404
          , s = n.statusMessage ?? (o ? "Page Not Found" : "Internal Server Error")
          , i = n.message || n.toString()
          , a = void 0
          , u = o ? Cs(()=>vt(()=>import("./error-404.952a1fed.js"), ["./error-404.952a1fed.js", "./nuxt-link.92e35659.js", "./vue.f36acd1f.5dbaf966.js", "./error-404.95c28eb4.css"], import.meta.url).then(f=>f.default || f)) : Cs(()=>vt(()=>import("./error-500.43b98de7.js"), ["./error-500.43b98de7.js", "./vue.f36acd1f.5dbaf966.js", "./error-500.e798523c.css"], import.meta.url).then(f=>f.default || f));
        return (f,d)=>(et(),
        st(fe(u), Ul(Ha({
            statusCode: fe(r),
            statusMessage: fe(s),
            description: fe(i),
            stack: fe(a)
        })), null, 16))
    }
}
  , ym = gm
  , bm = {
    __name: "nuxt-root",
    setup(e) {
        const t = ()=>null
          , n = he()
          , r = n.deferHydration()
          , o = !1;
        Nt(Bn, rs()),
        n.hooks.callHookWith(a=>a.map(l=>l()), "vue:setup");
        const s = Rr();
        ba((a,l,c)=>{
            if (n.hooks.callHook("vue:error", a, l, c).catch(u=>console.error("[nuxt] Error in `vue:error` hook", u)),
            bp(a) && (a.fatal || a.unhandled))
                return n.runWithContext(()=>zt(a)),
                !1
        }
        );
        const i = !1;
        return (a,l)=>(et(),
        st(Uo, {
            onResolve: fe(r)
        }, {
            default: Bo(()=>[fe(s) ? (et(),
            st(fe(ym), {
                key: 0,
                error: fe(s)
            }, null, 8, ["error"])) : fe(i) ? (et(),
            st(fe(t), {
                key: 1,
                context: fe(i)
            }, null, 8, ["context"])) : fe(o) ? (et(),
            st(ou(fe(o)), {
                key: 2
            })) : (et(),
            st(fe(mm), {
                key: 3
            }))]),
            _: 1
        }, 8, ["onResolve"]))
    }
}
  , Ii = bm;
globalThis.$fetch || (globalThis.$fetch = ed.create({
    baseURL: nd()
}));
let ji;
{
    let e;
    ji = async function() {
        var s, i;
        if (e)
            return e;
        const r = !!((s = window.__NUXT__) != null && s.serverRendered || ((i = document.getElementById("__NUXT_DATA__")) == null ? void 0 : i.dataset.ssr) === "true") ? cf(Ii) : lf(Ii)
          , o = md({
            vueApp: r
        });
        try {
            await yd(o, tm)
        } catch (a) {
            await o.callHook("app:error", a),
            o.payload.error = o.payload.error || a
        }
        try {
            await o.hooks.callHook("app:created", r),
            await o.hooks.callHook("app:beforeMount", r),
            r.mount(Tp),
            await o.hooks.callHook("app:mounted", r),
            await Ut()
        } catch (a) {
            await o.callHook("app:error", a),
            o.payload.error = o.payload.error || a
        }
        return r
    }
    ,
    e = ji().catch(t=>{
        console.error("Error while mounting app:", t)
    }
    )
}
export {he as $, Xo as A, Ut as B, Ht as C, zl as D, vm as E, je as F, Ue as G, An as H, km as I, st as J, wp as K, Rm as L, Mm as M, Im as N, ts as O, Tt as P, Nn as Q, _p as R, fi as S, Tr as T, Nm as U, Fe as V, xr as W, Tf as X, lo as Y, qa as Z, dm as _, $a as a, Lm as a0, po as a1, ll as a2, Hm as a3, Xc as a4, Yc as a5, Am as a6, de as b, Pm as c, La as d, Cm as e, xm as f, Sm as g, kt as h, Om as i, Tm as j, jm as k, qo as l, Vo as m, yr as n, et as o, Em as p, gr as q, at as r, ve as s, _m as t, fe as u, $m as v, Bo as w, ra as x, Gi as y, wm as z};
