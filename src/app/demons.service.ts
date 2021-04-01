import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demon } from './demon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root',
})
export class DemonsService {
  private demonsUrl = 'd/demons';

  constructor(private http: HttpClient, private heroService: HeroService) {}

  getDemons(): Observable<Demon[]> {
    return this.http
      .get<Demon[]>(this.demonsUrl)
      .pipe(tap((d) => console.log(d)));
  }

  addDemon(demon: Demon): Observable<Demon> {
    return this.http
      .post<Demon>(this.demonsUrl, demon, this.heroService.httpOptions)
      .pipe(tap((d) => console.log(d)));
  }
  deleteDemon(id: number): Observable<Demon> {
    return this.http
      .delete<Demon>(`${this.demonsUrl}/${id}`, this.heroService.httpOptions)
      .pipe(tap((d) => console.log(d)));
  }
}
