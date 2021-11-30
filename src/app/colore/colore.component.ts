import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-colore",
  templateUrl: "./colore.component.html",
  styleUrls: ["./colore.component.css"],
})
export class ColoreComponent implements OnInit {
  constructor(private crud: CrudService) {}
  colores: any;
  ngOnInit(): void {
    this.crud.getcolores().subscribe((data) => {
      console.log("colores:", data);
      this.colores = data;
    });
  }
  addcolor(ref: any, color: any, code: any) {
    var c = color || code || ref;
    this.crud.postcolore({ ref: c }).subscribe(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
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
        this.crud.deletecolore(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
}
