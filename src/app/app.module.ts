import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { DemandeurComponent } from './components/demandeur/demandeur.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { HttpClientModule } from '@angular/common/http';
import { FluxComponent } from './components/flux/flux.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMatComponent } from './form-mat/form-mat.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FournisseurComponent,
    DemandeurComponent,
    MaterielComponent,
    FluxComponent,
    FormMatComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
