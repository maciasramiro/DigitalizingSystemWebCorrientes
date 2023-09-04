import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  public loading: boolean = false;

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }
}