import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  res: any;
  categories: any;
  constructor(private route: Router, private data: DataService
  ) { }

  ngOnInit(): void {
    this.data.getCourse('0', '10', '').subscribe(res => {
      this.res = res['content'];
    }, err => {
      console.log(err);
    });
    this.data.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err);
    });
  }

}
