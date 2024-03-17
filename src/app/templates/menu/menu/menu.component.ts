import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Colaborador } from 'src/app/model/colaborador';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  public exibirMenu: boolean = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.verificarUsuario();
    this.items = [
      {
        label: 'Dashboard',
        routerLink: 'dashboard',
        disabled: !this.exibirMenu
      },
      {
        label: 'Colaboradores',
        routerLink: 'colaboradores',
        disabled: !this.exibirMenu

      },
      {
        label: 'Seções',
        routerLink: 'secoes',
        disabled: !this.exibirMenu
      },
      {
        label: 'Produtos',
        routerLink: 'produtos'
      },
      {
        label: 'Comandas',
        routerLink: 'comandas'
      },
      {
        label: 'Vendas',
        routerLink: 'vendas'
      },
      //{
      //  label: 'Lançamentos',
      //  routerLink: 'lancamentos'
      //},
      {
        label: 'Relatorios',
        items: [
          {
            label: 'Comissão Vendedor',
            routerLink: 'comissao-vendedores'
          },
          {
            label: 'Produtos Colaborador',
            routerLink: 'produto-colaborador'
          }
        ]
      }
    ]
  }
  verificarUsuario() {
    let usuario = localStorage.getItem('usuario')
    if (usuario !== null) {
      let colaborador: Colaborador = JSON.parse(usuario);
      if (colaborador.papel === 'ADMIN') {
        this.exibirMenu = true;
      }
    }
  }
  limparUsuario() {
    localStorage.setItem('usuario', '');
    localStorage.setItem('', '')
    this.router.navigate(['login']);
  }
}
