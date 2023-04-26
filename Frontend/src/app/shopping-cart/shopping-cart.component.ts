import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.updateCart();
  }

  updateCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.totalPrice = this.cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCart();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getItems();
  }

  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
    this.totalPrice = 0;
  }

  getTotalPrice() {
    return this.cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  }
  
  checkoutCart(){
    this.cartService.checkoutCart();
  }
}
