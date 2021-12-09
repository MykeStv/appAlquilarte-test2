import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alquiler } from 'src/app/interfaces/alquiler.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alquiler-info',
  templateUrl: './alquiler-info.component.html',
  styleUrls: ['./alquiler-info.component.css']
})
export class AlquilerInfoComponent implements OnInit {

  alquiler: Alquiler = {
    id: 0,
    idUser: {},
    idCliente: {},
    idVehiculo: {
      id: 0,
      placa: undefined,
      marca: undefined,
      modelo: 0,
      tipo: {},
      puertas: 0,
      puestos: 0,
      precio: 0,
      estado: 0
    },
    fechaAlq: undefined,
    fechaDev: undefined,
    precioTotal: 0
  }
  constructor(private apiService:ApiService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    //toma el id de la ruta
    this.activatedRoute.params.subscribe(parametros => {
      let id = parametros["id"];
      
      //escribe los valores del alquiler a partir de ese id
      this.apiService.getAlquiler(id).subscribe((res) => {
        this.alquiler = JSON.parse(JSON.stringify(res));
      });
    });
    console.log(this.alquiler);


  }

}
