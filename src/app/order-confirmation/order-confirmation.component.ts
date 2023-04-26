import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order-confirmation',
  template: `
    <div class="container-fluid bg-light">
      <div class="row">
        <div class="col-md-12 text-center mt-5">
          <h1 class="text-primary display-1 mb-4">Thank You!</h1>
          <p class="lead text-dark mb-5">Your order has been placed successfully. Your order ID is <strong>{{ orderId }}</strong>.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-light {
      background-color: #f8f9fa;
    }
    h1 {
      font-size: 4rem;
      font-weight: bold;
      color: #007bff;
      text-shadow: 2px 2px #000000;
      margin-top:70px;
    }
    p {
      font-size: 1.5rem;
      margin-bottom: 50px;
      color: #000000;
    }
    strong {
      font-weight: bold;
      color: #007bff;
    }
  `]
})

export class OrderConfirmationComponent implements OnInit {
  orderId: string;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderId = navigation?.extras?.state?.orderId;
  }

  ngOnInit(): void {
    if (!this.orderId) {
      this.router.navigate(['/']);
    }
  }
}
