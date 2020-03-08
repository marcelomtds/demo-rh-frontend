import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/core/model/model/cargo.model';
import { Response } from 'src/app/core/model/model/response.model';
import { CargoService } from 'src/app/core/services/cargo.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Messages } from 'src/app/shared/messages/messages';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html'
})
export class CargoFormComponent implements OnInit {

  public form: FormGroup;
  public isInvalidForm = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: CargoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.onCreateForm();
    const id = +this.route.snapshot.params.id;
    if (id) {
      this.findById();
    }
  }

  private onCreateForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      descricao: [null, Validators.required]
    });
  }

  public onClickFormSubmit(): void {
    this.messageService.clearAllMessages();
    if (this.form.valid) {
      const formValue: Cargo = {
        ...this.form.value
      };
      if (formValue.id) {
        this.service.update(formValue.id, formValue).subscribe(response => {
          this.messageService.sendMessageSuccess(response.message);
          this.router.navigate(['/cargo']);
        });
      } else {
        this.service.create(formValue).subscribe(response => {
          this.messageService.sendMessageSuccess(response.message);
          this.router.navigate(['/cargo']);
        });
      }
    } else {
      this.isInvalidForm = true;
      this.messageService.sendMessageError(Messages.CAMPO_OBRIGATORIO);
    }
  }

  public onClickCancelar(): void {
    this.messageService.clearAllMessages();
    this.router.navigate(['/cargo']);
  }

  private findById(): void {
    this.route.data.subscribe(dados => {
      const response: Response<Cargo> = dados.response;
      this.form.setValue({
        id: response.result.id,
        descricao: response.result.descricao
      });
    });
  }

}
