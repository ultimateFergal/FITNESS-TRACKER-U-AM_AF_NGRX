import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  // timer: number;
  timer;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {

    this.timer = setInterval(() => {// No importa que tenga error cuando timer es tipo number, es de javascript
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);

  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent);
  }

}
