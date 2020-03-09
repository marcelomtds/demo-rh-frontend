import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageableFilter } from '../../../core/model/filter/pageableFilter.filter';
import Page from '../../../core/model/model/page.model';

@Component({
  selector: 'app-page-action',
  templateUrl: './page-action.component.html'
})
export class PageActionComponent {

  @Input() filtro: PageableFilter<any>;
  @Input() dados: Page<any>;
  @Output() searchByFilter = new EventEmitter();

  public onChangePage(value: any): void {
    this.filtro.currentPage = value;
    this.searchByFilter.emit();
  }

  public showInfo(): string {
    return (`Página ${this.filtro.currentPage + 1} de ${this.dados.totalPages} - Total de ${this.dados.totalElements} ${this.dados.totalElements > 1 ? 'registros' : 'registro'}.`);
  }

  public onChangePageSize(): void {
    this.filtro.currentPage = 0;
    this.searchByFilter.emit();
  }

}
