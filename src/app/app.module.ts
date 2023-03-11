import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {environment} from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MaterialModule} from "./material/material.module";
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CartComponent} from './cart/cart.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {FooterComponent} from './components/footer/footer.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        CartComponent,
        ProductCardComponent,
        FooterComponent,
        ContactComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
