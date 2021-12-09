import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/interfaces/vehiculos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehiculos-edit',
  templateUrl: './vehiculos-edit.component.html',
  styleUrls: ['./vehiculos-edit.component.css']
})
export class VehiculosEditComponent implements OnInit {

  vehiculo: Vehiculo = {
    id: 0,
    placa: 'value',
    marca: 'value',
    modelo: 0,
    tipo: {},
    puertas: 0,
    puestos: 0,
    precio: 0,
    estado: 0
  }; 
  formulario!:FormGroup;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,
     private apiService:ApiService, private formBuilder:FormBuilder) {
    
      

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros => {
      let id = parametros["id"];

      this.apiService.getVehiculo(id).subscribe((response) => {
        this.vehiculo = JSON.parse(JSON.stringify(response));
        console.log(this.vehiculo);
      })
    });

    // console.log(this.vehiculo);

    this.formulario = new FormGroup({
      placa: new FormControl(this.vehiculo.placa, [Validators.required]),
      marca: new FormControl(this.vehiculo.marca, [Validators.required]),
      modelo: new FormControl(this.vehiculo.modelo, [Validators.required, Validators.max(2030)]),
      tipo: new FormControl(this.vehiculo.tipo, [Validators.required, Validators.max(5)]),
      puertas: new FormControl(this.vehiculo.puertas, [Validators.required]),
      puestos: new FormControl(this.vehiculo.puestos, [Validators.required]),
      precio: new FormControl('', [Validators.required])
    })

  }

   //cuando el input no es valido
  get placaNoValido(){
    return this.formulario.get('placa')?.invalid;
  }
  get marcaNoValido(){
    return this.formulario.get('marca')?.invalid;
  }
  get modeloNoValido(){
    return this.formulario.get('modelo')!;
  }
  get tipoNoValido(){
    return this.formulario.get('tipo')!;
  }
  get puertasNoValido(){
    return this.formulario.get('puertas')?.invalid;
  }
  get puestosNoValido(){
    return this.formulario.get('puestos')?.invalid;
  }
  get precioNoValido(){
    return this.formulario.get('precio')?.invalid;
  }


  //devuelve a la ruta de vehiculos cuando se presiona cancelar
  cancelar():void {
    this.router.navigate(['/vehiculos']);
  }

  updateVehiculo(placa:any, marca:any, modelo:any, tipo:any, puertas:any, puestos:any, precio:any):void {

    this.vehiculo.placa = placa;
    this.vehiculo.marca = marca;
    this.vehiculo.modelo = parseInt(modelo);
    this.vehiculo.tipo.id = parseInt(tipo);
    this.vehiculo.puertas = parseInt(puertas);
    this.vehiculo.puestos = parseInt(puestos);
    this.vehiculo.precio = parseFloat(precio);

    console.log(this.vehiculo);
    this.apiService.updateVehiculo(this.vehiculo).subscribe((res) => {
      let vehRes = JSON.parse(JSON.stringify(res));
      console.log(vehRes);
      this.router.navigate(['/vehiculos']);
    })
    
  }

  
}
