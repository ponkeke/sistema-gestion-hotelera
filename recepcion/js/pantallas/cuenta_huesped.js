const tablaMovimientos = document.querySelector("tbody");
const botonesPestana = [...document.querySelectorAll(".pestanas button")];

botonesPestana.forEach((boton) =>
  boton.addEventListener("click", () => {
    botonesPestana.forEach((otro) => otro.classList.remove("activo"));
    boton.classList.add("activo");
    mostrarMensaje(
      "Mostrando " + boton.textContent.toLowerCase() + " de la cuenta.",
    );
  }),
);

document.querySelectorAll(".acciones-finales button").forEach((boton) =>
  boton.addEventListener("click", () => {
    const esConsumo = boton.textContent.includes("consumo");
    const concepto = prompt(
      esConsumo ? "Describe el consumo:" : "Indica el método de pago:",
    );
    if (!concepto?.trim())
      return mostrarMensaje(
        "La operación fue cancelada porque falta la descripción.",
        "error",
      );
    const monto = Number(prompt("Ingresa el monto:"));
    if (!Number.isFinite(monto) || monto <= 0)
      return mostrarMensaje("Ingresa un monto válido mayor que cero.", "error");
    const fila = document.createElement("tr");
    fila.innerHTML =
      "<td>Ahora</td><td>" +
      concepto +
      "</td><td>" +
      (esConsumo ? "" : "− ") +
      "S/ " +
      monto.toFixed(2) +
      "</td><td>" +
      (esConsumo ? "Consumo" : "Pago") +
      "</td>";
    tablaMovimientos.append(fila);
    mostrarMensaje(
      (esConsumo ? "Consumo" : "Pago") + " registrado correctamente.",
      "exito",
    );
  }),
);
