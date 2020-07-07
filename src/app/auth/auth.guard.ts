import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean|UrlTree {
    const authStatus=this.authService.getAuthStatus();
      if(authStatus){
        return true;
      }
    this.toastr.error("You are not authorised to access!!!","Unauthenticated!!!",{positionClass:'toast-top-center'})
    return this.router.createUrlTree(["/"]);
  }
}
