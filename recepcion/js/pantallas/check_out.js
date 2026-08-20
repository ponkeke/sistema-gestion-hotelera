const botonFinalizar = document.querySelector(
  ".acciones-finales .boton-principal",
);

document
  .querySelector(".ampliar-estadia .boton-secundario")
  ?.addEventListener("click", () => {
    const noches = Number(prompt("¿Cuántas noches deseas ampliar?"));
    if (!Number.isInteger(noches) || noches < 1)
      return mostrarMensaje("Ingresa una cantidad válida de noches.", "error");
    mostrarMensaje(
      "Estadía ampliada por " +
        noches +
        " noche" +
        (noches === 1 ? "" : "s") +
        ".",
      "exito",
    );
  });

botonFinalizar?.addEventListener("click", () => {
  const confirmar = confirm("¿Confirmas el cobro de S/ 126.00 y el check-out?");
  if (!confirmar) return;
  const reserva = AlmacenRecepcion.obtener("reserva_actual", {});
  AlmacenRecepcion.guardar("reserva_actual", {
    ...reserva,
    estado: "Finalizada",
    saldo: 0,
  });
  mostrarMensaje(
    "Check-out completado. Habitación enviada a limpieza.",
    "exito",
  );
  botonFinalizar.disabled = true;
  botonFinalizar.textContent = "Check-out finalizado";
});
