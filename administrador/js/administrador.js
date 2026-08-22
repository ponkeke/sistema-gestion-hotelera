const mostrarMensajeAdministrador = (texto) => {
  document.querySelector(".mensaje")?.remove();
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje";
  mensaje.textContent = texto;
  document.body.appendChild(mensaje);
  setTimeout(() => mensaje.remove(), 2600);
};

const filtrarTabla = (tabla, consulta) => {
  const texto = consulta.trim().toLowerCase();
  tabla?.querySelectorAll("tbody tr").forEach((fila) => {
    fila.hidden = !fila.textContent.toLowerCase().includes(texto);
  });
};

document.querySelectorAll("[data-buscador]").forEach((buscador) => {
  const tabla = document.querySelector(buscador.dataset.buscador);
  buscador.addEventListener("input", () => filtrarTabla(tabla, buscador.value));
});

document.querySelectorAll("[data-abrir-modal]").forEach((boton) => {
  boton.addEventListener("click", () => {
    document.querySelector(boton.dataset.abrirModal)?.classList.add("modal--visible");
  });
});

document.querySelectorAll("[data-cerrar-modal]").forEach((boton) => {
  boton.addEventListener("click", () => boton.closest(".modal")?.classList.remove("modal--visible"));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evento) => {
    if (evento.target === modal) modal.classList.remove("modal--visible");
  });
});

document.querySelectorAll("[data-formulario-registro]").forEach((formulario) => {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }
    formulario.closest(".modal")?.classList.remove("modal--visible");
    formulario.reset();
    mostrarMensajeAdministrador("Registro guardado correctamente.");
  });
});

document.querySelectorAll(".tabla__accion--editar").forEach((boton) => {
  boton.addEventListener("click", () => mostrarMensajeAdministrador(`Edición habilitada para ${boton.dataset.nombre}.`));
});

document.querySelectorAll(".tabla__accion--eliminar").forEach((boton) => {
  boton.addEventListener("click", () => {
    if (!confirm(`¿Deseas eliminar a ${boton.dataset.nombre}?`)) return;
    boton.closest("tr")?.remove();
    mostrarMensajeAdministrador("Registro eliminado.");
  });
});

document.querySelectorAll(".pestanas__boton").forEach((boton) => {
  boton.addEventListener("click", () => {
    const grupo = boton.closest(".pestanas");
    grupo?.querySelectorAll(".pestanas__boton").forEach((item) => item.classList.remove("pestanas__boton--activo"));
    boton.classList.add("pestanas__boton--activo");
    const tipo = boton.dataset.tipo;
    document.querySelectorAll("[data-tipo-registro]").forEach((fila) => {
      fila.hidden = tipo && tipo !== "todos" && fila.dataset.tipoRegistro !== tipo;
    });
  });
});

document.querySelector("[data-cerrar-sesion]")?.addEventListener("click", (evento) => {
  evento.preventDefault();
  alert("Perfil activo: Ana Torres\nRol: Administrador");
  if (!confirm("¿Deseas cerrar la sesión del Administrador?")) return;
  sessionStorage.clear();
  window.location.href = "../../acceso/index.html";
});

document.querySelector("[data-perfil]")?.addEventListener("click", () => {
  alert("Perfil activo: Ana Torres\nRol: Administrador\nPermisos: configuración total");
});

const formularioConfiguracion = document.querySelector("[data-configuracion]");
if (formularioConfiguracion && window.DatosHotel) {
  const cargarConfiguracion = () => {
    const configuracion = DatosHotel.obtenerConfiguracion();
    Object.entries(configuracion).forEach(([nombre, valor]) => {
      if (formularioConfiguracion.elements[nombre]) formularioConfiguracion.elements[nombre].value = valor;
    });
  };
  formularioConfiguracion.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const configuracion = Object.fromEntries(new FormData(formularioConfiguracion));
    configuracion.cantidad_huespedes = Number(configuracion.cantidad_huespedes);
    DatosHotel.guardarConfiguracion(configuracion);
    mostrarMensajeAdministrador("Configuración guardada correctamente.");
  });
  document.querySelector("[data-reiniciar-datos]")?.addEventListener("click", () => {
    if (!confirm("¿Restaurar habitaciones, huéspedes y reservas de demostración?")) return;
    DatosHotel.reiniciar();
    cargarConfiguracion();
    mostrarMensajeAdministrador("Datos de demostración reiniciados.");
  });
  cargarConfiguracion();
}
