import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppState } from './states/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(AppState.loader) public loader$!: Observable<boolean>;
  public showLoader: boolean = false;
  private subscriptions: Subscription = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(
      this.loader$.pipe(delay(100)).subscribe(isActive => this.showLoader = isActive)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
