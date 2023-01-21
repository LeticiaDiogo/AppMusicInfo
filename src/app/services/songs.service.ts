
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Song } from '../interfaces/songs';


@Injectable({
  providedIn: 'root'
})
export class SongsService {


  constructor(private firestore: Firestore) {}

  find(id: string): Observable<Song> {
    const document = doc(this.firestore, `Songs/${id}`);
    return docSnapshots(document)
      .pipe(
        map(doc => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Song;
        })
      );
  }

  list(): Observable<Song[]> {
    const SongCollection = collection(this.firestore, 'Songs');
    return collectionData(SongCollection, {idField: 'id'})
      .pipe(
        map(result => result as Song[])
      );
  }

  createSong(
    albumName: string,
    artistName: string,
    songDescription: string,
    songName: string,
  ): Promise<any> {
    return addDoc(collection(this.firestore, "Songs"), {
      songName,
      albumName,
      artistName,
      songDescription,
    });
  }}


