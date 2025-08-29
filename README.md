# Ashiq Babu - Portfolio (React Version)

A modern, animated portfolio website built with React.js and enhanced with Framer Motion animations.

## ✨ Features

### 🎨 **Enhanced Visual Effects**
- **Floating particles** background animation
- **Animated gradient** backgrounds that shift over time
- **Parallax effects** based on mouse movement
- **Smooth scroll animations** with intersection observer
- **Typing animation** in the hero section
- **Hover effects** with scale and glow animations

### 🚀 **Interactive Components**
- **Animated navigation** with smooth transitions
- **Project cards** with hover overlays and tag animations
- **Modal system** for project details with smooth enter/exit animations
- **Responsive design** that works on all devices
- **Keyboard navigation** (Escape key to close modals)

### 🎯 **Modern React Features**
- **Framer Motion** for smooth animations
- **React Hooks** for state management
- **Component-based architecture**
- **Intersection Observer** for scroll-triggered animations
- **TypeScript-ready** structure

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Copy images to public folder:**
   ```bash
   # Make sure your images are in the public/images folder
   # The following images should be present:
   # - profilepic.jpg
   # - Screenshot 2025-08-09 111021.png
   # - Perfil 2.jpg
   # - Screenshot 2025-08-09 110707.png
   # - download (2).gif
   # - porsche.jpg
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation component
│   ├── Hero.js           # Hero section with typing animation
│   ├── Projects.js       # Projects grid with animations
│   ├── ProjectModal.js   # Modal for project details
│   └── Footer.js         # Footer with contact info
├── App.js                # Main app component
├── App.css              # Enhanced styles with animations
├── index.js             # React entry point
└── index.css            # Global styles

public/
├── images/              # All portfolio images
└── index.html          # HTML template
```

## 🎨 Animation Features

### **Background Effects**
- Animated gradient that cycles through different positions
- Floating particles that move randomly across the screen
- Parallax effects that respond to mouse movement

### **Component Animations**
- **Header**: Fade-in with staggered children
- **Hero**: Typing animation, parallax effects, scale animations
- **Projects**: Staggered card animations, hover overlays
- **Modal**: Scale and fade animations with backdrop blur

### **Interactive Elements**
- Button hover effects with scale and glow
- Card hover animations with 3D transforms
- Smooth transitions between states
- Loading animations for content

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Push your code to GitHub
2. Connect your repository to Netlify or Vercel
3. Deploy automatically

## 🎯 Key Improvements Over Original HTML

1. **Enhanced Animations**: Added Framer Motion for smooth, professional animations
2. **Better UX**: Improved hover states, loading animations, and transitions
3. **Modern Architecture**: Component-based structure for better maintainability
4. **Performance**: Optimized animations and lazy loading
5. **Accessibility**: Better keyboard navigation and focus management
6. **Responsive**: Enhanced mobile experience with touch-friendly interactions

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Typed** - Typing animation
- **React Intersection Observer** - Scroll animations
- **CSS3** - Modern CSS with custom properties and animations

## 📱 Responsive Design

The portfolio is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized layouts for all screen sizes
- Smooth animations that work on mobile devices

## 🎨 Customization

### Colors
All colors are defined as CSS custom properties in `App.css`:
```css
:root {
  --bg: #05060a;
  --card: #0f1720;
  --muted: #9aa6b2;
  --accent: #7cf1ff;
  --accent-2: #9b7cff;
}
```

### Animations
Animation durations and easing can be customized in the component files using Framer Motion variants.

## 📞 Contact

- **Phone**: 9074549166
- **Email**: ashiqb0703@gmail.com
- **GitHub**: [ashiq1307](https://github.com/ashiq1307)
- **LinkedIn**: [Ashiq Babu](https://www.linkedin.com/in/ashiq-babu-904277247/)

---

Made with ❤️ using React & Framer Motion
