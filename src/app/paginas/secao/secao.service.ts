import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Secao } from "src/app/model/secao";

@Injectable()
export class SecaoService {
    constructor(private http: HttpClient) { }

    listarSecoes() {
        return this.http.get<Secao[]>('http://localhost:8080/api/secoes');
    }

    salvar(secao: Secao) {
        return this.http.post<Secao>('http://localhost:8080/api/secoes', secao);
    }

    editar(secao: Secao) {
        return this.http.put<Secao>('http://localhost:8080/api/secoes', secao);
    }
}


