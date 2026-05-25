import { createUsuario, getUsuarios } from "../model/UsuarioModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage, getStorage } from "../utils/storage.js";

let btn_guardar_usuario = document.querySelector("#btn_guardar_usuario");
if (btn_guardar_usuario) {
  btn_guardar_usuario.addEventListener("click", function () {
    let email = document.querySelector("#email")?.value;
    let contraseña = document.querySelector("#contraseña")?.value;
    let dirección = document.querySelector("#dirección")?.value;
    let telefono = document.querySelector("#telefono")?.value;

    // Autoincrement local: max(idUsuario)+1
    let usuarios = getStorage("usuarios");
    let nextId = 1;
    if (Array.isArray(usuarios) && usuarios.length > 0) {
      const maxId = usuarios.reduce((acc, u) => {
        const v = Number(u?.idUsuario);
        return Number.isFinite(v) ? Math.max(acc, v) : acc;
      }, 0);
      nextId = maxId + 1;
    }

    let usuario = { idUsuario: nextId, email, contraseña, dirección, telefono };

    createUsuario(usuario);
    redirectAlert("Usuario registrado correctamente", "success", "./list.html");
  });
}

let usuarios = getUsuarios("usuarios");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowUser = "";
  usuarios.forEach((index) => {
    rowUser += `
      <tr class="hover:bg-slate-50">
        <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.idUsuario}</td>
        <td class="px-5 py-4 font-semibold">${index.email ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.dirección ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.telefono ?? ""}</td>
        <td class="px-5 py-4">
          <a href="./form.html" class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            Ver/Editar
          </a>
        </td>
      </tr>
    `;
  });
  elementos.innerHTML = rowUser;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage");
if (btn_limpiar_storage) {
  btn_limpiar_storage.addEventListener("click", () => {
    clearStorage("usuarios");
    redirectAlert("Limpiando Local Storage", "info", "./list.html");
  });
}

