import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoFormComponent } from './form/cargo-form.component';
import { CargoListComponent } from './list/cargo-list.component';
import { CargoResolver } from './resolver/cargo-resolver.resover';


const routes: Routes = [
  {
    path: '',
    component: CargoListComponent
  },
  {
    path: 'incluir',
    component: CargoFormComponent
  },
  {
    path: 'alterar/:id',
    component: CargoFormComponent,
    resolve: {
      response: CargoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CargoResolver]
})
export class CargoRoutingModule { }
