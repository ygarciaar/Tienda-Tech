import { createStorage, getStorage } from "../utils/storage.js";

let proveedores_model = [];

export function getProveedores(llave) {
  proveedores_model = getStorage(llave);
  return proveedores_model;
}

export function createProveedor(proveedor) {
  proveedores_model.push(proveedor);
  createStorage("proveedores", proveedores_model);
}

