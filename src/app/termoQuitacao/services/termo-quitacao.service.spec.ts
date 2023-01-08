import { TestBed } from '@angular/core/testing';

import { TermoQuitacaoService } from './termo-quitacao.service';

describe('TermoQuitacaoService', () => {
  let service: TermoQuitacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermoQuitacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
