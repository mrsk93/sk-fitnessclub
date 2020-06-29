import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from "./contact.service";
import { QueryData } from './query.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm){
    if(!form.valid){
      return;
    };
    const formData: QueryData = form.form.value;
    console.log(formData);
    this.contactService.createQuery(formData);
    form.resetForm();
  }
}
