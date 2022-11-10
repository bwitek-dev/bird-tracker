import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Bird } from '../Data/Bird';


@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  private dataSource = new BehaviorSubject<Bird[]>([]);
  data = this.dataSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getBirdData(birdName:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'x-ebirdapitoken': environment.apiKey })
    };

    this.httpClient.get<Bird[]>(`${environment.apiBirdLocations}/US/recent/${birdName}`, httpOptions)
        .subscribe(birdResult => {
          this.dataSource.next(birdResult);
        });
  }
}
