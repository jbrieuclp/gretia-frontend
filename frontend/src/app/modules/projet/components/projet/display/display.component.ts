import { Component, OnInit } from '@angular/core';
import { combineLatest , Observable } from 'rxjs';
import { tap, startWith, map } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router';
import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { Mission, MissionRepository } from '../../../repository/mission.repository';

@Component({
  selector: 'app-projet-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class ProjetDisplayComponent implements OnInit {

	projet: Projet;
	missions: Mission[];
	travailleurs: Array<any> = [];

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private projetR: ProjetRepository,
    private missionR: MissionRepository
  ) { }

  ngOnInit() {
  	let id_projet = this.route.snapshot.paramMap.get('projet');
    if ( id_projet !== null && Number.isInteger(Number(id_projet)) ) {
    	this.projetR.getProjet(Number(id_projet))
        .subscribe(
          (projet: Projet) => {
            this.projet = projet;
            this.setSyntheseTravailleurs();
          },
          error => { /*this.errors = error.error;*/ }
        );
    }
  }

  filterMissionsByPerson(person) {
  	return this.projet.missions.filter(mission=>mission.travails.filter(travail=>travail.personne.id = person.id).length);
  }

  setSyntheseTravailleurs(): void {
  	/*travailleur = {
		  	personne:
		  	tempsProjet:
		  	tempsPasseProjet:
		  	missions: [
		  		{
		  			mission:
		  			tempsMission:
		  			tempsPasseMission:
		  	]
		  }*/
  	let travailleurs = []

  	for (let i = 0; i < this.projet.travailleurs.length; i++) {
  		let travailleur = {
  			personne: this.projet.travailleurs[i].personne,
		  	tempsProjet: this.projet.travailleurs[i].temps,
		  	tempsPasseProjet: 0,
		  	missions: []
		  };

		  travailleurs.push(travailleur);
  		// travailleur.missions = this.projet.missions.filter(mission=>mission.travails.filter(travail=>travail.personne.id = person.id).length);
  		// this.projet.travailleurs[i]
  	}

  	this.projet.missions.forEach((mission)=>{
  		//on créé les différents travailleurs du projet (projet + missions)
			mission.travailleurs.forEach((e)=>{
				//recherche d'un travailleur existant
				let travailleur = travailleurs.find(travailleur => travailleur.personne.id == e.personne.id)
				if (travailleur === undefined) { //si non trouvé il est ajouté à la liste
					travailleur = {
		  			personne: e.personne,
				  	tempsProjet: 0,
				  	tempsPasseProjet: 0,
				  	missions: []
				  }
				  travailleurs.push(travailleur);
				}

				//Ajout de la mission dans le liste des missions du travailleur
				let missionT = {
					mission: {id: mission.id, libelle: mission.libelle},
	  			tempsMission: mission.nbJour,
	  			tempsPasseMission: 0
				};
				travailleur.missions.push(missionT);
			})

  		mission.travails.forEach((travail)=>{
  			//On check si la personne ayant travaillé est déjà indiqué comme travailleur, sinon on l'ajoute
				let travailleur = travailleurs.find(travailleur => travailleur.personne.id == travail.personne.id)
				if (travailleur === undefined) {
					travailleur = {
		  			personne: travail.personne,
				  	tempsProjet: 0,
				  	tempsPasseProjet: 0,
				  	missions: []
				  }

				  travailleurs.push(travailleur);
				}

				//on cherche la mission dans la liste des missions du travailleur, si inexistante elle est crée
				let missionT = travailleur.missions.find(mt => mt.mission.id == mission.id);
				if (missionT === undefined) {
					missionT = {
						mission: {id: mission.id, libelle: mission.libelle},
		  			tempsMission: 0,
		  			tempsPasseMission: 0
					};
					travailleur.missions.push(missionT);
				}

				//incémentation du temps travaillé pour la mission par le travailleur
				missionT.tempsPasseMission = missionT.tempsPasseMission + travail.duree; //(en minutes)
				travailleur.tempsPasseProjet = travailleur.tempsPasseProjet + (travail.duree / 60 / 7); //(en jours)
			});
  	});

  	this.travailleurs = travailleurs;
  }

}
