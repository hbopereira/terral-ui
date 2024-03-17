import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Colaborador } from "src/app/model/colaborador";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class LoginService {
    constantes: Constantes = new Constantes();
    constructor(private http: HttpClient) { }

    autenticar(colaborador: Colaborador) {
        return this.http.post<Colaborador>(this.constantes.PATH_LOCAL + '/api/login',colaborador);
    }

}