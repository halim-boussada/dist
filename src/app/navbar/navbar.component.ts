import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  logedIn: Boolean = true;
  ngOnInit(): void {
    this.authService
      .verify({ token: localStorage.getItem("token") })
      .subscribe((data: any) => {
        if (!data.username) {
          this.router.navigateByUrl("/");
        }
      });
  }
  moveto(to: any) {
    this.router.navigateByUrl(to);
  }
  disconnect() {
    localStorage.setItem("token", "");
    this.logedIn = false;
    this.router.navigateByUrl("/");
  }
}
