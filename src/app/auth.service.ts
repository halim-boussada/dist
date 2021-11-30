import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";
  constructor(private http: HttpClient) {}
  login(data: any) {
    return this.http.post(this.ROOT_URL + "auth/admin/signin", data);
  }
  verify(data: any) {
    return this.http.post(this.ROOT_URL + "auth/admin/verify", data);
  }
}
