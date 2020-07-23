import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlberticipherService {

  //plain text symbols and commands
  textSymbols = [" " ,"!" ,"\"" ,"#" , "$" ,"%" ,"&" ,"'" ,"(" ,")" ,"*" ,
  "+" ,"," ,"-" ,"." ,"/" ,"0" ,"1" ,"2" , "3" ,"4" ,"5" ,"6" ,"7" ,"8" ,
  "9" ,":" ,";" ,"<" ,"=" ,">" ,"?" ,"@" ,"A" , "B" ,"C" ,"D" ,"E" ,"F" ,
  "G" ,"H" ,"I" ,"J" ,"K" ,"L" ,"M" ,"N" ,"O" ,"P" , "Q" ,"R" ,"S" ,"T" ,
  "U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"[" ,"\\" ,"]" ,"^" ,"_" , "`" ,"a" ,"b" ,
  "c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" , "o" ,"p" ,
  "q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"{" ,"|" ,"}" ,"~" ,
  "Ā" ,"Ē" ,"Ī" ,"Ō" ,"Ū" ,"Ĥ"];

  //cipher text symbols
  cipherTextSymbols = ["u" ,"0" ,"t" ,"K" ,"e" ,"g" ,"[" ,"X" ,"~" ,"ć" ,
  "F" ,"%" ,"I" ,"o" ,"q" ,"Ú" ,"6" ,"r" ,"Q" ,"ě" ,"h" ,"p" ,"|" ,"E" ,"ó" ,
  "d" ,"b" ,"s" ,"i" ,")" ,"l" ,"5" ,"B" ,"f" ,"^" ,"2" ,"\\" ,"n" ,"\"" ,":" ,
  "}" ,"ģ" ,"G" ,"S" ,"1" ,"]" ,"R" ,"<" ,"y" ,"Z" ,"N" ,"." ,"c" ,"/" ,"&" ,
  "(" ,"a" ,"#" ,"k" ,";" ,"W" ,"D" ,"?" ,"w" ,"U" ,"P" ,"@" ,"T" ,"v" ,"9" ,
  "," ,"3" ,"O" ,"!" ,"z" ,"j" ,"A" ,"7" ,"J" ,"Õ" ,"-" ,"*" ,"8" ,"{" ,"H" ,
  "V" ,"x" ,"m" ,"$" ,"`" ,"_" ,"L" ,"=" ,">" ,"+" ,"Á" ,"C" ,"Y" ,"4" ,"'" ,"M"];

  //rotation command characters
  rotationCommandChars = "ĀĒĪŌŪĤ";

  //rotation indexes
  Ā: number = 1;
  Ē: number = 2;
  Ī: number = 3;
  Ō: number = 4;
  Ū: number = 5;
  Ĥ: number = 6;

  //rotation direction
  isRight: Boolean = true;

  constructor() { }

  addRotationCommands(text){
    var newText = "";
    var i = 0;
    while(i<text.length){
      //randomly add a rotation command to original plaintext
      var randomBoolean = Math.random() >= 0.66;
      if(randomBoolean){
        newText = newText + this.rotationCommandChars.charAt(Math.floor(Math.random() * 6)) + text.charAt(i);
      }else{
        newText = newText + text.charAt(i);
      }
      i++;
    }
    return newText;
  }


  shiftLeft(){
    //shift disk to the left
    var i = 0;
    while(i < 1){
      var firstElement = this.cipherTextSymbols.shift();
      this.cipherTextSymbols.push(firstElement);
      i++;
    }
  }


  shiftRight(){
    //shift disk to the right
    var i = 0;
    while(i < 1){
      var lastElement = this.cipherTextSymbols.pop();
      this.cipherTextSymbols.unshift(lastElement);
      i++;
    }
  }

  shiftDisk(rotationIndex){
    var i = 0;
    //rotate left or right using preset rotationIndexes
    if(this.isRight){
      while(i < rotationIndex){
        this.shiftRight();
        i++;
      }
    }else{
      while(i < rotationIndex){
        this.shiftLeft();
        i++;
      }
    }
  }

  encode(text){
    var cipherText = "";
    var i = 0;
    while(i < text.length){
      if(this.textSymbols.includes(text.charAt(i))){
        //set initial disk position in here
        
        //try hashsum?




        if(this.rotationCommandChars.includes(text.charAt(i))){
          var cipherText = cipherText + this.cipherTextSymbols[this.textSymbols.indexOf(text.charAt(i))];
          var rotationPosititions = 1;
          switch(text.charAt(i)){
            case "Ā": rotationPosititions = this.Ā;
            break;
            case "Ē": rotationPosititions = this.Ē;
            break;
            case "Ī": rotationPosititions = this.Ī;
            break;
            case "Ō": rotationPosititions = this.Ō;
            break;
            case "Ū": rotationPosititions = this.Ū;
            break;
            case "Ĥ": rotationPosititions = this.Ĥ;
            break;
          }
          this.shiftDisk(rotationPosititions);
        }else{
          var cipherText = cipherText + this.cipherTextSymbols[this.textSymbols.indexOf(text.charAt(i))];
        }
      }
      else{
        return null;
      }
      i++;
    }
    return cipherText;
  }
}
