const mensajeSupervisor = (texto) => {
  document.querySelector(".mensaje")?.remove();
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.textContent = texto;
  document.body.appendChild(mensaje);
  setTimeout(() => mensaje.remove(), 2500);
};

document.querySelector("#formulario_periodo")?.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const desde = new Date(evento.currentTarget.elements.desde.value);
  const hasta = new Date(evento.currentTarget.elements.hasta.value);
  if (desde > hasta) {
    mensajeSupervisor("La fecha inicial no puede ser posterior a la fecha final.");
    return;
  }
  document.querySelectorAll(".grafico__barra").forEach((barra) => {
    barra.style.height = `${80 + Math.floor(Math.random() * 180)}px`;
  });
  mensajeSupervisor("Reporte actualizado correctamente.");
});

document.querySelector("#exportar_reporte")?.addEventListener("click", () => {
  const filas = [
    ["Indicador", "Valor"],
    ["Ingresos", "S/ 48.6k"],
    ["Hospedajes", "218"],
    ["Consumos", "S/ 7.9k"],
    ["Ticket medio", "S/ 223"],
  ];
  const contenido = filas.map((fila) => fila.join(",")).join("\n");
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(new Blob([contenido], { type: "text/csv;charset=utf-8" }));
  enlace.download = "reporte-operacion.csv";
  enlace.click();
  URL.revokeObjectURL(enlace.href);
  mensajeSupervisor("Reporte exportado en formato CSV.");
});

document.querySelector("[data-cerrar-sesion]")?.addEventListener("click", (evento) => {
  evento.preventDefault();
  alert("Perfil activo: Jorge Vega\nRol: Supervisor\nPermisos: reportes y control de operación");
  if (!confirm("¿Deseas cerrar la sesión del Supervisor?")) return;
  sessionStorage.clear();
  window.location.href = "../../acceso/index.html";
});
