import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonDataService } from 'src/app/services/pokemon/pokemon-data.service';

@Component({
  selector: 'pokedex-select-view',
  templateUrl: './select-view.component.html',
  styleUrls: ['./select-view.component.scss']
})
export class SelectViewComponent implements OnInit {

  private pokemonName: any;
  public pokemonDetails: any;
  public pokemonDescription: any;
  public pokemonImg: any[] = [];

  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

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
        this.assignImg();
      }
    );
    this.pokemonDataService.getDesc(this.pokemonName).subscribe(
      (desc: any) => {
        this.pokemonDescription = desc;
        console.log(this.pokemonDescription);
      }
    )
  }

  assignImg(){
    this.pokemonImg[0] = this.pokemonDetails.sprites.front_default;
    this.pokemonImg[1] = this.pokemonDetails.sprites.back_default;
    this.pokemonImg[2] = this.pokemonDetails.sprites.front_shiny;
    this.pokemonImg[3] = this.pokemonDetails.sprites.back_shiny;
    console.log(this.pokemonImg);
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
      case 'grass': return '#7AC74C';
      case 'fire': return '#EE8130';
      case 'water': return '#6390F0';
      case 'electric': return '#F7D02C';
      case 'poison': return '#A33EA1';
      case 'ground': return '#E2BF65';
      case 'flying': return '#A98FF3';
      case 'psychic': return '#F95587';
      case 'bug': return '#A6B91A';
      case 'fighting': return '#C22E28';
      case 'rock': return '#B6A136';
      case 'ghost': return '#735797';
      case 'ice': return '#96D9D6';
      case 'dragon': return '#6F35FC';
      case 'dark': return '#705746';
      case 'steel': return '#B7B7CE';
      case 'fairy': return '#D685AD';
      default: return '#A8A77A';
    }
  }

  private bgTypeColor(type: any){
    switch(type){
      case 'grass': return '#B4D3B2';
      case 'fire': return '#FFB347';
      case 'water': return '#78A2CC';
      case 'electric': return '#E1AD01';
      case 'poison': return '#B19CD9';
      case 'ground': return '#E2BF65';
      case 'flying': return '#A98FF3';
      case 'psychic': return '#F95587';
      case 'bug': return '#56AE57';
      case 'fighting': return '#C22E28';
      case 'rock': return '#B6A136';
      case 'ghost': return '#735797';
      case 'ice': return '#96D9D6';
      case 'dragon': return '#6F35FC';
      case 'dark': return '#705746';
      case 'steel': return '#B7B7CE';
      case 'fairy': return '#D685AD';
      default: return '#A8A77A';
    }
  }

  public bgColor(type: any){
    if(type.length == 1){
      let color = this.bgTypeColor(type[0].type.name);
      return color;
    } else if(type.length == 2) {
      return 'linear-gradient(135deg, ' + this.bgTypeColor(type[0].type.name) + ', 60%, ' + this.bgTypeColor(type[1].type.name) + ')';
    } else {
      return 'black';
    }
  }
  
}
