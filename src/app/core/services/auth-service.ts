import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth = `${environment.url_base}api/oauth2/v1/token`;
  private http = inject(HttpClient);

  constructor() { }

  createSection = (username: string, password: string): Observable<any> => {
    const url: string = `${this.urlAuth}?grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
   
    return this.http.post(url, null);
  }

}
