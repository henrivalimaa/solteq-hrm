import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class EmployeeService {
	private url = 'http://127.0.0.1:8000/employee/';

  constructor( 
    private http: HttpClient,
    private router: Router ) { }

  /**
  * Fetches all employees (REST API)
  * @returns returns reponse of the request
  */
  getEmployees(): Observable<any> {
    let token = localStorage.getItem('currentUser');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
  	return this.http.get<Observable<any>>(this.url, { headers : headers })
      .pipe(
        tap(_ => console.log(`Fetched employees`)),
        catchError(this.handleError('getEmployees'))
      );
  }

  /**
  * Edits employees data (REST API)
  * @param data Employee data to be edited
  * @returns returns reponse of the request
  */
  editEmployee(data: any): Observable<any> {
    let employeeUrl = `${this.url}${data.id}/`;
    let token = localStorage.getItem('currentUser');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.put<Observable<any>>(employeeUrl, data, { headers : headers })
      .pipe(
        tap(_ => console.log(`Edited employee: ${data.name}`)),
        catchError(this.handleError('editEmployee'))
      );
  }

  /**
  * Creates a new employee (REST API)
  * @param data Employee to be created
  * @returns returns reponse of the request
  */
  createEmployee(data: any): Observable<any> {
    let token = localStorage.getItem('currentUser');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.post<Observable<any>>(this.url, data, { headers : headers })
      .pipe(
        tap(_ => console.log(`Created new employee: ${data.name}`)),
        catchError(this.handleError('createEmployee'))
      );
  }

  /**
  * Removes employee (REST API)
  * @param data Employee to be removed
  * @returns returns reponse of the request
  */
  removeEmployee(data: any): Observable<any> {
    let employeeUrl = `${this.url}${data.id}/`;
    let token = localStorage.getItem('currentUser');
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    return this.http.delete<Observable<any>>(employeeUrl, { headers : headers })
      .pipe(
        tap(_ => console.log(`Deleted employee: ${data.name}`)),
        catchError(this.handleError('removeEmployee'))
      );
  }

  /**
  * Error handler for invalid REST API requests
  * @param operation String value of the function called
  * @returns returns an error response
  */
  private handleError(operation: string) {
    return (error: any): Observable<any> => {
      
      if (error.status === 401) {
        console.log(localStorage.getItem('currentUser'));
        this.router.navigate(['login']);
        localStorage.removeItem('currentUser');
      }
      console.log(`${operation} failed: ${error.message}`);

      return of(error as any);
    };
  }
}
