/**
 * Interactive product slideshow with previous and next controls.
 */
(function () {
    "use strict";

    var SLIDES = [
        {
            src: "../images/product-illustration.jpeg",
            alt: "Assorted Nice Kangaroo care kit products arranged on a table",
            caption: "Curated care kits filled with practical items for busy students."
        },
        {
            src: "../images/kangaroo-standing@sunil-nepali_pexels.jpg",
            alt: "Kangaroo standing in a natural outdoor setting",
            caption: "Our Nice Kangaroo mascot represents warmth, energy, and thoughtful gifting."
        },
        {
            src: "../images/hand-holding-bottle-cap@neha-kamichetty.jpeg",
            alt: "Hands holding a small personalized gift item",
            caption: "Personalized pouches make every care kit feel special."
        },
        {
            src: "../images/inventory-icon.jpg",
            alt: "Organized shelf display of packaged care kit supplies",
            caption: "Each kit is packed with essentials chosen for everyday campus life."
        }
    ];

    var currentIndex = 0;

    function showSlide(index, image, caption, status) {
        var slide = SLIDES[index];
        image.src = slide.src;
        image.alt = slide.alt;
        caption.textContent = slide.caption;
        status.textContent = "Showing slide " + (index + 1) + " of " + SLIDES.length + ": " + slide.caption;
    }

    function initSlideshow() {
        var image = document.getElementById("slideshow-image");
        var caption = document.getElementById("slideshow-caption");
        var status = document.getElementById("slideshow-status");
        var prevButton = document.getElementById("slideshow-prev");
        var nextButton = document.getElementById("slideshow-next");

        if (!image || !caption || !status || !prevButton || !nextButton) {
            return;
        }

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = SLIDES.length - 1;
            } else if (index >= SLIDES.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            showSlide(currentIndex, image, caption, status);
        }

        prevButton.addEventListener("click", function () {
            goToSlide(currentIndex - 1);
        });

        nextButton.addEventListener("click", function () {
            goToSlide(currentIndex + 1);
        });

        showSlide(currentIndex, image, caption, status);
    }

    document.addEventListener("DOMContentLoaded", initSlideshow);
}());
