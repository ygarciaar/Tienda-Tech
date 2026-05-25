import { createDetalle, getDetalles } from "../model/DetallePedidoModel.js";
import { redirectAlert } from "../utils/alerts.js";
import { clearStorage, getStorage } from "../utils/storage.js";

let btn_guardar_detalle = document.querySelector("#btn_guardar_detalle");
if (btn_guardar_detalle) {
  btn_guardar_detalle.addEventListener("click", function () {
    let pedidoId = document.querySelector("#pedidoId")?.value;
    let productoId = document.querySelector("#productoId")?.value;
    let cantidad = document.querySelector("#cantidad")?.value;
    let precioUnitario = document.querySelector("#precioUnitario")?.value;

    // Autocalculado desde DOM (readonly)
    let subtotal = document.querySelector("#subtotal")?.value;

    // Autoincrement local: max(idDetallePedido)+1
    let detalles = getStorage("detallePedidos");
    let nextId = 1;
    if (Array.isArray(detalles) && detalles.length > 0) {
      const maxId = detalles.reduce((acc, d) => {
        const v = Number(d?.idDetallePedido);
        return Number.isFinite(v) ? Math.max(acc, v) : acc;
      }, 0);
      nextId = maxId + 1;
    }

    let detalle = {
      idDetallePedido: nextId,
      pedidoId,
      productoId,
      cantidad,
      precioUnitario,
      subtotal,
    };

    createDetalle(detalle);
    redirectAlert("Detalle de pedido registrado correctamente", "success", "./list.html");
  });
}

// Listener de recálculo subtotal: cantidad * precioUnitario
const cantidadInput = document.querySelector("#cantidad");
const precioUnitarioInput = document.querySelector("#precioUnitario");
const subtotalInput = document.querySelector("#subtotal");

function recalcSubtotal() {
  if (!subtotalInput) return;
  const cantidad = Number(cantidadInput?.value ?? 0);
  const precioUnitario = Number(precioUnitarioInput?.value ?? 0);
  const subtotal = cantidad * precioUnitario;
  subtotalInput.value = Number.isFinite(subtotal) ? subtotal : 0;
}

if (cantidadInput && precioUnitarioInput && subtotalInput) {
  cantidadInput.addEventListener("input", recalcSubtotal);
  precioUnitarioInput.addEventListener("input", recalcSubtotal);
  recalcSubtotal();
}

let detalles = getDetalles("detallePedidos");
let elementos = document.querySelector("#elementos");
if (elementos) {
  let rowDetalles = "";
  detalles.forEach((index) => {
    rowDetalles += `
      <tr class="hover:bg-slate-50">
        <td class="px-5 py-4 font-mono text-xs text-slate-600">${index.idDetallePedido}</td>
        <td class="px-5 py-4 text-slate-700">${index.pedidoId ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.productoId ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.cantidad ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.precioUnitario ?? ""}</td>
        <td class="px-5 py-4 text-slate-700">${index.subtotal ?? ""}</td>
      </tr>
    `;
  });
  elementos.innerHTML = rowDetalles;
}

let btn_limpiar_storage = document.querySelector("#btn_limpiar_storage");
if (btn_limpiar_storage) {
  btn_limpiar_storage.addEventListener("click", () => {
    clearStorage("detallePedidos");
    redirectAlert("Limpiando Local Storage", "info", "./list.html");
  });
}

