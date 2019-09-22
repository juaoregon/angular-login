import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserModel;

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.user = new UserModel();
  }

  register(form:NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Loading...'
    });
    Swal.showLoading();

    this.auth.register(this.user).subscribe(response => {
      Swal.close();
      localStorage.setItem('email', this.user.email);
      this.router.navigateByUrl('/home');
    }, () => {
      Swal.fire({
        type: 'error',
        title: 'Oops!',
        text: 'The email already exists'
      });
    });
  }
}
