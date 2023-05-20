import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title:string = "Food Ordering";
  cartItemCount: number | undefined;
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Retrieve the initial cart item count
    this.cartItemCount = this.cartService.getCartItemCount();

    // Subscribe to changes in the cart item count
    this.cartService.cartItemCount.subscribe((count: number) => {
      this.cartItemCount = count;
    });
  }
}
