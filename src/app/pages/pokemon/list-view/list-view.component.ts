import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon/pokemon-data.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectViewComponent } from '../select-view/select-view.component';
import { forkJoin } from 'rxjs';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface Pokemon {
  id: any;
  name: string;
  type1: any;
  type2?: any;
  image: string;
  detail: any;
}

@Component({
  selector: 'pokedex-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  providers: [DialogService]
})
export class ListViewComponent implements OnInit {

  formGroup!: FormGroup;
  filteredPokemon!: any[];

  public pokeList: Pokemon[] = [];
  public searchList: Pokemon[] = [];
  private listHolder: Pokemon[] = [];
  private readonly limit = 50;
  private offset = 50;
  public isError: boolean = false;
  dialogVisible: boolean = false;
  public pokemonDetails: any;
  ref: DynamicDialogRef | undefined;

  public pokemonTypes: string[] = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  selectedType: any = undefined;

  public constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
    public dialogService: DialogService,
  ) { }
  ngOnInit(): void {
    this.getPokemonList();
    this.listHolder = this.pokeList;
    this.getSearchList();
    this.formGroup = new FormGroup({
      selectedPokemon: new FormControl<object | null>(null)
    });
  }

  filterPokemon(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.searchList as any[]).length; i++) {
        let pokemon = (this.searchList as any[])[i];
        if (pokemon.name.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(pokemon);
        }
    }

    this.filteredPokemon = filtered;
  }

  private getPokemonList(){
    this.pokemonDataService.getList(this.limit).subscribe((raw: any) => {
      raw.results.forEach((item: any) => {
        this.pokemonDataService.getDetails(item.name).subscribe((detail: any) => {
          this.pokeList.push({
            id: detail.id,
            name: detail.name,
            type1: detail.types[0].type.name,
            type2: detail.types[1] ? detail.types[1].type.name : null,
            image: detail.sprites.front_default,
            detail: detail,
          })
        })
      })
    });
    console.log(this.pokeList);
  }

  private getSearchList() {
    const batchSize = 100;
    const totalPokemon = 1300;
  
    for (let offset = 0; offset < totalPokemon; offset += batchSize) {
      this.pokemonDataService.getList(batchSize, offset).subscribe((raw: any) => {
        const requests = raw.results.map((item: any) => {
          return this.pokemonDataService.getDetails(item.name);
        });
  
        forkJoin(requests).subscribe((details: any) => {
          details.forEach((detail: any) => {
            this.searchList.push({
              id: detail.id,
              name: detail.name,
              type1: detail.types[0].type.name,
              type2: detail.types[1] ? detail.types[1].type.name : null,
              image: detail.sprites.front_default,
              detail: detail,
            });
          });
        });
      });
    }
  }

  openDetails(detail: any){
    this.ref = this.dialogService.open(SelectViewComponent, {
      width: '70vw',
      height: '95vh',
      maximizable: true,
      closeOnEscape: true,
      header: this.capitalizeFirstLetter(detail.name),
      data: {
        detail: detail.detail,
        name: detail.name,
        type1: detail.type1,
        type2: detail.type2,
        id: detail.id,
      }
    })
  }

  public goToDetails(name: any){
    this.router.navigate([`pages/pokemon/${name}`]);
  }

  public filterByType(){
    if(this.selectedType != undefined){
      let filter = this.selectedType.toLowerCase();
      let temp: Pokemon[] = [];
      this.listHolder.forEach((item: any) => {
        if(item.type1 == filter || item.type2 == filter){
          temp.push(item);
        }
      })
      this.pokeList = temp;
    }else{
      this.pokeList = this.listHolder;
    }
  }

  public resetFilter(){
    this.selectedType = undefined;
    this.filterByType();
  }

  public onScroll(event: any){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("Load more");
      this.getMorePokemon();
    }
  }

  private getMorePokemon(){
    this.pokemonDataService.getList(this.limit, this.offset).subscribe((raw: any) => {
      raw.results.forEach((item: any) => {
        this.pokemonDataService.getDetails(item.name).subscribe((detail: any) => {
          this.listHolder.push({
            id: detail.id,
            name: detail.name,
            type1: detail.types[0].type.name,
            type2: detail.types[1] ? detail.types[1].type.name : null,
            image: detail.sprites.front_default,
            detail: detail,
          })
        })
      })
    });
    this.filterByType();
    console.log(this.pokeList);
    this.offset += this.limit;
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

  public bgColor(type1: any, type2: any){
    if(type2 != null){
      return 'linear-gradient(45deg, ' + this.bgTypeColor(type1) + ', ' + this.bgTypeColor(type2) + ')';
    } else {
      return this.bgTypeColor(type1);
    }
  }

}
