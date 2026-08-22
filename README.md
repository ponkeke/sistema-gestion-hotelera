# Sistema de gestión hotelera Raymi

Prototipo funcional desarrollado con HTML, CSS y JavaScript. Incluye portal del cliente y módulos de Recepción, Supervisión, Administración y Limpieza.

## Cómo ejecutarlo

1. Abre la carpeta `sistema hoteleo` en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.
4. Para ingresar al sistema interno abre `acceso/index.html`.

Para la demostración se puede usar cualquier correo válido y una contraseña de seis o más caracteres. Luego se selecciona el perfil correspondiente.

## Organización

```text
sistema hoteleo/
├── acceso/                 Entrada del personal
├── cliente/                Portal y reserva del huésped
│   ├── pantallas/
│   ├── css/
│   ├── js/
│   └── img/
├── recepcion/
│   ├── pantallas/
│   ├── css/
│   ├── js/
│   └── img/
├── supervisor/
│   ├── pantallas/
│   ├── css/
│   └── js/
├── administrador/
│   ├── pantallas/
│   ├── css/
│   └── js/
├── limpieza/
│   ├── pantallas/
│   ├── css/
│   └── js/
└── compartido/             Datos y control de sesión comunes
```

## Archivos importantes

- `compartido/datos_demo.js`: habitaciones, capacidades, horarios y reinicio de la demostración.
- `compartido/sesion.js`: comprueba el acceso según el perfil seleccionado.
- `cliente/js/cliente.js`: búsqueda, filtros y proceso de reserva.
- `recepcion/js/pantallas/`: comportamiento de cada pantalla de Recepción.

Las clases CSS y variables JavaScript están nombradas en español para facilitar futuros cambios.
