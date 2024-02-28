import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/model/colaborador';
import { Venda } from '../venda/venda/model/venda';
import { ItemVenda } from '../venda/venda/model/item-venda';
import { VendaService } from '../venda/venda/venda.service';
import { ColaboradorService } from '../colaborador/colaborador.service';

@Component({
  selector: 'app-relatorio-produto-colaborador',
  templateUrl: './relatorio-produto-colaborador.component.html',
  styleUrls: ['./relatorio-produto-colaborador.component.css']
})
export class RelatorioProdutoColaboradorComponent implements OnInit {
  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info'
  public dataInicial: string = "";
  public dataFinal: string = "";
  public vendedorVenda: Colaborador = new Colaborador();
  public listaVazia: boolean = false;
  public listaItensVenda: ItemVenda[] = [];
  public listaCodItemVendaASeremPagas: string[] = [];
  public abrirModalItens: boolean = false;
  public listaVendedores: Colaborador[] = [];
  public vendedorFiltrado: any[] = [];
  public habilitarConsultar: boolean = false;
  public abrirModalVerificar: boolean = false;
  public habilitarMarcarTodos: boolean = false;
  public habilitarPagar: boolean = false;
  public valorTotalColaborador: number = 0;
  public valorPagoColaborador: number = 0;
  public calculoTaxaDebito: number = 0.75 / 100;
  public calculoTaxaCredito: number = 0.95 / 100;

  constructor(private vendaService: VendaService,
    private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.listarVendedores();
  }

  listarDadosRelatorioProdutoColaborador() {
    let taxa = 0;
    let valor = 0;
    this.listaItensVenda = [];
    this.valorTotalColaborador = 0;
    this.habilitarPagar = false;
    this.valorPagoColaborador = 0;
    let dataInicial = new Date();
    let dataFinal = new Date();
    let codVendedor = "";

    if (this.vendedorVenda !== undefined) {
      codVendedor = this.vendedorVenda.cod;
    }
    if (this.dataInicial !== "") {
      dataInicial = new Date(this.dataInicial);
      let dataI = dataInicial.getDate() + 1;
      dataInicial.setDate(dataI);
    }
    if (this.dataFinal !== "") {
      dataFinal = new Date(this.dataFinal)
      let dataF = dataFinal.getDate() + 1;
      dataFinal.setDate(dataF);
    }
    this.vendaService.listarDadosRelatorioProdutoColaborador(dataInicial, dataFinal, codVendedor).subscribe((response: ItemVenda[]) => {
      if (response.length > 0 && response !== null) {
        this.habilitarMarcarTodos = true;
        this.listaItensVenda = response;
        this.listaItensVenda.forEach(item => {
          valor = item.valorColaborador * item.quantidade;
          if (item.formaPagamento === "CREDITO") {
            taxa = valor * this.calculoTaxaCredito;
            item.taxa = taxa;
            valor = valor - item.taxa;
            item.valorColaborador = this.calcularValorColaborador(item);
            item.valorColaboradorComTaxa = item.valorColaborador * item.quantidade - item.taxa;
          }
          else if (item.formaPagamento === "DEBITO") {
            taxa = valor * this.calculoTaxaDebito;
            item.taxa = taxa;
            valor = valor - item.taxa;
            item.valorColaborador = this.calcularValorColaborador(item);
            item.valorColaboradorComTaxa = item.valorColaborador * item.quantidade - item.taxa;
          } else {
            item.taxa = 0;
            item.valorColaboradorComTaxa = item.valorColaborador * item.quantidade;
          }
          item.valorFinal = item.valor * item.quantidade;
          item.valorFinalColaborador = item.valorColaborador * item.quantidade
          this.valorTotalColaborador = this.valorTotalColaborador + valor;
          if (item.pago) {
            item.desabilitar = true;
            this.valorPagoColaborador = this.valorPagoColaborador + valor;
          }
        })
        this.listaVazia = false;
      } else {
        this.listaVazia = true;
        this.listaItensVenda = [];
        this.habilitarMarcarTodos = false;
      }
    })
  }

  atualizarItensVendasComoPagas(atualizar: boolean) {
    if (atualizar) {
      this.vendaService.setarVendasItensVendaComoPago(this.listaCodItemVendaASeremPagas, false).subscribe(() => {
        this.listarDadosRelatorioProdutoColaborador();
        this.mensagem = "valor colaborador pago sucesso!";
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
        this.fecharModalVerificacao();
      });
    } else {
       this.fecharModalVerificacao();
    }
  }

  setarPagoItensVendas(event: any, itemVenda: ItemVenda) {
    this.listaItensVenda.filter(v => v.cod === itemVenda.cod).forEach(ve => {
      ve.pago = event;
      if (event) {
        this.listaCodItemVendaASeremPagas.push(ve.cod);
      } else {
        this.remover(ve.cod);
      }
    })
    if (this.listaCodItemVendaASeremPagas.length === 0) {
      this.habilitarPagar = false;
    } else {
      this.habilitarPagar = true;;
    }
  }



  remover(cod: string) {
    let indice = this.listaCodItemVendaASeremPagas.indexOf(cod);
    this.listaCodItemVendaASeremPagas.splice(indice, 1);
  }

  calcularValorColaborador(itemVenda: ItemVenda) {
    let valorColaborador = Number(itemVenda.valor) * (itemVenda.porcentagemColaborador / 100)
    return valorColaborador;
  }

  limparFiltros() {
    this.dataFinal = "";
    this.dataInicial = "";
    this.listaItensVenda = [];
    this.vendedorVenda = new Colaborador();
    this.habilitarConsultar = false;
    this.listaVazia = false;
    this.habilitarMarcarTodos = false;
    this.valorTotalColaborador = 0;
  }

  habilitarBotaoConsultar(event: any) {
    if ((event !== undefined) && (event !== null)) {
      this.habilitarConsultar = true;
    }
  }

  marcarDesmarcarTodos(marcou: boolean) {
    this.listaItensVenda.forEach(item => {
      if (marcou) {
        if (!item.desabilitar) {
          item.pago = true;
          this.listaCodItemVendaASeremPagas.push(item.cod);
          this.habilitarPagar = true;
        }
      } else {
        if (!item.desabilitar) {
          item.pago = false;
          this.listaCodItemVendaASeremPagas = [];
          this.habilitarPagar = false;
        }
      }
    })
  }

  listarVendedores() {
    this.colaboradorService.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaVendedores = response;
      }
    })
  }

  filtroVendedor(event: any) {
    let filtrados: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listaVendedores.length; i++) {
      let vendedor = this.listaVendedores[i];
      if (vendedor.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrados.push(vendedor);
      }
    }
    this.vendedorFiltrado = filtrados;
  }

  getExibirMensagemAlerta(mensagem: string, icone: string, tipo: string, fixarMsg: boolean) {
    this.mensagem = mensagem;
    this.tipoIcone = icone;
    this.tipoMensagem = tipo;
    this.exibirMensagem = true;
    if (!fixarMsg) {
      setInterval(() => {
        this.exibirMensagem = false;
      }, 10000);
    }
  }

  abrirModalVerificacao() {
    this.abrirModalVerificar = true;
  }

  fecharModalVerificacao() {
    this.abrirModalVerificar = false;
  }


}
