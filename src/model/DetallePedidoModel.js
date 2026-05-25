import { createStorage, getStorage } from "../utils/storage.js";

let detalle_model = [];

export function getDetalles(llave) {
  detalle_model = getStorage(llave);
  return detalle_model;
}

export function createDetalle(detalle) {
  detalle_model.push(detalle);
  createStorage("detallePedidos", detalle_model);
}

