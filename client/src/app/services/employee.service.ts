import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
	private url = 'http://127.0.0.1:8000/employee/';
  private token = localStorage.getItem('currentUser');

  constructor( 
    private http: HttpClient,
    private router: Router ) { }

  getEmployees(): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
  	return this.http.get<Observable<any>>(this.url, { headers : headers })
      .pipe(
        tap(_ => console.log(`Fetched employees`)),
        catchError(this.handleError('getEmployees'))
      );
  }

  editEmployee(data: any): Observable<any> {
    let employeeUrl = `${this.url}${data.id}/`;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    return this.http.put<Observable<any>>(employeeUrl, data, { headers : headers })
      .pipe(
        tap(_ => console.log(`Edited employee: ${data.name}`)),
        catchError(this.handleError('editEmployee'))
      );
  }

  createEmployee(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    return this.http.post<Observable<any>>(this.url, data, { headers : headers })
      .pipe(
        tap(_ => console.log(`Created new employee: ${data.name}`)),
        catchError(this.handleError('createEmployee'))
      );
  }

  removeEmployee(data: any): Observable<any> {
    let employeeUrl = `${this.url}${data.id}/`;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    return this.http.delete<Observable<any>>(employeeUrl, { headers : headers })
      .pipe(
        tap(_ => console.log(`Deleted employee: ${data.name}`)),
        catchError(this.handleError('removeEmployee'))
      );
  }

  private handleError(operation: string) {
    return (error: any): Observable<any> => {
      
      if (error.status === 401) {
        this.router.navigate(['login']);
        localStorage.removeItem('currentUser');
      }
      console.log(`${operation} failed: ${error.message}`);

      return of(error as any);
    };
  }
}
