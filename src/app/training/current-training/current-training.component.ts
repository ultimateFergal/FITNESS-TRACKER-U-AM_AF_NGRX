import { Component, OnInit/*, Output, EventEmitter*/ } from '@angular/core';

import { TrainingService } from '../training.service';

import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  // @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  // timer: number;
  timer;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {

    this.startOrResumeTimer();

  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {// No importa que tenga error cuando timer es tipo number, es de javascript
      this.progress += 5;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
      progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.trainingService.cancelExercise(this.progress);
        // this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
