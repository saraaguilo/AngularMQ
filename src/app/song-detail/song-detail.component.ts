
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: [ './song-detail.component.css' ]
})
export class SongDetailComponent implements OnInit {
  song: Song | undefined;

  constructor(
    private route: ActivatedRoute,
    private SongService: SongService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSong();
  }
  // Función que obtiene los detalles del event que ha sido especificado por el usuario
  getSong(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log("id",id);
    this.SongService.getSong(id)
      .subscribe(song => this.song = song);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.song) {
    //deconstrucció
      let{_id, createdAt, updatedAt, ... savedSong} = this.song;
      this.SongService.updateSong(this.song._id, savedSong)
        .subscribe(() => this.goBack());
    }
  }
  
}
