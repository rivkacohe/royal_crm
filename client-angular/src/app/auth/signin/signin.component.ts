import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  @ViewChild('first') firstField!: ElementRef;

  signUpForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required, 
    }),
    lastName: new FormControl('',{
      validators:[Validators.required, Validators.required]
    }),
    email: new FormControl('',{
      validators:Validators.email,
    }),
    password: new FormControl('',{
      validators:[Validators.required,Validators.minLength(6),]
    }),
    retypePassword: new FormControl('',{
      validators:[Validators.required,Validators.minLength(6),]
    }),
  });

  onSubmit(){
    if (!this.signUpForm.valid){
      return;
    }
    console.log(this.signUpForm.value);
    console.log((this.signUpForm.valid));
    
    
  }
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();}

  validateData(): boolean {
    if (!this.signUpForm.valid){
      return false;
    }
  
    const password = this.signUpForm.get('password');
    const retypePassword = this.signUpForm.get('retypePassword');

    if (!password || !retypePassword ||
        password.value !== retypePassword.value
    ) {
        return false;
    }

    return true;
  }
}
