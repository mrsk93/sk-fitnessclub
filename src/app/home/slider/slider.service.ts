import { Injectable } from '@angular/core';

import { HttpService } from '../../shared/http.service';

import { environment } from '../../../environments/environment';

import { Subject } from 'rxjs';

import { Slide } from './slide.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SliderService {

  public slides = new Subject<[Slide]>();

  private backendUrl = environment.BACKEND_URL + 'user/';

  constructor(private httpService: HttpService) { }

  getSlides(){
    this.httpService.get(this.backendUrl + 'getSlides').pipe(
      map(responseData => {
        return {
          slides: responseData.slidesData.map(slide => {
            return {
              id: slide._id,
              title: slide.title,
              description: slide.description,
              path: slide.path
            }
          }
          )
          .reverse()
        };
      }
      )
    )
    .subscribe(response => {
      this.slides.next(response.slides);
    });
  }

}
