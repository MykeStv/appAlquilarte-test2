import { Component, OnInit } from '@angular/core';
import { SesionService } from '../../services/sesion.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  usuario:Usuario = {
    id: 0,
    nombre: '',
    tipo: '',
    user: '',
    password: '',
    token: ''
  }

  //esto toca mejorarlo!
  constructor(private sesionService:SesionService, private router:Router) {
    if(sessionStorage.getItem("usuario")){
      this.usuario = sesionService.getUsuario();
      console.log(this.usuario);
    }
  }

  ngOnInit(): void {
  }

  //funcion para el boton de cerrar sesion
  cerrarSesion():void {
    //elimina la data del session storage
    this.sesionService.resetUsuario();
    // redirecciona al login
    this.router.navigate(['/login']);
  }
  

}
