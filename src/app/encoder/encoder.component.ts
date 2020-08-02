import { Component, OnInit } from '@angular/core';
import { AlberticipherService } from './../services/alberticipher.service';
import { ValidationService } from './../services/validation.service';

@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent implements OnInit {
  textInput: string;
  textOutput: string;
  password: string;
  public visibleTxt = false;
  constructor(
    private albertiCipherService: AlberticipherService,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {

  }

  onEncode(){
    //perform text validation
    if(!this.validationService.validateInput(this.textInput)){
      alert("Restricted characters used in plaintext!");
      return;
    }
    //perform password validation
    if(!this.validationService.validateInput(this.password)){
      alert("Password contains restricted characters!");
      return;
    }
    //process password and add rotation commands
    var extendedPlainText = this.albertiCipherService.addRotationCommands(this.textInput);
    //encode the plaintext and return ciphertext
    var cipherText = this.albertiCipherService.encode(extendedPlainText, this.password);
    if(cipherText){
      this.visibleTxt = true;
      this.textOutput = cipherText;
    }else{
      this.visibleTxt = false;
      alert("Encoding error!");
    }

  }
}
