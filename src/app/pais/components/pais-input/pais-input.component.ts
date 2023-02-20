import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();
  
  termino: string = '';

  @Input() placeholder: string = '';

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => { //Nos suscribimos al debouncer de arriba
      // console.log('debouncer:', valor);
      this.onDebounce.emit(valor);
    })
  }

  //Cuando se presiona Enter, se llama a este método. Este emite el valor al componente padre
  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.debouncer.next(this.termino);
  }

}
