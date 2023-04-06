import { Injectable } from '@angular/core';
import { FoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // foodItems: FoodItem[] = [
  //   { id: 1, name: 'Pizza', description: 'Delicious pizza with pepperoni and cheese', price: 9.99 },
  //   { id: 2, name: 'Burger', description: 'Juicy burger with bacon and fries', price: 7.99 },
  //   { id: 3, name: 'Salad', description: 'Fresh salad with mixed greens and veggies', price: 5.99 },
  //   { id: 4, name: 'Pasta', description: 'Hearty pasta with meat sauce and garlic bread', price: 11.99 },
  //   { id: 5, name: 'Sushi', description: 'Sushi roll with tuna and avocado', price: 12.99 }
  // ];

  constructor() { }

  getFoodItems() {
    // return this.foodItems;
  }
  
}
