import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCatalogComponent } from './job-catalog.component';

describe('JobCatalogComponent', () => {
  let component: JobCatalogComponent;
  let fixture: ComponentFixture<JobCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
