import { createStorage, getStorage } from "../utils/storage.js";

let users_model = [];

export function getUsuarios(llave) {
  users_model = getStorage(llave);
  return users_model;
}

export function createUsuario(usuario) {
  users_model.push(usuario);
  createStorage("usuarios", users_model);
}

