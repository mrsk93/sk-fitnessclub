import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { QueryData } from 'src/app/home/contact/query.model';

@Injectable({providedIn: 'root'})
export class ManageMailsService {

  public queries = new Subject<QueryData[]>()
  private backendUrl = environment.BACKEND_URL + 'admin/';

  constructor(private http: HttpService) { }

  getQueries(){
    this.http.get(this.backendUrl + 'getQueries').subscribe(response => {
      this.queries.next(response.queryData);
    })
  }
}
