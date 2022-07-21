import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { RegisterUser } from 'src/app/shared/types';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  @ViewChild('first') firstField!: ElementRef;

  signUpForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required, 
    }),
    last_name: new FormControl('',{
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
    const value: RegisterUser = this.signUpForm.value;

        const details = {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            password: value.password
        };

        this.apiService.register(details).subscribe({
            next: (data) => {
                // todo: show message to user
                console.log('registered')
            },
            error: (err) => console.log(err)
        })
    
    
  }
  constructor(private apiService: ApiService) { }

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
