import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncoderComponent } from './encoder/encoder.component';
import { DecoderComponent } from './decoder/decoder.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: AboutComponent },
  { path: 'encoder', component: EncoderComponent },
  { path: 'decoder', component: DecoderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
