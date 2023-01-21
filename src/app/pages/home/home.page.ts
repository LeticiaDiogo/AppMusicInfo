
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Song } from 'src/app/interfaces/songs';

import { collectionData, collection, addDoc, Firestore, doc, docSnapshots } from '@angular/fire/firestore';
import { map, Observable, Subscription } from 'rxjs';
import { SongsService } from 'src/app/services/songs.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public songs = Array<Song>();
  private SongsSubscription: Subscription;

  constructor(
    private firestoreService: SongsService,
    private authService:AuthService,
    private router: Router,
  ) {
    this.SongsSubscription = this.firestoreService.list().subscribe(data => {
      this.songs = data;
  })}

  async addpage() {
		this.router.navigateByUrl('songsadd', { replaceUrl: true });
	}



  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/login', { replaceUrl: true });
	}
}
