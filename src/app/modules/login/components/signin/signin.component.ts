import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../../shared/auth/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { strongPasswordValidator, similarValidator } from '../../../../shared/validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	signinForm: FormGroup;
  error: string = '';
  passwordCheck: any;

  constructor(
  	private fb: FormBuilder,
    private authenticationService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { 
  	this.signinForm = fb.group({
        'nom': ['', [Validators.required]],
        'prenom': ['', [Validators.required]],
        'email': ['', [Validators.pattern('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$'), Validators.required]],
        'username': ['', Validators.required],
        'password': ['', strongPasswordValidator()],
        'password_confirmation': ['', [Validators.required, similarValidator('password')]],
        'description': ['', []]
    });
    this.authenticationService.isAuthenticated();
  }

  ngOnInit() {
    this.passwordCheck = {taille: false, chiffre: false, special: false, majuscule: false};
  }

  onSubmit() {
    this.authenticationService
      .signIn(this.signinForm.value)
      .subscribe(
          (data) => {
              this.router.navigate(['']);
          },
          error => {this.snackBar.open(error, 'Fermer');}
      );
  }

  openSnackBar() {
    let snackBarRef = this.snackBar.open(this.error, 'Fermer');
  }

  checkPassword($event) {
    let password = this.signinForm.get('password').value;
    //au moins 8 caractères
    if (password.length >= 8) {
      this.passwordCheck.taille = true;
      //au moins 1 chiffre
      var regex = new RegExp(".*[0-9].*");
      this.passwordCheck.chiffre = regex.test(password) ? true : false;
      //au moins 1 caractère spécial
      var regex = new RegExp(".*[^a-zA-Z0-9].*");
      this.passwordCheck.special = regex.test(password) ? true : false;
      //au moins 1 majuscule
      var regex = new RegExp(".*[A-Z].*");
      this.passwordCheck.majuscule = regex.test(password) ? true : false;
    } else {
      this.passwordCheck = {taille: false, chiffre: false, special: false, majuscule: false};
    }

  }
}
