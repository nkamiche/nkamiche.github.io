/*! HTMLInclude v1.1.1 | MIT License | github.com/paul-browne/HTMLInclude */ 
!function(w, d) {
    if (!w.HTMLInclude) {
        w.HTMLInclude = function() {
            function isInViewport(element, offset) {
                return element.getBoundingClientRect().top <= (+offset + w.innerHeight);
            }
            function getIncludePrefix(includePath) {
                var match = includePath.match(/^(\.\.\/)+/);
                return match ? match[0] : "";
            }

            function fixRelativeLinks(html, prefix) {
                if (!prefix) {
                    return html;
                }

                var doc = new DOMParser().parseFromString(html, "text/html");
                var links = doc.querySelectorAll("a[href]");

                for (var i = 0; i < links.length; i += 1) {
                    var href = links[i].getAttribute("href");

                    if (!href || /^(https?:|mailto:|tel:|#|\/)/.test(href)) {
                        continue;
                    }

                    if (href.indexOf("../") !== 0 && href.indexOf("./") !== 0) {
                        links[i].setAttribute("href", prefix + href);
                    }
                }

                return doc.body.innerHTML;
            }

            function ajax(url, elements) {
                fetch(url)
                    .then(response => response.text())
                    .then(text => {
                        elements.forEach(function(element) {
                            var dataReplace = element.getAttribute("data-replace");
                            var includePath = element.getAttribute("data-include") || url;
                            var prefix = getIncludePrefix(includePath);
                            var z = fixRelativeLinks(text, prefix);

                            if (dataReplace) {
                                dataReplace.split(",").forEach(function(el) {
                                    var o = el.trim().split(":");
                                    z = z.replace(new RegExp(o[0], "g"), o[1]);
                                });
                            }
                            element.outerHTML = z;
                            var scripts = new DOMParser().parseFromString(z, 'text/html').querySelectorAll("SCRIPT");
                            var i = 0;
                            var j = scripts.length;
                            while (i < j) {
                                var newScript = d.createElement("SCRIPT");
                                scripts[i].src ? newScript.src = scripts[i].src : newScript.innerHTML = scripts[i].innerHTML;
                                d.head.appendChild(newScript);
                                i++;
                            }
                        });
                    })
                    .catch(error => console.error('Error loading include:', url, error));
            }
            function lazyLoad(element, offset) {
                w.addEventListener("scroll", function scrollFunc() {
                    if (isInViewport(element, offset)) {
                        w.removeEventListener("scroll", scrollFunc);
                        ajax(element.getAttribute("data-include"), [element]);
                    }
                })
            }
            var store = {};
            var dis = d.querySelectorAll('[data-include]:not([data-in])');
            var i = dis.length;
            while (i--) {
                var di = dis[i].getAttribute('data-include');
                var laziness = dis[i].getAttribute('data-lazy');
                dis[i].setAttribute("data-in", "");
                if (!laziness || (laziness && isInViewport(dis[i], laziness))) {
                    store[di] = store[di] || [];
                    store[di].push(dis[i]);
                } else {
                    lazyLoad(dis[i], laziness);
                }
            }
            for (var key in store) {
                ajax(key, store[key]);
            }
        }
    }
    w.HTMLInclude();
}(window, document)