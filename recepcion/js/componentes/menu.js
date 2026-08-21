const botonMenu = document.getElementById("boton-menu");
const menuLateral = document.getElementById("barra-lateral");

const destinosMenu = {
  Reportes: "../../supervisor/index.html",
  Personal: "../../administrador/index.html",
  Catálogos: "../../administrador/catalogos.html",
  Configuración: "configuracion.html",
};

document.querySelectorAll('a[href="#"]').forEach((enlace) => {
  const destino = destinosMenu[enlace.textContent.trim()];
  if (destino) enlace.href = destino;
});

botonMenu?.addEventListener("click", () => {
  menuLateral?.classList.toggle("visible");
});

document.querySelectorAll(".boton-icono").forEach((boton) => {
  boton.addEventListener("click", () => {
    window.mostrarMensaje?.("No tienes notificaciones nuevas.");
  });
});

document.querySelector(".tarjeta-perfil")?.addEventListener("click", () => {
  alert("Perfil activo: Recepción\nUsuario: Camila Ríos\nTurno: Mañana");
  const cerrar = confirm("¿Deseas cerrar la sesión de Recepción?");
  if (!cerrar) return;
  sessionStorage.clear();
  window.location.href = "login.html";
});
