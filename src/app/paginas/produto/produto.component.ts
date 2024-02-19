import { Component, OnInit } from '@angular/core';
import { Produto } from './model/produto';
import { ProdutoPostPut } from './model/produto-post-put';
import { ProdutoService } from './produto.service';
import { Colaborador } from 'src/app/model/colaborador';
import { Secao } from 'src/app/model/secao';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { SecaoService } from '../secao/secao.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public camposVazios: boolean = false;
  public visivelEditar: boolean = false;
  public parametroSucesso: boolean = false;
  public novoProduto: boolean = false;
  public editarProduto: boolean = false;
  public abrirModalProduto: boolean = false;
  public colaboradorModal: any;
  public secaoModal: any;
  public colaboradorSelecionado: any;
  public secaoSelecionada: any;
  public colaboradorFiltrado: any[] = [];
  public secaoFiltrada: any[] = [];
  public listaVazia = false;
  public listaProdutos: Produto[] = [];
  public listaColaboradores: Colaborador[] = [];
  public listaSecoes: Secao[] = [];
  public produto: ProdutoPostPut = new ProdutoPostPut();
  public produtoEdicao: ProdutoPostPut = new ProdutoPostPut();

  constructor(
    private service: ProdutoService,
    private colaboradorService: ColaboradorService,
    private secaoService: SecaoService) { }

  ngOnInit(): void {
    this.listarColaboradores();
    this.listarSecoes();
    this.listarProdutosPorColaboradorESecao();
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


  filtroSecao(event: any) {
    let filtrados: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listaSecoes.length; i++) {
      let secao = this.listaSecoes[i];
      if (secao.descricaoSecao.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtrados.push(secao);
      }
    }
    this.secaoFiltrada = filtrados;
  }

  listarColaboradores() {
    this.colaboradorService.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaColaboradores = response;
      }
    })
  }

  listarSecoes() {
    this.secaoService.listarSecoes().subscribe((response: Secao[]) => {
      if (response.length > 0) {
        this.listaSecoes = response;
      }
    })
  }

  listarProdutosPorColaboradorESecao() {
    let colaboradorCod = "";
    let secaoCod = "";
    this.listaProdutos = [];;
    if (this.colaboradorSelecionado !== undefined) {
      colaboradorCod = this.colaboradorSelecionado.cod;
    }
    if (this.secaoSelecionada !== undefined) {
      secaoCod = this.secaoSelecionada.cod;
    }
    this.service.listarProdutosPorColaboradorESecao(colaboradorCod, secaoCod, "").subscribe((response: Produto[]) => {
      if (response.length > 0) {
        this.listaProdutos = response;
        this.listaVazia = false;
      } else {
        this.listaVazia = true;
      }
    })
  }

  validarCampos() {
    if (this.novoProduto) {
      if ((this.produto.colaborador === undefined)
        || (this.produto.secao === undefined)
        || (this.produto.valor === "")
        || (this.produto.descricaoProduto === "")) {
        this.mensagem = "Favor preencher os campos obrigatórios antes de incluir um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
    if (this.editarProduto) {
      if ((this.produtoEdicao.colaborador.nome === undefined)
        || (this.produtoEdicao.secao.descricaoSecao === undefined)
        || (this.produtoEdicao.valor === null)
        || (this.produtoEdicao.descricaoProduto === "")) {
        this.mensagem = "Favor preencher os campos obrigatórios antes de editar um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
  }

  calcularValorColaborador(produto: ProdutoPostPut) {
    let valorColaborador = Number(produto.valor) * (produto.porcentagemColaborador / 100)
    return valorColaborador;
  }

  salvar() {
    this.camposVazios = false;
    this.produto.colaborador = this.colaboradorModal;
    this.produto.secao = this.secaoModal;
    if ((this.produto.quantidade > 0) && (this.produto.quantidade !== undefined)) {
      this.produto.temEstoque = 1;
    }
    this.validarCampos();
    if (!this.camposVazios) {
      this.service.salvar(this.produto).subscribe(() => {
        this.mensagem = "Produto cadastrado com sucesso!";
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarProdutosPorColaboradorESecao()
      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
  }

  editar() {
    if ((this.produtoEdicao.quantidade > 0) && (this.produtoEdicao.quantidade !== undefined)) {
      this.produtoEdicao.temEstoque = 1;
    }
    this.validarCampos();
    if (!this.camposVazios) {
      this.produtoEdicao.valorColaborador = this.calcularValorColaborador(this.produtoEdicao);
      this.service.editar(this.produtoEdicao).subscribe(() => {
        this.mensagem = "Produto editado com sucesso!";
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarProdutosPorColaboradorESecao()
      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
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
  fecharModal() {
    this.abrirModalProduto = false;
    this.produtoEdicao = new ProdutoPostPut();
    this.produto = new ProdutoPostPut();
    this.colaboradorModal = null;
    this.secaoModal = null;
    this.camposVazios = false;
  }

  abrirModalEditar(produto: any) {
    this.produtoEdicao.colaborador.cod = produto.cod_Colaborador;
    this.produtoEdicao.colaborador.nome = produto.nome;
    this.produtoEdicao.secao.cod = produto.cod_Secao;
    this.produtoEdicao.secao.descricaoSecao = produto.descricao_Secao;
    this.produtoEdicao.descricaoProduto = produto.descricao_Produto;
    this.produtoEdicao.valor = produto.valor;
    this.produtoEdicao.cod = produto.cod_Produto;
    this.produtoEdicao.porcentagemColaborador = produto.porcentagem_Colaborador;
    this.produtoEdicao.quantidade = produto.quantidade;
    this.produtoEdicao.temEstoque = produto.tem_Estoque;
    this.novoProduto = false;
    this.abrirModalProduto = true;
    this.editarProduto = true;
  }

  abrirModalIncluir() {
    this.abrirModalProduto = true;
    this.editarProduto = false;
    this.novoProduto = true;
  }

  abrirModalSucesso() {
    this.parametroSucesso = true;
  }

  fecharModalSucesso() {
    this.parametroSucesso = false;
  }

  limparFiltros() {
    this.colaboradorSelecionado = undefined;
    this.secaoSelecionada = undefined;
    this.listaVazia = false;
    this.listaProdutos = [];
  }

}
