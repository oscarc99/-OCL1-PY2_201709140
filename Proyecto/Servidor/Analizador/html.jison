/* Definición Léxica */

%{
	let instruccionesAPI	= require('./inst').instruccionesAPI;
    
%}

%lex


%%

\s+
"style"         return 'tstyle';
"<html>"        return 'ahml';
"<h1>"        return 'ah1';
"<h2>"        return 'ah2';
"<h3>"        return 'ah3';
"<h4>"        return 'ah4';
"<head>"        return 'ahead';
"<title>"       return 'atitle';
"<br>"          return 'br';
"<p>"           return 'ap';
"body"          return 'tbody';
"div"           return 'tdiv';
"</h1>"        return 'ch1';
"</h2>"        return 'ch2';
"</h3>"        return 'ch3';
"</h4>"        return 'ch4';
"<button>"      return 'abutton';
"<input>"      return 'input';
"</button>"      return 'cbutton';
"<label>"      return 'alabel';
"</label>"      return 'clabel';
"</html>"       return 'chml';
"</head>"        return 'chead';
"</title>"       return 'ctitle';
"</p>"           return 'cp';
"</div>"        return 'cdiv';
"</body>"        return 'cbody';
"="             return 'igual';


"\"background:yellow\""          return 'yellow';
"\"background:green\""           return 'green';
"\"background:blue\""            return 'blue';
"\"background:white\""         return 'white';
"\"background:skyblue\""       return 'skyblue';
"\"background:red\""       return 'red';
"<"             return 'menor';
">"             return 'mayor';
"="             return 'igual';
[0-9]+("."[0-9]+)\b  	                return 'decimal';
[0-9]+\b				return 'entero';
([a-zA-Z_])[a-zA-Z0-9_]*	        return 'id';
[ \t\r\n\f] %{ /*se ignoran*/ %}

.               return 'texto';

<<EOF>>				return 'EOF';

/lex

%left cbody chead
%left chml


%start ini

%% /* Definición de la gramática */


ini
	: cuerpovoid EOF {return $1;}
;
cuerpovoid: cuerpovoid cuerpovoidx {$1.push($2);$$=$1;}
          | cuerpovoidx {$$=[$1];}
          | {$$ = "" }
;


cuerpovoidx: ahead cuerpovoid chead {$$=instruccionesAPI.head($2);}
   | ahml cuerpovoid chml {$$=instruccionesAPI.html($2);}
   | atitle cuerpovoid ctitle  {$$=instruccionesAPI.title($2);}
   | ap cuerpovoid cp  {$$=instruccionesAPI.p($2);}
   | ah1 cuerpovoid ch1  {$$=instruccionesAPI.h1($2);}
   | ah2 cuerpovoid ch2  {$$=instruccionesAPI.h2($2);}
   | ah3 cuerpovoid ch3  {$$=instruccionesAPI.h3($2);}
   | ah4 lista ch4  {$$=instruccionesAPI.h4($2);}
   | abutton lista cbutton  {$$=instruccionesAPI.button($2);}
   | alabel lista clabel  {$$=instruccionesAPI.label($2);}
   | body {$$ = $1 }
   | div {$$ = $1 }
   | texto {$$ = $1 } 
   | input {$$=instruccionesAPI.input();}
   | br {$$=instruccionesAPI.br();}
   | entero {$$ = $1 } 
   | decimal{$$ = $1 } 
   | id{$$ = $1 } 
   
   ;

body: menor tbody bbody {$$=$1}; 

div: menor tdiv ddiv {$$=$1};     

bbody: tstyle igual color mayor lista cbody {$$=instruccionesAPI.bodyC($3,$5);}
     | mayor lista cbody {$$=instruccionesAPI.bodyS($2);};

ddiv:  tstyle igual color mayor lista cdiv {$$=instruccionesAPI.divC($3,$5);}
     | mayor lista cdiv {$$=instruccionesAPI.divS($2);};


color: yellow {$$=$1}
     | green {$$=$1}
     | blue {$$=$1}
     | red {$$=$1}
     | white {$$=$1}
     | skyblue {$$=$1};