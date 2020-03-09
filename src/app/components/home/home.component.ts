import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnDestroy {

  public interval;

  public constructor(
  ) {
    this.interval = setInterval(() => {
    }, 1000);
  }

  public ngOnDestroy(): void {
    this.interval = null;
  }

  public get getDate(): string {
    return new Date().toLocaleString().replace(',', ' -');
  }
}
