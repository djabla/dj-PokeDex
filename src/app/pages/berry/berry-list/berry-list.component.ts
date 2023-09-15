import { Component, OnInit } from '@angular/core';
import { BerryService } from 'src/app/services/berry/berry.service';
import { Router } from '@angular/router';


@Component({
  selector: 'pokedex-berry-list',
  templateUrl: './berry-list.component.html',
  styleUrls: ['./berry-list.component.scss']
})
export class BerryListComponent implements OnInit {

  public berryList: any[] = [];

  public constructor(
    private berryService: BerryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBerryList();
  }

  private getBerryList(){
    this.berryService.getBerryList().subscribe((raw: any) => {
      raw.results.forEach((item: any) => {
        this.berryService.getBerryDetails(item.name).subscribe((detail: any) => {
          this.berryList.push({
            detail
          })
        })
      })
    });
    console.log(this.berryList);
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
