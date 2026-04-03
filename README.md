# Heaven Online (Netflix Homepage Clone)

## Project Overview

Heaven Online is a React-based web application inspired by the Netflix homepage UI. The goal of this project is to demonstrate component-based architecture, responsive design, and interactive UI behavior using modern frontend development practices.

This project was developed as part of a Web Development assignment.

---

## Features: 

* Hero banner with hover video preview (Pindarika)
* Movie rows with reusable components
* Fully responsive (Desktop, Tablet, Mobile)
* Clean UI inspired by Netflix
* Reusable React components

---

##  Component Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── HeroBanner.jsx
│   ├── MovieRow.jsx
│   ├── MovieCard.jsx
│   └── Footer.jsx
│
├── data/
│   └── movies.js
│
├── assets/
│   ├── Pindarika.jpg
│   ├── pindarika.mp4
│   └── other images...
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## Component Explanation : 

### 1. Navbar.jsx

* Displays website title **Heaven Online**
* Navigation links (Home, TV Shows, Movies, etc.)
* Sign-in button

### 2. HeroBanner.jsx

* Displays featured movie (Pindarika)
* Background image with overlay
* Video plays on hover
* Play button allows video with sound

### 3. MovieRow.jsx

* Displays category title (Trending, Popular, etc.)
* Maps through movie data and renders MovieCard

### 4. MovieCard.jsx

* Displays individual movie image and title
* Simple hover scaling effect

### 5. movies.js

* Stores all movie data
* Organized into categories:

  * trendingMovies
  * popularMovies
  * actionMovies
  * comedyMovies

---

##  Implementation Decisions

### 🔹 1. React (Vite)

Chosen for fast development and modern tooling.

### 🔹 2. Component-Based Design

* Improves reusability
* Keeps code clean and organized

### 🔹 3. Hero Video Only for One Movie

* Video effect applied only to **Pindarika**
* Avoids performance issues
* Keeps UI simple and focused

### 🔹 4. CSS Styling (No Framework)

* Custom CSS used instead of Tailwind/Bootstrap
* Better understanding of layout and responsiveness

### 🔹 5. Responsive Design

* Media queries used for:

  * Tablet (≤992px)
  * Mobile (≤768px)

### 🔹 6. Hover Video Behavior

* Hover triggers video play
* Muted autoplay due to browser restrictions
* Sound enabled only on button click

---

##  Changes Made During Development

###  Fixed Import Errors

* Corrected component paths
* Ensured all components are exported properly

###  Fixed Blank Screen Issue

* Resolved JSX syntax errors
* Cleaned broken code

### Fixed Image Loading

* Used proper import:

  ```js
  import heroImage from "../assets/Pindarika.jpg";
  ```

### Fixed Video Not Playing

* Added `useRef` and `useState`
* Controlled playback manually

###  Fixed CSS Issues

* Rebuilt full App.css
* Removed conflicting styles

### Restored Movie Cards

* Removed unnecessary video logic from MovieCard

---

## Third-Party Dependencies

* React
* Vite

(No additional libraries were used to keep the project simple and educational)

---

## Architecture Diagram (Conceptual)

```
App
│
├── Navbar
├── HeroBanner
│     └── Video Logic
│
├── MovieRow (multiple)
│     └── MovieCard (repeated)
│
└── Footer
```

---

## How to Run the Project

```bash
npm install
npm run dev
```

Then open:

```
http://localhost:5173/
```

---

## Repository Link

👉 [[GitHub](https://github.com/norzin-wangmo/02250359_WEB101_PA1.git)](https://github.com/norzin-wangmo/02250359_WEB101_PA1.git)

---

## Learning Outcomes

* Understanding React components
* Handling state and events
* Debugging real-world issues
* Implementing responsive UI
* Managing assets (images/videos)

---

## Output Screenshots:
src/assets/ss1.jpg
src/assets/ss2.jpg
src/assets/ss3.jpg

## Conclusion

This project demonstrates a functional and visually appealing frontend application using React. Through debugging and iterative improvements, the final result showcases proper component architecture, responsive design, and interactive UI behavior.

---


