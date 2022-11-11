import { Component, OnInit } from '@angular/core';

import { MapDataService } from '../../services/map-data.service';
import { BirdLocation } from '../../data/BirdLocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  birds!:BirdLocation[];

  constructor(private mapData:MapDataService) { }

  ngOnInit(): void {
    //init map
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

  //subscribe to bird data
  this.mapData.data.subscribe(mapData => {
    this.birds = mapData;
    this.populateMap();
  });
  }

  populateMap(){
    this.birds.forEach(bird=>L.marker([bird.lat, bird.lng]).addTo(this.map).bindPopup(bird.comName+' '+bird.howMany+' '+bird.locName));
  }





}
