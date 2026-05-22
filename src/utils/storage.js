let data = null

export function clearStorage(){

}
export function getStorage(llave){
    return JSON.parse(localStorage.getItem(llave)) || []
}
export function createStorage(llave, valor){
    localStorage.setItem(llave, JSON.stringify(valor))
}