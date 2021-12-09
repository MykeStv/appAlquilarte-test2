import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private usuario:Usuario = {
    id: 0,
    nombre: '',
    tipo: '',
    user: '',
    password: '',
    token: ''
  }

  constructor() { }

  //GETTER && SETTER DEL USUARIO
  getUsuario():Usuario {
    return this.usuario;
  }
  setUsuario(usuario:Usuario):void {
    this.usuario = usuario;
    // guardando en el session storage
    this.guardarStorage();
  }

  getToken(){
    let token = sessionStorage.getItem("token");
    return token;
  }

  //guardando datos
  guardarStorage():void {
    sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
    sessionStorage.setItem("token", this.usuario.token);
  }

  //leyendo los datos del session storage
  leerStorage():void {
    if(sessionStorage.getItem("usuario")) {
      let datos = sessionStorage.getItem("usuario");
      this.usuario = JSON.parse(JSON.stringify(datos));

    }
  }

  //metodo para eliminar el usuario del session storage
  resetUsuario():void {
    this.usuario = {
      id: 0,
      nombre: '',
      tipo: '',
      user: '',
      password: '',
      token: ''
    }
    this.guardarStorage();
  }

}
