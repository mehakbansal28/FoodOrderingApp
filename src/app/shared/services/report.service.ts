import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private endPoint =
    'https://13.235.114.103.nip.io';

  constructor(private http: HttpClient) {}

  getReport(): Observable<Order[]> {
    return this.http.get<Order[]>(this.endPoint + '/orders');
  }
}
