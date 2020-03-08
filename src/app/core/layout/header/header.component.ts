import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';
import { SharedService } from '../../services/shared.service';
import { Usuario } from '../../model/model/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public usuario = new Usuario();

  public constructor(
    private sharedService: SharedService,
    public authGuardService: AuthGuard
  ) { }

  public ngOnInit(): void {
    this.usuario = this.sharedService.getUserSession();
  }

  public signOut(): void {
    this.sharedService.removeUserSession();
    window.location.reload();
  }

  public get getNome(): string {
    return this.usuario.nomeCompleto.split(' ')[0];
  }

}
