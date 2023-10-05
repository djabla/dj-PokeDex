import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  constructor(
    private http: HttpClient,
  ) { }

  getList(limit?: any, offset?: any){
    if(limit && offset){
      return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    }
    if(limit){
      return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    }
    return this.http.get('https://pokeapi.co/api/v2/pokemon/');
  }

  getDetails(name: any){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getDesc(url: any){
    return this.http.get(url);
  }

  getEvolutionChain(url: any){
    return this.http.get(url);
  }
}
