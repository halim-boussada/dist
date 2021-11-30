import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  constructor(private crud: CrudService) {}
  localisation: any;
  numbers: any = [];
  updateForm: any = false;
  hold: any;
  ngOnInit(): void {
    this.crud.getcategorys().subscribe((data) => {
      this.localisation = data;
    });
  }
  delete(id: any) {
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
        this.crud.deletecategory(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
  add(n: any) {
    this.numbers.push(n.value);
    n.value = "";
  }
  create(name) {
    var obj = { name, subcategory: this.numbers };
    this.crud.postcategory(obj).subscribe(() => {
      this.numbers = [];
      this.ngOnInit();
    });
  }
  open(data: any) {
    this.updateForm = true;
    this.hold = data;
  }

  changeNumber(newValue: any, index: any) {
    this.hold.subcategory[index] = newValue;
  }
  confirm(name: string) {
    var obj = {
      name: name,
      subcategory: this.hold.subcategory,
    };
    this.crud.updatecategory(this.hold._id, obj).subscribe(() => {
      this.updateForm = false;
      this.ngOnInit();
    });
  }
  cancelUpdate() {
    this.updateForm = false;
  }
}
