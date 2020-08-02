import { Component, OnInit } from '@angular/core';
import { AlberticipherService } from './../services/alberticipher.service';
import { ValidationService } from './../services/validation.service';

@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent implements OnInit {
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

  onDecode(){
    //perform text validation
    if(!this.validationService.validateExtendedInput(this.textInput)){
      alert("Restricted characters found in ciphertext!");
      return;
    }
    //perform password validation
    if(!this.validationService.validateInput(this.password)){
      alert("Password contains restricted characters!");
      return;
    }
    //decode text
    var decodedMsg = this.albertiCipherService.decode(this.textInput, this.password);
    if(decodedMsg){
      this.visibleTxt = true;
      this.textOutput = decodedMsg;
    }else{
      this.visibleTxt = false;
      alert("Decoding error!");
    }
  }

}
