# 🎯 Goal Setter 2030

A sleek, interactive single-page web app that helps you define your future goals and visualize them on an animated timeline roadmap.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Features

- **Goal Input Form** — Add up to 6 goals with a title, category, target year (2025–2030), and optional description
- **Six Categories** — Career, Health & Fitness, Finance, Education, Personal Growth, Travel & Adventure
- **Visual Timeline Roadmap** — Goals are sorted chronologically and displayed on an alternating animated timeline
- **Animated UI** — Floating background particles, smooth fade-in/slide-up animations, and hover effects
- **Copy Summary** — One-click copy of your goal plan as formatted text
- **Fully Responsive** — Works on desktop, tablet, and mobile
- **Accessible** — Keyboard navigable, respects `prefers-reduced-motion`, proper ARIA attributes
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript (only Google Fonts for typography)

---

## 🚀 Getting Started

### Option 1 — Open Directly

Just open `index.html` in any modern browser. No build step needed.

### Option 2 — Local Server

```bash
npx http-server -p 3000
```

Then visit [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
├── index.html    — Main HTML page
├── styles.css    — All styling, animations, and responsive layout
├── app.js        — Application logic (form handling, roadmap generation, particles)
├── README.md
└── LICENSE
```

---

## 🖼️ How It Works

1. **Hero Section** — A full-screen intro with a call-to-action to start setting goals
2. **Define Goals** — Fill in the form and click "Add Goal" to create goal cards
3. **Generate Roadmap** — Click "Generate My Roadmap" to see your goals on a visual timeline
4. **Share or Reset** — Copy your goal summary to clipboard or start over

---

## 🛡️ Security

- All user input is HTML-escaped to prevent XSS
- No data is sent to any server — everything stays in your browser

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
