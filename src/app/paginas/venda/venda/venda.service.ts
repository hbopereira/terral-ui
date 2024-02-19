import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Venda } from "./model/venda";

@Injectable()
export class VendaService {
    constructor(private http: HttpClient) { }

    listarVendas() {
        return this.http.get<Venda[]>('http://localhost:8080/api/vendas/listar');
    }

    salvar(venda: Venda) {
        return this.http.post<Venda>('http://localhost:8080/api/vendas/salvar', venda);
    }

}