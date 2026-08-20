const formularioFechas = document.querySelector(".formulario-fechas");
const filasHabitacion = [...document.querySelectorAll("tbody tr")];
const botonSeleccionar = document.querySelector(
  ".acciones-finales .boton-principal",
);
const totalEstimado = document.querySelector(".acciones-finales strong");
let habitacionElegida = null;

function validarFechas() {
  const ingreso = formularioFechas.elements.ingreso;
  const salida = formularioFechas.elements.salida;
  const huespedes = formularioFechas.elements.huespedes;
  if (!ValidacionesRecepcion.requerido(ingreso)) return false;
  if (!ValidacionesRecepcion.requerido(salida)) return false;
  if (new Date(salida.value) <= new Date(ingreso.value))
    return ValidacionesRecepcion.error(
      salida,
      "La salida debe ser posterior al ingreso.",
    );
  return ValidacionesRecepcion.numeroPositivo(
    huespedes,
    "Debe hospedarse al menos una persona.",
  );
}

filasHabitacion.forEach((fila) => {
  fila.tabIndex = 0;
  fila.addEventListener("click", () => {
    filasHabitacion.forEach((otra) =>
      otra.classList.remove("fila_seleccionada"),
    );
    fila.classList.add("fila_seleccionada");
    const celdas = fila.querySelectorAll("td");
    habitacionElegida = {
      numero: celdas[0].textContent,
      categoria: celdas[1].textContent,
      capacidad: Number(celdas[2].textContent),
      tarifa: Number(celdas[3].textContent.replace(/\D/g, "")),
    };
    const noches = Math.max(
      1,
      Math.ceil(
        (new Date(formularioFechas.elements.salida.value) -
          new Date(formularioFechas.elements.ingreso.value)) /
          86400000,
      ),
    );
    totalEstimado.textContent =
      "Total estimado: S/ " + habitacionElegida.tarifa * noches + ".00";
    botonSeleccionar.textContent = "Seleccionar " + habitacionElegida.numero;
  });
});

filasHabitacion[1]?.click();

botonSeleccionar?.addEventListener("click", (evento) => {
  evento.preventDefault();
  if (!validarFechas() || !habitacionElegida) return;
  if (
    Number(formularioFechas.elements.huespedes.value) >
    habitacionElegida.capacidad
  ) {
    return ValidacionesRecepcion.error(
      formularioFechas.elements.huespedes,
      "La cantidad supera la capacidad de la habitación.",
    );
  }
  AlmacenRecepcion.guardar("reserva_actual", {
    ...habitacionElegida,
    ingreso: formularioFechas.elements.ingreso.value,
    salida: formularioFechas.elements.salida.value,
    huespedes: Number(formularioFechas.elements.huespedes.value),
  });
  window.location.href = "cliente_dni.html";
});
