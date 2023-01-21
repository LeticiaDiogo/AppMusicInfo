import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongsaddPageRoutingModule } from './songsadd-routing.module';

import { SongsaddPage } from './songsadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsaddPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SongsaddPage]
})
export class SongsaddPageModule {}
