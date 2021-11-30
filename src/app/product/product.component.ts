import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ngxCsv } from "ngx-csv/ngx-csv";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  constructor(private crud: CrudService, private router: Router) {}
  holdList: any = [];
  imageUrl: any = [];
  sizesList: any = [];
  colorsList: any = [];
  sizes: any;
  colors: any;
  categories: any;
  subcategories: any = [];
  products: any;
  s: any;
  ngOnInit(): void {
    this.crud.getProducts().subscribe((data) => {
      console.log("products:", data);
      this.products = data;
      this.holdList = data;
    });
    this.crud.getcategorys().subscribe((data) => {
      console.log("categorys:", data);
      this.categories = data;
    });
    this.crud.getsizes().subscribe((data) => {
      console.log("sizes:", data);
      this.sizes = data;
    });
    this.crud.getcolores().subscribe((data) => {
      console.log("colores:", data);
      this.colors = data;
    });
  }
  doanloadFile() {
    var data = this.products.map((product) => {
      return {
        name: product.name,
        description: product.description,
        price: product.price,
        code: product.code,
        category: product.category,
        subcatergory: product.subcatergory,
        numberOnStock: product.numberOnStock,
        numberOfSalled: product.numberOfSalled,
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
      headers: [
        "Name",
        "Description",
        "Price",
        "Code",
        "Category",
        "Subcatergory",
        "NumberOnStock",
        "NumberOfSalled",
      ],
    };
    new ngxCsv(data, "Report", options);
  }
  setSubCategory(m: any) {
    this.s = m;
  }
  sub(data: any) {
    console.log(data);
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === data) {
        this.subcategories = this.categories[i].subcategory;
      }
    }
  }

  addToColorsList(n: any) {
    if (!n.value.length) {
      return;
    }
    this.colorsList.push(n.value);
    console.log(this.colorsList);
  }
  addToSizesList(n: any) {
    if (!n.value.length) {
      return;
    }
    this.sizesList.push(n.value);
    console.log(this.sizesList);
  }
  imgUpload(img) {
    var formData = new FormData();
    formData.append("img", img.target.files[0]);
    this.crud.uploadImg(formData).subscribe((resp) => {
      this.imageUrl.push(resp["msg"].url);
      console.log("RESP====> ", this.imageUrl);
    });
  }
  addProduct(
    name: any,
    description: any,
    price: any,
    code: any,
    v: any,
    numberOnStock: any
  ): void {
    var obj = {
      name: name,
      image: this.imageUrl,
      description: description,
      price: price,
      code: code,
      size: this.sizesList,
      color: this.colorsList,
      category: v,
      numberOnStock: numberOnStock,
      subcatergory: this.s,
    };
    console.log("jajaja", obj);
    this.crud.postProduct(obj).subscribe(() => {
      this.ngOnInit();
    });
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
        this.crud.deleteProduct(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }

  filter(value: string) {
    this.products = this.holdList;
    var filtred = [];
    for (var i = 0; i < this.products.length; i++) {
      if (
        this.products[i].name.includes(value) ||
        this.products[i].description.includes(value)
      ) {
        filtred.push(this.products[i]);
      }
    }
    this.products = filtred;
  }
  filtercategory(value: string) {
    this.products = this.holdList;
    var filtred = [];
    for (var i = 0; i < this.products.length; i++) {
      console.log(value, this.products[i].category);
      if (this.products[i].category === value) {
        filtred.push(this.products[i]);
      }
    }
    this.products = filtred;
  }
  checkProduct(id) {
    this.router.navigate(["/admin/productdetails"], { queryParams: { id } });
  }
}
