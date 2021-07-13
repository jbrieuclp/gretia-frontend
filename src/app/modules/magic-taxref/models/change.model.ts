import { Deserializable } from "../../../shared/models/deserializable.model";

export class Change {

	cd_nom: number;
	num_version_init: string;
	num_version_final: string;
	champ: string;
	valeur_init: string;
	valeur_final: string;
	type_change: string;

	deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}