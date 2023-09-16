import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-reproductor-audio',
  templateUrl: './reproductor-audio.page.html',
  styleUrls: ['./reproductor-audio.page.scss'],
})
export class ReproductorAudioPage implements AfterViewInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  audioSrc: string = '';
  currentSong: any = null;
  isPaused: boolean = true;

  songs = [
    { title: 'Back To Black', src: '/assets/Amy Winehouse - Back To Black.mp3', isPlaying: false },
    { title: 'Do I Wanna Know ', src: '/assets/Arctic Monkeys - Do I Wanna Know  (Official Video).mp3', isPlaying: false },
    { title: 'Cafuné', src: '/assets/Micro TDH - Cafuné (Vídeo Oficial).mp3', isPlaying: false },
    { title: 'Lost On You', src: '/assets/LP - Lost On You (Live).mp3', isPlaying: false },
    { title: 'Stolen Dance', src: '/assets/Milky Chance - Stolen Dance (Official Video).mp3', isPlaying: false },
  ];

  constructor() {
    this.isPaused = true;
  }

  playAudio(song: any) {
    if (this.currentSong !== song) {
      if (this.currentSong) {
        this.pauseAudio(this.currentSong);
      }
      
      this.currentSong = song;
      this.audioSrc = song.src;

      this.audioPlayer.nativeElement.addEventListener('canplaythrough', () => {
        this.audioPlayer.nativeElement.play();
        song.isPlaying = true;
        this.isPaused = false;
      });

      this.audioPlayer.nativeElement.load();
    } else {
      if (this.audioPlayer.nativeElement.paused) {
        this.audioPlayer.nativeElement.play();
        song.isPlaying = true;
        this.isPaused = false;
      } else {
        this.audioPlayer.nativeElement.pause();
        song.isPlaying = false;
        this.isPaused = true;
      }
    }
  }

  pauseAudio(song: any) {
    if (this.audioSrc === song.src) {
      this.audioPlayer.nativeElement.pause();
    }
    song.isPlaying = false;
    this.isPaused = true;
  }

  audioEnded() {
    this.audioPlayer.nativeElement.pause();
    this.currentSong.isPlaying = false;
    this.isPaused = true;
  }

  ngAfterViewInit() {
    console.log('Vista inicializada completamente. Puedes acceder a audioPlayer aquí.');

    this.audioPlayer.nativeElement.addEventListener('canplaythrough', () => {
      if (this.currentSong && this.currentSong.isPlaying) {
        this.audioPlayer.nativeElement.play();
      }
    });
  }
}
