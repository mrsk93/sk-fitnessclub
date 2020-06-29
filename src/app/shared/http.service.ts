import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private http: HttpClient) { }

  get(backendUrl: string) {
    return this.http.get<any>(backendUrl);
  }

  getById(backendUrl: string, id: string) {
    return this.http.get<any>(backendUrl + id);
  }

  post(backendUrl: string, data: any) {
    return this.http.post<any>(backendUrl, data);
  }

  put(backendUrl: string, id: string, data:any ) {
    return this.http.put<any>(backendUrl + id, data);
  }

  delete(backendUrl: string, id: string) {
    return this.http.delete<any>(backendUrl + id);
  }

}
