import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmSettingsPage } from './alarm-settings.page';

describe('AlarmSettingsPage', () => {
  let component: AlarmSettingsPage;
  let fixture: ComponentFixture<AlarmSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlarmSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
