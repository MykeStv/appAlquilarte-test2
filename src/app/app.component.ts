import { Component } from '@angular/core';
import { SesionService } from './services/sesion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public sesionService:SesionService) {

  }

}
