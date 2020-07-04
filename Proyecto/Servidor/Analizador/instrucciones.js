
// Constantes para los tipos de 'valores' que reconoce nuestra gramática.
const TIPO_VALOR = {
	NUMERO:         'VALOR_NUMERO',
	NUMERONEG:         'VALOR_NUMERO_NEGATIVO',
    ID:             'VALOR_ID',
    CHAR:            'VALOR_CHAR',
	CADENA:         'VALOR_CADENA',
	INT:            'INT',
	STRING:         'STRNIG',
	HTML: 			'HTML',
	BOOL:           'BOOL',
	DOUBLE:         'DOUBLE',
	MASMAS:         'MASMAS',
	MENOSMENOS:     'MENOSMENOS'
}

// Constantes para los tipos de 'operaciones' que soporta nuestra gramática.
const TIPO_OPERACION = {
	SUMA:           'SUMA',
	RESTA:          'RESTA',
	MULTIPLICACION: 'MULTIPLICACION',
	DIVISION:       'DIVISION',
	MODULO:         'MODULO',
	POTENCIA:       'POTENCIA',
	NEGATIVO:       'NEGATIVO',
	MAYORQUE:      'MAYOR_QUE',
	MENORQUE:      'MENOR_QUE',

	MAYORIGUAL: 	'MAYOR_IGUAL',
	MENORIGUAL:    'MENOR_IGUAL',
	DIGUAL:          'IGUAL',
	NOIGUAL:    	'NO_IGUAL',

	AND:  			'AND',
	OR: 			'OR',
	NOT:   			'NOT',  	
};

// Constantes para los tipos de 'instrucciones' válidas en nuestra gramática.
const TIPO_INSTRUCCION = {
	MAIN:           'MAIN',
	IMPORT:         'IMPORT',
	FUNCION:        'FUNCION',
	DECLARACION:	'DECLARACION',
	ASIGNACION:		'IASIGANCION',
	IF:				'IF',
	ELSE: 			'ELSE',
	IF_ELSE:		'IF_ELSE',
	WHILE:          'WHILE',
	DO_WHILE:        'DO_WHILE',
	FOR:              'FOR',
	SWITCH:			'SWITCH',
	VOID: 			'VOID',
	CASE:			'CASE',
	DEF_CASE:		'DE_FCASE',
	VALOR:          'VALOR',
	PRINT:          'PRINT',
	DEFAULT:		'DEFAULT',
	PARAMETRO:       'PARAMETRO',
	BREAK:  'BREAK',
	CONTINUE:'CONTINUE',
    RETURN:  'RETURN',
    LLAMADA: 'LLAMADA'
}

function nuevaOperacion(operandoIzq, operandoDer, tipo) {
	if (operandoDer === "undefined") {
        return {
            /* PARA JSTREE */
            text: "Operacion",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        {
                            text: tipo,
                            state: { opened: true }
                        }
                    ]
                }, {
                    text: "Operador",
                    state: { opened: true },
                    children: [operandoIzq]
                }
            ],
            /* DATOS CLASICOS */
            operandoIzq: [operandoIzq],
            operandoDer: operandoDer,
            tipo: tipo
        };
    }
    else {
        return {
            /* PARA JSTREE */
            text: "Operacion",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        {
                            text: tipo,
                            state: { opened: true }
                        }
                    ]
                }, {
                    text: "Operador Izquierdo",
                    state: { opened: true },
                    children: [operandoIzq]
                }, {
                    text: "Operador Derecho",
                    state: { opened: true },
                    children: [operandoDer]
                }
            ],
            /* DATOS CLASICOS */
            operandoIzq: operandoIzq,
            operandoDer: operandoDer,
            tipo: tipo
        };
    }
}


