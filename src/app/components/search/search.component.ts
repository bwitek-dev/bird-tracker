import { Component, OnInit } from '@angular/core';
import { MapDataService } from '../../services/map-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  birdName!: string;
  constructor(private mapData: MapDataService) { }

  ngOnInit(): void {
  }

  submitBirdName(){
    this.mapData.getBirdData(this.birdName);
  }

}
