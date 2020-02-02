import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddTextComponent} from './components/add-text/add-text.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrySuccessComponent} from './components/registry-success/registry-success.component';
import {ActivateComponent} from './components/activate/activate.component';
import {RegisterComponent} from './components/register/register.component';
import {EditAccountComponent} from './components/edit-account/edit-account.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'registry', component: RegisterComponent },
  { path: 'add-text', component: AddTextComponent, canActivate: ['/']},
  { path: 'login', component: LoginComponent},
  { path: 'registry-success', component: RegistrySuccessComponent},
  { path: 'activate-account/:hash', component: ActivateComponent},
  { path: 'edit-profile/:id', component: EditAccountComponent},
  { path: 'reset-password', component: ResetPasswordComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
