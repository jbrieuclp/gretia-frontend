import { Deserializable } from "../../../shared/models/deserializable.model";export class Taxref2 {

	
	cdNom: number;	
	nomComplet: string;	
	regne: string;	
	phylum: string;	
	classe: string;	
	ordre: string;	
	famille: string;	
	lbNom: string;	
	lbAuteur: string;	
	cdRef: number;	
	nomValide: string;	
	rang: string;	
	nomVern: string;	
	nomVernEng: string;	
	fr: string;	
	mar: string;	
	gua: string;	
	smsb: string;	
	gf: string;	
	spm: string;	
	reu: string;	
	may: string;	
	taaf: string;
	
	deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}