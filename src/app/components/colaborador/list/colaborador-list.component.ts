import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Cargo } from 'src/app/core/model/model/cargo.model';
import { CargoService } from 'src/app/core/services/cargo.service';
import { Pagination } from 'src/app/shared/components/pagination/pagination';
import { ModalConfirmacaoComponent } from 'src/app/shared/modais/modal-confirmacao/modal-confirmacao.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { ColaboradorFilter } from '../../../core/model/filter/colaborador.filter';
import { PageableFilter } from '../../../core/model/filter/pageableFilter.filter';
import { Colaborador } from '../../../core/model/model/colaborador.model';
import Page from '../../../core/model/model/page.model';
import { Sexo } from '../../../core/model/model/sexo.model';
import { MessageService } from '../../../core/services/message.service';
import { SexoService } from '../../../core/services/sexo.service';
import { ColaboradorService } from '../../../core/services/usuario.service';
import { Messages } from 'src/app/shared/messages/messages';
import { base64StringToBlob } from 'blob-util';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html'
})
export class ColaboradorListComponent extends Pagination<ColaboradorFilter> implements OnInit {

  public sexos = new Array<Sexo>();
  public cargos = new Array<Cargo>();
  public dados = new Page<Array<Colaborador>>();
  public form: FormGroup;
  public showNoRecords = false;

  public constructor(
    private modalService: BsModalService,
    private service: ColaboradorService,
    private sexoService: SexoService,
    private cargoService: CargoService,
    private formBuilder: FormBuilder,
    messageService: MessageService,
    public authGuardService: AuthGuard
  ) {
    super(messageService);
  }

  public ngOnInit(): void {
    this.onCreateForm();
    this.onLoadCombos();
  }

  private onCreateForm(): void {
    this.form = this.formBuilder.group({
      cpf: [null],
      nomeCompleto: [null],
      sexoId: [null],
      cargoId: [null],
    });
  }

  private onLoadCombos(): void {
    this.sexoService.findAll().subscribe(response => {
      this.sexos = response.result;
    });
    this.cargoService.findAll().subscribe(response => {
      this.cargos = response.result;
    });
  }

  public onClickFormSubmit(): void {
    this.messageService.clearAllMessages();
    this.filtro = new PageableFilter<ColaboradorFilter>();
    this.filtro = {
      ...this.filtro,
      orderBy: 'nomeCompleto',
      direction: 'ASC',
      filter: {
        ...this.form.value
      }
    };
    this.searchByFilter();
  }

  public searchByFilter(): void {
    this.service.findByFilter(this.filtro).subscribe(response => {
      this.showNoRecords = true;
      this.dados = response.result;
    });
  }

  public onClickLimparCampos(): void {
    this.onCreateForm();
    this.messageService.clearAllMessages();
    this.dados = new Page<Array<Colaborador>>();
    this.filtro = new PageableFilter<ColaboradorFilter>();
    this.showNoRecords = false;
  }

  public onClickRemove(row: Colaborador): void {
    this.messageService.clearAllMessages();
    const modalRef = this.modalService.show(ModalConfirmacaoComponent, { backdrop: 'static' });
    modalRef.content.titulo = 'Confirmação de exclusão de colaborador';
    modalRef.content.corpo = `Deseja excluir o colabrador ${row.nomeCompleto}`;
    modalRef.content.onClose.subscribe(result => {
      if (result) {
        this.service.delete(row.id).subscribe(response => {
          this.messageService.sendMessageSuccess(response.message);
          this.searchByFilter();
        });
      }
    });
  }

  public onClickDownload(colaborador: Colaborador): void {
    this.messageService.clearAllMessages();
    try {
      const array = colaborador.imagem.toString().split(';base64,');
      const blob = base64StringToBlob(array[array.length - 1]);
      const elemento = document.createElement('a');
      elemento.href = window.URL.createObjectURL(blob);
      elemento.download = colaborador.nomeImagem;
      elemento.click();
      elemento.remove();
    } catch {
      this.messageService.sendMessageError(Messages.ERRO_DOWNLOAD);
    }
  }

}
