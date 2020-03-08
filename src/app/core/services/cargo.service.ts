import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Cargo } from '../model/model/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService extends BaseService<Cargo, {}> {

  public constructor(http: HttpClient) {
    super(http, '/api/cargo');
  }

}
