import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotificationDialogComponent} from '../global/notification-dialog/notification-dialog.component';
import {ErrorService} from '../../services/error-service';
import {AuthService as SocialService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {AddNick} from '../../model/user/add-nick';
import {RegisterParams} from '../../model/user/register-params';
import {RegisterParamsClass} from '../../model/user/register-params-class';
import {GetSocialNickComponent} from '../global/get-social-nick/get-social-nick.component';
import {User} from '../../model/user/user.model';
import {RulesComponent} from '../global/rules/rules.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {

  constructor(
    private api: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private errorService: ErrorService,
    private socialService: SocialService,
    private userService: UserService,
  ) {}
  submittedFb = false;
  submittedGoogle = false;
  loginChecker;
  socialNickModal: MatDialogRef<GetSocialNickComponent>;
  rulesModal: MatDialogRef<RulesComponent>;
  registerParams: RegisterParams = new RegisterParamsClass();
  submitted = false;
  submit = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  fired = false;
  user: User;
  agreements: boolean;
  login(): void {
    this.submit = true;
    if(this.loginForm.invalid || this.submitted) {
      this.submitted = false;
      return;
    }
    this.submitted = true;
    this.submit = false;
    this.api.login(this.loginForm.value).subscribe(response => {
      if(response){
        this.submitted = false;
        this.router.navigate(['/']);
        return;
      }
    },
      error => {
      this.matDialog.open(NotificationDialogComponent,{
        width: '250px',
        data: this.errorService.errorMessageValue.value,
        panelClass: 'custom-modal'
      });
      this.submitted = false;
      });
  }
  get emailField(): AbstractControl {
    return this.loginForm.get('email');
  }
  get passwordField(): AbstractControl {
    return this.loginForm.get('password');
  }
  fbLogin(): void {
    if(this.submittedFb === true){
      return;
    }
    this.submittedFb = true;
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialLogin();
  }
  gmailLogin(): void {
    if(this.submittedGoogle === true){
      return;
    }
    this.submittedGoogle = true;
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialLogin();
  }

  socialLogin(): void {

    this.socialService.authState.subscribe(resp => {
      this.socialService.signOut();

      if(this.loginChecker === resp || typeof resp === null || resp === null || this.fired){
        return;
      }
      this.fired = true;
      this.loginChecker = resp;
      this.socialData = resp;
      this.api.loginSocialUser(this.registerParams).subscribe(user => {
        this.user = user;
        if(!user.nick){
           const ruleModal = this.matDialog.open(RulesComponent, {
            width: '80%',
            panelClass: 'rules-dialog'
          });
           ruleModal.afterClosed().subscribe(resp => {
            if(resp.rule){
              if(resp.text){
                const sessionItem = JSON.parse(sessionStorage.getItem('tempUser'));
                if(sessionItem){
                  sessionItem.agreements = true;
                  this.agreements = true;
                  sessionStorage.setItem('tempUser', JSON.stringify(sessionItem));
                }
              }
              this.registryUser();
              return;
            }
             this.submit = false;
            this.submitted = false;
            this.submittedFb = false;
            this.submittedGoogle = false;
            this.fired = false;
            return;
          }, error => {
            this.matDialog.open(NotificationDialogComponent, {
              width: '450px',
              data: {
                title: 'Błąd',
                desc: 'Musisz zaakaceptować regulamin, żeby się zarejestrować!'
              },
              panelClass: 'custom-modal'
            });
          });
          return;
        }
        this.api.finalLoginSocialUser(this.user);
        this.router.navigate(['/']);
        return;
      }, error => {
        this.matDialog.open(NotificationDialogComponent, {
          width: '250px',
          data: this.errorService.errorMessageValue.value,
          panelClass: 'custom-modal'
        });
      });
    });
    return;
  }
  getNick(){
    this.socialNickModal = this.matDialog.open(GetSocialNickComponent, {
      width: '250px',
      panelClass: 'custom-modal'
    });
  }
  registryUser(): void {

      if(this.user.email === null || this.user.email === ''){
        this.router.navigate(['/add-email']);
        return;
      }
      this.getNick();
      this.socialNickModal.afterClosed().subscribe(nick => {
        const data: AddNick = {
          nick: nick,
          agreements: this.agreements,
          email: this.user.email
        };
        this.userService.addNick(this.user.id, data).subscribe(resp => {
          this.user.nick = nick;
          this.api.finalLoginSocialUser(this.user);
          this.api.getUser();
          this.router.navigate(['/']);
          return;
        }, error => {
          this.matDialog.open(NotificationDialogComponent, {
            width: '250px',
            data: this.errorService.errorMessageValue.value,
            panelClass: 'custom-modal'
          });
        });
      });
  }
  set socialData(resp: SocialUser) {
    if(!resp){
      return;
    }
    this.registerParams.nick = null;
    this.registerParams.socialId =  resp.id;
    this.registerParams.name = resp.firstName;
    this.registerParams.email = resp.email;
    this.registerParams.type = resp.provider;
  }

}
