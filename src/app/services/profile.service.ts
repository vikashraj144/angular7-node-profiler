import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Education } from '../models/education';
import { ProfileError } from '../models/ProfileError';

@Injectable()

export class ProfilerService {
    baseUrl = environment.baseUrlLocal;
    constructor(private http: HttpClient) { }

    getEducation(): Observable<Education | ProfileError> {
        return this.http.get<Education>(this.baseUrl + '/assets/json/education.json')
          .pipe(
            catchError(this.handleError)
          );
      }

      private handleError(error: HttpErrorResponse): Observable<ProfileError> {
        const dataError = new ProfileError();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred retrieving data.';
        return throwError(dataError);
      }
}