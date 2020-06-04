import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserInfoComponent } from './delete-user-info.component';

describe('DeleteUserInfoComponent', () => {
  let component: DeleteUserInfoComponent;
  let fixture: ComponentFixture<DeleteUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
