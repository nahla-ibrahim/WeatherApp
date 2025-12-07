import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weekinfo } from './weekinfo';

describe('Weekinfo', () => {
  let component: Weekinfo;
  let fixture: ComponentFixture<Weekinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Weekinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Weekinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
