import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobCatalogComponent } from './job-catalog/job-catalog.component';
import { EditJobFormComponent } from './edit-job-form/edit-job-form.component';
import { ShortTextPipe } from '../short-text.pipe';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CreateJobFormComponent,
    JobCatalogComponent,
    EditJobFormComponent,
    ShortTextPipe,
    JobDetailsComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CreateJobFormComponent,
    EditJobFormComponent,
    JobCatalogComponent,
  ]
})
export class JobsModule { }
