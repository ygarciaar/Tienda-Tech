# 🛒 Tienda-Tech

> Aplicación web de tienda de productos generales, construida con **JavaScript** bajo el patrón de arquitectura **MVC (Modelo - Vista - Controlador)**, adaptado a un entorno sin conexión a base de datos. Toda la información se gestiona en memoria durante la sesión..

---

## 📑 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Modelos de Datos](#modelos-de-datos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Autor](#autor)

---

## 📋 Descripción General

Este proyecto simula el funcionamiento de una tienda de productos generales. Permite gestionar **productos**, **clientes** y **ventas/pedidos** a través de una interfaz web dinámica.

Al no depender de una base de datos externa, los datos se inicializan desde los modelos JavaScript y persisten en memoria mientras la sesión del navegador esté activa. La arquitectura MVC separa claramente las responsabilidades del sistema, facilitando el mantenimiento y la escalabilidad del código.

---

## 🧰 Tecnologías Utilizadas

| Tecnología | Versión | Rol en el proyecto |
|---|---|---|
| **JavaScript** | ES6+ | Lógica principal: modelos, controladores y manipulación del DOM |
| **HTML5** | — | Estructura semántica de todas las vistas |
| **CSS3** | — | Estilos base, variables CSS y personalizaciones visuales propias del proyecto |
| **Tailwind CSS** | v3.x | Framework utilitario para diseño responsivo, espaciado y tipografía |

### Justificación de la combinación Tailwind + CSS puro

- **Tailwind CSS** permite construir interfaces responsivas de forma rápida usando clases utilitarias directamente en el HTML, sin salir del archivo de la vista.
- **CSS3 puro** complementa con estilos únicos y específicos del proyecto que requieren personalización más allá de las utilidades de Tailwind, como animaciones propias, variables globales de color (`--color-primary`) y estilos de componentes reutilizables.

---

## 🏛️ Arquitectura del Proyecto

El proyecto sigue el patrón **MVC adaptado al frontend**:

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO                              │
└────────────────────────┬────────────────────────────────────┘
                         │ Interacción (click, submit, etc.)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    VISTA (views/)                           │
│         Archivos HTML + CSS de cada módulo                  │
│         Renderiza datos y captura eventos del usuario       │
└────────────────────────┬────────────────────────────────────┘
                         │ Llama funciones del controlador
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                CONTROLADOR (controllers/)                   │
│         Contiene la lógica de negocio de cada módulo        │
│         Operaciones: crear, listar, editar, eliminar        │
└────────────────────────┬────────────────────────────────────┘
                         │ Accede y manipula los datos
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MODELO (models/)                          │
│         Define la estructura de datos (esquema)             │
│         Funciones de acceso y mutación de datos en memoria  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
tienda-vanilla-mvc/
│
├── index.html                    # Punto de entrada de la aplicación
│
├── models/                       # Capa de datos (esquemas + datos en memoria)
│   ├── ProductoModel.js          # Esquema y datos del modelo Producto
│   ├── ClienteModel.js           # Esquema y datos del modelo Cliente
│   └── VentaModel.js             # Esquema y datos del modelo Venta
│
├── controllers/                  # Capa de lógica de negocio
│   ├── ProductoController.js     # Crear, listar, editar y eliminar productos
│   ├── ClienteController.js      # Crear, listar, editar y eliminar clientes
│   └── VentaController.js        # Registrar ventas, listar y calcular totales
│
├── views/                        # Capa de presentación
│   ├── productos/
│   │   ├── lista.html            # Vista: listado de productos
│   │   ├── formulario.html       # Vista: crear / editar producto
│   │   └── productos.css         # Estilos específicos del módulo
│   ├── clientes/
│   │   ├── lista.html            # Vista: listado de clientes
│   │   ├── formulario.html       # Vista: crear / editar cliente
│   │   └── clientes.css          # Estilos específicos del módulo
│   └── ventas/
│       ├── lista.html            # Vista: historial de ventas
│       ├── formulario.html       # Vista: registrar nueva venta
│       └── ventas.css            # Estilos específicos del módulo
│
├── utils/                        # Utilidades reutilizables en toda la app
│   ├── validaciones.js           # Validación de campos y formularios (Opcional)
│   └── storage.js                # Manejo de sessionStorage / localStorage
│
└── assets/                       # Recursos estáticos
    ├── css/
    │   └── main.css              # Estilos globales y variables CSS del proyecto
    ├── js/
    │   └── app.js                # Inicialización y enrutamiento principal
    └── img/                      # Imágenes y recursos gráficos
