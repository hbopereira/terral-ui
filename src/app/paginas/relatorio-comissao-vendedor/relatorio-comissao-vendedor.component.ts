import { Component, OnInit } from '@angular/core';
import { VendaService } from '../venda/venda/venda.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { Venda } from '../venda/venda/model/venda';
import { ItemVenda } from '../venda/venda/model/item-venda';
import { Colaborador } from 'src/app/model/colaborador';


@Component({
  selector: 'app-relatorio-comissao-vendedor',
  templateUrl: './relatorio-comissao-vendedor.component.html',
  styleUrls: ['./relatorio-comissao-vendedor.component.css']
})
export class RelatorioComissaoVendedorComponent implements OnInit {

  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public dataInicial: string = "";
  public dataFinal: string = "";
  public descricao: string = "";
  public vendedorVenda: Colaborador = new Colaborador();
  public listaVazia: boolean = false;
  public listaVendedores: Colaborador[] = [];
  public vendedorFiltrado: any[] = [];
  public listaVendas: Venda[] = [];
  public listaCodVendaASeremPagas: string[] = [];
  public listaItensVenda: ItemVenda[] = [];
  public abrirModalItens: boolean = false;
  public abrirModalVerificar: boolean = false;
  public habilitarConsultar: boolean = false;
  public habilitarMarcarTodos: boolean = false;
  public habilitarPagar: boolean = false;
  public valorTotalComissaoVendedor: number = 0;
  public valorPagoComissaoVendedor: number = 0;
  public valorTotal = 0;

  constructor(private vendaService: VendaService,
    private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.listarVendedores();
  }

  habilitarBotaoConsultar(event: any) {
    if ((event !== undefined) && (event !== null)) {
      this.habilitarConsultar = true;
    }
  }


  listarDadosRelatorioComissaoVendedores() {
    this.habilitarPagar = false;
    this.listaVendas = [];
    this.valorTotalComissaoVendedor = 0;
    this.valorPagoComissaoVendedor = 0;
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
    this.vendaService.listarPorDataEVendedor(dataInicial, dataFinal, codVendedor).subscribe((response: Venda[]) => {
      if (response.length > 0 && response !== null) {
        this.habilitarMarcarTodos = true;
        this.listaVendas = response;
        this.listaVendas.forEach(v => {
          if (v.percentualDesconto === null) {
            v.percentualDesconto = 0;
          }
          if (v.pago) {
            v.desabilitar = true;
            this.valorPagoComissaoVendedor = this.valorPagoComissaoVendedor + v.valorVendedor;
          }
          this.valorTotalComissaoVendedor = this.valorTotalComissaoVendedor + v.valorVendedor;
        })
        this.listaVazia = false;
      } else {
        this.listaVazia = true;
        this.habilitarMarcarTodos = false;
      }
    })
  }

  setarPagoVendas(event: any, venda: Venda) {
    this.listaVendas.filter(v => v.cod === venda.cod).forEach(ve => {
      ve.pago = event;
      if (event) {
        this.listaCodVendaASeremPagas.push(ve.cod);
      } else {
        this.remover(ve.cod);
      }
    })
    if(this.listaCodVendaASeremPagas.length === 0){
      this.habilitarPagar = false;
    } else {
      this.habilitarPagar = true;;
    }
  }

  atualizarVendasComoPagas(atualizar: boolean) {
    if (atualizar) {
      this.vendaService.setarVendasComoPago(this.listaCodVendaASeremPagas).subscribe(() => {
        this.listarDadosRelatorioComissaoVendedores();
        this.mensagem = "Comissao paga sucesso!";
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
        this.fecharModalVerificacao();
      });
    } else {
       this.fecharModalVerificacao();
    }
  }

  remover(cod: string) {
    let indice = this.listaCodVendaASeremPagas.indexOf(cod);
    this.listaCodVendaASeremPagas.splice(indice, 1);
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

  marcarDesmarcarTodos(marcou: boolean) {
    this.listaVendas.forEach(venda => {
      if (marcou) {
        if (!venda.desabilitar) {
          venda.pago = true;
          this.listaCodVendaASeremPagas.push(venda.cod);
        }
      } else {
        if (!venda.desabilitar) {
          venda.pago = false;
          this.listaCodVendaASeremPagas = [];
        }
      }
    })
  }

  abrirModalListagemItens(venda: Venda) {
    this.abrirModalItens = true;
    this.valorTotal = venda.valorTotal;
    if (venda.itens.length > 0) {
      this.listaItensVenda = venda.itens;
    }
  }

  abrirModalVerificacao() {
    this.abrirModalVerificar = true;
  }

  fecharModalVerificacao() {
    this.abrirModalVerificar = false;
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


  listarVendedores() {
    this.colaboradorService.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaVendedores = response;
      }
    })
  }

  limparFiltros() {
    this.dataFinal = "";
    this.dataInicial = "";
    this.listaVendas = [];
    this.vendedorVenda = new Colaborador();
    this.habilitarConsultar = false;
    this.listaVazia = false;
    this.valorTotalComissaoVendedor = 0;
    this.habilitarMarcarTodos = false;
  }

  fecharModal() {
    this.listaItensVenda = [];
    this.abrirModalItens = false;
  }

}
