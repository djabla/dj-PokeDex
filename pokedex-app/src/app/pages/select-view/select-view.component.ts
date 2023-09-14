import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';

@Component({
  selector: 'pokedex-select-view',
  templateUrl: './select-view.component.html',
  styleUrls: ['./select-view.component.scss']
})
export class SelectViewComponent implements OnInit {

  private pokemonName: any;
  public pokemonDetails: any;
  public pokemonDescription: any;

  public constructor(
    private pokemonDataService: PokemonDataService,
    private route: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonName = params.get('name');
      console.log(this.pokemonName);

      // Fetch details for the new PokemonName
      this.getDetails();
    });
  }

  getDetails(){
    this.pokemonDataService.getDetails(this.pokemonName).subscribe(
      (detail: any) => {
        this.pokemonDetails = detail;
        console.log(this.pokemonDetails);
      }
    );
    this.pokemonDataService.getDesc(this.pokemonName).subscribe(
      (desc: any) => {
        this.pokemonDescription = desc;
        console.log(this.pokemonDescription);
      }
    )
  }

  capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

  convertToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }

  convertToFeet(meter: any) {
    let feet = Math.floor(meter * 3.28084);
    let inches = Math.round((meter * 3.28084 - feet) * 12);
  
    if (inches === 12) {
      inches = 0;
      feet += 1;
    }
  
    return `${feet}'${inches}"`;
  }

  convertToLbs(kg: any) {
    return Math.round(kg * 2.20462);
  }

  typeColor(type: any){
    switch(type){
      case 'grass': return '#00FF00';
      case 'fire': return 'red';
      case 'water': return 'blue';
      case 'electric': return 'yellow';
      case 'poison': return 'purple';
      case 'ground': return 'brown';
      case 'flying': return 'orange';
      case 'psychic': return 'pink';
      case 'bug': return 'green';
      case 'rock': return 'brown';
      case 'ghost': return 'purple';
      case 'ice': return 'blue';
      case 'dragon': return 'purple';
      case 'dark': return 'black';
      case 'fairy': return 'pink';
      default: return 'black';
    }
  }
  
}
