(function protegerPantalla() {
  const rolRequerido = document.body.dataset.rolRequerido;
  if (!rolRequerido) return;

  const sesionActiva = sessionStorage.getItem("sesion_hotel") === "activa";
  const rolActivo = sessionStorage.getItem("rol_hotel");
  const permisos = {
    administrador: ["administrador", "supervisor", "recepcion"],
    supervisor: ["supervisor", "recepcion"],
    recepcion: ["recepcion"],
    limpieza: ["limpieza"],
  };

  if (!sesionActiva || !permisos[rolActivo]?.includes(rolRequerido)) {
    window.location.replace("../../acceso/index.html");
  }
})();
