import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { BirdLocation } from '../data/BirdLocation';


@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  private dataSource = new BehaviorSubject<BirdLocation[]>([]);
  data = this.dataSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getBirdLocationData(speciesCode:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'x-ebirdapitoken': environment.apiKey })
    };

    this.httpClient.get<BirdLocation[]>(`${environment.apiBirdLocations}/PL/recent/${speciesCode}`, httpOptions)
        .subscribe(birdLocation=> {
          this.dataSource.next(birdLocation);
        });
  }
}
