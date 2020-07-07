import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/home/feeds/feed.model';
import { Subscription } from 'rxjs';
import { FeedsTableService } from './feeds-table.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feeds-table',
  templateUrl: './feeds-table.component.html',
  styleUrls: ['./feeds-table.component.css']
})
export class FeedsTableComponent implements OnInit {

  public feeds: Feed[];
  private feedId: string;
  public showModal = false;
  public isLoading = true;
  private getFeedsSubscription: Subscription;
  private loaderSubscription: Subscription;

  constructor(private feedsTableService: FeedsTableService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loaderSubscription = this.feedsTableService.isLoading.subscribe(isLoading=> {
      this.isLoading = isLoading;
    });
    this.getFeedsSubscription = this.feedsTableService.feeds.subscribe(feeds => {
      this.feeds = feeds;
      this.isLoading = false;
    })
    this.feedsTableService.getFeeds();
  }

  onEditFeed(id: string) {
    this.router.navigate(['edit',id], {relativeTo: this.route});
  }

  onShowModal(id: string){
    this.showModal = true;
    this.feedId = id;
  }

  onDeleteFeed() {
    this.showModal = false;
    this.feedsTableService.deleteFeed(this.feedId);
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
    this.getFeedsSubscription.unsubscribe();
  }

}
