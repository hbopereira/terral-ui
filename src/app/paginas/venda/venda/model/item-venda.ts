export class ItemVenda {
    cod: string = "";
    descricao: string = "";
    valor: number = 0;
    valorColaborador: number = 0;
    quantidade: number = 0;
    quantidadeGramas: number = 0;
    codProduto: string = "";
    nomeColaborador: string = "";
    dataVenda: string = "";
    porcentagemColaborador: number = 0;
    nomeVendedor: string = "";
    taxa: number = 0;
    formaPagamento: string = "";
    valorColaboradorComTaxa: number = 0;
    valorFinal: number = 0;
    valorFinalColaborador: number = 0;
    pago : boolean = false;
    desabilitar: boolean = false;
    desabilitarPagarTable: boolean = false;
}