import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Song } from './song';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SongService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  
  //The events web API expects a special header in HTTP save requests:
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private songsUrl = 'http://localhost:9090/songs/';  // URL to web api
  


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** GET heroes from the server */
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsUrl)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', []))
     );
  }
/*
  getUser(id: number): Observable<Event> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const event = EVENTS.find(h => h.id === id)!;
    this.messageService.add(`EventService: fetched event id=${id}`);
    return of(event);
  }
  */

  /** GET user by id. Will 404 if id not found */
  getSong(id: string): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;
    return this.http.get<Song>(url).pipe(
      tap(_ => this.log(`fetched song id=${id}`)),
      catchError(this.handleError<Song>(`getSong id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateSong(id: string, song: any): Observable<any> {
    console.log(id);
    const url = `${this.songsUrl}/${id}`;
    
    const resp = this.http.put(url, song, this.httpOptions).pipe(
      tap(_ => this.log(`updated song id=${id}`)),
      catchError(this.handleError<any>('updateSong'))
    );
    return resp;

  }

  /** POST: add a new user to the server */
  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.songsUrl, song, this.httpOptions).pipe(
      tap((newSong: Song) => this.log(`added song w/ id=${newSong._id}`)),
      catchError(this.handleError<Song>('addSong'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteSong(id: string): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;

    return this.http.delete<Song>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted song id=${id}`)),
      catchError(this.handleError<Song>('deleteSong'))
    );
  }

    /* GET users whose name contains search term */
  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty event array.
      return of([]);
   }
    return this.http.get<Song[]>(`${this.songsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found song matching "${term}"`) :
         this.log(`no songs matching "${term}"`)),
     catchError(this.handleError<Song[]>('searchSongs', []))
   );
  }

  /** Log an UserService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`SongService: ${message}`);
  }
}

