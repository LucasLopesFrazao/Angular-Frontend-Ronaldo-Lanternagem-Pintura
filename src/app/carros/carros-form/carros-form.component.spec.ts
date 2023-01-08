import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosFormComponent } from './carros-form.component';

describe('CarrosFormComponent', () => {
  let component: CarrosFormComponent;
  let fixture: ComponentFixture<CarrosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
