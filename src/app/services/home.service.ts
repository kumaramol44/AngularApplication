import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../models/page';
import { PagedData } from '../models/paged-data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  tempData: any;
  params = new HttpParams;

  constructor(private http: HttpClient) { }

  public getResults(page: Page) {
    //this.tempData=this.getAllTransactions();
    return of(this.tempData).pipe(map(data => this.getPagedData(page)));
  }

  getPagedData(page: Page) {
    const pagedData = new PagedData();
    page.totalElements = this.tempData.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min((start + page.size), page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = this.tempData[i];
      pagedData.data.push(jsonObj);
    }
    pagedData.page = page;
    return pagedData;
  }
  getAllTransactions(page: Page) {
    this.http.get('http://localhost:44318/api/transactions').subscribe(data => {
      this.tempData = data;
      const pagedData = new PagedData();
      page.totalElements = this.tempData.length;
      page.totalPages = page.totalElements / page.size;
      const start = page.pageNumber * page.size;
      const end = Math.min((start + page.size), page.totalElements);
      for (let i = start; i < end; i++) {
        const jsonObj = this.tempData[i];
        pagedData.data.push(jsonObj);
      }
      pagedData.page = page;
      return pagedData;
    });
    // return this.tempData;
  }
  getTransactions(params) {
    return this.http.get('http://localhost:44318/api/transactions', { params });
  }

  saveTransaction(model) {
    return this.http.put('http://localhost:44318/api/transactions/add?id=' + model.id, model);
  }

}


