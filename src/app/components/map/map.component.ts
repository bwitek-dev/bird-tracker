import { Component, OnInit, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';

import { MapDataService } from '../../services/map-data/map-data.service';
import { BirdLocation } from '../../data/BirdLocation';
import { BirdPopupComponent } from '../bird-popup/bird-popup.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markerIcon!: L.Icon;
  private birdLocationsLayer = new L.LayerGroup();
  birds:BirdLocation[] = [];

  constructor(private mapData:MapDataService, private resolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

  ngOnInit(): void {
    //init map
    this.map = L.map('map').locate({ setView: true, maxZoom: 7, });
    this.birdLocationsLayer.addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    //init marker icon
    this.markerIcon = L.icon({
      iconUrl: 'assets/bird-marker.svg',
      iconSize: [40, 40], // size of the icon
      iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
      popupAnchor: [-12, -38] // point from which the popup should open relative to the iconAnchor
    });

    //subscribe to bird data
    this.mapData.data.subscribe(mapData => {
      this.birds = mapData;
      this.populateMap();
    });
  }

  populateMap(): void{
    this.clearMapMarkers();

    this.birds.forEach(bird=>L.marker([bird.lat, bird.lng], {icon: this.markerIcon}).addTo(this.birdLocationsLayer).bindPopup(
      this.compilePopup(BirdPopupComponent, 
        (c: any) => {c.instance.birdSpot = bird})
      ));
  }

  private compilePopup(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
    
    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }
  clearMapMarkers(): void{
    this.birdLocationsLayer.clearLayers();
  }





}
