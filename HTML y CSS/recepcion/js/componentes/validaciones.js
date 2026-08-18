window.ValidacionesRecepcion = {
  limpiar(campo) {
    const contenedor = campo.closest("label") || campo.parentElement;
    contenedor?.classList.remove("campo--error");
    contenedor?.querySelector(".campo__mensaje_error")?.remove();
  },

  error(campo, mensaje) {
    this.limpiar(campo);
    const contenedor = campo.closest("label") || campo.parentElement;
    contenedor?.classList.add("campo--error");
    const texto = document.createElement("small");
    texto.className = "campo__mensaje_error";
    texto.textContent = mensaje;
    contenedor?.append(texto);
    campo.focus();
    return false;
  },

  requerido(campo, mensaje = "Este dato es obligatorio.") {
    this.limpiar(campo);
    return campo.value.trim() ? true : this.error(campo, mensaje);
  },

  correo(campo) {
    if (!this.requerido(campo, "Ingresa el correo electrónico.")) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim())
      ? true
      : this.error(campo, "Ingresa un correo válido.");
  },

  dni(campo) {
    return /^\d{8}$/.test(campo.value.trim())
      ? true
      : this.error(campo, "El DNI debe contener 8 números.");
  },

  numeroPositivo(campo, mensaje = "Ingresa un número mayor que cero.") {
    return Number(campo.value) > 0 ? true : this.error(campo, mensaje);
  },
};
