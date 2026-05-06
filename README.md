# 🎉 Birthday Love Website

A romantic, interactive birthday surprise website built to celebrate someone truly special 💕

This project is designed as a personalized digital gift featuring animations, memories, love messages, and interactive surprises.

---

## 💖 Live Demo
> (Add your deployed link here later)

Example:
https://your-project.vercel.app

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
export const config = {
  girlfriendName: "Your Name",
  heroTitle: "Happy Birthday My Love ❤️",
  subtitle: "You mean everything to me",
  loveMessage: "Your romantic message here...",
  galleryImages: [
    { url: "/images/photo1.webp", caption: "Memory 1" }
  ],
  timelineEvents: [
    { title: "First Meet", date: "2023", description: "Special moment ❤️" }
  ],
  surpriseMessage: "You are my everything 💖",
  backgroundMusic: "/music/song.mp3",
  credit: {
    text: "Made with ❤️ by Hyenz",
    link: "https://hyenz.is-a.dev"
  }
};
