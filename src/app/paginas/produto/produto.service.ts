import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "./model/produto";
import { ProdutoPostPut } from "./model/produto-post-put";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class ProdutoService {
    constantes: Constantes = new Constantes();
    constructor(private http: HttpClient) { }

    listarProdutosPorColaboradorESecao(colaboradorCod: string, secaoCod: string,
        descricao: string, codFabricante: string, codLoja: string) {
        return this.http.get<Produto[]>(this.constantes.PATH_LOCAL + '/api/produtos/listar?colaboradorCod=' + colaboradorCod
            + '&secaoCod=' + secaoCod
            + '&descricao=' + descricao
            + '&codFabricante=' + codFabricante
            + '&codLoja=' + codLoja);
    }

    salvar(produto: ProdutoPostPut) {
        return this.http.post<ProdutoPostPut>(this.constantes.PATH_LOCAL + 'https://terral-api.onrender.com/api/produtos', produto);
    }

    salvarEmLote(listaProdutos: ProdutoPostPut[]) {
        return this.http.post<Number>(this.constantes.PATH_LOCAL + '/api/produtos/salvarEmLote', listaProdutos)
    }

    editar(produto: ProdutoPostPut) {
        return this.http.put<ProdutoPostPut>(this.constantes.PATH_LOCAL + '/api/produtos', produto);
    }

    setarQuantidade(produto: ProdutoPostPut) {
        return this.http.put(this.constantes.PATH_LOCAL + '/api/produtos/setarQuantidade', produto);
    }

    devolverQuantidadeProduto(produtoCod: string) {
        return this.http.get<Produto>(this.constantes.PATH_LOCAL + '/api/produtos/devolverQuantidadeProduto?produtoCod=' + produtoCod);
    }
}