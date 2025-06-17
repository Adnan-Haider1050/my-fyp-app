import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 
import { UserService } from '../sign-up/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router,private translate: TranslateService
) {}

  onSubmit() {
  const loginData = this.loginForm.value;

  this.userService.loginUser(loginData).subscribe({
    next: (response) => {
      console.log('Login Successful:', response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.user.role);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Show success alert
      Swal.fire({
  icon: 'success',
  title: this.translate.instant('LOGIN1.SUCCESS_TITLE'),
  text: this.translate.instant('LOGIN1.SUCCESS_TEXT'),
  timer: 2000,
  showConfirmButton: false
});

      // Redirect after slight delay
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 2000);
    },
    error: (error) => {
      console.error('Login failed:', error);

      // Show error alert
     Swal.fire({
  icon: 'error',
  title: this.translate.instant('LOGIN1.ERROR_TITLE'),
  text: this.translate.instant('LOGIN1.ERROR_TEXT')
});

    }
  });
}
}
