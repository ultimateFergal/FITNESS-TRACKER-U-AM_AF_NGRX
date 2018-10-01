
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
    private runningExercise: Exercise;
    // private exercises: Exercise[] = [];
    // private finishedExercises: Exercise[] = [];

    constructor(private db: AngularFirestore) { }

    // getAvailableExercises() {
    fetchAvailableExercises() {
        // return this.availableExercises.slice(); // Creates a real copy of the array
        this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            // ...doc.payload.doc.data()
                            name: doc.payload.doc.data().name,
                            duration: doc.payload.doc.data().duration,
                            calories: doc.payload.doc.data().calories
                        };
                    });
                })
            )
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            });
    }

    startExercise(selectedId: string) {
        // this.db.doc('availableExercises/' + selectedId).update({ lastSelected: new Date()}); //Adds field to a document
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        // this.exercises.push({
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        // this.exercises.push({
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'canceled'
        }); //
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    /*
    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
    */

    fetchCompletedOrCancelledExercises() {
        return this.db
            .collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                // this.finishedExercises = exercises;
                this.finishedExercisesChanged.next(exercises);
            });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}
