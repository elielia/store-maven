import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFiltersComponent } from './team-filters.component';

describe('TeamFilterComponent', () => {
  let component: TeamFiltersComponent;
  let fixture: ComponentFixture<TeamFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
