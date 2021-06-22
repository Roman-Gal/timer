import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {TimeModel} from "./models/time.model";
import {DefaultTime} from "./models/default.time";
import {TimeCounterService} from "./services/time-counter.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  time: TimeModel = DefaultTime.getDefault();
  subscription?: Subscription;
  isPaused: boolean = true;

  constructor(private timeCounterService: TimeCounterService) {
  }

  ngOnInit(): void {
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.subscription = interval(1000).subscribe(() => {
        this.timeCounterService.countDown(this.time, this.isPaused);
        if (this.time.minutes === 0 && this.time.seconds === 0) {
          this.subscription?.unsubscribe();
          this.isPaused = true;
        }
      })
    } else {
      this.subscription?.unsubscribe();
    }
  }

  resetTime() {
    this.time = DefaultTime.getDefault();
  }
}
