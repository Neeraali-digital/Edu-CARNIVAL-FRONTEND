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

// Admin Components
import { AdminLoginComponent } from './pages/admin/login/login.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardStatsComponent } from './pages/admin/dashboard/stats.component';
import { AdminCitiesComponent } from './pages/admin/cities/cities.component';
import { AdminRegistrationsComponent } from './pages/admin/registrations/registrations.component';
import { AdminInquiriesComponent } from './pages/admin/inquiries/inquiries.component';
import { AdminGalleryComponent } from './pages/admin/gallery/gallery.component';
import { AdminStallsComponent } from './pages/admin/stalls/stalls.component';
import { AdminProgramScheduleComponent } from './pages/admin/program-schedule/program-schedule.component';
import { AdminWheelManagementComponent } from './pages/admin/wheel-management/wheel-management.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Education Expo in India 2026 – College Admission Fair | Edu Carnival' },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'city/:id', component: CityDetailComponent, title: 'City Details - Edu Carnival' },

    // Events
    { path: 'events/upcoming', component: UpcomingEventsComponent, title: 'Upcoming Events - Edu Carnival' },
    { path: 'events/sponsorship', component: ExpoHighlightsComponent, title: 'Tariff & Sponsorship - Edu Carnival' },

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

    // Admin Panel
    { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login - Edu Carnival' },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardStatsComponent },
            { path: 'cities', component: AdminCitiesComponent },
            { path: 'registrations', component: AdminRegistrationsComponent },
            { path: 'inquiries', component: AdminInquiriesComponent },
            { path: 'gallery', component: AdminGalleryComponent },
            { path: 'stalls', component: AdminStallsComponent },
            { path: 'program-schedule', component: AdminProgramScheduleComponent },
            { path: 'wheel-management', component: AdminWheelManagementComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // Wildcard
    { path: '**', redirectTo: '' }
];
