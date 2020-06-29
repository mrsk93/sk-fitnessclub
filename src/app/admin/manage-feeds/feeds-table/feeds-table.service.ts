import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Feed } from 'src/app/home/feeds/feed.model';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FeedsTableService {

  public feeds = new Subject<Feed[]>();
  private backendUrl = environment.BACKEND_URL + 'admin/';

  constructor(private httpService: HttpService,
      private toastrService: ToastrService) { }

  getFeeds() {
    this.httpService.get(this.backendUrl + 'getFeeds?admin=true')
      .pipe(
        map(responseData => {
          return {
            feeds: responseData.feedsData.map(feed => {
              return {
                id: feed._id,
                title: feed.title,
                description: feed.description,
                path: feed.path
              }
            }
            )
            .reverse()
          };
        }
        )
      )
      .subscribe(response => {
        this.feeds.next(response.feeds);
    });
  }

  deleteFeed(id: string){
    this.httpService.delete(this.backendUrl + 'deleteFeed/', id).subscribe(response => {
      this.toastrService.success('Feed Deleted!',response.message,{positionClass: 'toast-top-center'});
      this.getFeeds();
    });
  }

}
