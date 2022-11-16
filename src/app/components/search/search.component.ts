import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data/map-data.service';
import { CountriesService } from 'src/app/services/countries/countries.service';

import { TaxonomyService } from 'src/app/services/taxonomy/taxonomy.service';
import { BirdInfo } from 'src/app/data/BirdInfo';
import { Country } from 'src/app/data/Country';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  birdName: string = '';

  birdsTaxonomy: BirdInfo[] = [];
  filteredTaxonomy: BirdInfo[] = [];

  countryCode: string = '';
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  constructor(private mapData: MapDataService, private taxonomyService: TaxonomyService, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.taxonomyService.getTaxonomy().subscribe(taxonomy => {
      this.birdsTaxonomy = taxonomy;
    });
  }

  private isLongEnough(testCondition: string, minLength: number): boolean{
    return testCondition.length >= minLength;
  }

  filterTaxonomy(): void{
    const lowerCaseBirdName = this.birdName.toLowerCase();

    if(this.isLongEnough(this.birdName, 3)){
      this.filteredTaxonomy = this.birdsTaxonomy.filter(birdTaxon =>
        birdTaxon.speciesCode.toLowerCase().includes(lowerCaseBirdName)
         || birdTaxon.comName.toLowerCase().includes(lowerCaseBirdName)
         || birdTaxon.sciName.toLowerCase().includes(lowerCaseBirdName));
    }
  }

  filterCountries(): void{
    const lowerCaseCountry = this.countryCode.toLowerCase();

    this.filteredCountries = this.countries.filter(country =>
      country.en.toLowerCase().includes(lowerCaseCountry)
        || country.pol.toLowerCase().includes(lowerCaseCountry)
        || country.cca2.toLowerCase().includes(lowerCaseCountry)
      );
  }

  submitSearch(): void{
    this.mapData.getBirdLocationData(this.birdName, this.countryCode);
  }

}
