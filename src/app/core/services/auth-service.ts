import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Section } from '../models/section';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private urlAuth = `${environment.url_base}api/oauth2/v1/token`;
  private http = inject(HttpClient);
  private storageSection = inject(StorageService);
  private section = new BehaviorSubject<Section>(new Section);

  constructor() { }

  public setSection = (section : Section) => this.section.next(section);

  public getSection = ():Observable<Section> => this.section.asObservable();

  createSection = (username: string, password: string): Observable<Section> => {
    const url: string = `${this.urlAuth}?grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
   
    return this.http.post<Section>(url, null).pipe(tap({
      next: async (section) => {
        try{
          const now: number = Date.now();
          const newSection: Section = {
            ...section, 
            expires_token: now + (section.expires_in * 1000), 
            expires_refreh_token: now * (section.expires_in * 1000 * 24)};

          this.section.next(newSection);
          await this.storageSection.setItem<Section>(environment.STORAGE_KEY_SECTION, newSection);
        }
        catch (e){
          console.log('Erro de gravação', e)
        }
      },
      error: (err) => {
        console.log("Erro", err)
      },
      finalize: () => {}
    }));
  }

}
