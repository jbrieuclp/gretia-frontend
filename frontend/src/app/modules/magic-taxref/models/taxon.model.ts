import { Deserializable } from "../../../shared/models/deserializable.model";

import { Taxref2 } from './taxref2.model';
import { Taxref3 } from './taxref3.model';
import { Taxref4 } from './taxref4.model';
import { Taxref5 } from './taxref5.model';
import { Taxref6 } from './taxref6.model';
import { Taxref7 } from './taxref7.model';
import { Taxref8 } from './taxref8.model';
import { Taxref9 } from './taxref9.model';
import { Taxref10 } from './taxref10.model';
import { Taxref11 } from './taxref11.model';
import { Taxref12 } from './taxref12.model';
import { Taxref13 } from './taxref13.model';

export const LATEST_VERSION = '13';

export class Taxon {

	cdNom: number;
	nomComplet: Array<string>;
	taxref2: Taxref2;
	taxref3: Taxref3;
	taxref4: Taxref4;
	taxref5: Taxref5;
	taxref6: Taxref6;
	taxref7: Taxref7;
	taxref8: Taxref8;
	taxref9: Taxref9;
	taxref10: Taxref10;
	taxref11: Taxref11;
	taxref12: Taxref12;
	taxref13: Taxref13;

	deserialize(input: any) {
    Object.assign(this, input);

    if (input.taxref2 != null)
      this.taxref2 = new Taxref2().deserialize(input.taxref2);

    if (input.taxref3 != null)
      this.taxref3 = new Taxref3().deserialize(input.taxref3);

    if (input.taxref4 != null)
      this.taxref4 = new Taxref4().deserialize(input.taxref4);

    if (input.taxref5 != null)
      this.taxref5 = new Taxref5().deserialize(input.taxref5);

    if (input.taxref6 != null)
      this.taxref6 = new Taxref6().deserialize(input.taxref6);

    if (input.taxref7 != null)
      this.taxref7 = new Taxref7().deserialize(input.taxref7);

    if (input.taxref8 != null)
      this.taxref8 = new Taxref8().deserialize(input.taxref8);

    if (input.taxref9 != null)
      this.taxref9 = new Taxref9().deserialize(input.taxref9);

    if (input.taxref10 != null)
      this.taxref10 = new Taxref10().deserialize(input.taxref10);

    if (input.taxref11 != null)
      this.taxref11 = new Taxref11().deserialize(input.taxref11);

    if (input.taxref12 != null)
      this.taxref12 = new Taxref12().deserialize(input.taxref12);

   	if (input.taxref13 != null)
      this.taxref13 = new Taxref13().deserialize(input.taxref13);

    return this;
  }

	getTaxref(version: number){
		let v = 'taxref' + version;
		return this[v];
	}

	versionExist(version: number){
		let v = 'taxref' + version;
		return (this[v] != undefined);
	}

	get taxrefVersions() {
		let versions = new Array(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		return versions;
	}

	get cd_nom() {
		return this.cdNom;
	}

	get nom_complet() {
		return this.nomComplet;
	}

	get latest() {
		return this['taxref'+LATEST_VERSION];
	}
}