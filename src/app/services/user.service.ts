import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from '../models/user';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient){ }

  registerUser(obj: User) : Observable<User> {
    return this.http.post<User>(this.apiUrl, obj)
  }

  onLogin(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  updatePassword(id: number, newPassword: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, { password: newPassword });
  }

}
