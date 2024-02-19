import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Produto } from "./model/produto";
import { ProdutoPostPut } from "./model/produto-post-put";

@Injectable()
export class ProdutoService {
    constructor(private http: HttpClient) { }

    listarProdutosPorColaboradorESecao(colaboradorCod: string, secaoCod: string, descricao: string) {
        return this.http.get<Produto[]>('http://localhost:8080/api/produtos/listar?colaboradorCod=' + colaboradorCod + '&secaoCod=' + secaoCod + '&descricao=' + descricao);
    }

    salvar(produto: ProdutoPostPut) {
        return this.http.post<ProdutoPostPut>('http://localhost:8080/api/produtos', produto);
    }

    editar(produto: ProdutoPostPut) {
        return this.http.put<ProdutoPostPut>('http://localhost:8080/api/produtos', produto);
    }

    setarQuantidade(produto: ProdutoPostPut) {
        return this.http.put('http://localhost:8080/api/produtos/setarQuantidade', produto);
    }

    devolverQuantidadeProduto(produtoCod: string){
        return this.http.get<Produto>('http://localhost:8080/api/produtos/devolverQuantidadeProduto?produtoCod=' + produtoCod);
    }
}