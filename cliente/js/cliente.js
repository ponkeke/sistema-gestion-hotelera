const mostrarMensaje = (texto) => { const aviso=document.createElement("div"); aviso.className="mensaje_publico"; aviso.textContent=texto; document.body.append(aviso); setTimeout(()=>aviso.remove(),2800); };
const formatoDinero = (valor) => `S/ ${Number(valor).toFixed(2)}`;
const posicionesImagen = {102:"100% 0",118:"100% 0",204:"0 0",305:"0 100%",402:"100% 100%",509:"0 0"};
const hoy = new Date().toISOString().slice(0,10);

const formularioBusqueda = document.querySelector("[data-formulario-busqueda]");
if (formularioBusqueda) {
  const ingreso=formularioBusqueda.elements.ingreso, salida=formularioBusqueda.elements.salida;
  ingreso.min=hoy; salida.min=hoy; ingreso.value=hoy;
  const manana=new Date(); manana.setDate(manana.getDate()+1); salida.value=manana.toISOString().slice(0,10);
  formularioBusqueda.addEventListener("submit",(evento)=>{ evento.preventDefault(); if(salida.value<=ingreso.value){mostrarMensaje("La salida debe ser posterior al ingreso");return;} localStorage.setItem("hotel_busqueda",JSON.stringify({ingreso:ingreso.value,salida:salida.value,huespedes:Number(formularioBusqueda.elements.huespedes.value)})); location.href="habitaciones.html"; });
}

const listaHabitaciones = document.querySelector("[data-lista-habitaciones]");
if (listaHabitaciones) {
  const disponibles=DatosHotel.obtenerHabitaciones().filter(({estado})=>estado==="Disponible");
  const dibujar=(filtro="Todas")=>{ listaHabitaciones.innerHTML=""; disponibles.filter(({categoria})=>filtro==="Todas"||(filtro==="Suite"?categoria.includes("Suite"):categoria===filtro)).forEach((habitacion)=>{ const tarjeta=document.createElement("article"); tarjeta.className="tarjeta_habitacion"; tarjeta.innerHTML=`<div class="tarjeta_habitacion__imagen" style="--posicion:${posicionesImagen[habitacion.numero]||"0 0"}"><span class="tarjeta_habitacion__numero">${habitacion.numero}</span></div><h2>${habitacion.categoria}</h2><p>Piso ${habitacion.piso} · Hasta ${habitacion.capacidad} huéspedes</p><div class="tarjeta_habitacion__pie"><span class="tarjeta_habitacion__precio">${formatoDinero(habitacion.tarifa)} / noche</span><button class="boton" data-reservar="${habitacion.numero}">Reservar</button></div>`; listaHabitaciones.append(tarjeta); }); if(!listaHabitaciones.children.length) listaHabitaciones.innerHTML="<p>No hay habitaciones en esta categoría.</p>"; };
  dibujar(); document.querySelector("[data-filtros]")?.addEventListener("click",({target})=>{ const boton=target.closest("[data-filtro]"); if(!boton)return; document.querySelectorAll("[data-filtro]").forEach(x=>x.classList.remove("filtro_habitacion--activo")); boton.classList.add("filtro_habitacion--activo"); dibujar(boton.dataset.filtro); });
  listaHabitaciones.addEventListener("click",({target})=>{ const boton=target.closest("[data-reservar]"); if(!boton)return; const habitacion=disponibles.find(x=>x.numero===Number(boton.dataset.reservar)); localStorage.setItem("hotel_habitacion_elegida",JSON.stringify(habitacion)); location.href="reserva.html"; });
}

const resumen = document.querySelector("[data-resumen-reserva]");
const habitacionElegida=JSON.parse(localStorage.getItem("hotel_habitacion_elegida")||"null")||DatosHotel.obtenerHabitaciones().find(x=>x.estado==="Disponible");
const busqueda=JSON.parse(localStorage.getItem("hotel_busqueda")||"null")||{ingreso:hoy,salida:"Mañana",huespedes:2};
if(resumen){ resumen.innerHTML=`<span>Resumen de estadía</span><h2>Habitación ${habitacionElegida.numero}</h2><div class="resumen_reserva__imagen"></div><div class="resumen_reserva__fila"><span>${habitacionElegida.categoria}</span><strong>${busqueda.huespedes} huésped(es)</strong></div><div class="resumen_reserva__fila"><span>Ingreso</span><strong>${busqueda.ingreso}</strong></div><div class="resumen_reserva__fila"><span>Salida</span><strong>${busqueda.salida}</strong></div><div class="resumen_reserva__total"><span>Total</span><strong>${formatoDinero(habitacionElegida.tarifa)}</strong></div>`; }

const formularioReserva=document.querySelector("[data-formulario-reserva]"); let metodo="Tarjeta";
document.querySelectorAll("[data-metodo]").forEach(boton=>boton.addEventListener("click",()=>{document.querySelectorAll("[data-metodo]").forEach(x=>x.classList.remove("metodo_garantia--activo"));boton.classList.add("metodo_garantia--activo");metodo=boton.dataset.metodo;}));
if(formularioReserva) formularioReserva.addEventListener("submit",(evento)=>{evento.preventDefault(); if(!formularioReserva.checkValidity()){formularioReserva.reportValidity();mostrarMensaje("Revisa los campos marcados");return;} const datos=Object.fromEntries(new FormData(formularioReserva)); const codigo=`RY-${Date.now().toString().slice(-6)}`; DatosHotel.guardarReserva({...datos,metodo,codigo,habitacion:habitacionElegida,busqueda,total:habitacionElegida.tarifa}); location.href="confirmacion.html";});

const confirmacion=document.querySelector("[data-confirmacion]");
if(confirmacion){const reserva=DatosHotel.obtenerReserva(); if(!reserva){location.href="habitaciones.html";}else{confirmacion.querySelector(".confirmacion__correo").textContent=`Enviamos los detalles a ${reserva.correo}.`;confirmacion.insertAdjacentHTML("beforeend",`<div class="confirmacion__datos"><div class="confirmacion__dato"><span>Código</span><strong>${reserva.codigo}</strong></div><div class="confirmacion__dato"><span>Habitación</span><strong>${reserva.habitacion.numero} · ${reserva.habitacion.categoria}</strong></div><div class="confirmacion__dato"><span>Huésped</span><strong>${reserva.nombres} ${reserva.apellidos}</strong></div><div class="confirmacion__dato"><span>Total</span><strong>${formatoDinero(reserva.total)}</strong></div></div><a class="boton" href="index.html">Volver al inicio</a>`);}}
