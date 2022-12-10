import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobCatalogComponent } from './job-catalog/job-catalog.component';
import { EditJobFormComponent } from './edit-job-form/edit-job-form.component';



@NgModule({
  declarations: [
    CreateJobFormComponent,
    JobCatalogComponent,
    EditJobFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateJobFormComponent,
    EditJobFormComponent,
    JobCatalogComponent,
  ]
})
export class JobsModule { }
