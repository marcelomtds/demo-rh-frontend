import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Colaborador } from 'src/app/core/model/model/colaborador.model';
import { Response } from 'src/app/core/model/model/response.model';
import { ColaboradorService } from 'src/app/core/services/usuario.service';

@Injectable()
export class ColaboradorResolver implements Resolve<Promise<Response<Colaborador>>> {

    constructor(
        private service: ColaboradorService
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<Response<Colaborador>> {
        const response: Response<Colaborador> = await this.service.findById(+route.params.id).toPromise();
        return response;
    }

}
