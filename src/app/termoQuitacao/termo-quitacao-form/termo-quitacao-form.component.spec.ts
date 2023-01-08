import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoQuitacaoFormComponent } from './termo-quitacao-form.component';

describe('TermoQuitacaoFormComponent', () => {
  let component: TermoQuitacaoFormComponent;
  let fixture: ComponentFixture<TermoQuitacaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoQuitacaoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoQuitacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
