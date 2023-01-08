import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
})
export class ClientesFormComponent implements OnInit {
  cliente$!: Observable<Cliente>;

  form = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    cpf: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    rg: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(25)],
    ],
  });

  id: string | null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      service.getId(this.id!).subscribe({
        next: (cliente) => {
          this.form.patchValue(cliente);
        },
      });
    }
  }

  validateCPF(cpf: string) {
    let sum = 0;
    let rest;
    cpf = cpf.replace(/\D/g, '');

    const cpfBlocked = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ];

    if (cpfBlocked.includes(cpf)) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  formatCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  onSubmit() {
    if (!this.validateCPF(this.form.value.cpf!)) {
      return this.openSnackBar('CPF inválido', '');
    }
    this.form.value.cpf = this.formatCPF(this.form.value.cpf!);

    this.service.save(this.form.value).subscribe({
      next: (result) => {
        this.openSnackBar(result.mensagem, '');
        this.router.navigate(['/']);
      },
      error: () => this.openSnackBar('Erro ao criar cliente', ''),
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Você deve informar um valor válido';
    }

    if (field?.hasError('minlength')) {
      const requireLenght = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `O tamanho mínimo do campo é de ${requireLenght} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requireLenght = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `O tamanho maximo do campo é de ${requireLenght} caracteres`;
    }

    return 'Campo inválido';
  }

  ngOnInit(): void {}
}
