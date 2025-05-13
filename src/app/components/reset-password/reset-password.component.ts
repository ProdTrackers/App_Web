import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email = '';
  userId: number | null = null;
  step = 1;
  verificationCode = '';
  enteredCode = '';
  newPassword = '';

  constructor(private userService: UserService) {}

  sendCode() {
    this.userService.getUserByEmail(this.email).subscribe(users => {
      if (users.length > 0) {
        this.userId = users[0].id;
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // código fake
        alert(`Tu código de verificación es: ${this.verificationCode}`); // Simula envío
        this.step = 2;
      } else {
        alert('Correo no encontrado');
      }
    });
  }

  verifyCode() {
    if (this.enteredCode === this.verificationCode) {
      this.step = 3;
    } else {
      alert('Código incorrecto');
    }
  }

  updatePassword() {
    if (this.userId !== null) {
      this.userService.updatePassword(this.userId, this.newPassword).subscribe(() => {
        alert('Contraseña actualizada correctamente');
        this.step = 4; // finalizar
      });
    }
  }
}
