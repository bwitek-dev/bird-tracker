import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { BirdLocation } from '../../data/BirdLocation';


@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  private dataSource = new BehaviorSubject<BirdLocation[]>([]);
  data = this.dataSource.asObservable();

  private sppLocale: string = $localize `en`;

  constructor(private httpClient: HttpClient) { }

  getBirdLocationData(speciesCode: string, countryCode: string){
    const httpOptions = {
      headers: new HttpHeaders({ 'x-ebirdapitoken': environment.apiKey })
    };

    this.httpClient.get<BirdLocation[]>(`${environment.apiBirdLocations}/${countryCode.toUpperCase()}/recent/${speciesCode}?sppLocale=${this.sppLocale}`, httpOptions)
        .subscribe(birdLocation=> {
          this.dataSource.next(birdLocation);
        });
  }
}
