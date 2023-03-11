import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map, Observable, take} from "rxjs";
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
    private getOrCreateCartKey(): string | null {
        const cartKey = localStorage.getItem('cartKey');
        if (cartKey) {
            return cartKey;
        } else {
            this.createCart().then(cart => {
                localStorage.setItem('cartKey', cart.key as string);
            })
            return localStorage.getItem('cartKey');
        }
    }

    // get cart
    public getCart(): Observable<Cart> {
        let cartKey = this.getOrCreateCartKey();
        return this.firebase.object<Cart>(`${this.firebaseURL}/${cartKey}`).snapshotChanges()
            .pipe(map((c: any) => ({key: c.payload.key, ...c.payload.val()})));
    }

    // get item from cart
    private getItem(cartID: string, productID: string) {
        return this.firebase.object(`${this.firebaseURL}/${cartID}/items/${productID}`);
    }

    // update items product in cart
    createCartItem(product: Product, change: number) {
        let cartKey = this.getOrCreateCartKey();
        let item$ = this.getItem(cartKey!, product.key as string);
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
    clearCart() {
        let cartID = this.getOrCreateCartKey();
        this.firebase.object(`${this.firebaseURL}/${cartID}/items`).remove().then(() =>
            console.log('Cart cleaned')
        );
    }
}
