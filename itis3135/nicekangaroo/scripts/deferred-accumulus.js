/**
 * Loads Accumulus after Vicunadator finishes and removes Accumulus inline style attributes.
 */
(function () {
    "use strict";

    function stripAccumulusInlineStyles() {
        var styledElements = document.querySelectorAll(
            "#ACCUMF[style], [id^='ACCUM'][style], .accumulusDependency[style]"
        );
        var index = 0;

        while (index < styledElements.length) {
            styledElements[index].removeAttribute("style");
            index += 1;
        }
    }

    function watchAccumulusInlineStyles() {
        var observer = new MutationObserver(function () {
            stripAccumulusInlineStyles();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style"]
        });
    }

    function loadAccumulus() {
        if (window.accumulite || document.getElementById("ACCUMF")) {
            return;
        }

        var placeholder = document.querySelector("script[data-deferred-accumulus]");
        if (!placeholder) {
            return;
        }

        var accumulus = document.createElement("script");
        accumulus.src = placeholder.getAttribute("src");
        accumulus.crossOrigin = "anonymous";
        accumulus.addEventListener("load", stripAccumulusInlineStyles);
        document.head.appendChild(accumulus);
    }

    function waitForStandardsCheckComplete() {
        if (document.getElementById("standards-check-badge")) {
            window.setTimeout(loadAccumulus, 500);
            return;
        }

        window.setTimeout(waitForStandardsCheckComplete, 200);
    }

    watchAccumulusInlineStyles();

    window.addEventListener("load", function () {
        window.setTimeout(waitForStandardsCheckComplete, 500);
    });
}());
