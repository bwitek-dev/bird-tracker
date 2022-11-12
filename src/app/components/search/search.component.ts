import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data/map-data.service';

import { TaxonomyService } from 'src/app/services/taxonomy/taxonomy.service';
import { BirdInfo } from 'src/app/data/BirdInfo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  birdName: string = '';

  birdsTaxonomy: BirdInfo[] = [];
  filteredTaxonomy: BirdInfo[] = [];

  constructor(private mapData: MapDataService, private taxonomyService: TaxonomyService) { }

  ngOnInit(): void {
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

  submitBirdName(): void{
    this.mapData.getBirdLocationData(this.birdName);
  }

}
