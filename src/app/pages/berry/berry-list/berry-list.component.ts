import { Component, OnInit } from '@angular/core';
import { BerryService } from 'src/app/services/berry/berry.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

export interface Berry {
  id: number;
  name: string;
  firmness: string;
  flavor: string;
  type: string;
  power: number;
}

@Component({
  selector: 'pokedex-berry-list',
  templateUrl: './berry-list.component.html',
  styleUrls: ['./berry-list.component.scss']
})
export class BerryListComponent implements OnInit {

  public berryList: Berry[] = [];
  displayedColumns: string[] = ['id', 'name', 'firmness', 'flavor', 'type', 'power'];

  public constructor(
    private berryService: BerryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBerryList();
  }

  private getBerryList() {
    this.berryService.getBerryList().subscribe((raw: any) => {
      const observables = raw.results.map((item: any) =>
        this.berryService.getBerryDetails(item.name)
      );
  
      forkJoin(observables).subscribe((details: any) => {
        this.berryList = details.map((detail: any) => ({
          id: detail.id,
          name: detail.name,
          firmness: detail.firmness.name,
          flavor: detail.flavors,
          type: detail.natural_gift_type.name,
          power: detail.natural_gift_power
        }));
        console.log(this.berryList);
      });
    });
  }

  public goToBerryDetails(name: any){
    this.router.navigate([`pages/berry/${name}`]);
  }

  public capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }
}
