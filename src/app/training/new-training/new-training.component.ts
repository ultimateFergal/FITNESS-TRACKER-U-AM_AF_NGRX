import { Component, OnInit, /*, EventEmitter, Output */OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // @Output() trainingStart = new EventEmitter<void>();

  // exercises: Exercise[] = [];
  // exercises: Observable<any>;
  // exercises: Observable<Exercise[]>;
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => this.exercises = exercises);
    this.trainingService.fetchAvailableExercises();
    // this.exercises =

    // this.exercises = this.db.collection('availableExercises').valueChanges(); // Doesnt bring the id
    /*
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
      map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      )
      .subscribe( result => {
        console.log(result);
      */

    /*
    for ( const res of result) {
      console.log(res.payload.doc.data());
    }
     */


    /*
    this.db
      .collection('availableExercises')
      .valueChanges()
      .subscribe( result => {
        console.log(result);
    });
    */

    // this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
