import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSlidesComponent } from './manage-slides/manage-slides.component';
import { ManageFeedsComponent } from './manage-feeds/manage-feeds.component';
import { ManageMailsComponent } from './manage-mails/manage-mails.component';
import { CreateSlideComponent } from './manage-slides/create-slide/create-slide.component';
import { CreateFeedComponent } from './manage-feeds/create-feed/create-feed.component';

const routes: Routes = [
  { path: "", component: AdminComponent,  children: [
    {path: "", component: DashboardComponent},
    {path: "slides", component: ManageSlidesComponent, children: [
      {path: "", component: CreateSlideComponent},
      {path: "edit/:id", component: CreateSlideComponent}
    ]},
    {path: "feeds", component: ManageFeedsComponent, children: [
      {path: "", component: CreateFeedComponent},
      {path: "edit/:id", component: CreateFeedComponent}
    ]},
    {path: "mails", component: ManageMailsComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
