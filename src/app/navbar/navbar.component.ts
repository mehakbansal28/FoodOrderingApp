import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CartItem } from '../shared/models/cart-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  title = 'Food Ordering App';
  cartItemCount: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    console.log('NavbarComponent initialized');

    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      console.log('Cart items:', items);
      this.cartItemCount = items.length;
      console.log('Cart item count:', this.cartItemCount);
    });
  }
  


}
