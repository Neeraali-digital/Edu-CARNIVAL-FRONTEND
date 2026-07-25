export interface City {
  name: string;
  slug: string;
  date: string;
  place: string;
  location: string;
  image: string;
  description: string;
  is_current_expo: boolean;
  regional_representative?: string;
  start_date?: string; // used for sorting
  map_url?: string;
  schema?: any;
  is_completed?: boolean;
  expo_title?: string;
  expo_intro?: string;
  why_attend?: string[];
  why_exhibit?: string[];
}

export const CITIES: City[] = [
  {
    name: 'Imphal',
    slug: 'imphal',
    date: 'October 13th & 14th',
    place: 'Hotel Imphal by Classic',
    location: 'Hotel Imphal by Classic, Imphal',
    image: '/Imphal.jpg',
    description: 'Imphal, the capital of Manipur in Northeast India, is a scenic and historically significant city located in the heart of the Manipur Valley. As the political, cultural, and commercial hub of the state, Imphal has played an important role since 1826 and is well known for the historic World War II Battle of Imphal. Today, the city is progressing rapidly under the Smart Cities Mission, with 24 major development projects enhancing its infrastructure and urban growth. \n\nSurrounded by beautiful hills, Imphal offers an ideal environment for hosting educational events and exhibitions. \n\nImportantly, students from Imphal and across Manipur show strong interest in pursuing higher education opportunities across India. As a result, large numbers of students attend education expos to explore new courses and academic opportunities both across India and abroad.',
    is_current_expo: false,
    is_completed: false,
    start_date: '2026-10-13',
    map_url: 'https://maps.google.com/maps?q=Hotel%20Imphal%20by%20Classic&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Imphal | Edu Carnival 2026",
      "startDate": "2026-10-13",
      "endDate": "2026-10-14",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Hotel Imphal by Classic",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Imphal",
          "addressRegion": "Manipur",
          "addressCountry": "IN"
        }
      },
      "image": [
        "https://www.educarnival.in/images/imphal-event.jpg"
      ],
      "description": "Join Edu Carnival 2026 in Imphal – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.educarnival.in/register",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-09-01"
      }
    }
  },
  {
    name: 'Guwahati',
    slug: 'guwahati',
    date: 'November 14th & 15th',
    place: 'Taj Vivanta',
    location: 'Taj Vivanta, Guwahati',
    image: '/Guwahati.jpg',
    description: 'Guwahati, the gateway to Northeast India, is a major educational and commercial hub. Join our education expo to discover numerous higher education options and meet representatives from leading universities across India and abroad.',
    is_current_expo: false,
    is_completed: false,
    start_date: '2026-11-14',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Guwahati | Edu Carnival 2026",
      "startDate": "2026-11-14",
      "endDate": "2026-11-15",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Taj Vivanta",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Guwahati",
          "addressRegion": "Assam",
          "addressCountry": "IN"
        }
      },
      "description": "Join Edu Carnival 2026 in Guwahati – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Shillong',
    slug: 'shillong',
    date: 'November 19th & 20th',
    place: 'Taj Vivanta',
    location: 'Taj Vivanta, Shillong',
    image: '/Shillong.jpg',
    description: 'Shillong, known as the Scotland of the East, is the capital of Meghalaya and an important center of education in Northeast India. Explore top-notch educational opportunities at our upcoming expo.',
    is_current_expo: false,
    is_completed: false,
    start_date: '2026-11-19',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Shillong | Edu Carnival 2026",
      "startDate": "2026-11-19",
      "endDate": "2026-11-20",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Taj Vivanta",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Shillong",
          "addressRegion": "Meghalaya",
          "addressCountry": "IN"
        }
      },
      "description": "Join Edu Carnival 2026 in Shillong – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Itanagar',
    slug: 'itanagar',
    date: 'November 24th & 25th',
    place: 'Dony Polo International',
    location: 'Dony Polo International, Itanagar',
    image: '/Itanagar.jpg',
    description: 'Itanagar, the capital of Arunachal Pradesh, is beautifully nestled in the foothills of the Himalayas. The education expo provides a great platform for students to explore higher education opportunities nationwide.',
    is_current_expo: false,
    is_completed: false,
    start_date: '2026-11-24',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Itanagar | Edu Carnival 2026",
      "startDate": "2026-11-24",
      "endDate": "2026-11-25",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Dony Polo International",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Itanagar",
          "addressRegion": "Arunachal Pradesh",
          "addressCountry": "IN"
        }
      },
      "description": "Join Edu Carnival 2026 in Itanagar – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Agartala',
    slug: 'agartala',
    date: 'November 29th',
    place: 'Polo Hotel, Agartala',
    location: 'Polo Hotel, Agartala',
    image: '/Agartala.jpg',
    description: 'Agartala, the capital city of Tripura, is rapidly developing into an educational hub. This expo provides a bridge for students to discover prime educational institutions from across the country.',
    is_current_expo: false,
    is_completed: false,
    start_date: '2026-11-29',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Agartala | Edu Carnival 2026",
      "startDate": "2026-11-29",
      "endDate": "2026-11-29",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Polo Hotel",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Agartala",
          "addressRegion": "Tripura",
          "addressCountry": "IN"
        }
      },
      "description": "Join Edu Carnival 2026 in Agartala – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Bengaluru',
    slug: 'bengaluru',
    date: 'January 9th & 10th',
    place: 'Hyatt Hotel, Hebbal',
    location: 'Hyatt Hotel, Hebbal, Bengaluru',
    image: '/hayat hotel.jpg',
    description: 'This exclusive education expo is designed for graduate students seeking admission to MBA and various Master\'s programs offered by leading Indian and international universities.\n\nJoin us to connect directly with top reputed universities and explore a wide range of higher education opportunities. Students can interact with university representatives, gain insights into programs, admission requirements, scholarships, and career prospects.\n\nThe expo also provides institutions with a unique opportunity to connect directly with targeted students who are actively looking for admission immediately after completing their degree programs.',
    expo_title: 'EDU CARNIVAL – MBA & Master\'s Education Expo (Indian & International Universities)',
    expo_intro: 'This exclusive education expo is designed for graduate students seeking admission to MBA and various Master\'s programs offered by leading Indian and international universities.',
    why_attend: [
      'Meet leading Indian and international universities',
      'Explore MBA and Master\'s program options',
      'Get direct admission guidance from university representatives',
      'Learn about scholarships, eligibility, and career opportunities',
      'Build valuable connections for your academic future'
    ],
    why_exhibit: [
      'Connect with highly qualified graduate students',
      'Generate quality admission leads',
      'Promote your programs directly to prospective applicants',
      'Enhance institutional visibility and student outreach'
    ],
    is_current_expo: false,
    is_completed: false,
    start_date: '2027-01-09',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "MBA & MASTERS EDUCATION EXPO in Bengaluru | Edu Carnival 2027",
      "startDate": "2027-01-09",
      "endDate": "2027-01-10",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Hyatt Hotel, Hebbal",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      },
      "description": "Attend Edu Carnival 2027 in Bengaluru – explore top Indian & International Universities for MBA & Masters.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Dibrugarh',
    slug: 'dibrugarh',
    date: 'May 16th & 17th',
    place: 'Cygnett Hotel',
    location: 'Cygnett Hotel, Dibrugarh',
    image: '/Dibrugarh.jpg',
    description: 'Dibrugarh, often regarded as the second capital of Assam, is a prominent industrial hub in Upper Assam, surrounded by vast tea gardens. It serves as a gateway to the major tea-producing districts of Tinsukia, Dibrugarh, and Sivasagar. With strong rail, road, and air connectivity, Dibrugarh provides easy access to eastern Assam and neighboring regions. \n\nStudents from Upper Assam districts such as Tinsukia, Sivasagar, Jorhat, and Dhemaji show a strong interest in pursuing professional courses outside Assam and in nearby states. Many prefer attending education fairs locally rather than traveling to Guwahati or other metropolitan cities. For many students and parents in the region, access to institutions from other states can be limited, and education fairs help bridge this gap. \n\nStudents seeking affordable private colleges across India actively participate in such events. Education fairs held in Dibrugarh in the past have been highly successful, attracting thousands of students and parents exploring professional courses and career opportunities.',
    is_current_expo: false,
    is_completed: true,
    start_date: '2026-05-16',
    map_url: 'https://maps.google.com/maps?q=Cygnett%20Inn%20Dibrugarh&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Dibrugarh | Edu Carnival 2026",
      "startDate": "2026-05-16",
      "endDate": "2026-05-17",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Cygnett Expo Hall",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dibrugarh",
          "addressRegion": "Assam",
          "addressCountry": "IN"
        }
      },
      "image": [
        "https://www.educarnival.in/images/dibrugarh-event.jpg"
      ],
      "description": "Attend Edu Carnival 2026 in Dibrugarh – explore top colleges, career options, and admission opportunities at India’s leading education fair.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.educarnival.in/register",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-04-01"
      }
    }
  }
];
