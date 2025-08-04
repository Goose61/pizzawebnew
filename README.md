# 🍕 Pizza Coin - New Frontend

## Overview
This is the new frontend for Pizza Coin, built on the Grilli restaurant template with enhanced pizza-themed functionality and animations.

## 🚀 Features Implemented

### ✅ Pizza Builder Animation
- **Scroll-based pizza building**: The pizza builds layer by layer as you scroll through the section
- **Four layers**: Crust (Core Team), Sauce (Mission & Vision), Cheese (Hard Work & Dedication), Toppings (Technology)
- **Interactive layer showcase**: Click on layer items to highlight corresponding pizza layers
- **Floating emojis**: Animated pizza-themed emojis floating around the builder
- **Completion effects**: Sparkle animations when pizza is fully built

### ✅ Enhanced Navigation
- **Hover animations**: Navigation links scale and change color on hover
- **Smooth transitions**: All navigation elements have smooth animations
- **Underline effects**: Animated underlines on hover

### ✅ Gallery Integration
- **Campaign gallery**: Displays community impact photos with hover effects
- **Scroll animations**: Gallery items animate in as they enter the viewport
- **Responsive grid**: Gallery adapts to different screen sizes

### ✅ Video Section
- **Pizza animation video**: Integrated the scooby-doo.mp4 video
- **Enhanced styling**: Video container with rounded corners and shadows
- **Responsive design**: Video scales properly on all devices

### ✅ Mission & Vision Section
- **Enhanced styling**: Mission and vision blocks with hover effects
- **Professional layout**: Clean, modern design with pizza-themed colors
- **Contract address display**: Prominently displayed contract address

### ✅ Community Section
- **Interactive cards**: Community involvement cards with hover animations
- **Three categories**: Partnership, Volunteer, and DAO participation
- **Call-to-action**: Direct link to Telegram community

## 🎨 Design Features

### Color Scheme
- **Primary Orange**: #FFA500 (Pizza-themed orange)
- **Secondary Red**: #FF6347 (Tomato sauce red)
- **Accent Gold**: #FFD700 (Cheese yellow)
- **Dark Brown**: #8B4513 (Crust brown)

### Animations
- **Anime.js Integration**: Smooth, professional animations throughout
- **Scroll-triggered**: Animations activate based on scroll position
- **Hover effects**: Interactive elements respond to user interaction
- **Floating elements**: Dynamic floating emojis and sparkles

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Flexible grid**: Gallery and layout adapt to viewport
- **Touch-friendly**: All interactive elements work on touch devices

## 📁 File Structure

```
new-frontend/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.css         # Base Grilli styles
│   │   └── pizza-custom.css  # Pizza-themed enhancements
│   ├── js/
│   │   ├── script.js         # Base functionality
│   │   └── pizza-builder.js  # Pizza builder animations
│   └── images/
│       ├── pizza/
│       │   ├── pizzaimages/  # Pizza logos and NFTs
│       │   ├── campaign-gallery/ # Community photos
│       │   └── animations/   # Video files
│       └── [other assets]    # Grilli template assets
└── README.md                 # This file
```

## 🛠️ Technical Implementation

### Pizza Builder Animation
- **Fixed positioning**: Pizza stays centered during scroll
- **Layer-by-layer building**: Each layer appears as you scroll
- **Progress tracking**: Smooth transitions between layers
- **Interactive elements**: Click to highlight specific layers

### Gallery System
- **Intersection Observer**: Animates items as they enter viewport
- **Grid layout**: Responsive CSS Grid for optimal layout
- **Hover effects**: Scale and overlay effects on images

### Navigation Enhancements
- **CSS transitions**: Smooth color and scale changes
- **Underline animations**: Animated underlines on hover
- **Active states**: Clear indication of current section

## 🎯 Key Sections

1. **Hero Section**: Eye-catching introduction with pizza-themed content
2. **Pizza Builder**: Interactive scroll-based pizza building animation
3. **Mission & Vision**: Clear presentation of project goals
4. **Video Section**: Pizza animation video showcase
5. **Gallery**: Community impact photo gallery
6. **Community**: Ways to get involved with the project

## 🚀 Getting Started

1. **Open the website**: Run `start-new-frontend.bat` or open `index.html` in a browser
2. **Test the pizza builder**: Scroll through the pizza builder section to see the animation
3. **Explore the gallery**: Check out the community photos with hover effects
4. **Try the navigation**: Hover over navigation items to see animations

## 🎨 Customization

### Adding New Layers
To add new pizza layers, modify the `pizza-builder.js` file:
1. Add new layer elements in the HTML
2. Update the `layers` array in the JavaScript
3. Add corresponding CSS styles

### Changing Colors
Modify the CSS variables in `pizza-custom.css`:
```css
:root {
  --pizza-orange: #FFA500;
  --pizza-red: #FF6347;
  --pizza-yellow: #FFD700;
}
```

### Adding New Animations
Use Anime.js for new animations:
```javascript
anime({
  targets: '.element',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutQuad'
});
```

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 🎯 Performance

- **Optimized images**: All images are compressed for web
- **Lazy loading**: Gallery images load as needed
- **Smooth animations**: 60fps animations using requestAnimationFrame
- **Responsive design**: Fast loading on all devices

## 🔧 Troubleshooting

### Pizza Builder Not Working
- Check if Anime.js is loaded properly
- Ensure all pizza layer elements exist in HTML
- Verify scroll event listeners are attached

### Gallery Not Animating
- Check Intersection Observer support
- Ensure gallery items have proper CSS classes
- Verify images are loading correctly

### Navigation Issues
- Check if CSS transitions are enabled
- Ensure navigation links have proper classes
- Verify hover states are defined

## 🚀 Future Enhancements

- [ ] Add more interactive pizza toppings
- [ ] Implement sound effects for pizza building
- [ ] Add more gallery filtering options
- [ ] Create mobile-specific animations
- [ ] Add loading animations for images
- [ ] Implement dark/light theme toggle

---

**Built with ❤️ and 🍕 for the Pizza Coin Community!** 