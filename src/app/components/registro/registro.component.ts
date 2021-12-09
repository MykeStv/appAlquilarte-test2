import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //para la validacion de los campos de registro
  formulario:FormGroup;

  error:boolean = false;
  ingresado:boolean = false;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService) {
    //validando los formularios
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  //get para retornar automaticamente el metodo
  get nombreNoValido(){
    //valida si el campo es invalido y si el campo es tocado
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched;
  }
  get tipoNoValido() {
    return this.formulario.get('tipoUsuario')?.invalid && this.formulario.get('tipoUsuario')?.touched;
  }
  get userNoValido() {
    return this.formulario.get('username')?.invalid && this.formulario.get('username')?.touched;
  }
  get passwordNoValido() {
    return this.formulario.get('password')?.invalid && this.formulario.get('password')?.touched;
  }

  //metodo para guardar los datos
  guardarDatos() {
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
      password: ''
    }

    // guardando los datos
    this.apiService.addUsuario(this.formulario.value.nombre, this.formulario.value.tipoUsuario,
       this.formulario.value.username, this.formulario.value.password).subscribe((response) => {
        console.log(response);
        // guarda los datos en usuario de la respuesta del api
        usuario = JSON.parse(JSON.stringify(response));
        console.log(usuario);
        
        //si se presenta un error
        if (usuario.id == 0) {
          this.error = true;
        }
        else {
          this.error = false;
          this.ingresado = true;
        }

       })
  }
}
