import { Component, OnInit } from '@angular/core';
import { SecaoService } from './secao.service';
import { Secao } from 'src/app/model/secao';

@Component({
  selector: 'app-secao',
  templateUrl: './secao.component.html',
  styleUrls: ['./secao.component.css']
})
export class SecaoComponent implements OnInit {

  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public camposVazios: boolean = false;
  public parametroSucesso: boolean = false;
  public novaSecao: boolean = false;
  public editarSecao: boolean = false;
  public abrirModalSecao: boolean = false;
  public secaoEdicao: Secao = new Secao();
  public secao: Secao = new Secao();
  public listaSecoes: Secao[] = [];

  constructor(private service: SecaoService) { }

  ngOnInit(): void {
    this.listarSecoes();
  }

  listarSecoes() {
    this.service.listarSecoes().subscribe((response: Secao[]) => {
      if (response.length > 0) {
        this.listaSecoes = response;
      } else {
        // fazer alguma coisa
      }
    })
  }


  validarCampos() {
    if (this.novaSecao) {
      if (this.secao.descricaoSecao === "") {
        this.mensagem = "Favor preencher os campos obrigatórios antes de incluir um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
    if (this.editarSecao) {
      if (this.secaoEdicao.descricaoSecao === "") {
        this.mensagem = "Favor preencher os campos obrigatórios antes de editar um registro!"
        this.camposVazios = true;
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'warning', false);
      }
    }
  }

  salvar() {
    this.validarCampos();
    if (!this.camposVazios) {
      this.service.salvar(this.secao).subscribe(() => {
        this.mensagem = "Seção cadastrada com sucesso!";
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarSecoes();
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
      this.service.editar(this.secaoEdicao).subscribe(() => {
        this.mensagem = "Seção editada com sucesso!";
        this.fecharModal();
        this.abrirModalSucesso();
        this.listarSecoes();
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
    this.abrirModalSecao = false;
    this.secaoEdicao = new Secao();
    this.secao = new Secao();
  }

  abrirModalEditar(secao: any) {
    this.secaoEdicao = secao;
    this.novaSecao = false;
    this.abrirModalSecao = true;
    this.editarSecao = true;
  }


  abrirModalIncluir() {
    this.abrirModalSecao = true;
    this.editarSecao = false;
    this.novaSecao = true;
  }

  abrirModalSucesso() {
    this.parametroSucesso = true;
  }

  fecharModalSucesso() {
    this.parametroSucesso = false;
  }
}
