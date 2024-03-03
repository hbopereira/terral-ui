import { Component, OnInit } from '@angular/core';
import { VendaService } from '../venda/venda/venda.service';
import { Venda } from '../venda/venda/model/venda';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private vendaService: VendaService) {
  }

  ngOnInit(): void {
    this.configurarGraficoLinha();
    this.configurarGraficoPizza();
  }

  public lineChartData: any;
  public pieChartData: any;


  configurarGraficoPizza() {
    this.vendaService.listarVendasProdutoSecao().subscribe((response: Venda[]) => {
      if (response.length > 0) {
        this.pieChartData = {
          labels: response.map(dado => dado.descricao_Secao),
          datasets: [
            {
              data: response.map(dado => dado.valorTotal),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      }
    })
  }

  configurarGraficoLinha() {
    this.vendaService.listarPorDia().subscribe((response: Venda[]) => {
      if (response.length > 0) {
        response.forEach(venda => {
          venda.dataVenda = this.converterStringParaData(venda.dataVenda);

        })
        let diasDoMes = this.configurarDiasMes();
        let totaisDebito = this.totaisPorCadaDiaMes(
          response.filter(dado => dado.formaPagamento === 'DEBITO'), diasDoMes);
        let totaisCredito = this.totaisPorCadaDiaMes(
          response.filter(dado => dado.formaPagamento === 'CREDITO'), diasDoMes);
        let totaisPix = this.totaisPorCadaDiaMes(
          response.filter(dado => dado.formaPagamento === 'PIX'), diasDoMes);
        let totaisDinheiro = this.totaisPorCadaDiaMes(
          response.filter(dado => dado.formaPagamento === 'DINHEIRO'), diasDoMes);
        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Credito',
              data: totaisCredito,
              borderColor: '#3366CC'
            },
            {
              label: 'Debito',
              data: totaisDebito,
              borderColor: '#808080'
            },
            {
              label: 'Dinheiro',
              data: totaisDinheiro,
              borderColor: '#00FF00'
            },
            {
              label: 'Pix',
              data: totaisPix,
              borderColor: '#000000'
            }
          ]
        };
      }
    })

  }

  converterStringParaData(dataVenda: any) {
    let data = new Date(dataVenda);
    data.setDate(data.getDate() + 1);
    return data;
  }

  configurarDiasMes() {
    let mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);
    let quantidade = mesReferencia.getDate();
    let dias: number[] = [];
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

  totaisPorCadaDiaMes(dados: Venda[], diasDoMes: any) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      dados.filter(d => d.dataVenda.getDate() === dia).forEach(di => {
        di.total = dados.filter(v => v.formaPagamento === di.formaPagamento && v.dataVenda.getDate() === dia).length;
        total = di.total;
      });
      totais.push(total);
    }
    return totais;
  }

}
