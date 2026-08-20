const formularioIngreso = document.querySelector(".formulario-checkin");
const botonIngreso = document.querySelector(
  ".acciones-finales .boton-principal",
);

botonIngreso?.addEventListener("click", (evento) => {
  evento.preventDefault();
  const fecha = formularioIngreso.elements["fecha-checkin"];
  if (
    !ValidacionesRecepcion.requerido(
      fecha,
      "Selecciona la fecha y hora de ingreso.",
    )
  )
    return;
  const reserva = AlmacenRecepcion.obtener("reserva_actual", {});
  AlmacenRecepcion.guardar("reserva_actual", {
    ...reserva,
    check_in: fecha.value,
    observaciones: formularioIngreso.elements.observaciones.value,
    estado: "Hospedado",
  });
  mostrarMensaje("Check-in registrado correctamente.", "exito");
  window.setTimeout(() => (window.location.href = "cuenta_huesped.html"), 500);
});
