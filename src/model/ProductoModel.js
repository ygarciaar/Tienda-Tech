import { createStorage } from "../utils/storage.js";
import { getStorage } from "../utils/storage.js";

let producto_model = [];

export function getProductos(llave) {
  producto_model = getStorage(llave);
  return producto_model;
}

export function createProducto(producto) {
  producto_model.push(producto);
  createStorage("productos", producto_model);
}

