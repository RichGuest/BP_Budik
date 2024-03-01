import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VypnutiSwipePage } from './vypnuti-swipe.page';

describe('HomePage', () => {
  let component: VypnutiSwipePage;
  let fixture: ComponentFixture<VypnutiSwipePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(VypnutiSwipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
