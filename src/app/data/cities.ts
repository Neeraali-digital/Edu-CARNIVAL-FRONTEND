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
}

export const CITIES: City[] = [
  {
    name: 'Bengaluru',
    slug: 'bengaluru',
    date: 'August 1st 2026',
    place: 'Hyatt hotel Hebbal',
    location: 'Hyatt hotel Hebbal, Bengaluru',
    image: '/hayat hotel.jpg',
    description: 'EDU CARNIVAL - MBA & MASTERS EDUCATION EXPO (Indian & International Universities). Join us at Bengaluru for the premier MBA & Masters education expo.',
    is_current_expo: false,
    start_date: '2026-08-01',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "MBA & MASTERS EDUCATION EXPO in Bengaluru | Edu Carnival 2026",
      "startDate": "2026-08-01",
      "endDate": "2026-08-01",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Hyatt hotel Hebbal",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      },
      "description": "Attend Edu Carnival 2026 in Bengaluru – explore top Indian & International Universities for MBA & Masters.",
      "organizer": {
        "@type": "Organization",
        "name": "Edu Carnival",
        "url": "https://www.educarnival.in"
      }
    }
  },
  {
    name: 'Kochi',
    slug: 'kochi',
    date: 'August 08th 2026',
    place: 'Kochi Marriot hotel',
    location: 'Kochi Marriot hotel',
    image: '/marriot hotel.jpg',
    description: 'EDU CARNIVAL - MBA & MASTERS EDUCATION EXPO (Indian & International Universities). Join us at Kochi for the premier MBA & Masters education expo.',
    is_current_expo: false,
    start_date: '2026-08-08',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "MBA & MASTERS EDUCATION EXPO in Kochi | Edu Carnival 2026",
      "startDate": "2026-08-08",
      "endDate": "2026-08-08",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Kochi Marriot hotel",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kochi",
          "addressRegion": "Kerala",
          "addressCountry": "IN"
        }
      },
      "description": "Attend Edu Carnival 2026 in Kochi – explore top Indian & International Universities for MBA & Masters.",
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
  },
  {
    name: 'Imphal',
    slug: 'imphal',
    date: 'May 20th & 21st',
    place: 'City Convention Center',
    location: 'City Convention Center, Imphal',
    image: '/Imphal.jpg',
    description: 'Imphal, the capital of Manipur in Northeast India, is a scenic and historically significant city located in the heart of the Manipur Valley. As the political, cultural, and commercial hub of the state, Imphal has played an important role since 1826 and is well known for the historic World War II Battle of Imphal. Today, the city is progressing rapidly under the Smart Cities Mission, with 24 major development projects enhancing its infrastructure and urban growth. \n\nSurrounded by beautiful hills, Imphal offers an ideal environment for hosting educational events and exhibitions. \n\nImportantly, students from Imphal and across Manipur show strong interest in pursuing higher education opportunities across India. As a result, large numbers of students attend education expos to explore new courses and academic opportunities both across India and abroad.',
    is_current_expo: false,
    is_completed: true,
    start_date: '2026-05-20',
    map_url: 'https://maps.google.com/maps?q=City%20Convention%20Center%20Imphal&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Imphal | Edu Carnival 2026",
      "startDate": "2026-05-20",
      "endDate": "2026-05-21",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "City Convention Center",
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
        "validFrom": "2026-04-01"
      }
    }
  }
];
