import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/Produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  listaProdutos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private route: Router) {}

  async buscarProdutos() {
    this.listaProdutos = await this.produtoService.buscarTodos();
  }

  ionViewWillEnter() {
    this.buscarProdutos();
  }

  cadastrarProduto(){
    this.route.navigateByUrl('/cadastro-produto');
  }

  ngOnInit(): void {}
}
