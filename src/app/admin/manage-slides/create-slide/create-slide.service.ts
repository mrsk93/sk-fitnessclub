import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { environment } from "../../../../environments/environment";
import { Slide } from 'src/app/home/slider/slide.model';
import { SlidesTableService } from '../slides-table/slides-table.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CreateSlideService {

  private backendUrl = environment.BACKEND_URL + 'admin/';

  constructor(private http: HttpService,
     private router: Router,
     private slidesTableService: SlidesTableService,
     private toastrService: ToastrService ) { }

  createSlide(data: Slide){
    const slideData = new FormData();
    slideData.append("title",data.title);
    slideData.append("description",data.description);
    slideData.append("path",data.path,data.title);
    this.slidesTableService.isLoading.next(true);
    this.http.post(this.backendUrl + 'createSlide',slideData).subscribe(response => {
      this.toastrService.success('Your Slide was created successfully', response.message,{positionClass:'toast-top-center'});
      this.slidesTableService.getSlides();
    },
    error=> {
      this.toastrService.error('Slide could not be created', error.error.message,{positionClass:'toast-top-center'});
    });
  }

  getSlide(slideId: string) {
    return this.http.getById(this.backendUrl + 'getSlide/' , slideId);
  }

  updateSlide(slideId: string, data: Slide) {
    let slideData: Slide | FormData;
    if (typeof data.path === "object") {
      slideData = new FormData();
      slideData.append("id", slideId);
      slideData.append("title", data.title);
      slideData.append("description", data.description);
      slideData.append("path", data.path, data.title);
    } else {
      slideData = {
        id: slideId,
        title: data.title,
        description: data.description,
        path: data.path
      };
    }
    this.slidesTableService.isLoading.next(true);
    this.http.put(this.backendUrl + 'updateSlide/', slideId, slideData).subscribe(response => {
      this.toastrService.success('Your slide was updated successfully', response.message,{positionClass:'toast-top-center'});
      this.router.navigate(['admin','slides']);
      this.slidesTableService.getSlides();
    });
  }

}
