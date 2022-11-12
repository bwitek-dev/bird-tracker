import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BirdInfo } from '../../data/BirdInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {

  constructor(private httpClient: HttpClient) { }

  getTaxonomy(): Observable<BirdInfo[]>{
    const httpOptions = {
      headers: new HttpHeaders({ 'x-ebirdapitoken': environment.apiKey })
    };

    return this.httpClient.get<BirdInfo[]>(`${environment.apiBirdTaxonomy}`, httpOptions);
  }
}
