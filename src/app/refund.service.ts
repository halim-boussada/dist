import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RefundService {
  constructor(private http: HttpClient) {}
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";

  getRefundRequests() {
    return this.http.get(this.ROOT_URL + "refund");
  }
  answerRefundRequest(id: string, status: any, adminAnswer: any) {
    return this.http.put(this.ROOT_URL + "refund/" + id, {
      status,
      adminAnswer,
    });
  }
}
