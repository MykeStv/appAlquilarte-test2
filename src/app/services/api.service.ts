import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //para conectar con urls
import { map } from 'rxjs/operators';
import { SesionService } from './sesion.service';

import { Vehiculo } from '../interfaces/vehiculos.interface';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente.interface';
import { Alquiler } from '../interfaces/alquiler.interface';


//headers
const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url para consultar el api
  url:string = "https://api-alquilarte.herokuapp.com/";

  //haciendo un observable para el refresh
  private _refresh$ = new Subject<void> ();



  constructor(private httpClient:HttpClient, private sesionService:SesionService) {

    //http opcions para el header y la authorization
    

  }

  //refresh
  get refresh$(){
    return this._refresh$;
  }




  //metodo para iniciar sesion del usuario
  login(user:string, password:string) {

    // concatenando la url con el path en el api para el registro de usuarios
    const peticion = `${this.url}usuarios/login`;

    //creando un usuario que almacenara los datos ingresados en el registro
    const usuario:any = {
      user,
      password
    }

    //headers
    const headers:HttpHeaders = new HttpHeaders({
      //encabezato para continido tipo json
      'Content-Type': 'application/json;charset="utf-8"'
    })

    //mapeando la info
    return this.httpClient.post(peticion, usuario, { headers })
                          .pipe(map((data:any) => {
                            return data;
                          }));

  }


  //metodo para registrar un usuario
  addUsuario(nombre:string, tipo:string, user:string, password:string) {

    // concatenando la url con el path en el api para el registro de usuarios
    const peticion = `${this.url}usuarios/registrar`;

    //creando un usuario que almacenara los datos ingresados en el registro
    const usuario:any = {
      nombre,
      tipo,
      user,
      password
    };

    //headers
    const headers:HttpHeaders = new HttpHeaders({
      //encabezato para continido tipo json
      'Content-Type': 'application/json;charset="utf-8"'
    })

    //mapeando la info, ¡estudiar mas esto!
    return this.httpClient.post(peticion, usuario, {headers})
                          .pipe(map((data:any) => {
                            return data;
                          }))

  }

  /*
  //funcion para obtener una lista de vehiculos obtenidos del api
  getVehiculos() {
    //peticion
    const peticion = `${this.url}vehiculos`;

    //headers
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset="utf-8"',
      Authorization: 'Bearer '+this.sesionService.getUsuario().token
    });
    console.log("PRUEABA");
    console.log(this.sesionService.getUsuario().token);


    //obteniendo la data, metodo get
    return this.httpClient.get(peticion).pipe(map((data:any)=>{
      return data;
    }));

  } */

  getVehiculos2():Observable<Vehiculo[]> {
    
    const peticion = `${this.url}vehiculos`;

    /*
    //headers
    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset="utf-8"',
      Authorization: 'Bearer '+this.sesionService.getUsuario().token
    });*/

    //headers
    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );
    

    return this.httpClient.get<Vehiculo[]>(peticion, httpOptions).pipe();
  }

  //funcion para obtener un vehiculo a partir del id
  getVehiculo(id:number): Observable<Vehiculo> {
    //url del partido
    const peticion = `${this.url}vehiculos/${id}`;

    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.get<Vehiculo>(peticion, httpOptions).pipe();
  }


  addVehiculo(vehiculo:Vehiculo):Observable<Vehiculo> {
    const peticion = `${this.url}vehiculos`;

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json;charset="utf-8"'
    });

    return this.httpClient.post<Vehiculo>(peticion, vehiculo, { headers }).pipe();
  }


  //observable


  //metodo para eliminar vehiculo del componente vehiculos
  deleteVehiculo(id: number): Observable<unknown> {

    //url
    const peticion = `${this.url}vehiculos/${id}`;

    //headers
    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );
    

    return this.httpClient.delete(peticion, httpOptions).pipe(
      tap(() => { this._refresh$.next(); })
    );

  }


  //metodo para actualizar el vehiculo
  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    
    //peticion
    const peticion = `${this.url}vehiculos`;
    
    //headers
    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.put<Vehiculo>(peticion, vehiculo, httpOptions).pipe();

  }

  //funcion para agregar clientes
  addCliente(cliente:Cliente): Observable<Cliente>{
    const peticion = `${this.url}clientes`;

    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.post<Cliente>(peticion, cliente, httpOptions).pipe();
  }

  //funcion para ingresar los datos del alquiler
  addAlquiler(alquiler:Alquiler): Observable<Alquiler> {
    
    const peticion = `${this.url}alquiler`;

    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.post<Alquiler>(peticion, alquiler, httpOptions);
  }
  //metodo para obtener los alquileres
  getAlquileres(): Observable<Alquiler[]> {
    const peticion = `${this.url}alquiler`;

    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.get<Alquiler[]>(peticion, httpOptions).pipe();

  }
  getAlquiler(id: number): Observable<Alquiler> {
    const peticion = `${this.url}alquiler/${id}`;

    httpOptions.headers = httpOptions.headers.set(
      'Authorization', `Bearer ${this.sesionService.getToken()}`
    );

    return this.httpClient.get<Alquiler>(peticion, httpOptions).pipe();

  }
}
