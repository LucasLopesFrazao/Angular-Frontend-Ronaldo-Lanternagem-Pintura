import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoQuitacaoPDFComponent } from './termo-quitacao-pdf.component';

describe('TermoQuitacaoPDFComponent', () => {
  let component: TermoQuitacaoPDFComponent;
  let fixture: ComponentFixture<TermoQuitacaoPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoQuitacaoPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoQuitacaoPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
