import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  exports: []
})

export class AuthModule { }
