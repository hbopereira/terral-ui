import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto/produto.service';
import { VendaService } from '../venda/venda/venda.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { Comanda } from './model/comanda';
import { Venda } from '../venda/venda/model/venda';
import { Produto } from '../produto/model/produto';
import { Colaborador } from 'src/app/model/colaborador';
import { ItemComanda } from './model/item-comanda';
import { StatusComanda } from './model/status-comanda';
import { ComandaService } from './comanda.service';
import { ProdutoPostPut } from '../produto/model/produto-post-put';

@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css']
})



export class ComandaComponent implements OnInit {
  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public novaComanda: boolean = false;
  public editarComanda: boolean = false;
  public abrirModalComanda: boolean = false;
  public abrirModalItens: boolean = false;
  public abrirModalVerificar: boolean = false;
  public listaVaziaProdutos: boolean = false;
  public desabilitarVendedor: boolean = false;
  public desabilitarBotoes: boolean = false;
  public listaVazia: boolean = false;
  public camposVazios: boolean = false;
  public habilitarFormaPagamento: boolean = false;
  public valorTotalComanda: number = 0;
  public colaboradorSelecionado: any;
  public formaPagamentoSelecionada: any;
  public vendedorModal: any;
  public comanda: Comanda = new Comanda();
  public comandaEdicao: Comanda = new Comanda();
  public produto: Produto = new Produto();
  public vendedor: Colaborador = new Colaborador();
  public itemComanda: ItemComanda = new ItemComanda();
  public vendedorFiltrado: any[] = [];
  public formaFiltrada: any[] = [];
  public colaboradorFiltrado: any[] = [];
  public listaComandas: Comanda[] = [];
  public listaProdutos: Produto[] = [];
  public listaVendedores: Colaborador[] = [];
  public listaItens: ItemComanda[] = [];
  public listaItensAux: ItemComanda[] = [];
  public listaColaboradores: Colaborador[] = [];
  public formaPagamentoComanda: StatusComanda[] = [];
  public produtosClonados: { [s: string]: Produto; } = {};
  public dataInicial: string = "";
  public dataFinal: string = "";
  public descricao: string = "";
  public codFabricante: string = "";
  public codLoja: string = "";
  public vendedorComanda: any;;
  public entrou: boolean = false;
  public totalComandas: number = 0;
  public totalAbertas: number = 0;
  public totalFechadas: number = 0;
  public habilitarSpinner: boolean = false;
  public desabilitarSim: boolean = false;
  public calculaValorProdutoEmGramas: boolean = false;
  public desabilitar: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private vendaService: VendaService,
    private colaboradorService: ColaboradorService,
    private comandaService: ComandaService) { }

  ngOnInit(): void {
    this.listarVendedores();
    this.listarPorDataEVendedor();
    this.formaPagamentoComanda = [
      { descricao: 'CREDITO' },
      { descricao: 'DEBITO' },
      { descricao: 'DINHEIRO' },
      { descricao: 'PIX' }];
  }

  setarColaboradorLogado() {
    let usuario = localStorage.getItem('usuario');
    if (usuario !== null) {
      let colaborador: Colaborador = JSON.parse(usuario);
      if(colaborador.papel === 'USUARIO'){
         this.vendedorModal = colaborador;
         this.desabilitar = true;
      }
    }
  }

  listarPorDataEVendedor() {
    this.totalAbertas = 0;
    this.totalFechadas = 0;
    this.habilitarSpinner = true;
    let dataInicial = new Date();
    let dataFinal = new Date();
    let codVendedor = "";

    if (this.vendedorComanda !== undefined) {
      codVendedor = this.vendedorComanda.cod;
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
    this.comandaService.listarPorDataEVendedor(dataInicial, dataFinal, codVendedor).subscribe((response: Comanda[]) => {
      if (response.length > 0) {
        this.habilitarSpinner = false;
        this.listaComandas = response;
        this.totalComandas = this.listaComandas.length;
        this.listaComandas.forEach(item => {
          if (item.status === "ABERTA") {
            this.totalAbertas++;
            item.cor = "green";
          } else {
            this.totalFechadas++;
            item.cor = "red";
          }
        })
        this.listaVazia = false;
        this.calcularValorTotalComanda();
      } else {
        this.habilitarSpinner = false;
        this.listaVazia = true;
        this.listaComandas = [];
        this.totalComandas = 0;
        this.totalAbertas = 0;
        this.totalFechadas = 0;
      }
    })
  }

  validarComandaAoFechar(fechaComanda: boolean, comanda: Comanda) {
    let salvarOuEditarComanda = false;
    if (fechaComanda) {
      if (comanda.formaPagamento !== "AGUARDANDO") {
        salvarOuEditarComanda = true;
      }
    }
    return salvarOuEditarComanda;
  }

  salvar(fechaComanda: boolean) {
    this.desabilitarSim = true;
    let comanda: Comanda = new Comanda();
    if ((!this.camposVazios) && (this.novaComanda)) {
      this.comanda.vendedor = this.vendedorModal;
      this.comanda.itens = this.listaItens;
      if (fechaComanda) {
        this.comanda.status = "FECHADA";
        if (this.comanda.forma.descricao === "") {
          this.comanda.formaPagamento = "AGUARDANDO"
        } else {
          this.comanda.formaPagamento = this.comanda.forma.descricao;
        }
      } else {
        this.comanda.formaPagamento = "AGUARDANDO";
        this.comanda.status = "ABERTA";
      }
      this.comanda.valorTotal = this.valorTotalComanda;
      this.comanda.valorVendedor = this.calcularValorVendedor(this.comanda);
      comanda = this.comanda;

      if (fechaComanda) {
        if (this.validarComandaAoFechar(fechaComanda, comanda)) {
          this.salvarOuEditarComanda(comanda, fechaComanda);
        } else {
          this.fecharModalVerificacao();
          this.mensagem = "Favor escolher uma forma de pagamento!";
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
        }
      } else {
        this.salvarOuEditarComanda(comanda, fechaComanda);
      }
    }

    if ((!this.camposVazios) && (this.editarComanda)) {
      if (fechaComanda) {
        this.comandaEdicao.status = "FECHADA";
        this.comandaEdicao.formaPagamento = this.comandaEdicao.forma.descricao;
      } else {
        this.comandaEdicao.status = "ABERTA";
        this.comandaEdicao.formaPagamento = "AGUARDANDO";
      }
      this.comandaEdicao.itens = this.listaItens;
      this.comandaEdicao.valorTotal = this.valorTotalComanda;
      this.comandaEdicao.valorVendedor = this.calcularValorVendedor(this.comandaEdicao);
      comanda.percentualDesconto = this.comandaEdicao.percentualDesconto;
      comanda = this.comandaEdicao;
      if (fechaComanda) {
        if (this.validarComandaAoFechar(fechaComanda, comanda)) {
          this.salvarOuEditarComanda(comanda, fechaComanda);
        } else {
          this.fecharModalVerificacao();
          this.mensagem = "Favor escolher uma forma de pagamento!";
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
        }
      } else {
        this.salvarOuEditarComanda(comanda, fechaComanda);
      }
    }
  }

  salvarOuEditarComanda(comanda: Comanda, fechaComanda: boolean) {
    if (this.novaComanda) {
      this.comandaService.salvar(comanda).subscribe(() => {
        this.mensagem = "Comanda cadastrada com sucesso!";
        if (!fechaComanda) {
          this.fecharModalVerificacao();
          this.fecharModalComanda();
          this.fecharModalItens();
          this.listarPorDataEVendedor();
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
        } else {
          this.transfomarComandaEmVenda(comanda, fechaComanda);
          this.fecharModalVerificacao();
          this.fecharModalComanda();
          this.fecharModalItens();
          this.listarPorDataEVendedor();
        }
      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
    if (this.editarComanda) {
      this.comandaService.editar(comanda).subscribe(() => {
        this.mensagem = "Comanda editada com sucesso!";
        if (!fechaComanda) {
          this.fecharModalVerificacao();
          this.fecharModalComanda();
          this.fecharModalItens();
          this.listarPorDataEVendedor();
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
        } else {
          this.transfomarComandaEmVenda(comanda, fechaComanda);
          this.fecharModalVerificacao();
          this.fecharModalComanda();
          this.fecharModalItens();
          this.listarPorDataEVendedor();
        }

      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
  }

  transfomarComandaEmVenda(comanda: Comanda, fechaComanda: Boolean) {
    this.habilitarSpinner = true;
    let venda: Venda = new Venda()
    venda.formaPagamento = comanda.formaPagamento
    venda.valorTotal = comanda.valorTotal;
    venda.valorVendedor = comanda.valorVendedor;
    venda.vendedor = comanda.vendedor;
    venda.nomeCliente = comanda.nomeCliente;
    venda.percentualDesconto = comanda.percentualDesconto;
    venda.itens = comanda.itens;
    venda.itens.forEach(i => {
      i.cod = "";
    })
    this.vendaService.salvar(venda).subscribe(() => {
      this.mensagem = "Venda cadastrada com sucesso!";
      if (fechaComanda) {
        this.habilitarSpinner = false;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
      }
    }, error => {
      if (error) {
        this.habilitarSpinner = false;
        this.mensagem = error.message;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
      }
    })
  }

  validarCampos() {
    if (this.novaComanda) {
      if ((this.comanda.vendedor === undefined)
        || (this.comanda.vendedor === null)
        || (this.vendedorModal === "")
        || (this.listaItens.length === 0)) {
        this.mensagem = "Favor preencher os campos obrigatórios antes de incluir um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
    if (this.editarComanda) {
      if ((this.comandaEdicao.vendedor === undefined)
        || (this.comandaEdicao.vendedor === null)
        || (this.listaItens.length === 0)) {
        this.mensagem = "Favor preencher os campos obrigatórios antes de incluir um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
  }

  validarEdicaoPreco(produto: Produto) {
    let entrou = false;
    let valor: any = produto.valor;
    if ((valor === "") || (valor === 0)) {
      entrou = true;
      this.mensagem = "Favor preencher o valor do produto!"
      this.camposVazios = true;
      this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
    }
    return entrou;
  }

  diminuirQuantidade(produto: Produto) {
    let quantidade = produto.quantidade - produto.quantidadeDesconto;
    return quantidade;
  }

  setarQuantidadeItem(itemComanda: ItemComanda) {
    let entrou = false;
    if ((this.editarComanda) && (!this.calculaValorProdutoEmGramas)) {
      this.listaItensAux = this.listaItens;
      this.listaItensAux.push(itemComanda);
      this.listaItensAux.filter((it) => it.cod !== "").forEach(i => {
        if (i.codProduto === itemComanda.codProduto) {
          entrou = true;
          i.quantidade = itemComanda.quantidadeDesconto + i.quantidade;
          this.comandaService.setarQuantidade(i).subscribe(() => {
            this.listarItensComanda(this.comandaEdicao.cod, false);
          });
        }
      });
    }
    return entrou;
  }

  atualizarValorItem(event: any, itemComanda: ItemComanda) {
    if (event !== "") {
      if (this.editarComanda) {
        itemComanda.valor = event;
        itemComanda.valorColaborador = this.calcularValorColaboradorAoEditarValorItem(itemComanda);
        this.comandaService.setarValorItem(itemComanda).subscribe(() => { });
        this.calcularValorTotalComanda();
      } else {
        itemComanda.valor = event;
        itemComanda.valorColaborador = this.calcularValorColaboradorAoEditarValorItem(itemComanda);
        this.calcularValorTotalComanda();
      }
    }
  }

  atualizarQuantidadeItemComanda(itemComanda: ItemComanda) {
    if (!this.desabilitarBotoes) {
      let produto: ProdutoPostPut = new ProdutoPostPut();
      produto.cod = itemComanda.codProduto;
      this.listaItens.forEach(i => {
        if (i.codProduto === itemComanda.codProduto) {
          this.produtoService.devolverQuantidadeProduto(itemComanda.codProduto).subscribe((response: Produto) => {
            if (response.tem_Estoque === 1) {
              if (response.quantidade > 0) {
                produto.quantidade = response.quantidade - 1;
                this.produtoService.setarQuantidade(produto).subscribe(() => { });
                i.quantidade = this.aumentarQuantidade(i.quantidade);
                if (this.editarComanda) {
                  this.comandaService.setarQuantidade(i).subscribe(() => {
                    this.listarItensComanda(this.comandaEdicao.cod, false);
                  });
                } else {
                  this.calcularValorTotalComanda();
                }
              } else {
                this.mensagem = "Produto: " + itemComanda.descricao + " sem estoque, favor cadastrar quantidade para o produto";
                this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
              }
            } else {
              if ((i.codRandom === itemComanda.codRandom)
                && (itemComanda.codRandom !== "")
                && (itemComanda.usaGramas)) {
                i.quantidade = this.aumentarQuantidade(i.quantidade);
              }
              if (!i.usaGramas) {
                i.quantidade = this.aumentarQuantidade(i.quantidade);
              }
              if (this.editarComanda) {
                this.comandaService.setarQuantidade(i).subscribe(() => {
                  this.listarItensComanda(this.comandaEdicao.cod, false);
                });
              } else {
                this.calcularValorTotalComanda();
              }
            }
          })
        }
      })
    }
  }


  habilitarAdicionar(produto: Produto, event: any) {
    this.listaProdutos.forEach(p => {
      if ((p.cod_Produto === produto.cod_Produto)) {
        if (event !== null) {
          p.escolheu = true;
        } else {
          p.escolheu = false;
        }
      }
    })
  }

  adicionar(itemComanda: ItemComanda) {
    this.comandaService.adicionarItem(itemComanda, this.comandaEdicao.cod).subscribe(() => {
      this.listarItensComanda(this.comandaEdicao.cod, false);
      this.mensagem = "Produto: " + itemComanda.descricao + " adicionado com sucesso!";
      this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
    }, error => {
      if (error) {
        this.mensagem = error.message;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
      }
    })
  }

  calcularValorColaboradorAoEditarValorItem(itemComanda: ItemComanda) {
    let valorColaborador = Number(itemComanda.valor) * (itemComanda.porcentagemColaborador / 100)
    return valorColaborador;
  }

  setarValorGramaItemComanda(event: any) {
    if (event) {
      this.calculaValorProdutoEmGramas = true;
    } else {
      this.calculaValorProdutoEmGramas = false;
    }
  }

  adicionarItem(produto: Produto) {
    if (produto.escolheu) {
      let quantidadeGramas = 0;
      let entrou = false;
      let temItemNaLista = false;
      let prod: ProdutoPostPut = new ProdutoPostPut();
      if (!this.validarEdicaoPreco(produto)) {
        this.itemComanda = new ItemComanda();
        this.itemComanda.codProduto = produto.cod_Produto;
        this.itemComanda.descricao = produto.descricao_Produto;
        if (this.calculaValorProdutoEmGramas) {
          this.itemComanda.usaGramas = true;
          produto.valor = this.calcularValorGrama(produto.quantidadeDesconto, produto.valor);
          quantidadeGramas = produto.quantidadeDesconto;
          produto.quantidadeDesconto = 1;
          this.itemComanda.quantidadeGramas = quantidadeGramas;
          this.itemComanda.codRandom = String(Math.floor(Math.random() * 100000));
        }
        this.itemComanda.valor = produto.valor;
        this.itemComanda.porcentagemColaborador = produto.porcentagem_Colaborador
        this.itemComanda.valorColaborador = produto.valor_Colaborador;
        this.itemComanda.quantidadeDesconto = produto.quantidadeDesconto;
        this.itemComanda.nomeColaborador = produto.nome;
        // quantidade de estoque do produto
        prod.cod = produto.cod_Produto;

        if (this.editarComanda) {
          if ((produto.quantidade > 0)
            && (produto.tem_Estoque === 1)
            && (produto.quantidadeDesconto <= produto.quantidade)) {
            prod.quantidade = this.diminuirQuantidade(produto);
            temItemNaLista = this.setarQuantidadeItem(this.itemComanda);
            this.produtoService.setarQuantidade(prod).subscribe(() => { });

            if (!temItemNaLista) {
              this.itemComanda.quantidade = produto.quantidadeDesconto;
              this.adicionar(this.itemComanda);
            } else {
              this.mensagem = "Produto: " + produto.descricao_Produto + " adicionado com sucesso!";
              this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
            }
          } else {
            if (!this.calculaValorProdutoEmGramas) {
              this.mensagem = "Produto: " + produto.descricao_Produto + " sem estoque, favor cadastrar quantidade para o produto";
              this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
              this.listaItensAux = [];
              this.listarItensComanda(this.comandaEdicao.cod, false);
            }
          }

          if (produto.tem_Estoque === 0) {
            temItemNaLista = this.setarQuantidadeItem(this.itemComanda);
            if (!temItemNaLista) {
              this.itemComanda.quantidade = produto.quantidadeDesconto;
              this.adicionar(this.itemComanda);
            } else {
              this.listarItensComanda(this.comandaEdicao.cod, false);
              this.mensagem = "Produto: " + produto.descricao_Produto + " adicionado com sucesso!";
              this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
            }
          }
        }

        if (this.novaComanda) {
          if ((produto.quantidade > 0)
            && (produto.tem_Estoque === 1)
            && (produto.quantidadeDesconto <= produto.quantidade)) {
            if (this.listaItens.length === 0) {
              prod.quantidade = this.diminuirQuantidade(produto);
              this.produtoService.setarQuantidade(prod).subscribe(() => { });
              this.itemComanda.quantidade = this.itemComanda.quantidadeDesconto;
              this.listaItens.push(this.itemComanda);
              this.habilitarFormaPagamento = true;
            } else {
              for (let item of this.listaItens) {
                if (item.codProduto === this.itemComanda.codProduto) {
                  prod.quantidade = this.diminuirQuantidade(produto);
                  this.produtoService.setarQuantidade(prod).subscribe(() => { });
                  item.quantidade = item.quantidade + Number(this.itemComanda.quantidadeDesconto);
                  entrou = true;
                  break;
                }
              }
              if (!entrou) {
                prod.quantidade = this.diminuirQuantidade(produto);
                this.produtoService.setarQuantidade(prod).subscribe(() => { });
                this.itemComanda.quantidade = this.itemComanda.quantidade + Number(this.itemComanda.quantidadeDesconto);
                this.listaItens.push(this.itemComanda)
              }
            }
            this.mensagem = "Produto: " + produto.descricao_Produto + " adicionado com sucesso!";
            this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
          } else {
            this.mensagem = "Produto: " + produto.descricao_Produto + " sem estoque, favor cadastrar quantidade para o produto";
            this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
          }

          if (produto.tem_Estoque === 0) {
            if ((this.listaItens.length === 0) || (this.calculaValorProdutoEmGramas)) {
              this.itemComanda.quantidade = this.itemComanda.quantidadeDesconto;
              this.listaItens.push(this.itemComanda);
              this.habilitarFormaPagamento = true;
            } else {
              for (let item of this.listaItens) {
                if (item.codProduto === this.itemComanda.codProduto) {
                  item.quantidade = item.quantidade + Number(this.itemComanda.quantidadeDesconto);
                  entrou = true;
                  break;
                }
              }
              if (!entrou) {
                this.itemComanda.quantidade = this.itemComanda.quantidade + Number(this.itemComanda.quantidadeDesconto);
                this.listaItens.push(this.itemComanda);
              }
            }
            this.mensagem = "Produto: " + produto.descricao_Produto + " adicionado com sucesso!";
            this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
          }
          this.calcularValorTotalComanda();
        }
      }
    }
    this.calculaValorProdutoEmGramas = false;
    this.listarProdutos();
  }

  calcularValorGrama(grama: any, valorProduto: any) {
    return grama * valorProduto / 1000;
  }

  listarItensComanda(codComanda: any, remover: Boolean) {
    this.comandaService.listarPorCodComanda(codComanda).subscribe((response: ItemComanda[]) => {
      if (response.length > 0) {
        this.listaItens = response;
        if (remover) {
          this.listaItens.forEach(i => {
            if (i.quantidade === 0) {
              let indice = this.listaItens.indexOf(i);
              this.listaItens.splice(indice, 1);
              this.comandaService.removerItem(i.cod).subscribe(() => { });
            }
          })
        }
      }
      this.calcularValorTotalComanda();
    })
  }

  aumentarQuantidade(quantidadeProduto: any) {
    let quantidade = quantidadeProduto + 1;
    return quantidade;
  }


  removerItem(item: ItemComanda) {
    if (!this.desabilitarBotoes) {
      let prod: ProdutoPostPut = new ProdutoPostPut();
      prod.cod = item.codProduto;
      if (this.listaItens.length > 0) {
        this.listaItens.forEach(i => {
          if (i.codProduto === item.codProduto) {
            this.produtoService.devolverQuantidadeProduto(prod.cod).subscribe((response: Produto) => {
              if (response.tem_Estoque === 1) {
                prod.quantidade = this.aumentarQuantidade(response.quantidade);
                this.produtoService.setarQuantidade(prod).subscribe(() => { });
              }
              if ((i.codRandom === item.codRandom)
                && (item.codRandom !== "")
                && (item.usaGramas)) {
                i.quantidade = i.quantidade - 1;
              }
              if (!i.usaGramas) {
                i.quantidade = i.quantidade - 1;
              }
              this.comandaService.setarQuantidade(i).subscribe(() => {
                if (this.editarComanda) {
                  this.listarItensComanda(this.comandaEdicao.cod, true);
                } else {
                  if (i.quantidade === 0) {
                    let indice = this.listaItens.indexOf(i);
                    this.listaItens.splice(indice, 1);
                  }
                  this.calcularValorTotalComanda();
                }
              });
            });
          }
        })
      }
      if (this.listaItens.length === 1) {
        this.habilitarFormaPagamento = false;
      }
      this.mensagem = "Produto: " + item.descricao + " removido com sucesso!"
      this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'info', false);
    }
  }

  calcularValorTotalComDesconto(porcentagemDesconto: number) {
    this.calcularValorTotalComanda();
    let valorTotalComDesconto = this.valorTotalComanda;
    if (this.listaItens.length > 0) {
      if ((porcentagemDesconto !== null) && (porcentagemDesconto !== 0)) {
        valorTotalComDesconto = valorTotalComDesconto * (1 - porcentagemDesconto / 100);
        this.valorTotalComanda = valorTotalComDesconto;
      }
      if (this.valorTotalComanda < 0) {
        if (this.novaComanda) {
          this.comanda.percentualDesconto = 0
        } else {
          this.comandaEdicao.percentualDesconto = 0;
        }
        this.calcularValorTotalComanda();
      }
    }
  }

  calcularValorTotalComanda() {
    this.valorTotalComanda = 0;
    for (let item of this.listaItens) {
      this.valorTotalComanda = this.valorTotalComanda + Number(item.valor) * Number(item.quantidade);
    }
  }

  listarProdutos() {
    this.habilitarSpinner = true;
    let colaboradorCod = "";
    this.listaProdutos = [];
    if ((this.colaboradorFiltrado !== undefined) && (this.colaboradorSelecionado !== undefined)) {
      colaboradorCod = this.colaboradorSelecionado.cod;
    }
    this.produtoService.listarProdutosPorColaboradorESecao(colaboradorCod,
      "",
      this.descricao.toLowerCase(),
      this.codFabricante.toLowerCase(),
      this.codLoja.toLowerCase()).subscribe((response: Produto[]) => {
        if (response.length > 0) {
          this.habilitarSpinner = false;
          this.listaProdutos = response;
          this.listaProdutos.forEach(item => {
            if(item.tem_Estoque === 0){
              item.quantidade = "Não usa estoque"
            }else {
              if(item.quantidade === 0){
                 item.quantidade = "Sem estoque"
              }
            }
          })
          this.listaVaziaProdutos = false;
        } else {
          this.habilitarSpinner = false;
          this.listaVaziaProdutos = true;
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

  listarColaboradores() {
    this.colaboradorService.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaColaboradores = response;
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

  filtroFormaPagamento(event: any) {
    let filtrados: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.formaPagamentoComanda.length; i++) {
      let forma = this.formaPagamentoComanda[i];
      if (forma.descricao.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrados.push(forma);
      }
    }
    this.formaFiltrada = filtrados;
  }

  filtroColaborador(event: any) {
    let filtrados: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listaColaboradores.length; i++) {
      let colaborador = this.listaColaboradores[i];
      if (colaborador.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrados.push(colaborador);
      }
    }
    this.colaboradorFiltrado = filtrados;
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

  calcularValorVendedor(comanda: Comanda) {
    let calculo = 10 / 100;
    let valorVendedor = comanda.valorTotal * calculo;
    return valorVendedor;
  }

  limparFiltroColaborador() {
    this.colaboradorSelecionado = undefined;
    this.listaVaziaProdutos = false;
    this.listaProdutos = [];
    this.descricao = "";
  }

  limparFiltrosComanda() {
    this.dataInicial = "";
    this.dataFinal = "";
    this.vendedorComanda = undefined;
    this.listaComandas = [];
    this.totalComandas = 0;
    this.totalAbertas = 0;
    this.totalFechadas = 0;
  }

  abrirModalEditar(comanda: any) {
    this.desabilitarBotoes = false;
    if (comanda.status === 'FECHADA') {
      this.desabilitarBotoes = true;
    }
    this.desabilitarVendedor = true;
    this.comandaEdicao.cod = comanda.cod;
    this.comandaEdicao.dataComanda = comanda.dataComanda;
    this.comandaEdicao.vendedor = comanda.vendedor;
    this.comandaEdicao.nomeCliente = comanda.nomeCliente;
    this.comandaEdicao.percentualDesconto = comanda.percentualDesconto;
    this.comandaEdicao.valorTotal = comanda.valorTotal;
    this.comandaEdicao.forma.descricao = comanda.formaPagamento;
    this.comandaEdicao.itens = comanda.itens;
    this.comandaEdicao.status = comanda.status;
    this.listaItens = this.comandaEdicao.itens;
    this.valorTotalComanda = this.comandaEdicao.valorTotal;
    this.editarComanda = true;
    this.novaComanda = false;
    this.abrirModalComanda = true;
    this.listarItensComanda(this.comandaEdicao, false);
    if (comanda.percentualDesconto !== null) {
      this.calcularValorTotalComDesconto(comanda.percentualDesconto)
    } else {
      this.calcularValorTotalComanda();
    }
  }

  abrirModalIncluir() {
    this.abrirModalComanda = true;
    this.novaComanda = true;
    this.editarComanda = false;
    this.listaItens = [];
    this.valorTotalComanda = 0;
    this.comanda = new Comanda();
    this.vendedorModal = null;
    this.desabilitarVendedor = false;
    this.desabilitarBotoes = false;
    this.setarColaboradorLogado();
  }

  fecharModalComanda() {
    if ((this.editarComanda) && (this.comandaEdicao.status !== "FECHADA")) {
      this.comandaEdicao.formaPagamento = "AGUARDANDO";
      this.comandaEdicao.status = "ABERTA"
      this.comandaEdicao.valorTotal = this.valorTotalComanda;
      this.comandaService.setarValorVenda(this.comandaEdicao).subscribe(() => {
        this.listarPorDataEVendedor();
      })
      this.limparFiltroColaborador();
      this.listaItens = [];
      this.valorTotalComanda = 0;
      this.comanda = new Comanda();
      this.comandaEdicao = new Comanda();
      this.vendedorModal = null;
      this.desabilitarVendedor = false;
      this.desabilitarBotoes = false;
    }
    this.abrirModalComanda = false;
  }

  abrirModalItensComanda() {
    this.abrirModalItens = true;
    this.listarColaboradores();
  }

  fecharModalItens() {
    this.abrirModalItens = false;
    this.limparFiltroColaborador();
  }

  abrirModalVerificacao() {
    this.camposVazios = false;
    if (this.novaComanda) {
      this.comanda.vendedor = this.vendedorModal;
    }
    this.validarCampos();
    if (!this.camposVazios) {
      this.abrirModalVerificar = true;
    }
  }

  fecharModalVerificacao() {
    this.abrirModalVerificar = false;
    this.desabilitarSim = false;
  }

}
