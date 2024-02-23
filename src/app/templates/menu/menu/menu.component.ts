import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Colaboradores',
        routerLink: 'colaboradores'

      },
      {
        label: 'Seções',
        routerLink: 'secoes'
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

    ];
  }
}
