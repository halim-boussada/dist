import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";

  // Product CRUD
  getUsers() {
    return this.http.get(this.ROOT_URL + "user");
  }
}
