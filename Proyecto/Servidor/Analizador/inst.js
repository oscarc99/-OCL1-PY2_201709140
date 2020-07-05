const instruccionesAPI = {

    html: function(contenido) {
        return {
            "HTML":{
                contenido
            }
            
        };
        
    },
    head: function(contenido) {
        return {
            "HEAD":{
                contenido
            }
            
            
        };
        
    },
    
    title: function(contenido) {
        return {
            "TITLE":{
                contenido
            }
            
        };
        
    },
    bodyS: function(contenido) {
        return {
            "BODY":{
                contenido
            }
            
        };
        
    },
    bodyC: function(style,contenido) {
        return {
            "BODY":{
                "STYLE":style,
                contenido
            }
            
            
        };
        
    },
    divS: function(contenido) {
        return {
            "DIV":{
                contenido
            }
            
        };
        
    },
    divC: function(style,contenido) {
        return {
            "DIV":{
                "STYLE":style,
                contenido
            }
            
            
        };
        
    },
    p: function(contenido) {
        return {
            "P":{
                contenido
            }
            
        };
        
    },
    h1: function(contenido) {
        return {
            "H1":{
                contenido
            }
            
        };
        
    },
    h2: function(contenido) {
        return {
            "H2":{
                contenido
            }
            
        };
        
    },
    h3: function(contenido) {
        return {
            "H3":{
                contenido
            }
            
            
        };
        
    },
    h4: function(contenido) {
        return {
            "H4":{
                contenido
            }
            
        };
        
    },
    button: function(contenido) {
        return {
            "BUTTON":{
                contenido
            }
           
        };
        
    },
    label: function(contenido) {
        return {
            "LABEL":{
                contenido
            }
            
        };
        
    },
    input: function() {
        return {
            "INPUT":"input"
            
        };
        
    },
    br: function() {
        return {
            "BR":"br"
            
        };
        
    }
    

    

}
module.exports.instruccionesAPI = instruccionesAPI;