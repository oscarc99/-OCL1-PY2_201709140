"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var gramatica = require("./Analizador/Gramatica");
var grama = require("./Analizador/html");
var errores_1 = require("./Analizador/errores");


var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Analizar/', function (req, res) {
    errores_1.errores.clear();
    
    var entrada = req.body.text;
    var resultado = parser(entrada);
    
    
    res.send(resultado);
});
app.get('/Error/', (req, res) =>{
    
    var resultado =getError();
    
    res.send(resultado);
});

app.get('/Toke/', (req, res) =>{
    
    var resultado =getTokens();
    
    res.send(resultado);
});

app.post('/Json/', function (req, res) {
    var entrada = req.body.text;
    var re =  par(entrada );
    res.send(re);

   
    
});
/*---------------------------------------------------------------*/

var server = app.listen(8080,  () => {
    console.log('Servidor escuchando en puerto 8080...');
});
/*---------------------------------------------------------------*/
function parser(texto) {
    try {
        
        
        return gramatica.parse(texto);
    }
    catch (e) {
        return "Error en compilacion de Entrada: " + e.toString();
    }
}

function par(texto) {
    try {
        
        
        return grama.parse(texto);
    }
    catch (e) {
        return "Error en compilacion de Entrada: " + e.toString();
    }
}

function getTokens() {
    try {
        return tokens_1.tokens.gettoken();
    }
    catch (er) {
        return "Error al enviar tokens: " + er.toString();
    }
}

function getError() {
    try {
        return errores_1.errores.getErrores();
    }
    catch (er) {
        return "Error al enviar errores: " + er.toString();
    }
}

exports.default = app;