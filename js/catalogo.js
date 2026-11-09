(function () {
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty");
  const filters = document.getElementById("filters");
  const searchInput = document.getElementById("search-input");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let query = (params.get("q") || "").toLowerCase();
  let category = "todos";

  if (searchInput && query) searchInput.value = params.get("q");

  function render() {
    const items = window.FIOZIL_PRODUCTS.filter(function (item) {
      const matchCategory = category === "todos" || item.category === category;
      const haystack = (item.name + " " + item.short).toLowerCase();
      const matchQuery = !query || haystack.indexOf(query) !== -1;
      return matchCategory && matchQuery;
    });

    grid.innerHTML = items
      .map(function (item) {
        return (
          '<article class="card">' +
          '<div class="card-image"><img src="' + item.image + '" alt="' + item.name + '"></div>' +
          "<h3>" + item.name + "</h3>" +
          '<a class="details" href="detalle.html?id=' + item.id + '">ver Detalles</a>' +
          "</article>"
        );
      })
      .join("");

    empty.style.display = items.length ? "none" : "block";
  }

  if (filters) {
    filters.addEventListener("click", function (event) {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      category = button.getAttribute("data-filter");
      filters.querySelectorAll(".chip").forEach(function (chip) {
        chip.classList.toggle("active", chip === button);
      });
      render();
    });
  }

  render();
})();
