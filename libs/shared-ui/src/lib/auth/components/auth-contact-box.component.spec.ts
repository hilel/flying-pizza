import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContactBoxComponent } from './auth-contact-box.component';

describe('AuthContactBoxComponent', () => {
  let component: AuthContactBoxComponent;
  let fixture: ComponentFixture<AuthContactBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthContactBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthContactBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
