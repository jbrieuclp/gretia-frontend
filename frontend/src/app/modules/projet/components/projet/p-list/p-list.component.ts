import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PageEvent, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { Projet, ProjetRepository } from '../../../repository/projet.repository';
import { Mission, MissionRepository } from '../../../repository/mission.repository';

export class MetadataPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Page suivante';
    this.previousPageLabel = 'Page précédente';
    this.itemsPerPageLabel = 'Éléments par page';
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 sur ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }
}

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.css'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MetadataPaginator
    }
  ]
})
export class PListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
	projets: Projet[] = [];
  tempProjets: Projet[] = [];
  missions: Mission[] = [];
  expandAccordions = false;
  private researchTerm: string = '';

  pageSize: number = 10;
  activePage: number = 0;
  pageSizeOptions: Array<number> = [10, 25, 50, 100];

  constructor(
    private projetR: ProjetRepository,
    private missionR: MissionRepository) { }

  ngOnInit() {
  	this.getProjets();
  }

  //recuperation des projets
  getProjets() {
    this.projetR.projets().subscribe(data => {
      this.projets = data;
      this.tempProjets = this.projets;
      this.getMissions();
    });
  }

  //recuperation des missions
  getMissions() {
    this.missionR.missions().subscribe(results => {
      //attribut les jdds au ca respectif
      for (var i = 0; i < results.length; i++) {
        let projet = this.findProjetById(results[i].projet.id);
        if (typeof projet['missions'] === 'undefined') {
          projet['missions'] = new Array();
          projet['missionsTemp'] = new Array();
        }
        projet['missions'].push(results[i]);
        projet['missionsTemp'].push(results[i]);
      }
      // cache our list
      this.missions = results;
    });
  }

  /**
   *  Retourne le cadre d'acquisition à partir de son ID
   **/
  private findProjetById(id: number) {
    return this.projets.find(projet => projet.id == id);
  }

  /**
   *  Filtre les éléments CA et JDD selon la valeur de la barre de recherche
   **/
  updateSearchbar(event) {
    this.researchTerm = event.target.value.toLowerCase();

    //recherche des cadres d'acquisition qui matchent
    this.tempProjets = this.projets.filter(projet => {
      //si vide => affiche tout et ferme le panel
      if (this.researchTerm === '') {
        // 'dé-expand' les accodions pour prendre moins de place
        this.expandAccordions = false;
        projet['missionsTemp'] = projet['missions'];
        return true;
      } else {
        // expand tout les accordion recherchés pour voir le JDD des CA
        this.expandAccordions = true;
        if (projet.libelle.toLowerCase().indexOf(this.researchTerm) !== -1) {
          //si un cadre matche on affiche tout ses JDD
          projet['missionsTemp'] = projet['missions'];
          return true;
        }

        //Sinon on on filtre les JDD qui matchent eventuellement.
        if (projet['missions']) {
          projet['missionsTemp'] = projet['missions'].filter(
            mission => mission.libelle.toLowerCase().indexOf(this.researchTerm) !== -1
          );
          return projet['missionsTemp'].length;
        }
        return false;
      }
    });
    //retour à la premiere page du tableau pour voir les résultats
    this.paginator.pageIndex = 0;
    this.activePage = 0;
  }

  isDisplayed(idx: number) {
    //numero du CA à partir de 1
    let element = idx + 1;
    //calcule des tranches active à afficher
    let idxMin = this.pageSize * this.activePage;
    let idxMax = this.pageSize * (this.activePage + 1);

    return idxMin < element && element <= idxMax;
  }

  changePaginator(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.activePage = event.pageIndex;
  }

}
