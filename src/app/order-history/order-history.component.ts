import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
  public chart: any;

  orderHistory = [
    {
      orderId: 1234,
      name: 'Burger',
      image: '../../assets/burger.jpg',
      orderDate: '2023-05-01',
      deliveryStatus: 'Delivered',
      shippingAddress: '123 Main St, Anytown, USA',
      quantity: 2,
      totalPrice: 50.0,
      paymentMethod: 'Credit Card',
      customerName: 'John Doe',
    },
    {
      orderId: 5678,
      name: 'Pizza',
      image: '../../assets/pizza.jpg',
      orderDate: '2023-04-25',
      deliveryStatus: 'Delivered',
      shippingAddress: '456 Elm St, Anytown, USA',
      quantity: 1,
      totalPrice: 25.0,
      paymentMethod: 'PayPal',
      customerName: 'Jane Smith',
    },
    {
      orderId: 9012,
      name: 'Pasta',
      image: '../../assets/food.png',
      orderDate: '2023-04-15',
      deliveryStatus: 'Cancelled',
      shippingAddress: '789 Oak St, Anytown, USA',
      quantity: 3,
      totalPrice: 75.0,
      paymentMethod: 'Credit Card',
      customerName: 'Bob Johnson',
    },
  ];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Orders',
            data: [
              '11',
              '35',
              '3',
              '15',
              '2',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
              '0',
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#E74C3C',
              '#9B59B6',
              '#1ABC9C',
              '#F1C40F',
              '#3498DB',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
