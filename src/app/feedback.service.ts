import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(private http: HttpClient) {}
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";

  // Product CRUD
  getContacts() {
    return this.http.get(this.ROOT_URL + "contact");
  }
  delete(_id) {
    return this.http.delete(this.ROOT_URL + "contact/" + _id);
  }
  read(_id) {
    return this.http.put(this.ROOT_URL + "contact/" + _id, {});
  }
}
