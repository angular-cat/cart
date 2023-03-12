import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Subscription} from "rxjs";
import {Cart} from "../../models/cart";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    quantity: number = 0;

    cart$!: Subscription;

    constructor(private cartService: CartService) {
    }

    async ngOnInit() {
        this.cart$ = (await this.cartService.getCart()).subscribe((cart: Cart) => {
            this.quantity = 0;
            for (let productKey in cart.items) {
                this.quantity += cart.items[productKey].quantity;
            }
        });
    }

    ngOnDestroy() {
        this.cart$.unsubscribe();
    }
}
