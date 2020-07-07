import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit,OnDestroy {

  isCollapsed = true;
  isAuthenticated = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
    this.authService.fetchTokenAndSetTimer();
  }

  onLogOut(){
    this.authService.logOut();
    this.isAuthenticated = false;
    this.toastr.show("Please Login Again for managing your app!", 'You are now logged out!', {positionClass:'toast-top-center'});
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
