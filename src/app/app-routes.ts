import { Route } from "@angular/router";
import { AddToDoComponent } from "./add-to-do/add-to-do.component";
import { HomeComponent } from "./home/home.component";

export const ROUTES: Route[] = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'add-to-do', component: AddToDoComponent
  }
];

