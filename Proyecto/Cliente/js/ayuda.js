function convertir(){
    const xml2js = require('xml2js');
    const util = require('util');
    const parser = new xml2js.Parser();
    var xml = document.getElementById("txthtml").value;
    
    parser.parseString(xml, (err, result) => {
        var ja = document.getElementById("txtjson");
    ja.innerHTML = result;

    });
}
