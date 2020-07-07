import { NgModule } from "@angular/core";
import { ModalComponent } from './modal/modal.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    ModalComponent,
    LoaderComponent
  ],
  imports: [
  ],
  providers: [],
  exports: [
    ModalComponent,
    LoaderComponent
  ]
})

export class SharedModule { }
