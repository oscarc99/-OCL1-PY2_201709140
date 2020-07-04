/*------------------------------------------------IMPORTS----------------------------------------------*/
%{
	let TIPO_OPERACION	= require('./instrucciones').TIPO_OPERACION;
	let TIPO_VALOR 		= require('./instrucciones').TIPO_VALOR;
	let instruccionesAPI	= require('./instrucciones').instruccionesAPI;
        let CErrores=require('./errores');
        let CNodoError=require('./nodoError');
%}


/* Definición Léxica */
%lex


%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas



"string"		return 'tstring';
"int"			return 'tint';
"bool"		        return 'tbool';
"char"		        return 'tchar';
"double"	        return 'tdouble';

"--"			return 'tdecren';
"++"			return 'taumen';
"=="			return 'igualdad';
"="	    		return 'tigual';
"+"		    	return 'tsuma';
"-"		    	return 'tresta';
"*"		    	return 'tmul';
"/"		    	return 'tdiv';


">="			return 'tmayori';
"<="			return 'tmenori';
"!="			return 'noigualdad';
">"		    	return 'tmayor';
"<"			    return 'tmenor';

"&&"			return 'tand';
"||"			return 'tor';

"Console.Write"  return 'tprint';
"continue"    return 'tcontinue';
"!"			    return 'tnot';

"if"				return 'tif';
"else"				return 'telse';
"switch"			return 'tswitch';
"case"				return 'tcase';
"default"			return 'tdefault';
"while"				return 'twhile';
"do"				return 'tdo';
"for"				return 'tfor';
"break"				return 'tbreak';
"return"                        return 'treturn';

"main"				return 'tmain';
"void"				return 'tvoid';
"true"                          return'ttrue';
"false"                         return'tfalse';
":"					return 'dospuntos';
";"					return 'puntocoma';
","					return 'coma';
"{"					return 'llavea';
"}"					return 'llavec';
"("					return 'para';
")"					return 'parc';


[\'][^\'\n][\']      {   yytext = yytext.substr(1,yyleng-2);return 'char';   }
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'HTML'; }
[0-9]+("."[0-9]+)\b  	                return 'decimal';
[0-9]+\b				return 'entero';
([a-zA-Z_])[a-zA-Z0-9_]*	        return 'id';


[ \t\r\n\f] %{ /*se ignoran*/ %}



<<EOF>>				return 'EOF';
.	 CErrores.errores.addError(new CNodoError.nodoError("LEXICO","No se esperaba el caracter: "+yytext,yylineno,yytext))
/lex

/*--------------------------------------------------SINTACTICO-----------------------------------------------*/

/*-----ASOCIACION Y PRECEDENCIA-----*/
%left tsuma tresta igualdad noigualdad EXP
%left tmul tdiv  tmenor tmayor condicion
%left tmayori tmenori 
%left para parc tand tor 
%left tnot 


%start ini

%% /* Definición de la gramática */

ini
	: cuerpovoid EOF {return $1;}
;


cuerpo: cuerpo cuerpoc { $1.push($2); $$ = $1; }
      | cuerpoc { $$ = [$1]; }
      ;

cuerpoc: tipoDato ids valores {$$=instruccionesAPI.declaracion($1,$2,$3);}
        | cuerpovoid {$$=$1}
        | tvoid tmain para  parc llavea cuerpovoid llavec { $$= instruccionesAPI.funcionmain($6);}
        | tvoid id para parametro parc llavea cuerpovoid llavec { $$= instruccionesAPI.funcionvoid($2,$4,$7);}
        | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,this._$.first_column));  }
          
 ;
funcion:  parametro parc llavea cuerpovoid llavec { $$= instruccionesAPI.funcion($1,$4);}
       | param  parc  help  { $$= instruccionesAPI.nuevaLlamada($1);}
       ;

help: puntocoma
    |;

       

