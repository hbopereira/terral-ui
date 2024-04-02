import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comanda } from "./model/comanda";
import { ItemComanda } from "./model/item-comanda";
import { Constantes } from "src/app/constantes/constantes";

@Injectable()
export class ComandaService {
   constantes: Constantes = new Constantes();
   constructor(private http: HttpClient) { }

   salvar(comanda: Comanda) {
      return this.http.post<Comanda>(this.constantes.PATH_LOCAL + '/api/comandas/salvar', comanda);
   }

   editar(comanda: Comanda) {
      return this.http.put<Comanda>(this.constantes.PATH_LOCAL + '/api/comandas', comanda);
   }

   adicionarItem(itemComanda: ItemComanda, codComanda: string) {
      return this.http.put<ItemComanda>(this.constantes.PATH_LOCAL + '/api/comandas/adicionarItem?codComanda=' + codComanda, itemComanda);
   }

   removerItem(codItem: string) {
      return this.http.delete<ItemComanda>(this.constantes.PATH_LOCAL + '/api/comandas/removerItem?codItem=' + codItem);
   }

   listarPorDataEVendedor(dataInicial: Date, dataFinal: Date, codVendedor: string) {
      return this.http.get<Comanda[]>(this.constantes.PATH_LOCAL + '/api/comandas/listarPorDataEVendedor?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
   }

   listarPorCodComanda(codComanda: string) {
      return this.http.get<ItemComanda[]>(this.constantes.PATH_LOCAL + '/api/comandas/listarPorCodComanda?codComanda=' + codComanda);
   }

   setarQuantidade(item: ItemComanda) {
      return this.http.put(this.constantes.PATH_LOCAL + '/api/comandas/setarQuantidade', item);
   }

   setarValorVenda(comanda: Comanda) {
      return this.http.put(this.constantes.PATH_LOCAL + '/api/comandas/setarValorVenda', comanda);
   }

   setarValores(item: ItemComanda) {
      return this.http.put(this.constantes.PATH_LOCAL + '/api/comandas/setarValores', item);
   }

}