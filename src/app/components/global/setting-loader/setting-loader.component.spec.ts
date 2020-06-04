import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLoaderComponent } from './setting-loader.component';

describe('SettingLoaderComponent', () => {
  let component: SettingLoaderComponent;
  let fixture: ComponentFixture<SettingLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
