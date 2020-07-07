import { Injectable } from '@angular/core';

import { HttpService } from '../../shared/http.service';

import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';

import { QueryData } from './query.model';

@Injectable({providedIn: 'root'})
export class ContactService {

  private backendUrl = environment.BACKEND_URL + 'user/';

  constructor(private httpService: HttpService, private toastr: ToastrService) { }

  createQuery(data: QueryData){
    this.httpService.post(this.backendUrl + 'createQuery',data).subscribe(response => {
      console.log(response.message);
      this.toastr.success('We will revert you asap.',response.message,{positionClass: 'toast-bottom-right'});
    },
    error => {
      console.log(error.error.message);
    });
  }

}
