import { Carro } from './../../carros/model/carro';

export interface TermoQuitacao {
  id: number;
  seguradora: string;
  sinistro: string;
  orcamento: string;
  apolice: string;
  data: string;
  valorTotal: number;
  MaoObra: number;
  Peca: number;
  Franquia: number;
  obs: string;
  carroId: number;
  carro: Carro;
}

export interface Resposta {
  mensagem: string;
}
