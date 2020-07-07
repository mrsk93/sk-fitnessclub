import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSlidesComponent } from './manage-slides/manage-slides.component';
import { ManageFeedsComponent } from './manage-feeds/manage-feeds.component';
import { ManageMailsComponent } from './manage-mails/manage-mails.component';
import { CreateSlideComponent } from './manage-slides/create-slide/create-slide.component';
import { CreateFeedComponent } from './manage-feeds/create-feed/create-feed.component';
import { SlidesTableComponent } from './manage-slides/slides-table/slides-table.component';
import { FeedsTableComponent } from './manage-feeds/feeds-table/feeds-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
  AdminComponent,
  SidebarComponent,
  DashboardComponent,
  ManageSlidesComponent,
  ManageFeedsComponent,
  ManageMailsComponent,
  CreateSlideComponent,
  CreateFeedComponent,
  SlidesTableComponent,
  FeedsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  exports: []
})

export class AdminModule { }
