const formularioConfiguracion = document.querySelector(
  ".formulario-configuracion",
);
const botonPago = document.querySelector(".resumen-reserva .boton-principal");
const totalReserva = document.querySelector(".resumen-reserva > strong");

function calcularReserva() {
  const ingreso = formularioConfiguracion.elements.ingreso;
  const salida = formularioConfiguracion.elements.salida;
  const noches = Math.max(
    1,
    Math.ceil((new Date(salida.value) - new Date(ingreso.value)) / 86400000),
  );
  const extras =
    [
      ...formularioConfiguracion.querySelectorAll(
        'input[type="checkbox"]:checked',
      ),
    ].length * 20;
  const subtotal = noches * 280 + extras;
  const descuento = subtotal * 0.1;
  const total = subtotal - descuento;
  totalReserva.textContent = "S/ " + total.toFixed(2);
  return { noches, extras, descuento, total };
}

formularioConfiguracion?.addEventListener("change", calcularReserva);

botonPago?.addEventListener("click", (evento) => {
  evento.preventDefault();
  const ingreso = formularioConfiguracion.elements.ingreso;
  const salida = formularioConfiguracion.elements.salida;
  if (new Date(salida.value) <= new Date(ingreso.value))
    return ValidacionesRecepcion.error(
      salida,
      "La salida debe ser posterior al ingreso.",
    );
  if (
    !ValidacionesRecepcion.numeroPositivo(
      formularioConfiguracion.elements.huespedes,
    )
  )
    return;
  const reserva = AlmacenRecepcion.obtener("reserva_actual", {});
  AlmacenRecepcion.guardar("reserva_actual", {
    ...reserva,
    ...calcularReserva(),
  });
  window.location.href = "pago_comprobante.html";
});

calcularReserva();
