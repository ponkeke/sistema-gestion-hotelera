const botonMenu = document.getElementById("boton-menu");
const menuLateral = document.getElementById("barra-lateral");

botonMenu?.addEventListener("click", () => {
  menuLateral?.classList.toggle("visible");
});

document.querySelectorAll('a[href="#"]').forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.mostrarMensaje?.(
      enlace.textContent.trim() +
        ": módulo pendiente para el siguiente avance.",
    );
  });
});

document.querySelectorAll(".boton-icono").forEach((boton) => {
  boton.addEventListener("click", () => {
    window.mostrarMensaje?.("No tienes notificaciones nuevas.");
  });
});

document.querySelector(".tarjeta-perfil")?.addEventListener("click", () => {
  const cerrar = confirm("¿Deseas cerrar la sesión de Recepción?");
  if (!cerrar) return;
  sessionStorage.removeItem("sesion_recepcion");
  window.location.href = "login.html";
});
