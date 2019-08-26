import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inquiries-form',
  templateUrl: './inquiries-form.component.html',
  styleUrls: ['./inquiries-form.component.css']
})
export class InquiriesFormComponent {


  @Input() formOn: boolean
  @Output() formOnChange = new EventEmitter<boolean>();

  disableForm() {
    this.formOn=false;
    this.formOnChange.emit(false);
  }



}