param : param coma EXP {$1.push($3) ; $$=$1;}
      | EXP  {$$=[$1];}
      | {$$="";}
      ;
       

parametro: parametro coma parametrox{ $1.push($3) ; $$=$1;}
          |parametrox  {$$=[$1];}
          | {$$="";}
        ;

param :   EXP {$$=instruccionesAPI.param($1); }
      | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }
          
;

parametrox: tipoDato id {$$=instruccionesAPI.parametro($1,$2); }
          | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }
          
;
cuerpovoid: cuerpovoid cuerpovoidx {$1.push($2);$$=$1;}
          | cuerpovoidx {$$=[$1];}
          | {$$ = "" }
;


cuerpovoidx: tif para condicion parc llavea cuerpovoid llavec elses { $$=instruccionesAPI.nuevoif($3,$6,$8); }
            |tipoDato ids valores {$$=instruccionesAPI.declaracion($1,$2,$3);}
            |id valores {$$=instruccionesAPI.variable($1,$2);}
            | twhile para condicion parc llavea cuerpovoid llavec { $$=instruccionesAPI.nuevowhile($3,$6); }
            | tdo llavea cuerpovoid llavec  twhile para condicion parc puntocoma { $$=instruccionesAPI.nuevodo($3,$7);} 

            | tfor para idfor condicion puntocoma  id cambioid parc llavea cuerpovoid llavec  { $$=instruccionesAPI.nuevofor($3,$4,$6,$7,$10);} 

            | tswitch para EXP parc llavea casos llavec {$$=instruccionesAPI.nuevoswitch($3,$6);}
            | tprint para EXP parc puntocoma { $$= instruccionesAPI.nuevoprint ($3);} 
            | tvoid tmain para  parc llavea cuerpovoid llavec { $$= instruccionesAPI.funcionmain($6);}
            | tvoid id para parametro parc llavea cuerpovoid llavec { $$= instruccionesAPI.funcionvoid($2,$4,$7);}
            | tcontinue puntocoma {$$=$1}
            | tbreak  puntocoma {$$=$1}
            | treturn treturnc {$$=$1}
            | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }
 ;
casos: casos nuevocaso{$1.push($2);$$=$1;} 
       | nuevocaso {$$=[$1];}
       ;
nuevocaso: tcase EXP dospuntos cuerpocase {$$=instruccionesAPI.nuevocase($2,$4);}
        | tdefault  dospuntos cuerpocase {$$=instruccionesAPI.nuevodefcase($3);}
        | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }

        ;
cuerpocase: cuerpocase cuerpocasex {$1.push($2);$$=$1;}
          | cuerpocasex {$$=[$1];}
 ;
cuerpocasex:  tif para condicion parc llavea cuerpovoid llavec elses { $$=instruccionesAPI.nuevoif($3,$6,$8); }
            | tipoDato ids valores {$$=instruccionesAPI.declaracion($1,$2,$3);}
            | id valores {$$=instruccionesAPI.variable($1,$2);}
            | twhile para condicion parc llavea cuerpovoid llavec { $$=instruccionesAPI.nuevowhile($3,$6); }
            | tdo llavea cuerpo llavec  twhile para condicion parc puntocoma { $$=instruccionesAPI.nuevodo($3,$7);} 
            | tfor para idfor condicion puntocoma  id cambioid parc llavea cuerpovoid llavec  { $$=instruccionesAPI.nuevofor($3,$4,$7,$10);} 
            | tswitch para EXP parc llavec casos llavea {$$=instruccionesAPI.nuevoswitch($3,$6);}
            | tprint para EXP parc puntocoma { $$= instruccionesAPI.nuevoprint ($3);} 
            | tprintln para EXP parc puntocoma { $$= instruccionesAPI.nuevoprintln ($3);} 
            | tcontinue puntocoma {$$=instruccionesAPI.nuevocontinue();}
            | treturn treturnc {$$=instruccionesAPI.nuevoreturn($2);}
            | tbreak  puntocoma {$$=$1}
            | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }
 ;
