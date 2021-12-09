import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SesionService } from '../../services/sesion.service';
import { Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario:FormGroup;
  error:boolean = false;

  constructor(private apiService:ApiService, private formBuilder:FormBuilder,
    private router:Router, private sesionService:SesionService) {
    
    //validando el contenido de los inputs
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  //verificando la validez de los inputs
  get usernameNoValido() {
    return this.formulario.get('username')?.invalid && this.formulario.get('username')?.touched;
  }
  get passwordNoValido() {
    return this.formulario.get('password')?.invalid && this.formulario.get('password')?.touched;
  }

  //funcion para verificar los datos del ingreso
  verificarDatos() {
    if(this.formulario.invalid) {
      //toca todos los inputs para verificar que ninguno esté vacio
      Object.values(this.formulario.controls).forEach(control => {
        control.markAllAsTouched();
      });
      
      // si no se han llenado los campo, no continua con la funcion
      return;
    }

    // si no presenta errores
    this.error = false;

    let usuario = {
      id: 0,
      nombre: '',
      tipo: '',
      user: '',
      password: '',
      token: ''
    }

    //conectando al api
    this.apiService.login(this.formulario.value.username, this.formulario.value.password)
      .subscribe((response) => {
        //almacenando los valores de la respuesta en la constante usuario
        usuario = JSON.parse(JSON.stringify(response));
        
        if(usuario == null) {
          this.error = true;
        }
        else {
          if(Number.isInteger(usuario.id)){
            //guardar la info en el sesion storage
            this.error = false;

            console.log(usuario);
            //guarda el usuario en el sesion service instancia
            this.sesionService.setUsuario(usuario);

            //redirecciona a inicio despues de ingresar
            this.router.navigate(['/inicio']);
          }
          else {
            this.error = true;
          }
        }

      });

  }
}
