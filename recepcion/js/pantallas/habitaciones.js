const formularioFiltros = document.querySelector(".barra-filtros");
const tarjetas = [...document.querySelectorAll(".tarjeta-habitacion")];
const pieHabitaciones = document.querySelector(".leyenda-habitaciones small");

function filtrarHabitaciones() {
  const texto = formularioFiltros
    .querySelector('input[type="search"]')
    .value.toLowerCase()
    .trim();
  const selecciones = [...formularioFiltros.querySelectorAll("select")].map(
    (campo) => campo.value.toLowerCase(),
  );
  let visibles = 0;

  tarjetas.forEach((tarjeta) => {
    const contenido = tarjeta.textContent.toLowerCase();
    const coincideTexto = !texto || contenido.includes(texto);
    const coincidePiso =
      selecciones[0].startsWith("todos") || contenido.includes(selecciones[0]);
    const coincideTipo =
      selecciones[1].startsWith("todos") || contenido.includes(selecciones[1]);
    const coincideEstado =
      selecciones[2].startsWith("todos") || contenido.includes(selecciones[2]);
    const visible =
      coincideTexto && coincidePiso && coincideTipo && coincideEstado;
    tarjeta.classList.toggle("elemento_oculto", !visible);
    if (visible) visibles += 1;
  });

  pieHabitaciones.textContent =
    visibles + " resultado" + (visibles === 1 ? "" : "s");
  mostrarMensaje(
    visibles
      ? "Se encontraron " + visibles + " habitaciones."
      : "No existen habitaciones con esos filtros.",
    visibles ? "exito" : "error",
  );
}

formularioFiltros?.addEventListener("submit", (evento) => {
  evento.preventDefault();
  filtrarHabitaciones();
});

formularioFiltros
  ?.querySelector('input[type="search"]')
  ?.addEventListener("input", filtrarHabitaciones);
formularioFiltros
  ?.querySelectorAll("select")
  .forEach((campo) => campo.addEventListener("change", filtrarHabitaciones));
