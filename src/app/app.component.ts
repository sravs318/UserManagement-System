import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserformComponent } from "./userform/userform.component";
import { UserlistComponent } from "./userlist/userlist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserformComponent, UserlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cherry';
  userToEdit:any;

  edituser(user:any){
    this.userToEdit=user;
  }
  resetEdit(){
    this.userToEdit=null;
  }
}
