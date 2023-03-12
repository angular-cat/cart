import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, take} from "rxjs";
import {Cart} from "../models/cart";
import {Product} from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    // firebase cart collection URL
    private firebaseURL = 'carts'

    constructor(private firebase: AngularFireDatabase) {
    }

    // create empty cart in firebase
    private createCart() {
        return this.firebase.list(this.firebaseURL).push({
            dateCreated: new Date().getTime()
        });
    }

    // get or create key cart
    private async getOrCreateCartKey() {
        let cartKey = localStorage.getItem('cartKey');
        if (cartKey) return cartKey;

        let cart = await this.createCart();
        localStorage.setItem('cartKey', cart.key as string);
        return cart.key;
    }

    // get cart from firebase
    public async getCart(): Promise<Observable<Cart>> {
        let cartKey = await this.getOrCreateCartKey();
        return this.firebase.object(`${this.firebaseURL}/${cartKey}`).valueChanges() as Observable<Cart>;
    }

    // get item from cart
    private getItem(cartKey: string, productKey: string) {
        return this.firebase.object(`${this.firebaseURL}/${cartKey}/items/${productKey}`);
    }

    // create items product in cart
    public async createCartItem(product: Product, change: number) {
        let cartKey = await this.getOrCreateCartKey();
        let item$ = this.getItem(cartKey as string, product.key as string);
        item$.snapshotChanges()
            .pipe(take(1))
            .subscribe((item: any) => {
                let quantity = ((item.payload.hasChild('quantity')) ? item.payload.val()['quantity'] + change : change);
                item$.update({
                    productKey: product.key,
                    quantity: quantity
                }).then();
            });
    }

    // remove items product from cart
    async clearCart() {
        let cartKey = await this.getOrCreateCartKey();
        this.firebase.object(`${this.firebaseURL}/${cartKey}/items`).remove().then(() =>
            console.log('Cart cleaned')
        );
    }
}
