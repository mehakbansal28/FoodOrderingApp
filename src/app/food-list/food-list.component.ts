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
  name!: string;

  constructor(private foodService: FoodService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFoodItems();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getFoodItems(): void {
    this.foodService.getFoodItems()
      .pipe(
        map((foodItems: any[]) => {
          return foodItems.map(item => {
            if (item.name.includes('Grilled Salmon')) {
              item.imageUrl = './assets/grilled_salmon.jpg';
            } else if (item.name.includes('Caprese Salad')) {
              item.imageUrl = './assets/caprese_salad.jfif';
            }
            else {
              item.imageUrl = './assets/food.png';
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
        description: item.description,
        type: item.type,
        price: item.price,
        quantity: 1,
      };
      this.cartItems.push(newItem);
      this.cartService.addToCart(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.toastr.success(`HURRAH...! ${item.name} Added`, 'You can add more items.');
   
  }
  cartItemCount(): number {
    if (this.cartItems.length === 0) {
      return 0;
    }
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
   
  }

  Search()
  {
    console.warn("searching success");
    console.log('foodName:', this.name);
  
    if(this.name != "")
    {
      console.log('foodName:', this.name);
      this.foodList=this.foodList.filter(res=>{
        console.warn("searching if");
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }else if(this.name == ""){
      console.warn("searching else");
      this.ngOnInit();
    }
    
    
  }
}
