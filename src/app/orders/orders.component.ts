import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../orders.service";
import { ngxCsv } from "ngx-csv/ngx-csv";
import Swal from "sweetalert2";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}
  hold: any;
  orders: any;
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((data) => {
      this.orders = data;
      console.log("order", data);
    });
  }
  updateStatus(status: any) {
    this.ordersService.changeStatus(this.hold._id, status).subscribe(() => {
      alert("updated to " + status);
      this.ngOnInit();
    });
  }
  openMessage(data: any) {
    this.hold = data;
    document.getElementById("id01").style.display = "block";
  }
  closeMessage() {
    document.getElementById("id01").style.display = "none";
  }
  doanloadFile() {
    var data = this.orders.map((order) => {
      return {
        total: order.total,
        adress: order.adress,
        email: order.email,
        status: order.status,
      };
    });
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Orders Report",
      useBom: true,
      headers: ["total", "adress", "email", "status"],
    };
    new ngxCsv(data, "Rapport", options);
  }
  delete(id: string) {
    Swal.fire({
      title: "Are you are going to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
}
