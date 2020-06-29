import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageSlidesComponent } from './admin/manage-slides/manage-slides.component';
import { ManageFeedsComponent } from './admin/manage-feeds/manage-feeds.component';
import { ManageMailsComponent } from './admin/manage-mails/manage-mails.component';
import { CreateSlideComponent } from './admin/manage-slides/create-slide/create-slide.component';
import { CreateFeedComponent } from './admin/manage-feeds/create-feed/create-feed.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "admin", component: AdminComponent, children: [
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
  { path: "auth", component: AuthComponent },
  { path: "home", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
