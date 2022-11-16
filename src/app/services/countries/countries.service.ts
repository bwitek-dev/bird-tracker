import { environment } from 'src/environments/environment';
import { Country } from 'src/app/data/Country';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: Subject<Country[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private getCountriesFromApi(){
    return this.httpClient.get(environment.apiAllCountries);
  }
  private filterData(countries: any){
    let filteredCountries: Country[] = [];
    for(let country of countries){
      filteredCountries.push(new Country(country.name.common, country.translations.pol.common, country.cca2, country.latlng));
    }
    //return sorted alphabetically
    return filteredCountries.sort((country1, country2) => country1.en.localeCompare(country2.en));
  }
  getCountries(): Observable<Country[]>{
    this.getCountriesFromApi().subscribe(result => {
      this.countries.next(this.filterData(result));
    });
    return this.countries.asObservable();
  }
}
