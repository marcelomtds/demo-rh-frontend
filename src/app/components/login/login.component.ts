import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages } from '../../shared/messages/messages';
import { Autenticacao } from '../../core/model/model/autenticacao.model';
import { MessageService } from '../../core/services/message.service';
import { AuthService } from '../../core/services/auth.service';
import { SharedService } from '../../core/services/shared.service';
import Util from 'src/app/shared/util/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isViewPassword = false;
  public isInvalidForm = false;

  public constructor(
    private service: AuthService,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {
  }

  public ngOnInit(): void {
    this.onCreateForm();
  }

  public showHidePassword(): void {
    this.isViewPassword = !this.isViewPassword;
  }

  public onCreateForm(): void {
    this.form = this.formBuilder.group({
      cpf: [null, Validators.required],
      senha: [null, Validators.required]
    });
  }

  public onClickFormSubmit(): void {
    this.messageService.clearAllMessages();
    if (this.form.valid) {
      const cpf = this.form.value.cpf;
      if (!Util.isCpfValido(cpf)) {
        this.messageService.sendMessageError(Messages.CPF_INVALIDO);
        return;
      }
      const formValue: Autenticacao = {
        ...this.form.value
      };
      this.service.login(formValue).subscribe(response => {
        this.sharedService.setUserSession(response.result);
        this.sharedService.updateTemplateSet(true);
        this.router.navigate(['/home']);
      });
    } else {
      this.isInvalidForm = true;
      this.messageService.sendMessageError(Messages.CAMPO_OBRIGATORIO);
    }
  }

}
