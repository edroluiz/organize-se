import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCongratulationsComponent } from './pop-up-congratulations.component';

describe('PopUpCongratulationsComponent', () => {
  let component: PopUpCongratulationsComponent;
  let fixture: ComponentFixture<PopUpCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCongratulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
