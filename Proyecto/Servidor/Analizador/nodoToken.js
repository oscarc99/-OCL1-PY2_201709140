"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoToken {
    constructor(token, descripcion, linea) {
        this.token = token;
        this.descripcion = descripcion;
        this.linea = linea;
        
    }
    get Token() {
        return this.token;
    }
    get Descripcion() {
        return this.descripcion;s
    }
    get Linea() {
        return this.linea;
    }

}
exports.nodoToken = nodoToken;
