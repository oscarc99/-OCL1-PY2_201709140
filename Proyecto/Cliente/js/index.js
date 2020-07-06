"use strict";
function a123(){
    
    var url = "http://localhost:8080/Json/";
    var texto = document.getElementById("txthtml").value;
    
    
    $.post(url,{text:texto},function(data,status){
        if(status.toString()=="success"){
            

            var json = JSON.stringify(data,null,2);
            

            
            
            document.getElementById("txtjson").innerHTML = json.toString();
            
                       
        }else{
            alert("Error estado de conexion:"+status);
        }
    });
    
}
function Analiza(){
    var texto = document.getElementById("textc").value;
    var tex = document.getElementById("textTree");
    var urlAnalsis='http://localhost:8080/Analizar/';
    var urlErrores = "http://localhost:8080/Error/";
    

    $.post(urlAnalsis,{text:texto},function(data,status){
        if(status.toString()=="success"){
            
            var json = JSON.stringify(data,null,2);
            tex.innerHTML=json.toString();
            console.log("Analizo");
            createJSTree(data);
                       
        }else{
            alert("Error estado de conexion:"+status);
        }
    });
    
    

    

    $.get(urlErrores, function (data, status) {
      if (status.toString() == 'success') {
          /* PINTAR LA TABLA CON LOS ERRORES */
          let conteo = 1;
          let table = document.getElementById('tablaErrores');
          var i = table.rows.length;
          while (i > 1) {
              i--;
              table.deleteRow(i);
          }
          
          if (table) {
              data.forEach(error => {
                  let newRow = table.insertRow(table.rows.length);
                  let no = newRow.insertCell(0);
                  let tipo = newRow.insertCell(1);
                  let er = newRow.insertCell(2);
                  let linea = newRow.insertCell(3);
                  let descripcion = newRow.insertCell(4);
                  no.innerHTML = conteo.toString();
                  tipo.innerHTML = error.tipo;
                  er.innerHTML = error.valor;
                  linea.innerHTML = error.linea.toString();
                  descripcion.innerHTML = error.descripcion;
                  conteo++;
              });
          }
          console.log("Errores");
          
      }
      else {
          alert("Error estado de conexion ERRORES" + status);
      }
  });
  

}  

function createJSTree(jsondata) {
    $('#jstree').jstree("destroy");
    $('#jstree').jstree({
        'core': {
            'data': jsondata
        }
    });
}
  
function ayuda (texto){
    var cadenaH="";
    var dentro = false;
    console.log(texto);
    for (var i = 0; i < texto.length-1; i++) {
        var char = texto.charAt(i);
        if(char=="(" && texto.charAt(i+1)=="'"){

            dentro = true;
        }
        else if(char == ")"){
            dentro = false;
            

        }
        else if (dentro && char !="'"){

            cadenaH= cadenaH+ char;
        }
    }
    console.log(cadenaH);
    var ha = document.getElementById("txthtml");
    ha.innerHTML = cadenaH;
   
    //const par = new DOMParser();
    //const parseDoc = par.parseFromString( cadenaH,"text/html");
    //console.log(parseDoc);
   
    //traducirHTML(cadenaH);

}

function tablasVar(){
    /* PINTAR LA TABLA CON LOS variables */
    
    let conteo = 1;
    let table = document.getElementById('tablaVal');
    var i = table.rows.length;
    while (i > 1) {
        i--;
        table.deleteRow(i);
    }
    
    if (table) {
        for (var i = 0; i < listavaria.length; i++) {
            let newRow = table.insertRow(table.rows.length);
            let no = newRow.insertCell(0);
            let tipo = newRow.insertCell(1);
            let nombre = newRow.insertCell(2);
            let linea = newRow.insertCell(3);
            
            no.innerHTML = conteo.toString();
            tipo.innerHTML =  listavaria[i].tipo;
            nombre.innerHTML = listavaria[i].nombre;
            linea.innerHTML = listavaria[i].linea;
            
            conteo++;
        }
    
        
    }
    
    
}

