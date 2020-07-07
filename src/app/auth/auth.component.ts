import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoading:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(authStatus=> {
      this.isLoading = false;
    });
  }

  onFormSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    this.isLoading=true;
    this.authService.login(form.form.value);
  }
}
