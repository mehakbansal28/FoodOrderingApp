import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';
import { FoodItem } from '../shared/models/food-item.model';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  foodList: FoodItem[] = [];
  cartItems: CartItem[] = [];
  name: any;

  constructor(
    private foodService: FoodService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFoodItems();
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  getFoodItems(): void {
    this.foodService
      .getFoodItems()
      .pipe(
        map((foodItems: any[]) => {
          const accurateImages: { [name: string]: string } = {
            'Grilled Salmon': './assets/grilled_salmon.jpg',
            'Caprese Salad': './assets/caprese_salad.jfif',
            'Spaghetti Bolognese': './assets/Spaghetti Bolognese.jfif',
            'Bacon Cheeseburger': './assets/Bacon Cheeseburger.jfif',
            'Chicken Wings': './assets/Chicken Wings.webp',
            'Fresh Lemonade': './assets/Fresh Lemonade.jpg'
          };
  
          let accurateCount = 0;
  
          return foodItems.map((item) => {
            item.rating = Math.floor(Math.random() * 5) + 1;
  
            if (item.name in accurateImages && accurateCount < 6) {
              item.imageUrl = accurateImages[item.name];
              accurateCount++;
            } else {
              const randomIndex = Math.floor(Math.random() * accurateCount);
              const accurateItem = foodItems[randomIndex];
  
              item.imageUrl = accurateImages[accurateItem.name];
            }
  
            return item;
          });
        }),
        catchError((error) => {
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
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      type: item.type,
      price: item.price,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem);
    this.toastr.success(
      `HURRAH...! ${item.name} Added`,
      'You can add more items.',

      
      
      
    );
  }
  sortByName() {
    this.foodList.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  sortByPrice() {
    this.foodList.sort((a, b) => {
      return a.price - b.price;
    });
  }

  sortByRating() {
    this.foodList.sort((a, b) => {
      return b.rating - a.rating;
    });
  }

  Search() {
    console.warn('searching success');
    console.log('foodName:', this.name);

    if (this.name != '') {
      console.log('foodName:', this.name);
      this.foodList = this.foodList.filter((res) => {
        console.warn('searching if');
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    } else if (this.name == '') {
      console.warn('searching else');
      this.ngOnInit();
    }
  }
}
