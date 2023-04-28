import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://13.235.114.103.nip.io/orders';

  constructor(private http: HttpClient) { }

  public postOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