```

---

## 🗃️ Modelos de Datos

A continuación se describe la estructura de datos inicial de cada modelo. Los datos se almacenan como arreglos de objetos JavaScript en memoria, dentro de cada archivo de modelo.

---

### 📦 Producto

```js
// models/ProductoModel.js

const ProductoModel = {

  // Esquema: describe los campos y su tipo de dato esperado
  schema: {
    id:          Number,   // Identificador único (autogenerado)
    nombre:      String,   // Nombre del producto
    descripcion: String,   // Descripción breve del producto
    precio:      Number,   // Precio unitario de venta
    stock:       Number,   // Cantidad disponible en inventario
    imagen:      String,   // Ruta o URL de la imagen del producto
    activo:      Boolean,  // Estado del producto (true = disponible)
    creadoEn:    Date,     // Fecha de registro del producto
  },

  // Datos iniciales precargados en memoria
  datos: [
    {
      id: 1,
      nombre: "Arroz blanco 1kg",
      descripcion: "Arroz de grano largo, primera calidad",
      precio: 3500,
      stock: 100,
      imagen: "assets/img/arroz.png",
      activo: true,
      creadoEn: new Date("2025-01-01"),
    },
    {
      id: 2,
      nombre: "Aceite vegetal 1L",
      descripcion: "Aceite de cocina multiusos",
      precio: 8200,
      stock: 60,
      imagen: "assets/img/aceite.png",
      activo: true,
      creadoEn: new Date("2025-01-01"),
    },
  ],

  // Funciones de acceso
  getAll:  () => {},              // Retorna todos los productos
  getById: (id) => {},            // Retorna un producto por su ID
  create:  (data) => {},          // Agrega un nuevo producto al arreglo
  update:  (id, data) => {},      // Actualiza un producto existente
  remove:  (id) => {},            // Elimina un producto por su ID
};
```

---

### 👤 Cliente

```js
// models/ClienteModel.js

const ClienteModel = {

  // Esquema: describe los campos y su tipo de dato esperado
  schema: {
    id:        Number,   // Identificador único (autogenerado)
    nombre:    String,   // Nombre completo del cliente
    email:     String,   // Correo electrónico (valor único)
    telefono:  String,   // Número de contacto
    direccion: String,   // Dirección de entrega o residencia
    activo:    Boolean,  // Estado del cliente (true = activo)
    creadoEn:  Date,     // Fecha de registro del cliente
  },

  // Datos iniciales precargados en memoria
  datos: [
    {
      id: 1,
      nombre: "María López",
      email: "maria.lopez@email.com",
      telefono: "3001234567",
      direccion: "Calle 10 # 20-30, Medellín",
      activo: true,
      creadoEn: new Date("2025-01-15"),
    },
    {
      id: 2,
      nombre: "Carlos Restrepo",
      email: "carlos.restrepo@email.com",
      telefono: "3119876543",
      direccion: "Carrera 45 # 12-10, Medellín",
      activo: true,
      creadoEn: new Date("2025-02-03"),
    },
  ],

  // Funciones de acceso
  getAll:  () => {},
  getById: (id) => {},
  create:  (data) => {},
  update:  (id, data) => {},
  remove:  (id) => {},
};
```

---

### 🧾 Venta / Pedido

```js
// models/VentaModel.js

