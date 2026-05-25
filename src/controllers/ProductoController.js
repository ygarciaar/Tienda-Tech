import { createProducto, getProductos } from "../model/ProductoModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage, getStorage } from "../utils/storage.js";

let btn_guardar_producto = document.querySelector("#btn_guardar_producto");
if (btn_guardar_producto) {
  btn_guardar_producto.addEventListener("click", function () {
    let nombreProducto = document.querySelector("#nombreProducto")?.value;
    let descripcion = document.querySelector("#descripcion")?.value;
    let precio = document.querySelector("#precio")?.value;
    let stock = document.querySelector("#stock")?.value;

    // Autoincrement local: max(idProducto)+1
    let productos = getStorage("productos");
    let nextId = 1;
    if (Array.isArray(productos) && productos.length > 0) {
      const maxId = productos.reduce((acc, p) => {
        const v = Number(p?.idProducto);
        return Number.isFinite(v) ? Math.max(acc, v) : acc;
      }, 0);
      nextId = maxId + 1;
    }

    let producto = { idProducto: nextId, nombreProducto, descripcion, precio, stock };
    createProducto(producto);

    redirectAlert("Producto registrado correctamente", "success", "./list.html");
  });
}

let productos = getProductos("productos");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowProduct = "";
  productos.forEach((index) => {
    rowProduct += `
      <tr class="hover:bg-slate-50">
        <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.idProducto}</td>
        <td class="px-5 py-4 font-semibold">${index.nombreProducto ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.descripcion ?? ""}</td>
        <td class="px-5 py-4">${index.precio ?? ""}</td>
        <td class="px-5 py-4">${index.stock ?? ""}</td>
      </tr>
    `;
  });
  elementos.innerHTML = rowProduct;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage");
if (btn_limpiar_storage) {
  btn_limpiar_storage.addEventListener("click", () => {
    clearStorage("productos");
    redirectAlert("Limpiando Local Storage", "info", "./list.html");
  });
}

