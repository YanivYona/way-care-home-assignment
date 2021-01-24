import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpHandlerService {
  private baseUrl = environment.baseUrl;
  public headers = new HttpHeaders();

  constructor(private http: HttpClient, public router: Router) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public get(url: string, params?: {} | undefined): Observable<any> {
    return this.http.get(this.baseUrl + url, { params, headers: this.headers });
  }

  public delete(url: string, params: {} | undefined): Observable<any> {
    return this.http.delete(this.baseUrl + url, {
      params,
      headers: this.headers,
    });
  }

  public put(url: string, body: {}): Observable<any> {
    return this.http.put(this.baseUrl + url, body, { headers: this.headers });
  }

  public post(url: string, body: {}): Observable<any> {
    return this.http.post(this.baseUrl + url, body, { headers: this.headers });
  }
}
