import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CameraDirection } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-songsadd',
  templateUrl: './songsadd.page.html',
  styleUrls: ['./songsadd.page.scss'],
})
export class SongsaddPage{
  createSongForm: FormGroup;


  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: SongsService,
    formBuilder: FormBuilder,
    private authService:AuthService,
    private router: Router,
  ){ this.createSongForm = formBuilder.group({
    albumName: ['',],
    artistName: ['', Validators.required],
    songDescription: ['', ],
    songName: ['', Validators.required],
  });

  }

  async createSong() {
    const loading = await this.loadingCtrl.create();

    const albumName = this.createSongForm.value.albumName;
    const artistName = this.createSongForm.value.artistName;
    const songDescription = this.createSongForm.value.songDescription;
    const songName = this.createSongForm.value.songName;


    this.firestoreService
      .createSong(albumName, artistName, songDescription, songName)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/home');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

    return await loading.present();
  }

  async backpage() {
		this.router.navigateByUrl('/home', { replaceUrl: true });
	}

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/login', { replaceUrl: true });
	}
}
