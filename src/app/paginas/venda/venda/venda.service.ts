import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Venda } from "./model/venda";
import { ItemVenda } from "./model/item-venda";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class VendaService {
    constantes: Constantes = new Constantes();
    constructor(private http: HttpClient) { }

    listarVendas() {
        return this.http.get<Venda[]>(this.constantes.PATH_LOCAL +'/api/vendas/listar');
    }

    listarPorDataEVendedor(dataInicial: Date, dataFinal: Date, codVendedor: string) {
        return this.http.get<Venda[]>(this.constantes.PATH_LOCAL + '/api/vendas/listarPorDataEVendedor?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
    }

    listarDadosRelatorioProdutoColaborador(dataInicial: Date, dataFinal: Date, codVendedor: string) {
        return this.http.get<ItemVenda[]>(this.constantes.PATH_LOCAL +'/api/vendas/produtoColaborador?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
    }

    salvar(venda: Venda) {
        return this.http.post<Venda>(this.constantes.PATH_LOCAL +'/api/vendas/salvar', venda);
    }

    setarVendasItensVendaComoPago(listaCodigosVenda: string[], isVenda: boolean) {
        return this.http.put<string>(this.constantes.PATH_LOCAL +'/api/vendas/setarVendasItensVendaComoPago?isVenda=' + isVenda, listaCodigosVenda);
    }

    listarPorDia() {
        return this.http.get<Venda[]>(this.constantes.PATH_LOCAL +'/api/vendas/listarPorDia');
    }

    listarVendasProdutoSecao() {
        return this.http.get<Venda[]>(this.constantes.PATH_LOCAL +'/api/vendas/listarVendasProdutoSecao');
    }

}