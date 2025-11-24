import { Component, OnInit } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { HasRoleDirective } from "../../shared/directives/has-role.directive";

@Component({
  standalone: true,
  selector: "app-admin",
  imports: [HasRoleDirective, ButtonModule],
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
