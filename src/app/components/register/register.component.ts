import {Component, inject} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerObj: User = new User();
  userService = inject(UserService);
  router = inject(Router);


  onRegister() {
    this.userService.registerUser(this.registerObj).subscribe((res: User) => {
      alert("User registered successfully.")
    }, error => {
      alert(error.err)
    })
  }
}
