import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
	private token: any;
	private apiUrl = 'http://127.0.0.1:8000/auth-jwt/';

    constructor(private http: HttpClient, private router: Router) {
        var currentUser = localStorage.getItem('currentUser');
        this.token = currentUser;
    }

    login(username: string, password: string): Observable<any> {
      return this.http.post(this.apiUrl, { username: username, password: password })
        .pipe(
          tap(response => {
            if (response['token']) {
              this.token = response['token'];
              localStorage.setItem('currentUser', this.token);
              return response;
            }
          }),
          catchError(this.handleError('login'))
        );
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser')
    }

    private handleError(operation: string) {
      return (error: any): Observable<any> => {
        
        if (error.status === 401) this.router.navigate(['login']);
        console.log(`${operation} failed: ${error.message}`);

        return of(error as any);
      };
    }
}
