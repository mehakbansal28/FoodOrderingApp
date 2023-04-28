import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://a.mypoc.in/orders';

  constructor(private http: HttpClient) { }

  public postOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
