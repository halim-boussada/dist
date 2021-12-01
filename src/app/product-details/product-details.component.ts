import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private crud: CrudService, private route: ActivatedRoute) {}
  id: string;
  product: any;
  sizes: any;
  colors: any;
  categories: any;
  subcategories: any = [];
  addSizeForm: any = false;
  addColorForm: any = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.crud.getProductById(params.id).subscribe((data: any) => {
        this.product = data[0];
        console.log("dazzzzzzz", this.product);
      });
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
  sub(data: any) {
    console.log(data);
    this.product.category = data;
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === data) {
        this.subcategories = this.categories[i].subcategory;
      }
    }
  }
  openSizeForm() {
    this.addSizeForm = true;
  }
  closeSizeForm() {
    this.addSizeForm = false;
  }
  addSize(newSize: any) {
    if (!newSize) {
      return;
    } else {
      this.product.size.push(newSize);
      this.addSizeForm = false;
    }
  }
  deleteSize(index) {
    this.product.size.splice(index, 1);
  }

  openColorForm() {
    this.addColorForm = true;
  }
  closeColorForm() {
    this.addColorForm = false;
  }
  addColor(newColor: any) {
    if (!newColor) {
      return;
    } else {
      this.product.color.push(newColor);
      this.addColorForm = false;
    }
  }
  deleteColor(index) {
    this.product.color.splice(index, 1);
  }
  changeSize(newValue: any, index: any) {
    this.product.size[index] = newValue;
  }
  changeColor(newValue: any, index: any) {
    this.product.color[index] = newValue;
  }
  modify(key: string, newValue: any) {
    console.log(this.product);
    this.product[key] = newValue;
    console.log(this.product);
  }
  imgUpload(img) {
    var formData = new FormData();
    formData.append("img", img.target.files[0]);
    this.crud.uploadImg(formData).subscribe((resp) => {
      this.product.image.push(resp["msg"].url);
    });
  }
  delete(index) {
    this.product.image.splice(index, 1);
  }
  saveUpdate() {
    var id = this.product._id;
    var obj = {
      name: this.product.name,
      image: this.product.image,
      description: this.product.description,
      price: this.product.price,
      code: this.product.code,
      size: this.product.size,
      color: this.product.color,
      category: this.product.category,
      subcatergory: this.product.subcatergory,
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, save the changes!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.crud.updateProduct(id, this.product).subscribe(() => {
            swalWithBootstrapButtons.fire(
              "Updated!",
              "Your product has been Updated.",
              "success"
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your product is safe :)",
            "error"
          );
        }
      });
  }
}
