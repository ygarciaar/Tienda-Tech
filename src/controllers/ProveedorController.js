import { createProveedor, getProveedores } from "../model/ProveedorModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage, getStorage } from "../utils/storage.js";

let btn_guardar_proveedor = document.querySelector("#btn_guardar_proveedor");
if (btn_guardar_proveedor) {
  btn_guardar_proveedor.addEventListener("click", function () {
    let nombre = document.querySelector("#nombre")?.value;
    let email = document.querySelector("#email")?.value;
    let telefono = document.querySelector("#telefono")?.value;

    // Autoincrement local: max(idProveedor)+1
    let proveedores = getStorage("proveedores");
    let nextId = 1;
    if (Array.isArray(proveedores) && proveedores.length > 0) {
      const maxId = proveedores.reduce((acc, p) => {
        const v = Number(p?.idProveedor);
        return Number.isFinite(v) ? Math.max(acc, v) : acc;
      }, 0);
      nextId = maxId + 1;
    }

    let proveedor = { idProveedor: nextId, nombre, email, telefono };

    createProveedor(proveedor);
    redirectAlert("Proveedor registrado correctamente", "success", "./list.html");
  });
}

let proveedores = getProveedores("proveedores");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowProveedores = "";
  proveedores.forEach((index) => {
    rowProveedores += `
      <tr class="hover:bg-slate-50">
        <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.idProveedor}</td>
        <td class="px-5 py-4 font-semibold">${index.nombre ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.email ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.telefono ?? ""}</td>
        <td class="px-5 py-4">
          <a href="./form.html" class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            Ver/Editar
          </a>
        </td>
      </tr>
    `;
  });
  elementos.innerHTML = rowProveedores;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage");
if (btn_limpiar_storage) {
  btn_limpiar_storage.addEventListener("click", () => {
    clearStorage("proveedores");
    redirectAlert("Limpiando Local Storage", "info", "./list.html");
  });
}

