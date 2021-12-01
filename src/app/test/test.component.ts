import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"],
})
export class TestComponent implements OnInit {
  constructor(private crud: CrudService) {}
  result2: any = [];
  result1: any = [];
  test: any = [];
  categories: any = [];
  data: any;
  products: any;
  holdList: any;
  ngOnInit(): void {
    this.crud.getProducts().subscribe((data) => {
      this.products = data;
      this.holdList = data;
      console.log("dazazd", data);
    });
    this.crud.getcategorys().subscribe((data: any) => {
      var array = [];
      this.data = data;
      for (var i = 0; i < data.length; i++) {
        this.categories.push(data[i].name);
        array = array.concat(data[i].subcategory);
      }
      console.log(this.data);
      this.test = array;
      this.result1 = this.test.slice(0, 4);
      this.result2 = this.test.slice(4, 8);
    });
  }
  start: any = 1;
  end: any = 9;
  inc() {
    if (this.start === this.test.length) {
      this.start = 0;
    }
    if (this.end === this.test.length) {
      this.end = 0;
    }
    var res = [];
    if (this.end > this.start) {
      for (var i = this.start; i < this.end; i++) {
        res.push(this.test[i]);
      }
      this.start++;
      this.end++;
    } else {
      for (var i = this.start; i < this.test.length; i++) {
        res.push(this.test[i]);
      }
      for (var j = 0; j < this.end; j++) {
        res.push(this.test[j]);
      }
      this.start++;
      this.end++;
    }
    this.result1 = res.slice(0, 4);
    this.result2 = res.slice(4, res.length);
  }
  filtercategory(value: string) {
    this.products = this.holdList;
    var filtred = [];
    for (var i = 0; i < this.products.length; i++) {
      console.log(value, this.products[i].category);
      if (
        this.products[i].category.toUpperCase().includes(value.toUpperCase())
      ) {
        filtred.push(this.products[i]);
      }
    }
    this.products = filtred;
  }

  filterSubcategory(value: string) {
    this.products = this.holdList;
    var filtred = [];
    for (var i = 0; i < this.products.length; i++) {
      console.log(value, this.products[i].subcatergory);
      if (this.products[i].subcatergory) {
        if (
          this.products[i].subcatergory
            .toUpperCase()
            .includes(value.toUpperCase())
        ) {
          filtred.push(this.products[i]);
        }
      }
    }
    this.products = filtred;
  }
  dec() {
    this.start--;
    this.end--;
    if (this.start === -1) {
      this.start = this.test.length;
    }
    if (this.end === -1) {
      this.end = this.test.length;
    }

    var res = [];
    if (this.end > this.start) {
      for (var i = this.start; i < this.end; i++) {
        res.push(this.test[i]);
      }
    } else {
      for (var i = this.start; i < this.test.length; i++) {
        res.push(this.test[i]);
      }
      for (var j = 0; j < this.end; j++) {
        res.push(this.test[j]);
      }
    }
    this.result1 = res.slice(0, 4);
    this.result2 = res.slice(4, res.length);
  }
}
