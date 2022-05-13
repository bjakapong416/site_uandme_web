import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-stock',
  templateUrl: './detail-stock.component.html',
  styleUrls: ['./detail-stock.component.scss']
})
export class DetailStockComponent implements OnInit {
  @Input() id: any;
  @Input() name: any;
  @Input() qty: any;
  @Input() unit: any;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
