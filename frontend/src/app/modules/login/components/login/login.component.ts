// authentication/authentication.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../../shared/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginForm: FormGroup;
    error: any = '';
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
        this.authenticationService.isAuthenticated();
 
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.authenticationService
          .login(this.loginForm.value)
          .subscribe(
              data => {
                this.router.navigateByUrl(this.returnUrl);
              },
              error => {
                if ( error.status == 401 ) {
                  this.error = error.error.message;
                }
              }
          );
    }
}