import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from '../../services/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';

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
    private fb: FormBuilder
  ) {}
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
  login() {
    this.api.login(this.loginForm.value).subscribe(response => {
      if(response){
        this.router.navigate(['/']);
      }
    });
  }





}
