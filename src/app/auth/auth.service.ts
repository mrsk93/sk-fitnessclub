import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private backendUrl = environment.BACKEND_URL + 'auth/';
  public authStatus: boolean = false;
  public isAuthenticated = new Subject<boolean>();
  public token: string = null;
  public tokenTimer;

  constructor(private http: HttpService,
    private toastr: ToastrService,
    private router: Router) { }

  login(data: any){
    this.http.post(this.backendUrl + 'login', data).subscribe(response => {
      this.toastr.success("Welcome Back Admin!", "Logged In Successfully!!!", {positionClass:'toast-top-center'});
      this.token = response.token;
      let expirationTime:number;
      expirationTime = Date.now() + response.expirationTime;
      this.setTokenTimer(expirationTime);
      this.saveToken(this.token,expirationTime);
      this.isAuthenticated.next(true);
      this.authStatus = true;
      this.router.navigate(['/admin']);
      console.log(response.token);
    },
    error => {
      this.toastr.error("Please Provide Valid Credentials", error.error.message, {positionClass:'toast-top-center'});
      this.isAuthenticated.next(false);
      this.authStatus = false;
    });
  }

  getAuthStatus(){
    return this.authStatus;
  }

  setTokenTimer(expirationTime){
    let timer = expirationTime - Date.now();
    this.tokenTimer = setTimeout(()=>{
        this.deleteToken();
        this.logOut();
        this.toastr.info("You are logged out & redirected to home page!", 'Token Expired!!!', {positionClass:'toast-top-center',disableTimeOut:true,closeButton:true});
      },
    timer);
  }

  saveToken(token,expirationTime){
    localStorage.setItem("token",token);
    localStorage.setItem("expirationTime",expirationTime);
  }

  fetchTokenAndSetTimer(){
    if(localStorage.getItem("token")){
      const token = localStorage.getItem("token");
      const expirationTime = +localStorage.getItem("expirationTime");
      this.token = token;
      this.setTokenTimer(expirationTime);
      this.isAuthenticated.next(true);
      this.authStatus = true;
    }
  }

  deleteToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  }

  logOut(){
    this.deleteToken();
    this.isAuthenticated.next(false);
    this.authStatus = false;
    this.token = null;
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }
}
