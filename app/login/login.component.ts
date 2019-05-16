import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginParams: any = {};
    constructor(private autorizacionService: AutorizacionService){     
    }
    login(){
        this.autorizacionService.login(this.loginParams.email, this.loginParams.password);
    }
    facebookLogin(){
        this.autorizacionService.facebookLogin();
    }
}
