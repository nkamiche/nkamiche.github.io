/**
 * Order scheduling form: displays a personalized confirmation summary without reloading.
 */
(function () {
    "use strict";

    function formatPickupDate(value) {
        if (!value) {
            return "Not selected";
        }

        var parts = value.split("-");
        if (parts.length !== 3) {
            return value;
        }

        return parts[1] + "/" + parts[2] + "/" + parts[0];
    }

    function buildSummary(form) {
        var name = form.customerName.value.trim();
        var email = form.customerEmail.value.trim();
        var kitType = form.kitType.value;
        var pickupDate = formatPickupDate(form.pickupDate.value);
        var pickupTime = form.pickupTime.value;
        var notes = form.orderNotes.value.trim();

        var summary = "Thank you, " + name + ". Your " + kitType + " order is scheduled for pickup on " +
            pickupDate + " at " + pickupTime + ". A confirmation will be sent to " + email + ".";

        if (notes) {
            summary += " Notes: " + notes;
        }

        return summary;
    }

    function initOrderSchedule() {
        var form = document.getElementById("order-schedule-form");
        var summaryOutput = document.getElementById("order-summary");

        if (!form || !summaryOutput) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            summaryOutput.textContent = buildSummary(form);
        });

        form.addEventListener("reset", function () {
            window.setTimeout(function () {
                summaryOutput.textContent = "Your personalized order summary will appear here after you schedule pickup.";
            }, 0);
        });
    }

    document.addEventListener("DOMContentLoaded", initOrderSchedule);
}());
