import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public pokeList: any[] = [];
  private readonly limit = 20;
  public isError: boolean = false;

  public constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.getPokemonList();
  }

  getPokemonList(){
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

  goToDetails(name: any){
    this.router.navigate([`/pages/details/${name}`]);
  }

  capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

}
