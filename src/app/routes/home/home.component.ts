import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { formatDate } from '@angular/common';
import { Page } from '../../models/page';
import { PagedData } from '../../models/paged-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionModel } from '../contact/contact-model';
import { CustomDate } from 'src/app/services/customDate';
import { DatatableComponent } from '@swimlane/ngx-datatable';

// import '~@swimlane/ngx-datatable/release/index.css';
// import '~@swimlane/ngx-datatable/release/themes/material.css';
// import '~@swimlane/ngx-datatable/release/assets/icons.css';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  // @ViewChild('table', { read: true, static: false }) table: DatatableComponent;


  // page = new Page();
  transactionForm: FormGroup;
  rows = [];
  temp = [];
  display = 'none'; //default Variable 
  searchText = '';
  pagedData = new PagedData();
  columns = [
    { prop: 'TransactionId' },
    { prop: 'CustomersId' },
    { prop: 'TransactionDate', pipe: new CustomDate("en-Us") },
    { prop: 'SendingAmount' },
    { prop: 'RecievingAmount' },
    { prop: 'Fees' },
    { prop: 'SendingCurrency' },
    { prop: 'RecievingCurrency' }
  ];

  page = {
    limit: 10,
    count: 0,
    offset: 0,
    orderBy: 'CustomersId',
    orderDir: 'desc'
  };


  @ViewChild('myTable', { static: false }) table: DatatableComponent;

  constructor(private formBuilder: FormBuilder, private homeService: HomeService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {

    //this.table=$(this.table.nativeElement);
    this.transactionForm = this.formBuilder.group({
      id: [''],
      sendingAmount: ['', Validators.required],
      recievingAmount: ['', [Validators.required]],
      sendingCurrency: ['', [Validators.required]],
      recievingCurrency: ['', [Validators.required]],
    });
    this.pageCallback({ offset: 0 });

  }

  updateFilter(event) {

    this.searchText = event.target.value.toLowerCase();
    this.reloadTable();

    // const temp = this.temp.filter(function (d) {      
    //   return Object.values(d).toString().toLowerCase().includes(val);      
    // });    

    // this.rows = temp;    
  }

  openModalDialog(event, row: any) {
    this.transactionForm.controls['id'].setValue(row.Id);
    this.transactionForm.controls['sendingAmount'].setValue(row.SendingAmount);
    this.transactionForm.controls['recievingAmount'].setValue(row.RecievingAmount);
    this.transactionForm.controls['sendingCurrency'].setValue(row.SendingCurrency);
    this.transactionForm.controls['recievingCurrency'].setValue(row.RecievingCurrency);

    console.log(row);
    this.display = 'block'; //Set block css

  }

  closeModalDialog() {
    this.display = 'none'; //set none css after close dialog
  }

  saveChanges(model: TransactionModel) {
    this.spinner.show();
    this.homeService.saveTransaction(model).subscribe((data: any) => {
      this.spinner.hide();

      let row = this.rows.find(x => x.Id == data.Id);
      let index = this.rows.indexOf(row);
      this.rows[index] = data;
      console.log(this.rows)
      this.showModal("Saved Successfully!!");
      this.closeModalDialog();
    },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      })
  }

  showModal(errMessage) {
    Swal.fire(errMessage);
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.reloadTable();
  }

  reloadTable() {
    // NOTE: those params key values depends on your API!
    const params = new HttpParams()
      .set('orderColumn', this.page.orderBy)
      .set('orderDir', this.page.orderDir)
      .set('pageNumber', this.page.offset.toString())
      .set('pageSize', this.page.limit.toString())
      .set('searchText', this.searchText);

    this.homeService.getTransactions(params).subscribe((data: any) => {
      // NOTE: the format of the returned data depends on your API!
      this.page.count = data.Count;
      this.rows = data.Rows;
    });
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.reloadTable();
  }

  toggleExpandRow(row) {
    debugger
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
