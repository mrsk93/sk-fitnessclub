import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { FeedsComponent } from './home/feeds/feeds.component';
import { ContactComponent } from './home/contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageSlidesComponent } from './admin/manage-slides/manage-slides.component';
import { ManageFeedsComponent } from './admin/manage-feeds/manage-feeds.component';
import { ManageMailsComponent } from './admin/manage-mails/manage-mails.component';
import { CreateSlideComponent } from './admin/manage-slides/create-slide/create-slide.component';
import { CreateFeedComponent } from './admin/manage-feeds/create-feed/create-feed.component';
import { SlidesTableComponent } from './admin/manage-slides/slides-table/slides-table.component';
import { FeedsTableComponent } from './admin/manage-feeds/feeds-table/feeds-table.component';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    FeedsComponent,
    ContactComponent,
    AdminComponent,
    AuthComponent,
    SidebarComponent,
    DashboardComponent,
    ManageSlidesComponent,
    ManageFeedsComponent,
    ManageMailsComponent,
    CreateSlideComponent,
    CreateFeedComponent,
    SlidesTableComponent,
    FeedsTableComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
