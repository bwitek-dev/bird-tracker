import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  birdName: string = '';
  // test data
  birdsTaxonomy = ["One", "Oli", "Decimetr", "metr", "metronom"];
  filteredTaxonomy!:string[];

  constructor(private mapData: MapDataService) { }

  ngOnInit(): void {
    this.filterTaxonomy();
  }

  filterTaxonomy(){
    const lowerCaseBirdName = this.birdName.toLowerCase();
    this.filteredTaxonomy = this.birdsTaxonomy.filter(name => name.toLowerCase().includes(lowerCaseBirdName));
  }

  submitBirdName(){
    this.mapData.getBirdData(this.birdName);
  }

}
