import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoQuitacaoComponent } from './termo-quitacao.component';

describe('TermoQuitacaoComponent', () => {
  let component: TermoQuitacaoComponent;
  let fixture: ComponentFixture<TermoQuitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoQuitacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoQuitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
