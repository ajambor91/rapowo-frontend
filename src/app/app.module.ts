import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/global/header/header.component';
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { UserFormComponent } from './components/global/user-form/user-form.component';
import {ReactiveFormsModule} from '@angular/forms';
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
import { EditAccountComponent } from './components/edit-account/edit-account.component';

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
    EditAccountComponent

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
    })
  ],
  providers: [PasswordValidator, AsyncValidator, [{provide: NgbDateParserFormatter, useClass: NgbDateFormatterCustom}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
