import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';

export class WebSocketAPI {
  // WebSocketEndPoint: string = 'http://localhost:8080/realTimeAPI';
  WebSocketEndPoint: string = 'http://3.22.61.171:8080/realTimeAPI';
  // WebSocketEndPoint: string = 'https://honda-api-demo.herokuapp.com';
  topic: string = '/dataListener';
  stompClient: any;
  appComponent: AppComponent;
  message = new Subject<any>();
  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.WebSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      (data) => {
        _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
          _this.onMessageReceived(sdkEvent);
        });
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  onMessageReceived(message): any {
    const msg = JSON.parse(message.body);
    // console.log('Message Received from Server :: ' + msg.timestamp);
    this.message.next(msg);
    return msg;
  }
}
