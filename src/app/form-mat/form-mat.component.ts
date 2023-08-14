import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FluxService } from '../services/flux/flux.service';
import { MaterielService } from '../services/materiel/materiel.service';
import { FournisseurService } from '../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-form-mat',
  templateUrl: './form-mat.component.html',
  styleUrls: ['./form-mat.component.css']
})
export class FormMatComponent implements OnInit {

  matForm !: FormGroup;
  fournisseurs !: Array<any>;

  constructor (
    private matService: MaterielService, 
    private fluxService: FluxService, 
    private fb: FormBuilder, 
    private router: Router,
    private frnsService: FournisseurService
    ) {}

  ngOnInit(): void {
    this.matForm = this.fb.group({
      desMat: [''],
      etatMat: [''],
      cateMat: [''],
      idFrns: [''],
      dispo: [true]
    });
    this.getFournisseurs();
  }

  getFournisseurs () {
    this.frnsService.getAll().subscribe(
      {
        next: (data) => {
          this.fournisseurs = data;
        },
        error: (err) => {
          alert("Erreur");
        }
      }
    );
  }

  handleSubmit () {
    let newMat = {
      desMat: this.matForm.value.desMat,
      etatMat: this.matForm.value.etatMat,
      cateMat: this.matForm.value.cateMat,
      dispo: true
    }

    let newFlux = {
      typeFlux: "ENTREE",
      materiel: {
            
      },
      fournisseur: {
        idFrns: this.matForm.value.idFrns,
      }
    }
    this.matService.add(newMat).subscribe(
      {
        next: (data) => {
          console.log(data);
          let newFlux = {
            typeFlux: "ENTREE",
            materiel: data,
            fournisseur: {
              idFrns: this.matForm.value.idFrns,
            }
          }
          this.fluxService.add(newFlux).subscribe({
            next: (data) => console.log(data)
          });
          this.matForm.reset();
          this.router.navigateByUrl('materiel');
        },
        error: (err) => {
          alert(err);
        }
      }
    );
  }
}
