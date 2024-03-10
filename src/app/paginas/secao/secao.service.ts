import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Secao } from "src/app/model/secao";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class SecaoService {
    constantes: Constantes = new Constantes();
    constructor(private http: HttpClient) { }

    listarSecoes() {
        return this.http.get<Secao[]>(this.constantes.PATH_LOCAL +'/api/secoes');
    }

    salvar(secao: Secao) {
        return this.http.post<Secao>(this.constantes.PATH_LOCAL +'/api/secoes', secao);
    }

    editar(secao: Secao) {
        return this.http.put<Secao>(this.constantes.PATH_LOCAL +'/api/secoes', secao);
    }
}


