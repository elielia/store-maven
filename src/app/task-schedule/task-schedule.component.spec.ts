import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { TaskScheduleComponent } from './task-schedule.component';
import { QuoteService } from './quote.service';

describe('HomeComponent', () => {
  let component: TaskScheduleComponent;
  let fixture: ComponentFixture<TaskScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, SharedModule, HttpClientTestingModule],
      declarations: [TaskScheduleComponent],
      providers: [QuoteService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
