import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Injectable()
export class AutorizacionService{
    authState: any = null;
    constructor(private angularFireAuth:AngularFireAuth, private router: Router){
        this.isLogged();
    }  
    public facebookLogin(){
        this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result)=>{
            console.log(result);
            alert("Usuario loggeado con Facebook!");
            this.router.navigate(['lugares']);  
        })
        .catch((error)=>{
            alert("Ha ocurrido un error: " + error);
        })
    }
    public registro = (email, password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((response)=>{
            alert('Usuario registrado con éxito!');
            console.log(response);
        })
        .catch((error)=>{
            alert("Un error ha ocurrido: " +error);
        })
    }

    public login = (email, password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                alert('Usuario loggeado con éxito!');
                console.log(response);
                this.router.navigate(['lugares']);
            })
            .catch((error) => {
                alert("Un error ha ocurrido: " + error);
            })
    }

    public isLogged(){
        return this.angularFireAuth.authState;
    };

    public logout(){
        this.angularFireAuth.auth.signOut();
        alert('Sesión cerrada');
        this.router.navigate(['lugares']);

    }

    public getCorreo(){
       return this.angularFireAuth.auth.currentUser.email;
    }
    
}