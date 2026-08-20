const formulario = document.querySelector(".formulario-login");

formulario?.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const correo = formulario.elements.correo;
  const contrasena = formulario.elements.contrasena;
  const correoValido = ValidacionesRecepcion.correo(correo);
  const claveValida =
    contrasena.value.length >= 6
      ? true
      : ValidacionesRecepcion.error(
          contrasena,
          "La contraseña debe tener al menos 6 caracteres.",
        );

  if (!correoValido || !claveValida) return;
  const rol = formulario.elements.rol.value;
  const destinos = {
    recepcion: "dashboard.html",
    supervisor: "../../supervisor/index.html",
    administrador: "../../administrador/index.html",
  };
  sessionStorage.setItem("sesion_hotel", "activa");
  sessionStorage.setItem("rol_hotel", rol);
  mostrarMensaje(`Acceso correcto como ${rol}.`, "exito");
  window.setTimeout(() => (window.location.href = destinos[rol]), 500);
});

document
  .querySelector(".opciones-login a")
  ?.addEventListener("click", (evento) => {
    evento.preventDefault();
    mostrarMensaje(
      "Solicita al administrador el restablecimiento de tu contraseña.",
    );
  });
