import { Colaborador } from "src/app/model/colaborador";
import { ItemVenda } from "./item-venda";

export class Venda {
    cod: string = "";
    dataVenda: any;
    valorTotal: number = 0;
    valorTotalComDesconto: number = 0;
    percentualDesconto: number = 0;
    taxa: number = 0;
    valorDesconto: number = 0;
    formaPagamento: string = "";
    nomeCliente: string = "";
    valorVendedor: number = 0;
    vendedor: Colaborador = new Colaborador();
    itens: ItemVenda[] = [];
    pago: boolean = false;
    desabilitar: boolean = false;
    total: number = 0;
    descricao_Secao: string = "";
    cor: string = "";
    desabilitarPagarTable: boolean = false;
}