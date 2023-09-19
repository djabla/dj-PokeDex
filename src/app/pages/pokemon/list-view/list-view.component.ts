import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon/pokemon-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public pokeList: any[] = [];
  private readonly limit = 50;
  public isError: boolean = false;
  public selectedItem: any;

  public constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getPokemonList();
  }

  private getPokemonList(){
    this.pokemonDataService.getList(this.limit).subscribe((raw: any) => {
      raw.results.forEach((item: any) => {
        this.pokemonDataService.getDetails(item.name).subscribe((detail: any) => {
          this.pokemonDataService.getDesc(item.name).subscribe((desc: any) => {
            this.pokeList.push({
              detail,
              description: desc
            })
          })
        })
      })
    });
    console.log(this.pokeList);
  }

  public goToDetails(name: any){
    this.router.navigate([`pages/pokemon/${name}`]);
  }

  public filterBy(){

  }

  public capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

  convertToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
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

  public bgColor(type: any){
    if(type.length == 1){
      let color = this.bgTypeColor(type[0].type.name);
      return color;
    } else if(type.length == 2) {
      return 'linear-gradient(to right, ' + this.bgTypeColor(type[0].type.name) + ', ' + this.bgTypeColor(type[1].type.name) + ')';
    } else {
      return 'black';
    }
  }

}
