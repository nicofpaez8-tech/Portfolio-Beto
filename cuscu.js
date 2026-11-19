document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "oscuro") {
        document.body.classList.add("oscuro");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("oscuro");
            const isDark = document.body.classList.contains("oscuro");
            themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
            localStorage.setItem("theme", isDark ? "oscuro" : "claro");
        });
    }

    const contactForm = document.getElementById("contact-form");
    const errorDiv = document.getElementById("form-error");
    const successDiv = document.getElementById("form-success");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("email").value.trim();
            const mensajeInput = document.getElementById("mensaje").value.trim();
            const submitBtn = contactForm.querySelector(".submit-btn");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (successDiv) successDiv.textContent = "";

            if (!emailRegex.test(emailInput)) {
                errorDiv.textContent = "Por favor, ingresá un correo electrónico válido.";
                return;
            }

            if (mensajeInput.length < 10) {
                errorDiv.textContent = "El mensaje debe contener al menos 10 caracteres.";
                return;
            }

            errorDiv.textContent = "";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Enviando...";
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    contactForm.reset();
                    if (successDiv) {
                        successDiv.textContent = "¡Mensaje enviado! Gracias por contactarte.";
                    }
                } else {
                    errorDiv.textContent = "No se pudo enviar el mensaje. Intenta de nuevo.";
                }
            } catch (error) {
                errorDiv.textContent = "Error de conexión al intentar enviar el mensaje.";
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Enviar Mensaje";
                }
            }
        });
    }
});