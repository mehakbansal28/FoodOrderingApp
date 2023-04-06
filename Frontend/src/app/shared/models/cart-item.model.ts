import { FoodItem } from "./food-item.model";

export class CartItem {
    // foodItem: FoodItem;
    // quantity: number;

    // constructor(foodItem: FoodItem, quantity: number) {
    //   this.foodItem = foodItem;
    //   this.quantity = quantity;
    // }
    id: number;
  name: string;
  price: number;
  quantity: number;

  constructor(id: number, name: string,price:number,quantity:number){
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;

  }
  }
