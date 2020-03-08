import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CargoFilter } from 'src/app/core/model/filter/cargo.filter';
import { PageableFilter } from 'src/app/core/model/filter/pageableFilter.filter';
import { Cargo } from 'src/app/core/model/model/cargo.model';
import Page from 'src/app/core/model/model/page.model';
import { CargoService } from 'src/app/core/services/cargo.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Pagination } from 'src/app/shared/components/pagination/pagination';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html'
})
export class CargoListComponent extends Pagination<CargoFilter> implements OnInit {

  public dados = new Page<Array<Cargo>>();
  public form: FormGroup;
  public showNoRecords = false;

  public constructor(
    private service: CargoService,
    private formBuilder: FormBuilder,
    messageService: MessageService
  ) {
    super(messageService);
  }

  public ngOnInit(): void {
    this.onCreateForm();
  }

  private onCreateForm(): void {
    this.form = this.formBuilder.group({
      descricao: [null]
    });
  }

  public onClickFormSubmit(): void {
    this.messageService.clearAllMessages();
    this.filtro = new PageableFilter<CargoFilter>();
    this.filtro = {
      ...this.filtro,
      orderBy: 'descricao',
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
    this.dados = new Page<Array<Cargo>>();
    this.filtro = new PageableFilter<CargoFilter>();
    this.showNoRecords = false;
  }

}
