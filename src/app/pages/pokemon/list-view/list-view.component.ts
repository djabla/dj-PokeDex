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

  public capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

  public typeColor(type: any){
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
