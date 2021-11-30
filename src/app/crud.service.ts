import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CrudService {
  constructor(private http: HttpClient) {}
  ROOT_URL = "https://widehelwa-server.herokuapp.com/";

  // Product CRUD
  getProducts() {
    return this.http.get(this.ROOT_URL + "product");
  }
  getProductById(id: string) {
    return this.http.get(this.ROOT_URL + "product/" + id);
  }
  postProduct(data: any) {
    return this.http.post(this.ROOT_URL + "product", data);
  }
  updateProduct(id: string, data: any) {
    return this.http.put(this.ROOT_URL + "product/" + id, data);
  }
  deleteProduct(id: string) {
    return this.http.delete(this.ROOT_URL + "product/" + id);
  }
  // category CRUD
  getcategorys() {
    return this.http.get(this.ROOT_URL + "category");
  }
  postcategory(data: any) {
    return this.http.post(this.ROOT_URL + "category", data);
  }
  updatecategory(id: string, data: any) {
    return this.http.put(this.ROOT_URL + "category/" + id, data);
  }
  deletecategory(id: string) {
    return this.http.delete(this.ROOT_URL + "category/" + id);
  }
  // size CRUD
  getsizes() {
    return this.http.get(this.ROOT_URL + "size");
  }
  postsize(data: any) {
    return this.http.post(this.ROOT_URL + "size", data);
  }
  updatesize(id: string, data: any) {
    return this.http.put(this.ROOT_URL + "size/" + id, data);
  }
  deletesize(id: string) {
    return this.http.delete(this.ROOT_URL + "size/" + id);
  }
  // colore CRUD
  getcolores() {
    return this.http.get(this.ROOT_URL + "colore");
  }
  postcolore(data: any) {
    return this.http.post(this.ROOT_URL + "colore", data);
  }
  updatecolore(id: string, data: any) {
    return this.http.put(this.ROOT_URL + "colore/" + id, data);
  }
  deletecolore(id: string) {
    return this.http.delete(this.ROOT_URL + "colore/" + id);
  }
  uploadImg(img) {
    return this.http.post(this.ROOT_URL + "upload", img);
  }
}
