import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Secao } from "src/app/model/secao";

@Injectable()
export class SecaoService {
    constructor(private http: HttpClient) { }

    listarSecoes() {
        return this.http.get<Secao[]>('https://terral-api.onrender.com/api/secoes');
    }

    salvar(secao: Secao) {
        return this.http.post<Secao>('https://terral-api.onrender.com/api/secoes', secao);
    }

    editar(secao: Secao) {
        return this.http.put<Secao>('https://terral-api.onrender.com/api/secoes', secao);
    }
}


