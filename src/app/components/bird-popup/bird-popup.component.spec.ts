import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdPopupComponent } from './bird-popup.component';

describe('BirdPopupComponent', () => {
  let component: BirdPopupComponent;
  let fixture: ComponentFixture<BirdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
