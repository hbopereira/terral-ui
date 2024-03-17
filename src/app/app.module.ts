import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoModule } from './paginas/produto/produto.module';
import { VendaModule } from './paginas/venda/venda/venda.module';
import { MenuModule } from './templates/menu/menu/menu.module';
import { SecaoModule } from './paginas/secao/secao.module';
import { ColaboradorModule } from './paginas/colaborador/colaborador.module';
import { ProdutoService } from './paginas/produto/produto.service';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColaboradorService } from './paginas/colaborador/colaborador.service'
import { SecaoService } from './paginas/secao/secao.service';
import { VendaService } from './paginas/venda/venda/venda.service';
import { ComandaService } from './paginas/comanda/comanda.service';
import { ComandaModule } from './paginas/comanda/comanda.module';
import { LoginComponent } from './paginas/login/login.component';
import { RelatorioComissaoVendedorModule } from './paginas/relatorio-comissao-vendedor/relatorio-comissao-vendedor.module';
import { RelatorioProdutoColaboradorModule } from './paginas/relatorio-produto-colaborador/relatorio-produto-colaborador.module';
import { DashboardModule } from './paginas/dashboard/dashboard.module';
import { LancamentoModule } from './paginas/lancamento/lancamento.module';
import { LoginModule } from './paginas/login/login.module';
import { LoginService } from './paginas/login/login.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    ProdutoModule,
    VendaModule,
    SecaoModule,
    ColaboradorModule,
    MenuModule,
    ComandaModule,
    RelatorioComissaoVendedorModule,
    RelatorioProdutoColaboradorModule,
    DashboardModule,
    LancamentoModule,
    AppRoutingModule,
    LoginModule
  ],
  providers: [
    ProdutoService,
    ColaboradorService,
    SecaoService,
    VendaService,
    ComandaService,
    LoginService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
