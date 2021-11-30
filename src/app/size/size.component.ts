import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-size",
  templateUrl: "./size.component.html",
  styleUrls: ["./size.component.css"],
})
export class SizeComponent implements OnInit {
  constructor(private crud: CrudService) {}
  sizes: any;
  ngOnInit(): void {
    this.crud.getsizes().subscribe((data) => {
      console.log("sizes:", data);
      this.sizes = data;
    });
  }
  addSizeForm() {
    Swal.fire({
      input: "text",
      inputLabel: "size",
      inputPlaceholder: "Type your new size here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    }).then(({ value }) => {
      this.crud.postsize({ name: value }).subscribe(() => {
        this.ngOnInit();
      });
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
        this.crud.deletesize(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
  confirm(id: any, name: string) {
    this.crud.updatesize(id, { name: name }).subscribe(() => {
      Swal.fire("Updated!", "Your file has been updated.", "success");

      this.ngOnInit();
    });
  }
}
