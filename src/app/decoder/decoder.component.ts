import { Component, OnInit } from '@angular/core';
import { AlberticipherService } from './../services/alberticipher.service';

@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent implements OnInit {
  textInput: string;

  constructor(
    private albertiCipherService: AlberticipherService
  ) { }

  ngOnInit(): void {
  }

  onDecode(){
    //text validation


    //decode text
    var decodedMsg = this.albertiCipherService.decode(this.textInput);
    alert(decodedMsg);

  }

}
