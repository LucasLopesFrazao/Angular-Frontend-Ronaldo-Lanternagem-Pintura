import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { CarrosService } from '../services/carros.service';

@Component({
  selector: 'app-carros-form',
  templateUrl: './carros-form.component.html',
  styleUrls: ['./carros-form.component.scss'],
})
export class CarrosFormComponent implements OnInit {
  idCliente: string | null;
  idCarro: string | null;

  form = this.formBuilder.group({
    id: 0,
    marca: ['', [Validators.required, Validators.maxLength(100)]],
    modelo: ['', [Validators.required, Validators.maxLength(100)]],
    chassi: ['', [Validators.required, Validators.maxLength(100)]],
    ano: ['', [Validators.required, Validators.maxLength(4)]],
    cor: ['', [Validators.required, Validators.maxLength(25)]],
    placa: ['', [Validators.required, Validators.maxLength(8)]],
    clienteId: 0,
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private service: CarrosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private locate: Location
  ) {
    this.idCliente = this.route.snapshot.paramMap.get('idCliente');
    this.idCarro = this.route.snapshot.paramMap.get('idCarro');
    if (this.idCarro) {
      service.getId(this.idCarro!).subscribe({
        next: (cliente) => {
          this.form.patchValue(cliente);
        },
      });
    }
  }

  formatarChassi(string: string) {
    const regex =
      /([a-zA-Z0-9]{3})([a-zA-Z0-9]{6})([a-zA-Z0-9]{2})([a-zA-Z0-9]{6})/;
    return string.replace(regex, '$1 $2 $3 $4');
  }

  formatarPlaca(string: string) {
    return string.replace(
      /([A-Za-z]{3})([A-Za-z0-9])([A-Za-z0-9]+)/,
      '$1-$2$3'
    );
  }

  onSubmit() {
    this.form.value.chassi = this.formatarChassi(this.form.value.chassi!);
    this.form.value.placa = this.formatarPlaca(this.form.value.placa!);

    if(this.idCarro === null){
      this.form.value.clienteId = Number(this.idCliente);
    }
    this.service.save(this.form.value).subscribe({
      next: (carro) => {
        this.openSnackBar(carro.mensagem, '');
        this.router.navigate(['/carros']);
      },
      error: (error) => this.openSnackBar('Erro ao criar carro', ''),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onCancel() {
    this.locate.back();
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
