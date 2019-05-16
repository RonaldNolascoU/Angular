import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
//import { AngularFirestore } from "@angular/fire/firestore";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class LugaresService{
    API_ENDPOINT = 'https://platzisquare-230901.firebaseio.com'
    lugares: any = [
        { id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombre: 'Florería La Gardenia' },
        { id: 2, plan: 'gratuito', cercania: 1, distancia: 1.8, active: true, nombre: 'Donas La Pasadita' },
        { id: 3, plan: 'gratuito', cercania: 2, distancia: 5, active: true, nombre: 'Veterinaria Huellitas Felices' },
        { id: 4, plan: 'gratuito', cercania: 3, distancia: 10, active: false, nombre: 'Sushi Sushiroll' },
        { id: 5, plan: 'gratuito', cercania: 3, distancia: 35, active: true, nombre: 'Hotel La Gracia' },
        { id: 6, plan: 'pagado', cercania: 2, distancia: 120, active: true, nombre: 'Zapatería El Clavo' }
    ];
    constructor(private afDB:AngularFireDatabase, private http:HttpClient){

    }
    public getLugares(){
       return this.afDB.list('lugares/');
    //return this.http.get(this.API_ENDPOINT + '/lugares.json');    

    }
   public buscarLugar(id) {
        return this.lugares.filter((lugar) => { return lugar.id == id })[0] || null;
    }
    public guardarLugar(lugar){
        this.afDB.database.ref('lugares/' + lugar.id).set(lugar);  
        //const headers = new HttpHeaders({"Content-Type":"application/json"});
        //return this.http.post(this.API_ENDPOINT + '/lugares.json', lugar, {headers:headers});    
    }
    public editarLugar(lugar){
        this.afDB.database.ref('lugares/' + lugar.id).set(lugar);      

    }
    public obtenerGeoData(direccion){
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDHBye_J9BMA3kTEmY-XfX8Ne0rzX5KFiM&address='+direccion);
    }
    public getLugar(id){
       return this.afDB.object('lugares/' + id);
    }
}