import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.css"],
})
export class ManagerComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/admin/manage");
    }
  }
  login(username: string, password: string) {
    this.authService.login({ username, password }).subscribe((data: any) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        alert(data.msg);
      }
    });
  }
}
