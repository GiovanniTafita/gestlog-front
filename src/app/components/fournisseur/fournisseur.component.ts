import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FournisseurService } from 'src/app/services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit {
  fournisseurs !: Array<any>;
  editFrns!: any;
  frnsForm!: FormGroup;
  searchForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 7;
  totalPages: number = 0; 

  constructor (private fournisseurService : FournisseurService, private fb: FormBuilder) {}

  ngOnInit () {
    this.getPage();
    this.frnsForm = this.fb.group({
      idFrns: [''],
      nomFrns: [''],
      adrsFrns: [''],
      telFrns: ['']
    });
    this.searchForm = this.fb.group({
      key: ['']
    });
  }

  getFournisseur () {
    this.fournisseurService.getAll().subscribe(
      {
        next: (data) => {
          this.fournisseurs = data;
        },
        error: (err) => {
          alert(err);
        }
      }
    );
  }

  getPage () {
    this.fournisseurService.getPages(this.currentPage, this.pageSize).subscribe(
      {
        next: (data) => {
          this.fournisseurs = data.content;
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
    this.getPage();
  }

  handleDelete (obj: Object) {
    // appel du service supprimer
    if (confirm("Confirmer la suppression ?")) {
      this.fournisseurService.delete(obj).subscribe(
        {
          next: () => {
            let index = this.fournisseurs.indexOf(obj);
            this.fournisseurs.splice(index, 1);
            window.alert('Success');
          },
          error: (err) => {
            alert("Erreur");
          }
        }
      );
    }
  }
  handleUpdateButton() {
    // appel du service modifier 
    
  }

  openForm (frns: any): void {
    this.frnsForm.reset();
    this.editFrns = null;
    const btn = document.createElement('button');
    const container = document.querySelector('#btn-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#demandeurModal');
    container?.appendChild(btn);
    if (frns !== null) {
      this.editFrns = frns;
      this.frnsForm = this.fb.group({
        idFrns: [this.editFrns?.idFrns],
        nomFrns: [this.editFrns?.nomFrns],
        adrsFrns: [this.editFrns?.adrsFrns],
        telFrns: [this.editFrns?.telFrns]
      });
    }
    btn.click();
     
  }

  handleSubmit () {
    let newDem = this.frnsForm.value;
    this.frnsForm.reset();
    if (this.editFrns === null) {
      this.fournisseurService.add(newDem).subscribe(
        {
          next: (data) => {
            console.log(data);
            document.getElementById('close')?.click();
            this.frnsForm.reset();
            this.getPage();
            alert("Opération effectuée avec succés");
          },
          error: (err) => {
            alert(err);
          }
        }
      );
    }
    else {
      this.fournisseurService.update(newDem).subscribe(
        {
          next: (data) => {
            console.log(data);
            document.getElementById('close')?.click();
            this.frnsForm.reset();
            this.getPage();
          },
          error: (err) => {
            alert(err);
          }
        }
      );
    }
  }

  handleSearch () {
    if (this.searchForm.value.key !== '') {
      this.fournisseurService.findBy(this.searchForm.value.key,this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          this.fournisseurs = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          alert(err);
        }
      });
    }
    else {
      this.getPage();
    }
  }
}
