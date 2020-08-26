import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupmessageComponent } from '../popupmessage/popupmessage.component';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOffer: FormGroup;
  offerType: string = 'Information';
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private formBuilder: FormBuilder,
    private product: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.offerType = this.data.offer.data.type;
    if (this.data.action === 'update') {
      if (this.data.offer.data.type == 'Information') {
        this.addOffer = this.formBuilder.group({
          name: [this.data.offer.name, Validators.required],
          title: [this.data.offer.title, Validators.required],
          picture: [this.data.offer.picture, [Validators.required,Validators.pattern(this.reg)]],
          sub_text: [this.data.offer.sub_text, Validators.required],
          data: this.formBuilder.group({
            type: [this.data.offer.data.type, Validators.required]
          })

        });
      }
      if (this.data.offer.data.type == 'Collection') {
        this.addOffer = this.formBuilder.group({
          name: [this.data.offer.name, Validators.required],
          title: [this.data.offer.title, Validators.required],
          picture: [this.data.offer.picture, [Validators.required,Validators.pattern(this.reg)]],
          sub_text: [this.data.offer.sub_text, Validators.required],
          data: this.formBuilder.group({
            type: [this.data.offer.data.type, Validators.required],
            collection_id: [this.data.offer.data.collection_id, Validators.required],
            button_text: [this.data.offer.data.button_text, Validators.required],
          })
        });

      }


    } else {
      if (this.offerType == 'Collection') {
        this.addOffer = this.formBuilder.group({
          name: ['', Validators.required],
          title: ['', Validators.required],
          picture: ['', [Validators.required,Validators.pattern(this.reg)]],
          sub_text: ['', Validators.required],
          data: this.formBuilder.group({
            type: [this.offerType, Validators.required],
            collection_id: ['', Validators.required],
            button_text: ['', Validators.required],
          })
        });
      }
      if (this.offerType == 'Information') {
        this.addOffer = this.formBuilder.group({
          name: ['', Validators.required],
          title: ['', Validators.required],
          picture: ['', [Validators.required,Validators.pattern(this.reg)]],
          sub_text: ['', Validators.required],
          data: this.formBuilder.group({
            type: [this.offerType, Validators.required]
          })
        });
      }
    }

  }
  typeChange() {
    if (this.offerType == 'Collection') {
      this.addOffer = this.formBuilder.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        picture: ['', [Validators.required,Validators.pattern(this.reg)]],
        sub_text: ['', Validators.required],
        data: this.formBuilder.group({
          type: [this.offerType, Validators.required],
          collection_id: ['', Validators.required],
          button_text: ['', Validators.required],
        })
      });
    }
    if (this.offerType == 'Information') {
      this.addOffer = this.formBuilder.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        picture: ['', [Validators.required,Validators.pattern(this.reg)]],
        sub_text: ['', Validators.required],
        data: this.formBuilder.group({
          type: [this.offerType, Validators.required]
        })
      });
    }

  }
  create() {
    if(this.addOffer.invalid){
      this.snackBar.openFromComponent(PopupmessageComponent, {
        duration: 2 * 1000,
        data: { data: 'Invalid values ,please try again !!' }
      });
      return;
    }
    this.spinner.show();
    if (this.data.action === 'update') {
      console.log(JSON.stringify(this.addOffer.value));
      this.product.updateOffer(this.data.offer.id, JSON.stringify(this.addOffer.value)).subscribe(res => {
        console.log('updated successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        this.spinner.hide();
        console.log('error occurred while getting data from server   : ' + error.status);
      });
    } else {
      console.log(JSON.stringify(this.addOffer.value));
      this.product.createOffer(JSON.stringify(this.addOffer.value)).subscribe(res => {
        console.log('Added successfully');
        this.spinner.hide();
        this.bottomSheet.dismiss(true);
      }, error => {
        this.spinner.hide();
        console.log('error occurred while getting data from server   : ' + error.status);
      });
    }
  }

}
