import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginUser, User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: LoginUser = new LoginUser();
  userService = inject(UserService);
  router = inject(Router);

  onLogin() {
    if (!this.loginObj.email || !this.loginObj.password) {
      alert('Please enter both email and password.');
      return;
    }

    this.userService.onLogin(this.loginObj.email, this.loginObj.password)
      .subscribe({
        next: (user) => {
          alert('Login successful');
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          console.error(err);
          alert('Incorrect email or password.');
        }
      });
    }
}
