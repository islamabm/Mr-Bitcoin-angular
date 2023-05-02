import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRecordComponent } from './app-record.component';

describe('AppRecordComponent', () => {
  let component: AppRecordComponent;
  let fixture: ComponentFixture<AppRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
