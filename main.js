/**
 * Credit Deletion Frontend - Form Handler
 * Connects to Credit-deletion-backend API
 */

// Backend API configuration
const API_BASE_URL = "http://localhost:5000";

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("consultationForm");
    const formStatus = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById("consultationName").value.trim();
            const email = document.getElementById("consultationEmail").value.trim();
            const phone = document.getElementById("consultationPhone").value.trim();
            const message = document.getElementById("consultationMessage").value.trim();

            // Validate
            if (!name || !email || !phone) {
                showStatus("Please fill in all required fields", "error");
                return;
            }

            // Show loading state
            const submitBtn = document.getElementById("submitBtn");
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "SENDING...";

            try {
                // Send POST request to backend
                const response = await fetch(`${API_BASE_URL}/consultation`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        message: message || "",
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showStatus(
                        "✓ Consultation request submitted successfully! Our team will contact you soon.",
                        "success"
                    );
                    form.reset(); // Clear form
                    console.log("Consultation created:", data.data);
                } else {
                    const errorMsg = data.errors
                        ? Object.values(data.errors).join(", ")
                        : data.message || "Failed to submit request";
                    showStatus(`✗ ${errorMsg}`, "error");
                }
            } catch (error) {
                console.error("Error:", error);
                showStatus(`✗ Network error. Make sure the backend is running at ${API_BASE_URL}`, "error");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

/**
 * Display status message
 */
function showStatus(message, type) {
    const formStatus = document.getElementById("formStatus");
    formStatus.textContent = message;
    formStatus.style.marginTop = "1rem";
    formStatus.style.padding = "0.75rem";
    formStatus.style.borderRadius = "5px";
    formStatus.style.fontWeight = "bold";

    if (type === "success") {
        formStatus.style.backgroundColor = "#d4edda";
        formStatus.style.color = "#155724";
        formStatus.style.border = "1px solid #c3e6cb";
    } else if (type === "error") {
        formStatus.style.backgroundColor = "#f8d7da";
        formStatus.style.color = "#721c24";
        formStatus.style.border = "1px solid #f5c6cb";
    }

    // Auto-clear success message after 5 seconds
    if (type === "success") {
        setTimeout(() => {
            formStatus.textContent = "";
        }, 5000);
    }
}

/**
 * Smooth scroll to consultation form
 */
function scrollToConsultation() {
    const consultationSection = document.getElementById("contact");
    if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Attach scroll function to CTA buttons
document.addEventListener("DOMContentLoaded", function () {
    const ctaButtons = document.querySelectorAll(".btn, #btn");
    ctaButtons.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            // Only scroll if it's a CTA button (not a link)
            if (this.getAttribute("href") === "#" || !this.getAttribute("href")) {
                e.preventDefault();
                scrollToConsultation();
            }
        });
    });
});
