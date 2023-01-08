import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Carro, Resposta } from '../model/carro';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {
  private readonly API = 'http://localhost:3333/carros';

  constructor(private httpClient: HttpClient) { }

  save(record: Partial<Carro>) {
    if(record.id != 0){
      return this.httpClient.put<Resposta>(`${this.API}/${record.id}`, record)
    }else{
      return this.httpClient.post<Resposta>(this.API, record)
    }
  }

  list() {
    return this.httpClient.get<Carro[]>(this.API);
  }

  getId(id: string) {
    return this.httpClient.get<Carro>(`${this.API}/${id}`);
  }

  delete(id: number) {
    return this.httpClient.delete<Resposta>(`${this.API}/${id}`);
  }
}
