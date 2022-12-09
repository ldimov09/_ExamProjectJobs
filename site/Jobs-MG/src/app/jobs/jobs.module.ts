import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobCatalogComponent } from './job-catalog/job-catalog.component';



@NgModule({
  declarations: [
    CreateJobFormComponent,
    JobCatalogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateJobFormComponent,
    JobCatalogComponent
  ]
})
export class JobsModule { }
