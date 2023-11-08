
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: [ './song-add.component.css' ]
})
export class SongAddComponent implements OnInit {
  songAdd: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private SongService: SongService,
    private location: Location,
    
  ) {
  }
  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {

   
    //añadir al eventAdd el idUser despues de haberte registrado
      this.SongService.addSong(this.songAdd)
        .subscribe(() => this.goBack());
    
  }
  
}
