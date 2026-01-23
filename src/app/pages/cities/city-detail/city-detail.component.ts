import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'app-city-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './city-detail.html',
    styleUrl: './city-detail.component.css',
})
export class CityDetailComponent implements OnInit {
    city: any;

    cities = [
        {
            id: 'jammu',
            name: 'Jammu',
            image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1000',
            date: 'March 15-16, 2026',
            location: 'Convention Centre, Jammu',
            description: 'Experience the Grand Edu Expo in Jammu, the city of temples. Connect with top international universities, attend career workshops, and explore scholarship opportunities tailored for students from the region.',
            programDetails: [
                { title: 'Inauguration Ceremony', time: '10:00 AM', description: 'Opening speech by eminent educationists.' },
                { title: 'University Expo', time: '11:00 AM - 5:00 PM', description: 'Interact with reps from 50+ global universities.' },
                { title: 'Scholarship Seminar', time: '02:00 PM', description: 'Learn how to secure 100% funding for your studies.' },
                { title: 'Fun Zone Activites', time: 'All Day', description: 'Engage in games, VR experiences, and lucky draws.' }
            ]
        },
        {
            id: 'gangtok',
            name: 'Gangtok',
            image: 'https://images.unsplash.com/photo-1589136142558-94675c602490?auto=format&fit=crop&q=80&w=1000',
            date: 'March 20-21, 2026',
            location: 'Manan Kendra, Gangtok',
            description: 'The Edu Expo heads to the serene hills of Gangtok. A perfect opportunity for students in Sikkim and North Bengal to meet global education experts amidst the majestic Kanchenjunga backdrop.',
            programDetails: [
                { title: 'Morning Meetup', time: '10:30 AM', description: 'Networking session for students and counselors.' },
                { title: 'Global Education Fair', time: '11:00 AM - 6:00 PM', description: 'Explore study destinations across 15+ countries.' },
                { title: 'IELTS/TOEFL Workshop', time: '01:00 PM', description: 'Expert tips on cracking English proficiency tests.' },
                { title: 'Cultural Performance', time: '05:30 PM', description: 'Local talent showcasing the spirit of Sikkim.' }
            ]
        },
        {
            id: 'imphal',
            name: 'Imphal',
            image: 'https://images.unsplash.com/photo-1571401664426-382045997230?auto=format&fit=crop&q=80&w=1000',
            date: 'March 25-26, 2026',
            location: 'City Convention Centre, Imphal',
            description: 'Imphal welcomes the Edu Expo with open arms. Discover a world of possibilities in the heart of Manipur. We bring the best of international education directly to you.',
            programDetails: [
                { title: 'Tech in Education Panel', time: '11:00 AM', description: 'Discussing the future of digital learning.' },
                { title: 'Career Path Mapping', time: '12:00 PM - 4:00 PM', description: 'One-on-one sessions with professional counselors.' },
                { title: 'Visa Assistance Booth', time: 'All Day', description: 'Step-by-step guidance on student visa processes.' },
                { title: 'Mega Lucky Draw', time: '04:30 PM', description: 'Win laptops, tablets, and educational vouchers.' }
            ]
        },
        {
            id: 'dimapur',
            name: 'Dimapur',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
            date: 'March 30-31, 2026',
            location: 'Agri Expo Center, Dimapur',
            description: 'Nagaland\'s commercial hub, Dimapur, hosts the biggest educational event of the year. Don\'t miss this chance to transform your academic journey with global exposure.',
            programDetails: [
                { title: 'Skill Development Workshop', time: '10:00 AM', description: 'Building soft skills for the global market.' },
                { title: 'University Interaction', time: '11:00 AM - 5:00 PM', description: 'Direct interaction with admissions officers.' },
                { title: 'Parent\'s Query Corner', time: '02:00 PM', description: 'Addressing financial and safety concerns of parents.' },
                { title: 'Evening Expo Gala', time: '05:00 PM', description: 'Celebrating the joy of learning.' }
            ]
        },
        {
            id: 'dibrugarh',
            name: 'Dibrugarh',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
            date: 'April 05-06, 2026',
            location: 'Chowkidingee Field, Dibrugarh',
            description: 'The Tea City of India, Dibrugarh, joins the Edu Expo trail. We bring premium educational resources and global university contacts to the students of Upper Assam.',
            programDetails: [
                { title: 'Medicine & Engineering Focus', time: '11:00 AM', description: 'Specialized session for STEM aspirants.' },
                { title: 'The Global Fair', time: '11:00 AM - 6:00 PM', description: 'Over 40 universities participation.' },
                { title: 'Personal Statement Clinic', time: '01:00 PM', description: 'Get your SOPs and essays reviewed by experts.' },
                { title: 'Quiz Competition', time: '03:30 PM', description: 'Test your knowledge and win prizes.' }
            ]
        },
        {
            id: 'guwahati',
            name: 'Guwahati',
            image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80&w=1000',
            date: 'April 10-12, 2026',
            location: 'Maniram Dewan Trade Centre, Guwahati',
            description: 'The grand finale of the Edu Expo takes place in Guwahati. A 3-day mega event featuring the widest range of universities, celebrity speakers, and massive scholarship grants.',
            programDetails: [
                { title: 'Grand Finale Opening', time: '10:00 AM', description: 'Inauguration by Honorable Education Minister.' },
                { title: 'The Mega Expo', time: '10:00 AM - 7:00 PM', description: 'Our largest gathering with 100+ institutions.' },
                { title: 'Financing Study Abroad', time: '02:00 PM', description: 'Special session by top banking partners.' },
                { title: 'Celebrity Keynote', time: '04:00 PM', description: 'Inspirational talk by a youth icon.' }
            ]
        }
    ];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const cityId = params['id'];
            this.city = this.cities.find(c => c.id === cityId);
        });
    }
}
