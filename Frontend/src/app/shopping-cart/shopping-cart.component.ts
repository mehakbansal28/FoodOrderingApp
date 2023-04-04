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

  constructor(private cartService: CartService, private http: HttpClient) { }

  selectedFoodItems = [];
  cartItems:any = [];
  //cartItems: CartItem[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
   this.updateCart();
  //this.cartItems = this.cartService.getItems();
  }

  updateCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.totalPrice = this.cartItems.reduce((total:number, item:any) => total + (item.price * item.quantity), 0);
  }


  // removeFromCart(cartItem: any) {
  //  // const index = this.cartItems.indexOf(cartItem);
  // //  this.cartItems.splice(index, 1);
  // }

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

  checkout() {
    const orderData = {
      items: this.cartItems,
      totalPrice: this.getTotalPrice()
    };
    this.http.post('http://localhost:3000/checkout', orderData)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotalPrice() {
    return this.cartItems.reduce((total:number, item:any) => total + item.price * item.quantity, 0);
  }

  checkoutCart() {
    console.log('checkout');
    this.cartService.checkoutCart();
    // this.cartService.checkoutCart()((response:any) => {
    //   console.log('checkout1');
    //   console.log('Order submitted successfully');
    //   // Clear cart
    //   this.cartService.clearCart();
    //   this.cartItems = [];
    // }, (error:any) => {
    //   console.error('Error submitting order:', error);
    // });
  }

}