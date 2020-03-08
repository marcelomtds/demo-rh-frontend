import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { resizeBase64ForMaxWidthAndMaxHeight } from 'resize-base64';
import { Cargo } from 'src/app/core/model/model/cargo.model';
import { Colaborador } from 'src/app/core/model/model/colaborador.model';
import { Response } from 'src/app/core/model/model/response.model';
import { Sexo } from '../../../core/model/model/sexo.model';
import { CargoService } from '../../../core/services/cargo.service';
import { MessageService } from '../../../core/services/message.service';
import { SexoService } from '../../../core/services/sexo.service';
import { ColaboradorService } from '../../../core/services/usuario.service';
import { Messages } from '../../../shared/messages/messages';
import Util from '../../../shared/util/util';

@Component({
  selector: 'app-colaborador-form',
  templateUrl: './colaborador-form.component.html'
})
export class ColaboradorFormComponent implements OnInit {

  @ViewChild('inputImage', { static: false }) inputImage: ElementRef;

  public form: FormGroup;
  public sexos = new Array<Sexo>();
  public cargos = new Array<Cargo>();
  public isInvalidForm = false;

  public constructor(
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ColaboradorService,
    private cargoService: CargoService,
    private sexoService: SexoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.onCreateForm();
    this.onLoadCombos();
    const id = +this.route.snapshot.params.id;
    if (id) {
      this.findById();
    }
  }

  private onLoadCombos(): void {
    this.cargoService.findAll().subscribe(response => {
      this.cargos = response.result;
    });
    this.sexoService.findAll().subscribe(response => {
      this.sexos = response.result;
    });
  }

  private onCreateForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      nomeCompleto: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      cpf: [null, Validators.required],
      imagem: [null],
      nomeImagem: [null],
      sexoId: [null, Validators.required],
      cargoId: [null, Validators.required]
    });
  }

  public onClickFormSubmit(): void {
    this.messageService.clearAllMessages();
    if (this.form.valid) {
      const dataNascimento = this.form.value.dataNascimento;
      const cpf = this.form.value.cpf;
      if (!Util.isDataValida(dataNascimento)) {
        this.messageService.sendMessageError(Messages.DATA_INVALIDA);
        return;
      }
      if (!Util.isCpfValido(cpf)) {
        this.messageService.sendMessageError(Messages.CPF_INVALIDO);
        return;
      }
      const formValue: Colaborador = {
        ...this.form.value,
        dataNascimento: Util.convertStringToDate(this.form.value.dataNascimento)
      };
      if (formValue.id) {
        this.service.update(formValue.id, formValue).subscribe(response => {
          this.messageService.sendMessageSuccess(response.message);
          this.router.navigate(['/colaborador']);
        });
      } else {
        this.service.create(formValue).subscribe(response => {
          this.messageService.sendMessageSuccess(response.message);
          this.router.navigate(['/colaborador']);
        });
      }
    } else {
      this.isInvalidForm = true;
      this.messageService.sendMessageError(Messages.CAMPO_OBRIGATORIO);
    }
  }

  public onClickCancelar(): void {
    this.messageService.clearAllMessages();
    this.router.navigate(['/colaborador']);
  }

  public onClickRemoveImage(): void {
    this.messageService.clearAllMessages();
    this.form.controls.imagem.setValue(null);
    this.form.controls.nomeImagem.setValue(null);
    this.inputImage.nativeElement.value = null;
  }

  public onChangeImage(imagem: File): void {
    this.messageService.clearAllMessages();
    if (imagem) {
      try {
        if (!Util.isFormatoImagemValido(imagem)) {
          this.messageService.sendMessageError(Messages.IMAGEM_FORMATO);
          return;
        }
        if (!Util.isTamanhoArquivoValido(imagem)) {
          this.messageService.sendMessageError(Messages.IMAGEM_TAMANHO);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(imagem);
        reader.onload = () => {
          this.spinnerService.show();
          resizeBase64ForMaxWidthAndMaxHeight(reader.result, 600, 400, (resizedImage) => {
            this.form.controls.imagem.setValue(resizedImage);
            this.form.controls.nomeImagem.setValue(imagem.name);
            this.spinnerService.hide();
          });
        };
      } catch {
        this.messageService.sendMessageError(Messages.ERRO_IMAGEM);
        this.spinnerService.hide();
      }
    }
  }

  private findById(): void {
    this.route.data.subscribe(dados => {
      const response: Response<Colaborador> = dados.response;
      this.form.setValue({
        id: response.result.id,
        nomeCompleto: response.result.nomeCompleto,
        dataNascimento: Util.convertDateToString(response.result.dataNascimento),
        cpf: response.result.cpf,
        imagem: response.result.imagem,
        nomeImagem: response.result.nomeImagem,
        sexoId: response.result.sexoId,
        cargoId: response.result.cargoId
      });
    });
  }

}
