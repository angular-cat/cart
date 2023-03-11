import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {map} from "rxjs";
import {Product} from "../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    // firebase products collection URL
    private firebaseURL = 'products'

    constructor(private firebase: AngularFireDatabase) {
    }

    // C - create product in firebase
    createProduct(product: Product) {
        return this.firebase.list(this.firebaseURL).push(product);
    }

    // R - read all products from firebase
    getProducts(orderBy: string) {
        return this.firebase.list(this.firebaseURL, ref =>
            ref.orderByChild(orderBy))
            .snapshotChanges().pipe(
                map(changes =>
                    changes.map((c: any) => ({key: c.payload.key, ...c.payload.val()})))
            );
    }
}
