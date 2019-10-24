import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/services/item.service';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';
import { ResponseCodes } from 'src/app/models/ResponseCodesEnums';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-all-company-coupons',
  templateUrl: './get-all-company-coupons.component.html',
  styleUrls: ['./get-all-company-coupons.component.css']
})
export class GetAllCompanyCouponsComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, public itemService: ItemsService, private companyService: CompanyService) { }

  ngOnInit() {
  }

  public getAllCompanyCoupons(id: number) {
    this.companyService.getAllCompanyCoupons(id).subscribe(res => {
      if (res.status === ResponseCodes.OK) { console.log("GET-ALL Company-Coupons success! :) ");
      this.itemService.coupons = JSON.parse(res.body); console.log(this.itemService.coupons); }
      else { console.log("GET-ALL Company-Coupons faild! :( "); }
      if (this.itemService.coupons === null) { this.itemService.coupons = []; console.log("No coupons ! "); alert("No coupons ! "); }
    },
      error =>{
        let resError: HttpErrorResponse = error;
        if(resError.status === ResponseCodes.UNAUTHORIZED){ console.log("session expired"); alert("please login again"); 
        this.router.navigate(["/login"]); }
        else { console.log("GET-ALL Company-Coupons error :( "); }
    });
  }
}
