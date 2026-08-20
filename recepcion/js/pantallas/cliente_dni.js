const formularioDni = document.querySelector(".buscador-dni");
const panelCliente = document.querySelector(".cuadricula-cliente");

formularioDni?.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const dni = formularioDni.elements.dni;
  if (!ValidacionesRecepcion.dni(dni)) return;
  if (dni.value !== "72845196") {
    panelCliente.classList.add("elemento_oculto");
    return mostrarMensaje(
      "No encontramos ese DNI. Puedes registrar un cliente nuevo.",
      "error",
    );
  }
  panelCliente.classList.remove("elemento_oculto");
  mostrarMensaje("Cliente encontrado correctamente.", "exito");
});

document
  .querySelector(".cuadricula-cliente .boton-principal")
  ?.addEventListener("click", () => {
    const reserva = AlmacenRecepcion.obtener("reserva_actual", {});
    AlmacenRecepcion.guardar("reserva_actual", {
      ...reserva,
      dni: "72845196",
      huesped: "Valeria Méndez Rojas",
    });
  });

document.querySelector(".enlace-boton")?.addEventListener("click", () => {
  formularioDni.elements.dni.value = "";
  panelCliente.classList.add("elemento_oculto");
  formularioDni.elements.dni.focus();
  mostrarMensaje("Ingresa el DNI del nuevo cliente para iniciar su registro.");
});
