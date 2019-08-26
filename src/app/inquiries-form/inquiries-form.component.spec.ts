import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesFormComponent } from './inquiries-form.component';

describe('InquiriesFormComponent', () => {
  let component: InquiriesFormComponent;
  let fixture: ComponentFixture<InquiriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
