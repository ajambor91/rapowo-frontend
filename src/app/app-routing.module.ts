import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTextComponent} from './components/add-text/add-text.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrySuccessComponent} from './components/registry-success/registry-success.component';
import {ActivateComponent} from './components/activate/activate.component';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ResetPasswordInformationComponent} from './components/reset-password-information/reset-password-information.component';
import {ResetPasswordSuccessComponent} from './components/reset-password-success/reset-password-success.component';
import {SettingsComponent} from './components/settings/settings.component';
import {EditAccountComponent} from './components/global/edit-account/edit-account.component';
import {OtherSettingsComponent} from './components/global/other-settings/other-settings.component';
import {DeleteUserInfoComponent} from './components/delete-user-info/delete-user-info.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'registry', component: RegisterComponent },
  { path: 'add-text', component: AddTextComponent, canActivate: ['/']},
  { path: 'login', component: LoginComponent},
  { path: 'registry-success', component: RegistrySuccessComponent},
  { path: 'activate-account/:hash', component: ActivateComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'reset-password-info', component: ResetPasswordInformationComponent},
  { path: 'reset-password-new/:hash', component: ResetPasswordSuccessComponent},
  { path: 'settings', component: SettingsComponent, children: [
      { path: '', redirectTo: 'edit-account', pathMatch: 'full'},
      { path: 'edit-account', component: EditAccountComponent},
      { path: 'other-settings', component: OtherSettingsComponent}
    ]},
  { path: 'delete-user', component: DeleteUserInfoComponent}


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
