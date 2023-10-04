import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonDataService } from 'src/app/services/pokemon/pokemon-data.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'pokedex-select-view',
  templateUrl: './select-view.component.html',
  styleUrls: ['./select-view.component.scss'],
  providers: [DynamicDialogRef]
})
export class SelectViewComponent implements OnInit {

  private pokemonName: any;
  public pokemonData: any;
  public pokemonDetails: any;
  public pokemonDescription: any;
  public pokemonGender: any;
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
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {}
  
  ngOnInit(): void {
    /* this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonName = params.get('name');
      console.log(this.pokemonName);

      // Fetch details for the new PokemonName
      this.getDetails();
    }); */
    this.pokemonData = this.config.data;
    this.pokemonDetails = this.config.data.detail;
    this.pokemonName = this.config.data.name;
    console.log(this.pokemonData);
    this.assignImg();
    this.getDesc() ;
  }

  getDesc(){
    this.pokemonDataService.getDesc(this.pokemonDetails.species.url).subscribe(
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

  statPercent(stat: any, max: any){
    return Math.round((stat / max) * 100);
  }

  percentColor(pct: any){
    if(pct >= 0 && pct <= 9){
      return '#FF3333'; 
    } else if(pct >= 10 && pct <= 19){
      return '#FF9933'; 
    } else if(pct >= 20 && pct <= 29){
      return '#FFFF33'; 
    } else if(pct >= 30 && pct <= 39){
      return '#99FF33'; 
    } else if(pct >= 40 && pct <= 49){
      return '#33FF33'; 
    } else if(pct >= 50 && pct <= 59){
      return '#33FF99'; 
    } else if(pct >= 60 && pct <= 69){
      return '#33FFFF'; 
    } else if(pct >= 70 && pct <= 79){
      return '#3399FF'; 
    } else if(pct >= 80 && pct <= 89){
      return '#3333FF'; 
    } else if(pct >= 90){
      return '#9933FF';
    } else {
      return 'black';
    }
  }

  public typeColor(type: any){
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

  public bgColor(type1: any, type2: any){
    if(type2 != null){
      return 'linear-gradient(45deg, ' + this.bgTypeColor(type1) + ', ' + this.bgTypeColor(type2) + ')';
    } else {
      return this.bgTypeColor(type1);
    }
  }
  
}
