import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "./model/produto";
import { ProdutoPostPut } from "./model/produto-post-put";

@Injectable()
export class ProdutoService {
    constructor(private http: HttpClient) { }

    listarProdutosPorColaboradorESecao(colaboradorCod: string, secaoCod: string,
        descricao: string, codFabricante: string, codLoja: string) {
        return this.http.get<Produto[]>('https://terral-api.onrender.com/api/produtos/listar?colaboradorCod=' + colaboradorCod
            + '&secaoCod=' + secaoCod
            + '&descricao=' + descricao
            + '&codFabricante=' + codFabricante
            + '&codLoja=' + codLoja);
    }

    salvar(produto: ProdutoPostPut) {
        return this.http.post<ProdutoPostPut>('https://terral-api.onrender.com/api/produtos', produto);
    }

    salvarEmLote(listaProdutos: ProdutoPostPut[]) {
        return this.http.post<Number>('https://terral-api.onrender.com/api/produtos/salvarEmLote', listaProdutos)
    }

    editar(produto: ProdutoPostPut) {
        return this.http.put<ProdutoPostPut>('https://terral-api.onrender.com/api/produtos', produto);
    }

    setarQuantidade(produto: ProdutoPostPut) {
        return this.http.put('https://terral-api.onrender.com/api/produtos/setarQuantidade', produto);
    }

    devolverQuantidadeProduto(produtoCod: string) {
        return this.http.get<Produto>('https://terral-api.onrender.com/api/produtos/devolverQuantidadeProduto?produtoCod=' + produtoCod);
    }
}