import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlberticipherService {
  //plain text symbols and commands
  textSymbols = ["A1" ,"A2" ,"A3" ,"A4" ,"A5" ,"A6" ," " ,"!" ,"\"" ,"#" ,
  "$" ,"%" ,"&" ,"'" ,"(" ,")" ,"*" ,"+" ,"," ,"-" ,"." ,"/" ,"0" ,"1" ,"2" ,
  "3" ,"4" ,"5" ,"6" ,"7" ,"8" ,"9" ,":" ,";" ,"<" ,"=" ,">" ,"?" ,"@" ,"A" ,
  "B" ,"C" ,"D" ,"E" ,"F" ,"G" ,"H" ,"I" ,"J" ,"K" ,"L" ,"M" ,"N" ,"O" ,"P" ,
  "Q" ,"R" ,"S" ,"T" ,"U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"[" ,"\\" ,"]" ,"^" ,"_" ,
  "`" ,"a" ,"b" ,"c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" ,
  "o" ,"p" ,"q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"{" ,"|" ,"}" ,"~"];

  //cipher text symbols
  cipherTextSymbols = ["u" ,"0" ,"t" ,"K" ,"e" ,"g" ,"[" ,"X" ,"~" ,"ć" ,
  "F" ,"%" ,"I" ,"o" ,"q" ,"Ú" ,"6" ,"r" ,"Q" ,"ě" ,"h" ,"p" ,"|" ,"E" ,"ó" ,
  "d" ,"b" ,"s" ,"i" ,")" ,"l" ,"5" ,"B" ,"f" ,"^" ,"2" ,"\\" ,"n" ,"\"" ,":" ,
  "}" ,"ģ" ,"G" ,"S" ,"1" ,"]" ,"R" ,"<" ,"y" ,"Z" ,"N" ,"." ,"c" ,"/" ,"&" ,
  "(" ,"a" ,"#" ,"k" ,";" ,"W" ,"D" ,"?" ,"w" ,"U" ,"P" ,"@" ,"T" ,"v" ,"9" ,
  "," ,"3" ,"O" ,"!" ,"z" ,"j" ,"A" ,"7" ,"J" ,"Õ" ,"-" ,"*" ,"8" ,"{" ,"H" ,
  "V" ,"x" ,"m" ,"$" ,"`" ,"_" ,"L" ,"=" ,">" ,"+" ,"Á" ,"C" ,"Y" ,"4" ,"'" ,"M"];

  constructor() { }

  shiftLeft(){
    //shift symbols to the left
    var i=0;
    while(i<1){
      var firstElement = cipherTextSymbols.shift();
      cipherTextSymbols.push(firstElement);
      i++;
    }
  }

  shiftRight(){
    //shift symbols to the right
    var i=0;
    while(i<1){
      var lastElement = cipherTextSymbols.pop();
      cipherTextSymbols.unshift(lastElement);
      i++;
    }
  }
}
