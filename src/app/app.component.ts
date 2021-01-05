import { Component } from '@angular/core';
import { WebSocketAPI } from './service/WebSocketAPI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HondaFront';

  constructor(webSocketAPI: WebSocketAPI){
    webSocketAPI._connect();
  }
}
