import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService as OAuth2, GoogleLoginProvider } from 'angular4-social-login';
import { Usuario } from 'src/app/core/model/model/usuario.model';
import Util from 'src/app/shared/util/util';
import { Autenticacao } from '../../core/model/model/autenticacao.model';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from '../../core/services/message.service';
import { SharedService } from '../../core/services/shared.service';
import { Messages } from '../../shared/messages/messages';

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
    private sharedService: SharedService,
    private socioAuthService: OAuth2
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
        this.login(response.result);
      });
    } else {
      this.isInvalidForm = true;
      this.messageService.sendMessageError(Messages.CAMPO_OBRIGATORIO);
    }
  }

  public singInGoogle(): void {
    this.messageService.clearAllMessages();
    this.socioAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (response) => {
        const usuario: Usuario = {
          nomeCompleto: response.name,
          perfilDescricao: 'Visitante - Google',
          imagem: response.photoUrl
        };
        this.login(usuario);
      }
    );
  }

  private login(usuario: Usuario): void {
    this.sharedService.setUserSession(usuario);
    this.sharedService.updateTemplateSet(true);
    this.router.navigate(['/home']);
  }

}
