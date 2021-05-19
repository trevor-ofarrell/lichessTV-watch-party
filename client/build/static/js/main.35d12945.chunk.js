(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    47: function (e, t, n) {},
    83: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n.n(r),
        c = n(38),
        s = n.n(c),
        o =
          (n(47),
          function (e) {
            e &&
              e instanceof Function &&
              n
                .e(3)
                .then(n.bind(null, 84))
                .then(function (t) {
                  var n = t.getCLS,
                    r = t.getFID,
                    a = t.getFCP,
                    c = t.getLCP,
                    s = t.getTTFB;
                  n(e), r(e), a(e), c(e), s(e);
                });
          }),
        i = n(2),
        d = n(8),
        l = (n(22), n(21)),
        u = n(40),
        b = n.n(u),
        m = n(13),
        h = n(41),
        j = n.n(h),
        g = "new-message-event",
        f = "https://".concat("d9.wtf"),
        x = function () {
          var e = Object(r.useState)([]),
            t = Object(i.a)(e, 2),
            n = t[0],
            a = t[1],
            c = Object(r.useState)(new Set()),
            s = Object(i.a)(c, 2),
            o = s[0],
            l = s[1],
            u = Object(r.useRef)();
          Object(r.useEffect)(function () {
            return (
              (u.current = j()(f)),
              u.current.on(g, function (e) {
                var t = Object(d.a)(
                  Object(d.a)({}, e),
                  {},
                  { isOwner: e.senderId === u.current.id }
                );
                a(function (e) {
                  return [].concat(Object(m.a)(e), [t]);
                });
              }),
              u.current.on("disconnect", function () {
                o.forEach(function (e) {
                  e.id === u.current.id &&
                    (o.delete(e),
                    l(o),
                    a(function (e) {
                      return [].concat(Object(m.a)(e), [
                        {
                          body: "".concat(u.current.name, " disconnected"),
                          senderId: u.current.id,
                          name: "",
                          system: !0,
                        },
                      ]);
                    }));
                });
              }),
              function () {
                u.current.disconnect();
              }
            );
          }, []);
          return {
            messages: n,
            sendMessage: function (e, t) {
              var n = Array.from(o).filter(function (e) {
                return e.id === u.current.id;
              });
              n.length && (n = n[0]),
                u.current.emit(g, {
                  body: e,
                  senderId: u.current.id,
                  name: n.name,
                  system: t,
                });
            },
            createUser: function (e) {
              l(function (t) {
                return new Set(
                  [].concat(Object(m.a)(t), [{ name: e, id: u.current.id }])
                );
              }),
                a(function (t) {
                  return [].concat(Object(m.a)(t), [
                    {
                      body: "".concat(e, " just joined the party! Welcome!"),
                      senderId: u.current.id,
                      name: "",
                      system: !0,
                    },
                  ]);
                });
            },
          };
        },
        p = n(1),
        O = l.a.input({
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          "::placeholder": {
            "--tw-placeholder-opacity": "1",
            color: "rgba(160, 174, 192, var(--tw-placeholder-opacity))",
          },
          width: "auto",
          ":focus": {
            "--tw-ring-opacity": "1",
            "--tw-ring-color": "rgba(162, 115, 255, var(--tw-ring-opacity))",
            "--tw-border-opacity": "1",
            borderColor: "rgba(100, 21, 255, var(--tw-border-opacity))",
          },
          "--tw-border-opacity": "1",
          borderColor: "rgba(203, 213, 224, var(--tw-border-opacity))",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "0.375rem",
          "--tw-shadow": "0 0 0 1px rgba(0, 0, 0, 0.05)",
          boxShadow:
            "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
          "@media (min-width: 1024px)": {
            marginLeft: "auto",
            marginRight: "auto",
          },
        }),
        w =
          (Object(l.a)(O)({
            textAlign: "left",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          "https://".concat("d9.wtf", "/lichesstv")),
        y = function () {
          var e = x(),
            t = e.messages,
            n = e.sendMessage,
            a = e.createUser,
            c = (e.loggedIn, e.setLoggedIn, Object(r.useState)("")),
            s = Object(i.a)(c, 2),
            o = s[0],
            d = s[1],
            l = Object(r.useState)([]),
            u = Object(i.a)(l, 2),
            m = u[0],
            h = u[1],
            j = Object(r.useState)(""),
            g = Object(i.a)(j, 2),
            f = g[0],
            O = g[1],
            y = Object(r.useState)(""),
            v = Object(i.a)(y, 2),
            N = v[0],
            S = v[1],
            C = Object(r.useState)(""),
            I = Object(i.a)(C, 2),
            E = I[0],
            F = I[1],
            k = Object(r.useRef)(),
            L = Object(r.useState)(!1),
            M = Object(i.a)(L, 2),
            R = M[0],
            B = M[1],
            J = Object(r.useState)(!1),
            T = Object(i.a)(J, 2),
            W = T[0],
            U = T[1];
          return (
            Object(r.useEffect)(function () {
              return k.current.scrollIntoView({ behavior: "smooth" });
            }),
            Object(r.useEffect)(
              function () {
                R ||
                  ((new EventSource(w).onmessage = function (e) {
                    var t = JSON.parse(e.data);
                    if ((h([t.d.fen]), t.d.players)) {
                      var r = "",
                        a = "";
                      t.d.players[0].user.name &&
                        ((r = t.d.players[0].user.title
                          ? t.d.players[0].user.title +
                            " " +
                            t.d.players[0].user.name +
                            " " +
                            t.d.players[0].rating
                          : t.d.players[0].user.name +
                            " " +
                            t.d.players[0].rating),
                        S(r)),
                        t.d.players[1].user.name &&
                          ((a = t.d.players[1].user.title
                            ? t.d.players[1].user.title +
                              " " +
                              t.d.players[1].user.name +
                              " " +
                              t.d.players[1].rating
                            : t.d.players[1].user.name +
                              " " +
                              t.d.players[1].rating),
                          O(a)),
                        n(
                          "".concat(a, " (black) VS. ").concat(r, " (white)"),
                          !0
                        ),
                        t.d.id &&
                          n(
                            "Game in progress at https://lichess.org/".concat(
                              t.d.id
                            ),
                            !0
                          );
                    }
                  }),
                  B(!0));
              },
              [R, m]
            ),
            Object(p.jsxs)("div", {
              className:
                "w-screen max-h-screen h-screen bg-gray-900 overflow-hidden",
              children: [
                Object(p.jsxs)("div", {
                  className:
                    "font-medium md:text-sm text-xs text-white max-w-90",
                  children: ["FEN: ", m],
                }),
                Object(p.jsxs)("div", {
                  className:
                    "w-fulle max-h-full h-full ml-auto bg-gray-900 flex flex-col lg:items-stretch lg:flex-row overflow-hidden",
                  children: [
                    Object(p.jsx)("div", {
                      className: "sm:mt-auto overflow-hidden m-auto",
                      children: Object(p.jsxs)("div", {
                        className: "m-auto",
                        children: [
                          Object(p.jsx)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: f,
                          }),
                          Object(p.jsx)("div", {
                            className: "m-auto",
                            children: Object(p.jsx)(b.a, {
                              position: m[0],
                              transitionDuration: 100,
                              calcWidth: function (e) {
                                return e.screenWidth > 600 &&
                                  e.screenHeight > 400
                                  ? (e.screenHeight / 100) * 47.5
                                  : (screen.width / 100) * 85;
                              },
                            }),
                          }),
                          Object(p.jsxs)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: [" ", N],
                          }),
                        ],
                      }),
                    }),
                    Object(p.jsx)("div", {
                      className:
                        "shadow-2xl rounded-lg h-full lg:w-2/6 lg:max-h-full max-h-4/12 w-full max-w-full lg:max-w-2/6 pb-14 bg-gray-900 ml-auto",
                      children: Object(p.jsxs)("div", {
                        className: "h-full ml-1 mt-1 overflow-y-auto",
                        children: [
                          !0 === W
                            ? Object(p.jsxs)(p.Fragment, {
                                children: [
                                  Object(p.jsx)("ol", {
                                    children: t.map(function (e, t) {
                                      return Object(p.jsx)(
                                        "li",
                                        {
                                          children:
                                            !0 === e.system
                                              ? Object(p.jsx)("div", {
                                                  className:
                                                    "text-center text-gray-500 text-sm",
                                                  children: e.body,
                                                })
                                              : Object(p.jsxs)("span", {
                                                  className:
                                                    "text-left text-white text-sm flex",
                                                  children: [
                                                    e.name
                                                      ? Object(p.jsxs)("div", {
                                                          className:
                                                            "font-bold text-primary-400 mr-1",
                                                          children: [
                                                            e.name,
                                                            ":",
                                                          ],
                                                        })
                                                      : Object(
                                                          p.jsx
                                                        )(p.Fragment, {
                                                          children: "",
                                                        }),
                                                    e.body,
                                                  ],
                                                }),
                                        },
                                        t
                                      );
                                    }),
                                  }),
                                  Object(p.jsxs)("div", {
                                    className:
                                      "lg:w-30% px-auto w-99 bottom-0 absolute",
                                    children: [
                                      Object(p.jsx)("input", {
                                        className:
                                          "w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline",
                                        id: "message",
                                        type: "text",
                                        label: "Message",
                                        placeholder: "enter message here",
                                        variant: "outlined",
                                        value: o,
                                        onChange: function (e) {
                                          d(e.target.value);
                                        },
                                        onKeyUp: function (e) {
                                          "Enter" === e.key &&
                                            "" !== o &&
                                            (n(o, !1), d(""));
                                        },
                                      }),
                                      Object(p.jsx)("button", {
                                        className:
                                          "absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-purple-800 rounded-r-lg hover:bg-purple-900 focus:bg-purple-900",
                                        disabled: !o,
                                        variant: "contained",
                                        color: "primary",
                                        onClick: function () {
                                          "" !== o && (n(o, !1), d(""));
                                        },
                                        children: "Send",
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : Object(p.jsxs)("div", {
                                className: "m-auto",
                                children: [
                                  Object(p.jsx)("div", {
                                    className:
                                      "font-bold text-white text-lg px-4",
                                    children:
                                      "Create a username to join the chat",
                                  }),
                                  Object(p.jsx)("div", {
                                    children: Object(p.jsx)("div", {
                                      className: "w-full overflow-hidden p-4",
                                      children: Object(p.jsx)("input", {
                                        className:
                                          "w-full h-10 pl-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline",
                                        id: "message",
                                        type: "text",
                                        label: "Message",
                                        placeholder: "enter username",
                                        variant: "outlined",
                                        value: E,
                                        onChange: function (e) {
                                          return F(e.target.value);
                                        },
                                        onSubmit: function () {
                                          a(E), U(!0);
                                        },
                                      }),
                                    }),
                                  }),
                                  Object(p.jsx)("button", {
                                    className:
                                      "h-12 m-auto flex items-center px-4 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:bg-green-600",
                                    variant: "contained",
                                    color: "primary",
                                    onClick: function () {
                                      a(E), U(!0);
                                    },
                                    children: "Join Chat",
                                  }),
                                ],
                              }),
                          Object(p.jsx)("div", { ref: k }),
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            })
          );
        };
      s.a.render(
        Object(p.jsx)(a.a.StrictMode, { children: Object(p.jsx)(y, {}) }),
        document.getElementById("root")
      ),
        o();
    },
  },
  [[83, 1, 2]],
]);
//# sourceMappingURL=main.35d12945.chunk.js.map
