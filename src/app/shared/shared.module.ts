import { NgModule } from '@angular/core';
import { DemoCommonsModule } from '../components/demo-commons.module';
import { MessageRequiredComponent } from './components/message-required/message-required.component';
import { NoRecordsComponent } from './components/no-records/no-records.component';
import { PageActionComponent } from './components/page-action/page-action.component';
import { ModalConfirmacaoComponent } from './modais/modal-confirmacao/modal-confirmacao.component';
import { ModalVisualizarColaboradorComponent } from './modais/modal-visualizar-colaborador/modal-visualizar-colaborador.component';
import { PipeModule } from './pipe/pipe.module';

@NgModule({
  imports: [
    DemoCommonsModule,
    PipeModule
  ],
  exports: [
    DemoCommonsModule,
    PipeModule,
    MessageRequiredComponent,
    NoRecordsComponent,
    PageActionComponent
  ],
  declarations: [
    ModalConfirmacaoComponent,
    MessageRequiredComponent,
    NoRecordsComponent,
    PageActionComponent,
    ModalVisualizarColaboradorComponent
  ],
  entryComponents: [
    ModalConfirmacaoComponent,
    ModalVisualizarColaboradorComponent
  ]
})
export class SharedModule { }
