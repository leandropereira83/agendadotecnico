import { Component } from '@angular/core';
import { environment } from './core/environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {

  constructor() {
    //alert(`Ambiente: ${environment.ambiente}`);
    console.log(`Ambiente: ${environment.ambiente}`);
  }

}
