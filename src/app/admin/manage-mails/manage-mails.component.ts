import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManageMailsService } from './manage-mails.service';
import { QueryData } from 'src/app/home/contact/query.model';

@Component({
  selector: 'app-manage-mails',
  templateUrl: './manage-mails.component.html',
  styleUrls: ['./manage-mails.component.css']
})
export class ManageMailsComponent implements OnInit,OnDestroy {

  public queries: QueryData[];
  public queryDescription: string;
  private queriesSubscription: Subscription;
  public showDescription = false;

  constructor(private manageQueries: ManageMailsService) { }

  ngOnInit() {
    this.queriesSubscription = this.manageQueries.queries.subscribe(queryData => {
      this.queries = queryData;
    });
    this.manageQueries.getQueries();
  }

  onShowDescription(description: string){
    this.queryDescription = description;
    this.showDescription = true;
  }

  ngOnDestroy() {
    this.queriesSubscription.unsubscribe();
  }
}
