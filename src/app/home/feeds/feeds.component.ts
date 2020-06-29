import { Component, OnInit, OnDestroy } from '@angular/core';

import { Feed } from './feed.model';
import { FeedsService } from './feeds.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit,OnDestroy {
  // public feeds: Feed[] = [
  //   { title: "First Feed", description: "Nulla vitae elit libero, a pharetra augue mollis interdum.", path:"../../assets/img/avatar-1.png" },
  //   { title: "Second Feed", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", path:"../../assets/img/avatar-2.png" },
  //   { title: "Third Feed", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", path:"../../assets/img/avatar-3.png" },
  //   { title: "First Feed", description: "Nulla vitae elit libero, a pharetra augue mollis interdum.", path:"../../assets/img/avatar-1.png" },
  //   { title: "Second Feed", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", path:"../../assets/img/avatar-2.png" },
  //   { title: "Third Feed", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", path:"../../assets/img/avatar-3.png" },
  //   ];
  public feeds: Feed[];
  private feedsSubscription: Subscription;

  constructor(private feedsService: FeedsService) { }

  ngOnInit() {
    this.feedsSubscription = this.feedsService.feeds.subscribe(feeds => {
      this.feeds = feeds;
    });
    this.feedsService.getFeeds();
  }

  ngOnDestroy() {
    this.feedsSubscription.unsubscribe();
  }

}
