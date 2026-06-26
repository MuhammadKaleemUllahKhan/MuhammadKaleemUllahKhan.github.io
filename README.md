# Academic Website of Muhammad KaleemUllah Khan

Personal academic website of **Muhammad KaleemUllah Khan**, PhD researcher in Computer Science
at École de technologie supérieure (ÉTS), Montréal, working on *fair and secure federated
adversarial training*, privacy-preserving AI, and energy-aware machine learning.

🔗 **Live site:** https://muhammadkaleemullahkhan.github.io/

---

## ✨ Features

- Modern, fully responsive single-page design
- 🌙 / ☀️ Dark & light theme toggle (remembers your choice)
- Animated hero, scroll-reveal sections, animated stat counters, and a typing effect
- Filterable publications list
- Education & experience timelines
- Research-interest, project, and skills showcases
- Downloadable CV, accessible markup, and SEO + structured data (JSON-LD)
- **No build step**: pure HTML/CSS/JS, served directly by GitHub Pages

## 📁 Structure

```
.
├── index.html                 # The whole site
├── .nojekyll                  # Serve files as-is (skip Jekyll processing)
├── README.md
└── assets/
    ├── Muhammad_KaleemUllah_Khan_CV.pdf
    ├── css/styles.css
    ├── js/main.js
    └── img/
        ├── profile.svg        # Placeholder avatar, replace with a real photo
        └── favicon.svg
```

## 🛠️ Make it yours

A few things you may want to personalize (all in `index.html` unless noted):

1. **Profile photo**: replace `assets/img/profile.svg` with a real photo
   (e.g. `profile.jpg`) and update the `<img src="...">` in the hero card.
2. **Social links**: GitHub, Google Scholar, LinkedIn, and ORCID are already
   wired up to real profiles in the hero and Contact sections. Update them in
   `index.html` if any change.
3. **Email**: the site uses `ranakaleem109@gmail.com` (from your CV). Update if needed.
4. **Content**: publications, experience, and projects are plain HTML blocks; edit text directly.

## 🚀 Deploying on GitHub Pages

This repository is named `MuhammadKaleemUllahKhan.github.io`, so GitHub Pages
serves it automatically from the default branch.

To publish:
1. Merge this branch into `main` (or your default branch).
2. In **Settings → Pages**, set the source to *Deploy from a branch* → `main` / `root`.
3. Your site goes live at https://muhammadkaleemullahkhan.github.io/.

## 🧪 Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

© Muhammad KaleemUllah Khan. Built with care in Montréal.
