import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  email: any = {};
  constructor(private autorizacionService: AutorizacionService){
    this.autorizacionService.isLogged()
    .subscribe((result)=>{
      
      if(result && result.uid){
        this.loggedIn = true;
        this.email = autorizacionService.getCorreo();
      }else{
        this.loggedIn = false;
      }
    },(error)=>{
      this.loggedIn = false;
    });
  }

  logout(){
    this.autorizacionService.logout();
  }
  title = 'PlatziSquare';
  /*a=3;
  b=5;
  listo = false;
  nombre:string = '';
  apellido:string ='';
  edad:string ='';
  //Ejemplo 2
  personas:any=[
  {mayores:true, nombre:'Ronald Nolasco', edad:19},
  { mayores: true, nombre: 'Fátima Zacarías', edad: 19},
  { mayores: true, nombre: 'Irma Umanzor', edad: 14 },
  { mayores: true, nombre: 'Diego Vásquez', edad: 17 },
  { mayores: true, nombre: 'Juan Pedro', edad: 29 }
  ];
  lat: number = 13.670849;
  lng: number = -89.2567077;

  constructor(){
    setTimeout(()=>{
      this.listo = true;
    }, 3000)
  }
  hacerAlgo(){
    alert('Hola!');
  }*/
}
