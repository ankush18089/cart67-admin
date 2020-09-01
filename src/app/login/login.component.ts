import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from './../services/data.service';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private data: DataService,
    private fb: FormBuilder,
    private route: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) { }
  ngOnInit(): void {

  }

  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider).then(res => {
      this.route.navigate(["/home"]);
    }, err => {
      console.log(err);
    });
  }
}
