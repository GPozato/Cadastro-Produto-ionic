import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  listaProdutos: Produto[] = [];

  constructor(private storageService: StorageService) {}

  async salvar(produto: Produto) {
    await this.buscarTodos();
    this.listaProdutos[produto.id] = produto;
    this.storageService.set('produtos', this.listaProdutos);
  }

  async buscarTodos() {
    this.listaProdutos = (await this.storageService.get(
      'produtos'
    )) as unknown as Produto[];

    if (!this.listaProdutos) {
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  }

  async salvarID(id: number) {
    await this.storageService.set('idProduto', id);
  }
  async buscarID() {
    const id = await this.storageService.get('idProduto');

    if (!id) {
      return 0;
    }

    return id;
  }
}
