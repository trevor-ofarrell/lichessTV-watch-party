(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    127: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        c = n.n(a),
        r = n(65),
        s = n.n(r),
        o = (n(38), n(26)),
        i = n(4),
        l = n(2),
        d = n(17),
        u = (n(68), n(37)),
        m = function () {
          var e = window;
          return { width: e.innerWidth, height: e.innerHeight };
        },
        h = function () {
          var e = Object(a.useState)(m()),
            t = Object(l.a)(e, 2),
            n = t[0],
            c = t[1];
          return (
            Object(a.useEffect)(function () {
              function e() {
                c(m());
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
        },
        x = n(1),
        b = u.a.input({
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
        j =
          (Object(u.a)(b)({
            textAlign: "left",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }),
          function (e) {
            var t = h(),
              n = t.height,
              c = t.width,
              r = Object(a.useState)(""),
              s = Object(l.a)(r, 2),
              o = s[0],
              d = s[1],
              u = Object(a.useState)(""),
              m = Object(l.a)(u, 2),
              b = m[0],
              j = m[1],
              f = Object(i.f)(),
              g = function () {
                o.length
                  ? f.push({
                      pathname: "/".concat(o),
                      state: { name: b, roomId: o },
                    })
                  : f.push({ pathname: "/featured", state: { name: b } });
              };
            return Object(x.jsxs)("div", {
              style: { height: n, width: c },
              className:
                "bg-scheme-dark overflow-hidden fixed h-full max-h-full",
              children: [
                Object(x.jsx)("div", {
                  className: "text-scheme-orange text-3xl text-center p-2 pb-6",
                  children: "lichessTV watch party",
                }),
                Object(x.jsx)("form", {
                  children: Object(x.jsxs)("div", {
                    className:
                      "md:w-3/5 md:mt-20 max-w-xl overflow-hidden p-4 mt-6 m-auto",
                    children: [
                      Object(x.jsx)("input", {
                        className:
                          "w-full h-10 pl-3 mb-4 text-base bg-scheme-light placeholder-gray-500 text-gray-500 border rounded-lg focus:shadow-outline",
                        id: "message",
                        type: "text",
                        label: "Message",
                        placeholder: "create username",
                        variant: "outlined",
                        value: b,
                        onChange: function (e) {
                          return j(e.target.value);
                        },
                      }),
                      Object(x.jsx)("div", {
                        className: "m-auto text-center text-white mb-6",
                        children: Object(x.jsx)("button", {
                          onClick: function () {
                            return g();
                          },
                          className:
                            "border-scheme-orange border-1 px-20 py-4 mt-4 rounded-lg",
                          children: "join featured room",
                        }),
                      }),
                      Object(x.jsx)("div", {
                        className: "text-scheme-orange text-center p-2 pb-8",
                        children:
                          "or enter a lichess.org game ID to create a room for a specific game in play",
                      }),
                      Object(x.jsx)("input", {
                        className:
                          "w-full h-10 pl-3 mb-4 text-base bg-scheme-light placeholder-gray-500 text-gray-500 border rounded-lg focus:shadow-outline",
                        id: "message",
                        type: "text",
                        label: "Message",
                        placeholder: "enter lichess game id",
                        variant: "outlined",
                        value: o,
                        onChange: function (e) {
                          return d(e.target.value);
                        },
                      }),
                      Object(x.jsx)("div", {
                        className: "m-auto text-center text-white",
                        children: Object(x.jsx)("button", {
                          onClick: function () {
                            return g();
                          },
                          className:
                            "border-scheme-orange border-1 px-20 py-4 mt-6 rounded-lg",
                          children: "create custom room",
                        }),
                      }),
                    ],
                  }),
                }),
                Object(x.jsxs)("footer", {
                  className:
                    "text-center fixed w-full bottom-0 text-scheme-orange p-4 flex",
                  children: [
                    Object(x.jsx)("a", {
                      href: "https://lichess.org/api",
                      className: "lg:text-xl text-sm  underline m-auto",
                      children: "moves streamed using the lichess.org API",
                    }),
                    Object(x.jsx)("a", {
                      href:
                        "https://github.com/trevor-ofarrell/lichessTV-watch-party",
                      className: "lg:text-xl text-sm underline m-auto",
                      children: "check out the source code on GitHub",
                    }),
                  ],
                }),
              ],
            });
          }),
        f = n(23),
        g = n(14),
        p = n.n(g),
        O = n(22),
        v = n(66),
        w = n.n(v),
        y = n(36),
        N = n.n(y),
        S = "NEW_CHAT_MESSAGE_EVENT",
        E = "START_TYPING_MESSAGE_EVENT",
        T = "STOP_TYPING_MESSAGE_EVENT",
        k = function (e, t) {
          var n = Object(a.useState)([]),
            c = Object(l.a)(n, 2),
            r = c[0],
            s = c[1],
            o = Object(a.useState)([]),
            i = Object(l.a)(o, 2),
            u = i[0],
            m = i[1],
            h = Object(a.useState)([]),
            x = Object(l.a)(h, 2),
            b = x[0],
            j = x[1],
            g = Object(a.useState)(),
            v = Object(l.a)(g, 2),
            y = v[0],
            k = v[1],
            I = Object(a.useRef)(),
            C = function () {
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
          Object(a.useEffect)(function () {
            k({ name: t, color: C() });
          }, []),
            Object(a.useEffect)(
              function () {
                (function () {
                  var t = Object(O.a)(
                    p.a.mark(function t() {
                      var n, a;
                      return p.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (t.next = 2),
                                N.a.get(
                                  ""
                                    .concat("http://localhost:3030", "/rooms/")
                                    .concat(e, "/users")
                                )
                              );
                            case 2:
                              (n = t.sent), (a = n.data.users), m(a);
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
            Object(a.useEffect)(
              function () {
                (function () {
                  var t = Object(O.a)(
                    p.a.mark(function t() {
                      var n, a;
                      return p.a.wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (t.next = 2),
                                N.a.get(
                                  ""
                                    .concat("http://localhost:3030", "/rooms/")
                                    .concat(e, "/messages")
                                )
                              );
                            case 2:
                              (n = t.sent), (a = n.data.messages), s(a);
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
            Object(a.useEffect)(
              function () {
                if (y)
                  return (
                    (I.current = w()("http://localhost:3030", {
                      query: { roomId: e, name: y.name },
                    })),
                    I.current.on("connect", function () {
                      console.log(I.current.id);
                    }),
                    I.current.on("USER_JOIN_CHAT_EVENT", function (e) {
                      e.id !== "".concat(I.current.id).concat(e.name) &&
                        m(function (t) {
                          return [].concat(Object(f.a)(t), [e]);
                        });
                    }),
                    I.current.on("USER_LEAVE_CHAT_EVENT", function (e) {
                      m(function (t) {
                        return t.filter(function (t) {
                          return t.id !== e.id;
                        });
                      });
                    }),
                    I.current.on(S, function (e) {
                      var t = Object(d.a)(
                        Object(d.a)({}, e),
                        {},
                        {
                          ownedByCurrentUser:
                            e.senderId ===
                            "".concat(I.current.id).concat(y.name),
                        }
                      );
                      s(function (e) {
                        return [].concat(Object(f.a)(e), [t]);
                      });
                    }),
                    I.current.on(E, function (e) {
                      if (
                        e.senderId !== "".concat(I.current.id).concat(y.name)
                      ) {
                        var t = e.user;
                        j(function (e) {
                          return [].concat(Object(f.a)(e), [t]);
                        });
                      }
                    }),
                    I.current.on(T, function (e) {
                      if (
                        e.senderId !== "".concat(I.current.id).concat(y.name)
                      ) {
                        var t = e.user;
                        j(function (e) {
                          return e.filter(function (e) {
                            return e.name !== t.name;
                          });
                        });
                      }
                    }),
                    function () {
                      I.current.disconnect();
                    }
                  );
              },
              [e, y]
            );
          return {
            messages: r,
            user: y,
            users: u,
            typingUsers: b,
            sendMessage: function (e, t) {
              I.current &&
                (!0 === t
                  ? I.current.emit(S, {
                      body: e,
                      senderId: I.current.id,
                      name: null === y || void 0 === y ? void 0 : y.name,
                      system: t,
                    })
                  : I.current.emit(S, {
                      body: e,
                      senderId: "".concat(I.current.id).concat(y.name),
                      user: y,
                      name: null === y || void 0 === y ? void 0 : y.name,
                      color: null === y || void 0 === y ? void 0 : y.color,
                      system: t,
                    }));
            },
            startTypingMessage: function () {
              I.current &&
                I.current.emit(E, { senderId: I.current.id, user: y });
            },
            stopTypingMessage: function () {
              I.current &&
                I.current.emit(T, { senderId: I.current.id, user: y });
            },
            addUser: function (e) {
              var t = { name: e };
              m(function (e) {
                return [].concat(Object(f.a)(e), [t]);
              });
            },
          };
        },
        I = function () {
          var e = Object(a.useState)(!1),
            t = Object(l.a)(e, 2),
            n = t[0],
            c = t[1],
            r = Object(a.useState)(!1),
            s = Object(l.a)(r, 2),
            o = s[0],
            i = s[1],
            d = Object(a.useState)(5),
            u = Object(l.a)(d, 2),
            m = u[0],
            h = u[1];
          return (
            Object(a.useEffect)(
              function () {
                var e;
                return (
                  o
                    ? (o || 0 === m) && clearInterval(e)
                    : (e = setInterval(function () {
                        h(function (e) {
                          return e - 1;
                        });
                      }, 1e3)),
                  0 === m && c(!1),
                  function () {
                    return clearInterval(e);
                  }
                );
              },
              [o, m]
            ),
            {
              isTyping: n,
              startTyping: function () {
                i(!0), h(5), c(!0);
              },
              stopTyping: function () {
                i(!1);
              },
              cancelTyping: function () {
                h(0);
              },
            }
          );
        },
        C = n(67),
        M = n.n(C),
        _ = function (e, t) {
          t({
            name: e.user.name,
            title: e.user.title,
            rating: String(e.rating),
          });
        },
        A = function (e) {
          var t = e.roomId,
            n = Object(a.useState)([]),
            c = Object(l.a)(n, 2),
            r = c[0],
            s = c[1],
            o = Object(a.useState)({}),
            i = Object(l.a)(o, 2),
            d = i[0],
            u = i[1],
            m = Object(a.useState)({}),
            h = Object(l.a)(m, 2),
            b = h[0],
            j = h[1],
            f = Object(a.useState)(!1),
            g = Object(l.a)(f, 2),
            v = g[0],
            w = g[1],
            y = {};
          return (
            Object(a.useEffect)(
              Object(O.a)(
                p.a.mark(function e() {
                  return p.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (v) {
                            e.next = 14;
                            break;
                          }
                          if ("featured" === t) {
                            e.next = 11;
                            break;
                          }
                          if (y.id === t) {
                            e.next = 7;
                            break;
                          }
                          return (
                            (e.next = 5),
                            fetch(
                              "http://localhost:3030/pgn/?id=".concat(t)
                            ).then(function (e) {
                              return e.json();
                            })
                          );
                        case 5:
                          (y = e.sent).players.black &&
                            (_(y.players.white, j), _(y.players.black, u));
                        case 7:
                          (new EventSource(
                            ""
                              .concat(
                                "http://localhost:3030",
                                "/lichesstvcustom/?id="
                              )
                              .concat(t)
                          ).onmessage = function (e) {
                            var t = JSON.parse(e.data);
                            s([t.fen]);
                          }),
                            (e.next = 13);
                          break;
                        case 11:
                          new EventSource(
                            "".concat("http://localhost:3030", "/lichesstv")
                          ).onmessage = function (e) {
                            var t = JSON.parse(e.data);
                            s([t.d.fen]),
                              t.d.players &&
                                (_(t.d.players[0], j), _(t.d.players[1], u));
                          };
                        case 13:
                          w(!0);
                        case 14:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              ),
              [v, r]
            ),
            Object(x.jsxs)("div", {
              className: "sm:mt-auto overflow-hidden m-auto",
              children: [
                Object(x.jsxs)("div", {
                  className:
                    "font-medium md:text-sm text-xs text-white max-w-70 text-left break-all",
                  children: ["FEN: ", r],
                }),
                Object(x.jsxs)("div", {
                  className: "m-auto",
                  children: [
                    Object(x.jsxs)("div", {
                      className:
                        "flex font-medium md:text-2xl text-lg my-1 text-white",
                      children: [
                        Object(x.jsxs)("div", {
                          className: "text-scheme-orange",
                          children: [d.title, "\xa0"],
                        }),
                        Object(x.jsxs)("div", { children: [d.name, "\xa0"] }),
                        Object(x.jsx)("div", {
                          className: "text-gray-500",
                          children: d.rating,
                        }),
                      ],
                    }),
                    Object(x.jsx)("div", {
                      className: "m-auto",
                      children: Object(x.jsx)(M.a, {
                        position: r[0],
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
                    Object(x.jsxs)("div", {
                      className:
                        "flex font-medium md:text-2xl text-lg my-1 text-white",
                      children: [
                        Object(x.jsxs)("div", {
                          className: "text-scheme-orange",
                          children: [b.title, "\xa0"],
                        }),
                        Object(x.jsxs)("div", { children: [b.name, "\xa0"] }),
                        Object(x.jsx)("div", {
                          className: "text-gray-500",
                          children: b.rating,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        },
        R = function (e) {
          var t = e.roomId,
            n = e.name,
            c = I(),
            r = c.isTyping,
            s = (c.startTyping, c.stopTyping, c.cancelTyping),
            o = h(),
            i = o.height,
            d = o.width,
            u = Object(a.useState)(""),
            m = Object(l.a)(u, 2),
            b = m[0],
            j = m[1],
            f = Object(a.useState)(""),
            g = Object(l.a)(f, 2),
            p = g[0],
            O = (g[1], Object(a.useRef)()),
            v = k(t, n),
            w = v.messages,
            y = (v.user, v.users, v.typingUsers, v.sendMessage),
            N = v.startTypingMessage,
            S = v.stopTypingMessage;
          return (
            Object(a.useEffect)(function () {
              return O.current.scrollIntoView({ behavior: "smooth" });
            }),
            Object(a.useEffect)(
              function () {
                r ? N() : S();
              },
              [r]
            ),
            Object(x.jsx)("div", {
              style: { height: i, width: d },
              className: "ml-auto bg-scheme-dark overflow-hidden",
              children: Object(x.jsxs)("div", {
                className:
                  "h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden",
                children: [
                  Object(x.jsx)("a", {
                    href: "/",
                    className:
                      "md:left-4 md:top-4 left-2 top-2 absolute md:pr-6 hidden md:flex",
                    children: Object(x.jsx)("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      className: "md:h-10 md:w-10 h-8 w-8 text-scheme-orange",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: Object(x.jsx)("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d:
                          "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                      }),
                    }),
                  }),
                  Object(x.jsxs)("div", {
                    className: "sm:mt-auto overflow-hidden m-auto mt-0",
                    children: [
                      Object(x.jsxs)("div", {
                        className: "flex md:mt-2 text-gray-400",
                        children: [
                          Object(x.jsxs)("div", {
                            className: "flex mr-auto p-2 pl-0",
                            children: [
                              Object(x.jsx)("h1", {
                                className: "md:text-xl text-sm pr-1",
                                children: "game:",
                              }),
                              Object(x.jsxs)("a", {
                                href: "https://lichess.org/".concat(p),
                                className: "md:text-xl text-sm underline  ",
                                children: ["lichess.org/", p],
                              }),
                            ],
                          }),
                          Object(x.jsxs)("h1", {
                            className: "md:text-xl text-sm p-2 ml-auto",
                            children: ["room: ", t],
                          }),
                        ],
                      }),
                      Object(x.jsx)(A, { roomId: t }),
                    ],
                  }),
                  Object(x.jsx)("div", {
                    className:
                      "rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pb-14 bg-scheme-dark ml-auto",
                    children: Object(x.jsxs)("div", {
                      className: "h-full ml-1 mt-1 overflow-y-auto",
                      children: [
                        Object(x.jsxs)(x.Fragment, {
                          children: [
                            Object(x.jsx)("ol", {
                              children: w.map(function (e, t) {
                                return Object(x.jsx)(
                                  "li",
                                  {
                                    children:
                                      !0 === e.system
                                        ? Object(x.jsx)("div", {
                                            className:
                                              "text-center text-gray-500 text-sm",
                                            children: e.body,
                                          })
                                        : Object(x.jsxs)("span", {
                                            className:
                                              "text-left text-white text-sm flex",
                                            children: [
                                              e.name
                                                ? Object(x.jsxs)("div", {
                                                    className: "font-bold ".concat(
                                                      e.user.color,
                                                      " mr-1"
                                                    ),
                                                    children: [e.name, ":"],
                                                  })
                                                : Object(x.jsx)(x.Fragment, {
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
                            Object(x.jsxs)("div", {
                              className:
                                "xl:w-30% px-auto w-99 bottom-1 absolute",
                              children: [
                                Object(x.jsx)("input", {
                                  className:
                                    "w-full h-10 pl-3 pr-8 text-base placeholder-white-600 text-gray-500 border bg-scheme-light rounded-lg",
                                  id: "message",
                                  type: "text",
                                  label: "Message",
                                  placeholder: "enter message here",
                                  variant: "outlined",
                                  value: b,
                                  onChange: function (e) {
                                    j(e.target.value);
                                  },
                                  onKeyUp: function (e) {
                                    "Enter" === e.key &&
                                      "" !== b &&
                                      (y(b, !1), j(""));
                                  },
                                }),
                                Object(x.jsx)("button", {
                                  className:
                                    "absolute inset-y-0 h-10 right-0 flex items-center px-4 font-bold text-white bg-scheme-orange rounded-r-lg",
                                  disabled: !b,
                                  variant: "contained",
                                  color: "primary",
                                  onClick: function (e) {
                                    e.preventDefault(),
                                      s(),
                                      "" !== b && (y(b, !1), j(""));
                                  },
                                  children: "Send",
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(x.jsx)("div", { ref: O }),
                      ],
                    }),
                  }),
                ],
              }),
            })
          );
        },
        U = function (e) {
          var t = e.roomId,
            n = e.onNameUpdate,
            c = Object(a.useState)(""),
            r = Object(l.a)(c, 2),
            s = r[0],
            o = r[1],
            d = h(),
            u = d.height,
            m = d.width,
            b = Object(a.useState)(""),
            j = Object(l.a)(b, 2),
            f = j[0],
            g = j[1],
            p = Object(a.useRef)(),
            O = Object(i.f)(),
            v = k(t, s).addUser;
          return Object(x.jsx)("div", {
            style: { height: u, width: m },
            className: "ml-auto bg-scheme-dark overflow-hidden",
            children: Object(x.jsx)("div", {
              className:
                "h-full max-h-full flex flex-col xl:items-stretch xl:flex-row overflow-hidden",
              children: Object(x.jsx)("div", {
                className:
                  "rounded-lg h-full xl:w-2/6 xl:max-h-full max-h-4/12 w-full max-w-full xl:max-w-2/6 pt-20 pb-14 bg-scheme-dark ml-auto",
                children: Object(x.jsxs)("div", {
                  className: "h-full ml-1 mt-1 overflow-y-auto",
                  children: [
                    Object(x.jsxs)("h1", {
                      className: "text-xl p-4 text-center text-white",
                      children: ["Room: ", t],
                    }),
                    Object(x.jsxs)("div", {
                      className: "m-auto xl:pt-12",
                      children: [
                        Object(x.jsx)("div", {
                          className:
                            "font-bold text-white text-center text-lg px-4",
                          children: "Create a username to join the chat",
                        }),
                        Object(x.jsx)("div", {
                          children: Object(x.jsx)("div", {
                            className:
                              "xl:w-full w-80 overflow-hidden p-4 m-auto",
                            children: Object(x.jsx)("input", {
                              className:
                                "w-full h-10 pl-3 text-base bg-scheme-light placeholder-gray-500 border rounded-lg focus:shadow-outline",
                              id: "message",
                              type: "text",
                              label: "Message",
                              placeholder: "enter username",
                              variant: "outlined",
                              value: f,
                              onChange: function (e) {
                                return g(e.target.value);
                              },
                            }),
                          }),
                        }),
                        Object(x.jsx)("button", {
                          className:
                            "h-12 m-auto flex items-center px-4 font-bold text-white bg-scheme-orange rounded-lg",
                          variant: "contained",
                          color: "primary",
                          onClick: function () {
                            o(f),
                              n(f),
                              v(f),
                              t.length
                                ? O.push({
                                    pathname: "/".concat(t),
                                    state: { name: s },
                                  })
                                : O.push({
                                    pathname: "/featured",
                                    state: { name: s },
                                  });
                          },
                          children: "Join Chat",
                        }),
                      ],
                    }),
                    Object(x.jsx)("div", { ref: p }),
                  ],
                }),
              }),
            }),
          });
        },
        L = function (e) {
          var t,
            n = h(),
            c = n.height,
            r = n.width,
            s = e.match.params.roomId,
            o = Object(a.useState)(
              null === (t = e.location.state) || void 0 === t ? void 0 : t.name
            ),
            i = Object(l.a)(o, 2),
            d = i[0],
            u = i[1];
          return Object(x.jsx)("div", {
            style: { height: c, width: r },
            className: "ml-auto bg-gray-900 overflow-hidden fixed",
            children: d
              ? Object(x.jsx)(R, { name: d, roomId: s })
              : Object(x.jsx)(U, {
                  roomId: s,
                  onNameUpdate: function (e) {
                    u(e);
                  },
                }),
          });
        };
      var V = function () {
          return Object(x.jsx)(o.a, {
            children: Object(x.jsxs)(i.c, {
              children: [
                Object(x.jsx)(i.a, { exact: !0, path: "/", component: j }),
                Object(x.jsx)(i.a, {
                  exact: !0,
                  path: "/:roomId",
                  component: L,
                }),
              ],
            }),
          });
        },
        F = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 128))
              .then(function (t) {
                var n = t.getCLS,
                  a = t.getFID,
                  c = t.getFCP,
                  r = t.getLCP,
                  s = t.getTTFB;
                n(e), a(e), c(e), r(e), s(e);
              });
        };
      s.a.render(
        Object(x.jsx)(c.a.StrictMode, { children: Object(x.jsx)(V, {}) }),
        document.getElementById("root")
      ),
        F();
    },
    38: function (e, t, n) {},
  },
  [[127, 1, 2]],
]);
//# sourceMappingURL=main.89bc2ee2.chunk.js.map
