import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FeedbackService } from "../feedback.service";
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  constructor(private feedbackService: FeedbackService) {}
  feedback: any;
  hold: any;
  ngOnInit(): void {
    this.feedbackService.getContacts().subscribe((data) => {
      console.log(data);
      this.feedback = data;
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
        this.feedbackService.delete(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  }
  openMessage(data: any) {
    this.feedbackService.read(data._id).subscribe(() => {
      this.hold = data;
      document.getElementById("id01").style.display = "block";
      this.ngOnInit();
    });
  }
  closeMessage() {
    document.getElementById("id01").style.display = "none";
  }
}
