import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, tap } from 'rxjs/operators';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  enrollments: any[] = [];
  constructor(private afAuth: AngularFireAuth, private route: Router, private data: DataService,) { }
  name: string;
  ngOnInit(): void {
   
    this.afAuth.authState.pipe(first()).pipe(
      tap(user => {
        if (user) {
         this.name = user.displayName;
         user.getIdToken().then(res2 => {
           this.data.getMyEnrollment(res2).subscribe((res: any[]) => {
             this.enrollments = res;
           });
         });
        } else {
          this.route.navigate(["/login"]);
        }
      })
    )
    .subscribe()
  }
  logout() {
    this.afAuth.signOut();
    this.route.navigate(["/home"]);
  }
}
