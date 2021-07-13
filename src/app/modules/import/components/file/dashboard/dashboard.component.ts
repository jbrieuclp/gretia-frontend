import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-import-file-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FileService]
})
export class FileDashboardComponent implements OnInit {

	fichier: any;

  constructor( private fileS: FileService ) { }

  ngOnInit() {
    this.fileS.file.subscribe(fichier => this.fichier = fichier);
  }

}
