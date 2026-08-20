document.querySelector(".tarjeta-turno a")?.addEventListener("click", () => {
  AlmacenRecepcion.guardar("turno_consultado", new Date().toISOString());
});
