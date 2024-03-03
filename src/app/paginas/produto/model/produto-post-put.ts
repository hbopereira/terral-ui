import { Colaborador } from "src/app/model/colaborador";
import { Secao } from "src/app/model/secao";

export class ProdutoPostPut {
    colaborador: Colaborador = new Colaborador();
    secao: Secao = new Secao();
    cod: string = "";
    valor: string = "";
    valorColaborador: number = 0;
    descricaoProduto: string = "";
    porcentagemColaborador: number = 0;
    quantidade: number = 0;
    temEstoque: number = 0;
    codFabricante : string = "";
    codLoja: string = "";
;}