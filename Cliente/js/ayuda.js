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


//Herramientas
//Guardar py
function saveTextAsFile(nombre, contenido) {
    var textToWrite = contenido;
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = nombre;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
  
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  
    downloadLink.onclick = destroyClickedElement;
  
    downloadLink.style.display = "none";
  
    document.body.appendChild(downloadLink);
  
    downloadLink.click();
  }
  function destroyClickedElement(event) {
  
    document.body.removeChild(event.target);
  }
  
  function guardararchivo() {
    saveTextAsFile("guardar.py", document.getElementById("textpy").value);
  }
  //Abrir cs
  function abrir(){
      

  }