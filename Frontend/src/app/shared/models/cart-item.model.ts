export class CartItem {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  quantity: number;
  
  constructor(id: number, name: string,description:string,type:string, price:number,quantity:number){
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.price = price;
    this.quantity = quantity;
  }
}
