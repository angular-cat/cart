import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Observable} from "rxjs";
import {Cart} from "../models/cart";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    cart$!: Observable<Cart>;

    constructor(private cartService: CartService) {
    }

    async ngOnInit() {
        this.cart$ = await this.cartService.getCart();
    }

    clearCart() {
        this.cartService.clearCart().then();
    }
}
