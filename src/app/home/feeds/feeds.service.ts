import { Injectable } from '@angular/core';

import { HttpService } from '../../shared/http.service';

import { environment } from '../../../environments/environment';

import { Subject } from 'rxjs';

import { Feed } from './feed.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FeedsService {

  public feeds = new Subject<[Feed]>();

  private backendUrl = environment.BACKEND_URL + 'user/';

  constructor(private httpService: HttpService) { }

  getFeeds(){
    this.httpService.get(this.backendUrl + 'getFeeds').pipe(
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


}
