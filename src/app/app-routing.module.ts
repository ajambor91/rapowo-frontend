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
import {MailingSettingsComponent} from './components/global/mailing-settings/mailing-settings.component';
import {UserAccountComponent} from './components/user-account/user-account.component';
import {UserProfileResolverService} from './services/resolvers/user-profile-resolver.service';
import {UserSettingsResolverService} from './services/resolvers/user-settings-resolver.service';
import {DataExistComponent} from './components/data-exist/data-exist.component';
import {GetTextResolver} from './services/resolvers/get-text-resolver';
import {SongComponent} from './components/song/song.component';
import {SongResolverService} from './services/resolvers/song-resolver.service';
import {AuthGuardService} from './services/auth-guard.service';
import {UnAuthGuardService} from './services/un-auth-guard.service';
import {OwnerGuardService} from './services/owner-guard.service';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NotificationsResolver} from './services/resolvers/notifications-resolver';
import {GetQueueTextsResolver} from './services/resolvers/get-queue-texts-resolver';
import {DraftsComponent} from './components/drafts/drafts.component';
import {DraftResolver} from './services/resolvers/draft-resolver';

const routes: Routes = [
  { path: '', component: MainComponent, resolve: {settings: GetTextResolver}},
  { path: 'registry', component: RegisterComponent, canActivate: [UnAuthGuardService] },
  { path: 'add-text', component: AddTextComponent , canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuardService]},
  { path: 'registry-success', component: RegistrySuccessComponent, canActivate: [UnAuthGuardService]},
  { path: 'activate-account/:hash', component: ActivateComponent, canActivate: [UnAuthGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [UnAuthGuardService]},
  { path: 'reset-password-info', component: ResetPasswordInformationComponent, canActivate: [UnAuthGuardService]},
  { path: 'reset-password-new/:hash', component: ResetPasswordSuccessComponent, canActivate: [UnAuthGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService], children: [
      { path: '', redirectTo: 'edit-account', pathMatch: 'full'},
      { path: 'edit-account/:id', component: EditAccountComponent},
      { path: 'notification-settings/:id', component: MailingSettingsComponent, resolve: {settings: UserSettingsResolverService}},
      { path: 'other-settings/:id', component: OtherSettingsComponent}
    ]},
  { path: 'delete-user', component: DeleteUserInfoComponent},
  { path: 'profile/:id', component: UserAccountComponent, canActivate: [AuthGuardService], resolve: {user: UserProfileResolverService}},
  { path: 'add-email', component: DataExistComponent, canActivate: [UnAuthGuardService]},
  { path: 'song/:slug', component: SongComponent, resolve: {song: SongResolverService}},
  { path: 'song/:slug/:edit', component: SongComponent, canActivate: [AuthGuardService, OwnerGuardService], resolve: {song: SongResolverService}},
  { path: 'notifications', component: NotificationsComponent, resolve: {notify: NotificationsResolver}, canActivate: [AuthGuardService]},
  { path: 'queue', component: MainComponent, resolve: {settings: GetQueueTextsResolver}},
  { path: 'drafts', component: DraftsComponent, resolve: {draft: DraftResolver}}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
