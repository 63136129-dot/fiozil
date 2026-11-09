(function () {
  const root = document.getElementById("detail");
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const product = (window.FIOZIL_PRODUCTS || []).find(function (item) {
    return item.id === id;
  }) || window.FIOZIL_PRODUCTS[0];

  document.title = product.name + " | FiOzil";

  const quote =
    "personalizacion.html?producto=" + encodeURIComponent(product.name);
  const wa = "https://wa.me/51938102045?text=" + encodeURIComponent("Hola FiOzil, quiero cotizar: " + product.name);

  root.innerHTML =
    '<img src="' + product.image + '" alt="' + product.name + '">' +
    "<div>" +
    "<h1>" + product.name + "</h1>" +
    "<p>" + product.description + "</p>" +
    '<div class="detail-actions">' +
    '<a class="btn btn-primary" href="' + wa + '" target="_blank" rel="noopener">Solicitar Cotización</a>' +
    '<a class="btn btn-outline" href="' + quote + '">Personalizar</a>' +
    "</div></div>";
})();
