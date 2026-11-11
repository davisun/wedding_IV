// ─────────────────────────────────────────────────────────────
//  Edit everything about your invitation here.
//  To use your own pictures: put them in /public/photos and
//  reference them like "photos/hero.jpg" (no leading slash).
// ─────────────────────────────────────────────────────────────

const config = {
  partner1: 'Vivian',
  partner2: 'Ifeanyi',
  // ISO date-time of the ceremony (used for the countdown)
  date: '2027-04-03T15:00:00',
  dateText: 'Saturday, April 3, 2027',
  location: 'Enugu, Nigeria',
  hashtag: '#VivianAndIfeanyi2027',

  heroImage: 'https://picsum.photos/seed/wedding-hero/1920/1280',

  story: {
    title: 'Our Story',
    text: [
      'We met on a rainy Tuesday at a friend’s birthday dinner and talked until the restaurant stacked the chairs around us.',
      'Five years, two cities and countless adventures later, Ifeanyi asked the question on the same street where it all began. Now we would love for you to celebrate the next chapter with us.',
    ],
    images: [
      'https://picsum.photos/seed/story-1/800/1000',
      'https://picsum.photos/seed/story-2/800/1000',
    ],
  },

  events: [
    {
      title: 'Ceremony',
      time: '10:00 AM',
      venue: 'Assemblies of God Church, Oba, Enugu',
      address: 'oba, Enugu',
      mapUrl: 'https://maps.google.com/?q=Enugu',
    },
    {
      title: 'Reception/Traditional Wedding',
      time: '1:00 PM',
      venue: 'Nnam\'s compound, Oba, Enugu',
      address: 'oba, Enugu',
      mapUrl: 'https://maps.google.com/?q=Enugu',
    },
  ],

  dressCode: 'Formal attire — Champagne Gold, White & pastels welcome',

  // Gallery pictures (any number). Captions are optional.
  gallery: [
    { src: 'photos/pic1.jpeg' },
    { src: 'photos/pic2.jpeg', caption: 'Sunday mornings' },
    { src: 'https://picsum.photos/seed/g3/900/900' },
    { src: 'https://picsum.photos/seed/g4/900/1300', caption: 'The proposal' },
    { src: 'https://picsum.photos/seed/g5/1200/800' },
    { src: 'https://picsum.photos/seed/g6/900/1100', caption: 'Engaged!' },
    { src: 'https://picsum.photos/seed/g7/1200/900' },
    { src: 'https://picsum.photos/seed/g8/900/1200' },
  ],

  rsvp: {
    deadline: 'April 3, 2027',
    // RSVPs open the guest's email app, addressed to this email
    email: 'rsvp@example.com',
  },
}

export default config
