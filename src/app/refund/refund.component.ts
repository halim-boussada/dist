import { Component, OnInit } from "@angular/core";
import { RefundService } from "../refund.service";
import { ngxCsv } from "ngx-csv/ngx-csv";

@Component({
  selector: "app-refund",
  templateUrl: "./refund.component.html",
  styleUrls: ["./refund.component.css"],
})
export class RefundComponent implements OnInit {
  constructor(private refundService: RefundService) {}
  hold: any;
  refunds: any;
  ngOnInit(): void {
    this.refundService.getRefundRequests().subscribe((data) => {
      alert("dazadazdazazd");
      console.log("refunds", data);
      this.refunds = data;
    });
  }
  updateAnswer(status: any, answer: any) {
    this.refundService
      .answerRefundRequest(this.hold._id, status, answer)
      .subscribe(() => {
        alert("updated to " + status);
        this.ngOnInit();
        document.getElementById("id01").style.display = "none";
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
    var data = this.refunds.map((refund) => {
      return {
        userId: refund.userId,
        orderId: refund.orderId,
        reason: refund.reason,
        message: refund.message,
        category: refund.category,
        status: refund.status,
      };
    });
    var options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Products Report",
      useBom: true,
      headers: ["userId", "orderId", "reason", "message", "Category", "status"],
    };
    new ngxCsv(data, "Rapport", options);
  }
}
