import { Component } from '@angular/core';
import { base64StringToBlob } from 'blob-util';
import { BsModalRef } from 'ngx-bootstrap';
import { Colaborador } from 'src/app/core/model/model/colaborador.model';
import { MessageService } from 'src/app/core/services/message.service';
import { Messages } from '../../messages/messages';

@Component({
  selector: 'app-modal-visualizar-colaborador',
  templateUrl: './modal-visualizar-colaborador.component.html'
})
export class ModalVisualizarColaboradorComponent {

  public colaborador: Colaborador;

  constructor(
    private bsModalRef: BsModalRef,
    private messageService: MessageService
  ) { }

  public onClickCloseModal(): void {
    this.bsModalRef.hide();
  }

  public onClickDownload(): void {
    this.messageService.clearAllMessages();
    try {
      const array = this.colaborador.imagem.toString().split(';base64,');
      const blob = base64StringToBlob(array[array.length - 1]);
      const elemento = document.createElement('a');
      elemento.href = window.URL.createObjectURL(blob);
      elemento.download = this.colaborador.nomeImagem;
      elemento.click();
      elemento.remove();
    } catch {
      this.messageService.sendMessageError(Messages.ERRO_DOWNLOAD);
    }
  }

}
