(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  document.querySelectorAll("[data-search-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const value = (form.querySelector("input") || {}).value || "";
      window.location.href = "productos.html?q=" + encodeURIComponent(value.trim());
    });
  });

  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  const quoteProduct = new URLSearchParams(window.location.search).get("producto");
  if (quoteProduct) {
    document.querySelectorAll('select[name="producto"]').forEach(function (select) {
      select.value = quoteProduct;
    });
  }

  document.querySelectorAll("[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get("nombre") || "";
      const phone = data.get("telefono") || "";
      const product = data.get("producto") || "";
      const message = data.get("mensaje") || "";
      const text = encodeURIComponent(
        "Hola FiOzil, soy " +
          name +
          ". Quiero una cotización de " +
          product +
          ". Tel: " +
          phone +
          ". " +
          message
      );
      window.open("https://wa.me/51938102045?text=" + text, "_blank");
      showToast("Te redirigimos a WhatsApp para continuar tu pedido.");
      form.reset();
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      showToast("Mensaje listo. También puedes escribirnos por WhatsApp o correo.");
      form.reset();
    });
  });

  window.Fiozil = { showToast: showToast };
})();
// --- Conexión del formulario de contacto a Supabase ---
const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura los valores ingresados usando los atributos 'name' del HTML
    const nombreVal = contactForm.querySelector('[name="nombre"]').value;
    const emailVal = contactForm.querySelector('[name="email"]').value;
    const mensajeVal = contactForm.querySelector('[name="mensaje"]').value;

    // Envia los datos a la tabla 'contactos' de Supabase
    const { data, error } = await supabaseClient
      .from('contactos')
      .insert([
        { 
          nombre: nombreVal, 
          email: emailVal, 
          mensaje: mensajeVal 
        }
      ]);

    if (error) {
      alert('Error al enviar el mensaje: ' + error.message);
    } else {
      alert('¡Mensaje enviado con éxito a la base de datos!');
      contactForm.reset();
    }
  });
}