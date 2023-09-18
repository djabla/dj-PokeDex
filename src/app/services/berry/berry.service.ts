import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BerryService {

  constructor(
    private http: HttpClient,
  ) { }

  getBerryList(limit?: any, offset?: any){
    if(limit && offset){
      return this.http.get(`https://pokeapi.co/api/v2/berry?limit=${limit}&offset=${offset}`);
    }
    if(limit){
      return this.http.get(`https://pokeapi.co/api/v2/berry?limit=${limit}`);
    }
    return this.http.get('https://pokeapi.co/api/v2/berry/');
  }

  getBerryDetails(id: any){
    return this.http.get(`https://pokeapi.co/api/v2/berry/${id}`);
  }

  getBerryDesc(url: any){
    return this.http.get(url);
  }
}
