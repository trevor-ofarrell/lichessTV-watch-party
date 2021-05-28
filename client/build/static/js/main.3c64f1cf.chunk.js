(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    127: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(0),
        a = n.n(r),
        c = n(67),
        o = n.n(c),
        i = (n(40), n(35)),
        s = n(4),
        d = n(2),
        l = n(9),
        u = (n(22), n(15)),
        h = n(1),
        m = u.a.input({
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
        b =
          (Object(u.a)(m)({
            textAlign: "left",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          function () {
            var e = window;
            return { width: e.innerWidth, height: e.innerHeight };
          }),
        f = function (e) {
          var t = (function () {
              var e = Object(r.useState)(b()),
                t = Object(d.a)(e, 2),
                n = t[0],
                a = t[1];
              return (
                Object(r.useEffect)(function () {
                  function e() {
                    a(b());
                  }
                  return (
                    window.addEventListener("resize", e),
                    function () {
                      return window.removeEventListener("resize", e);
                    }
                  );
                }, []),
                n
              );
            })(),
            n = t.height,
            a = t.width,
            c = Object(r.useState)(""),
            o = Object(d.a)(c, 2),
            i = o[0],
            l = o[1],
            u = Object(r.useState)(""),
            m = Object(d.a)(u, 2),
            f = m[0],
            x = m[1],
            j = Object(s.f)(),
            g = function () {
              i.length
                ? j.push({ pathname: "/".concat(i), state: { name: f } })
                : j.push({ pathname: "/featured", state: { name: f } });
            };
          return Object(h.jsxs)("div", {
            style: { height: n, width: a },
            className: "bg-black overflow-hidden fixed",
            children: [
              Object(h.jsx)("div", {
                className: "text-white text-2xl text-center p-2 pb-6",
                children: "lichessTV watch party",
              }),
              Object(h.jsxs)("div", {
                className:
                  "xl:w-full w-80 overflow-hidden p-4 m-auto md:pt-20 pt-10",
                children: [
                  Object(h.jsx)("input", {
                    className:
                      "w-full h-10 pl-3 mb-4 text-base bg-gray-700 placeholder-white border rounded-lg focus:shadow-outline",
                    id: "message",
                    type: "text",
                    label: "Message",
                    placeholder: "create username",
                    variant: "outlined",
                    value: f,
                    onChange: function (e) {
                      return x(e.target.value);
                    },
                  }),
                  Object(h.jsx)("div", {
                    className: "m-auto text-center text-white mb-8",
                    children: Object(h.jsx)("button", {
                      onClick: function () {
                        return g();
                      },
                      className:
                        "border-white border-1 px-20 py-4 mt-4 rounded-lg",
                      children: "join featured room",
                    }),
                  }),
                  Object(h.jsx)("div", {
                    className: "text-white text-center p-2 pb-8",
                    children:
                      "or enter a lichess.org game ID to create a room for a specific game in play",
                  }),
                  Object(h.jsx)("input", {
                    className:
                      "w-full h-10 pl-3 text-base bg-gray-700 placeholder-white border rounded-lg focus:shadow-outline",
                    id: "message",
                    type: "text",
                    label: "Message",
                    placeholder: "enter lichess game id",
                    variant: "outlined",
                    value: i,
                    onChange: function (e) {
                      return l(e.target.value);
                    },
                  }),
                ],
              }),
              Object(h.jsx)("div", {
                className: "m-auto text-center text-white",
                children: Object(h.jsx)("button", {
                  onClick: function () {
                    return g();
                  },
                  className: "border-white border-1 px-20 py-4 mt-6 rounded-lg",
                  children: "create custom room",
                }),
              }),
              Object(h.jsxs)("div", {
                className:
                  "text-center fixed w-full bottom-0 border-t-1 text-white p-4 flex",
                children: [
                  Object(h.jsx)("a", {
                    href: "https://lichess.org/api",
                    className: "lg:text-xl text-sm text-white underline m-auto",
                    children: "moves streamed using the lichess.org API",
                  }),
                  Object(h.jsx)("h1", {
                    className: "md:text-xl text-sm px-2",
                    children: "-",
                  }),
                  Object(h.jsx)("a", {
                    href:
                      "https://github.com/trevor-ofarrell/lichessTV-watch-party",
                    className: "lg:text-xl text-sm text-white underline m-auto",
                    children: "check out the source code on my GitHub",
                  }),
                ],
              }),
            ],
          });
        },
        x = n(29),
        j = n.n(x),
        g = n(24),
        p = n(23),
        w = n.n(p),
        v = n(38),
        O = n(68),
        y = n.n(O),
        N = n(39),
        S = n.n(N),
        E = "NEW_CHAT_MESSAGE_EVENT",
        T = "START_TYPING_MESSAGE_EVENT",
        I = "STOP_TYPING_MESSAGE_EVENT",
        C = function (e, t) {
          var n = Object(r.useState)([]),
            a = Object(d.a)(n, 2),
            c = a[0],
            o = a[1],
            i = Object(r.useState)([]),
            s = Object(d.a)(i, 2),
            u = s[0],
            h = s[1],
            m = Object(r.useState)([]),
            b = Object(d.a)(m, 2),
            f = b[0],
            x = b[1],
            j = Object(r.useState)(),
            p = Object(d.a)(j, 2),
            O = p[0],
            N = p[1],
            C = Object(r.useRef)(),
            k = function () {
              var e = [
                "text-green-500",
                "text-purple-500",
                "text-pink-500",
                "text-red-500",
                "text-red-700",
                "text-blue-500",
                "text-blue-300",
                "text-green-400",
                "text-pink-700",
                "text-primary-500",
                "text-orange-500",
              ];
              return e[Math.floor(Math.random() * e.length)];
            };
          Object(r.useEffect)(function () {
            N({ name: t, color: k() });
          }, []),
            Object(r.useEffect)(
              function () {
                (function () {
                  var t = Object(v.a)(
                    w.a.mark(function t() {
                      var n, r;
                      return w.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (t.next = 2),
                                S.a.get(
                                  ""
                                    .concat("http://localhost:3030", "/rooms/")
                                    .concat(e, "/users")
                                )
                              );
                            case 2:
                              (n = t.sent), (r = n.data.users), h(r);
                            case 5:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    })
                  );
                  return function () {
                    return t.apply(this, arguments);
                  };
                })()();
              },
              [e]
            ),
            Object(r.useEffect)(
              function () {
                (function () {
                  var t = Object(v.a)(
                    w.a.mark(function t() {
                      var n, r;
                      return w.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (t.next = 2),
                                S.a.get(
                                  ""
                                    .concat("http://localhost:3030", "/rooms/")
                                    .concat(e, "/messages")
                                )
                              );
                            case 2:
                              (n = t.sent), (r = n.data.messages), o(r);
                            case 5:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    })
                  );
                  return function () {
                    return t.apply(this, arguments);
                  };
                })()();
              },
              [e]
            ),
            Object(r.useEffect)(
              function () {
                if (O)
                  return (
                    (C.current = y()("http://localhost:3030", {
                      query: { roomId: e, name: O.name },
                    })),
                    C.current.on("connect", function () {
                      console.log(C.current.id);
                    }),
                    C.current.on("USER_JOIN_CHAT_EVENT", function (e) {
                      e.id !== "".concat(C.current.id).concat(e.name) &&
                        h(function (t) {
                          return [].concat(Object(g.a)(t), [e]);
                        });
                    }),
                    C.current.on("USER_LEAVE_CHAT_EVENT", function (e) {
                      h(function (t) {
                        return t.filter(function (t) {
                          return t.id !== e.id;
                        });
                      });
                    }),
                    C.current.on(E, function (e) {
                      var t = Object(l.a)(
                        Object(l.a)({}, e),
                        {},
                        {
                          ownedByCurrentUser:
                            e.senderId ===
                            "".concat(C.current.id).concat(O.name),
                        }
                      );
                      o(function (e) {
                        return [].concat(Object(g.a)(e), [t]);
                      });
                    }),
                    C.current.on(T, function (e) {
                      if (
                        e.senderId !== "".concat(C.current.id).concat(O.name)
                      ) {
                        var t = e.user;
                        x(function (e) {
                          return [].concat(Object(g.a)(e), [t]);
                        });
                      }
                    }),
                    C.current.on(I, function (e) {
                      if (
                        e.senderId !== "".concat(C.current.id).concat(O.name)
                      ) {
                        var t = e.user;
                        x(function (e) {
                          return e.filter(function (e) {
                            return e.name !== t.name;
                          });
                        });
                      }
                    }),
                    function () {
                      C.current.disconnect();
                    }
                  );
              },
              [e, O]
            );
          return {
            messages: c,
            user: O,
            users: u,
            typingUsers: f,
            sendMessage: function (e, t) {
              C.current &&
                (!0 === t
                  ? C.current.emit(E, {
                      body: e,
                      senderId: C.current.id,
                      name: null === O || void 0 === O ? void 0 : O.name,
                      system: t,
                    })
                  : C.current.emit(E, {
                      body: e,
                      senderId: "".concat(C.current.id).concat(O.name),
                      user: O,
                      name: null === O || void 0 === O ? void 0 : O.name,
                      color: null === O || void 0 === O ? void 0 : O.color,
                      system: t,
                    }));
            },
            startTypingMessage: function () {
              C.current &&
                C.current.emit(T, { senderId: C.current.id, user: O });
            },
            stopTypingMessage: function () {
              C.current &&
                C.current.emit(I, { senderId: C.current.id, user: O });
            },
            addUser: function (e) {
              var t = { name: e };
              h(function (e) {
                return [].concat(Object(g.a)(e), [t]);
              });
            },
          };
        },
        k = function () {
          var e = Object(r.useState)(!1),
            t = Object(d.a)(e, 2),
            n = t[0],
            a = t[1],
            c = Object(r.useState)(!1),
            o = Object(d.a)(c, 2),
            i = o[0],
            s = o[1],
            l = Object(r.useState)(5),
            u = Object(d.a)(l, 2),
            h = u[0],
            m = u[1];
          return (
            Object(r.useEffect)(
              function () {
                var e;
                return (
                  i
                    ? (i || 0 === h) && clearInterval(e)
                    : (e = setInterval(function () {
                        m(function (e) {
                          return e - 1;
                        });
                      }, 1e3)),
                  0 === h && a(!1),
                  function () {
                    return clearInterval(e);
                  }
                );
              },
              [i, h]
            ),
            {
              isTyping: n,
              startTyping: function () {
                s(!0), m(5), a(!0);
              },
              stopTyping: function () {
                s(!1);
              },
              cancelTyping: function () {
                m(0);
              },
            }
          );
        },
        M = u.a.input({
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
        L =
          (Object(u.a)(M)({
            textAlign: "left",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          function () {
            var e = window;
            return { width: e.innerWidth, height: e.innerHeight };
          }),
        R = function (e) {
          var t = e.roomId,
            n = e.name,
            a = k(),
            c = a.isTyping,
            o = (a.startTyping, a.stopTyping, a.cancelTyping),
            i = (function () {
              var e = Object(r.useState)(L()),
                t = Object(d.a)(e, 2),
                n = t[0],
                a = t[1];
              return (
                Object(r.useEffect)(function () {
                  function e() {
                    a(L());
                  }
                  return (
                    window.addEventListener("resize", e),
                    function () {
                      return window.removeEventListener("resize", e);
                    }
                  );
                }, []),
                n
              );
            })(),
            s = i.height,
            l = i.width,
            u = Object(r.useState)(""),
            m = Object(d.a)(u, 2),
            b = m[0],
            f = m[1],
            x = Object(r.useState)(""),
            g = Object(d.a)(x, 2),
            p = g[0],
            w = g[1],
            v = Object(r.useState)([]),
            O = Object(d.a)(v, 2),
            y = O[0],
            N = O[1],
            S = Object(r.useState)(""),
            E = Object(d.a)(S, 2),
            T = E[0],
            I = E[1],
            M = Object(r.useState)(""),
            R = Object(d.a)(M, 2),
            W = R[0],
            _ = R[1],
            A = Object(r.useRef)(),
            H = Object(r.useState)(!1),
            U = Object(d.a)(H, 2),
            B = U[0],
            V = U[1],
            z = C(t, n),
            F = z.messages,
            J = (z.user, z.users, z.typingUsers, z.sendMessage),
            G = z.startTypingMessage,
            P = z.stopTypingMessage,
            D =
              (z.addUser,
              function (e, t) {
                e.user.name &&
                  t(
                    e.user.title
                      ? e.user.title + " " + e.user.name + " " + e.rating
                      : e.user.name + " " + e.rating
                  );
              });
          return (
            Object(r.useEffect)(function () {
              return A.current.scrollIntoView({ behavior: "smooth" });
            }),
            Object(r.useEffect)(
              function () {
                B ||
                  ((("featured" !== t
                    ? new EventSource(
                        ""
                          .concat(
                            "http://localhost:3030",
                            "/lichesstvcustom/?id="
                          )
                          .concat(t)
                      )
                    : new EventSource(
                        "".concat("http://localhost:3030", "/lichesstv")
                      )
                  ).onmessage =
                    "featured" !== t
                      ? function (e) {
                          var t = JSON.parse(e.data);
                          N([t.fen]), t.id && w(t.id);
                        }
                      : function (e) {
                          var t = JSON.parse(e.data);
                          console.log(e.data),
                            N([t.d.fen]),
                            t.d.players &&
                              (D(t.d.players[0], _), D(t.d.players[1], I)),
                            t.d.id && w(t.d.id);
                        }),
                  V(!0));
              },
              [B, y]
            ),
            Object(r.useEffect)(
              function () {
                c ? G() : P();
              },
              [c]
            ),
            Object(h.jsx)("div", {
              style: { height: s, width: l },
              className: "ml-auto bg-black overflow-hidden",
              children: Object(h.jsxs)("div", {
                className:
                  "h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden",
                children: [
                  Object(h.jsx)("a", {
                    href: "/",
                    className:
                      "md:left-4 md:top-4 left-2 top-2 absolute md:pr-6 hidden md:flex",
                    children: Object(h.jsx)("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "md:h-10 md:w-10 h-8 w-8 text-white",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: Object(h.jsx)("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d:
                          "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                      }),
                    }),
                  }),
                  Object(h.jsxs)("div", {
                    className: "sm:mt-auto overflow-hidden m-auto mt-0",
                    children: [
                      Object(h.jsxs)("div", {
                        className: "flex md:mt-2",
                        children: [
                          Object(h.jsxs)("div", {
                            className: "flex mr-auto p-2 pl-0",
                            children: [
                              Object(h.jsx)("h1", {
                                className: "md:text-xl text-sm text-white pr-1",
                                children: "game:",
                              }),
                              Object(h.jsxs)("a", {
                                href: "https://lichess.org/".concat(p),
                                className: "md:text-xl text-sm text-white",
                                children: ["lichess.org/", p],
                              }),
                            ],
                          }),
                          Object(h.jsxs)("h1", {
                            className:
                              "md:text-xl text-sm text-white p-2 m-auto",
                            children: ["room: ", t],
                          }),
                        ],
                      }),
                      Object(h.jsxs)("div", {
                        className:
                          "font-medium md:text-sm md:pl-0 text-xs pl-6 text-white max-w-50% text-left break-all hidden md:flex",
                        children: ["FEN: ", y],
                      }),
                      Object(h.jsxs)("div", {
                        className: "m-auto",
                        children: [
                          Object(h.jsx)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: T,
                          }),
                          Object(h.jsx)("div", {
                            className: "m-auto",
                            children: Object(h.jsx)(j.a, {
                              position: y[0],
                              transitionDuration: 100,
                              showNotation: !1,
                              calcWidth: function (e) {
                                return e.screenWidth < 1440
                                  ? (e.screenHeight / 100) * 46
                                  : e.screenWidth > 1440
                                  ? (e.screenHeight / 100) * 70
                                  : (screen.width / 100) * 100;
                              },
                            }),
                          }),
                          Object(h.jsxs)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: [" ", W],
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(h.jsx)("div", {
                    className:
                      "rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-black ml-auto",
                    children: Object(h.jsxs)("div", {
                      className: "h-full ml-1 mt-1 overflow-y-auto",
                      children: [
                        Object(h.jsxs)(h.Fragment, {
                          children: [
                            Object(h.jsx)("ol", {
                              children: F.map(function (e, t) {
                                return Object(h.jsx)(
                                  "li",
                                  {
                                    children:
                                      !0 === e.system
                                        ? Object(h.jsx)("div", {
                                            className:
                                              "text-center text-gray-500 text-sm",
                                            children: e.body,
                                          })
                                        : Object(h.jsxs)("span", {
                                            className:
                                              "text-left text-white text-sm flex",
                                            children: [
                                              e.name
                                                ? Object(h.jsxs)("div", {
                                                    className: "font-bold ".concat(
                                                      e.user.color,
                                                      " mr-1"
                                                    ),
                                                    children: [e.name, ":"],
                                                  })
                                                : Object(h.jsx)(h.Fragment, {
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
                            Object(h.jsxs)("div", {
                              className:
                                "xl:w-30% px-auto w-99 bottom-1 absolute",
                              children: [
                                Object(h.jsx)("input", {
                                  className:
                                    "w-full h-10 pl-3 pr-8 text-base placeholder-white-600 border bg-gray-700 rounded-lg focus:shadow-outline",
                                  id: "message",
                                  type: "text",
                                  label: "Message",
                                  placeholder: "enter message here",
                                  variant: "outlined",
                                  value: b,
                                  onChange: function (e) {
                                    f(e.target.value);
                                  },
                                  onKeyUp: function (e) {
                                    "Enter" === e.key &&
                                      "" !== b &&
                                      (J(b, !1), f(""));
                                  },
                                }),
                                Object(h.jsx)("button", {
                                  className:
                                    "absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-yellow-600 rounded-r-lg hover:bg-blue-500",
                                  disabled: !b,
                                  variant: "contained",
                                  color: "primary",
                                  onClick: function (e) {
                                    e.preventDefault(),
                                      o(),
                                      "" !== b && (J(b, !1), f(""));
                                  },
                                  children: "Send",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(h.jsx)("div", { ref: A }),
                      ],
                    }),
                  }),
                ],
              }),
            })
          );
        },
        W = u.a.input({
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
        _ =
          (Object(u.a)(W)({
            textAlign: "left",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          function () {
            var e = window;
            return { width: e.innerWidth, height: e.innerHeight };
          }),
        A = function (e) {
          var t = e.roomId,
            n = e.onNameUpdate,
            a = Object(r.useState)(""),
            c = Object(d.a)(a, 2),
            o = c[0],
            i = c[1],
            s = k(),
            l =
              (s.isTyping,
              s.startTyping,
              s.stopTyping,
              s.cancelTyping,
              (function () {
                var e = Object(r.useState)(_()),
                  t = Object(d.a)(e, 2),
                  n = t[0],
                  a = t[1];
                return (
                  Object(r.useEffect)(function () {
                    function e() {
                      a(_());
                    }
                    return (
                      window.addEventListener("resize", e),
                      function () {
                        return window.removeEventListener("resize", e);
                      }
                    );
                  }, []),
                  n
                );
              })()),
            u = l.height,
            m = l.width,
            b = Object(r.useState)(""),
            f = Object(d.a)(b, 2),
            x = (f[0], f[1], Object(r.useState)([])),
            g = Object(d.a)(x, 2),
            p = g[0],
            w = g[1],
            v = Object(r.useState)(""),
            O = Object(d.a)(v, 2),
            y = O[0],
            N = O[1],
            S = Object(r.useState)(""),
            E = Object(d.a)(S, 2),
            T = E[0],
            I = E[1],
            M = Object(r.useState)(""),
            L = Object(d.a)(M, 2),
            R = L[0],
            W = L[1],
            A = Object(r.useRef)(),
            H = Object(r.useState)(!1),
            U = Object(d.a)(H, 2),
            B = U[0],
            V = U[1],
            z = C(t, o),
            F =
              (z.messages,
              z.user,
              z.users,
              z.typingUsers,
              z.sendMessage,
              z.startTypingMessage,
              z.stopTypingMessage,
              z.addUser),
            J = function (e, t) {
              e.user.name &&
                t(
                  e.user.title
                    ? e.user.title + " " + e.user.name + " " + e.rating
                    : e.user.name + " " + e.rating
                );
            };
          return (
            Object(r.useEffect)(function () {
              return A.current.scrollIntoView({ behavior: "smooth" });
            }),
            Object(r.useEffect)(
              function () {
                B ||
                  ((("featured" !== t
                    ? new EventSource(
                        ""
                          .concat(
                            "http://localhost:3030",
                            "/lichesstvcustom/?id="
                          )
                          .concat(t)
                      )
                    : new EventSource(
                        "".concat("http://localhost:3030", "/lichesstv")
                      )
                  ).onmessage =
                    "featured" !== t
                      ? function (e) {
                          var t = JSON.parse(e.data);
                          console.log(e.data), w([t.fen]);
                        }
                      : function (e) {
                          var t = JSON.parse(e.data);
                          console.log(e.data),
                            w([t.d.fen]),
                            t.d.players &&
                              (J(t.d.players[0], I), J(t.d.players[1], N));
                        }),
                  V(!0));
              },
              [B, p]
            ),
            Object(h.jsx)("div", {
              style: { height: u, width: m },
              className: "ml-auto bg-black overflow-hidden",
              children: Object(h.jsxs)("div", {
                className:
                  "h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden",
                children: [
                  Object(h.jsxs)("div", {
                    className: "sm:mt-auto overflow-hidden m-auto",
                    children: [
                      Object(h.jsxs)("div", {
                        className:
                          "font-medium md:text-sm text-xs text-white max-w-70 text-left break-all",
                        children: ["FEN: ", p],
                      }),
                      Object(h.jsxs)("div", {
                        className: "m-auto",
                        children: [
                          Object(h.jsx)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: y,
                          }),
                          Object(h.jsx)("div", {
                            className: "m-auto",
                            children: Object(h.jsx)(j.a, {
                              position: p[0],
                              transitionDuration: 100,
                              showNotation: !1,
                              calcWidth: function (e) {
                                return e.screenWidth < 1440
                                  ? (e.screenHeight / 100) * 46
                                  : e.screenWidth > 1440
                                  ? (e.screenHeight / 100) * 70
                                  : (screen.width / 100) * 100;
                              },
                            }),
                          }),
                          Object(h.jsxs)("div", {
                            className:
                              "font-medium md:text-2xl text-lg my-1 text-white",
                            children: [" ", T],
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(h.jsx)("div", {
                    className:
                      "rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-black ml-auto",
                    children: Object(h.jsxs)("div", {
                      className: "h-full ml-1 mt-1 overflow-y-auto",
                      children: [
                        Object(h.jsxs)("h1", {
                          className: "text-lg",
                          children: ["Room: ", t],
                        }),
                        Object(h.jsxs)("div", {
                          className: "m-auto xl:pt-12",
                          children: [
                            Object(h.jsx)("div", {
                              className:
                                "font-bold text-white text-center text-lg px-4",
                              children: "Create a username to join the chat",
                            }),
                            Object(h.jsx)("div", {
                              children: Object(h.jsx)("div", {
                                className:
                                  "xl:w-full w-80 overflow-hidden p-4 m-auto",
                                children: Object(h.jsx)("input", {
                                  className:
                                    "w-full h-10 pl-3 text-base bg-gray-700 placeholder-white border rounded-lg focus:shadow-outline",
                                  id: "message",
                                  type: "text",
                                  label: "Message",
                                  placeholder: "enter username",
                                  variant: "outlined",
                                  value: R,
                                  onChange: function (e) {
                                    return W(e.target.value);
                                  },
                                }),
                              }),
                            }),
                            Object(h.jsx)("button", {
                              className:
                                "h-12 m-auto flex items-center px-4 font-bold text-white bg-yellow-600 rounded-lg hover:bg-green-600 focus:bg-green-600",
                              variant: "contained",
                              color: "primary",
                              onClick: function () {
                                i(R), n(R), F(R);
                              },
                              children: "Join Chat",
                            }),
                          ],
                        }),
                        Object(h.jsx)("div", { ref: A }),
                      ],
                    }),
                  }),
                ],
              }),
            })
          );
        },
        H = function () {
          var e = window;
          return { width: e.innerWidth, height: e.innerHeight };
        },
        U = function (e) {
          var t,
            n = (function () {
              var e = Object(r.useState)(H()),
                t = Object(d.a)(e, 2),
                n = t[0],
                a = t[1];
              return (
                Object(r.useEffect)(function () {
                  function e() {
                    a(H());
                  }
                  return (
                    window.addEventListener("resize", e),
                    function () {
                      return window.removeEventListener("resize", e);
                    }
                  );
                }, []),
                n
              );
            })(),
            a = n.height,
            c = n.width,
            o = e.match.params.roomId,
            i = Object(r.useState)(
              null === (t = e.location.state) || void 0 === t ? void 0 : t.name
            ),
            s = Object(d.a)(i, 2),
            l = s[0],
            u = s[1];
          return Object(h.jsx)("div", {
            style: { height: a, width: c },
            className: "ml-auto bg-gray-900 overflow-hidden fixed",
            children: l
              ? Object(h.jsx)(R, { name: l, roomId: o })
              : Object(h.jsx)(A, {
                  roomId: o,
                  onNameUpdate: function (e) {
                    u(e);
                  },
                }),
          });
        };
      var B = function () {
          return Object(h.jsx)(i.a, {
            children: Object(h.jsxs)(s.c, {
              children: [
                Object(h.jsx)(s.a, { exact: !0, path: "/", component: f }),
                Object(h.jsx)(s.a, {
                  exact: !0,
                  path: "/:roomId",
                  component: U,
                }),
              ],
            }),
          });
        },
        V = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 128))
              .then(function (t) {
                var n = t.getCLS,
                  r = t.getFID,
                  a = t.getFCP,
                  c = t.getLCP,
                  o = t.getTTFB;
                n(e), r(e), a(e), c(e), o(e);
              });
        };
      o.a.render(
        Object(h.jsx)(a.a.StrictMode, { children: Object(h.jsx)(B, {}) }),
        document.getElementById("root")
      ),
        V();
    },
    40: function (e, t, n) {},
  },
  [[127, 1, 2]],
]);
//# sourceMappingURL=main.3c64f1cf.chunk.js.map
