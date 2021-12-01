import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ManageProductsComponent } from "./manage-products/manage-products.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { SizeComponent } from "./size/size.component";
import { ColoreComponent } from "./colore/colore.component";
import { UsersComponent } from "./users/users.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeedbackComponent } from './feedback/feedback.component';
import { OrdersComponent } from './orders/orders.component';
import { RefundComponent } from './refund/refund.component';
import { ManagerComponent } from './manager/manager.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageProductsComponent,
    CategoryComponent,
    ProductComponent,
    SizeComponent,
    ColoreComponent,
    UsersComponent,
    ProductDetailsComponent,
    FeedbackComponent,
    OrdersComponent,
    RefundComponent,
    ManagerComponent,
    NavbarComponent,
    MainComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
