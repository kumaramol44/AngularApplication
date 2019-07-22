import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomDate extends DatePipe {

public transform(date:any):any
{
  return super.transform(date, 'yyyy/MM/dd hh:MM:ss');
}
}
