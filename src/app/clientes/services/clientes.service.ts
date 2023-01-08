import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cliente, Resposta } from '../model/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3333/clientes';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Cliente[]>(this.API);
  }

  save(record: Partial<Cliente>) {
    if(record.id != 0){
      return this.httpClient.put<Resposta>(`${this.API}/${record.id}`, record)
    }else{
      return this.httpClient.post<Resposta>(this.API, record)
    }
  }

  getId(id: string) {
    return this.httpClient.get<Cliente>(`${this.API}/${id}`);
  }

  remove(id: number) {
    return this.httpClient.delete<Resposta>(`${this.API}/${id}`);
  }
}
