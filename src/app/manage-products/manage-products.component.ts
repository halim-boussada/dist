import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage-products",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.css"],
})
export class ManageProductsComponent implements OnInit {
  constructor(private crud: CrudService) {}
  category: any = false;
  product: any = false;
  size: any = false;
  colore: any = false;
  element: any = false;
  ngOnInit(): void {}

  open(elm) {
    this.element = elm;
  }
}
