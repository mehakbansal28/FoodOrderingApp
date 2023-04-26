import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { FoodService } from './food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private items: CartItem[] = [];
  private cartItems: CartItem[] = [];
  private apiUrl = 'http://localhost:3000';

  constructor(private orderService: OrderService,private foodService: FoodService, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cartItems');
  }
  
  removeFromCart(item: CartItem) {
  }

  // Checkout cart
  public checkoutCart(): any {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const order = this.cartItems.map(obj => {
      const { id, name, description, type, price } = obj;
      return { id, name, description, type, price };
      });
    this.orderService.postOrder(order).subscribe((response: any) => {
      if (response) {
        this.clearCart();
        this.router.navigate(['/order-confirmation'], { state: { orderId: response.id } });
        this.toastr.success('Enjoy you Meal', 'Order confirmed');
      } else {
        this.toastr.error('There was an error processing your order. Please try again later.');
      }
    })
  }
}
