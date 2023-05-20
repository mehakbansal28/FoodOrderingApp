import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { FoodService } from './food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './order.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCount = new Subject<number>();
  items: CartItem[] = [];
  cartItems: CartItem[] = [];
  private apiUrl = 'http://localhost:3000';
  getCartItems: any;
  
  

  constructor(
    private orderService: OrderService,
    private foodService: FoodService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.clearCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');

    this.cartItemCount.next(this.cartItems.length);
    
  }

  
  
  
  getCartItemCount() {
    return this.cartItems.length;
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        type: item.type,
        price: item.price,
        quantity: 1,
      };
      this.cartItems.push(newItem);
    }
    this.cartItemCount.next(this.cartItems.length);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  
 

  // removeFromCart(item: CartItem) {
  //   const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
  //   if (index !== -1) {
  //     this.cartItems.splice(index, 1);
  //     this.cartItemCount.next(this.cartItems.length);
  //   }
  // }
  removeFromCart(item: CartItem) {
    const index = this.cartItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemCount.next(this.cartItems.length);
    }
  }
  

  // Checkout cart
  public checkoutCart(): any {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const order = this.cartItems.map((obj) => {
      const { id, name, description, type, price } = obj;
      return { id, name, description, type, price };
    });
    this.orderService.postOrder(order).subscribe((response: any) => {
      if (response) {
        this.clearCart();
        this.router.navigate(['/order-confirmation'], {
          state: { orderId: response.id },
        });
        this.toastr.success('Enjoy you Meal', 'Order confirmed');
      } else {
        this.toastr.error(
          'There was an error processing your order. Please try again later.'
        );
      }
    });
  }
}
