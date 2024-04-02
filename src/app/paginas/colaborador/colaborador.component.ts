import { Component, OnInit } from '@angular/core';
import { ColaboradorService } from './colaborador.service';
import { Colaborador } from 'src/app/model/colaborador';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public camposVazios: boolean = false;
  public parametroSucesso: boolean = false;
  public novoColaborador: boolean = false;
  public editarColaborador: boolean = false;
  public abrirModalColaborador: boolean = false;
  public colaboradorEdicao: Colaborador = new Colaborador();
  public colaborador: Colaborador = new Colaborador();
  public listaColaboradores: Colaborador[] = [];
  public colaboradorFiltrado: any[] = [];
  public colaboradorSelecionado: any;

  constructor(private service: ColaboradorService) { }

  ngOnInit(): void {
    this.listarColaboradores();
  }


  listarColaboradores() {
    this.service.listarColaboradores().subscribe((response: Colaborador[]) => {
      if (response.length > 0) {
        this.listaColaboradores = response;
      }
    })
  }

  listarPorCod() {
    if (this.colaboradorSelecionado !== undefined && this.colaboradorSelecionado !== null) {
      this.service.listarPorCod(this.colaboradorSelecionado.cod).subscribe((response: Colaborador) => {
        if (response != null) {
          this.listaColaboradores = [];
          this.listaColaboradores.push(response);
        }
      })
    } else {
      this.listarColaboradores();
    }
  }

  limparFiltros() {
    this.colaboradorSelecionado = null;
    this.listaColaboradores = [];
  }

  validarCampos() {
    if (this.novoColaborador) {
      if (this.colaborador.nome === "") {
        this.mensagem = "Favor preencher os campos obrigatórios antes de incluir um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
    if (this.editarColaborador) {
      if (this.colaboradorEdicao.nome === "") {
        this.mensagem = "Favor preencher os campos obrigatórios antes de editar um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
  }

  salvar() {
    this.validarCampos();
    if (!this.camposVazios) {
      this.service.salvar(this.colaborador).subscribe(() => {
        this.mensagem = "Colaborador cadastrado com sucesso!";
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarColaboradores();
      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
  }

  editar() {
    this.validarCampos();
    if (!this.camposVazios) {
      this.service.editar(this.colaboradorEdicao).subscribe(() => {
        this.mensagem = "Colaborador editado com sucesso!";
        this.service.setarPorcentagemProduto(this.colaboradorEdicao).subscribe(() => { })
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarColaboradores()
      }, error => {
        if (error) {
          this.mensagem = error.message;
          this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
        }
      })
    }
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

  fecharModal() {
    this.abrirModalColaborador = false;
    this.colaboradorEdicao = new Colaborador();
    this.colaborador = new Colaborador();
  }

  abrirModalEditar(colaborador: any) {
    this.colaboradorEdicao = colaborador;
    this.novoColaborador = false;
    this.abrirModalColaborador = true;
    this.editarColaborador = true;
  }


  abrirModalIncluir() {
    this.abrirModalColaborador = true;
    this.editarColaborador = false;
    this.novoColaborador = true;
  }

  abrirModalSucesso() {
    this.parametroSucesso = true;
  }

  fecharModalSucesso() {
    this.parametroSucesso = false;
  }

}
