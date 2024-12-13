import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{
  @Output() editUser=new EventEmitter<any>();
  users:any[]|undefined;

  constructor(private userSerVice:UserService){}

  ngOnInit() {
    this.userSerVice.users$.subscribe(user =>{
      this.users=user;
    });

  }
  onEdit(user:any){
    this.editUser.emit(user);
  }
  onDelete(id:number){
    this.userSerVice.deleteUser(id);
  }

}
