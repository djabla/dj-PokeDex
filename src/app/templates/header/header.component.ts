import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { Router } from '@angular/router';

export interface Pokemon {
  img: string;
  name: string;
  id: any;
}

@Component({
  selector: 'pokedex-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  pokemonCtrl = new FormControl('');
  filteredPokemon: Observable<Pokemon[]>;
  pokemons: Pokemon[] = [];

  public constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
  ) {
    this.getList(50);
    this.filteredPokemon = this.pokemonCtrl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      startWith(''),
      map(pokemon => (pokemon ? this._filterPokemons(pokemon) : [])),
    );
  }

  ngOnInit(): void {
    
  }

  private _filterPokemons(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();

    return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filterValue));
  }

  private getList(limit?: any, offset?: any){
    this.pokemonDataService.getList(limit, offset).subscribe((raw: any) => {
      raw.results.forEach((item: any) => {
        this.pokemonDataService.getDetails(item.name).subscribe((detail: any) => {
          this.pokemons.push({
            img: detail.sprites.front_default,
            name: detail.name,
            id: detail.id
          })
        })
      })
    })
  }

  goToDetails(name: any){
    this.router.navigateByUrl(`search/pokemon/${name}`);
    this.pokemonCtrl.reset();
  }

  capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
  }

  convertToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
  }

}
