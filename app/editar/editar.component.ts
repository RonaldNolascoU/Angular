import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
    selector: 'app-editar',
    templateUrl: './editar.component.html',
    styleUrls: ['./editar.component.css']
})
export class EditarComponent {
    lugar:any = [];
    constructor(private lugaresService:LugaresService){
        
    }
    guardarLugar(){
        var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
        this.lugaresService.obtenerGeoData(direccion).subscribe((result:any) =>{
            this.lugar.lat = result.results[0].geometry.location.lat;
            this.lugar.lng = result.results[0].geometry.location.lng;
            this.lugar.id = Date.now();
            this.lugaresService.editarLugar(this.lugar);
            alert('Negocio editado con éxito');
            this.lugar = {};
        })
        
    }
}
