import { Component, OnInit } from "@angular/core";
import { CrudService } from "../crud.service";
import { UserService } from "../user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-users",

  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any = [];

  constructor(private crud: CrudService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
