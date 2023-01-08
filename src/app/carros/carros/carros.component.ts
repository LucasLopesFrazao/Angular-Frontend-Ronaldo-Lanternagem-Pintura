import { catchError, Observable, of } from 'rxjs';
import { CarrosService } from './../services/carros.service';
import { Component } from '@angular/core';
import { Carro } from '../model/carro';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/dialogs/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.scss'],
})
export class CarrosComponent {
  carros$: Observable<Carro[]>;

  displayedColumns = [
    'proprietario',
    'marca',
    'modelo',
    'chassi',
    'ano',
    'cor',
    'placa',
    'acoes',
  ];

  constructor(
    private service: CarrosService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.carros$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar clientes');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['clientes/new']);
  }

  onEdit(carro: Carro) {
    this.router.navigate(['carros/edit/' + carro.id]);
  }

  onDelete(carro: Carro) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse carro?',
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (!result) return;
      this.service.delete(carro.id).subscribe({
        next: (result) => {
          this.carros$ = this.service.list();
          this.openSnackBar(result.mensagem, '');
        },
        error: () => this.onError('Erro ao deletar carro'),
      });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onCreateTermoQuitacao(carro: Carro) {
    this.router.navigate(['termos/new/' + carro.id]);
  }
}
