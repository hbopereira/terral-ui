import { Colaborador } from "src/app/model/colaborador";
import { ItemComanda } from "./item-comanda";
import { StatusComanda } from "./status-comanda";

export class Comanda {
    cod: string = "";
    valorTotal: number = 0;
    dataComanda: string = "";
    valorTotalComDesconto: number = 0;
    percentualDesconto: number = 0;
    taxa: number = 0;
    forma: StatusComanda = new StatusComanda();
    formaPagamento: string = "";
    status: string = "";
    nomeCliente: string = "";
    valorVendedor: number = 0;
    vendedor: Colaborador = new Colaborador();
    itens: ItemComanda[] = [];
    cor: string = "";
}