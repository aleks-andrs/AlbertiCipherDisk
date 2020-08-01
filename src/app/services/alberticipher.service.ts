import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlberticipherService {

  //plain text symbols and commands
  textSymbols = ["\n" ," " ,"!" ,"\"" ,"#" , "$" ,"%" ,"&" ,"'" ,"(" ,")" ,"*" ,
  "+" ,"," ,"-" ,"." ,"/" ,"0" ,"1" ,"2" , "3" ,"4" ,"5" ,"6" ,"7" ,"8" ,
  "9" ,":" ,";" ,"<" ,"=" ,">" ,"?" ,"@" ,"A" , "B" ,"C" ,"D" ,"E" ,"F" ,
  "G" ,"H" ,"I" ,"J" ,"K" ,"L" ,"M" ,"N" ,"O" ,"P" , "Q" ,"R" ,"S" ,"T" ,
  "U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"[" ,"\\" ,"]" ,"^" ,"_" , "`" ,"a" ,"b" ,
  "c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" , "o" ,"p" ,
  "q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"{" ,"|" ,"}" ,"~" ,
  "Ā" ,"Ē" ,"Ī" ,"Ō" ,"Ū" ,"Ĥ"];

  //cipher text symbols
  constantArr = [ "ï" , "D" , "a" , "Ü" , "i" , "d" , "Â" , "l" , "H" , "É" , "õ" ,
  "K" , "E" , "S" , "ò" , "Ô" , "È" , "8" , "G" , "Ý" , "Ò" , "M" , "z" , "ö" , "Ó" ,
  "Ù" , "f" , "ä" , "À" , "Ì" , "W" , "g" , "9" , "j" , "3" , "v" , "B" , "ã" , "5" ,
  "L" , "O" , "7" , "Í" , "o" , "Õ" , "Ï" , "2" , "b" , "î" , "s" , "Ã" , "è" , "x" ,
  "c" , "m" , "X" , "e" , "V" , "q" , "é" , "Z" , "Ê" , "0" , "C" , "í" , "ê" , "R" ,
  "t" , "Ä" , "Ë" , "Y" , "T" , "â" , "k" , "ó" , "w" , "ë" , "n" , "N" , "J" , "4" , 
  "r" , "A" , "Î" , "6" , "ì" , "u" , "Ú" , "ô" , "P" , "F" , "á" , "U" , "Q" , "y" ,
  "Á" , "h" , "à" , "Ö" , "I" , "1" , "p" ]
  cipherTextSymbols = [];

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

  //initial position
  initialDiskPosition: number = 0;

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


  processPassword(pass){
    //compute a hash out of password
    var hash = this.hashCode(pass);
    //set rotation direction depending on the hash value
    if(hash%2 == 0){
      this.isRight = true;
    }
    else{
      this.isRight = false;
    }
    //set rotation indexes
    var indexedNum = hash*314159;
    if(indexedNum < 0){
      indexedNum = indexedNum*(-1);
    }
    var numArray = this.splitDigits(indexedNum);
    if (numArray.length > 6){
      //always increment to avoid getting index 0
      this.Ā = numArray[0] + 1;
      this.Ē = numArray[1] + 1;
      this.Ī = numArray[2] + 1;
      this.Ō = numArray[3] + 1;
      this.Ū = numArray[4] + 1;
      this.Ĥ = numArray[5] + 1;
    }
    //set initial disk position
    var strNumber = numArray[0].toString() + numArray[1].toString();
    this.initialDiskPosition = parseInt(strNumber, 10);
  }


  hashCode(p){
    //calculate hash
    return p.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  }


  splitDigits(n) {
    //split the digits into array
    return Array.from(String(n), Number);
  }

  shiftLeft(){
    //shift disk to the left
    var firstElement = this.cipherTextSymbols.shift();
    this.cipherTextSymbols.push(firstElement);
  }


  shiftRight(){
    //shift disk to the right
    var lastElement = this.cipherTextSymbols.pop();
    this.cipherTextSymbols.unshift(lastElement);
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

  encode(text, ePassword){
    //reset array
    this.cipherTextSymbols = [...this.constantArr];
    //process encoding password
    this.processPassword(ePassword);
    var cipherText = "";
    var i = 0;
    while(i < text.length){
      if(this.textSymbols.includes(text.charAt(i))){
        //set initial disk position
        this.shiftDisk(this.initialDiskPosition);
        //encode
        if(this.rotationCommandChars.includes(text.charAt(i))){
          var cipherText = cipherText + this.cipherTextSymbols[this.textSymbols.indexOf(text.charAt(i))];
          var diskRotationIndex = 1;
          switch(text.charAt(i)){
            case "Ā": diskRotationIndex = this.Ā;
            break;
            case "Ē": diskRotationIndex = this.Ē;
            break;
            case "Ī": diskRotationIndex = this.Ī;
            break;
            case "Ō": diskRotationIndex = this.Ō;
            break;
            case "Ū": diskRotationIndex = this.Ū;
            break;
            case "Ĥ": diskRotationIndex = this.Ĥ;
            break;
          }
          this.shiftDisk(diskRotationIndex);
        }else{
          var cipherText = cipherText + this.cipherTextSymbols[this.textSymbols.indexOf(text.charAt(i))];
        }
      }
      else{
        //encoding error
        return null;
      }
      i++;
    }
    return cipherText;
  }

  decode(cText, dPassword){
    //reset array
    this.cipherTextSymbols = [...this.constantArr];
    //process password
    this.processPassword(dPassword);
    var pText = "";
    var i = 0;
    while(i<cText.length){
      if(this.cipherTextSymbols.includes(cText.charAt(i))){
        //set disk initial position
        this.shiftDisk(this.initialDiskPosition);
        //decode
        var currentSymbol = this.textSymbols[this.cipherTextSymbols.indexOf(cText.charAt(i))];
        if(this.rotationCommandChars.includes(currentSymbol)){
          var diskRotationIndex = 1;
          switch(currentSymbol){
            case "Ā": diskRotationIndex = this.Ā;
            break;
            case "Ē": diskRotationIndex = this.Ē;
            break;
            case "Ī": diskRotationIndex = this.Ī;
            break;
            case "Ō": diskRotationIndex = this.Ō;
            break;
            case "Ū": diskRotationIndex = this.Ū;
            break;
            case "Ĥ": diskRotationIndex = this.Ĥ;
            break;
          }
          this.shiftDisk(diskRotationIndex);
        }else{
          pText = pText + currentSymbol;
        }
      }else{
        //decoding error
        return null;
      }
      i++;
    }
    return pText;
  }
}
