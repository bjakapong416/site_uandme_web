import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../../_services/customer/customer.service';

@Component({
  selector: 'app-detail-cus',
  templateUrl: './detail-cus.component.html',
  styleUrls: ['./detail-cus.component.scss']
})
export class DetailCusComponent implements OnInit {

  constructor(private customerService: CustomerService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
