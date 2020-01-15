// authentication/authentication.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../auth/authentication.service';


@Component({
  selector: 'layout-signin-dialog',
  templateUrl: './sign-in.dialog.html',
  styleUrls: ['./sign-in.dialog.scss']
})
export class SignInDialog implements OnInit {

	loginForm: FormGroup;
  error: any = '';
  returnUrl: string;
  waiting: boolean = false;

  constructor(
  	private formBuilder: FormBuilder,
  	private authenticationService: AuthService,
  	private router: Router,
  	private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        'username': ['', Validators.required],
        'password': ['', Validators.required]
    });
    this.authenticationService.isAuthenticated();

    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.waiting = true  ;
    this.authenticationService
		      .login(this.loginForm.value)
		      .pipe(
		        map(result => {
		          this.waiting = false;
		          return result;
		        })
		      ).subscribe(
		        data => {
		          this._snackBar.open('Vous êtes reconnecté', 'Fermer', {
					      duration: 4000,
					      verticalPosition: 'top'
					    });
					    this.onNoClick();
		        },
		        error => {
		        	let msg = '';
		          if ( error.status == 401 ) {
		            msg = error.error.message.message;
		          } else {
		            msg = "Erreur au niveau du serveur";
		          }
		          this._snackBar.open(msg, 'Fermer', {
					      duration: 4000,
					      verticalPosition: 'top'
					    });
					    this.onNoClick();
		          this.router.navigate(['']);
		        }
		      );
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}