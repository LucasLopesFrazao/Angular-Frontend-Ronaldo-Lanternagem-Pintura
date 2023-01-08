import { Cliente } from './../../clientes/model/cliente';

export interface Carro {
  id: number;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  placa: string;
  chassi: string,
  clienteId: number;
  Cliente: Cliente;
}

export interface Resposta {
  mensagem: string;
}
