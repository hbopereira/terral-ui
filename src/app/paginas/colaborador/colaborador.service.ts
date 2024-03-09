import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Colaborador } from "src/app/model/colaborador";

@Injectable()
export class ColaboradorService {
    constructor(private http: HttpClient) { }

    listarColaboradores() {
        return this.http.get<Colaborador[]>('https://terral-api.onrender.com/api/colaboradores');
    }

    listarPorCod(cod: string) {
        return this.http.get<Colaborador>('https://terral-api.onrender.com/api/colaboradores/listarPorCod?cod=' + cod);
    }

    salvar(colaborador: Colaborador) {
        return this.http.post<Colaborador>('https://terral-api.onrender.com/api/colaboradores', colaborador);
    }

    editar(colaborador: Colaborador) {
        return this.http.put<Colaborador>('https://terral-api.onrender.com/api/colaboradores', colaborador);
    }
}


