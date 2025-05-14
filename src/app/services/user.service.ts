import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginUser, User} from '../models/user';
import {Observable, tap} from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UserService {

 private apiUrl = "https://my-json-server.typicode.com/EChero11/dbjson_iot/users";
  private STORAGE_KEY = 'logData';

  constructor(private http: HttpClient){ }

  /** Llama al endpoint de login (ya lo tienes) */
  onLogin(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  /** Obtiene el usuario actual desde localStorage */
  getCurrentUser(): User | null {
    const json = localStorage.getItem(this.STORAGE_KEY);
    return json ? JSON.parse(json) as User : null;
  }

  /** Actualiza el perfil en la fake-API y en localStorage */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${user.id}`,
      user
    ).pipe(
      tap(u => localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u)))
    );
  }
    /** Nuevo: registra un usuario en la fake-API */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrl,
      user
    ).pipe(
      tap(u => {
        // opcional: si quieres iniciar sesión automático tras registrarse
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(u));
      })
    );
  }
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  updatePassword(id: number, newPassword: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, { password: newPassword });
  }
}
