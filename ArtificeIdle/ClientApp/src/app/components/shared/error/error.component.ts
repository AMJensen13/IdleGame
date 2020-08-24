import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent implements OnInit {
  message: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) 
  { 
    this.message = data.message;
  }

  ngOnInit(): void {
  }

}
