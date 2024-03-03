import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Venda } from "./model/venda";
import { ItemVenda } from "./model/item-venda";

@Injectable()
export class VendaService {
    constructor(private http: HttpClient) { }

    listarVendas() {
        return this.http.get<Venda[]>('http://localhost:8080/api/vendas/listar');
    }

    listarPorDataEVendedor(dataInicial: Date, dataFinal: Date, codVendedor: string) {
        return this.http.get<Venda[]>('http://localhost:8080/api/vendas/listarPorDataEVendedor?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
    }

    listarDadosRelatorioProdutoColaborador(dataInicial: Date, dataFinal: Date, codVendedor: string) {
        return this.http.get<ItemVenda[]>('http://localhost:8080/api/vendas/produtoColaborador?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
    }

    salvar(venda: Venda) {
        return this.http.post<Venda>('http://localhost:8080/api/vendas/salvar', venda);
    }

    setarVendasItensVendaComoPago(listaCodigosVenda: string[], isVenda: boolean) {
        return this.http.put<string>('http://localhost:8080/api/vendas/setarVendasItensVendaComoPago?isVenda=' + isVenda, listaCodigosVenda);
    }

    listarPorDia() {
        return this.http.get<Venda[]>('http://localhost:8080/api/vendas/listarPorDia');
    }

    listarVendasProdutoSecao() {
        return this.http.get<Venda[]>('http://localhost:8080/api/vendas/listarVendasProdutoSecao');
    }

}