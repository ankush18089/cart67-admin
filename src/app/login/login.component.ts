import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({ username: [''], password: [''] });
  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) { }
  error: string;
  ngOnInit(): void {
    this.error = '';
  }
  login() {
    const user = { username: this.loginForm.get('username').value, password: this.loginForm.get('password').value };
    this.auth.login(user).subscribe(res => {
      if (res) {
        this.route.navigate(['home']);
      } else {
        this.error = 'Error occurred !! please re-try.';
      }
    });
  }

}
