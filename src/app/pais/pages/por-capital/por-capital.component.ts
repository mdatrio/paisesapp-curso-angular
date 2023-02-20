import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  capitales: Country[] = [];

  constructor( private paisService: PaisService ) {}

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(this.termino)
      .subscribe( (capitales) => {
        console.log(capitales);
        this.capitales = capitales; //Array de Countries creado en las propiedades es igual a los capitales que recibo como argumento (next) en la respuesta

      }, (err) => {
        this.hayError = true;
        this.capitales = []; //Al recibir un error, se purgan los capitales
      });
  }

}
