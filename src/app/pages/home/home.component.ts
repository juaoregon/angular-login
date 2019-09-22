import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userEmail: string;

  constructor(private auth:AuthService, private router:Router) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }
}
