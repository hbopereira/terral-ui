import { Component, OnInit } from '@angular/core';
import { VendaService } from './venda.service';
import { Venda } from './model/venda';
import { ItemVenda } from './model/item-venda';

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
  public somaTotal: number = 0;
  public listaVendas: Venda[] = [];
  public listaItensVenda: ItemVenda[] = [];


  constructor(private service: VendaService) { }

  ngOnInit(): void {
    this.listarVendas();
  }

  listarVendas() {
    this.service.listarVendas().subscribe((response: Venda[]) => {
      if (response.length > 0) {
        this.listaVendas = response;
        this.listaVendas.forEach(venda => {
          this.calcularValorTotalVendas(venda);
        })
        this.calcularValorTotalVendedor();
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
    this.somaTotal = Number(this.somaValorTotalVenda);
  }

  calcularValorTotalVendedor() {
    this.somaValorTotalVendedor = this.listaVendas.map(item => item.valorVendedor).reduce((prev, next) => prev + next);
  }

  abrirModalListagemItens(venda: Venda) {
    this.abrirModalItens = true;
    if (venda.itens.length > 0) {
      this.listaItensVenda = venda.itens;
    }
  }

  fecharModal() {
    this.listaItensVenda = [];
    this.abrirModalItens = false;
  }
}
