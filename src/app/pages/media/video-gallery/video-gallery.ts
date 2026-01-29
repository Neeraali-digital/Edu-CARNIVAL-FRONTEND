import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './video-gallery.html',
  styleUrl: './video-gallery.css'
})
export class VideoGalleryComponent implements OnInit {
  videos: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.api.getAll('videos').subscribe(data => {
      this.videos = data.map((video: any) => ({
        ...video,
        video_url: this.getEmbedUrl(video.video_url)
      }));
      this.cdr.detectChanges();
    });
  }

  getEmbedUrl(url: string): string {
    if (!url) return '';
    let videoId = '';

    // Handle youtube.com/watch?v=ID
    const matchWatch = url.match(/[?&]v=([^&]+)/);
    if (matchWatch) {
      videoId = matchWatch[1];
    }
    // Handle youtu.be/ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    // Handle youtube.com/embed/ID (already correct)
    else if (url.includes('embed/')) {
      return url;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }
}
