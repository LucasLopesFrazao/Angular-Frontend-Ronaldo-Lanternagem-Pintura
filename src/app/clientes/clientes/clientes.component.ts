import { Cliente } from './../model/cliente';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialogs/error-dialog/error-dialog.component';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  displayedColumns = ['nome', 'cpf', 'rg', 'acoes'];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.clientes$ = this.clientesService.list().pipe(
      catchError((error) => {
        this.onError("Erro ao carregar clientes");
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
    this.router.navigate(['clientes/new'])
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['clientes/edit/' + cliente.id])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onDelete(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover esse cliente?",
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (!result) return;
      this.clientesService.remove(cliente.id).subscribe({
        next: (result) => {
          this.clientes$ = this.clientesService.list()
          this.openSnackBar(result.mensagem, '');
        },
        error: () => this.onError("Erro ao deletar cliente"),
      });
    });
  }

  onCreateCar(cliente: Cliente){
    this.router.navigate(['carros/new/' + cliente.id])
  }

  ngOnInit(): void {}
}
