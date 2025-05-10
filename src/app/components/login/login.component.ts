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
    this.userService.onLogin(this.loginObj.email, this.loginObj.password).subscribe((res: any) => {alert("User found successfully, navigating inside.");
      localStorage.setItem('logData', JSON.stringify(res.data));
      this.router.navigateByUrl('/home');
    }, error => {
      alert("Wrong username or password");
    })
  }
}
