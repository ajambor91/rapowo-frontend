import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationFormComponent} from './components/registration-form/registration-form.component';
import {AddTextComponent} from './components/add-text/add-text.component';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrySuccessComponent} from './components/registry-success/registry-success.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'registry', component: RegistrationFormComponent },
  { path: 'add-text', component: AddTextComponent, canActivate: ['/']},
  { path: 'login', component: LoginComponent},
  { path: 'registry-success', component: RegistrySuccessComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
