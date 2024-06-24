import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Voting } from '../models/voting.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://localhost:7218/Voting'

  constructor(
    private http: HttpClient,
  ) { }

  getVotingList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetVoting`).pipe(catchError(this.handleError));
  }

  createVoting(voting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateVoting`, voting);
  }

  updateVoting(votingId: string, voting: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpdateVoting/${votingId}`, voting);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} ${error.message}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
