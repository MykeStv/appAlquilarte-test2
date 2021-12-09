import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vehiculo } from 'src/app/interfaces/vehiculos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit, OnDestroy {

  vehiculos: Vehiculo[] = [];
  subscription: Subscription = new Subscription;

  constructor(private apiService:ApiService) {

    /*
    // obteniendo la info del apiService de los vehiculos
    this.apiService.getVehiculos().subscribe((response)=>{

      //toma la respuesta y la almacena en el array vehiculos
      this.vehiculos = JSON.parse(JSON.stringify(response));
      console.log("hola");

    });
    */


  }

  ngOnInit(): void {
    this.getVehiculos();

    //esto es para recargar la pagina cada vez que se elimina un elemento
    this.subscription = this.apiService.refresh$.subscribe(() => {
      this.getVehiculos();
    })
  }

  ngOnDestroy():void {
    //para cerrar el observable cuando se cambia de pagina
    this.subscription.unsubscribe();
  }

 
  getVehiculos():void {
    this.apiService.getVehiculos2().subscribe(response => (this.vehiculos = response));
  }

  //lo anexamos al boton de eliminar
  delete(vehiculo:Vehiculo): void {
    let confirmacion = confirm(`Desea eliminar el vehiculo de placas "${vehiculo.placa}"?`)

    if(confirmacion){
      this.apiService.deleteVehiculo(vehiculo.id).subscribe();
    }
    
    //al eliminarse, se debe recargar el contenido, no lo está realizando
  }

}
