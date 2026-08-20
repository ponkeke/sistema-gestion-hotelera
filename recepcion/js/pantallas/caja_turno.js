const efectivoContado = document.querySelector(
  '.cierre-caja input[type="number"]',
);
const diferencia = document.querySelector(".cierre-caja .texto-rojo");
const observacion = document.querySelector(".nota-cierre input");
const botonEntrega = document.querySelector(".cambio-turno .boton-principal");

function calcularDiferencia() {
  const valor = Number(efectivoContado.value || 0) - 2740;
  diferencia.textContent =
    (valor < 0 ? "− " : "+ ") + "S/ " + Math.abs(valor).toFixed(2);
  diferencia.classList.toggle("texto-rojo", valor !== 0);
  diferencia.classList.toggle("texto-verde", valor === 0);
  return valor;
}

efectivoContado?.addEventListener("input", calcularDiferencia);

botonEntrega?.addEventListener("click", () => {
  const valor = calcularDiferencia();
  if (
    !ValidacionesRecepcion.numeroPositivo(
      efectivoContado,
      "Ingresa el efectivo contado.",
    )
  )
    return;
  if (valor !== 0 && !observacion.value.trim())
    return ValidacionesRecepcion.error(
      observacion,
      "Explica la diferencia antes de entregar el turno.",
    );
  mostrarMensaje("Entrega de turno registrada correctamente.", "exito");
  botonEntrega.disabled = true;
  botonEntrega.textContent = "Turno entregado";
});

calcularDiferencia();
