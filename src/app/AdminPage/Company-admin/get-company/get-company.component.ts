import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/item.service';
import { AdminService } from 'src/app/services/admin.service';
import { ResponseCodes } from 'src/app/models/ResponseCodesEnums';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements OnInit {


  constructor(public companyService:CompanyService, public itemService : ItemsService, private router : Router) { }

  private company: any = {};

  ngOnInit() {
  }

  public getCompany(companyID: number) {
    this.companyService.getCompany(companyID).subscribe(res => {
      if (res.status === ResponseCodes.OK) { console.log("GET company success! :) "+res.body); this.itemService.company = JSON.parse(res.body); console.log(this.itemService.company); }
      else { console.log("GET company faild! :( "); }
    },
    error => {
      let resError: HttpErrorResponse = error;
      if(resError.error === ResponseCodes.UNAUTHORIZED){ console.log("session expired"); alert("please login again"); 
      this.router.navigate(["/login"]); }
      else { console.log("GET company error :( "); }
    });
  }


}
