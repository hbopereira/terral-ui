import { Component, OnInit } from '@angular/core';
import { VendaService } from './venda.service';
import { Venda } from './model/venda';
import { Colaborador } from 'src/app/model/colaborador';
import { ItemVenda } from './model/item-venda';
import { ColaboradorService } from '../../colaborador/colaborador.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  public temDesconto: Boolean = false;
  public abrirModalItens: boolean = false;
  public somaValorTotalVendaDesconto: number = 0;
  public somaValorTotalVenda: number = 0;
  public somaValorTotalVendedor: number = 0;
  public valorTotal: number = 0;
  public vendedorFiltrado: any[] = [];
  public listaVendas: Venda[] = [];
  public listaItensVenda: ItemVenda[] = [];
  public listaVendedores: Colaborador[] = [];
  public dataInicial: string = "";
  public dataFinal: string = "";
  public descricao: string = "";
  public vendedorVenda: any;
  public listaVazia: boolean = false;
  public totalVendas: number = 0;
  public habilitarSpinner: boolean = false;


  constructor(private vendaService: VendaService,
    private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.listarVendedores();
    this.listarPorDataEVendedor();
  }


  listarPorDataEVendedor() {
    this.habilitarSpinner = true;
    this.listaVendas = [];
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
      if (response.length > 0) {
        this.habilitarSpinner = false;
        this.somaValorTotalVenda = 0;
        this.listaVendas = response;
        this.totalVendas = this.listaVendas.length;
        this.listaVendas.forEach(venda => {
          switch (venda.formaPagamento) {
            case "DEBITO":
              venda.cor = "#808080";
              break;
            case "CREDITO":
              venda.cor = "#3366CC";
              break;
            case "PIX":
              venda.cor = "#000000";
              break;
            case "DINHEIRO":
              venda.cor = "#00FF00";
              break;
            default:
          }
          this.calcularValorTotalVendas(venda);
        })
        this.listaVazia = false;
      } else {
        this.habilitarSpinner = false;
        this.listaVazia = true;
        this.listaVendas = [];
        this.somaValorTotalVenda = 0;
        this.totalVendas = 0;
      }
    })
  }


  calcularValorVendedor(venda: Venda) {
    let calculo = 10 / 100;
    let valorVendedor = 0;
    if (venda.valorDesconto === 0) {
      valorVendedor = venda.valorTotal * calculo;
    } else {
      valorVendedor = venda.valorTotalComDesconto * calculo;
    }
    return valorVendedor;
  }

  calcularDescontoVenda(venda: Venda) {
    let valorDesconto = venda.valorTotalComDesconto * (1 - venda.valorDesconto / 100)
    return valorDesconto;
  }

  calcularValorTotalVendas(venda: Venda) {
    this.somaValorTotalVenda = this.somaValorTotalVenda + venda.valorTotal;
  }

  calcularValorTotalVendedor() {
    this.somaValorTotalVendedor = this.listaVendas.map(item => item.valorVendedor).reduce((prev, next) => prev + next);
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

  listarVendedores() {
    this.colaboradorService.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaVendedores = response;
      }
    })
  }

  limparFiltrosVenda() {
    this.dataInicial = "";
    this.dataFinal = "";
    this.vendedorVenda = undefined;
    this.listaVendas = [];
    this.somaValorTotalVenda = 0;
    this.totalVendas = 0;
  }

  abrirModalListagemItens(venda: Venda) {
    this.abrirModalItens = true;
    this.valorTotal = venda.valorTotal;
    if (venda.itens.length > 0) {
      this.listaItensVenda = venda.itens;
    }
  }

  fecharModal() {
    this.listaItensVenda = [];
    this.abrirModalItens = false;
  }
}
