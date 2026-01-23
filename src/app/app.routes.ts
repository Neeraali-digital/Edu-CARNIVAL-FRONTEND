import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StallsComponent } from './pages/stalls/stalls';
import { BrochureComponent } from './pages/brochure/brochure';
import { ContactComponent } from './pages/contact/contact';
import { UpcomingEventsComponent } from './pages/events/upcoming-events/upcoming-events';
import { ExpoHighlightsComponent } from './pages/events/expo-highlights/expo-highlights';
import { ExhibitorRegistrationComponent } from './pages/registration/exhibitor-registration/exhibitor-registration';
import { ParticipantRegistrationComponent } from './pages/registration/participant-registration/participant-registration';
import { PhotoGalleryComponent } from './pages/media/photo-gallery/photo-gallery';
import { VideoGalleryComponent } from './pages/media/video-gallery/video-gallery';

import { CityDetailComponent } from './pages/cities/city-detail/city-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Edu Carnival - Home' },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'city/:id', component: CityDetailComponent, title: 'City Details - Edu Carnival' },


    // Events
    { path: 'events/upcoming', component: UpcomingEventsComponent, title: 'Upcoming Events - Edu Carnival' },
    { path: 'events/expo-highlights', component: ExpoHighlightsComponent, title: 'Expo Highlights - Edu Carnival' },

    // Registration
    { path: 'registration/exhibitor', component: ExhibitorRegistrationComponent, title: 'Exhibitor Registration - Edu Carnival' },
    { path: 'registration/participant', component: ParticipantRegistrationComponent, title: 'Participant Registration - Edu Carnival' },

    // Media
    { path: 'media/photos', component: PhotoGalleryComponent, title: 'Photo Gallery - Edu Carnival' },
    { path: 'media/videos', component: VideoGalleryComponent, title: 'Video Gallery - Edu Carnival' },

    // Other Main Links
    { path: 'stalls', component: StallsComponent, title: 'Stalls - Edu Carnival' },
    { path: 'brochure', component: BrochureComponent, title: 'Brochure - Edu Carnival' },
    { path: 'contact', component: ContactComponent, title: 'Contact Us - Edu Carnival' },

    // Wildcard
    { path: '**', redirectTo: '' }
];
