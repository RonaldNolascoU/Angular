import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.css']
})
export class CrearComponent {
    lugar:any = [];
    id: any = null;
    results$: Observable<any>;
    private searchField: FormControl;
    mensaje:string=''
    constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: HttpClient){       
        this.id = this.route.snapshot.params['id'];
        if(this.id != 'new'){
            this.lugaresService.getLugar(this.id).valueChanges().subscribe(lugar =>{
                this.lugar = lugar;
            })
        }
        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDHBye_J9BMA3kTEmY-XfX8Ne0rzX5KFiM';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
        .debounceTime(500)
            .switchMap(query => this.http.get(`${URL}?address=${query}`))
            .map(response => response['results']);
    }
    seleccionarDireccion(direccion){
        console.log(direccion);
        this.lugar.calle = direccion.address_components[1].long_name + ' ' + direccion.address_components[0].long_name;
        this.lugar.ciudad =direccion.address_components[4].long_name;
        this.lugar.pais = direccion.address_components[6].long_name;
    }
    guardarLugar(){

        var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
        this.lugaresService.obtenerGeoData(direccion).subscribe((result:any) =>{
            debugger;
            this.lugar.lat = result.results[0].geometry.location.lat;
            this.lugar.lng = result.results[0].geometry.location.lng;           
            if(this.id != 'new'){
                this.lugaresService.editarLugar(this.lugar);
               //swal('Registro exitoso...', this.mensaje, 'success');
               
            }else{
               
                this.lugar.id = Date.now();
                this.lugaresService.guardarLugar(this.lugar);
                alert('Negocio guardado con éxito');
            }
            
            
            this.lugar = {};
        })
        
    }
}
