import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DemoCommonsModule } from '../demo-commons.module';
import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { ColaboradorFormComponent } from './form/colaborador-form.component';
import { ColaboradorListComponent } from './list/colaborador-list.component';

@NgModule({
  declarations: [
    ColaboradorListComponent,
    ColaboradorFormComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    DemoCommonsModule,
    SharedModule
  ]
})
export class ColaboradorModule { }
