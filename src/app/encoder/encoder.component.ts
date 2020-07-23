import { Component, OnInit } from '@angular/core';
import { AlberticipherService } from './../services/alberticipher.service';

@Component({
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent implements OnInit {
  textInput: string;

  constructor(
    private albertiCipherService: AlberticipherService
  ) { }

  ngOnInit(): void {

  }

  onEncode(){
    //perform a text validation


    //process password and add rotation commands
    var extendedPlainText = this.albertiCipherService.addRotationCommands(this.textInput);
    //encode the plaintext and return ciphertext
    var cipherText = this.albertiCipherService.encode(extendedPlainText);
    if(cipherText){
      alert(cipherText);
    }else{
      alert("Encoding error!");
    }

  }
}
