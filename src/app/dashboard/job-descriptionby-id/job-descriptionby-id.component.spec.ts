import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionbyIdComponent } from './job-descriptionby-id.component';

describe('JobDescriptionbyIdComponent', () => {
  let component: JobDescriptionbyIdComponent;
  let fixture: ComponentFixture<JobDescriptionbyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDescriptionbyIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDescriptionbyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
