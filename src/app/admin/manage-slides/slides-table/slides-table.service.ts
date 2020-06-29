import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { environment } from "../../../../environments/environment";
import { Slide } from 'src/app/home/slider/slide.model';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class SlidesTableService {
  public slides = new Subject<Slide[]>();
  private backendUrl = environment.BACKEND_URL + 'admin/';

  constructor(private httpService: HttpService,
      private toastrService: ToastrService) { }

  getSlides() {
    this.httpService.get(this.backendUrl + 'getSlides?admin=true')
      .pipe(
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

  deleteSlide(id: string){
    this.httpService.delete(this.backendUrl + 'deleteSlide/', id).subscribe(response => {
      this.toastrService.success('Slide Deleted!',response.message,{positionClass: 'toast-top-center'});
      this.getSlides();
    });
  }
}
