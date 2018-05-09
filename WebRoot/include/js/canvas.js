    !function() {
        function A(a, b, c) {
            return a.getAttribute(b) || c
        }
        function F(a) {
            return document.getElementsByTagName(a);
        }
        function D() {
            var c = F("script"),
                a = c.length,
                b = c[a - 1];
            return {
                l: a,
                z: A(b, "zIndex", -1),
                o: A(b, "opacity", 0.5),
                c: A(b, "color", "0,0,0"),
                n: A(b, "count", 300)
            }
        }
        function E() {
            x = i.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            B = i.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
        function M() {
            J.clearRect(0, 0, x, B);
            var c = [I].concat(v);
            var b, d, a, g, e, f;
            v.forEach(function(h) {
                h.x += h.xa,
                    h.y += h.ya,
                    h.xa *= h.x > x || h.x < 0 ? -1 : 1,
                    h.ya *= h.y > B || h.y < 0 ? -1 : 1,
                    J.fillRect(h.x - 0.5, h.y - 0.5, 1, 1);
                for (d = 0; d < c.length; d++) {
                    b = c[d];
                    if (h !== b && null !== b.x && null !== b.y) {
                        g = h.x - b.x;
                        e = h.y - b.y;
                        f = g * g + e * e;
                        f < b.max && (b === I && f >= b.max / 2 && (h.x -= 0.03 * g, h.y -= 0.03 * e), a = (b.max - f) / b.max, J.beginPath(), J.lineWidth = a / 2, J.strokeStyle = "rgba(" + w.c + "," + (a + 0.2) + ")", J.moveTo(h.x, h.y), J.lineTo(b.x, b.y), J.stroke())
                    }
                }
                c.splice(c.indexOf(h), 1);
            }),
                C(M);
        }
        var i = document.createElement("canvas"),
            w = D(),
            L = "c_n" + w.l, //c_n2
            J = i.getContext("2d"),
            x,
            B,
            C = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(a) {
                    window.setTimeout(a, 1000 / 45)
                },
            N = Math.random,
            I = {
                x: null,
                y: null,
                max: 20000
            };
        i.id = L;
        i.style.cssText = "position:fixed;top:0;left:0;z-index:" + w.z + ";opacity:" + w.o;
        F("body")[0].appendChild(i);
        E();
        window.onresize = E;
        window.onmousemove = function(a) {
            a = a || window.event,
                I.x = a.clientX,
                I.y = a.clientY
        };
        window.onmouseout = function() {
            I.x = null,
                I.y = null
        };
        for (var v = [], z = 0; w.n > z; z++) {
            var G = N() * x,
                H = N() * B,
                y = 2 * N() - 1,
                K = 2 * N() - 1;
            v.push({
                x: G,
                y: H,
                xa: y,
                ya: K,
                max: 6000
            });
        }
        setTimeout(function() {
            M()
        }, 100)
    } ();