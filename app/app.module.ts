import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppResaltarDirective } from './directives/resaltar.directive';
import { AppContarClicksDirective } from './directives/contar-clicks.directive';
import { Route, Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { CrearComponent } from './crear/crear.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AutorizacionService } from './services/autorizacion.service';
import { MyGuard } from './services/my-guard.service';

const appRoutes: Routes =[
  {path:'', component:LugaresComponent},
  {path:'lugares', component: LugaresComponent},
   { path: 'detalle/:id', component: DetalleComponent },
   { path: 'contacto', component: ContactoComponent },
  { path: 'crear/:id', component: CrearComponent, canActivate:[MyGuard] },
  {path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent }
];
export const firebaseConfig = {
  apiKey: "AIzaSyCkCxcwimrf4oHEERxPGb1eX6WswDm-JeI",
  authDomain: "platzisquare-230901.firebaseapp.com",
  databaseURL: "https://platzisquare-230901.firebaseio.com",
  projectId: "platzisquare-230901",
  storageBucket: "",
  messagingSenderId: "130569192075"
};
@NgModule({
  declarations: [
    AppComponent,
    AppResaltarDirective,
    AppContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCkCxcwimrf4oHEERxPGb1eX6WswDm-JeI'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
    //AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    //AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule,// imports firebase/storage only needed for storage features
  ],
  providers: [LugaresService, AutorizacionService, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
