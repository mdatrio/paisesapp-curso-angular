import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) {}

  buscar( termino: string ) {

    this.mostrarSugerencias = false;

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe( (paises) => {
        console.log(paises);
        this.paises = paises; //Array de Countries creado en las propiedades es igual a los países que recibo como argumento (next) en la respuesta

      }, (err) => {
        this.hayError = true;
        this.paises = []; //Al recibir un error, se purgan los países
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
      .subscribe(paises => 
        this.paisesSugeridos = paises.splice(0, 5),
        (err) => this.paisesSugeridos = []
      );
  }
}
