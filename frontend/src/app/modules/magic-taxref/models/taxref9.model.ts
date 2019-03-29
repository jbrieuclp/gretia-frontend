import { Deserializable } from "../../../shared/models/deserializable.model";export class Taxref9 {
  
  
  cdNom: string;  
  nomComplet: string;  
  nomCompletHtml: string;  
  regne: string;  
  phylum: string;  
  classe: string;  
  ordre: string;  
  famille: string;  
  group1Inpn: string;  
  group2Inpn: string;  
  lbNom: string;  
  lbAuteur: string;  
  cdRef: string;  
  nomValide: string;  
  cdTaxsup: string;  
  cdSup: string;  
  rang: string;  
  nomVern: string;  
  nomVernEng: string;  
  habitat: string;  
  fr: string;  
  mar: string;  
  gua: string;  
  sm: string;  
  sb: string;  
  gf: string;  
  spm: string;  
  reu: string;  
  may: string;  
  epa: string;  
  taaf: string;  
  nc: string;  
  wf: string;  
  pf: string;  
  cli: string;  
  url: string;
	
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}