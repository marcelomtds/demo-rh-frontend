import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';
import { IdadePipe } from './idade.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CpfPipe,
    IdadePipe
  ],
  exports: [
    CpfPipe,
    IdadePipe
  ]
})
export class PipeModule { }
