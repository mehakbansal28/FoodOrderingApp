import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})

export class FoodListComponent implements OnInit {
  foodList: FoodItem[] = [];
  cartItems: CartItem[] = [];

  constructor(private foodService: FoodService,private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFoodItems();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getFoodItems(): void {
    this.foodService.getFoodItems()
    .pipe(
      map((foodItems: any[]) => {
        return foodItems.map(item=> {
          if (item.name.includes('Grilled Salmon')) {
            item.imageUrl = './assets/grilled_salmon.jpg';
          } if (item.name.includes('Caprese Salad')) {
            item.imageUrl = './assets/caprese_salad.jfif';
          }
          return item;
        });
      }),
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    )
    .subscribe(
      (foodItems: FoodItem[]) => {
        this.foodList = foodItems;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addToCart(item: FoodItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: any = {
        id: item.id,
        name: item.name,
        description:item.description,
        type:item.type,
        price: item.price,
        quantity: 1,
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.toastr.success(`HURRAH...! ${item.name} Added`, 'You can add more items.');
  }
}
