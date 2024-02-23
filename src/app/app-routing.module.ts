import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './paginas/produto/produto.component';
import { SecaoComponent } from './paginas/secao/secao.component';
import { ColaboradorComponent } from './paginas/colaborador/colaborador.component';
import { VendaComponent } from './paginas/venda/venda/venda.component';
import { ComandaComponent } from './paginas/comanda/comanda.component';
import { LoginComponent } from './paginas/login/login.component';
import { RelatorioComissaoVendedorComponent } from './paginas/relatorio-comissao-vendedor/relatorio-comissao-vendedor.component';
import { RelatorioProdutoColaboradorComponent } from './paginas/relatorio-produto-colaborador/relatorio-produto-colaborador.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 // { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
 // { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'colaboradores', component: ColaboradorComponent  },
  { path: 'secoes', component: SecaoComponent},
  { path: 'vendas', component: VendaComponent},
  { path: 'produtos', component: ProdutoComponent  },
  { path: 'comandas', component: ComandaComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'comissao-vendedores', component: RelatorioComissaoVendedorComponent  },
  { path: 'produto-colaborador', component: RelatorioProdutoColaboradorComponent  }

];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
