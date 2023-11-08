import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EventAddComponent } from './event-add/event-add.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SongAddComponent } from './song-add/song-add.component';
import { SongsComponent } from './songs/song.component';
import { SongDetailComponent } from './song-detail/song-detail.component';
import { FormsModule } from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';


//Declaración de rutas para añadir navegación entre componentes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'detailEvent/:id', component: EventDetailComponent },
  { path: 'detailUser/:id', component: UserDetailComponent },
  { path: 'detailSong/:id', component: SongDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'eventAdd', component: EventAddComponent },
  { path: 'userAdd', component: UserAddComponent },
  { path: 'songAdd', component: SongAddComponent },
  



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
