import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColaboradorFilter } from '../model/filter/colaborador.filter';
import { Colaborador } from '../model/model/colaborador.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends BaseService<Colaborador, ColaboradorFilter> {

  public constructor(http: HttpClient) {
    super(http, '/api/colaborador');
  }

}
