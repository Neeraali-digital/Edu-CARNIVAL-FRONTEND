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
  why_parents?: string[];
  why_location_highlights?: string[];
}

export const CITIES: City[] = [
  {
    name: 'Guwahati',
    slug: 'guwahati',
    date: 'January 9th & 10th',
    place: 'Taj Vivanta',
    location: 'Taj Vivanta, Guwahati',
    image: '/Guwahati.jpg',
    expo_title: 'Edu Carnival Education Expo – Guwahati',
    description: 'Guwahati is the Ideal Destination for Education Expo\n\nGuwahati is the education hub of the North East region and serves as a central destination for students from all seven North Eastern states. As the capital of Assam and the gateway to Northeast India, Guwahati has a large student population from multiple states, making it a high-potential location for student outreach and education events.\n\nThe city has a strong student ecosystem, with many students exploring higher education opportunities across India and abroad. Guwahati provides an excellent platform for universities, colleges, coaching institutes, and international education providers to connect with aspiring students and parents.\n\nWhy Edu Carnival Education Expo in Guwahati on 14th & 15th November (Saturday & Sunday) is More Fruitful\n\nConducting the Edu Carnival Education Expo on Saturday and Sunday provides the best opportunity to attract students, parents, and serious admission-seeking audiences, as weekends are more convenient for families to attend education events.\n\nNovember is an ideal time for admission-focused outreach because:\n• Students and parents start planning for the upcoming academic session.\n• Festival activities such as Durga Puja, Diwali, and regional celebrations are mostly completed, allowing families to participate more actively.\n• Institutions can generate early and quality leads from students planning their future studies.\n\nThe Edu Carnival Education Expo – Guwahati will offer a valuable opportunity for students and parents to directly interact with leading institutions, explore new-age courses, understand admission options, and discover higher education opportunities in India and abroad.\n\nEdu Carnival Education Expo – Guwahati welcomes students, parents, universities, and institutions to connect, explore, and utilize this golden opportunity to create successful academic pathways for the future.',
    why_attend: [
      'Directly interact with leading universities, colleges, and international education providers.',
      'Explore new-age courses, understand admission criteria, and discover higher education options in India & abroad.',
      'Convenient weekend schedule (Saturday & Sunday, Jan 9th & 10th) for families to attend together.',
      'Receive expert career counseling, scholarship details, and spot admission opportunities.'
    ],
    why_exhibit: [
      'Central hub access: Tap into students from all 7 North Eastern states in gateway city Guwahati.',
      'Optimal timing: January allows admission-focused outreach.',
      'Weekend advantage: Maximize family footfall and high-intent admission seekers on Saturday & Sunday.',
      'Generate early, quality admission leads and strengthen institutional branding across the Northeast.'
    ],
    is_current_expo: false,
    is_completed: false,
    start_date: '2027-01-09',
    map_url: 'https://maps.google.com/maps?q=Vivanta%20Guwahati&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Guwahati | Edu Carnival 2027",
      "startDate": "2027-01-09",
      "endDate": "2027-01-10",
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
      "description": "Join Edu Carnival 2027 in Guwahati – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
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
    date: 'January 14th & 15th',
    place: 'Taj Vivanta',
    location: 'Taj Vivanta, Shillong',
    image: '/Shillong.jpg',
    expo_title: 'Edu Carnival Higher Education Fair – Shillong',
    description: 'Shillong is an Ideal Destination for Edu Carnival Higher Education Fair\n\nShillong, the capital of Meghalaya, is one of the most important educational and cultural hubs in the North East region. Known as the "Scotland of the East," Shillong has a vibrant student community and a strong education-focused environment. The city attracts students not only from Meghalaya but also from nearby regions, making it a valuable destination for higher education outreach.\n\nShillong has a young and ambitious student population, with many students aspiring to pursue higher education opportunities outside the state, across India, and abroad. Students from the hill region often look for better career options, professional courses, and international study opportunities.\n\nBenefits of Attending the Higher Education Fair – January 14th & 15th, 2026 (Thursday & Friday)\n\nThursday and Friday are ideal days to conduct an education fair in Shillong. The Higher Education Fair will provide a valuable platform for students, parents, and educational institutions to connect, explore opportunities, and make informed decisions about higher education.\n\nThe Edu Carnival Higher Education Fair – Shillong will provide a professional platform where students, parents, and institutions can connect, exchange information, and explore meaningful opportunities.\n\nEdu Carnival welcomes students, parents, universities, and institutions to participate and utilize this valuable opportunity to build successful academic futures.',
    why_attend: [
      'Explore Education Options: Meet universities, colleges, and education experts to learn about courses, admissions, scholarships, career opportunities, and study pathways.',
      'Save Time and Effort: Compare multiple reputed universities from India and abroad, along with trending career-focused programs, under one roof.',
      'Scholarship & Admission Information: Get detailed guidance on financial support, application processes, eligibility, and admission requirements.',
      'Direct interaction: Connect with admission teams regarding internships, placements, and international opportunities.'
    ],
    why_exhibit: [
      'Increase Visibility in Shillong: Showcase programs, facilities, and achievements to students and parents in Meghalaya.',
      'Connect with Ambitious Aspirants: Reach students actively looking for higher education opportunities outside the state and abroad.',
      'Build Relationships: Establish strong institutional brand presence in one of the North East\'s primary educational hubs.',
      'Engage Key Decision Makers: Interact directly with prospective students and supportive families during January 14th & 15th.'
    ],
    is_current_expo: false,
    is_completed: false,
    start_date: '2027-01-14',
    map_url: 'https://maps.google.com/maps?q=Vivanta%20Shillong&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Education Expo in Shillong | Edu Carnival 2027",
      "startDate": "2027-01-14",
      "endDate": "2027-01-15",
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
      "description": "Join Edu Carnival 2027 in Shillong – a leading education expo featuring top colleges, career guidance, and admission opportunities.",
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
    date: 'January 23rd & 24th',
    place: 'Hyatt Hotel, Hebbal',
    location: 'Hyatt Hotel, Hebbal, Bengaluru',
    image: '/hayat hotel.jpg',
    description: 'Conducting an education fair in Bengaluru offers significant value because the city is one of India\'s largest education and technology hubs, attracting students from Karnataka and neighboring states. Education fairs provide a platform where students, parents, institutions, and industry experts can interact directly and make informed decisions.\n\nEdu Carnival Bengaluru, scheduled for January 23rd and 24th, is the ideal event for students seeking admission for the upcoming academic year.',
    expo_title: 'Edu Carnival Bengaluru – MBA & Master\'s Education Expo',
    expo_intro: 'This exclusive education expo is designed for graduate students seeking admission to MBA and various Master\'s programs offered by leading Indian and international universities.',
    why_attend: [
      'Access to Multiple Institutions: Students can compare universities, colleges, and training institutes under one roof.',
      'Career Guidance: Receive advice from career counselors and industry experts on choosing the right course and career path.',
      'Admission Information: Learn about eligibility criteria, admission procedures, entrance exams, and application deadlines.',
      'Scholarship Opportunities: Discover scholarships, financial aid, and education loan options.',
      'Direct Interaction: Meet faculty members and admission teams to clarify doubts.',
      'Explore Emerging Careers: Gain exposure to fields such as Artificial Intelligence, Data Science, Robotics, Cybersecurity, Digital Marketing, Healthcare, Design, and Entrepreneurship.',
      'Study Abroad Information: Interact with international universities and understand visa, admission, and scholarship processes.',
      'Better Decision-Making: Compare courses, fees, placements, campus facilities, and accreditation before choosing an institution.'
    ],
    why_exhibit: [
      'Student Recruitment: Reach thousands of prospective students and parents in a short period.',
      'Brand Visibility: Enhance institutional reputation and awareness among the target audience.',
      'Lead Generation: Collect qualified student inquiries for follow-up admissions.',
      'Program Promotion: Showcase new academic programs, industry partnerships, research facilities, and placement achievements.',
      'Market Intelligence: Understand student preferences and current education trends.',
      'Higher Admission Conversion: Face-to-face interactions often result in higher enrollment compared to digital-only campaigns.',
      'Competitive Positioning: Differentiate your institution through unique programs, infrastructure, scholarships, and placement records.'
    ],
    why_parents: [
      'Gain confidence in selecting the right institution.',
      'Understand fee structures and financial planning.',
      'Learn about career prospects and placement opportunities.',
      'Compare institutions objectively before making admission decisions.'
    ],
    why_location_highlights: [
      'Large population of Class 12, diploma, undergraduate, and postgraduate aspirants.',
      'Presence of leading universities, engineering colleges, medical colleges, business schools, and skill development institutes.',
      'Strong IT, biotechnology, and startup ecosystem that creates demand for career-focused education.',
      'Excellent connectivity, making it accessible to students from across Karnataka and neighboring states.',
      'High demand for career counseling during the admission season.'
    ],
    is_current_expo: false,
    is_completed: false,
    start_date: '2027-01-23',
    map_url: 'https://maps.google.com/maps?q=Hyatt%20Centric%20Hebbal%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed',
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "MBA & MASTERS EDUCATION EXPO in Bengaluru | Edu Carnival 2027",
      "startDate": "2027-01-23",
      "endDate": "2027-01-24",
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
  },
  {
    name: 'Imphal',
    slug: 'imphal-may-2026',
    date: 'May 20th & 21st',
    place: 'Hotel Imphal by Classic',
    location: 'Hotel Imphal by Classic, Imphal',
    image: '/Imphal.jpg',
    expo_title: 'Edu Carnival Education Fair – Imphal (May Edition)',
    description: 'Why Imphal is the Ideal Destination for Edu Carnival Education Expo\n\nImphal is one of the most promising cities for student outreach in the North East region, with a growing number of students aspiring to pursue higher education opportunities across India and abroad. The city has a strong student community and a high demand for guidance on universities, professional courses, career pathways, and international education opportunities.\n\nEdu Carnival Education Expo in Imphal provides a valuable platform for students, parents, universities, and educational institutions to connect directly and explore the best opportunities in higher education.\n\nHosted at Hotel Imphal by Classic, the event attracted genuine student footfall and enabled direct interaction with premier academic institutions.',
    why_attend: [
      'Direct interaction with leading universities and educational institutions from India and abroad.',
      'Opportunity to explore trending and high-demand courses across various fields.',
      'Guidance on admissions, career choices, scholarships, and future study pathways.',
      'Access to updated information about new-age programs and emerging career opportunities.'
    ],
    why_exhibit: [
      'Reach high-potential students from Imphal and across Manipur actively seeking higher education.',
      'Engage during peak admission decision periods.',
      'Host at a reputed and comfortable venue ensuring high-quality footfall and meaningful interactions.',
      'Build long-term brand presence and student recruitment networks in Manipur.'
    ],
    is_current_expo: false,
    is_completed: true,
    start_date: '2026-05-20',
    map_url: 'https://maps.google.com/maps?q=Hotel%20Imphal%20by%20Classic&t=&z=15&ie=UTF8&iwloc=&output=embed'
  }
];
