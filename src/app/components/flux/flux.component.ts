import { Component,OnInit } from '@angular/core';
import { FluxService } from 'src/app/services/flux/flux.service';

@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.css']
})
export class FluxComponent implements OnInit {
  flux!: any;
  
  constructor (private fluxService: FluxService) {}

  ngOnInit(): void {
      this.getAllBy("");
  }

  getAllBy (filtre: string) {
    filtre = filtre.toUpperCase();
    switch (filtre) {
      case "ENTREE":
        this.fluxService.getAll().subscribe({
          next: (data) => {
            this.flux = data;
            this.flux = [...this.flux.filter((f:any) => f.typeFlux === filtre)];
          },
          error: (err) => alert(err)
        });
        break;
      
        case "SORTIE":
          this.fluxService.getAll().subscribe({
            next: (data) => {
              this.flux = data;
              this.flux = [...this.flux.filter((f:any) => f.typeFlux === filtre)];
            },
            error: (err) => alert(err)
          });
          break;
        
          case "REMISE":
            this.fluxService.getAll().subscribe({
              next: (data) => {
                this.flux = data;
                this.flux = [...this.flux.filter((f:any) => f.typeFlux === filtre)];
              },
              error: (err) => alert(err)
            });
            break;

      default:
        this.fluxService.getAll().subscribe({
          next: (data) => {
            this.flux = data;
          },
          error: (err) => alert(err)
        });
        break;
    }
  }

  handleFilter() {
    console.log("za ty");
  }

}
