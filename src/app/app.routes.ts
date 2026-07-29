import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { EducationExpoLandingComponent } from './pages/landing/education-expo/education-expo';
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
import { BlogListComponent } from './pages/blogs/blog-list/blog-list';
import { BlogDetailComponent } from './pages/blogs/blog-detail/blog-detail';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy';


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
    { path: 'education-expo', loadComponent: () => import('./pages/landing/education-expo/education-expo').then(m => m.EducationExpoLandingComponent), title: 'Higher Education Exhibition | Edu Carnival Education Expo' },
    { path: 'city/:id', loadComponent: () => import('./pages/cities/city-detail/city-detail.component').then(m => m.CityDetailComponent), title: 'City Details - Edu Carnival' },

    // Events
    { path: 'events/upcoming', loadComponent: () => import('./pages/events/upcoming-events/upcoming-events').then(m => m.UpcomingEventsComponent), title: 'Upcoming Events - Edu Carnival' },
    { path: 'events/sponsorship', loadComponent: () => import('./pages/events/expo-highlights/expo-highlights').then(m => m.ExpoHighlightsComponent), title: 'Tariff & Sponsorship - Edu Carnival' },

    // Registration
    { path: 'registration/exhibitor', loadComponent: () => import('./pages/registration/exhibitor-registration/exhibitor-registration').then(m => m.ExhibitorRegistrationComponent), title: 'Exhibitor Registration - Edu Carnival' },
    { path: 'registration/participant', loadComponent: () => import('./pages/registration/participant-registration/participant-registration').then(m => m.ParticipantRegistrationComponent), title: 'Participant Registration - Edu Carnival' },

    // Media - Lazy Loaded
    { path: 'media/photos', loadComponent: () => import('./pages/media/photo-gallery/photo-gallery').then(m => m.PhotoGalleryComponent), title: 'Photo Gallery - Edu Carnival' },
    { path: 'media/videos', loadComponent: () => import('./pages/media/video-gallery/video-gallery').then(m => m.VideoGalleryComponent), title: 'Video Gallery - Edu Carnival' },

    // Other Main Links
    { path: 'stalls', loadComponent: () => import('./pages/stalls/stalls').then(m => m.StallsComponent), title: 'Stalls - Edu Carnival' },
    { path: 'brochure', loadComponent: () => import('./pages/brochure/brochure').then(m => m.BrochureComponent), title: 'Brochure - Edu Carnival' },
    { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent), title: 'Contact Us - Edu Carnival' },
    { path: 'blogs', loadComponent: () => import('./pages/blogs/blog-list/blog-list').then(m => m.BlogListComponent), title: 'Blogs - Edu Carnival' },
    { path: 'blogs/:id', loadComponent: () => import('./pages/blogs/blog-detail/blog-detail').then(m => m.BlogDetailComponent), title: 'Blog Details - Edu Carnival' },
    { path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicyComponent), title: 'Privacy Policy - Edu Carnival' },


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
