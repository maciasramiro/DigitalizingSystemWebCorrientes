import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  public loading: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }
}
