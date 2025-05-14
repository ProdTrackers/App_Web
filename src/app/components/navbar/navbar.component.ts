import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatButtonModule,
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router);

  logout() {
    // Limpias la sesión
    localStorage.removeItem('logData');
    // O si guardas más keys:
    // localStorage.clear();
    // Y vas al login
    this.router.navigateByUrl('/login');
  }
}
