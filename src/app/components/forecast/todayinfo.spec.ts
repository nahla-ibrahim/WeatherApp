import { ComponentFixture, TestBed } from '@angular/core/testing';

import { forecast } from './forecast';

describe('forecast', () => {
  let component: forecast;
  let fixture: ComponentFixture<forecast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [forecast],
    }).compileComponents();

    fixture = TestBed.createComponent(forecast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
