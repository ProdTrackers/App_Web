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
  this.userService.onLogin(this.loginObj.email, this.loginObj.password)
    .subscribe((res: User[]) => {
      if (res.length > 0) {
        const user = res[0];              // JSON-Server devuelve un array
        localStorage.setItem('logData', JSON.stringify(user));
        alert("User found successfully, navigating inside.");
        this.router.navigateByUrl('/home');
      } else {
        alert("Wrong username or password");
      }
    }, () => {
      alert("Wrong username or password");
    });
}
}
