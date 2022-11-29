import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/Produto.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  produto: Produto = new Produto();

  formRegistroProduto = this.formBuilder.group({
    nome: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    descricao: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
      ]),
    ],
    preco: [
      '',
      Validators.required,
    ],
    validade: [
      '', Validators.required,
    ],
  });

  mensagemErro = {
    nome: [
      { tipo: 'required', aviso: 'Nome do Produto!' },
      { tipo: 'minlength', aviso: 'Mínimo de 3 dígitos!' },
    ],
    descricao: [
      { tipo: 'required', aviso: 'Descrição do Produto!' },
      { tipo: 'minlength', aviso: 'Mínimo de 10 dígitos!' },
    ],
    preco: [
      { tipo: 'required', aviso: 'Valor do Prduto!' },
    ],
    validade: [
      { tipo: 'required', aviso: 'Quando Vence o Produto?' },
    ],
  };
  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private route: Router, private alertController: AlertController) { }

  get nome() {
    return this.formRegistroProduto.get('nome');
  }

  get descricao() {
    return this.formRegistroProduto.get('descricao');
  }

  get preco() {
    return this.formRegistroProduto.get('preco');
  }

  get validade() {
    return this.formRegistroProduto.get('validade');
  }

  ngOnInit() { }

  async salvar() {
    if (this.formRegistroProduto.valid) {
      this.produto.nome = this.nome.value;
      this.produto.descricao = this.descricao.value;
      this.produto.preco = this.preco.value.replace(',','.');
      this.produto.validade = this.validade.value;


      const id = (await this.produtoService.buscarID()) as number;
      this.produto.id = id;

      this.produtoService.salvar(this.produto);

      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Cadastro Produto',
        message: 'Bem Sucedido!',
        buttons: ['Fechar']
      });
      await alert.present();

      this.produtoService.salvarID(id + 1);

      this.mostrarProdutos();

    } else {
      const alert = await this.alertController.create({
        header: 'Aviso!',
        subHeader: 'Cadastro Produto',
        message: 'Inclompleto!',
        buttons: ['Fechar']
      });
      await alert.present();
    }
  }

  mostrarProdutos(){
    this.route.navigateByUrl('/produtos');
  }
}
