import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Colaborador } from '../model/model/colaborador.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public subject = new Subject<boolean>();

  public isLoggedIn(): boolean {
    return this.getUserSession() ? true : false;
  }

  public updateTemplateGet(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public updateTemplateSet(showTemplate: boolean): void {
    this.subject.next(showTemplate);
  }

  public getUserSession(): Colaborador {
    return JSON.parse(sessionStorage.getItem('usuario'));
  }

  public setUserSession(usuario: Colaborador): void {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }

  public removeUserSession(): void {
    sessionStorage.removeItem('usuario');
  }

}
