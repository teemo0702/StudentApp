import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})

export class ServerHttpService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Authorization: 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getStudents(): Observable<any> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getStudent(studentID: Number): Observable<any> {
    const url = `${this.REST_API_SERVER}/students/` + studentID;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getRandomStudent(): Observable<any> {
    const url = `https://randomuser.me/api/?results=1`;
    return this.httpClient
      .get<any>(url, this.httpOptions);
  }

  public addStudent(data: Student): Observable<any> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public editStudent(studentID: Number, data: Student): Observable<any> {
    const url = `${this.REST_API_SERVER}/students/` + studentID;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteStudent(studentID: Number): Observable<any> {
    const url = `${this.REST_API_SERVER}/students/` + studentID;
    return this.httpClient
      .delete<any>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
