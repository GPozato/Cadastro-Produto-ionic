import { Component } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  listaUsuario: Usuario[] = [];

  constructor(private usuarioService: UsuariosService) {}

  async buscarUsuarios() {
    this.listaUsuario = await this.usuarioService.buscarTodos();
  }

  ionViewWillEnter(){
    this.buscarUsuarios();
  }
}
