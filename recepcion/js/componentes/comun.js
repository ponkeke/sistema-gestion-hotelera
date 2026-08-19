window.mostrarMensaje = function (texto, tipo = "informacion") {
  document.querySelector(".mensaje_sistema")?.remove();
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje_sistema mensaje_sistema--" + tipo;
  mensaje.setAttribute("role", "status");
  mensaje.textContent = texto;
  document.body.append(mensaje);
  window.setTimeout(() => mensaje.remove(), 3200);
};

document.querySelectorAll("input, select, textarea").forEach((campo) => {
  campo.addEventListener("input", () =>
    window.ValidacionesRecepcion?.limpiar(campo),
  );
});
