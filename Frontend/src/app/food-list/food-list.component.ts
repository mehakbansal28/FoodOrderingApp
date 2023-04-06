import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  foodList: FoodItem[] = [
    { id: 1, name: "Pizza", description: "Delicious pizza with all your favorite toppings!", price: 9.99,  imageUrl: 'pizza.jpg' },
    { id: 2, name: "Burger", description: "Juicy burger with all the fixings!", price: 6.99 ,  imageUrl: 'pizza.jpg'},
    { id: 3, name: "Fries", description: "Crispy fries with your choice of dipping sauce.", price: 3.99,  imageUrl: 'pizza.jpg' }
  ];
  cartItems: CartItem[] = [];
  foodItems: FoodItem[] = [];

  constructor(private foodService: FoodService, private cartService: CartService) { }


  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
   // this.foodItems = this.foodService.getFoodItems();
  }

  addToCart(item: FoodItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: any = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      //  foodItem: []
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    window.alert("Items added to cart successfully");
  }


  // addToCart(foodItem: FoodItem) {
  //   const cartItem: CartItem = {
  //     foodItem: foodItem,
  //     quantity: 1
  //   };
  //   this.cartService.addToCart(cartItem);
  //   window.alert('The item has been added to your cart!');
  // }

}
