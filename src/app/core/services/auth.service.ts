import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autenticacao } from '../model/model/autenticacao.model';
import { Response } from '../model/model/response.model';
import { BaseService } from './base.service';
import { Colaborador } from '../model/model/colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<Autenticacao, {}> {

  constructor(http: HttpClient) {
    super(http, '/api/auth');
  }

  public login(formValue: Autenticacao): Observable<Response<Colaborador>> {
    return this.http.post<Response<Colaborador>>(this.apiBaseUrl, formValue);
  }

}
