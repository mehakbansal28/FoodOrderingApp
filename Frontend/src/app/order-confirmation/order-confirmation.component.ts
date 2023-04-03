import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';




@Component({

    selector: 'app-order-confirmation',

    template: `

    <h1>Order Confirmation</h1>

    <p>Your order was successful! Your order ID is {{ orderId }}.</p>

  `,

    styles: []

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