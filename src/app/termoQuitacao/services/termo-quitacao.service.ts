import { Resposta, TermoQuitacao } from './../model/termoQuitacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TermoQuitacaoService {
  private readonly API = 'http://localhost:3333/termoQuitacoes';

  constructor(private httpClient: HttpClient) { }

  save(record: Partial<TermoQuitacao>) {
    if(record.id != 0){
      return this.httpClient.put<Resposta>(`${this.API}/${record.id}`, record)
    }else{
      return this.httpClient.post<Resposta>(this.API, record)
    }
  }

  list() {
    return this.httpClient.get<TermoQuitacao[]>(this.API)
  }

}
