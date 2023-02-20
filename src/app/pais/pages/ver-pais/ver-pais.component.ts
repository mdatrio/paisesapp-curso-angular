import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  translations!: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisById(id)),
        // El tap es un operador que dispara un efecto secundario
        tap(console.log)
      )
      .subscribe( pais => {
        this.pais = pais;
      })

    /* this.activatedRoute.params
      .subscribe( ({id}) => {
        console.log(id);

        this.paisService.getPaisById(id)
          .subscribe( pais => {
            console.log(pais);
          })
      }) */

  }



}
