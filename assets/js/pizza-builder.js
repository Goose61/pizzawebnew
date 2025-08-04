// Pizza Builder - Exact Implementation from Example
const pizzaContainer = document.getElementById('pizza-container');
const pizzaSection = document.querySelector('.pizza-builder-section');
const crust = document.getElementById('crust');
const sauce = document.getElementById('sauce');
const cheese = document.getElementById('cheese');
const toppings = document.getElementById('toppings');

// Layer info elements
const crustInfo = document.getElementById('crust-info');
const sauceInfo = document.getElementById('sauce-info');
const cheeseInfo = document.getElementById('cheese-info');
const toppingsInfo = document.getElementById('toppings-info');

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function animatePizza(progress) {
    // Opacity of whole container
    pizzaContainer.style.opacity = progress > 0 ? '1' : '0';

    // Crust layer
    const crustProgress = clamp(progress / 0.25, 0, 1);
    crust.style.opacity = crustProgress;
    crust.style.transform = `scale(${0.8 + 0.2 * crustProgress})`;
    
    // Show crust info when crust is building
    if (crustProgress > 0.5) {
        crustInfo.classList.add('active');
    } else {
        crustInfo.classList.remove('active');
    }

    // Sauce layer
    const sauceProgress = clamp((progress - 0.25) / 0.25, 0, 1);
    sauce.style.opacity = sauceProgress;
    sauce.style.transform = `scale(${0.8 + 0.2 * sauceProgress})`;
    
    // Show sauce info when sauce is building
    if (sauceProgress > 0.5) {
        sauceInfo.classList.add('active');
    } else {
        sauceInfo.classList.remove('active');
    }

    // Cheese layer
    const cheeseProgress = clamp((progress - 0.5) / 0.25, 0, 1);
    cheese.style.opacity = cheeseProgress;
    cheese.style.transform = `scale(${0.8 + 0.2 * cheeseProgress})`;
    
    // Show cheese info when cheese is building
    if (cheeseProgress > 0.5) {
        cheeseInfo.classList.add('active');
    } else {
        cheeseInfo.classList.remove('active');
    }

    // Toppings layer
    const toppingsProgress = clamp((progress - 0.75) / 0.25, 0, 1);
    toppings.style.opacity = toppingsProgress;
    toppings.style.transform = `scale(${0.8 + 0.2 * toppingsProgress})`;
    
    // Show toppings info when toppings are building
    if (toppingsProgress > 0.5) {
        toppingsInfo.classList.add('active');
    } else {
        toppingsInfo.classList.remove('active');
    }

    return toppingsProgress === 1;
}

// Scroll control variables
let buildProgress = 0;
let isInPizzaSection = false;
let isPizzaBuilt = false;
let hasCompletedBuildOnce = false;

// Enhanced touch variables for mobile support
let touchStartY = 0;
let touchStartProgress = 0;
let isTouchDevice = false;
let isTouchActive = false;
let touchSensitivity = 150; // Adjustable sensitivity for mobile

// Wheel event handler for precise control (desktop)
function handleWheel(e) {
    // If not in pizza section or already built, do nothing
    if (!isInPizzaSection || hasCompletedBuildOnce) return;

    // Prevent default scrolling
    e.preventDefault();

    // Adjust build progress based on wheel delta
    buildProgress += e.deltaY > 0 ? 0.05 : -0.05;
    buildProgress = clamp(buildProgress, 0, 1);

    // Check if pizza is fully built
    isPizzaBuilt = animatePizza(buildProgress);

    // If fully built, mark as completed
    if (isPizzaBuilt) {
        hasCompletedBuildOnce = true;
    }

    // If scrolled back to beginning, reset
    if (buildProgress <= 0) {
        isPizzaBuilt = false;
    }
}

