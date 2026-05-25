import { createStorage, getStorage } from "../utils/storage.js";

let pedido_model = [];

export function getPedidos(llave) {
  pedido_model = getStorage(llave);
  return pedido_model;
}

export function createPedido(pedido) {
  pedido_model.push(pedido);
  createStorage("pedidos", pedido_model);
}

