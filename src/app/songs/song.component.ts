import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service'; 

@Component({
  selector: 'app-songs',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];

  constructor(private SongService: SongService) { }
  
  //Ordena obtener los 'events' cuando se inicializa la pagina
  ngOnInit(): void {
    this.getSongs();
  }
  // Obtiene los 'heroes' proporcionados por el HeroService que a la vez le llegan del fichero de mock heroes
  getSongs(): void {
    this.SongService.getSongs()
    .subscribe(songs => this.songs = songs);
  }
  add(songName: string): void {
    songName = songName.trim();
    if (!songName) { return; }
    this.SongService.addSong({ songName } as Song)
      .subscribe(song => {
        this.songs.push(song);
      });
  }
  delete(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
    this.SongService.deleteSong(song._id).subscribe();
  }

  
}