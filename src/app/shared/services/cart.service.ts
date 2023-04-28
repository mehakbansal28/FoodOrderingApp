import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { FoodService } from './food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './order.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  private items: CartItem[] = [];
  private cartItems: CartItem[] = [];
  private apiUrl = 'http://localhost:3000';
 
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  updateCartItems: any;

  constructor(private orderService: OrderService,private foodService: FoodService, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  getItems() {
    return this.items;
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
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
  getCartItemCount(): number {
    let count = 0;
    for (const item of this.cartItems) {
      count += item.quantity;
    }
    return count;
  }
 
}
