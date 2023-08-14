import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DemandeurService } from 'src/app/services/demandeur/demandeur.service';

@Component({
  selector: 'app-demandeur',
  templateUrl: './demandeur.component.html',
  styleUrls: ['./demandeur.component.css']
})
export class DemandeurComponent implements OnInit {
  demandeurs !: Array<any>;
  editDem !: any;
  demForm !: FormGroup;
  searchForm !: FormGroup;
  table: boolean = true;
  card: boolean = false;
  currentPage: number = 0;
  pageSize: number = 7;
  totalPages: number = 0; 

  constructor (private demService: DemandeurService, private fb: FormBuilder) {}

  ngOnInit (): void {
    this.getPageDem();
    this.demForm = this.fb.group({
      idDem: [''],
      nomDem: [''],
      foncDem: [''],
      telDem: ['']
    });
    this.searchForm = this.fb.group({
      key: ['']
    })
  }

  toggleView () {
    this.card = !this.card;
    this.table = !this.table;  
  }

  getDemandeurs () {
    this.demService.getAll().subscribe(
      {
        next: (data) => {
          this.demandeurs = data;
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
  
  getPageDem () {
    this.demService.getPages(this.currentPage, this.pageSize).subscribe(
      {
        next: (data) => {
          this.demandeurs = data.content;
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

  openForm (dem: any): void {
    this.demForm.reset();
    this.editDem = null;
    const btn = document.createElement('button');
    const container = document.querySelector('#btn-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#demandeurModal');
    container?.appendChild(btn);
    this.editDem = dem;
    if (dem !== null) {
      this.demForm = this.fb.group({
        idDem: [this.editDem?.idDem],
        nomDem: [this.editDem?.nomDem],
        foncDem: [this.editDem?.foncDem],
        telDem: [this.editDem?.telDem]
      });
    }
    console.log(this.editDem);
    btn.click();
     
  } 

  handleDelete (obj: Object) {
    // appel du service supprimer
    if (confirm("Confirmer la suppression ?")) {
      this.demService.delete(obj).subscribe(
        {
          next: () => {
            let index = this.demandeurs.indexOf(obj);
            this.demandeurs.splice(index, 1);
            alert("Opération effectuée avec succés");
          },
          error: (err) => {
            alert("Erreur");
          }
        }
      );
    }
  }
  handleSubmit () {
    let newDem = this.demForm.value;
    if (this.editDem === null) {
      this.demService.add(newDem).subscribe(
        {
          next: (data) => {
            console.log(data);
            document.getElementById('close')?.click();
            this.demForm.reset();
            this.getPageDem();
            alert("Opération effectuée avec succés");
          },
          error: (err) => {
            alert("Erreur");
          }
        }
      );
    }
    else {
      this.demService.update(newDem).subscribe(
        {
          next: (data) => {
            console.log(data);
            document.getElementById('close')?.click();
            this.demForm.reset();
            this.getPageDem();
          },
          error: (err) => {
            alert("Erreur");
          }
        }
      );
    }
  }

  handleSearch () {
    if (this.searchForm.value.key !== '') {
      this.demService.findBy(this.searchForm.value.key, this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          this.demandeurs = data.content;
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
}
