import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginUser, User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiBase = "https://backend-production-41be.up.railway.app/api/v1/user";
  private readonly STORAGE_KEY = 'logData';

  constructor(private http: HttpClient) {}

  /**
   * LOGIN: Llama al endpoint /login con email y password
   */
  onLogin(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      })
    );
  }

  /**
   * REGISTER: Registra un nuevo usuario
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/register`, user).pipe(
      tap(u => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u));
      })
    );
  }

  /**
   * GET ALL USERS
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBase}/all`);
  }

  /**
   * GET USER BY ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiBase}/${id}`);
  }

  /**
   * UPDATE USER
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiBase}/${user.id}`, user).pipe(
      tap(u => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u));
      })
    );
  }

  /**
   * Cambia la contraseña (si tu backend soporta PATCH)
   */
  updatePassword(id: number, newPassword: string): Observable<User> {
    return this.http.patch<User>(`${this.apiBase}/${id}`, { password: newPassword });
  }

  /**
   * Obtener usuario actual (guardado localmente)
   */
  getCurrentUser(): User | null {
    const json = localStorage.getItem(this.STORAGE_KEY);
    return json ? JSON.parse(json) as User : null;
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