function traducirHTML (texto) {
    var fin = false;
    var ListaJson = "";
   var auxLex = "";
    var estado = 0;
    var c;
    for (var num = 0; num < texto.length; num++) {
        c = texto.charAt(num);
        switch (estado) {
            case 0:
                if (c == '<') {
                    
                    estado = 1;
                }
                else if (c == '>') {
                    
                    estado = 0;
                }
                else if (c == '=') {
                    
                    estado = 0;
                }
                else if (c == '\"') {
                    
                    estado = 0;
                }
                else if (c == ':') {
                    
                    estado = 0;
                }
                else if (c.match(isLetra) || c.match(isDigito)) {
                    auxLex += c;
                    estado = 2;
                }
                else if (esEspacio(c)) {
                    estado = 0;
                }
                else {
                    
                    estado = 0;
                }
                break;
            case 2:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 2;
                }
                else if (auxLex.toLowerCase() == "style") {
                    if (fin == false) {
                        ListaJson += "\"Style\":";
                    }
                    fin = false;
                    this.addListH(auxLex, "Style");
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "background") {
                    if (fin == false) {
                        ListaJson += "\"background:";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "yellow") {
                    if (fin == false) {
                        ListaJson += "yellow\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "green") {
                    if (fin == false) {
                        ListaJson += "green\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "blue") {
                    if (fin == false) {
                        ListaJson += "blue\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "red") {
                    if (fin == false) {
                        ListaJson += "red\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "white") {
                    if (fin == false) {
                        ListaJson += "white\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "skyblue") {
                    if (fin == false) {
                        ListaJson += "skyblue\",\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (c == '<') {
                    if (fin == false) {
                        ListaJson += "\"Texto\":\"" + auxLex + "\"";
                    }
                    fin = false;
                    
                    estado = 1;
                }
                else if (esEspacio(c)) {
                    auxLex += c;
                    estado = 2;
                }
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                break;
            case 1:
                if (c.match(isId)) {
                    auxLex += c;
                    estado = 1;
                }
                else if (auxLex.toLowerCase() == "html") {
                    if (fin == false) {
                        ListaJson += "\"Html\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "head") {
                    if (fin == false) {
                        ListaJson += "\"Head\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "body") {
                    if (fin == false) {
                        ListaJson += "\"Body\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "title") {
                    if (fin == false) {
                        ListaJson += "\"Title\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "div") {
                    if (fin == false) {
                        ListaJson += "\"Div\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "br") {
                    if (fin == false) {
                        ListaJson += "\"BR\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "p") {
                    if (fin == false) {
                        ListaJson += "\"P\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h1") {
                    if (fin == false) {
                        ListaJson += "\"H1\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h2") {
                    if (fin == false) {
                        ListaJson += "\"H2\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h3") {
                    if (fin == false) {
                        ListaJson += "\"H3\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "h4") {
                    if (fin == false) {
                        ListaJson += "\"H4\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "button") {
                    if (fin == false) {
                        ListaJson += "\"Button\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "label") {
                    if (fin == false) {
                        ListaJson += "\"Label\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (auxLex.toLowerCase() == "input") {
                    if (fin == false) {
                        ListaJson += "\"INPUT\":{\n";
                    }
                    fin = false;
                    
                    num = num - 1;
                    estado = 0;
                }
                else if (c == '/') {
                    fin = true;
                    ListaJson += "\n}";
                    
                    estado = 1;
                }
                else {
                    
                    num = num - 1;
                    estado = 0;
                }
                break;
        }
    }
    return  ListaJson;
};


var listatoken = [];
var listatokenerror = [];
var listavaria = [];

function traducir() {

    listatoken = [];
    listatokenerror = [];
    listavaria = [];
    var temp = document.getElementById("textc").value;
    
    ayuda(temp);
    temp = temp.split("   ").join("");
    temp = temp + "\n";
    var estado = 0;
    var lexema = "";
    var fila = 1;
    var columna = 0;
    for (var i = 0; i < temp.length; i++) {
        columna++;
        var char = temp.charAt(i);
        switch (estado) {
            case 0: {
                if (char == "\n") {
                    estado = 0;
                    fila++;
                    columna = 0;
                }
                else if (char == " ") {
                    estado = 0;
                }
                else if (char == ";") {
                    llenar(char, columna, fila, "puntocoma");
                }
                else if (char == "=") {
                    llenar(char, columna, fila, "igual");
                }
                else if (char == ",") {
                    llenar(char, columna, fila, "coma");
                }
                else if (char == "(") {
                    llenar(char, columna, fila, "para");
                }
                else if (char == ")") {
                    llenar(char, columna, fila, "parc");
                }
                else if (char == "{") {
                    llenar(char, columna, fila, "llavea");
                }
                else if (char == "}") {
                    llenar(char, columna, fila, "llavec");
                }
                else if (char == ".") {
                    llenar(char, columna, fila, "punto");
                }
                else if (char == "<") {
                    llenar(char, columna, fila, "menor");
                }
                else if (char == ">") {
                    llenar(char, columna, fila, "mayor");
                }
                else if (char == "!") {
                    llenar(char, columna, fila, "not");
                }
                else if (char == "+") {
                    llenar(char, columna, fila, "mas");
                }
                else if (char == "-") {
                    llenar(char, columna, fila, "menos");
                }
                else if (char == "*") {
                    llenar(char, columna, fila, "por");
                }
                else if (char == "&") {
                    llenar(char, columna, fila, "and");
                }
                else if (char == "|") {
                    llenar(char, columna, fila, "or");
                }
                else if (char == "'") {
                    llenar(char, columna, fila, "comilla");
                }
                else if (char == "/") {
                    lexema += char;
                    estado = 1;
                }
                else if (char == "\"") {
                    estado = 8;
                }
                else if (char.match(/[0-9]/i)) {
                    lexema += char;
                    estado = 5;
                }
                else if (char.match(/[a-z]/i)) {
                    lexema += char;
                    estado = 7;
                }
                else {
                    llenarerror("error lexico", "\"" + char + "\"no pertenece al lenguaje", fila, columna);
                }
                break;
            }
            case 1: {
                if (char == "/") {
                    lexema = "";
                    estado = 2;
                }
                else if (char == "*") {
                    lexema = "";
                    estado = 3;
                }
                else {
                    llenar(lexema, columna, fila, "div");
                    lexema = "";
                    estado = 0;
                    i--;
                }
                break;
            }
            case 2: {
                if (char == "\n") {
                    llenar(lexema, columna, fila, "comentario");
                    i--;
                    lexema = "";
                    estado = 0;
                }
                else {
                    estado = 2;
                    lexema += char;
                }
                break;
            }
            case 3: {
                if (char == "*") {
                    estado = 4;
                }
                else {
                    estado = 3;
                    lexema += char;
                }
                break;
            }
            case 4: {
                if (char == "/") {
                    llenar(lexema, columna, fila, "comentariomulti");
                    lexema = "";
                    estado = 0;
                }
                else {
                    estado = 3;
                }
                break;
            }
            case 5: {
                if (char.match(/[0-9]/i)) {
                    lexema += char;
                    estado = 5;
                }
                else if (char == ".") {
                    lexema += char;
                    estado = 5;
                }
                else if (char.match(/[a-z]/i) || char == "_") {
                    lexema += char;
                    estado = 6;
                }
                else {
                    llenar(lexema, columna, fila, "digit");
                    lexema = "";
                    estado = 0;
                    i--;
                }
                break;
            }
            case 6: {
                if (char.match(/[0-9]/i)) {
                    lexema += char;
                    estado = 6;
                }
                else if (char.match(/[a-z]/i) || char == "_") {
                    lexema += char;
                    estado = 6;
                }
                else {
                    if (lexema == "h1") {
                        llenar(lexema, columna, fila, "h1");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "h2") {
                        llenar(lexema, columna, fila, "h2");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "h3") {
                        llenar(lexema, columna, fila, "h3");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "h4") {
                        llenar(lexema, columna, fila, "h4");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else {
                        llenar(lexema, columna, fila, "ID");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                }
                break;
            }
            case 7: {
                if (char.match(/[0-9]/i) || char == "_") {
                    lexema += char;
                    estado = 6;
                }
                else if (char.match(/[a-z]/i)) {
                    lexema += char;
                    estado = 7;
                }
                else {
                    if (lexema == "int") {
                        llenar(lexema, columna, fila, "int");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "double") {
                        llenar(lexema, columna, fila, "double");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "char") {
                        llenar(lexema, columna, fila, "char");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "bool") {
                        llenar(lexema, columna, fila, "bool");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "string") {
                        llenar(lexema, columna, fila, "string");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "void") {
                        llenar(lexema, columna, fila, "void");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "main") {
                        llenar(lexema, columna, fila, "main");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "Console") {
                        llenar(lexema, columna, fila, "Console");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "Write") {
                        llenar(lexema, columna, fila, "Write");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "if") {
                        llenar(lexema, columna, fila, "if");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "true") {
                        llenar(lexema, columna, fila, "true");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "false") {
                        llenar(lexema, columna, fila, "false");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "else") {
                        llenar(lexema, columna, fila, "else");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "switch") {
                        llenar(lexema, columna, fila, "switch");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "for") {
                        llenar(lexema, columna, fila, "for");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "while") {
                        llenar(lexema, columna, fila, "while");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "do") {
                        llenar(lexema, columna, fila, "do");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "return") {
                        llenar(lexema, columna, fila, "return");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "break") {
                        llenar(lexema, columna, fila, "break");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "continue") {
                        llenar(lexema, columna, fila, "continue");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "html") {
                        llenar(lexema, columna, fila, "html");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "head") {
                        llenar(lexema, columna, fila, "head");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "body") {
                        llenar(lexema, columna, fila, "body");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "title") {
                        llenar(lexema, columna, fila, "title");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "div") {
                        llenar(lexema, columna, fila, "div1");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "br") {
                        llenar(lexema, columna, fila, "br");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "p") {
                        llenar(lexema, columna, fila, "p");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "button") {
                        llenar(lexema, columna, fila, "button");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "label") {
                        llenar(lexema, columna, fila, "label");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else if (lexema == "input") {
                        llenar(lexema, columna, fila, "input");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                    else {
                        llenar(lexema, columna, fila, "ID");
                        lexema = "";
                        estado = 0;
                        i--;
                    }
                }
                break;
            }
            case 8: {
                if (char == "\"") {
                    llenar(lexema, columna, fila, "valor");
                    lexema = "";
                    estado = 0;
                }
                else {
                    lexema += char;
                    estado = 8;
                }
                break;
            }
        }
    }
    tam = listatoken.length;
    pos = 0;
    actual = listatoken[0];
    traduccion = "";
    espacios = "";
    html = "";
    json = "";
    sinc();
    document.getElementById("textpy").value = traduccion;
    console.log("json");
    console.log(json);
    
    tablasVar();
   
}
var tam = 0;
var actual = new tokens();
var pos = 0;
var traduccion = " #traduccion del archivO \n";
var espacios = "";
var linea = "";
var tipo = "";
var nombre = "";
var traduc = "hola";
var traduchtml = "hola";
var html = new String("\b");
var json = new String("\b");
var isId = /^[0-9|a-zA-Z|_]*$/;
var isLetra = /^[a-zA-Z]$/;
var isDigito = /^[0-9]$/;

function sinc() {
    if (actual.tipo == null) {
        return;
    }
    else if (actual.tipo == "comentario") {
        traduccion += "#" + actual.lexema + "\n";
        sig();
        sinc();
    }
    else if (actual.tipo == "comentariomulti") {
        traduccion += "'''" + actual.lexema + "'''\n";
        sig();
        sinc();
    }
    else if (actual.tipo == "int" || actual.tipo == "string" || actual.tipo == "double" || actual.tipo == "char" || actual.tipo == "bool") {
        tipo = actual.lexema;
        linea = actual.fila;
        sig();
        if (actual.tipo == "ID") {
            traduc = actual.lexema;
            nombre = actual.lexema;
            llenarvaria(tipo, nombre, linea);
            sig();
            if (actual.tipo == "igual" || actual.tipo == "puntocoma" || actual.tipo == "coma") {
                variable();
                traduccion += espacios + "var " + traduc + "\n";
                sinc();
            }
            else if (actual.tipo == "para") {
                traduc += actual.lexema;
                sig();
                funcion();
                sinc();
            }
            else {
                llenarerror("error sintactico", "espera ( , = , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
                sinc();
            }
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
            sinc();
        }
    }
    else if (actual.tipo == "void") {
        sig();
        if (actual.tipo == "ID" || actual.tipo == "main") {
            traduc = actual.lexema;
            sig();
            if (actual.tipo == "para") {
                traduc += actual.lexema;
                sig();
                funcion();
                sinc();
            }
            else {
                llenarerror("error sintactico", "espera ( , = , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
                sinc();
            }
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
            sinc();
        }
    }
    else {
        sig();
        sinc();
    }
}
function variable() {
    if (actual.tipo == "puntocoma" || actual.tipo == "parc") {
        sig();
    }
    else if (actual.tipo == "coma") {
        sig();
        traduc += ",";
        if (actual.tipo == "ID") {
            nombre = actual.lexema;
            linea = actual.fila;
            llenarvaria(tipo, nombre, linea);
            traduc += actual.lexema;
            sig();
            variable();
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "igual") {
        sig();
        traduc += "=";
        valores();
    }
    else {
        llenarerror("error sintactico", "espera , = o ; , e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function valores() {
    if (actual.tipo == "digit") {
        traduc += actual.lexema;
        sig();
        operandos();
    }
    else if (actual.tipo == "valor" || actual.tipo == "true" || actual.tipo == "false") {
        traduc += "\"" + actual.lexema + "\"";
        sig();
        cadenas();
    }
    else if (actual.tipo == "ID") {
        traduc += actual.lexema;
        sig();
        ids();
    }
    else if (actual.tipo == "comilla") {
        sig();
        traduc = "";
        traduchtml = "";
        HTML();
        html += traduchtml;
        json += traduc;
        traduc = " ";
        if (actual.tipo == "puntocoma") {
            sig();
        }
        else {
            llenarerror("error sintactico", "espera ; , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function HTML() {
    if (actual.tipo == "comilla") {
        sig();
        return;
    }
    else if (actual.tipo == "menor") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "div") {
            return;
        }
        else if (actual.tipo == "html") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"html\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finhtml();
            }
        }
        else if (actual.tipo == "head") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"head\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finhead();
            }
        }
        else if (actual.tipo == "body") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"body\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finbody();
            }
        }
        else if (actual.tipo == "title") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"title\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                fintitle();
            }
        }
        else if (actual.tipo == "div1") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"div\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                findiv();
            }
        }
        else if (actual.tipo == "br") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"br\":\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
            }
        }
        else if (actual.tipo == "input") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"input\":\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
            }
        }
        else if (actual.tipo == "p") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"p\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finp();
            }
        }
        else if (actual.tipo == "button") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"button\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finbutton();
            }
        }
        else if (actual.tipo == "label") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"label\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finlabel();
            }
        }
        else if (actual.tipo == "h1") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"h1\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finh1();
            }
        }
        else if (actual.tipo == "h2") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"h2\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finh2();
            }
        }
        else if (actual.tipo == "h3") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"h3\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finh3();
            }
        }
        else if (actual.tipo == "h4") {
            traduchtml += actual.lexema;
            sig();
            traduc += "\"h4\":{\n";
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                HTML();
                finh4();
            }
        }
    }
    else {
        traduc += "\"texto \": \"" + actual.lexema + " ";
        traduchtml += actual.lexema + " ";
        sig();
        loquesea();
        HTML();
    }
}
function loquesea() {
    if (actual.tipo == "menor" || actual.tipo == "comilla") {
        traduc += "\" ";
        return;
    }
    else {
        traduc += actual.lexema + " ";
        traduchtml += actual.lexema + " ";
        sig();
        loquesea();
    }
}
function finhtml() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "html") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera html , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finhead() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "head") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayor, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera head , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finbody() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "body") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayor, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera body , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function fintitle() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "title") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera title , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function findiv() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "div1") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera div , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finp() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "p") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera p , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finlabel() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "label") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera label , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finbutton() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "button") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera button , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finh1() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "h1") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera h1 , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finh2() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "h2") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera h2 , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finh3() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "h3") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera h3 , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function finh4() {
    if (actual.tipo == "div") {
        traduchtml += actual.lexema;
        sig();
        if (actual.tipo == "h4") {
            traduchtml += actual.lexema;
            sig();
            if (actual.tipo == "mayor") {
                traduchtml += actual.lexema + "\n";
                sig();
                traduc += "}\n";
                HTML();
            }
            else {
                llenarerror("error sintactico", "espera mayot , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera h4 , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function operandos() {
    if (actual.tipo == "digit") {
        llenarerror("error sintactico", "espera un operando, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
    else if (actual.tipo == "mas" || actual.tipo == "por" || actual.tipo == "div" || actual.tipo == "menos") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            operandos();
        }
        else if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            ids();
        }
        else if (actual.tipo == "valor" || actual.tipo == "true" || actual.tipo == "false") {
            var l = traduc.length;
            l--;
            traduc = traduc.slice(0, l);
            traduc += ",";
            traduc += "\"" + actual.lexema + "\"";
            sig();
            cadenas();
        }
        else {
            llenarerror("error sintactico", "espera digit, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "puntocoma" || actual.tipo == "parc") {
        variable();
    }
    else {
        llenarerror("error sintactico", "espera operador, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function cadenas() {
    if (actual.tipo == "valor") {
        llenarerror("error sintactico", "espera un operando, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
    else if (actual.tipo == "mas") {
        traduc += ",";
        sig();
        if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            operandos();
        }
        else if (actual.tipo == "valor" || actual.tipo == "true" || actual.tipo == "false") {
            traduc += "\"" + actual.lexema + "\"";
            sig();
            cadenas();
        }
        else if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            ids();
        }
        else {
            llenarerror("error sintactico", "espera digit o cadena, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "puntocoma" || actual.tipo == "parc") {
        variable();
    }
    else {
        llenarerror("error sintactico", "espera un operando, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function ids() {
    if (actual.tipo == "digit" || actual.tipo == "valor" || actual.tipo == "cadena") {
        llenarerror("error sintactico", "espera un operando, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
    else if (actual.tipo == "mas" || actual.tipo == "por" || actual.tipo == "div" || actual.tipo == "menos") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            operandos();
        }
        else if (actual.tipo == "valor" || actual.tipo == "true" || actual.tipo == "false") {
            var l = traduc.length;
            l--;
            traduc = traduc.slice(0, l);
            traduc += ",";
            traduc += "\"" + actual.lexema + "\"";
            sig();
            cadenas();
        }
        else if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            ids();
        }
        else {
            llenarerror("error sintactico", "espera digit, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "para") {
        traduc += actual.lexema;
        sig();
        parametros();
        ids();
    }
    else if (actual.tipo == "puntocoma" || actual.tipo == "parc") {
        variable();
    }
    else {
        llenarerror("error sintactico", "espera operador, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function parametros() {
    if (actual.tipo == "int" || actual.tipo == "string" || actual.tipo == "double" || actual.tipo == "char" || actual.tipo == "bool") {
        sig();
        if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            parametros();
        }
        else {
            llenarerror("error sintactico", "espera id, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
            sinc();
        }
    }
    else if (actual.tipo == "coma") {
        sig();
        traduc += ",";
        if (actual.tipo == "int" || actual.tipo == "string" || actual.tipo == "double" || actual.tipo == "char" || actual.tipo == "bool") {
            parametros();
        }
        else {
            llenarerror("error sintactico", "espera id, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "parc") {
        traduc += actual.lexema;
        sig();
    }
    else {
        llenarerror("error sintactico", "espera ) o una variable, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function funcion() {
    if (traduc == "main(") {
        parametros();
        traduccion += "def " + traduc + ":\n";
        if (actual.tipo == "llavea") {
            sig();
            espacios += "\t";
            todo();
            if (actual.tipo == "llavec") {
                espacios = "";
                traduccion += "if __name__ = \"__main__\":\n  main()\n";
                sig();
                sinc();
            }
            else {
                llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                espacios = "";
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else {
        parametros();
        traduccion += "def " + traduc + ":\n";
        if (actual.tipo == "llavea") {
            sig();
            espacios += "\t";
            todo();
            if (actual.tipo == "llavec") {
                espacios = "";
                sig();
                sinc();
            }
            else {
                llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                espacios = "";
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function todo() {
    if (actual.tipo == "comentario") {
        traduccion += espacios + "#" + actual.lexema + "\n";
        sig();
        todo();
    }
    else if (actual.tipo == "comentariomulti") {
        traduccion += espacios + "'''" + actual.lexema + "'''\n";
        sig();
        todo();
    }
    else if (actual.tipo == "int" || actual.tipo == "string" || actual.tipo == "double" || actual.tipo == "char" || actual.tipo == "bool") {
        tipo = actual.lexema;
        linea = actual.fila;
        sig();
        if (actual.tipo == "ID") {
            nombre = actual.lexema;
            llenarvaria(tipo, nombre, linea);
            traduc = actual.lexema;
            sig();
            if (actual.tipo == "igual" || actual.tipo == "puntocoma" || actual.tipo == "coma") {
                variable();
                traduccion += espacios + "var " + traduc + "\n";
                todo();
            }
            else {
                llenarerror("error sintactico", "espera ( , = , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "if") {
        sig();
        traduc = "if ";
        if (actual.tipo == "para") {
            sig();
            cmp();
            traduccion += espacios + traduc + ":\n";
            if (actual.tipo == "llavea") {
                sig();
                espacios += "\t";
                todo();
                if (actual.tipo == "llavec") {
                    sig();
                    espacios = espacios.substr(1);
                    elif();
                    todo();
                }
                else {
                    llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    espacios = espacios.substr(1);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera ( , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "while") {
        sig();
        traduc = "while ";
        if (actual.tipo == "para") {
            sig();
            cmp();
            traduccion += espacios + traduc + ":\n";
            if (actual.tipo == "llavea") {
                sig();
                espacios += "\t";
                todo();
                if (actual.tipo == "llavec") {
                    sig();
                    espacios = espacios.substr(1);
                    todo();
                }
                else {
                    llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    espacios = espacios.substr(1);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera ( , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "ID") {
        traduc = actual.lexema;
        sig();
        if (actual.tipo == "igual" || actual.tipo == "coma") {
            variable();
            traduccion += espacios + traduc + "\n";
            todo();
        }
        else {
            llenarerror("error sintactico", "espera ( , = , se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "do") {
        sig();
        traduccion += espacios + "while true:\n";
        if (actual.tipo == "llavea") {
            sig();
            espacios += "\t";
            todo();
            if (actual.tipo == "llavec") {
                sig();
                if (actual.tipo == "while") {
                    sig();
                    traduc = "if ";
                    sig();
                    cmp();
                    traduccion += espacios + traduc + ":\n";
                    traduccion += espacios + "\tbreak \n";
                }
                espacios = espacios.substr(1);
                todo();
            }
            else {
                llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                espacios = espacios.substr(1);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "return") {
        sig();
        traduc = espacios + "return ";
        if (actual.tipo == "puntocoma") {
            sig();
            traduccion += traduc + "\n";
            todo();
        }
        else {
            valores();
            traduccion += traduc + "\n";
            todo();
        }
    }
    else if (actual.tipo == "break") {
        sig();
        traduc = espacios + "break";
        if (actual.tipo == "puntocoma") {
            sig();
            traduccion += traduc + "\n";
            todo();
        }
        else {
            llenarerror("error sintactico", "espera puntocoma, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "continue") {
        sig();
        traduc = espacios + "continue";
        if (actual.tipo == "puntocoma") {
            sig();
            traduccion += traduc + "\n";
            todo();
        }
        else {
            llenarerror("error sintactico", "espera puntocoma, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "for") {
        traduc = espacios + "for ";
        sig();
        if (actual.tipo == "para") {
            sig();
            ford();
            traduccion += traduc + "\n";
            if (actual.tipo == "llavea") {
                sig();
                espacios += "\t";
                todo();
                if (actual.tipo == "llavec") {
                    sig();
                    espacios = espacios.substr(1);
                    todo();
                }
                else {
                    llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    espacios = espacios.substr(1);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
    }
    else if (actual.tipo == "Console") {
        sig();
        traduc = espacios + "print";
        if (actual.tipo == "punto") {
            sig();
            if (actual.tipo == "Write") {
                sig();
                if (actual.tipo == "para") {
                    sig();
                    valores();
                    if (actual.tipo == "puntocoma") {
                        sig();
                        traduccion += traduc + "\n";
                        todo();
                    }
                    else {
                        llenarerror("error sintactico", "espera puntocoma , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                        sig();
                    }
                }
                else {
                    llenarerror("error sintactico", "espera ( , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera Write , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera punto , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
}
function ford() {
    if (actual.tipo == "int") {
        sig();
        if (actual.tipo == "ID") {
            traduc += actual.lexema + " in a range ";
            sig();
            if (actual.tipo == "igual") {
                sig();
                if (actual.tipo == "digit") {
                    traduc += "(" + actual.lexema;
                    sig();
                    if (actual.tipo == "puntocoma") {
                        sig();
                        if (actual.tipo == "ID") {
                            sig();
                            if (actual.tipo == "mayor" || actual.tipo == "menor" || actual.tipo == "igual") {
                                sig();
                                if (actual.tipo == "digit") {
                                    traduc += "," + actual.lexema + ")";
                                    sig();
                                    if (actual.tipo == "puntocoma") {
                                        sig();
                                        sig();
                                        sig();
                                        sig();
                                        if (actual.tipo == "parc") {
                                            sig();
                                        }
                                        else {
                                            llenarerror("error sintactico", "espera ), se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                                            sig();
                                        }
                                    }
                                    else {
                                        llenarerror("error sintactico", "espera puntocoma, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                                        sig();
                                    }
                                }
                                else {
                                    llenarerror("error sintactico", "espera digit, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                                    sig();
                                }
                            }
                            else {
                                llenarerror("error sintactico", "espera (, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                                sig();
                            }
                        }
                        else {
                            llenarerror("error sintactico", "espera ID, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                            sig();
                        }
                    }
                    else {
                        llenarerror("error sintactico", "espera puntocoma, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                        sig();
                    }
                }
                else {
                    llenarerror("error sintactico", "espera digito, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera igual, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera id, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else {
        llenarerror("error sintactico", "espera int, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function cmp() {
    if (actual.tipo == "ID") {
        traduc += actual.lexema;
        sig();
        idscmp();
    }
    else if (actual.tipo == "true") {
        traduc += actual.lexema;
        sig();
        idscmp();
    }
    else if (actual.tipo == "not") {
        traduc += " not ";
        sig();
        cmp();
    }
    else if (actual.tipo == "digit") {
        traduc += actual.lexema;
        sig();
        digitcmp();
    }
    else if (actual.tipo == "false") {
        traduc += actual.lexema;
        sig();
        idscmp();
    }
    else if (actual.tipo == "parc") {
        sig();
    }
}
function digitcmp() {
    if (actual.tipo == "digit" || actual.tipo == "true" || actual.tipo == "false") {
        llenarerror("error sintactico", "espera un operando logico, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
    else if (actual.tipo == "mayor" || actual.tipo == "menor") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "igual") {
            sig();
            traduc += "=";
        }
        if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "igual" || actual.tipo == "not") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "igual") {
            traduc += actual.lexema;
            sig();
            if (actual.tipo == "digit") {
                traduc += actual.lexema;
                sig();
                idscmp();
            }
            else if (actual.tipo == "ID") {
                traduc += actual.lexema;
                sig();
                idscmp();
            }
            else {
                llenarerror("error sintactico", "espera ID o digito, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera = o !, se encont or(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "and" || actual.tipo == "or") {
        if (actual.tipo == "and") {
            traduc += " and ";
        }
        if (actual.tipo == "or") {
            traduc += " or ";
        }
        sig();
        sig();
        if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            digitcmp();
        }
        else if (actual.tipo == "true") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "false") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "parc") {
        cmp();
    }
    else {
        llenarerror("error sintactico", "espera operador logico, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function idscmp() {
    if (actual.tipo == "true" || actual.tipo == "false") {
        llenarerror("error sintactico", "espera un operando logico, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
    else if (actual.tipo == "and" || actual.tipo == "or") {
        if (actual.tipo == "and") {
            traduc += " and ";
        }
        if (actual.tipo == "or") {
            traduc += " or ";
        }
        sig();
        sig();
        if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            digitcmp();
        }
        else if (actual.tipo == "true") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "false") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "mayor" || actual.tipo == "menor") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "igual") {
            sig();
            traduc += "=";
        }
        if (actual.tipo == "digit") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else if (actual.tipo == "ID") {
            traduc += actual.lexema;
            sig();
            idscmp();
        }
        else {
            llenarerror("error sintactico", "espera ID, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "igual" || actual.tipo == "not") {
        traduc += actual.lexema;
        sig();
        if (actual.tipo == "igual") {
            traduc += actual.lexema;
            sig();
            if (actual.tipo == "digit") {
                traduc += actual.lexema;
                sig();
                idscmp();
            }
            else if (actual.tipo == "ID") {
                traduc += actual.lexema;
                sig();
                idscmp();
            }
            else {
                llenarerror("error sintactico", "espera ID o digito, e encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
        else {
            llenarerror("error sintactico", "espera = o !, se encont or(" + actual.tipo + ")", actual.fila, actual.columna);
            sig();
        }
    }
    else if (actual.tipo == "parc") {
        cmp();
    }
    else {
        llenarerror("error sintactico", "espera operador, se encontor(" + actual.tipo + ")", actual.fila, actual.columna);
        sig();
    }
}
function elif() {
    if (actual.tipo == "else") {
        sig();
        if (actual.tipo == "llavea") {
            traduccion += espacios + "else:\n";
            sig();
            espacios += "\t";
            todo();
            if (actual.tipo == "llavec") {
                sig();
                espacios = espacios.substr(1);
            }
            else {
                llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                espacios = espacios.substr(1);
                sig();
            }
        }
        else if (actual.tipo == "if") {
            sig();
            traduc = "elif ";
            if (actual.tipo == "para") {
                sig();
                cmp();
                traduccion += espacios + traduc + ":\n";
                if (actual.tipo == "llavea") {
                    sig();
                    espacios += "\t";
                    todo();
                    if (actual.tipo == "llavec") {
                        sig();
                        espacios = espacios.substr(1);
                        elif();
                    }
                    else {
                        llenarerror("error sintactico", "espera }, se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                        espacios = espacios.substr(1);
                        sig();
                    }
                }
                else {
                    llenarerror("error sintactico", "espera { , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                    sig();
                }
            }
            else {
                llenarerror("error sintactico", "espera ( , se  encontor(" + actual.tipo + ")", actual.fila, actual.columna);
                sig();
            }
        }
    }
}
function sig() {
    if (pos != tam - 1) {
        pos++;
    }
    else {
        actual = new tokens();
        return;
    }
    // alert (actual.tipo+"  "+actual.lexema) ;
    actual = listatoken[pos];
}
function llenarerror(tip, char, fila, columna) {
    var temp = new tokens();
    temp.tipo = tip;
    temp.lexema = char;
    temp.fila = fila;
    temp.columna = columna;
    listatokenerror.push(temp);
}
function llenar(lexema, columna, fila, tipo) {
    var temp = new tokens();
    temp.tipo = tipo;
    temp.lexema = lexema;
    temp.fila = fila;
    temp.columna = columna;
    listatoken.push(temp);
}
function tokens() {
    this.lexema = null;
    this.tipo = null;
    this.fila = null;
    this.columna = null;
}
function llenarvaria(tipo, nombre, linea) {
    var temp = new varia();
    temp.tipo = tipo;
    temp.nombre = nombre;
    temp.linea = linea;
    listavaria.push(temp);
}
function varia() {
    this.tipo = null;
    this.nombre = null;
    this.linea = null;
}
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
    };
    lector.readAsText(archivo);
}
function mostrarContenido(contenido) {
    var elemento = document.getElementById('textc');
    elemento.innerHTML = contenido;
}


function saveTextAsFile(nombre, contenido) {
    var textToWrite = contenido;
    //  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    // Specify the name of the file to be saved
    var fileNameToSaveAs = nombre;
    // Optionally allow the user to choose a file name by providing 
    // an imput field in the HTML and using the collected data here
    // var fileNameToSaveAs = txtFileName.text;
    // create a link for our script to 'click'
    var downloadLink = document.createElement("a");
    //  supply the name of the file (from the var above).
    // you could create the name here but using a var
    // allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
    // provide text for the link. This will be hidden so you
    // can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    // allow our code to work in webkit & Gecko based browsers
    // without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
    // Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    // when link is clicked call a function to remove it from
    // the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
    // make sure the link is hidden.
    downloadLink.style.display = "none";
    // add the link to the DOM
    document.body.appendChild(downloadLink);
    // click the new link
    downloadLink.click();
}
function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}
function guardararchivo() {
    saveTextAsFile("resultado.py", document.getElementById("textc").value);
}

function esEspacio (c) {
    if (c == '\n') {
        //Linea_dato++;
    }
    return c == '\n' || c == '\t' || c == ' ';
}

function mapDOM(element, json) {
    var treeObject = {};

    // If string convert to document Node
    if (typeof element === "string") {
        if (window.DOMParser) {
              var parser = new DOMParser();
              var docNode = parser.parseFromString(element,"text/xml");
        } else { // Microsoft strikes again
              docNode = new ActiveXObject("Microsoft.XMLDOM");
              docNode.async = false;
              docNode.loadXML(element); 
        } 
        element = docNode.firstChild;
    }

    //Recursively loop through DOM elements and assign properties to object
    function treeHTML(element, object) {
        object["type"] = element.nodeName;
        var nodeList = element.childNodes;
        if (nodeList != null) {
            if (nodeList.length) {
                object["content"] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if (nodeList[i].nodeType == 3) {
                        object["content"].push(nodeList[i].nodeValue);
                    } else {
                        object["content"].push({});
                        treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                    }
                }
            }
        }
        if (element.attributes != null) {
            if (element.attributes.length) {
                object["attributes"] = {};
                for (var i = 0; i < element.attributes.length; i++) {
                    object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                }
            }
        }
    }
    treeHTML(element, treeObject);

    return (json) ? JSON.stringify(treeObject) : treeObject;
}