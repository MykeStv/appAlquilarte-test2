import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { Vehiculo } from 'src/app/interfaces/vehiculos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehiculos-devolucion',
  templateUrl: './vehiculos-devolucion.component.html',
  styleUrls: ['./vehiculos-devolucion.component.css']
})
export class VehiculosDevolucionComponent implements OnInit, OnDestroy {

  //Defino un array vacio para los alquileres de los vehiculos que serán mostrados en la tabla
  alquileres: Alquiler[] = [];
  vehiculo!: Vehiculo;

  //declaro una subscripcion para actualizar automaticamente la pagina
  subscription: Subscription = new Subscription;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getAlquileres();

    // //recargar la pagina cada vez que se devuelve un vehiculos
    // this.subscription = this.apiService.refresh$.subscribe(() => {
    //   this.getAlquileres();
    // })
  }
  ngOnDestroy():void {
    // cuando se cierra el componente, deja de observar info
    // this.subscription.unsubscribe();
  }


  getAlquileres():void {
    this.apiService.getAlquileres().subscribe((res) => {
      console.log(res);
      for(let value of res){
        if (value.idVehiculo.estado != 0) {
          
          this.alquileres.push(value);
        }
      }
      console.log(this.alquileres);
    })
    
  }

  devolverVehiculo(alquiler: Alquiler): void {
    this.vehiculo = alquiler.idVehiculo;
    this.vehiculo.estado = 0;
    console.log(this.vehiculo);
    // cambiando el estado del vehiculo a 0 cuando se devuelve
    this.apiService.updateVehiculo(this.vehiculo).subscribe(() => {
      this.alquileres = [];
      this.getAlquileres();
    });
  }

}
