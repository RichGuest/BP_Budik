import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AlarmCreatePage } from './alarm-create.page';


describe('AlarmCreatePage', () => {
  let component: AlarmCreatePage;
  let fixture: ComponentFixture<AlarmCreatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlarmCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
