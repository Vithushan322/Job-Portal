import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private firestore: AngularFirestore) { }

  getJobs() {
    return this.firestore.collection('jobs').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getJobsByCategory(category: string) {
    return this.firestore.collection('jobs', ref => ref.where('category', '==', category)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addJob(job: any) {
    return this.firestore.collection('jobs').add(job);
  }

  deleteJob(id: any) {
    return this.firestore.collection('jobs').doc(id).delete();
  }

  updateJob(id: any, job: any) {
    return this.firestore.collection('jobs').doc(id).update(job);
  }
}
