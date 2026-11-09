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

  // --- FORMULARIO DE CONTACTO CON SUPABASE ---
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      // 1. Obtener la referencia del cliente de Supabase (soporta window o variable global)
      const client = window.supabaseClient || (typeof supabaseClient !== 'undefined' ? supabaseClient : null);

      if (!client) {
        showToast("Error: No se encontró la conexión con Supabase");
        console.error("supabaseClient no está definido en el HTML.");
        return;
      }

      // 2. Extraer los datos del formulario usando FormData
      const data = new FormData(form);
      const nombreVal = data.get("nombre") || "";
      const emailVal = data.get("email") || "";
      const mensajeVal = data.get("mensaje") || "";

      // 3. Insertar en la tabla 'contactos' de Supabase
      const { error } = await client
        .from("contactos")
        .insert([
          {
            nombre: nombreVal,
            email: emailVal,
            mensaje: mensajeVal
          }
        ]);

      if (error) {
        showToast("Error al guardar: " + error.message);
        console.error("Error Supabase:", error);
      } else {
        showToast("¡Mensaje guardado con éxito!");
        form.reset();
      }
    });
  });

  window.Fiozil = { showToast: showToast };
})();