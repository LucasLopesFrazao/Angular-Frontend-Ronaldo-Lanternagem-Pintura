import { TermoQuitacaoPDFComponent } from './termoQuitacao/termo-quitacao-pdf/termo-quitacao-pdf.component';
import { TermoQuitacaoComponent } from './termoQuitacao/termo-quitacao/termo-quitacao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarrosFormComponent } from './carros/carros-form/carros-form.component';
import { CarrosComponent } from './carros/carros/carros.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { TermoQuitacaoFormComponent } from './termoQuitacao/termo-quitacao-form/termo-quitacao-form.component';

const routes: Routes = [
  { path: '', component: ClientesComponent},
  { path: 'clientes/new', component: ClientesFormComponent},
  { path: 'clientes/edit/:id', component: ClientesFormComponent},
  { path: 'carros', component: CarrosComponent},
  { path: 'carros/new/:idCliente', component: CarrosFormComponent},
  { path: 'carros/edit/:idCarro', component: CarrosFormComponent},
  { path: 'termos', component: TermoQuitacaoComponent},
  { path: 'termos/new/:idCarro', component: TermoQuitacaoFormComponent},
  { path: 'termos/pdf/:idTermoQuitacao', component: TermoQuitacaoPDFComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
