import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Cargo } from 'src/app/core/model/model/cargo.model';
import { Colaborador } from 'src/app/core/model/model/colaborador.model';
import { Response } from 'src/app/core/model/model/response.model';
import { CargoService } from 'src/app/core/services/cargo.service';

@Injectable()
export class CargoResolver implements Resolve<Promise<Response<Cargo>>> {

    constructor(
        private service: CargoService
    ) { }

    async resolve(route: ActivatedRouteSnapshot): Promise<Response<Colaborador>> {
        const response: Response<Cargo> = await this.service.findById(+route.params.id).toPromise();
        return response;
    }

}
