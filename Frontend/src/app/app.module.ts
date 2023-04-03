import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodListComponent } from './food-list/food-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {MatCard, MatCardTitle, MatCardContent} from '@angular/material/card'
import {MatList, MatListItem} from '@angular/material/list'

@NgModule({
  declarations: [
    AppComponent,
    FoodListComponent,
    ShoppingCartComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
