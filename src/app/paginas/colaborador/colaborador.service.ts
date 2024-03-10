import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Colaborador } from "src/app/model/colaborador";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class ColaboradorService {
    constantes: Constantes = new Constantes();
    constructor(private http: HttpClient) { }

    listarColaboradores() {
        return this.http.get<Colaborador[]>(this.constantes.PATH_LOCAL + '/api/colaboradores');
    }

    listarPorCod(cod: string) {
        return this.http.get<Colaborador>(this.constantes.PATH_LOCAL +'/api/colaboradores/listarPorCod?cod=' + cod);
    }

    salvar(colaborador: Colaborador) {
        return this.http.post<Colaborador>(this.constantes.PATH_LOCAL +'/api/colaboradores', colaborador);
    }

    editar(colaborador: Colaborador) {
        return this.http.put<Colaborador>(this.constantes.PATH_LOCAL +'/api/colaboradores', colaborador);
    }
}


