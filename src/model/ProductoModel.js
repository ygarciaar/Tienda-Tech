import { createStorage } from "../utils/storage.js";
import { getStorage } from "../utils/storage.js";

let product_model = [];

export function getProductos(llave) {
  product_model = getStorage(llave);
  return product_model;
}

export function createProducto(producto) {
  product_model.push(producto);
  createStorage("productos", product_model);
}

