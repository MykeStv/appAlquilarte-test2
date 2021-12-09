import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { Vehiculo } from 'src/app/interfaces/vehiculos.interface';
import { ApiService } from 'src/app/services/api.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-vehiculo-alquiler',
  templateUrl: './vehiculo-alquiler.component.html',
  styleUrls: ['./vehiculo-alquiler.component.css']
})
export class VehiculoAlquilerComponent implements OnInit {

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

  cliente: Cliente = {
    id: 0,
    cc: '',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  }

  alquiler: Alquiler = {
    id: 0,
    idUser: undefined,
    idCliente: undefined,
    idVehiculo: undefined,
    fechaAlq: undefined,
    fechaDev: undefined,
    precioTotal: 0
  }
  //atributos para el alquiler
  _idVehiculo!: number;
  _idCliente!: number;

 
  fecha1: any;
  fecha2: any;
  fecha1Mod!: any;
  fecha2Mod!: any;
  precioVehiculo:any;
  dayms = 1000 * 3600 * 24; //milisegundos a dias

  error:boolean = false;
  clienteIngresado = false;
  alquilerIngresado:boolean = false;
  
  _idUser!: number;
  
  // variable para el formulario del cliente
  formularioC!: FormGroup;
  
  constructor(private apiService:ApiService, private activatedRoute:ActivatedRoute,
    private router:Router, private sesionService:SesionService) {
    
  }

  ngOnInit(): void {
    this._idUser = this.sesionService.getUsuario().id;
    console.log("id del usuario: " + this._idUser);

    this.activatedRoute.params.subscribe(parametros => {
      let id = parametros["id"];
      this._idVehiculo = id;

      this.apiService.getVehiculo(id).subscribe((response) => {
        this.vehiculo = JSON.parse(JSON.stringify(response));
      })
    })

    // validacion del formulario
    this.formularioC = new FormGroup({
      cc: new FormControl('', [Validators.required]),
      nombre: new FormControl(this.cliente.nombre, [Validators.required]),
      direccion: new FormControl(this.cliente.direccion, [Validators.required]),
      telefono: new FormControl(this.cliente.telefono, [Validators.required]),
      correo: new FormControl(this.cliente.correo, [Validators.required, Validators.email]),

      // para el vehiculo
      fechaAlq: new FormControl('', [Validators.required]),
      fechaDev: new FormControl('', [Validators.required]),
      precioTotal: new FormControl(0, [Validators.required])

    })
    


  }

  //cuando el input no es valido
  get ccNoValido(){
    return this.formularioC.get('cc')?.invalid && this.formularioC.get('cc')?.touched;
  }
  get nombreNoValido(){
    return this.formularioC.get('nombre')?.invalid && this.formularioC.get('nombre')?.touched;
  }
  get direccionNoValido(){
    return this.formularioC.get('direccion')?.invalid && this.formularioC.get('direccion')?.touched;
  }
  get telefonoNoValido(){
    return this.formularioC.get('telefono')?.invalid && this.formularioC.get('telefono')?.touched;
  }
  get correoNoValido(){
    return this.formularioC.get('correo')?.invalid && this.formularioC.get('correo')?.touched;
  }

  get fechaAlqNoValido(){
    return this.formularioC.get('fechaAlq')?.invalid && this.formularioC.get('fechaAlq')?.touched;
  }
  get fechaDevNoValido(){
    return this.formularioC.get('fechaDev')?.invalid && this.formularioC.get('fechaDev')?.touched;
  }
  get precioNoValido(){
    return this.formularioC.get('precioTotal')!;
  }


  //metodos para calcular el valor del precio total del alquiler
  
  changeFecha1(e:any){
    this.fecha1 = e.target.value;
    this.fecha1Mod = new Date(this.fecha1);
    this.calcular();
  }
  changeFecha2(e:any){
    this.fecha2 = e.target.value;
    this.fecha2Mod = new Date(this.fecha2);
    this.calcular();
  }
  calcular(){
    let dias = (this.fecha2Mod - this.fecha1Mod)/this.dayms;
    console.log(dias);
    this.precioVehiculo = dias * this.vehiculo.precio;
  }




  //devuelve a la ruta de vehiculos cuando se presiona cancelar
  cancelar():void {
    this.router.navigate(['/vehiculos']);
  }


  

  alquilarVehiculo():void {

    //permite verificar que todos los campos sea llenados al submit
    if(this.formularioC.invalid) {
      Object.values(this.formularioC.controls).forEach(control => {
        control.markAllAsTouched();
      })
      return;
    }

    // si no presenta errores
    this.error = false;

    this.cliente = {
      id: 0,
      cc: this.formularioC.value.cc,
      nombre: this.formularioC.value.nombre,
      direccion: this.formularioC.value.direccion,
      telefono: this.formularioC.value.telefono,
      correo: this.formularioC.value.correo
    }

    
    

    this.apiService.addCliente(this.cliente).subscribe((response)=>{
      let clienteRes = JSON.parse(JSON.stringify(response));
      console.log(clienteRes);

      if(clienteRes.id == 0){
        this.error = true;
      }
      else {
        this._idCliente = clienteRes.id;
        this.error = false;
        this.clienteIngresado = true;
      }
      
      //cambia el estado del vehiculo a 1, es decir, alquilado
      this.vehiculo.estado = 1;
      this.apiService.updateVehiculo(this.vehiculo).subscribe();

      console.log("vamos a ver la fecha1 " + this.fecha1);
      console.log("vamos a ver la fecha2 " + this.fecha2);
      this.alquiler = {
        id: 0,
        idUser: {
          id: this._idUser,
          nombre: '',
          tipo: '',
          user: '',
          password: '',
          token: ''
        },
        idCliente: {
          id: this._idCliente,
          cc: '',
          nombre: '',
          direccion: '',
          telefono: '',
          correo: ''
        },
        idVehiculo: this.vehiculo,
        fechaAlq: this.fecha1,
        fechaDev: this.fecha2,
        precioTotal: this.precioVehiculo
      }
      console.log(this.alquiler);
      
      this.apiService.addAlquiler(this.alquiler).subscribe((res) => {
        let alquilerRes = JSON.parse(JSON.stringify(res));
        console.log(res);
  
        if (alquilerRes.id == 0){
          this.error = true;
        }
        else {
          this.error = false;
          this.alquilerIngresado = true;
        }
        if (this.clienteIngresado && this.alquilerIngresado){
          this.router.navigate(['/vehiculos']);
        }
      })
      
    })

    
  }

}
