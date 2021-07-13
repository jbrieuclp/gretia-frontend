import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, map, startWith, tap, mergeMap, distinctUntilChanged, pairwise } from 'rxjs/operators';

import { TaskRepository, Task } from '../../repository/task.repository';
import { Projet } from '../../repository/projet.repository';

@Component({
  selector: 'app-projet-task-control',
  templateUrl: './task-control.component.html',
  styleUrls: ['./task-control.component.scss']
})
export class TaskControlComponent implements OnInit {

	@Input() form: FormControl = new FormControl();
  @Input() required: boolean = false;
  $tasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  filteredOptions: Observable<Projet[]>;
  loading: boolean = false;
  label: string = 'Projet';
  /* FormControl de l'element input de recherche
   * Il est utilisé pour tester la valeur cherchée et selectionnée et ne pas renvoyer dans form la valeur saisie
   **/
  inputTerm: FormControl = new FormControl(null);

  get tasks(): Task[] {
  	return this.$tasks.getValue();
  }

  constructor(
  	private taskR: TaskRepository
  ) { }

  ngOnInit() {  

  	this.loading = true;
  	this.taskR.tasks_me()
  		.pipe(
        map((data: any): Task[]=>data["hydra:member"]),
        tap(() => this.loading = false)
      )
  		.subscribe((tasks: Task[]) => this.$tasks.next(tasks));
	  
  	//Gère la selection de la valeur quand on est en mode edition
	  this.$tasks.asObservable()
	  	.pipe(
	  		distinctUntilChanged(),
	  		filter((task: Task[]) => task.length > 0),
	  		tap((task: Task[]) => this.$tasks.next(task))
	  	)
	  	.subscribe((loc: Task[]) => {
	  		if (this.form.value !== null && this.form.value['@id'] !== undefined) {
		      this.form.setValue(this.form.value['@id']);
		    }
	  	})

  	// selectionne automatiquement la valeur de la liste si elle correspond à une valeur existante
  	combineLatest(
  		this.inputTerm.valueChanges
	  		.pipe(
	  			startWith('')
	  		), 
	  	this.$tasks.asObservable()
	  )
  	.pipe(
  		map(([value, tasks])=> {
				const idx = tasks.findIndex(task => this._removeAccent(task.intitule) === this._removeAccent(value) ||
                                              task['@id'] === value);
				return idx > -1 ? tasks[idx] : null;
			}),
      tap((task: Task) => this.label = task ? task.projet.intitule : 'Projet'),
      map((task: Task) => task ? task['@id'] : null)
  	)
  	.subscribe(val=>this.form.setValue(val));
	  

  	//Gestion du filtre sur la liste de l'autocomplete
  	this.filteredOptions = combineLatest(
	  		this.inputTerm.valueChanges
	  			.pipe(
	  				startWith(''), 
	  				filter(value=>!Number.isInteger(value) && value !== null)
	  			), 
	  		this.$tasks.asObservable()
	  	)
      .pipe(
        map(([term, tasks]: [string, Task[]]) => this._filter(term)),
        map((tasks: Task[]): Projet[] => this.transformToProjects(tasks)),
      );

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        pairwise(),
        filter(([prev, next]: [any, any]) => prev !== null && next === null),
      )
      .subscribe(([value, tasks])=> this.inputTerm.reset(''));

  }

  private transformToProjects(tasks: Task[]): Projet[] {
    const projets: Projet[] = [];
    tasks.forEach((task) => {
      const projet_idx = projets.findIndex(projet => projet.id === task.projet.id);
      if (projet_idx === -1) {
        const projet = task.projet;
        projet['tasks'] = [task];
        projets.push(projet);
      } else {
        projets[projet_idx]['tasks'].push(task);
      }
    });
    return projets;
  }

  private _filter(value: string): Task[] {
    const filterValue = this._removeAccent(value);

    return this.tasks.filter(task => this._removeAccent(task.intitule).includes(this._removeAccent(value)) || 
                                      this._removeAccent(task.projet.intitule).includes(this._removeAccent(value)) || 
                                        this._removeAccent(task.projet.code).includes(this._removeAccent(value)));
  }

  private _removeAccent(value): string {
  	return ((value.toLowerCase()).trim()).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  displayFn(id) {
  	if (id) {
  		const idx = this.tasks.find(task => task['@id'] === id);
  		return idx !== undefined ? idx.intitule : '';
  	}
	}

}