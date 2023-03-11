import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../services/products.service";
import {Subscription} from "rxjs";
import {Product} from "../models/product";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    isLoading: boolean = true;
    products: Product[] = [];
    productSubscription!: Subscription;

    // product: Product = {
    //     productName: 'Ball',
    //     productImgURL: 'assets/images/products/product-ball.webp',
    //     productPrice: 10
    // }

    constructor(private productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.loadProducts();
        // this.productsService.createProduct(this.product);
    }

    private loadProducts() {
        this.isLoading = true;
        this.productSubscription = this.productsService.getProducts('productName').subscribe(products => {
            this.products = products;
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }
}
