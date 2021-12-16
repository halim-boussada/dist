import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedbackComponent } from "./feedback/feedback.component";
import { MainComponent } from "./main/main.component";
import { ManageProductsComponent } from "./manage-products/manage-products.component";
import { ManagerComponent } from "./manager/manager.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { RefundComponent } from "./refund/refund.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  { path: "", component: ManagerComponent },
  {
    path: "admin",
    component: MainComponent,
    children: [
      { path: "manage", component: ManageProductsComponent },
      { path: "productdetails", component: ProductDetailsComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "orders", component: OrdersComponent },
      { path: "refund", component: RefundComponent },
      { path: "users", component: UsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
