import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private endPoint = 'https://a.mypoc.in';

  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.endPoint+'/api/menu');
  }
}
