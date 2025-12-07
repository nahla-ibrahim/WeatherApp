import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cityinfo } from './cityinfo';

describe('Cityinfo', () => {
  let component: Cityinfo;
  let fixture: ComponentFixture<Cityinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cityinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cityinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
