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

  public dataInicial: string = "";
  public dataFinal: string = "";
  public vendedorVenda: Colaborador = new Colaborador();
  public listaVazia: boolean = false;
  public listaItensVenda: ItemVenda[] = [];
  public abrirModalItens: boolean = false;
  public listaVendedores: Colaborador[] = [];
  public listaVendas: Venda[] = [];
  public vendedorFiltrado: any[] = [];
  public habilitarConsultar: boolean = false;
  public habilitarMarcarTodos: boolean = false;
  public valorTotalColaborador: number = 0;

  constructor(private vendaService: VendaService,
    private colaboradorService: ColaboradorService) { }

  ngOnInit(): void {
    this.listarVendedores();
  }

  listarDadosRelatorioProdutoColaborador() {
    this.listaVendas = [];
    this.valorTotalColaborador = 0;
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
          let valor = item.valorColaborador * item.quantidade;
          this.valorTotalColaborador = this.valorTotalColaborador + valor;
          item.valorColaborador = this.calcularValorColaborador(item);
        })
        this.listaVazia = false;
      } else {
        this.listaVazia = true;
        this.listaItensVenda = [];
        this.habilitarMarcarTodos = false;
      }
    })
  }

  calcularValorColaborador(itemVenda: ItemVenda) {
    let valorColaborador = Number(itemVenda.valor) * (itemVenda.porcentagemColaborador / 100)
    return valorColaborador;
  }

  limparFiltros(){
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
    this.listaVendas.forEach(venda => {
      if (marcou) {
        venda.escolheu = true;
      } else {
        venda.escolheu = false;
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


}
