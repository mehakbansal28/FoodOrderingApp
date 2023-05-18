import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private endPoint =
    'http://ec2-13-235-114-103.ap-south-1.compute.amazonaws.com:8443';

  constructor(private http: HttpClient) {}

  getReport(): Observable<Order[]> {
    return this.http.get<Order[]>(this.endPoint + '/orders');
  }
}
