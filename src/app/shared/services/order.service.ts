import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://ec2-13-235-114-103.ap-south-1.compute.amazonaws.com:8443/orders';

  constructor(private http: HttpClient) { }

  public postOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
