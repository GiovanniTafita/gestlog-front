import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeurComponent } from './components/demandeur/demandeur.component';
import { FluxComponent } from './components/flux/flux.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { FormMatComponent } from './form-mat/form-mat.component';

const routes: Routes = [
  {path: '', component: FluxComponent},
  {path: 'fournisseur', component: FournisseurComponent},
  {path: 'demandeur', component: DemandeurComponent},
  {path: 'materiel', component: MaterielComponent},
  {path: 'materiel/addMateriel', component: FormMatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
