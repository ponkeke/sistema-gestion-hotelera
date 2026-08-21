const HABITACIONES_INICIALES = [
  { numero: 102, categoria: "Matrimonial", piso: 2, capacidad: 2, tarifa: 180, estado: "Disponible", imagen: "habitacion_2" },
  { numero: 118, categoria: "Estándar", piso: 1, capacidad: 2, tarifa: 140, estado: "Limpieza", imagen: "habitacion_6" },
  { numero: 204, categoria: "Suite Deluxe", piso: 2, capacidad: 2, tarifa: 280, estado: "Disponible", imagen: "habitacion_1" },
  { numero: 305, categoria: "Familiar", piso: 3, capacidad: 4, tarifa: 260, estado: "Disponible", imagen: "habitacion_3" },
  { numero: 402, categoria: "Suite Junior", piso: 4, capacidad: 2, tarifa: 220, estado: "Disponible", imagen: "habitacion_4" },
  { numero: 509, categoria: "Presidencial", piso: 5, capacidad: 2, tarifa: 450, estado: "Disponible", imagen: "habitacion_5" },
];

const CONFIGURACION_INICIAL = {
  nombre_hotel: "Hotel Huancayo",
  cantidad_huespedes: 2,
  hora_ingreso: "14:00",
  hora_salida: "12:00",
  moneda: "S/",
};

const copiarDatos = (datos) => JSON.parse(JSON.stringify(datos));

window.DatosHotel = {
  obtenerHabitaciones() {
    const guardadas = localStorage.getItem("hotel_habitaciones");
    return guardadas ? JSON.parse(guardadas) : copiarDatos(HABITACIONES_INICIALES);
  },

  guardarHabitaciones(habitaciones) {
    localStorage.setItem("hotel_habitaciones", JSON.stringify(habitaciones));
  },

  obtenerConfiguracion() {
    const guardada = localStorage.getItem("hotel_configuracion");
    return guardada ? JSON.parse(guardada) : copiarDatos(CONFIGURACION_INICIAL);
  },

  guardarConfiguracion(configuracion) {
    localStorage.setItem("hotel_configuracion", JSON.stringify(configuracion));
  },

  guardarReserva(reserva) {
    localStorage.setItem("hotel_reserva_cliente", JSON.stringify(reserva));
  },

  obtenerReserva() {
    const guardada = localStorage.getItem("hotel_reserva_cliente");
    return guardada ? JSON.parse(guardada) : null;
  },

  reiniciar() {
    localStorage.clear();
    sessionStorage.clear();
    this.guardarHabitaciones(copiarDatos(HABITACIONES_INICIALES));
    this.guardarConfiguracion(copiarDatos(CONFIGURACION_INICIAL));
  },
};

if (!localStorage.getItem("hotel_habitaciones")) {
  DatosHotel.guardarHabitaciones(copiarDatos(HABITACIONES_INICIALES));
}

if (!localStorage.getItem("hotel_configuracion")) {
  DatosHotel.guardarConfiguracion(copiarDatos(CONFIGURACION_INICIAL));
}
