import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Colaborador } from 'src/app/model/colaborador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = "";
  exibirMensagem = false;
  tipoMensagem = 'info';
  tipoIcone = 'info';
  public colaborador: Colaborador = new Colaborador();
  public habilitarSpinner: boolean = false;

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {

  }
  autenticar() {
    this.habilitarSpinner = true;
    this.service.autenticar(this.colaborador).subscribe((response: Colaborador) => {
      if (response !== null && response !== undefined) {
        this.habilitarSpinner = false;
        localStorage.setItem('usuario', JSON.stringify(response));
        this.mensagem = "Usuário autenticado com sucesso!"
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'success', false);
        if (response.papel === 'ADMIN') {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['vendas']);
        }
      } else {
        this.habilitarSpinner = false;
        this.mensagem = "Usuário inválido!"
        this.getExibirMensagemAlerta(this.mensagem, this.tipoIcone, 'danger', false);
      }
    })
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

}
