import {CartItem} from "./cart-item";

export interface Cart {
    key?: string;
    dateCreated: number;
    items: Array<CartItem>;
}
