import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

    @Input() product!: Product;

    quantity: number = 1;

    constructor() {
    }

    ngOnInit(): void {
    }

    quantityAdd() {
        this.quantity += 1;
    }

    quantityRemove() {
        this.quantity -= 1;
        if (this.quantity <= 1) this.quantity = 1;
    }

    addToCart() {
        console.log(
            'Product: ' + this.product.productName + '; ' +
            'Price: ' + this.product.productPrice + '; ' +
            'Quantity: ' + this.quantity
        );
        this.quantity = 1;
    }
}
