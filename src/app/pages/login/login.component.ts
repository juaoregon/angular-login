import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.user = new UserModel();
    this.user.email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
  }

  login(form:NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Loading...'
    });
    Swal.showLoading();

    this.auth.logIn(this.user).subscribe(response => {
      Swal.close();
      localStorage.setItem('email', this.user.email);
      this.router.navigateByUrl('/home');
    }, () => {
      Swal.fire({
        type: 'error',
        title: 'Oops!',
        text: 'The email and password are not correct'
      });
    });
  }
}