const instruccionesAPI = {

	nuevoOperacionBinaria: function(operandoIzq, operandoDer, tipo) {
		if (operandoDer === "undefined") {
			return {
				/* PARA JSTREE */
				text: "Operacion",
				state: { opened: true },
				children: [
					{
						text: "Tipo",
						state: { opened: true },
						children: [
							{
								text: tipo,
								state: { opened: true }
							}
						]
					}, {
						text: "Operador",
						state: { opened: true },
						children: [operandoIzq]
					}
				],
				/* DATOS CLASICOS */
				operandoIzq: [operandoIzq],
				operandoDer: operandoDer,
				tipo: tipo
			};
		}
		else {
			return {
				/* PARA JSTREE */
				text: "Operacion",
				state: { opened: true },
				children: [
					{
						text: "Tipo",
						state: { opened: true },
						children: [
							{
								text: tipo,
								state: { opened: true }
							}
						]
					}, {
						text: "Operador Izquierdo",
						state: { opened: true },
						children: [operandoIzq]
					}, {
						text: "Operador Derecho",
						state: { opened: true },
						children: [operandoDer]
					}
				],
				/* DATOS CLASICOS */
				operandoIzq: operandoIzq,
				operandoDer: operandoDer,
				tipo: tipo
			};
		}
	},
    nuevoBreak: function() {
		return {
            /* PARA JSTREE */
            text: "BREAK",
            state: { opened: true },
            children: [
                {
                    text: ";",
                    state: { opened: true }
                }
            ],
            /* DATOS CLASICOS */
            tipo: tipo,
            valor: valor
        };
	},	
    
	nuevoValor: function(valor, tipo) {
		return {
            /* PARA JSTREE */
            text: tipo,
            state: { opened: true },
            children: [
                {
                    text: valor,
                    state: { opened: true }
                }
            ],
            /* DATOS CLASICOS */
            tipo: tipo,
            valor: valor
        };
    },	
    
   
    nuevaLlamada: function(parametro) {
		return {
			text: "Llamada",
            state: { opened: true },
            children: [
               {
                    text: "parametro",
                    state: { opened: true },
                    children: parametro
                }
            ],
			/* DATOS CLASICOS */
			tipo: TIPO_INSTRUCCION.LLAMADA,
			
			parametro: parametro
		}
	},

	nuevalorfunc: function(id,parametro) {
		return {
			text: "Funcion",
            state: { opened: true },
            children: [
                {
                    text: "ID",
                    state: { opened: true },
                    children: [id]
                }, {
                    text: "parametro",
                    state: { opened: true },
                    children: parametro
                }
            ],
			/* DATOS CLASICOS */
			tipo: TIPO_INSTRUCCION.FUNCION,
			id: id,
			parametro: parametro
		}
	},	

	nuevonot: function(valor) {
		return {
            text: "Not",
            state: { opened: true },
            children: [
                interior
            ],
            /* DATOS CLASICOS */
			tipo: TIPO_OPERACION.NEGATIVO,
			id: id,
			parametro: parametro
        };
	},

	variable: function(id,valor) {
		return {
			/* PARA JSTREE */
			text: "VARIABLE",
			state: { opened: true },
			children: [
				{
                    text: "ID",
                    state: { opened: true },
                    children: [id]
                }, {
                    text: "VALOR",
                    state: { opened: true },
                    children: [valor]
                }
			],
			/*DATOS CLASICOS */
			tipo:TIPO_INSTRUCCION.VALOR,
			identificador: id,
			valor: valor
			
		}
    },
    nuevoid: function(id) {
		return {
			/* PARA JSTREE */
			text: "id",
			state: { opened: true },
			children: [
				{
                    text: "ID",
                    state: { opened: true },
                    children: [id]
                }
			],
			/*DATOS CLASICOS */
			tipo:TIPO_INSTRUCCION.VALOR,
			identificador: id,
			
			
		}
	},

	declaracion: function(tipo,identificadores,valor) {
		return {
            /* PARA JSTREE */
            text: "DECLARACION",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        {
                            text: tipo,
                            state: { opened: true }
                        }
                    ]
                }, {
                    text: "Identificadores",
                    state: { opened: true },
                    children: identificadores
                }, {
                    text: "Valor",
                    state: { opened: true },
                    children: [valor]
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.DECLARACION,
            identificadores: identificadores,
            tipo_dato: tipo,
            valor: valor
        };
    },
    param: function(parametro) {
        return {
            /* DATOS PARA JSTREE */
            text: "Parametro",
            state: { opened: true },
            children: [ parametro],
            /* DATOS CLASICOS */
            parametro: parametro
        };
	},

	parametro: function(tipo,parametro) {
        return {
            /* DATOS PARA JSTREE */
            text: "Parametro",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        {
                            text: tipo,
                            state: { opened: true }
                        }
                    ]
                },
                parametro
            ],
            /* DATOS CLASICOS */
            tipo: tipo,
            parametro: parametro
        };
	},

	funcion: function(parametros , cuerpo) {
		return {
			/* PARA JSTREE */
			text: "FUNCION",
			state: { opened: true },
            children: [
				{
                    text: "PARAMETROS",
                    state: { opened: true },
                    children: parametros
                }, {
                    text: "CUERPO",
                    state: { opened: true },
                    children: cuerpo
                }
			],
			/* DATOS CLASICOS */
			tipo: TIPO_INSTRUCCION.FUNCION,
			parametros:parametros,
			cuerpo:cuerpo
		}
	},

	funcionvoid: function(identificador,parametros , instrucciones) {
		return {
            /* PARA JSTREE */
            text: "VOID",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        TIPO_INSTRUCCION.VOID
                    ]
                }, {
                    text: "Identificador",
                    state: { opened: true },
                    children: [
                        {
                            text: identificador,
                            state: { opened: true }
                        }
                    ]
                }, {
                    text: "Parametros",
                    state: { opened: true },
                    children: parametros
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.VOID,
            identificador: identificador,
            parametros: parametros,
            instrucciones: instrucciones
        };
	},

    funcionmain: function(instrucciones) {
		return {
            /* PARA JSTREE */
            text: "MAIN",
            state: { opened: true },
            children: [
                {
                    text: "Tipo",
                    state: { opened: true },
                    children: [
                        TIPO_INSTRUCCION.MAIN
                    ]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.MAIN,
            instrucciones: instrucciones
        };
    },
    
	nuevoif: function(condicion , cuerpo,elses) {
		return {
			/* PARA JSTREE */
            text: "If",
            state: { opened: true },
            children: [
				{
                    text: "Condicion",
                    state: { opened: true },
                    children: [condicion]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: cuerpo
				},{
					text: "Elses",
                    state: { opened: true },
                    children: [elses]
				}
				
			],
			/* DATOS CLASICOS */
			tipo: TIPO_INSTRUCCION.IF,
			condicion:condicion,
			cuerpo:cuerpo,
			else:elses
		}
	},

	nuevoelse: function( cuerpo) {
		return {
            /* PARA JSTREE */
            text: "ELSE",
            state: { opened: true },
            children: [
                {
                    text: "Cuerpo",
                    state: { opened: true },
                    children: cuerpo
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.ELSE,
            instrucciones: cuerpo
        };
	},

	nuevowhile: function(expresionLogica , instrucciones) {
		return {
            /* PARA JSTREE */
            text: "While",
            state: { opened: true },
            children: [
                {
                    text: "Condicion",
                    state: { opened: true },
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.WHILE,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
	},

	nuevodo: function(instrucciones,expresionLogica) {
		return {
            /* PARA JSTREE */
            text: "Do While",
            state: { opened: true },
            children: [
                {
                    text: "Condicion",
                    state: { opened: true },
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.DO_WHILE,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };




	},
	nuevoError:function (error){
		return {
            text: "Error",
            state: { opened: true },
            icon: "https://png-4.findicons.com/files/icons/1014/ivista/16/error.png",
            children: [
                {
                    text: error,
                    state: { opened: true },
                    icon: "https://png-4.findicons.com/files/icons/1014/ivista/16/error.png"
                }
            ]
        };
	},

	nuevofor: function(Asignacion,expresionLogica,variable,aod,instrucciones) {
        return {
            /* PARA JSTREE */
            text: "For",
            state: { opened: true },
            children: [
                {
                    text: "Condiciones",
                    state: { opened: true },
                    children: [
                        {
                            text: "Asignacion",
                            state: { opened: true },
                            children: [Asignacion]
                        }, {
                            text: "Expresion logica",
                            state: { opened: true },
                            children: [expresionLogica]
                        }, {
                            text: "Incremento/Decremento",
                            state: { opened: true },
                            children: [variable + aod]
                        }
                    ]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            
            tipo: TIPO_INSTRUCCION.FOR,
            Asignacion: Asignacion,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones,
            variable: variable,
            aumentodecremento: aod
            
            
        };
	},
	nuevoswitch: function(expresionNumerica,casos) {
		return {
            /* PARA JSTREE */
            text: "Switch",
            state: { opened: true },
            children: [
                {
                    text: "Expresion",
                    state: { opened: true },
                    children: [expresionNumerica]
                }, {
                    text: "Casos",
                    state: { opened: true },
                    children: casos
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresionNumerica: expresionNumerica,
            casos: casos
        };
	},
	nuevocase: function(expresion,instrucciones) {
		return {
            /* PARA JSTREE */
            text: "Case",
            state: { opened: true },
            children: [
                {
                    text: "Expresion",
                    state: { opened: true },
                    children: [expresion]
                }, {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.CASE,
            expresion: expresion,
            instrcciones: instrucciones
        };
	},
	nuevodefcase: function(instrucciones) {
		return {
            /* PARA JSTREE */
            text: "Default",
            state: { opened: true },
            children: [
                {
                    text: "Instrucciones",
                    state: { opened: true },
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.DEFAULT,
            instrucciones: instrucciones
        };
	},
	nuevoprint: function(expresionCadena) {
		return {
            /* PARA JSTREE */
            text: "Console.Write",
            state: { opened: true },
            children: [expresionCadena],
            /* DATOS CLASICOS */
            tipo: TIPO_INSTRUCCION.PRINT,
            expresionCadena: expresionCadena
        };
	}
	,

	nuevoreturn: function(valor) {
        return {
            /* PARA JSTREE */
            text: "Return",
            state: { opened: true },
            children: [
                valor
            ],
            /* DATOS CLASICOS */
			tipo: TIPO_INSTRUCCION.RETURN,
			
            valor: valor
        };
	}
	,

	



 
	
}
// Exportamos nuestras constantes y nuestra API

module.exports.TIPO_OPERACION = TIPO_OPERACION;
module.exports.TIPO_INSTRUCCION = TIPO_INSTRUCCION;
module.exports.TIPO_VALOR = TIPO_VALOR;
module.exports.instruccionesAPI = instruccionesAPI;
