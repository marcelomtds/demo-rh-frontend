import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DemoCommonsModule } from '../demo-commons.module';
import { CargoRoutingModule } from './cargo-routing.module';
import { CargoFormComponent } from './form/cargo-form.component';
import { CargoListComponent } from './list/cargo-list.component';



@NgModule({
  declarations: [
    CargoListComponent,
    CargoFormComponent
  ],
  imports: [
    CommonModule,
    CargoRoutingModule,
    SharedModule,
    DemoCommonsModule
  ]
})
export class CargoModule { }
