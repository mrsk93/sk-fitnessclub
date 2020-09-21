import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // @ViewChild("modalTitle", {static: true}) modalTitle;

  // @ViewChild("modalBody", {static: true}) modalBody;

  @Input() title: string;

  @Input() body: string;

  @Output() okay = new EventEmitter<null>();

  @Output() cancel = new EventEmitter<null>();

  @Output() cross = new EventEmitter<null>();


  @ViewChild("button",{static: true}) button: any;

  constructor() { }

  ngOnInit() {
    // this.modalTitle.nativeElement.innerHTML = this.title;
      // this.modalBody.nativeElement.innerHTML = this.body;
    this.button.nativeElement.click();
  }

  yesSelected(){
    this.okay.emit(null);
  }

  noSelected() {
    this.cancel.emit(null);
  }

  crossSelected() {
    this.cross.emit(null);
  }

}
