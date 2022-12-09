import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateJobFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateJobFormComponent
  ]
})
export class JobsModule { }
