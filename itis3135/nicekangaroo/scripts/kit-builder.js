/**
 * Care-kit builder: updates a live estimated total when users select kit items.
 */
(function () {
    "use strict";

    var KIT_ITEMS = [
        { id: "study-kit", label: "Study Kit", price: 24 },
        { id: "self-care-kit", label: "Self-Care Kit", price: 28 },
        { id: "tech-kit", label: "Tech Emergency Kit", price: 32 },
        { id: "travel-kit", label: "Travel Kit", price: 26 },
        { id: "dorm-kit", label: "Dorm Essentials Kit", price: 22 },
        { id: "gift-pouch", label: "Personalized Gift Pouch Add-on", price: 8 }
    ];

    function formatCurrency(amount) {
        return "$" + amount.toFixed(2);
    }

    function updateKitTotal(form, totalOutput, summaryList) {
        var total = 0;
        var selectedLabels = [];

        KIT_ITEMS.forEach(function (item) {
            var checkbox = form.querySelector("#" + item.id);
            if (checkbox && checkbox.checked) {
                total += item.price;
                selectedLabels.push(item.label + " (" + formatCurrency(item.price) + ")");
            }
        });

        totalOutput.textContent = formatCurrency(total);

        if (selectedLabels.length === 0) {
            summaryList.textContent = "No items selected yet.";
        } else {
            summaryList.textContent = selectedLabels.join(", ");
        }
    }

    function initKitBuilder() {
        var form = document.getElementById("kit-builder-form");
        var totalOutput = document.getElementById("kit-total");
        var summaryList = document.getElementById("kit-selection-summary");

        if (!form || !totalOutput || !summaryList) {
            return;
        }

        form.addEventListener("change", function () {
            updateKitTotal(form, totalOutput, summaryList);
        });

        form.addEventListener("reset", function () {
            window.setTimeout(function () {
                updateKitTotal(form, totalOutput, summaryList);
            }, 0);
        });

        updateKitTotal(form, totalOutput, summaryList);
    }

    document.addEventListener("DOMContentLoaded", initKitBuilder);
}());
