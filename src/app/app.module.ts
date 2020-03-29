import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/global/header/header.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { UserFormComponent } from './components/global/user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddTextComponent } from './components/add-text/add-text.component';
import {MainComponent} from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PasswordValidator} from './helpers/validators/password-validator';
import {AsyncValidator} from './helpers/validators/async-validator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbDateParserFormatter, NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateFormatterCustom} from './helpers/ngbDateFormatterCustom';
import { RegistrySuccessComponent } from './components/registry-success/registry-success.component';
import { ActivateComponent } from './components/activate/activate.component';
import { AvatarComponent } from './components/global/avatar/avatar.component';
import { DragBarComponent } from './components/global/drag-bar/drag-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { EditAccountComponent } from './components/global/edit-account/edit-account.component';
import {HttpInterceptorim} from './helpers/interceptors/http-interceptor';
import {ErrorInterceptor} from './helpers/interceptors/error-interceptor';
import { NotificationDialogComponent } from './components/global/notification-dialog/notification-dialog.component';
import {MatDialogModule, MatTabsModule} from '@angular/material';
import { RulesComponent } from './components/global/rules/rules.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './components/reset-password-success/reset-password-success.component';
import { ResetPasswordInformationComponent } from './components/reset-password-information/reset-password-information.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MailingSettingsComponent } from './components/global/mailing-settings/mailing-settings.component';
import { OtherSettingsComponent } from './components/global/other-settings/other-settings.component';
import { PasswordVerifyDialogComponent } from './components/global/password-verify-dialog/password-verify-dialog.component';
import { DeleteUserInfoComponent } from './components/delete-user-info/delete-user-info.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { BackgroundImageComponent } from './components/global/background-image/background-image.component';
import {UserProfileResolverService} from './services/resolvers/user-profile-resolver.service';
import {UserSettingsResolverService} from './services/resolvers/user-settings-resolver.service';
import {Helpers} from './helpers/helpers';
import {AuthServiceConfig} from 'angularx-social-login';
import {socialFactory} from './config/config.module';
import {AuthService as SocialService} from 'angularx-social-login';
import {AuthService as AuthService} from './services/auth-service';
import { GetSocialNickComponent } from './components/global/get-social-nick/get-social-nick.component';
import { DataExistComponent } from './components/data-exist/data-exist.component';
import { FacebookPageComponent } from './components/global/facebook-page/facebook-page.component';
import { AskDeleteComponent } from './components/global/ask-delete/ask-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    UserFormComponent,
    AddTextComponent,
    MainComponent,
    LoginComponent,
    RegistrySuccessComponent,
    ActivateComponent,
    AvatarComponent,
    DragBarComponent,
    RegisterComponent,
    EditAccountComponent,
    NotificationDialogComponent,
    RulesComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    ResetPasswordInformationComponent,
    SettingsComponent,
    MailingSettingsComponent,
    OtherSettingsComponent,
    PasswordVerifyDialogComponent,
    DeleteUserInfoComponent,
    UserAccountComponent,
    BackgroundImageComponent,
    GetSocialNickComponent,
    DataExistComponent,
    FacebookPageComponent,
    AskDeleteComponent
  ],
  imports: [
    NgbDropdownModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDialogModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [AuthService, SocialService, { provide: AuthServiceConfig, useFactory: socialFactory }, Helpers, UserSettingsResolverService, UserProfileResolverService, PasswordValidator, AsyncValidator, [{provide: NgbDateParserFormatter, useClass: NgbDateFormatterCustom},{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorim, multi: true},{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}]],
  bootstrap: [AppComponent],
  entryComponents: [
    NotificationDialogComponent,
    RulesComponent,
    PasswordVerifyDialogComponent,
    GetSocialNickComponent,
    AskDeleteComponent
  ]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
