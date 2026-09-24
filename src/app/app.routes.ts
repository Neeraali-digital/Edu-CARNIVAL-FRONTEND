import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

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
    { path: 'admin/login', loadComponent: () => import('./pages/admin/login/login.component').then(m => m.AdminLoginComponent), title: 'Admin Login - Edu Carnival' },
    {
        path: 'admin',
        loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.AdminDashboardComponent),
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/stats.component').then(m => m.DashboardStatsComponent) },
            { path: 'cities', loadComponent: () => import('./pages/admin/cities/cities.component').then(m => m.AdminCitiesComponent) },
            { path: 'registrations', loadComponent: () => import('./pages/admin/registrations/registrations.component').then(m => m.AdminRegistrationsComponent) },
            { path: 'inquiries', loadComponent: () => import('./pages/admin/inquiries/inquiries.component').then(m => m.AdminInquiriesComponent) },
            { path: 'gallery', loadComponent: () => import('./pages/admin/gallery/gallery.component').then(m => m.AdminGalleryComponent) },
            { path: 'stalls', loadComponent: () => import('./pages/admin/stalls/stalls.component').then(m => m.AdminStallsComponent) },
            { path: 'program-schedule', loadComponent: () => import('./pages/admin/program-schedule/program-schedule.component').then(m => m.AdminProgramScheduleComponent) },
            { path: 'wheel-management', loadComponent: () => import('./pages/admin/wheel-management/wheel-management.component').then(m => m.AdminWheelManagementComponent) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // Wildcard
    { path: '**', redirectTo: '' }
];
