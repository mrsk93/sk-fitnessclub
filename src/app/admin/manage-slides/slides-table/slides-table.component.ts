import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Slide } from 'src/app/home/slider/slide.model';
import { SlidesTableService } from './slides-table.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-slides-table',
  templateUrl: './slides-table.component.html',
  styleUrls: ['./slides-table.component.css']
})
export class SlidesTableComponent implements OnInit,OnDestroy {
  public slides: Slide[];
  private slideId: string;
  public showModal = false;
  public isLoading = true;
  private getSlidesSubscription: Subscription;
  private loaderSubscription: Subscription;

  constructor(private slidesTableService: SlidesTableService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loaderSubscription = this.slidesTableService.isLoading.subscribe(isLoading=> {
      this.isLoading = isLoading;
    });
    this.getSlidesSubscription = this.slidesTableService.slides.subscribe(slides => {
      this.slides = slides;
      this.isLoading = false;
    })
    this.slidesTableService.getSlides();
  }

  onEditSlide(id: string) {
    this.router.navigate(['edit',id], {relativeTo: this.route});
  }

  onShowModal(id: string){
    this.showModal = true;
    this.slideId = id;
  }

  onDeleteSlide() {
    this.showModal = false;
    this.slidesTableService.deleteSlide(this.slideId);
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
    this.getSlidesSubscription.unsubscribe();
  }

}
