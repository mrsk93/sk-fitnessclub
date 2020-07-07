import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Feed } from 'src/app/home/feeds/feed.model';
import { FeedsTableService } from "src/app/admin/manage-feeds/feeds-table/feeds-table.service";

@Injectable({providedIn: 'root'})
export class CreateFeedService {

  private backendUrl = environment.BACKEND_URL + 'admin/';

  constructor(private http: HttpService,
     private router: Router,
     private feedsTableService: FeedsTableService,
     private toastrService: ToastrService ) { }

  createFeed(data: Feed){
    const feedData = new FormData();
    feedData.append("title",data.title);
    feedData.append("description",data.description);
    feedData.append("path",data.path,data.title);
    this.feedsTableService.isLoading.next(true);
    this.http.post(this.backendUrl + 'createFeed',feedData).subscribe(response => {
      this.toastrService.success('Your Feed was created Successfully', response.message,{positionClass:'toast-top-center'});
      this.feedsTableService.getFeeds();
    },
    error=> {
      this.toastrService.error('Feed could not be created', error.error.message,{positionClass:'toast-top-center'});
    });
  }

  getFeed(feedId: string) {
    return this.http.getById(this.backendUrl + 'getFeed/' , feedId);
  }

  updateFeed(feedId: string, data: Feed) {
    let feedData: Feed | FormData;
    if (typeof data.path === "object") {
      feedData = new FormData();
      feedData.append("id", feedId);
      feedData.append("title", data.title);
      feedData.append("description", data.description);
      feedData.append("path", data.path, data.title);
    } else {
      feedData = {
        id: feedId,
        title: data.title,
        description: data.description,
        path: data.path
      };
    }
    this.feedsTableService.isLoading.next(true);
    this.http.put(this.backendUrl + 'updateFeed/', feedId, feedData).subscribe(response => {
      this.toastrService.success('Your feed was updated successfully', response.message,{positionClass:'toast-top-center'});
      this.router.navigate(['admin','feeds']);
      this.feedsTableService.getFeeds();
    });
  }

}
