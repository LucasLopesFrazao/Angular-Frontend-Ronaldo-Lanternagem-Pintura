import { TermoQuitacao } from './../model/termoQuitacao';
import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TermoQuitacaoService } from '../services/termo-quitacao.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/dialogs/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-termo-quitacao',
  templateUrl: './termo-quitacao.component.html',
  styleUrls: ['./termo-quitacao.component.scss']
})
export class TermoQuitacaoComponent {

  termosQuitacoes$: Observable<TermoQuitacao[]>;

  displayedColumns = [
    'proprietario',
    'veiculo',
    'placa',
    'data',
    'seguradora',
    'valorMaoObra',
    'valorTotal',
    'acoes',
  ];

  constructor(
    private service: TermoQuitacaoService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.termosQuitacoes$ = this.service.list().pipe(
      map((termosQuitacoes) => {
        return termosQuitacoes.map((termoQuitacao) => {
          termoQuitacao.data = this.transformDate(termoQuitacao.data);
          return termoQuitacao;
        });
      }),
      catchError((error) => {
        this.onError('Erro ao carregar termos de quitações');
        return of([]);
      })
    );
  }

  transformDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['clientes/new']);
  }

  onEdit(termo: TermoQuitacao) {
    this.router.navigate(['carros/edit/' + termo.id]);
  }

  onDelete(termo: TermoQuitacao) {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   data: 'Tem certeza que deseja remover esse carro?',
    // });

    // dialogRef.afterClosed().subscribe((result: Boolean) => {
    //   if (!result) return;
    //   this.service.delete(carro.id).subscribe({
    //     next: (result) => {
    //       this.carros$ = this.service.list();
    //       this.openSnackBar(result.mensagem, '');
    //     },
    //     error: () => this.onError('Erro ao deletar carro'),
    //   });
    // });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onGeneratePDF(termo: TermoQuitacao) {
    this.router.navigate(['termos/pdf/' + termo.id]);
  }
}
