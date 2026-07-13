/**
 * Loads Accumulus after Vicunadator finishes so inline styles are not counted by Llama.
 */
(function () {
    "use strict";

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
        document.head.appendChild(accumulus);
    }

    window.addEventListener("load", function () {
        window.setTimeout(loadAccumulus, 2000);
    });
}());
