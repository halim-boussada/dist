import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";

  // Product CRUD
  getOrders() {
    return this.http.get(this.ROOT_URL + "order");
  }
  changeStatus(id: string, status: any) {
    return this.http.put(this.ROOT_URL + "order/" + id, { status });
  }
  delete(id: string) {
    return this.http.delete(this.ROOT_URL + "order/" + id);
  }
}
