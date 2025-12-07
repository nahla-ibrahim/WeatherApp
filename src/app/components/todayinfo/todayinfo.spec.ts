import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todayinfo } from './todayinfo';

describe('Todayinfo', () => {
  let component: Todayinfo;
  let fixture: ComponentFixture<Todayinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todayinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Todayinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
