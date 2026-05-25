import { createPedido, getPedidos } from "../model/PedidoModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage, getStorage } from "../utils/storage.js";

let btn_guardar_pedido = document.querySelector("#btn_guardar_pedido");
if (btn_guardar_pedido) {
  btn_guardar_pedido.addEventListener("click", function () {
    let fecha = document.querySelector("#fecha")?.value;
    let estado = document.querySelector("#estado")?.value;

    // total calculado (solo demo): usa el valor readonly del input
    let total = document.querySelector("#total")?.value;

    // Autoincrement local: max(idPedido)+1
    let pedidos = getStorage("pedidos");
    let nextId = 1;
    if (Array.isArray(pedidos) && pedidos.length > 0) {
      const maxId = pedidos.reduce((acc, p) => {
        const v = Number(p?.idPedido);
        return Number.isFinite(v) ? Math.max(acc, v) : acc;
      }, 0);
      nextId = maxId + 1;
    }

    let pedido = { idPedido: nextId, fecha, estado, total };
    createPedido(pedido);

    redirectAlert("Pedido registrado correctamente", "success", "./list.html");
  });
}

let pedidos = getPedidos("pedidos");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowPedido = "";
  pedidos.forEach((index) => {
    const estado = index.estado;
    let badge = "";

    if (estado === "pendiente") {
      badge =
        '<span class="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700">pendiente</span>';
    } else if (estado === "completado") {
      badge =
        '<span class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">completado</span>';
    } else if (estado === "cancelado") {
      badge =
        '<span class="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">cancelado</span>';
    } else {
      badge = '<span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">'+ (estado ?? "") +'</span>';
    }

    rowPedido += `
      <tr class="hover:bg-slate-50">
        <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.idPedido}</td>
        <td class="px-5 py-4 text-slate-700">${index.fecha ?? ""}</td>
        <td class="px-5 py-4">${badge}</td>
        <td class="px-5 py-4 text-slate-700">${index.total ?? ""}</td>
      </tr>
    `;
  });

  elementos.innerHTML = rowPedido;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage");
if (btn_limpiar_storage) {
  btn_limpiar_storage.addEventListener("click", () => {
    clearStorage("pedidos");
    redirectAlert("Limpiando Local Storage", "info", "./list.html");
  });
}

