import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  //Los estilos solo se aplican a este componente. Es como ponerlos en el archivo CSS propio del componente
  styles: [ `
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  getClassCSS(region: string): string {
    return (this.regionActiva === region) ? 'btn-primary' : 'btn-outline-primary';
  }

  activarRegion(region: string) {

    //Comprobamos si la región es la misma que la que ya está seleccionada, para que no se vuelva a cargar y no se consuman recursos
    if(region === this.regionActiva) {
      return;
    }

    this.regionActiva = region;
    this.paises = []; //Purgamos países para mejorar el rendimiento

    this.paisService.buscarRegion(region)
      .pipe (
        tap(console.log)
      )
      .subscribe((paises) => {
        this.paises = paises;
      })
  }

}
