import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { CarouselModule, CarouselConfig } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HomeComponent } from "./home.component";
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { FeedsComponent } from './feeds/feeds.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    FeedsComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HomeRoutingModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ],
  exports: []
})

export class HomeModule { }
