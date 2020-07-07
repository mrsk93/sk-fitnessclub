import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateSlideService } from './create-slide.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-slide',
  templateUrl: './create-slide.component.html',
  styleUrls: ['./create-slide.component.css']
})
export class CreateSlideComponent implements OnInit {

  @ViewChild("myForm", { static: false }) myForm;
  @ViewChild("image", { static: false }) image;
  public form: FormGroup;
  public imagePreview: string;
  private id: string;
  public editMode = false;
  public isLoading;


  constructor(private createSlideService: CreateSlideService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      path: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.isLoading = true;
        let slideId;
        this.editMode = true;
        slideId = params["id"];
        this.createSlideService.getSlide(slideId).subscribe(slideData => {
          this.form.setValue({
            title: slideData.title,
            description: slideData.description,
            path: slideData.path
          });
          this.id = slideData._id;
          this.imagePreview = slideData.path;
          this.isLoading=false;
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onImagePicked(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ path: image });
    this.form.get("path").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  onFormSubmit() {
    this.myForm.nativeElement.classList.add("was-validated");
    if (!this.form.valid) {
      return;
    }
    if(this.editMode){
      this.createSlideService.updateSlide(this.id,this.form.value);
    }else{
      this.createSlideService.createSlide(this.form.value);
    }
    this.onFormClear();
  }

  onFormClear(){
    this.myForm.nativeElement.classList.remove("was-validated");
    this.imagePreview = null;
    this.image.nativeElement.value="";
    this.form.reset();
    this.router.navigate(['admin','slides']);
  }

}