const VentaModel = {

  // Esquema principal de una venta
  schema: {
    id:         Number,   // Identificador único de la venta
    clienteId:  Number,   // Referencia al ID del cliente
    productos:  Array,    // Arreglo de ítems incluidos en la venta
    total:      Number,   // Valor total calculado de la venta
    estado:     String,   // Estado: 'pendiente' | 'completada' | 'cancelada'
    fecha:      Date,     // Fecha y hora en que se registró la venta
  },

  // Esquema de cada ítem dentro del arreglo productos[]
  itemSchema: {
    productoId: Number,   // Referencia al ID del producto
    cantidad:   Number,   // Cantidad vendida
    precioUnit: Number,   // Precio unitario al momento de la venta
    subtotal:   Number,   // Calculado: cantidad * precioUnit
  },

  // Datos iniciales precargados en memoria
  datos: [
    {
      id: 1,
      clienteId: 1,
      productos: [
        { productoId: 1, cantidad: 2, precioUnit: 3500, subtotal: 7000 },
        { productoId: 2, cantidad: 1, precioUnit: 8200, subtotal: 8200 },
      ],
      total: 15200,
      estado: "completada",
      fecha: new Date("2025-02-10"),
    },
  ],

  // Funciones de acceso
  getAll:       () => {},
  getById:      (id) => {},
  getByCliente: (clienteId) => {}, // Retorna ventas de un cliente específico
  create:       (data) => {},
  updateEstado: (id, estado) => {}, // Actualiza solo el estado de la venta
  remove:       (id) => {},
};
```

---

## ⚙️ Instalación y Ejecución

### Prerrequisitos

- Navegador web moderno (Chrome, Firefox o Edge — versión reciente)
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensión **Live Server** para VS Code

> No se requiere Node.js, npm ni ninguna dependencia de backend. El proyecto corre completamente en el navegador.

---

### Paso 1 — Obtener el proyecto

**Opción A — Clonar con Git:**
```bash
git clone https://github.com/tu-usuario/tienda-vanilla-mvc.git
cd tienda-vanilla-mvc
```

**Opción B — Descargar ZIP:**
1. En GitHub, hacer clic en **Code → Download ZIP**
2. Descomprimir el archivo en la carpeta de tu preferencia

---

### Paso 2 — Abrir el proyecto en VS Code

```bash
code tienda-vanilla-mvc
```

O desde VS Code: `File → Open Folder` y seleccionar la carpeta del proyecto.

---

### Paso 3 — Instalar la extensión Live Server

> Si ya tienes Live Server instalado, omite este paso.

1. Abrir el panel de extensiones: `Ctrl + Shift + X`
2. Buscar **Live Server** (autor: Ritwick Dey)
3. Hacer clic en **Install**

---

### Paso 4 — Ejecutar el proyecto

1. En el explorador de archivos de VS Code, hacer clic derecho sobre `index.html`
2. Seleccionar **"Open with Live Server"**
3. El proyecto se abrirá automáticamente en:

```
http://127.0.0.1:5500
```

---

### Paso 5 — Verificar el funcionamiento

Una vez abierto en el navegador deberías ver:

- ✅ La página principal de la tienda con el menú de navegación
- ✅ Acceso a los módulos: **Productos**, **Clientes** y **Ventas**
- ✅ Los datos de ejemplo precargados en cada sección

> ⚠️ **Nota:** Se recomienda siempre usar Live Server en lugar de abrir `index.html` directamente desde el explorador de archivos (`file:///`). La apertura directa puede generar restricciones de CORS que bloqueen la carga de módulos ES6 (`import/export`).

---

## 👤 Autores

| Campo | Detalle |
|---|---|
| **Nombre** | Gendris Urbina Urbina |
| **Rol** | Estudiante |

| **Nombre** | Ariel De La Rosa Reales |
| **Rol** | Estudiante |

| **Nombre** | Yeison Arbey García Mesa |
| **Rol** | Estudiante |

| **Proyecto** | Tienda-Tech |
| **Año** | 2026 |


---

> 📝 *Proyecto desarrollado con fines académicos y de práctica en arquitectura MVC aplicada al frontend con JavaScript puro.*