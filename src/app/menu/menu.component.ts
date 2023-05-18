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
          return foodItems.map((item) => {
            item.rating = Math.floor(Math.random() * 5) + 1;
            if (item.name.includes('Grilled Salmon')) {
              item.imageUrl = './assets/grilled_salmon.jpg';
            } else if (item.name.includes('Caprese Salad')) {
              item.imageUrl = './assets/caprese_salad.jfif';
            } else if (item.name.includes('Spaghetti Bolognese')) {
              item.imageUrl = './assets/Spaghetti Bolognese.jfif';
            } else if (item.name.includes('Bacon Cheeseburger')) {
              item.imageUrl = './assets/Bacon Cheeseburger.jfif';
            } else if (item.name.includes('Chicken Wings')) {
              item.imageUrl = './assets/Chicken Wings.webp';
            } else if (item.name.includes('Fresh Lemonade')) {
              item.imageUrl = './assets/Fresh Lemonade.jpg';
            }
            //else if (item.name.includes('Apple Pie')) {
            //   item.imageUrl = './assets/Apple Pie.jfif';
            // } else if (item.name.includes('Shrimp Pad Thai')) {
            //   item.imageUrl = './assets/Shrimp Pad Thai.jfif';
            // } else if (item.name.includes('Tomato Soup')) {
            //   item.imageUrl = './assets/Tomato Soup.jfif';
            // } else if (item.name.includes('Chicken Caesar Salad')) {
            //   item.imageUrl = './assets/Chicken Caesar Salad.jfif';
            // } else if (item.name.includes('Tomato Soup')) {
            //   item.imageUrl = './assets/Tomato Soup.jfif';
            // } else if (item.name.includes('Watermelon Salad')) {
            //   item.imageUrl = './assets/watermelon_salad.jfif';
            // } else if (item.name.includes('Avocado Toast')) {
            //   item.imageUrl = './assets/avocado_toast.jfif';
            // } else if (item.name.includes('Pancakes')) {
            //   item.imageUrl = './assets/pancake.jfif';
            // } else if (item.name.includes('Garlic Bread')) {
            //   item.imageUrl = './assets/garlic_bread.jpg';
            // } else if (item.name.includes('Chocolate Cake')) {
            //   item.imageUrl = './assets/chocolate_cake.jfif';
            // } else if (item.name.includes('Beef Stroganoff')) {
            //   item.imageUrl = './assets/beef_stroganoff.png';
            // } else if (item.name.includes('Mushroom Risotto')) {
            //   item.imageUrl = './assets/mushroom_risotto.jfif';
            // } else if (item.name.includes('Hawaiian Pizza')) {
            //   item.imageUrl = './assets/hawaiian_pizza.jfif';
            // } else if (item.name.includes('Buffalo Chicken Sandwich')) {
            //   item.imageUrl = './assets/buffalo_chicken_sandwich.jfif';
            // } else if (item.name.includes('Barbecue Ribs')) {
            //   item.imageUrl = './assets/barbecue_ribs.jfif';
            // } else if (item.name.includes('Mac and Cheese')) {
            //   item.imageUrl = './assets/mac_and_cheese.jfif';
            // } else if (item.name.includes('Beef Stew')) {
            //   item.imageUrl = './assets/beef_stew.jfif';
            // } else if (item.name.includes('Iced Tea')) {
            //   item.imageUrl = './assets/iced_tea.jfif';
            // } else if (item.name.includes('Fish and Chips')) {
            //   item.imageUrl = './assets/fish_and_chips.jfif';
            // } else if (item.name.includes('Lamb Kebab')) {
            //   item.imageUrl = './assets/lamb_kebab.jfif';
            // } else if (item.name.includes('Spinach and Artichoke Dip')) {
            //   item.imageUrl = './assets/spinach_and_artichoke_dip.jfif';
            // } else if (item.name.includes('Chicken Alfredo')) {
            //   item.imageUrl = './assets/Chicken Alfredo.jfif';
            // } else if (item.name.includes('Honey Glazed Salmon')) {
            //   item.imageUrl = './assets/Honey Glazed Salmon.jfif';
            // } else if (item.name.includes('Tiramisu')) {
            //   item.imageUrl = './assets/Tiramisu.jfif';
            // } else if (item.name.includes('Chicken Fried Rice')) {
            //   item.imageUrl = './assets/Chicken Fried Rice.jfif';
            // } else if (item.name.includes('Shepherds Pie')) {
            //   item.imageUrl = './assets/Shepherds Pie.jfif';
            // } else if (item.name.includes('Chicken Pot Pie')) {
            //   item.imageUrl = './assets/Chicken Pot Pie.jfif';
            // } else if (item.name.includes('Lemon and Herb Chicken')) {
            //   item.imageUrl = './assets/Lemon and Herb Chicken.jfif';
            // } else if (item.name.includes('Quinoa Bowl')) {
            //   item.imageUrl = './assets/Quinoa Bowl.jfif';
            // } else if (item.name.includes('Greek Salad')) {
            //   item.imageUrl = './assets/Greek Salad.jfif';
            // } else if (item.name.includes('Beef Curry')) {
            //   item.imageUrl = './assets/Beef Curry.jfif';
            // } else if (item.name.includes('Beef Burger')) {
            //   item.imageUrl = './assets/Beef Burger.jfif';
            // } else if (item.name.includes('Shrimp Ceviche')) {
            //   item.imageUrl = './assets/Shrimp Ceviche.jfif';
            // } else if (item.name.includes('Tomato and Basil Soup')) {
            //   item.imageUrl = './assets/Tomato and Basil Soup.jfif';
            // } else if (item.name.includes('Chicken Shawarma Wrap')) {
            //   item.imageUrl = './assets/Chicken Shawarma Wrap.jfif';
            // } else if (item.name.includes('Belgian Waffle')) {
            //   item.imageUrl = './assets/Belgian Waffle.jfif';
            // } else if (item.name.includes('Vegetable Biryani')) {
            //   item.imageUrl = './assets/Vegetable Biryani.jfif';
            // } else if (item.name.includes('Cucumber and Dill Salad')) {
            //   item.imageUrl = './assets/Cucumber and Dill Salad.jfif';
            // } else if (item.name.includes('Lasagna')) {
            //   item.imageUrl = './assets/Lasagna.jfif';
            // } else if (item.name.includes('Chicken and Dumplings Soup')) {
            //   item.imageUrl = './assets/Chicken and Dumplings Soup.jfif';
            // } else if (item.name.includes('Jambalaya')) {
            //   item.imageUrl = './assets/Jambalaya.jfif';
            // } else if (
            //   item.name.includes('Roasted Vegetable and Quinoa Salad')
            // ) {
            //   item.imageUrl =
            //     './assets/Roasted Vegetable and Quinoa Salad.jfif';
            // } else if (item.name.includes('Chocolate Truffles')) {
            //   item.imageUrl = './assets/Chocolate Truffles.jfif';
            // } else if (item.name.includes('Beef Enchiladas')) {
            //   item.imageUrl = './assets/Beef Enchiladas.jfif';
            // }
            else {
              item.imageUrl = './assets/food.png';
              item.rating = Math.floor(Math.random() * 5) + 1;
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
      'You can add more items.'
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
