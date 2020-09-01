import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, combineLatest  } from 'rxjs';
import { filter, tap, switchMap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TRAVAIL_OPTIONS, Travail, SuiveuseRepository } from '../../../repository/suiveuse.repository';
import { SuiveuseService } from '../suiveuse.service';
import { Personne } from '../../../repository/person.repository';
import { TravailFormDialog } from './travail-form.dialog';

const today = new Date();

@Component({
  selector: 'app-projet-suiv-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit  {

  _month: BehaviorSubject<Date> = new BehaviorSubject(new Date());
  get month() {
    return this._month;
  }
  get monthValue(): Date {
    return this._month.getValue();
  }
  @Input() set month(value: any) {
    this._month.next(value);
  }
  dates: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  months: Array<string> = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  user: BehaviorSubject<Personne>;
  worksOfTheDay: {day: Date, works: any[], totalTime: number} = null;
  travauxSynthese = [];

  selectedDate: BehaviorSubject<Date> = new BehaviorSubject(null);

  constructor(
    public dialog: MatDialog,
    private suiveuseS: SuiveuseService,
    private suiveuseR: SuiveuseRepository
  ) {}
  
  ngOnInit() {
    this._month.subscribe(date=>this.initMonths());

    this.user = this.suiveuseS.user;
    //Récupéraion des travaux de l'user sur les jours du mois affiché
    combineLatest(this.user.asObservable(), this.dates.asObservable(), this.dialog.afterAllClosed)
      .pipe(
        filter(([user, dates])=>user !== null),
        //map return [user, premiere_date, derniere_date]
        map(([user, dates])=>[user, dates[0].days[0], dates[dates.length-1].days[dates[dates.length-1].days.length-1]]),
        switchMap(([user, firstDate, lastDate]) => { 
          return this.suiveuseR
                    .getSynthese(user.id, {startAt: moment(firstDate).format('YYYY-MM-DD'), endAt: moment(lastDate).format('YYYY-MM-DD')})
        }),
      )
      .subscribe((synthese)=> this.travauxSynthese = synthese);

    //Observable sur la date selectionnée permettant de recupérer les travaux réalisés à cette date.
    combineLatest(this.selectedDate.asObservable(), this.dialog.afterAllClosed)
      .pipe(
        tap(([date]) => {this.worksOfTheDay = null}),
        filter(()=>this.user.getValue() !== null),
        filter(([date])=>date !== null),
        switchMap(
          ([date]) => this.suiveuseR.getTravaux(this.user.getValue().id, {startAt: moment(date).format('YYYY-MM-DD'), endAt: moment(date).format('YYYY-MM-DD')})
        ),
        map(works=>{
          let totalTime = 0;
          let day = null;
          works.forEach(e=>{
            if ( day === null ) { day = new Date(e.date) }
            totalTime += e.duree;
          });
          return {day: day, works: works, totalTime: totalTime};
        })
      )
      .subscribe(worksOfTheDay=>this.worksOfTheDay = worksOfTheDay);
  }

  get today() {
    return today;
  }

  setToday() {
    let date = new Date();
    this.month = date;
  }

  previous() {
    let date = new Date(this.month.getValue());
    date.setMonth(this.month.getValue().getMonth() - 1);
    this.month = date;
  }

  next() {
    let date = new Date(this.month.getValue());
    date.setMonth(this.month.getValue().getMonth() + 1);
    this.month = date;
  }

  getWorkingTimeByDate(date) {
    let travail = this.travauxSynthese.find(e=>e.date === moment(date).format('YYYY-MM-DD'));
    return travail !== undefined ? this.displayTime(travail.duree) : "-";
  }

  displayTime(time) {
    return time !== undefined ? Math.trunc(time/60) + "h" + (time%60 !== 0 ? time%60 :'') : "-";
  }

  openTravailDialog(id_travail = null): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 
      {
        id_travail: id_travail,
        date: this.selectedDate.getValue()
      };

    const dialogRef = this.dialog.open(TravailFormDialog, dialogConfig);
  }

  private initMonths(): void {
    let dates: {weekNumber: number, days: Date[]}[] = [];
    let weeksOfMonth = [];

    //pour m = 3 pour les 3 mois entourant la date : mois précédent m=0, présent m=1, suivant m=2
    for ( let m = 0; m < 3 ; m++) {
      //pour chaque jour du mois
      for (let j = 0; j < new Date(this.monthValue.getFullYear(), this.monthValue.getMonth() + m, 0).getDate(); j++) {
        let day = new Date(this.monthValue.getFullYear(), this.monthValue.getMonth() + (m - 1), j+1)
        if ( dates.find(date=>date.weekNumber === this.getWeekNumber(day)) === undefined ){
          dates.push({weekNumber: this.getWeekNumber(day), days: []});
        }

        let week = dates.find(date=>date.weekNumber === this.getWeekNumber(day));
        //si on est sur le mois en cours, on conserve les numeros de semaines concernées, pour filtrer les données par la suite
        if (m === 1 && weeksOfMonth.indexOf(this.getWeekNumber(day)) === -1) {
          weeksOfMonth.push(this.getWeekNumber(day));
        }
        week.days.push(day);
      }
    }
    dates.forEach((week, idx)=>{
      if (weeksOfMonth.indexOf(week.weekNumber) === -1) {
        delete dates[idx];
      }
    })
    //suppression des valeurs empty du tableau
    this.dates.next(dates.filter(e=>e != null));
  }

  private getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    let weekNo = Math.ceil(( ( (d - +(yearStart)) / 86400000) + 1)/7);
    return weekNo;
  }

}
