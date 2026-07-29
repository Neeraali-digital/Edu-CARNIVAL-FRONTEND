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
  isLoading = true;
  loadedIframes: { [key: string]: boolean } = {};

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const featuredVideo = { 
      id: 100, 
      title: 'Edu Carnival Highlight', 
      video_url: 'https://www.youtube.com/embed/vGDiXwPBUww', 
      is_short: true,
      thumbnail: 'https://img.youtube.com/vi/vGDiXwPBUww/hqdefault.jpg' 
    };

    const rawStaticVideos: any[] = [
      featuredVideo,
      { id: 11, title: 'Edu Carnival Event', video_url: 'https://www.youtube.com/embed/65MDO7svPac', is_short: true },
      { id: 12, title: 'Student Interactions', video_url: 'https://www.youtube.com/embed/wmnhKQdZmzE', is_short: true },
      { id: 9, title: 'Exhibitor Feedback', video_url: 'https://www.youtube.com/embed/2dM_o3pl_Ms', is_short: true },
      { id: 10, title: 'University Stalls', video_url: 'https://www.youtube.com/embed/TmWOefT-P2c', is_short: true },
      { id: 1, title: 'Expo Atmosphere', video_url: 'https://www.youtube.com/embed/gXXsdY4iyVo', is_short: true },
      { id: 2, title: 'Seminar Highlights', video_url: 'https://www.youtube.com/embed/ABBGZKuRcIE', is_short: true },
      { id: 3, title: 'Career Guidance', video_url: 'https://www.youtube.com/embed/iuM7hMV668Y', is_short: true },
      { id: 4, title: 'Spot Admissions', video_url: 'https://www.youtube.com/embed/wzeseUdPNX4', is_short: true },
      { id: 5, title: 'Student Testimonials', video_url: 'https://www.youtube.com/embed/7_z1cenpsJs', is_short: true },
      { id: 6, title: 'Campus Opportunities', video_url: 'https://www.youtube.com/embed/2Fs-n8Soj6I', is_short: true },
      { id: 7, title: 'Higher Education Fair', video_url: 'https://www.youtube.com/embed/GmFHz9vnVJo', is_short: true },
      { id: 8, title: 'Edu Carnival Highlights', video_url: 'https://www.youtube.com/embed/n07-M3-1X2s', is_short: true }
    ];

    this.videos = rawStaticVideos.map(v => ({
      ...v,
      thumbnail: v.thumbnail || this.getThumbnailUrl(v.video_url)
    }));

    this.isLoading = false;

    this.api.getAll('videos').subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const fetched = data.map((video: any) => ({
            ...video,
            video_url: this.getEmbedUrl(video.video_url),
            is_short: video.video_url?.includes('/shorts/'),
            thumbnail: this.getThumbnailUrl(video.video_url)
          }));
          
          const uniqueFetched = fetched.filter((v: any) => !v.video_url?.includes('vGDiXwPBUww'));
          
          this.videos = [
            featuredVideo,
            ...uniqueFetched,
            ...rawStaticVideos.slice(1)
          ];
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });
  }

  getThumbnailUrl(url: string): string {
    if (!url) return '';
    let videoId = '';
    if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else {
      const matchWatch = url.match(/[?&]v=([^&]+)/);
      if (matchWatch) videoId = matchWatch[1];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  }

  getEmbedUrl(url: string): string {
    if (!url) return '';
    let videoId = '';

    const matchWatch = url.match(/[?&]v=([^&]+)/);
    if (matchWatch) {
      videoId = matchWatch[1];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1].split('?')[0];
    } else if (url.includes('embed/')) {
      return url;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  onIframeLoad(id: string | number) {
    this.loadedIframes[id] = true;
    this.cdr.detectChanges();
  }

  isLoaded(id: string | number): boolean {
    return !!this.loadedIframes[id];
  }

  openFullscreen(video: any) {
    this.selectedVideo = video;
  }

  closeFullscreen() {
    this.selectedVideo = null;
  }
}
