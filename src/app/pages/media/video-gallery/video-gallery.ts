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
  selectedVideo: any = null;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // Add static placeholders for now
    this.videos = [
      { id: 11, title: '', video_url: 'https://www.youtube.com/embed/65MDO7svPac', is_short: true },
      { id: 12, title: '', video_url: 'https://www.youtube.com/embed/wmnhKQdZmzE', is_short: true },
      { id: 9, title: '', video_url: 'https://www.youtube.com/embed/2dM_o3pl_Ms', is_short: true },
      { id: 10, title: '', video_url: 'https://www.youtube.com/embed/TmWOefT-P2c', is_short: true },
      { id: 1, title: '', video_url: 'https://www.youtube.com/embed/gXXsdY4iyVo', is_short: true },
      { id: 2, title: '', video_url: 'https://www.youtube.com/embed/ABBGZKuRcIE', is_short: true },
      { id: 3, title: '', video_url: 'https://www.youtube.com/embed/iuM7hMV668Y', is_short: true },
      { id: 4, title: '', video_url: 'https://www.youtube.com/embed/wzeseUdPNX4', is_short: true },
      { id: 5, title: '', video_url: 'https://www.youtube.com/embed/7_z1cenpsJs', is_short: true },
      { id: 6, title: '', video_url: 'https://www.youtube.com/embed/2Fs-n8Soj6I', is_short: true },
      { id: 7, title: '', video_url: 'https://www.youtube.com/embed/GmFHz9vnVJo', is_short: true },
      { id: 8, title: '', video_url: 'https://www.youtube.com/embed/n07-M3-1X2s', is_short: true }
    ];

    this.api.getAll('videos').subscribe(data => {
      if (data && data.length > 0) {
        this.videos = data.map((video: any) => ({
          ...video,
          video_url: this.getEmbedUrl(video.video_url),
          is_short: video.video_url?.includes('/shorts/')
        }));
      }
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
    // Handle youtube.com/shorts/ID
    else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1].split('?')[0];
    }
    // Handle youtube.com/embed/ID (already correct)
    else if (url.includes('embed/')) {
      return url;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  openFullscreen(video: any) {
    this.selectedVideo = video;
  }

  closeFullscreen() {
    this.selectedVideo = null;
  }
}