treturnc: EXP puntocoma{$$=$1;}
        |puntocoma{$$="";}
        ;
cambioid:taumen{$$=$1}
         |tdecren{$$=$1}
         ;
            
idfor:  tipoDato ids valores {$$=instruccionesAPI.declaracion($1,$2,$3);}
        | id valores {$$=instruccionesAPI.variable($1,$2);}
        | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }

        ;
elses: telse tipodeelse{ $$=$2;}
       |{$$="";}
       ;
tipodeelse:llavea cuerpovoid llavec {$$= instruccionesAPI.nuevoelse($2);}
        |  tif para condicion parc llavea cuerpovoid llavec elses { $$=instruccionesAPI.nuevoif($3,$6,$8); }
         | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }

;

/*------------------------------------------------COMPONER condicion -----------------------------------------------*/

condicion:condicion tmayor condicion {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYORQUE); }
         |condicion tmayori condicion  {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MAYORIGUAL); }
         |condicion tmenor condicion   {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENORQUE); }
         |condicion tmenori condicion  {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MENORIGUAL); }
         |condicion igualdad condicion {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIGUAL); }
         |condicion noigualdad condicion {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.NOIGUAL); }
         |condicion tand condicion {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.AND); }
         |condicion tor condicion {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.OR); }
         |tnot condicion {   $$=instruccionesAPI.nuevonot($2);}
         |EXP {$$=$1;}
         | para condicion parc{$$=$2;}
         | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }

        ;
tipoDato:tint {$$=TIPO_VALOR.INT;}
 |tstring{$$=TIPO_VALOR.STRING;}
 |tbool{$$=TIPO_VALOR.BOOL;}
 |tchar{$$=TIPO_VALOR.CHAR;}
 |tdouble{$$=TIPO_VALOR.DOUBLE;}
;
 
ids: ids coma idr { $1.push($3) ; $$=$1;}
   | idr  {$$=[$1];}
 ;
idr: id {$$=instruccionesAPI.nuevoid($$=$1);}
    | error { $$=instruccionesAPI.nuevoError($1); CErrores.errores.addError(new CNodoError.nodoError("SINTACTICO","No se esperaba el token: "+yytext,this._$.first_line,yytext));  }

 ;
/*------------------------------------------------COMPONER LO VALORES -----------------------------------------------*/
valores: puntocoma{$$=" ";}
       | tigual EXP puntocoma{$$=$2;} 
       | para funcion {$$=$2;}
       | taumen puntocoma {$$=1}
       | tdecren puntocoma {$$=1}

       ;
EXP: para EXP parc   {  $$=$2; }
    |tresta entero %prec UTresta  {  $$ = instruccionesAPI.nuevoValor(Number($2), TIPO_VALOR.NUMERONEG);  }	
    |EXP tdiv EXP             {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.DIVISION); }
    |EXP tmul EXP             {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.MULTIPLICACION); }
    |EXP tsuma EXP            {  $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.SUMA); }
    |EXP tresta EXP          { $$ = instruccionesAPI.nuevoOperacionBinaria($1, $3, TIPO_OPERACION.RESTA); }
    |decimal                 { $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO); }
    |entero                  {  $$ = instruccionesAPI.nuevoValor(Number($1), TIPO_VALOR.NUMERO);  }
    |char                  {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CHAR);  }
    |id   {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.ID);  }
    |cadena  {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA);  }
    |HTML    {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.HTML);  }
    |ttrue    {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.BOOL);  }
    |tfalse  {  $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.BOOL);  }
    |id para idx parc {  $$ = instruccionesAPI.nuevalorfunc($1,$3);  }
    
    ;

idx: idex {$$=$1}
| {""}
;

idex: idex coma idxr { $1.push($3) ; $$=$1;}
| idxr  {$$=[$1];}
;

idxr: condicion {$$=instruccionesAPI.nuevoid($1);}
;