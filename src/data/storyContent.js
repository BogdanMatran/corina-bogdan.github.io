// Narrative content transformed from quiz questions
export const storyContent = {
  hero: {
    bride: "Corina",
    groom: "Bogdan",
    date: "June 16, 2026",
    location: "Castiglioncello, Italy",
  },

  beginning: {
    title: "It All Started...",
    content: [
      "At 6 AM in Zurich HB — yes, 6 AM!",
      "First words? 'Are you tall?'",
      "Not the most romantic beginning, but it's their story"
    ]
  },

  bride: {
    title: "Meet Corina",
    subtitle: "The Bride",
    facts: [
      "From Darmanesti to his heart",
      "Sunday mornings? Always sleeping in",
      "Never shares her fries (not even with him!)",
      "First impression: 'Not tall enough!'",
      "Favorite dessert: Lays cu branza (a woman of culture)",
      "Wedding day phrase: 'Unde-ai disparut iar?'",
      "Most likely searching for: her lip gloss"
    ],
    gradient: "from-pink-500 to-rose-600"
  },

  groom: {
    title: "Meet Bogdan",
    subtitle: "The Groom",
    facts: [
      "Born in New York",
      "Whiskey connoisseur",
      "Secret talent: Cooking",
      "Favorite season: Summer under the sun",
      "Go-to breakfast: Croissant",
      "Favorite color: Blue",
      "Dream destination: Maldives",
      "Said 'I love you' first"
    ],
    gradient: "from-blue-500 to-indigo-600"
  },

  journey: {
    title: "Their Journey Together",
    content: [
      "First trip: Targul de Craciun din Bucuresti",
      "Building memories, one adventure at a time",
      "From Zurich to Miami, their love story grew",
      "Two hearts, countless adventures"
    ]
  },

  // Journey Map - Visual map with locations and photos
  // TODO: Add your travel photos by placing images in /public/journey/ folder
  journeyMap: [
    {
      place: "Zurich, Switzerland",
      label: "Where We Met",
      date: "6 AM, Zurich HB",
      image: null // Add: '/journey/zurich.jpg'
    },
    {
      place: "Romania",
      label: "First Trip",
      date: "Targul de Craciun",
      image: null // Add: '/journey/romania.jpg'
    },
    {
      place: "France",
      label: "European Adventure",
      date: "City of Love",
      image: null // Add: '/journey/france.jpg'
    },
    {
      place: "Bali",
      label: "Island Paradise",
      date: "Tropical Escape",
      image: null // Add: '/journey/bali.jpg'
    },
    {
      place: "Miami, USA",
      label: "The Proposal",
      date: "Helicopter Over Miami Beach",
      image: null // Add: '/journey/miami.jpg'
    },
    {
      place: "Bahamas",
      label: "Celebration",
      date: "Island Bliss",
      image: null // Add: '/journey/bahamas.jpg'
    },
    {
      place: "Castiglioncello, Italy",
      label: "The Wedding",
      date: "June 16, 2026",
      image: null // Add: '/journey/italy.jpg'
    }
  ],

  proposal: {
    title: "The Proposal",
    story: [
      "In a HELICOPTER",
      "Flying over MIAMI BEACH",
      "With the FULL MOON shining",
      "Magic happened"
    ],
    emphasis: "The moon knew what was going on that night"
  },

  celebration: {
    title: "The Wedding Day",
    subtitle: "What to Expect",
    moments: [
      "Someone will ask 'Unde-ai disparut iar?'",
      "The bride will need her lip gloss",
      "There will be tears (mascara-proof recommended)",
      "Lots of love, laughter, and dancing",
      "Unforgettable memories in the making"
    ]
  },

  rsvp: {
    title: "Join Our Celebration",
    message: "Just show up, we already love you",
    note: "This is your golden invite"
  },

  // Gallery photos - add your images to /public/gallery/
  gallery: [
    { src: '/gallery/moment1.jpg', alt: 'Our moment' },
    { src: '/gallery/moment2.jpg', alt: 'Our moment' },
    { src: '/gallery/moment3.jpg', alt: 'Our moment' },
  ],

  // Wedding details - update with your information
  details: {
    date: 'June 16, 2026',
    time: '4:00 PM',
    venue: 'Castiglioncello',
    address: 'Via Romolo Monti, 10, 57016 Castiglioncello LI, Italy',
    dressCode: 'Semi-formal / Garden attire',
    notes: [
      'Ceremony begins promptly at 4 PM',
      'Reception to follow',
      'Dancing shoes recommended'
    ]
  },

  // Wedding date for countdown (ISO format: YYYY-MM-DD)
  weddingDate: '2026-06-16',

  // Love Notes - Personal messages between Corina and Bogdan
  // TODO: Update with your real messages!
  loveNotes: {
    corina: {
      to: "To my Bogdan",
      message: "From that morning at Zurich HB to every sunrise after, you've been my constant. Thank you for loving me exactly as I am, fries and all. Forever yours, your Corina"
    },
    bogdan: {
      to: "To my Corina",
      message: "You walked into my life at 6 AM and changed everything. Every adventure, every sunset, every croissant tastes better with you. Can't wait to spend forever making memories together. Love always, your Bogdan"
    }
  },

  // IYKYK - Inside jokes and special moments
  // TODO: Add your own inside jokes!
  iykyk: [
    {
      title: "The 6 AM Meeting",
      text: "Zurich HB never looked the same after that morning..."
    },
    {
      title: "Helicopter Proposal",
      text: "When a simple dinner just won't do. Miami Beach from above hits different."
    },
    {
      title: "The Fries Rule",
      text: "No sharing. Not even with him. Especially not with him."
    },
    {
      title: "Unde-ai disparut?",
      text: "If you've heard this phrase, you know. You just know."
    },
    {
      title: "Lip Gloss Emergency",
      text: "Always missing. Always needed. Always a crisis."
    },
    {
      title: "The Height Question",
      text: "First words: 'Are you tall?' Romantic? No. Memorable? Absolutely."
    }
  ],

  // Engagement Video
  // TODO: Add your video URL when ready (YouTube, Vimeo, or direct video file)
  engagementVideo: {
    title: "The Proposal",
    subtitle: "Relive the moment",
    videoUrl: null, // Add YouTube/Vimeo URL here when ready: 'https://youtube.com/watch?v=...'
    placeholder: {
      message: "Our engagement video is coming soon!",
      image: null // Optional: Add placeholder image path
    }
  },

  // Interactive Section - Songs and Predictions
  // TODO: Set up Google Sheets and add endpoint URLs
  interactive: {
    songRequestsEndpoint: '#', // TODO: Add Google Apps Script endpoint for song requests
    predictionsEndpoint: '#', // TODO: Add Google Apps Script endpoint for predictions
    predictions: {
      title: "Test Your Knowledge",
      subtitle: "How well do you know us?",
      questions: [
        {
          id: 'cries',
          text: 'Who will cry first at the ceremony?',
          options: ['Corina', 'Bogdan', 'Both', 'Neither']
        },
        {
          id: 'dancer',
          text: "Who's the better dancer?",
          options: ['Corina', 'Bogdan', 'Tied']
        },
        {
          id: 'wakes',
          text: 'Who wakes up earlier?',
          options: ['Corina', 'Bogdan', 'Same time']
        },
        {
          id: 'iloveyou',
          text: "Who said 'I love you' first?",
          options: ['Corina', 'Bogdan']
        }
      ]
    }
  }
};
