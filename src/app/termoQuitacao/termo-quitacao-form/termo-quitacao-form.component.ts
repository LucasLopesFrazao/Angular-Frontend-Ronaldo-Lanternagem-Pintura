import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TermoQuitacaoService } from '../services/termo-quitacao.service';

@Component({
  selector: 'app-termo-quitacao-form',
  templateUrl: './termo-quitacao-form.component.html',
  styleUrls: ['./termo-quitacao-form.component.scss'],
})
export class TermoQuitacaoFormComponent {
  carroId: number | null;

  sinistro = false;
  orcamento = false;
  apolice = false;
  franquia = false;
  pecas = false;
  obs = false;

  form = this.formBuilder.group({
    id: 0,
    seguradora: ['', [Validators.required, Validators.maxLength(255)]],
    sinistro: ['', [Validators.maxLength(50)]],
    orcamento: ['', [Validators.maxLength(50)]],
    apolice: ['', [Validators.maxLength(50)]],
    data: this.formBuilder.control(new Date().toISOString()),
    valorTotal: [0, [Validators.required]],
    MaoObra: [0, [Validators.required]],
    Peca: 0,
    Franquia: 0 ,
    obs: ['', [Validators.maxLength(1000)]],
    carroId: 0,
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private service: TermoQuitacaoService,
    private router: Router,
    private locate: Location
  ) {
    this.carroId = Number(this.route.snapshot.paramMap.get('idCarro'));
    this.form.get('carroId')?.setValue(this.carroId);
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (carro) => {
        this.openSnackBar(carro.mensagem, '');
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
