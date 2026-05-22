import { createProduct, getProducts } from "../model/ProductModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage } from "../utils/storage.js";

let btn_guardar_producto = document.querySelector("#btn_guardar_producto");
if (btn_guardar_producto) {
  btn_guardar_producto.addEventListener("click", function () {
    let id = document.querySelector("#id").value;
    let creadoEn = document.querySelector("#creadoEn").value;
    let nombre = document.querySelector("#nombre").value;
    let descripcion = document.querySelector("#descripcion").value;
    let precio = document.querySelector("#precio").value;
    let stock = document.querySelector("#stock").value;
    let imagen = document.querySelector("#imagen").value;
    let producto = { id, creadoEn, nombre, descripcion, precio, stock, imagen };
    createProduct(producto);
    redirectAlert("Producto registrado correctamente", "success", "/src/views/products/list.html")
    // let producto = {
    //   id: id,
    //   creadoEn: creadoEn,
    //   nombre: nombre,
    //   descripcion: descripcion,
    //   precio: precio,
    //   stock: stock,
    //   imagen: imagen,
    // };
  });
}

let productos = getProducts("productos");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowProduct = "";
  productos.forEach((index) => {
    rowProduct += `
        <tr class="hover:bg-slate-50">
          <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.id}</td>
          <td class="px-5 py-4 font-semibold">${index.nombre}</td>
          <td class="px-5 py-4 text-slate-700">${index.descripcion}</td>
          <td class="px-5 py-4">${index.precio}</td>
          <td class="px-5 py-4">100</td>
          <td class="px-5 py-4 font-mono text-xs text-slate-600"><img class="w-1/4" src=${index.imagen}></td>
          <td class="px-5 py-4">
            <span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">true</span>
          </td>
          <td class="px-5 py-4 text-slate-700">2025-01-01</td>
        </tr>
  `;
  });
  elementos.innerHTML = rowProduct;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage")
if(btn_limpiar_storage){
  btn_limpiar_storage.addEventListener("click", ()=> {
    clearStorage("productos")
    redirectAlert("Limpiando Local Storage", "info", "/src/views/products/list.html")
  })
}