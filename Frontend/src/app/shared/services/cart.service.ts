import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { FoodItem } from '../models/food-item.model';
import { FoodService } from './food.service';
// import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = [];
  cartItems: CartItem[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private foodService: FoodService, private http: HttpClient) { }
  

  // addToCart(item: CartItem) {
  //   const existingItem = this.items.find(i => i.foodItem.id === item.foodItem.id);
  //   if (existingItem) {
  //     existingItem.quantity += item.quantity;
  //   } else {
  //     this.items.push(item);
  //   }
  // }

  // addToCart(foodItem: CartItem) {
  //   const existingCartItem = this.cartItems.find(item => item.foodItem.id === foodItem.id);
  //   if (existingCartItem) {
  //     existingCartItem.quantity++;
  //   } else {
  //     this.cartItems.push({
  //       foodItem: foodItem,
  //       quantity: 1
  //     });
  //   }
  // }

  addToCart(foodItem: CartItem) {
    // const foodItems = this.foodService.getFoodItemById(id);

    // const cartItem: CartItem = {
    //   foodItem: foodItems,
    //   quantity: 1
    // };

    // // Check if the food item already exists in the cart
    // const existingItemIndex = this.cartItems.findIndex(item => item.foodItem.id === id);

    // if (existingItemIndex !== -1) {
    //   // If the food item already exists, update the quantity
    //   this.cartItems[existingItemIndex].quantity += existingItemIndex +1;
    // } else {
    //   // If the food item does not exist, add it to the cart
    //   this.cartItems.push(cartItem);
    // }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  removeFromCart(item: CartItem) {
    // const index = this.items.findIndex(i => i.foodItem.id === item.foodItem.id);
    // if (index > -1) {
    //   this.items.splice(index, 1);
    // }
  }

  // Checkout cart
  public checkoutCart(): any {
    // const cartItems = this.getItems();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    console.log(this.cartItems);
    const order = this.cartItems;
    

    this.http.post('http://localhost:3000/checkout', order).subscribe((response: any) => {
      if (response.success) {
        // Order was successful, display the order ID to the user
        alert(`Your order was successful! Your order ID is ${response.orderId}.`);
        //this.router.navigate(['/order-confirmation'], { state: { orderId: response.orderId }});

      } else {
        // There was an error processing the order
        alert('There was an error processing your order. Please try again later.');
      }
      return response;

    })
  }
}
