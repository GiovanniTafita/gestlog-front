import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DemandeurService } from 'src/app/services/demandeur/demandeur.service';
import { FluxService } from 'src/app/services/flux/flux.service';
import { MaterielService } from 'src/app/services/materiel/materiel.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {
  materiels !: Array<any>;
  demandeurs !: Array<any>;
  matForm !: FormGroup;
  searchForm !: FormGroup;
  currentPage: number = 0;
  pageSize: number = 7;
  totalPages: number = 0;
  formText: string = "";
  remise: boolean = false; 

  constructor (
    private matService: MaterielService, 
    private fluxService: FluxService, 
    private fb: FormBuilder,
    private demService: DemandeurService
    ) {}

  ngOnInit () {
    this.getPageDem();
    this.matForm = this.fb.group({
      idMat: [''],
      desMat: [''],
      etatMat: [''],
      cateMat: [''],
      idDem: ['']
    });
    this.searchForm = this.fb.group({
      key: ['']
    })
  }

  getMateriels () {
    this.matService.getAll().subscribe(
      {
        next: (data) => {
          this.materiels = data;
        },
        error: (err) => {
          alert("Erreur");
        }
      }
    );
  }

  getDemandeurs () {
    this.demService.getAll().subscribe(
      {
        next: (data) => {
          this.demandeurs = data;
        },
        error: (err) => {
          alert("Erreur");
        }
      }
    );
  }

  getPageDem () {
    this.matService.getPages(this.currentPage, this.pageSize).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.materiels = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          alert(err);
        }
      }
    );
  }

  goToPage (i: number) {
    this.currentPage = i;
    this.getPageDem();
  }

  handleSearch () {
    if (this.searchForm.value.key !== '') {
      this.matService.findBy(this.searchForm.value.key, this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          this.materiels = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          alert("Erreur");
        }
      });
    }
    else {
      this.getPageDem();
    }
  }

  openForm (mat: any, remise: boolean): void {
    this.getDemandeurs();
    if (remise) {
      this.formText = "Remettre";
      this.remise = true;
    }
    else {this.formText = "Attribuer"}

    const btn = document.createElement('button');
    const container = document.querySelector('#btn-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#matModal');
    container?.appendChild(btn);
    this.matForm = this.fb.group({
      idMat: [mat.idMat],
      desMat: [mat.desMat],
      etatMat: [mat.etatMat],
      cateMat: [mat.cateMat],
      idDem: ['']
    });
    btn.click();
     
  } 

  handleSubmit () {
    let mat = {
      idMat: this.matForm.value.idMat,
      desMat: this.matForm.value.desMat,
      etatMat: this.matForm.value.etatMat,
      cateMat: this.matForm.value.cateMat,
      dispo: false
    }
    let newFlux = {
      typeFlux: "SORTIE",
      materiel: {
        idMat: this.matForm.value.idMat 
      },
      demandeur: {
        idDem: this.matForm.value.idDem,
      }
    }
    if (this.remise) {
      mat.dispo = true;
      newFlux.typeFlux = "REMISE";
    }
    this.fluxService.add(newFlux).subscribe({
      next: (data) => {
        console.log(data);
        this.matService.update(mat).subscribe({
          next: (data) => {
            document.getElementById('close')?.click();
            this.getPageDem();
            // console.log(data);
            alert("Opération effectuée avec succés");
          },
          error: (err) => {alert("Erreur"); document.getElementById('close')?.click();}
        });
      },
      error: (err) => {alert("Erreur"); document.getElementById('close')?.click();}
    });
    this.matForm.reset();
  }

  handleRemise (mat : any) {
    mat.dispo = true;
    this.matService.update(mat).subscribe({
      next: () => this.getPageDem(),
      error:  (err) => alert("Erreur")
    });
  }
}
