import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moreinfo } from './moreinfo';

describe('Moreinfo', () => {
  let component: Moreinfo;
  let fixture: ComponentFixture<Moreinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moreinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Moreinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
