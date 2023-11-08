import {r as i, I as d, a1 as m, a2 as _, _ as h, o as p, c as f, a as r, d as x, h as g, l as k} from "./entry.c3fd9bbf.js";
import {u as b} from "./vue.f36acd1f.5dbaf966.js";
function v(a, e) {
    const n = i({});
    return d(()=>{
        const c = m(a)
          , {title: t, titleTemplate: l, ...o} = c;
        n.value = {
            title: t,
            titleTemplate: l,
            meta: _(o)
        }
    }
    ),
    b(n, e)
}
const T = {}
  , y = {
    class: "body-font"
}
  , M = r("div", {
    class: "container mx-auto flex flex-col items-center px-5 py-8"
}, [r("p", {
    class: "mt-4 text-sm font-medium text-black opacity-70 drop-shadow-xl dark:text-white sm:mt-0 sm:py-2"
}, [x(" Made with ❤️ by "), r("a", {
    class: "hover:underline",
    href: "https://github.com/lucialv"
}, "@lucialv")])], -1)
  , w = [M];
function I(a, e) {
    return p(),
    f("footer", y, w)
}
const E = h(T, [["render", I]])
  , H = g({
    name: "ClientOnly",
    inheritAttrs: !1,
    props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
    setup(a, {slots: e, attrs: n}) {
        const c = i(!1);
        return k(()=>{
            c.value = !0
        }
        ),
        t=>{
            var s;
            if (c.value)
                return (s = e.default) == null ? void 0 : s.call(e);
            const l = e.fallback || e.placeholder;
            if (l)
                return l();
            const o = t.fallback || t.placeholder || ""
              , u = t.fallbackTag || t.placeholderTag || "span";
            return f(u, n, o)
        }
    }
})
  , B = {
    url: "/images/metaimage.png",
    alt: "MetaImage",
    width: 1200,
    height: 628
};
function N(a) {
    a.image,
    v({
        title: a.title
    })
}
export {H as _, E as a, N as d};
