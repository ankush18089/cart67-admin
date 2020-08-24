import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-popupmessage',
  templateUrl: './popupmessage.component.html',
  styleUrls: ['./popupmessage.component.css']
})
export class PopupmessageComponent implements OnInit {

  message: any;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.data;
  }

  ngOnInit(): void {
  }

}
