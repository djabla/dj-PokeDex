import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BerryService } from 'src/app/services/berry/berry.service';

@Component({
  selector: 'pokedex-berry-select',
  templateUrl: './berry-select.component.html',
  styleUrls: ['./berry-select.component.scss']
})
export class BerrySelectComponent implements OnInit {

  public berryDetails: any;
  public berryName: any;

  public constructor(
    private berryService: BerryService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.berryName = params.get('name');
      console.log(this.berryName);
      this.getBerryDetails();
    });
  }

  private getBerryDetails(){
    this.berryService.getBerryDetails(this.berryName).subscribe((detail: any) => {
      this.berryDetails = detail;
      console.log(this.berryDetails);
    })
  }

  public capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

}
