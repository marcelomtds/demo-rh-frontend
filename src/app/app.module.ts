import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular4-social-login';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ServerErrorsInterceptor } from './core/interceptors/server-errors.interceptor';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { HeaderComponent } from './core/layout/header/header.component';
import { MenuComponent } from './core/layout/menu/menu.component';
import { SharedService } from './core/services/shared.service';
import { SharedModule } from './shared/shared.module';
registerLocaleData(localePt);

const google_oauth_client_id = '531640362638-ica4nsti141nkk06dk3islhgft2lno6b.apps.googleusercontent.com';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    SocialLoginModule.initialize(config),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-full-width',
        maxOpened: 1,
        preventDuplicates: true
      }
    )
  ],
  providers: [
    SharedService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    }

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
