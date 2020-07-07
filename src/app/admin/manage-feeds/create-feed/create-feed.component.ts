import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateFeedService } from './create-feed.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-feed',
  templateUrl: './create-feed.component.html',
  styleUrls: ['./create-feed.component.css']
})
export class CreateFeedComponent implements OnInit {

  @ViewChild("myForm", { static: false }) myForm;
  @ViewChild("image", { static: false }) image;
  public form: FormGroup;
  public imagePreview: string;
  private id: string;
  public editMode = false;
  public isLoading;


  constructor(private createFeedService: CreateFeedService,
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
        let feedId;
        this.isLoading = true;
        this.editMode = true;
        feedId = params["id"];
        this.createFeedService.getFeed(feedId).subscribe(feedData => {
          this.form.setValue({
            title: feedData.title,
            description: feedData.description,
            path: feedData.path
          });
          this.id = feedData._id;
          this.imagePreview = feedData.path;
          this.isLoading = false;
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
      this.createFeedService.updateFeed(this.id,this.form.value);
    }else{
      this.createFeedService.createFeed(this.form.value);
    }
    this.onFormClear();
  }

  onFormClear(){
    this.myForm.nativeElement.classList.remove("was-validated");
    this.imagePreview = null;
    this.image.nativeElement.value="";
    this.form.reset();
    this.router.navigate(['admin','feeds']);
  }

}
