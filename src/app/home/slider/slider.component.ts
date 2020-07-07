import { Component, OnInit, AfterContentInit } from '@angular/core';

import { Slide } from './slide.model';
import { SliderService } from './slider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit{
  // public slides: Slide[] = [
  //     { title: "First Slide", description: "Nulla vitae elit libero, a pharetra augue mollis interdum.", path:"../../assets/img/blog-1.jpg" },
  //     { title: "Second Slide", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", path:"../../assets/img/blog-2.jpg" },
  //     { title: "Third Slide", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.", path:"../../assets/img/blog-3.jpg" },
  //     ];
  public isLoading = true;
  public slides: Slide[];
  private sliderSubscription: Subscription;

  constructor(private sliderService: SliderService) { }

  ngOnInit() {
    this.sliderSubscription = this.sliderService.slides.subscribe(slides => {
      this.slides = slides;
      this.isLoading = false;
    });
    this.sliderService.getSlides();
  }

  ngOnDestroy() {
    this.sliderSubscription.unsubscribe();
  }

}
