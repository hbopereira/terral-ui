import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Comanda } from "./model/comanda";
import { ItemComanda } from "./model/item-comanda";

@Injectable()
export class ComandaService {

   constructor(private http: HttpClient) { }

   salvar(comanda: Comanda) {
      return this.http.post<Comanda>('http://localhost:8080/api/comandas/salvar', comanda);
   }

   editar(comanda: Comanda) {
      return this.http.put<Comanda>('http://localhost:8080/api/comandas', comanda);
   }

   adicionarItem(itemComanda: ItemComanda, codComanda: string) {
      return this.http.put<ItemComanda>('https://terral-api.onrender.com/api/comandas/adicionarItem?codComanda=' + codComanda, itemComanda);
   }

   removerItem(codItem: string) {
      return this.http.delete<ItemComanda>('https://terral-api.onrender.com/api/comandas/removerItem?codItem=' + codItem);
   }

   listarPorDataEVendedor(dataInicial: Date, dataFinal: Date, codVendedor: string) {
      return this.http.get<Comanda[]>('https://terral-api.onrender.com/api/comandas/listarPorDataEVendedor?dataInicial=' + dataInicial + '&dataFinal=' + dataFinal + '&codVendedor=' + codVendedor);
   }

   listarPorCodComanda(codComanda: string) {
      return this.http.get<ItemComanda[]>('https://terral-api.onrender.com/api/comandas/listarPorCodComanda?codComanda=' + codComanda);
   }

   setarQuantidade(item: ItemComanda) {
      return this.http.put('https://terral-api.onrender.com/api/comandas/setarQuantidade', item);
   }

   setarValorVenda(comanda: Comanda) {
      return this.http.put('http://localhost:8080/api/comandas/setarValorVenda', comanda);
   }

   setarValorItem(item: ItemComanda) {
      return this.http.put('http://localhost:8080/api/comandas/setarValorItem', item);
   }

}