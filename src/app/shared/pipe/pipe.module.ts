import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpfPipe } from './cpf.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CpfPipe
  ],
  exports: [
    CpfPipe
  ]
})
export class PipeModule { }
