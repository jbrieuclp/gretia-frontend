import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Taxon } from '../models/taxon.model';

@Injectable()
export class VersioningService {

	// constructeur ...
	constructor(private http: HttpClient) { }


	/*getTaxon(id_nomenclature: number, regne?: string, group2_inpn?: string) {
    let params: HttpParams = new HttpParams();
    regne ? params = params.set('regne', regne) : params = params.set('regne', '');
    group2_inpn ? params = params.set('group2_inpn', group2_inpn) : params = params.set('group2_inpn', '');
    return this._http.get<any>(`${AppConfig.API_ENDPOINT}/nomenclatures/nomenclature/${id_nomenclature}`, {params: params});
    }*/

  getTaxon(cd_nom:number) {
    let params: HttpParams = new HttpParams();
    return this.http.get(`http://taxref-match.loc/app_dev.php/api/${cd_nom}`, {params: params});
  }

  getTaxonFromTaxrefV(version:number, cd_nom:number) {
    let params: HttpParams = new HttpParams();
    return this.http.get<Taxon>(`http://taxref-match.loc/app_dev.php/api/taxref${version}/${cd_nom}`, {params: params});
  }
    
// Après (avec les Promesses)
/*getTaxons(cd_nom:number): Promise<Taxon> {
  const url = 'http://taxref-match.loc/app_dev.php/api/' + cd_nom;
  return this.http.get<Taxon>(url)
             .toPromise()
             .then(response => response.json() as Taxon)
             .catch(this.handleError);
}*/

}