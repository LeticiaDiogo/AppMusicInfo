import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsaddPage } from './songsadd.page';

const routes: Routes = [
  {
    path: '',
    component: SongsaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsaddPageRoutingModule {}