// Enhanced scroll event to detect pizza section
window.addEventListener('scroll', (e) => {
    const sectionRect = pizzaSection.getBoundingClientRect();
    
    // Check if pizza section is in view
    const newIsInPizzaSection = 
        sectionRect.top <= 0 && 
        sectionRect.bottom >= 0;

    if (newIsInPizzaSection && !isInPizzaSection) {
        // Entering pizza section
        if (!hasCompletedBuildOnce) {
            isInPizzaSection = true;
            isPizzaBuilt = false;
            buildProgress = 0;
            animatePizza(buildProgress);
            
            // Scroll to top of pizza section
            window.scrollTo(0, pizzaSection.offsetTop);
        }
    }
    else if (!newIsInPizzaSection) {
        // Outside pizza section
        isInPizzaSection = false;
        
        if (hasCompletedBuildOnce) {
            // Fully built, allow normal scrolling
            animatePizza(1);
        } else {
            // Reset if not fully built
            buildProgress = 0;
            animatePizza(buildProgress);
        }
    }
});

// Enhanced touch event handlers for mobile support
function handleTouchStart(e) {
    if (!isInPizzaSection || hasCompletedBuildOnce) return;
    
    isTouchActive = true;
    touchStartY = e.touches[0].clientY;
    touchStartProgress = buildProgress;
    
    // Prevent default to avoid scrolling
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!isInPizzaSection || hasCompletedBuildOnce || !isTouchActive) return;
    
    e.preventDefault();
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    
    // Adjust build progress based on touch movement with improved sensitivity
    buildProgress = touchStartProgress + (deltaY / touchSensitivity);
    buildProgress = clamp(buildProgress, 0, 1);
    
    // Check if pizza is fully built
    isPizzaBuilt = animatePizza(buildProgress);
    
    // If fully built, mark as completed
    if (isPizzaBuilt) {
        hasCompletedBuildOnce = true;
        isTouchActive = false;
    }
}

function handleTouchEnd(e) {
    if (!isInPizzaSection || hasCompletedBuildOnce) return;
    
    isTouchActive = false;
    
    // If fully built, allow normal scrolling
    if (isPizzaBuilt) {
        hasCompletedBuildOnce = true;
    }
}

// Enhanced detect touch device with better detection
function detectTouchDevice() {
    isTouchDevice = 'ontouchstart' in window || 
                   navigator.maxTouchPoints > 0 || 
                   navigator.msMaxTouchPoints > 0;
    
    // Adjust sensitivity based on device
    if (isTouchDevice) {
        // Increase sensitivity for mobile devices
        touchSensitivity = 100;
        
        // Add visual feedback for mobile users
        if (pizzaSection) {
            pizzaSection.style.touchAction = 'none';
        }
    }
}

// Add mobile-specific optimizations
function addMobileOptimizations() {
    if (isTouchDevice) {
        // Add haptic feedback if available
        if (navigator.vibrate) {
            // Vibrate when pizza is complete
            const originalAnimatePizza = animatePizza;
            animatePizza = function(progress) {
                const result = originalAnimatePizza(progress);
                if (result && !hasCompletedBuildOnce) {
                    navigator.vibrate(200);
                }
                return result;
            };
        }
        
        // Add visual indicators for mobile
        if (pizzaSection) {
            const mobileHint = document.createElement('div');
            mobileHint.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.8); font-size: 0.9rem; margin: 10px 0;">👆 Swipe up to build your pizza!</p>';
            mobileHint.style.position = 'absolute';
            mobileHint.style.top = '20px';
            mobileHint.style.left = '50%';
            mobileHint.style.transform = 'translateX(-50%)';
            mobileHint.style.zIndex = '10';
            pizzaSection.appendChild(mobileHint);
            
            // Remove hint after first interaction
            const removeHint = () => {
                mobileHint.remove();
                window.removeEventListener('touchstart', removeHint);
            };
            window.addEventListener('touchstart', removeHint);
        }
    }
}

// Prevent default scroll behavior in pizza section
window.addEventListener('wheel', handleWheel, { passive: false });

// Add enhanced touch event listeners for mobile
window.addEventListener('touchstart', handleTouchStart, { passive: false });
window.addEventListener('touchmove', handleTouchMove, { passive: false });
window.addEventListener('touchend', handleTouchEnd, { passive: false });

// Initialize
detectTouchDevice();
addMobileOptimizations();
animatePizza(0); 