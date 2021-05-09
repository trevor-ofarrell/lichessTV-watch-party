(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [0],
  {
    40: function (e, n, t) {},
    74: function (e, n, t) {
      "use strict";
      t.r(n);
      var c = t(1),
        s = t.n(c),
        a = t(34),
        i = t.n(a),
        r =
          (t(40),
          function (e) {
            e &&
              e instanceof Function &&
              t
                .e(3)
                .then(t.bind(null, 75))
                .then(function (n) {
                  var t = n.getCLS,
                    c = n.getFID,
                    s = n.getFCP,
                    a = n.getLCP,
                    i = n.getTTFB;
                  t(e), c(e), s(e), a(e), i(e);
                });
          }),
        o = t(11),
        l = t.n(o),
        u = t(18),
        d = t(10),
        j = t(35),
        h = t.n(j),
        f = t(0),
        m = function (e) {
          var n = e.id,
            t = e.name,
            c = e.participants,
            s = e.onClick;
          return Object(f.jsxs)("div", {
            className: "channel-item",
            onClick: function () {
              s(n);
            },
            children: [
              Object(f.jsx)("span", { children: t }),
              Object(f.jsx)("span", { children: c }),
            ],
          });
        },
        p = function (e) {
          var n = e.channels,
            t = e.onChannelSelect;
          return Object(f.jsx)("div", {
            className: "channel-list",
            children:
              n && n.length > 0
                ? n.map(function (e) {
                    return Object(f.jsx)(
                      m,
                      {
                        id: e.id,
                        name: e.name,
                        participants: e.participants,
                        onClick: t,
                      },
                      e.id
                    );
                  })
                : "No channels to display",
          });
        };
      p.defaultProps = { channels: [] };
      var b = p,
        O = function (e) {
          var n = e.senderName,
            t = e.messageText;
          return Object(f.jsxs)("div", {
            className: "message-item",
            children: [
              Object(f.jsx)("div", {
                children: Object(f.jsx)("b", { children: n }),
              }),
              Object(f.jsx)("span", { children: t }),
            ],
          });
        },
        g = function (e) {
          var n = e.channel,
            t = e.onSendMessage,
            s = Object(c.useState)(""),
            a = Object(d.a)(s, 2),
            i = a[0],
            r = a[1];
          return Object(f.jsxs)("div", {
            className: "messages-panel",
            children: [
              Object(f.jsx)("div", {
                className: "messages-list",
                children:
                  n && n.messages.length > 0
                    ? n.messages.map(function (e) {
                        return Object(f.jsx)(
                          O,
                          {
                            id: e.id,
                            sendername: e.senderName,
                            messageText: e.text,
                          },
                          e.id
                        );
                      })
                    : Object(f.jsx)("div", {
                        className: "no-content-message",
                        children: "No message to show",
                      }),
              }),
              n &&
                Object(f.jsxs)("div", {
                  className: "messages-input",
                  children: [
                    Object(f.jsx)("input", {
                      type: "text",
                      onChange: function (e) {
                        r(e.target.value);
                      },
                      value: i,
                    }),
                    Object(f.jsx)("button", {
                      onClick: function () {
                        i && "" != i && (t(n.id, i), r(""));
                      },
                      children: "Send",
                    }),
                  ],
                }),
            ],
          });
        },
        x = "http://localhost:3030",
        v = function () {
          var e,
            n = Object(c.useState)(null),
            t = Object(d.a)(n, 2),
            s = t[0],
            a = t[1],
            i = Object(c.useState)(null),
            r = Object(d.a)(i, 2),
            o = r[0],
            j = r[1],
            m = (function () {
              var e = Object(u.a)(
                l.a.mark(function e() {
                  return l.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          fetch("".concat(x, "/channels")).then(
                            (function () {
                              var e = Object(u.a)(
                                l.a.mark(function e(n) {
                                  var t;
                                  return l.a.wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (
                                            console.log(n),
                                            (e.next = 3),
                                            n.json()
                                          );
                                        case 3:
                                          (t = e.sent),
                                            console.log("data", t, n),
                                            a(t.channels);
                                        case 6:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, e);
                                })
                              );
                              return function (n) {
                                return e.apply(this, arguments);
                              };
                            })()
                          );
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            p = function (n) {
              var t = s.find(function (e) {
                return e.id === n;
              });
              j(t), e.emit("channel-join", n, function (e) {});
            };
          return (
            Object(c.useEffect)(function () {
              m(),
                (function () {
                  var n = h()(x);
                  n.on("connection", function () {
                    o && p(o.id);
                  }),
                    n.on("channel", function (e) {
                      s.forEach(function (n) {
                        n.id === e.id && (n.participants = e.participants);
                      }),
                        a(s);
                    }),
                    n.on("message", function (e) {
                      s.forEach(function (n) {
                        n.id === e.channelId &&
                          (n.messages
                            ? n.messages.push(e)
                            : (n.messages = [e]));
                      }),
                        a(s);
                    }),
                    (e = n);
                })();
            }, []),
            Object(f.jsxs)("div", {
              className: "chat-app",
              children: [
                Object(f.jsx)(b, { channels: s, onChannelSelect: p }),
                Object(f.jsx)(g, {
                  onSendMessage: function (n, t) {
                    e.emit("send-message", {
                      channelId: n,
                      text: t,
                      senderName: e.id,
                      id: Date.now(),
                    });
                  },
                  channel: o,
                }),
              ],
            })
          );
        };
      i.a.render(
        Object(f.jsx)(s.a.StrictMode, { children: Object(f.jsx)(v, {}) }),
        document.getElementById("root")
      ),
        r();
    },
  },
  [[74, 1, 2]],
]);
//# sourceMappingURL=main.b027f91e.chunk.js.map
