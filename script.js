
// ===================================
// 1. DARK AND LIGHT MODE
// ===================================

const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    // Check which theme is currently active
    const isDark = document.body.classList.contains("dark-mode");

    // Change the button symbol
    themeButton.textContent = isDark ? "☀" : "☾";

    // Save the user's theme preference
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");

});

// Restore saved theme when the page loads
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀";
}


// ===================================
// 2. MOBILE NAVIGATION
// ===================================

// Get navigation elements
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

// Create a mobile menu button
const menuButton = document.createElement("button");

menuButton.className = "menu-toggle";
menuButton.textContent = "☰";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");

// Insert the button into the navigation
navbar.insertBefore(menuButton, navLinks);

// Open and close the mobile menu
menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);

});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    });

});


// ===================================
// 3. SCROLL REVEAL ANIMATIONS
// ===================================

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card"
);

// Add reveal class to selected elements
revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

// Watch elements as they enter the screen
const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

// Observe each element
revealElements.forEach(function (element) {
    observer.observe(element);
});

console.log("Portfolio JavaScript loaded successfully!");


const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

   emailjs.init({
    publicKey: "XNxaLI5SQU_lOrySm"
});

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-btn");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Sending your message...";

    try {
        const response = await emailjs.sendForm(
            "service_a8blhef",
            "template_6s24rqs",
            contactForm
        );

        console.log("Email sent:", response);

        formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";

        formStatus.style.color = "green";

        contactForm.reset();

    } catch (error) {
        console.error("EmailJS error:", error);

        console.log("Error status:", error.status);
        console.log("Error text:", error.text);

        formStatus.textContent =
            "Message failed. Please try again.";

        formStatus.style.color = "red";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";
    }

});


