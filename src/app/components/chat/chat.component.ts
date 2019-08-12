import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor(public cs: ChatService) { 
    this.cs.cargarMensajes()
      .subscribe(() => {
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    //console.log(this.mensaje);
    if(this.mensaje.length === 0) {
      return;
    } else {
      this.cs.agregarMensaje(this.mensaje)
        .then(() => this.mensaje = "")
        .catch((err) => console.error('Error al enviar', err));
    }
  }

}
