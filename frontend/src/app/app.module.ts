import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule }    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found.component';
import { JwtModule } from '@auth0/angular-jwt'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/auth/token.interceptor';
import { 
   MatSidenavModule,
   MatCheckboxModule
 } from '@angular/material';

//modules
import { SharedModule } from './shared';
import { LoginModule } from './modules/login/login.module';
import { AccueilModule } from './modules/accueil/accueil.module';
import { MagicTaxrefModule } from './modules/magic-taxref/magic-taxref.module';
import { ProjetModule } from './modules/projet/projet.module';

//services
import { AuthService } from './shared';
import { AuthGuard } from './shared';

//components
import { AppComponent } from './app.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['vps559502.ovh.net']
      }
    }),
    MatSidenavModule,
    MatCheckboxModule,
    SharedModule,
    LoginModule,
    AccueilModule,
    MagicTaxrefModule,
    ProjetModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
