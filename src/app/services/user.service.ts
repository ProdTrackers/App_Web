import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginUser, User} from '../models/user';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = "https://my-json-server.typicode.com/EChero11/dbjson_iot/users";

  constructor(private http: HttpClient){ }

  registerUser(obj: User) : Observable<User> {
    return this.http.post<User>(this.apiUrl, obj)
  }

  onLogin(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}?email=${email}&password=${password}`
    );
  }
}
