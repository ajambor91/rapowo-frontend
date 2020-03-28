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
  loginChecker;
  socialNickModal: MatDialogRef<GetSocialNickComponent>;
  registerParams: RegisterParams = new RegisterParamsClass();
  submitted = false;
  submit = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  user: User;
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

    console.log('testfb');
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialLogin();
  }
  gmailLogin(): void {
    console.log('test');
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialLogin();
  }

  socialLogin(): void {
    this.socialService.authState.subscribe(resp => {
      if(this.loginChecker === resp || typeof resp === null || resp === null){
        return;
      }
      this.loginChecker = resp;
      this.socialData = resp;
      this.api.loginSocialUser(this.registerParams).subscribe(user => {

        if(user.nick === null || user.nick === ''){
          this.getNick();
          this.socialNickModal.afterClosed().subscribe(nick => {
            this.api.currentUserValue.nick = nick;
            const data: AddNick = {
              nick
            };
            this.userService.addNick(user.id, data).subscribe(resp => {
              this.user = user;
              this.user.nick = nick;
              this.api.getUser();
            }, error => {
              this.matDialog.open(NotificationDialogComponent, {
                width: '250px',
                data: this.errorService.errorMessageValue.value,
                panelClass: 'custom-modal'
              });
            });
          });
        }
      }, error => {
        this.matDialog.open(NotificationDialogComponent, {
          width: '250px',
          data: this.errorService.errorMessageValue.value,
          panelClass: 'custom-modal'
        })
      });
    });


  }
  getNick(){
    this.socialNickModal = this.matDialog.open(GetSocialNickComponent, {
      width: '250px',
      panelClass: 'custom-modal'
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
