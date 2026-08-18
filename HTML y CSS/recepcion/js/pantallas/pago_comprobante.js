const formularioPago = document.querySelector(".formulario-pago");
const campoMonto = formularioPago.elements.monto;
const salidaVuelto = formularioPago.querySelector("output strong");
const botonConfirmar = document.querySelector(
  ".cuadricula-pago > aside > .boton-principal",
);
const total =
  AlmacenRecepcion.obtener("reserva_actual", { total: 544 }).total || 544;

function calcularVuelto() {
  const monto = Number(campoMonto.value || 0);
  const parcial = formularioPago
    .querySelector('input[name="tipo-pago"]:checked + span')
    ?.textContent.includes("parcial");
  salidaVuelto.textContent = parcial
    ? "Pago parcial"
    : "S/ " + Math.max(0, monto - total).toFixed(2);
}

campoMonto?.addEventListener("input", calcularVuelto);
formularioPago?.addEventListener("change", calcularVuelto);

document
  .querySelector(".comprobante .boton-secundario")
  ?.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.print();
  });

botonConfirmar?.addEventListener("click", (evento) => {
  evento.preventDefault();
  const monto = Number(campoMonto.value || 0);
  const parcial = formularioPago
    .querySelector('input[name="tipo-pago"]:checked + span')
    ?.textContent.includes("parcial");
  if (
    !ValidacionesRecepcion.numeroPositivo(
      campoMonto,
      "Ingresa el monto recibido.",
    )
  )
    return;
  if (!parcial && monto < total)
    return ValidacionesRecepcion.error(
      campoMonto,
      "Faltan S/ " + (total - monto).toFixed(2) + " para completar el pago.",
    );
  const reserva = AlmacenRecepcion.obtener("reserva_actual", {});
  AlmacenRecepcion.guardar("reserva_actual", {
    ...reserva,
    monto_pagado: monto,
    estado_pago: parcial ? "Parcial" : "Pagado",
  });
  window.location.href = "check_in.html";
});

calcularVuelto();
