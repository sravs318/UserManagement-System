import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent implements OnChanges{
  @Input() userToEdit:any[]|null=null;
  userForm:FormGroup;
  isEditMode:boolean=false;

  constructor(private fb:FormBuilder,private userService:UserService){
    this.userForm = this.fb.group({
      id:[null],
      name:['',Validators.required],
      gender:['',Validators.required],
      hobbies1:[false],
      hobbies2:[false],
      hobbies3:[false],
      dob:['',Validators.required],
      age:[{value:'',disabled:true}],
      salary:['',Validators.required],
      currency:['',Validators.required],
      colors:[[]],
      address:['',Validators.required],
      phoneNumber:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      postalCode:['',[Validators.required,Validators.pattern(/^\d{5}(-\d{4})?$/)]],
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes ['userToEdit'] && this.userToEdit){
      this.isEditMode = true;
      this.userForm.patchValue(this.userToEdit)
    }else{
      this.isEditMode=false;
      this.userForm.reset();
    }

  }
  onSubmit(){
    const phoneNumberControl=this.userForm.get('phoneNumber')
    if(this.userForm.valid){
      const userData= this.userForm.value;
      const dob = new Date(userData.dob);
      userData.age = this.calculateAge(dob);
      userData.hobbies = this.gethobbies();
      this.userService.addUser(this.userForm.value);
      this.resetForm();
    }else{
      alert('pls provide full number');
    }
  }
  gethobbies(){
    const hobbies = [];
    if(this.userForm.get('hobbies1')?.value)hobbies.push('reading');
    if(this.userForm.get('hobbies2')?.value)hobbies.push('swimming');
    if(this.userForm.get('hobbies3')?.value)hobbies.push('dancing');
    return hobbies;
  }
  ngOnInit(): void{
    this.userForm.get('dob')?.valueChanges.subscribe((dob:string)=>{
      const dateOfBirth = new Date(dob);
      this.userForm.get('age')?.setValue(this.calculateAge(dateOfBirth));
    });
  };
  calculateAge(dob:Date):number{
    const today = new Date()
    let age= today.getFullYear()-dob.getFullYear();
    const monthDiff = today.getMonth()-dob.getMonth();
    if(monthDiff<0||(monthDiff ===0 && today.getDate()<dob.getDate())){
      age--;
    }
    return age;
  }


  resetForm(){
    this.userForm.reset();
    this.isEditMode=false;
  }

}
