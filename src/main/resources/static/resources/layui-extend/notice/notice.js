/**
 * 消息通知模块 date:2019-04-21 License By http://easyweb.vip
 */

layui.define([], function(w) {
    var m = "iziToast";
    var q = document.querySelector("body");
    var n = (/Mobi/.test(navigator.userAgent)) ? true : false;
    var l = 568;
    var b = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var f = typeof InstallTrigger !== "undefined";
    var k = "ontouchstart" in document.documentElement;
    var g = ["bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter", "center"];
    var a = {
        info: {
            color: "blue",
            icon: "ico-info"
        },
        success: {
            color: "green",
            icon: "ico-success"
        },
        warning: {
            color: "orange",
            icon: "ico-warning"
        },
        error: {
            color: "red",
            icon: "ico-error"
        },
        question: {
            color: "yellow",
            icon: "ico-question"
        }
    };
    var v = {};
    var e = {
        id: null,
        className: "",
        title: "",
        titleColor: "",
        titleSize: "",
        titleLineHeight: "",
        message: "",
        messageColor: "",
        messageSize: "",
        messageLineHeight: "",
        backgroundColor: "",
        theme: "light",
        color: "",
        icon: "",
        iconText: "",
        iconColor: "",
        iconUrl: null,
        image: "",
        imageWidth: 60,
        maxWidth: null,
        zindex: null,
        layout: 2,
        balloon: false,
        close: true,
        closeOnEscape: false,
        closeOnClick: false,
        displayMode: 0,
        position: "topRight",
        target: "",
        targetFirst: null,
        timeout: 5000,
        rtl: false,
        animateInside: false,
        drag: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: true,
        progressBarColor: "",
        progressBarEasing: "linear",
        overlay: false,
        overlayClose: false,
        overlayColor: "rgba(0, 0, 0, 0.1)",
        transitionIn: "fadeInLeft",
        transitionOut: "fadeOutRight",
        transitionInMobile: "bounceInDown",
        transitionOutMobile: "fadeOutUp",
        buttons: {},
        inputs: {},
        audio: "",
        onOpening: function() {},
        onOpened: function() {},
        onClosing: function() {},
        onClosed: function() {}
    };
    var d = {
        children: {},
        setSetting: function(y, x, z) {
            d.children[y][x] = z
        },
        getSetting: function(y, x) {
            return d.children[y][x]
        },
        settings: function(x) {
            d.destroy();
            v = x;
            e = u(e, x || {})
        },
        destroy: function() {
            r(document.querySelectorAll("." + m + "-overlay"), function(y, x) {
                y.remove()
            });
            r(document.querySelectorAll("." + m + "-wrapper"), function(y, x) {
                y.remove()
            });
            r(document.querySelectorAll("." + m), function(y, x) {
                y.remove()
            });
            this.children = {};
            document.removeEventListener(m + "-opened", {}, false);
            document.removeEventListener(m + "-opening", {}, false);
            document.removeEventListener(m + "-closing", {}, false);
            document.removeEventListener(m + "-closed", {}, false);
            document.removeEventListener("keyup", {}, false);
            v = {}
        },
        msg: function(B, x) {
            if (x.icon == 4) {
                x.overlay = true;
                x.timeout = false;
                x.drag = false;
                x.displayMode = 0
            }
            var y = ["ico-success", "ico-error", "ico-warning", "ico-load", "ico-info"];
            x.icon = y[x.icon - 1];
            var A = {
                message: B,
                position: "topCenter",
                transitionIn: "bounceInDown",
                transitionOut: "fadeOut",
                transitionOutMobile: "fadeOut",
                progressBar: false,
                close: false,
                layout: 1,
                audio: ""
            };
            var z = u(v, x || {});
            z = u(A, z || {});
            this.show(z)
        }
    };
    d.hide = function(y, E, x) {
        if (typeof E != "object") {
            E = document.querySelector(E)
        }
        var D = this;
        var B = u(this.children[E.getAttribute("data-iziToast-ref")], y || {});
        B.closedBy = x || null;
        delete B.time.REMAINING;
        E.classList.add(m + "-closing");
        (function() {
            var F = document.querySelector("." + m + "-overlay");
            if (F !== null) {
                var G = F.getAttribute("data-iziToast-ref");
                G = G.split(",");
                var H = G.indexOf(String(B.ref));
                if (H !== -1) {
                    G.splice(H, 1)
                }
                F.setAttribute("data-iziToast-ref", G.join());
                if (G.length === 0) {
                    F.classList.remove("fadeIn");
                    F.classList.add("fadeOut");
                    setTimeout(function() {
                        F.remove()
                    }, 700)
                }
            }
        })();
        if (B.transitionIn) {
            E.classList.remove(B.transitionIn)
        }
        if (B.transitionInMobile) {
            E.classList.remove(B.transitionInMobile)
        }
        if (n || window.innerWidth <= l) {
            if (B.transitionOutMobile) {
                E.classList.add(B.transitionOutMobile)
            }
        } else {
            if (B.transitionOut) {
                E.classList.add(B.transitionOut)
            }
        }
        var A = E.parentNode.offsetHeight;
        E.parentNode.style.height = A + "px";
        E.style.pointerEvents = "none";
        if (!n || window.innerWidth > l) {
            E.parentNode.style.transitionDelay = "0.2s"
        }
        try {
            var C = new CustomEvent(m + "-closing", {
                detail: B,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(C)
        } catch (z) {
            console.warn(z)
        }
        setTimeout(function() {
            E.parentNode.style.height = "0px";
            E.parentNode.style.overflow = "";
            setTimeout(function() {
                delete D.children[B.ref];
                E.parentNode.remove();
                try {
                    var G = new CustomEvent(m + "-closed", {
                        detail: B,
                        bubbles: true,
                        cancelable: true
                    });
                    document.dispatchEvent(G)
                } catch (F) {
                    console.warn(F)
                }
                if (typeof B.onClosed !== "undefined") {
                    B.onClosed.apply(null, [B, E, x])
                }
            }, 1000)
        }, 200);
        if (typeof B.onClosing !== "undefined") {
            B.onClosing.apply(null, [B, E, x])
        }
    };
    d.show = function(y) {
        var D = this;
        var B = u(v, y || {});
        B = u(e, B);
        B.time = {};
        if (B.id === null) {
            B.id = s(B.title + B.message + B.color)
        }
        if (B.displayMode == 1 || B.displayMode == "once") {
            try {
                if (document.querySelectorAll("." + m + "#" + B.id).length > 0) {
                    return false
                }
            } catch (x) {
                console.warn("[" + m + "] Could not find an element with this selector: " + "#" + B.id + ". Try to set an valid id.")
            }
        }
        if (B.displayMode == 2 || B.displayMode == "replace") {
            try {
                r(document.querySelectorAll("." + m + "#" + B.id), function(G, F) {
                    D.hide(B, G, "replaced")
                })
            } catch (x) {
                console.warn("[" + m + "] Could not find an element with this selector: " + "#" + B.id + ". Try to set an valid id.")
            }
        }
        B.ref = new Date().getTime() + Math.floor((Math.random() * 10000000) + 1);
        d.children[B.ref] = B;
        var E = {
            body: document.querySelector("body"),
            overlay: document.createElement("div"),
            toast: document.createElement("div"),
            toastBody: document.createElement("div"),
            toastTexts: document.createElement("div"),
            toastCapsule: document.createElement("div"),
            cover: document.createElement("div"),
            buttons: document.createElement("div"),
            inputs: document.createElement("div"),
            icon: !B.iconUrl ? document.createElement("i") : document.createElement("img"),
            wrapper: null
        };
        E.toast.setAttribute("data-iziToast-ref", B.ref);
        E.toast.appendChild(E.toastBody);
        E.toastCapsule.appendChild(E.toast);
        (function() {
            E.toast.classList.add(m);
            E.toast.classList.add(m + "-opening");
            E.toastCapsule.classList.add(m + "-capsule");
            E.toastBody.classList.add(m + "-body");
            E.toastTexts.classList.add(m + "-texts");
            if (n || window.innerWidth <= l) {
                if (B.transitionInMobile) {
                    E.toast.classList.add(B.transitionInMobile)
                }
            } else {
                if (B.transitionIn) {
                    E.toast.classList.add(B.transitionIn)
                }
            } if (B.className) {
                var F = B.className.split(" ");
                r(F, function(H, G) {
                    E.toast.classList.add(H)
                })
            }
            if (B.id) {
                E.toast.id = B.id
            }
            if (B.rtl) {
                E.toast.classList.add(m + "-rtl");
                E.toast.setAttribute("dir", "rtl")
            }
            if (B.layout > 1) {
                E.toast.classList.add(m + "-layout" + B.layout)
            }
            if (B.balloon) {
                E.toast.classList.add(m + "-balloon")
            }
            if (B.maxWidth) {
                if (!isNaN(B.maxWidth)) {
                    E.toast.style.maxWidth = B.maxWidth + "px"
                } else {
                    E.toast.style.maxWidth = B.maxWidth
                }
            }
            if (B.theme !== "" || B.theme !== "light") {
                E.toast.classList.add(m + "-theme-" + B.theme)
            }
            if (B.color) {
                if (t(B.color)) {
                    E.toast.style.background = B.color
                } else {
                    E.toast.classList.add(m + "-color-" + B.color)
                }
            }
            if (B.backgroundColor) {
                E.toast.style.background = B.backgroundColor;
                if (B.balloon) {
                    E.toast.style.borderColor = B.backgroundColor
                }
            }
        })();
        (function() {
            if (B.image) {
                E.cover.classList.add(m + "-cover");
                E.cover.style.width = B.imageWidth + "px";
                if (i(B.image.replace(/ /g, ""))) {
                    E.cover.style.backgroundImage = "url(data:image/png;base64," + B.image.replace(/ /g, "") + ")"
                } else {
                    E.cover.style.backgroundImage = "url(" + B.image + ")"
                } if (B.rtl) {
                    E.toastBody.style.marginRight = (B.imageWidth) + "px"
                } else {
                    E.toastBody.style.marginLeft = (B.imageWidth) + "px"
                }
                E.toast.appendChild(E.cover)
            }
        })();
        (function() {
            if (B.close) {
                E.buttonClose = document.createElement("button");
                E.buttonClose.setAttribute("type", "button");
                E.buttonClose.classList.add(m + "-close");
                E.buttonClose.addEventListener("click", function(G) {
                    var F = G.target;
                    D.hide(B, E.toast, "button")
                });
                E.toast.appendChild(E.buttonClose)
            } else {
                if (B.rtl) {
                    E.toast.style.paddingLeft = "18px"
                } else {
                    E.toast.style.paddingRight = "18px"
                }
            }
        })();
        (function() {
            if (B.progressBar) {
                E.progressBar = document.createElement("div");
                E.progressBarDiv = document.createElement("div");
                E.progressBar.classList.add(m + "-progressbar");
                E.progressBarDiv.style.background = B.progressBarColor;
                E.progressBar.appendChild(E.progressBarDiv);
                E.toast.appendChild(E.progressBar)
            }
            if (B.timeout) {
                if (B.pauseOnHover && !B.resetOnHover) {
                    E.toast.addEventListener("mouseenter", function(F) {
                        D.progress(B, E.toast).pause()
                    });
                    E.toast.addEventListener("mouseleave", function(F) {
                        D.progress(B, E.toast).resume()
                    })
                }
                if (B.resetOnHover) {
                    E.toast.addEventListener("mouseenter", function(F) {
                        D.progress(B, E.toast).reset()
                    });
                    E.toast.addEventListener("mouseleave", function(F) {
                        D.progress(B, E.toast).start()
                    })
                }
            }
        })();
        (function() {
            if (B.iconUrl) {
                E.icon.setAttribute("class", m + "-icon");
                E.icon.setAttribute("src", B.iconUrl)
            } else {
                if (B.icon) {
                    E.icon.setAttribute("class", m + "-icon " + B.icon);
                    if (B.iconText) {
                        E.icon.appendChild(document.createTextNode(B.iconText))
                    }
                    if (B.iconColor) {
                        E.icon.style.color = B.iconColor
                    }
                }
            } if (B.icon || B.iconUrl) {
                if (B.rtl) {
                    E.toastBody.style.paddingRight = "33px"
                } else {
                    E.toastBody.style.paddingLeft = "33px"
                }
                E.toastBody.appendChild(E.icon)
            }
        })();
        (function() {
            if (B.title.length > 0) {
                E.strong = document.createElement("strong");
                E.strong.classList.add(m + "-title");
                E.strong.appendChild(j(B.title));
                E.toastTexts.appendChild(E.strong);
                if (B.titleColor) {
                    E.strong.style.color = B.titleColor
                }
                if (B.titleSize) {
                    if (!isNaN(B.titleSize)) {
                        E.strong.style.fontSize = B.titleSize + "px"
                    } else {
                        E.strong.style.fontSize = B.titleSize
                    }
                }
                if (B.titleLineHeight) {
                    if (!isNaN(B.titleSize)) {
                        E.strong.style.lineHeight = B.titleLineHeight + "px"
                    } else {
                        E.strong.style.lineHeight = B.titleLineHeight
                    }
                }
            }
            if (B.message.length > 0) {
                E.p = document.createElement("p");
                E.p.classList.add(m + "-message");
                E.p.appendChild(j(B.message));
                E.toastTexts.appendChild(E.p);
                if (B.messageColor) {
                    E.p.style.color = B.messageColor
                }
                if (B.messageSize) {
                    if (!isNaN(B.titleSize)) {
                        E.p.style.fontSize = B.messageSize + "px"
                    } else {
                        E.p.style.fontSize = B.messageSize
                    }
                }
                if (B.messageLineHeight) {
                    if (!isNaN(B.titleSize)) {
                        E.p.style.lineHeight = B.messageLineHeight + "px"
                    } else {
                        E.p.style.lineHeight = B.messageLineHeight
                    }
                }
            }
            if (B.title.length > 0 && B.message.length > 0) {
                if (B.rtl) {
                    E.strong.style.marginLeft = "10px"
                } else {
                    if (B.layout != 2 && !B.rtl) {
                        E.strong.style.marginRight = "10px";
                        E.strong.style.marginBottom = "0px"
                    }
                }
            }
        })();
        E.toastBody.appendChild(E.toastTexts);
        var A;
        (function() {
            if (B.inputs.length > 0) {
                E.inputs.classList.add(m + "-inputs");
                r(B.inputs, function(G, F) {
                    E.inputs.appendChild(j(G[0]));
                    A = E.inputs.childNodes;
                    A[F].classList.add(m + "-inputs-child");
                    if (G[3]) {
                        setTimeout(function() {
                            A[F].focus()
                        }, 300)
                    }
                    A[F].addEventListener(G[1], function(I) {
                        var H = G[2];
                        return H(D, E.toast, this, I)
                    })
                });
                E.toastBody.appendChild(E.inputs)
            }
        })();
        (function() {
            if (B.buttons.length > 0) {
                E.buttons.classList.add(m + "-buttons");
                r(B.buttons, function(H, G) {
                    E.buttons.appendChild(j(H[0]));
                    var F = E.buttons.childNodes;
                    F[G].classList.add(m + "-buttons-child");
                    if (H[2]) {
                        setTimeout(function() {
                            F[G].focus()
                        }, 300)
                    }
                    F[G].addEventListener("click", function(J) {
                        J.preventDefault();
                        var I = H[1];
                        return I(D, E.toast, this, J, A)
                    })
                })
            }
            E.toastTexts.appendChild(E.buttons)
        })();
        if (B.message.length > 0 && (B.inputs.length > 0 || B.buttons.length > 0)) {
            E.p.style.marginBottom = "0"
        }
        if (B.inputs.length > 0 || B.buttons.length > 0) {
            if (B.rtl) {
                E.toastTexts.style.marginLeft = "10px"
            } else {
                E.toastTexts.style.marginRight = "10px"
            } if (B.inputs.length > 0 && B.buttons.length > 0) {
                if (B.rtl) {
                    E.inputs.style.marginLeft = "8px"
                } else {
                    E.inputs.style.marginRight = "8px"
                }
            }
        }(function() {
            E.toastCapsule.style.visibility = "hidden";
            setTimeout(function() {
                var F = E.toast.offsetHeight;
                var G = E.toast.currentStyle || window.getComputedStyle(E.toast);
                var I = G.marginTop;
                I = I.split("px");
                I = parseInt(I[0]);
                var J = G.marginBottom;
                J = J.split("px");
                J = parseInt(J[0]);
                E.toastCapsule.style.visibility = "";
                E.toastCapsule.style.height = (F + J + I) + "px";
                setTimeout(function() {
                    E.toastCapsule.style.height = "auto";
                    if (B.target) {
                        E.toastCapsule.style.overflow = "visible"
                    }
                }, 500);
                if (B.timeout) {
                    D.progress(B, E.toast).start()
                }
            }, 100)
        })();
        (function() {
            var F = B.position;
            if (B.target) {
                E.wrapper = document.querySelector(B.target);
                E.wrapper.classList.add(m + "-target");
                if (B.targetFirst) {
                    E.wrapper.insertBefore(E.toastCapsule, E.wrapper.firstChild)
                } else {
                    E.wrapper.appendChild(E.toastCapsule)
                }
            } else {
                if (g.indexOf(B.position) == -1) {
                    console.warn("[" + m + "] Incorrect position.\nIt can be › " + g);
                    return
                }
                if (n || window.innerWidth <= l) {
                    if (B.position == "bottomLeft" || B.position == "bottomRight" || B.position == "bottomCenter") {
                        F = m + "-wrapper-bottomCenter"
                    } else {
                        if (B.position == "topLeft" || B.position == "topRight" || B.position == "topCenter") {
                            F = m + "-wrapper-topCenter"
                        } else {
                            F = m + "-wrapper-center"
                        }
                    }
                } else {
                    F = m + "-wrapper-" + F
                }
                E.wrapper = document.querySelector("." + m + "-wrapper." + F);
                if (!E.wrapper) {
                    E.wrapper = document.createElement("div");
                    E.wrapper.classList.add(m + "-wrapper");
                    E.wrapper.classList.add(F);
                    document.body.appendChild(E.wrapper)
                }
                var G = B.targetFirst;
                if ((G == undefined || G == null) && (B.position == "topLeft" || B.position == "topCenter" || B.position == "topRight")) {
                    G = true
                }
                if (G) {
                    E.wrapper.insertBefore(E.toastCapsule, E.wrapper.firstChild)
                } else {
                    E.wrapper.appendChild(E.toastCapsule)
                }
            } if (!isNaN(B.zindex)) {
                E.wrapper.style.zIndex = B.zindex
            } else {
                console.warn("[" + m + "] Invalid zIndex.")
            }
        })();
        (function() {
            if (B.overlay) {
                if (document.querySelector("." + m + "-overlay.fadeIn") !== null) {
                    E.overlay = document.querySelector("." + m + "-overlay");
                    E.overlay.setAttribute("data-iziToast-ref", E.overlay.getAttribute("data-iziToast-ref") + "," + B.ref);
                    if (!isNaN(B.zindex) && B.zindex !== null) {
                        E.overlay.style.zIndex = B.zindex - 1
                    }
                } else {
                    E.overlay.classList.add(m + "-overlay");
                    E.overlay.classList.add("fadeIn");
                    E.overlay.style.background = B.overlayColor;
                    E.overlay.setAttribute("data-iziToast-ref", B.ref);
                    if (!isNaN(B.zindex) && B.zindex !== null) {
                        E.overlay.style.zIndex = B.zindex - 1
                    }
                    document.querySelector("body").appendChild(E.overlay)
                } if (B.overlayClose) {
                    E.overlay.removeEventListener("click", {});
                    E.overlay.addEventListener("click", function(F) {
                        D.hide(B, E.toast, "overlay")
                    })
                } else {
                    E.overlay.removeEventListener("click", {})
                }
            }
        })();
        (function() {
            if (B.animateInside) {
                E.toast.classList.add(m + "-animateInside");
                var G = [200, 100, 300];
                if (B.transitionIn == "bounceInLeft" || B.transitionIn == "bounceInRight") {
                    G = [400, 200, 400]
                }
                if (B.title.length > 0) {
                    setTimeout(function() {
                        E.strong.classList.add("slideIn")
                    }, G[0])
                }
                if (B.message.length > 0) {
                    setTimeout(function() {
                        E.p.classList.add("slideIn")
                    }, G[1])
                }
                if (B.icon || B.iconUrl) {
                    setTimeout(function() {
                        E.icon.classList.add("revealIn")
                    }, G[2])
                }
                var F = 150;
                if (B.buttons.length > 0 && E.buttons) {
                    setTimeout(function() {
                        r(E.buttons.childNodes, function(I, H) {
                            setTimeout(function() {
                                I.classList.add("revealIn")
                            }, F);
                            F = F + 150
                        })
                    }, B.inputs.length > 0 ? 150 : 0)
                }
                if (B.inputs.length > 0 && E.inputs) {
                    F = 150;
                    r(E.inputs.childNodes, function(I, H) {
                        setTimeout(function() {
                            I.classList.add("revealIn")
                        }, F);
                        F = F + 150
                    })
                }
            }
        })();
        B.onOpening.apply(null, [B, E.toast]);
        try {
            var C = new CustomEvent(m + "-opening", {
                detail: B,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(C)
        } catch (z) {
            console.warn(z)
        }
        setTimeout(function() {
            E.toast.classList.remove(m + "-opening");
            E.toast.classList.add(m + "-opened");
            try {
                var G = new CustomEvent(m + "-opened", {
                    detail: B,
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(G)
            } catch (F) {
                console.warn(F)
            }
            B.onOpened.apply(null, [B, E.toast])
        }, 1000);
        if (B.drag) {
            if (k) {
                E.toast.addEventListener("touchstart", function(F) {
                    p.startMoving(this, D, B, F)
                }, false);
                E.toast.addEventListener("touchend", function(F) {
                    p.stopMoving(this, F)
                }, false)
            } else {
                E.toast.addEventListener("mousedown", function(F) {
                    F.preventDefault();
                    p.startMoving(this, D, B, F)
                }, false);
                E.toast.addEventListener("mouseup", function(F) {
                    F.preventDefault();
                    p.stopMoving(this, F)
                }, false)
            }
        }
        if (B.closeOnEscape) {
            document.addEventListener("keyup", function(F) {
                F = F || window.event;
                if (F.keyCode == 27) {
                    D.hide(B, E.toast, "esc")
                }
            })
        }
        if (B.closeOnClick) {
            E.toast.addEventListener("click", function(F) {
                D.hide(B, E.toast, "toast")
            })
        }
        if (B.audio) {
            D.playSound(B.audio)
        }
        D.toast = E.toast
    };
    d.progress = function(y, C, D) {
        var B = this,
            A = C.getAttribute("data-iziToast-ref"),
            z = u(this.children[A], y || {}),
            x = C.querySelector("." + m + "-progressbar div");
        return {
            start: function() {
                if (typeof z.time.REMAINING == "undefined") {
                    C.classList.remove(m + "-reseted");
                    if (x !== null) {
                        x.style.transition = "width " + z.timeout + "ms " + z.progressBarEasing;
                        x.style.width = "0%"
                    }
                    z.time.START = new Date().getTime();
                    z.time.END = z.time.START + z.timeout;
                    z.time.TIMER = setTimeout(function() {
                        clearTimeout(z.time.TIMER);
                        if (!C.classList.contains(m + "-closing")) {
                            B.hide(z, C, "timeout");
                            if (typeof D === "function") {
                                D.apply(B)
                            }
                        }
                    }, z.timeout);
                    B.setSetting(A, "time", z.time)
                }
            },
            pause: function() {
                if (typeof z.time.START !== "undefined" && !C.classList.contains(m + "-paused") && !C.classList.contains(m + "-reseted")) {
                    C.classList.add(m + "-paused");
                    z.time.REMAINING = z.time.END - new Date().getTime();
                    clearTimeout(z.time.TIMER);
                    B.setSetting(A, "time", z.time);
                    if (x !== null) {
                        var E = window.getComputedStyle(x),
                            F = E.getPropertyValue("width");
                        x.style.transition = "none";
                        x.style.width = F
                    }
                    if (typeof D === "function") {
                        setTimeout(function() {
                            D.apply(B)
                        }, 10)
                    }
                }
            },
            resume: function() {
                if (typeof z.time.REMAINING !== "undefined") {
                    C.classList.remove(m + "-paused");
                    if (x !== null) {
                        x.style.transition = "width " + z.time.REMAINING + "ms " + z.progressBarEasing;
                        x.style.width = "0%"
                    }
                    z.time.END = new Date().getTime() + z.time.REMAINING;
                    z.time.TIMER = setTimeout(function() {
                        clearTimeout(z.time.TIMER);
                        if (!C.classList.contains(m + "-closing")) {
                            B.hide(z, C, "timeout");
                            if (typeof D === "function") {
                                D.apply(B)
                            }
                        }
                    }, z.time.REMAINING);
                    B.setSetting(A, "time", z.time)
                } else {
                    this.start()
                }
            },
            reset: function() {
                clearTimeout(z.time.TIMER);
                delete z.time.REMAINING;
                B.setSetting(A, "time", z.time);
                C.classList.add(m + "-reseted");
                C.classList.remove(m + "-paused");
                if (x !== null) {
                    x.style.transition = "none";
                    x.style.width = "100%"
                }
                if (typeof D === "function") {
                    setTimeout(function() {
                        D.apply(B)
                    }, 10)
                }
            }
        }
    };
    var c = function() {
        var z = navigator.userAgent;
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            var x = new RegExp("MSIE (\\d+\\.\\d+);");
            x.test(z);
            var y = parseFloat(RegExp["$1"]);
            if (y != 10) {
                return true
            }
        }
        return false
    };
    if (!("remove" in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this)
            }
        }
    }
    if (typeof window.CustomEvent !== "function") {
        var o = function(y, z) {
            z = z || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var x = document.createEvent("CustomEvent");
            x.initCustomEvent(y, z.bubbles, z.cancelable, z.detail);
            return x
        };
        o.prototype = window.Event.prototype;
        window.CustomEvent = o
    }
    var r = function(A, C, z) {
        if (Object.prototype.toString.call(A) === "[object Object]") {
            for (var B in A) {
                if (Object.prototype.hasOwnProperty.call(A, B)) {
                    C.call(z, A[B], B, A)
                }
            }
        } else {
            if (A) {
                for (var y = 0, x = A.length; y < x; y++) {
                    C.call(z, A[y], y, A)
                }
            }
        }
    };
    var u = function(z, y) {
        var x = {};
        r(z, function(A, B) {
            x[B] = z[B]
        });
        r(y, function(A, B) {
            x[B] = y[B]
        });
        return x
    };
    var j = function(y) {
        var z = document.createDocumentFragment(),
            x = document.createElement("div");
        x.innerHTML = y;
        while (x.firstChild) {
            z.appendChild(x.firstChild)
        }
        return z
    };
    var s = function(y) {
        var x = btoa(encodeURIComponent(y));
        return x.replace(/=/g, "")
    };
    var t = function(x) {
        if (x.substring(0, 1) == "#" || x.substring(0, 3) == "rgb" || x.substring(0, 3) == "hsl") {
            return true
        } else {
            return false
        }
    };
    var i = function(y) {
        try {
            return btoa(atob(y)) == y
        } catch (x) {
            return false
        }
    };
    var p = function() {
        return {
            move: function(y, x, B, z) {
                var A, C = 0.3,
                    D = 180;
                if (z !== 0) {
                    y.classList.add(m + "-dragged");
                    y.style.transform = "translateX(" + z + "px)";
                    if (z > 0) {
                        A = (D - z) / D;
                        if (A < C) {
                            x.hide(u(B, {
                                transitionOut: "fadeOutRight",
                                transitionOutMobile: "fadeOutRight"
                            }), y, "drag")
                        }
                    } else {
                        A = (D + z) / D;
                        if (A < C) {
                            x.hide(u(B, {
                                transitionOut: "fadeOutLeft",
                                transitionOutMobile: "fadeOutLeft"
                            }), y, "drag")
                        }
                    }
                    y.style.opacity = A;
                    if (A < C) {
                        if (b || f) {
                            y.style.left = z + "px"
                        }
                        y.parentNode.style.opacity = C;
                        this.stopMoving(y, null)
                    }
                }
            },
            startMoving: function(z, y, B, C) {
                C = C || window.event;
                var D = ((k) ? C.touches[0].clientX : C.clientX),
                    A = z.style.transform.replace("px)", "");
                A = A.replace("translateX(", "");
                var x = D - A;
                if (B.transitionIn) {
                    z.classList.remove(B.transitionIn)
                }
                if (B.transitionInMobile) {
                    z.classList.remove(B.transitionInMobile)
                }
                z.style.transition = "";
                if (k) {
                    document.ontouchmove = function(F) {
                        F.preventDefault();
                        F = F || window.event;
                        var G = F.touches[0].clientX,
                            E = G - x;
                        p.move(z, y, B, E)
                    }
                } else {
                    document.onmousemove = function(F) {
                        F.preventDefault();
                        F = F || window.event;
                        var G = F.clientX,
                            E = G - x;
                        p.move(z, y, B, E)
                    }
                }
            },
            stopMoving: function(x, y) {
                if (k) {
                    document.ontouchmove = function() {}
                } else {
                    document.onmousemove = function() {}
                }
                x.style.opacity = "";
                x.style.transform = "";
                if (x.classList.contains(m + "-dragged")) {
                    x.classList.remove(m + "-dragged");
                    x.style.transition = "transform 0.4s ease, opacity 0.4s ease";
                    setTimeout(function() {
                        x.style.transition = ""
                    }, 400)
                }
            }
        }
    }();
    var h = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(C) {
            var F = "";
            var z, x, A, G, y, E, D;
            var B = 0;
            C = h._utf8_encode(C);
            while (B < C.length) {
                z = C.charCodeAt(B++);
                x = C.charCodeAt(B++);
                A = C.charCodeAt(B++);
                G = z >> 2;
                y = (z & 3) << 4 | x >> 4;
                E = (x & 15) << 2 | A >> 6;
                D = A & 63;
                if (isNaN(x)) {
                    E = D = 64
                } else {
                    if (isNaN(A)) {
                        D = 64
                    }
                }
                F = F + this._keyStr.charAt(G) + this._keyStr.charAt(y) + this._keyStr.charAt(E) + this._keyStr.charAt(D)
            }
            return F
        },
        decode: function(C) {
            var F = "";
            var z, x, A;
            var G, y, E, D;
            var B = 0;
            C = C.replace(/[^A-Za-z0-9+/=]/g, "");
            while (B < C.length) {
                G = this._keyStr.indexOf(C.charAt(B++));
                y = this._keyStr.indexOf(C.charAt(B++));
                E = this._keyStr.indexOf(C.charAt(B++));
                D = this._keyStr.indexOf(C.charAt(B++));
                z = G << 2 | y >> 4;
                x = (y & 15) << 4 | E >> 2;
                A = (E & 3) << 6 | D;
                F = F + String.fromCharCode(z);
                if (E != 64) {
                    F = F + String.fromCharCode(x)
                }
                if (D != 64) {
                    F = F + String.fromCharCode(A)
                }
            }
            F = h._utf8_decode(F);
            return F
        },
        _utf8_encode: function(z) {
            z = z.replace(/rn/g, "n");
            var x = "";
            for (var A = 0; A < z.length; A++) {
                var y = z.charCodeAt(A);
                if (y < 128) {
                    x += String.fromCharCode(y)
                } else {
                    if (y > 127 && y < 2048) {
                        x += String.fromCharCode(y >> 6 | 192);
                        x += String.fromCharCode(y & 63 | 128)
                    } else {
                        x += String.fromCharCode(y >> 12 | 224);
                        x += String.fromCharCode(y >> 6 & 63 | 128);
                        x += String.fromCharCode(y & 63 | 128)
                    }
                }
            }
            return x
        },
        _utf8_decode: function(z) {
            var x = "";
            var A = 0;
            var y = c1 = c2 = 0;
            while (A < z.length) {
                y = z.charCodeAt(A);
                if (y < 128) {
                    x += String.fromCharCode(y);
                    A++
                } else {
                    if (y > 191 && y < 224) {
                        c2 = z.charCodeAt(A + 1);
                        x += String.fromCharCode((y & 31) << 6 | c2 & 63);
                        A += 2
                    } else {
                        c2 = z.charCodeAt(A + 1);
                        c3 = z.charCodeAt(A + 2);
                        x += String.fromCharCode((y & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                        A += 3
                    }
                }
            }
            return x
        }
    };
    if (c()) {
        window.btoa = function(x) {
            return h.encode(x)
        };
        window.atob = function(x) {
            return h.decode(x)
        };
        if (!("classList" in document.documentElement)) {
            Object.defineProperty(window.Element.prototype, "classList", {
                get: function() {
                    var y = this;

                    function z(A) {
                        return function() {
                            var B = y.className.replace(/^\s+|\s+$/g, ""),
                                C = arguments;
                            return A(B, C)
                        }
                    }

                    function x(E, F, A) {
                        for (var D in F) {
                            if (typeof F[D] !== "string" || !! ~F[D].search(/\s+/g)) {
                                throw TypeError("the type of value is error")
                            }
                            var C = F[D];
                            var B = !! ~E.search(new RegExp("(\\s+)?" + C + "(\\s+)?"));
                            if (A === 1) {
                                !B ? E += " " + C : ""
                            } else {
                                if (A === 2) {
                                    B ? E = E.replace(new RegExp("(\\s+)?" + C), "") : ""
                                }
                            }
                        }
                        y.className = E;
                        return A
                    }
                    return {
                        add: z(function(A, B) {
                            x(A, B, 1)
                        }),
                        remove: z(function(A, B) {
                            x(A, B, 2)
                        }),
                        toggle: function(A) {
                            if (typeof A !== "string" || arguments.length === 0) {
                                throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument(string) required, but only 0 present.")
                            }
                            if (arguments.length === 1) {
                                this.contains(A) ? this.remove(A) : this.add(A);
                                return
                            }!arguments[1] ? this.remove(A) : this.add(A)
                        },
                        contains: z(function(A, B) {
                            if (B.length === 0) {
                                throw TypeError("Failed to execute 'contains' on 'DOMTokenList': 1 argument required, but only 0 present.")
                            }
                            if (typeof B[0] !== "string" || !! ~B[0].search(/\s+/g)) {
                                return false
                            }
                            return !!~A.search(new RegExp(B[0]))
                        }),
                        item: function(C) {
                            typeof C === "string" ? C = parseInt(C) : "";
                            if (arguments.length === 0 || typeof C !== "number") {
                                throw TypeError("Failed to execute 'toggle' on 'DOMTokenList': 1 argument required, but only 0 present.")
                            }
                            var B = y.className.replace(/^\s+|\s+$/, "").split(/\s+/);
                            var A = B.length;
                            if (C < 0 || C >= A) {
                                return null
                            }
                            return B[C]
                        }
                    }
                }
            })
        }
    }
    d.playSound = function(y) {
        if (!(y.indexOf("http") == 0)) {
            y = layui.cache.base + "notice/" + y + ".wav"
        }
        if ( !! window.ActiveXObject || "ActiveXObject" in window) {
            var z = document.noticePlay;
            if (z) {
                z.remove()
            }
            z = document.createElement("embed");
            z.setAttribute("name", "noticePlay");
            z.setAttribute("src", y);
            z.setAttribute("autostart", true);
            z.setAttribute("loop", false);
            z.setAttribute("hidden", true);
            document.body.appendChild(z);
            z = document.noticePlay;
            z.volume = 100
        } else {
            var x = document.createElement("audio");
            x.setAttribute("hidden", true);
            x.setAttribute("src", y);
            document.body.appendChild(x);
            x.addEventListener("ended", function() {
                x.parentNode.removeChild(x)
            }, false);
            x.play()
        }
    };
    r(a, function(y, x) {
        d[x] = function(z) {
            var A = u(v, z || {});
            A = u(y, A || {});
            this.show(A)
        }
    });
    layui.link(layui.cache.base + "notice/notice.css");
    w("notice", d)
});