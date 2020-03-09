import { Component, OnInit } from '@angular/core';
import { AuthService as OAuth2 } from 'angular4-social-login';
import { AuthGuard } from '../../guards/auth.guard';
import { Usuario } from '../../model/model/usuario.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public usuario = new Usuario();

  public constructor(
    private sharedService: SharedService,
    public authGuardService: AuthGuard,
    private socioAuthService: OAuth2
  ) { }

  public ngOnInit(): void {
    this.usuario = this.sharedService.getUserSession();
  }

  public signOut(): void {
    this.sharedService.removeUserSession();
    this.socioAuthService.signOut();
    window.location.reload();
  }

  public get getNome(): string {
    return this.usuario.nomeCompleto.split(' ')[0];
  }

}
