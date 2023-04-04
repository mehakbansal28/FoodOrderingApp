import { FoodItem } from "./food-item.model";
export class CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;

  constructor(id: number, name: string, price: number, quantity: number, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
  }
}
