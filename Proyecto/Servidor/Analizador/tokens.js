"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class tokens extends Array {
    constructor() {
        super();
    }
    static addToken(tok) {
        
        console.log(tok);
        this.prototype.push(tok);
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
    static gettoken() {
        var aux = new Array;
        this.prototype.forEach(tok => {
            aux.push(tok);
        });
        return aux;
    }
}
exports.tokens = tokens;
