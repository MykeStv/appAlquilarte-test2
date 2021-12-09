import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Vehiculo } from '../../interfaces/vehiculos.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculos-add',
  templateUrl: './vehiculos-add.component.html',
  styleUrls: ['./vehiculos-add.component.css']
})
export class VehiculosAddComponent implements OnInit {

  formulario:FormGroup;

  error:boolean = false;
  vehiculoIngresado:boolean = false;

  constructor(private formBuilder:FormBuilder, private apiService:ApiService, private router:Router) {
    //validando el formulario
    this.formulario = this.formBuilder.group({

      placa: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      tipo: ['', Validators.required],
      puertas: ['', Validators.required],
      puestos: ['', Validators.required],
      precio: ['', Validators.required]

    });   
    
  }

  ngOnInit(): void {
  }

  //cuando el input no es valido
  get placaNoValido(){
    return this.formulario.get('placa')?.invalid && this.formulario.get('placa')?.touched;
  }
  get marcaNoValido(){
    return this.formulario.get('marca')?.invalid && this.formulario.get('marca')?.touched;
  }
  get modeloNoValido(){
    return this.formulario.get('modelo')?.invalid && this.formulario.get('modelo')?.touched;
  }
  get tipoNoValido(){
    return this.formulario.get('tipo')?.invalid && this.formulario.get('tipo')?.touched;
  }
  get puertasNoValido(){
    return this.formulario.get('puertas')?.invalid && this.formulario.get('puertas')?.touched;
  }
  get puestosNoValido(){
    return this.formulario.get('puestos')?.invalid && this.formulario.get('puestos')?.touched;
  }
  get precioNoValido(){
    return this.formulario.get('precio')?.invalid && this.formulario.get('precio')?.touched;
  }

  //Funcion para ingresar el vehiculo
  ingresarVehiculo() {

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

    let vehiculo:Vehiculo = {
      id: 0,
      placa: this.formulario.value.placa,
      marca: this.formulario.value.marca,
      modelo: this.formulario.value.modelo,
      tipo: {
        id: this.formulario.value.tipo,
        tipo: ''
      },
      puertas: this.formulario.value.puertas,
      puestos: this.formulario.value.puestos,
      precio: this.formulario.value.precio,
      estado: 0
    }
    

    this.apiService.addVehiculo(vehiculo).subscribe(response => {
      let vehiculoRes = JSON.parse(JSON.stringify(response));
      console.log(vehiculoRes);

      if(vehiculoRes.id == 0) {
        this.error = true;
      }
      else {
        this.error = false;
        this.vehiculoIngresado = true;
      }
      if(this.vehiculoIngresado) {
        window.alert("Vehiculo ingresado correctamente!");
        this.router.navigate(['/vehiculos']);
      }
    })

    

  }

}
