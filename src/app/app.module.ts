import { UsersService } from 'src/app/services/users.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SongsService } from 'src/app/services/songs.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, Firestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  provideFirebaseApp(() => initializeApp(environment.firebase)),
	provideAuth(() => getAuth()),
	provideFirestore(() => getFirestore()),
	provideStorage(() => getStorage()),
  HttpClientModule,
  AngularFirestoreModule,
  AngularFireDatabaseModule,
  AngularFireStorageModule,

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
],
  bootstrap: [AppComponent],
})
export class AppModule {}
