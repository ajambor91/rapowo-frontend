import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrySuccessComponent } from './registry-success.component';

describe('RegistrySuccessComponent', () => {
  let component: RegistrySuccessComponent;
  let fixture: ComponentFixture<RegistrySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
