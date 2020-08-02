import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  //all printable characters from ASCII 10 to 126
  regEx = /^[\u000A-\u007e]*$/;
  //extended ASCII
  extendedRegEx = /^[\u000A-\u007a\u00a0-\u00ff]*$/;

  constructor() { }

  //validate user input against allowed characters
  validateInput(userInput){
    if(userInput.match(this.regEx)){
      return true;
    }else{
      return false;
    }
  }
  //validate decoding
  validateExtendedInput(userInput){
    if(userInput.match(this.extendedRegEx)){
      return true;
    }else{
      return false;
    }
  }

}
