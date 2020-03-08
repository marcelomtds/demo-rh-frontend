import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradorFormComponent } from './form/colaborador-form.component';
import { ColaboradorListComponent } from './list/colaborador-list.component';
import { ColaboradorResolver } from './resolver/colaborador-resolver.resover';


const routes: Routes = [
  {
    path: '',
    component: ColaboradorListComponent
  },
  {
    path: 'incluir',
    component: ColaboradorFormComponent
  },
  {
    path: 'alterar/:id',
    component: ColaboradorFormComponent,
    resolve: {
      response: ColaboradorResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ColaboradorResolver]
})
export class ColaboradorRoutingModule { }
