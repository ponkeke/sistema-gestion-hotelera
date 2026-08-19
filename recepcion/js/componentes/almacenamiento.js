window.AlmacenRecepcion = {
  obtener(clave, valorInicial = null) {
    try {
      const valor = localStorage.getItem(clave);
      return valor === null ? valorInicial : JSON.parse(valor);
    } catch {
      return valorInicial;
    }
  },

  guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  },

  eliminar(clave) {
    localStorage.removeItem(clave);
  },
};
