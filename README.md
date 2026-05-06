# 🎉 Birthday Love Website

A romantic, interactive birthday surprise website built to celebrate someone truly special 💕

This project is designed as a personalized digital gift featuring animations, memories, love messages, and interactive surprises.

---

## 💖 Live Demo
> https://hyenz.is-a.dev



---

## 🌸 Features

✨ Romantic landing page with animated hearts  
🎆 Fireworks surprise animation (triggered interaction)  
📸 Memories gallery with image modal viewer  
💌 Personalized love message section  
⏳ Relationship timeline section  
🎁 Surprise reveal interaction  
🎵 Optional background music support  
📱 Fully responsive design (mobile + desktop)

---

## ⚡ Performance Optimized

This project is designed with performance in mind:

- Minimal and optimized animations
- Fireworks only triggered on interaction
- Lazy-loaded images
- Lightweight UI transitions
- Mobile-friendly rendering

---

## ⚙️ Config-Based System

All content is managed in a single configuration file for easy editing:

```js
// config.js
xport const config = {
  girlfriendName: "Hyenz",
  heroTitle: "Happy Birthday My Love",
  subtitle: "You mean everything to me",
  loveMessage: `My dearest love,

Every moment with you feels like a beautiful dream I never want to wake up from. From the first time our eyes met, I knew my heart had found its home.

You are the sunshine that brightens my darkest days, the gentle breeze that calms my restless soul, and the stars that guide me through the night. Your laugh is my favorite melody, your smile is my greatest treasure, and your love is the most precious gift I have ever received.

On this special day, I want you to know that you are my everything. My past, my present, and my future all lead to you. Every heartbeat, every breath, every dream I have is intertwined with yours.

Thank you for being you. Thank you for loving me. Thank you for making my life complete.

Happy Birthday, my love. Today and always, you are the most beautiful person in my world.

Forever yours,
With all my heart and soul`,
  galleryImages: [
    { url: "/images/photo1.jpg", caption: "Our first date" },
    { url: "/images/photo2.jpg", caption: "That magical sunset" },
    { url: "/images/photo3.jpg", caption: "Your beautiful smile" },
    { url: "/images/photo4.jpg", caption: "Our adventure together" },
    { url: "/images/photo5.jpg", caption: "The day I knew" },
    { url: "/images/photo6.jpg", caption: "Forever in my heart" },
  ],
  timelineEvents: [
    {
      title: "First Meet",
      date: "2023",
      description: "The day our paths crossed and my life changed forever",
    },
    {
      title: "First Date",
      date: "2023",
      description: "Butterflies, nervous smiles, and the beginning of us",
    },
    {
      title: "First Kiss",
      date: "2023",
      description: "A moment frozen in time, pure magic",
    },
    {
      title: "Said 'I Love You'",
      date: "2024",
      description: "Three words that meant everything",
    },
    {
      title: "Today",
      date: "2024",
      description: "Celebrating you and our beautiful journey",
    },
  ],
  surpriseMessage:
    "You are my everything, my forever, my always. I love you more than words could ever express.",
  backgroundMusic: "/music/romantic.mp3",
  credit: {
    text: "Made with love by Hyenz",
    link: "https://hyenz.is-a.dev",
  },
};
