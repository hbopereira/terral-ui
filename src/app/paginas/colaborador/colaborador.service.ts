import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Colaborador } from "src/app/model/colaborador";

@Injectable()
export class ColaboradorService {
    constructor(private http: HttpClient) { }

    listarColaboradores() {
        return this.http.get<Colaborador[]>('http://localhost:8080/api/colaboradores');
    }

    listarPorCod(cod: string) {
        return this.http.get<Colaborador>('http://localhost:8080/api/colaboradores/listarPorCod?cod=' + cod);
    }

    salvar(colaborador: Colaborador) {
        return this.http.post<Colaborador>('http://localhost:8080/api/colaboradores', colaborador);
    }

    editar(colaborador: Colaborador) {
        return this.http.put<Colaborador>('http://localhost:8080/api/colaboradores', colaborador);
    }
}


