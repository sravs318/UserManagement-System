import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any[]>([]);
  users$=this.userSubject.asObservable();
  private users:any[]=[];

  constructor() { }

  addUser(user:any){
    if(user.id){
      const index = this.users.findIndex(u=>u.id===user.id);
      if(index!==-1){
        this.users[index]=user;
      }else{
        console.error('user not found');
      }
    }else{
      user.id = this.users.length? Math.max(...this.users.map(u=>u.id))+1:1;
      this.users.push(user);
    }
    this.userSubject.next([...this.users]);
  }
  deleteUser(id:number){
    this.users = this.users.filter(u =>u.id!==id);
    this.userSubject.next([...this.users]);
  }
}
