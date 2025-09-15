/* ==========================================================================
   PART 2: JAVASCRIPT FUNCTIONS — SCOPE, PARAMETERS & RETURN VALUES
   ========================================================================== */

// Global variables (demonstrating global scope)
let animationsEnabled = true;
let cardData = [
    { 
        title: "Web Design", 
        description: "Creating beautiful and responsive websites", 
        icon: "🎨", 
        color: "#ff9a9e" 
    },
    { 
        title: "JavaScript", 
        description: "Building interactive and dynamic applications", 
        icon: "⚡", 
        color: "#a8edea" 
    },
    { 
        title: "Animation", 
        description: "Bringing user interfaces to life", 
        icon: "🎬", 
        color: "#fecfef" 
    }
];

/* ==========================================================================
   UTILITY FUNCTIONS WITH PARAMETERS AND RETURN VALUES
   ========================================================================== */

/**
 * Function with parameters and return value - calculates random position
 * @param {number} min - Minimum value (default: 0)
 * @param {number} max - Maximum value (default: 100)
 * @returns {number} Random integer between min and max
 */
function getRandomPosition(min = 0, max = 100) {
    // Local variable (demonstrating local scope)
    const range = max - min;
    const randomValue = Math.random() * range + min;
    return Math.floor(randomValue);
}

/**
 * Function with parameters - creates particle DOM elements
 * @param {number} x - X position percentage
 * @param {number} y - Y position percentage
 * @param {number} delay - Animation delay in seconds
 * @returns {HTMLElement} Created particle element
 */
function createParticle(x, y, delay = 0) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animationDelay = delay + 's';
    return particle;
}

/**
 * Function that uses local variables and returns calculated value
 * @param {number} index - Card index
 * @param {number} baseDelay - Base delay time (default: 0.2)
 * @returns {number} Calculated animation delay
 */
function calculateAnimationDelay(index, baseDelay = 0.2) {
    // Local variables demonstrating function scope
    const multiplier = index + 1;
    const calculatedDelay = baseDelay * multiplier;
    return calculatedDelay;
}

/**
 * Function with parameter and return value - generates card HTML
 * @param {Object} cardInfo - Card data object
 * @param {number} index - Card index
 * @returns {string} Generated HTML string
 */
function createCardHTML(cardInfo, index) {
    return `
        <div class="card hidden" data-index="${index}" onclick="flipCard(this)">
            <div class="card-front">
                <div class="card-image" style="background: linear-gradient(45deg, ${cardInfo.color}, #fecfef);">
                    ${cardInfo.icon}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${cardInfo.title}</h3>
                    <p class="card-description">${cardInfo.description}</p>
                </div>
            </div>
            <div class="card-back">
                <h3>More Info</h3>
                <p>This is the back side of the ${cardInfo.title} card. Click again to flip back!</p>
                <p><strong>Technologies:</strong> HTML, CSS, JavaScript</p>
            </div>
        </div>
    `;
}

/* ==========================================================================
   SCOPE DEMONSTRATION - CLOSURE EXAMPLE
   ========================================================================== */

/**
 * Function demonstrating closure and private variables
 * @returns {Function} Counter function with private state
 */
function createCounter() {
    // Private variable (local scope) - not accessible outside this function
    let count = 0;
    
    // Return function that has access to the private variable (closure)
    return function() {
        count++;
        console.log(`Counter: ${count}`);
        return count;
    };
}

// Create a counter instance demonstrating closure
const myCounter = createCounter();

/* ==========================================================================
   INITIALIZATION FUNCTIONS
   ========================================================================== */

/**
 * Function demonstrating scope - uses global variables and local variables
 * Initializes background particles
 */
function initializeParticles() {
    const particleContainer = document.getElementById('particles');
    const particleCount = 20; // Local constant
    
    // Local loop variable
    for (let i = 0; i < particleCount; i++) {
        // Using utility functions with parameters and return values
        const x = getRandomPosition(0, 100);
        const y = getRandomPosition(0, 100);
        const delay = getRandomPosition(0, 6);
        
        // Create particle using function that returns DOM element
        const particle = createParticle(x, y, delay);
        particleContainer.appendChild(particle);
    }
}

/**
 * Function to render all cards using global cardData array
 * Demonstrates array iteration and function composition
 */
function renderCards() {
    const container = document.getElementById('cardContainer');
    let cardsHTML = ''; // Local variable
    
    // Using forEach to demonstrate functional programming
    cardData.forEach((card, index) => {
        cardsHTML += createCardHTML(card, index);
    });
    
    container.innerHTML = cardsHTML;
    
    // Animate cards in with staggered timing using calculated delays
    const cards = container.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const delay = calculateAnimationDelay(index);
        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('visible');
        }, delay * 1000);
    });
}

/* ==========================================================================
   PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT
   ========================================================================== */

/**
 * Function that triggers CSS animations by adding/removing classes
 * @param {HTMLElement} cardElement - The card element to flip
 */
function flipCard(cardElement) {
    // Check global variable state
    if (!animationsEnabled) return;
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Toggle the flipped class to trigger CSS 3D transition
    cardElement.classList.toggle('flipped');
    
    // Add temporary pulse effect using CSS animation class
    cardElement.classList.add('pulse');
    setTimeout(() => {
        cardElement.classList.remove('pulse');
    }, 2000);
}

/**
 * Function to add CSS ripple effect to buttons
 * Demonstrates class manipulation for animation triggers
 */
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // Add class to trigger CSS animation
        btn.classList.add('clicked');
        setTimeout(() => {
            btn.classList.remove('clicked');
        }, 600);
    });
}

/**
 * Function to toggle animations globally
 * Modifies CSS properties dynamically with JavaScript
 */
function toggleAnimation() {
    // Modify global variable
    animationsEnabled = !animationsEnabled;
    const cards = document.querySelectorAll('.card');
    
    if (animationsEnabled) {
        // Re-enable CSS transitions
        cards.forEach(card => {
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        showNotification('Animations enabled!', 'success');
    } else {
        // Disable CSS transitions
        cards.forEach(card => {
            card.style.transition = 'none';
        });
        showNotification('Animations disabled!', 'warning');
    }
}

/**
 * Function to show loading animation
 * Controls CSS display properties and triggers entrance animations
 */
function showLoading() {
    const loading = document.getElementById('loading');
    const cards = document.getElementById('cardContainer');
    
    // Hide cards and show loading using CSS display control
    cards.style.display = 'none';
    loading.style.display = 'block';
    
    // Simulate loading for 3 seconds, then re-animate cards
    setTimeout(() => {
        loading.style.display = 'none';
        cards.style.display = 'flex';
        
        // Re-trigger entrance animations for cards
        const cardElements = cards.querySelectorAll('.card');
        cardElements.forEach((card, index) => {
            card.classList.add('hidden');
            const delay = calculateAnimationDelay(index, 0.1);
            setTimeout(() => {
                card.classList.remove('hidden');
                card.classList.add('visible');
            }, delay * 1000);
        });
    }, 3000);
}

/**
 * Function to reset all cards to original state
 * Removes CSS animation classes and adds temporary effects
 */
function resetCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Remove animation classes
        card.classList.remove('flipped', 'pulse');
        
        // Add temporary highlight effect with inline styles
        card.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
        card.style.transform = 'scale(1.02)';
        
        // Remove highlight effect after delay
        setTimeout(() => {
            card.style.boxShadow = '';
            card.style.transform = '';
        }, 1000);
    });
    
    showNotification('Cards reset to original state!', 'info');
}

/* ==========================================================================
   MODAL FUNCTIONS - CSS CLASS MANIPULATION FOR ANIMATIONS
   ========================================================================== */

/**
 * Function to show modal with CSS animation
 * Adds class to trigger CSS transition effects
 */
function showModal() {
    const modal = document.getElementById('modal');
    // Add class to trigger CSS opacity and scale transitions
    modal.classList.add('show');
}

/**
 * Function to hide modal with CSS animation
 * Removes class to trigger CSS transition effects
 */
function hideModal() {
    const modal = document.getElementById('modal');
    // Remove class to trigger CSS opacity and scale transitions
    modal.classList.remove('show');
}

/* ==========================================================================
   DYNAMIC CONTENT FUNCTIONS
   ========================================================================== */

/**
 * Function to add new card dynamically
 * Demonstrates array manipulation and re-rendering
 */
function addNewCard() {
    // Local object with card data
    const newCard = {
        title: "New Project",
        description: "This card was added dynamically with JavaScript!",
        icon: "✨",
        color: "#84fab0"
    };
    
    // Modify global array
    cardData.push(newCard);
    
    // Re-render all cards with new data
    renderCards();
    
    showNotification('New card added successfully!', 'success');
}

/**
 * Utility function to show notifications
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, warning, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 2000;
        transform: translateX(300px);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
    `;
    
    document.body.appendChild(notification);
    
    // Trigger slide-in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/* ==========================================================================
   EVENT LISTENERS AND INITIALIZATION
   ========================================================================== */

/**
 * Keyboard event handler demonstrating event-driven programming
 * @param {KeyboardEvent} event - Keyboard event object
 */
function handleKeyboardInput(event) {
    // Local variable in event handler
    const key = event.key.toLowerCase();
    
    // Switch statement for different key actions
    switch(key) {
        case 'r':
            resetCards();
            break;
        case 'a':
            toggleAnimation();
            break;
        case 'l':
            showLoading();
            break;
        case 'n':
            addNewCard();
            break;
        case 'escape':
            hideModal();
            break;
        case 'h':
            showHelpModal();
            break;
    }
}

/**
 * Function to show help modal with keyboard shortcuts
 */
function showHelpModal() {
    const helpContent = `
        <h3>Keyboard Shortcuts</h3>
        <ul style="text-align: left; margin: 1rem 0;">
            <li><strong>R</strong> - Reset all cards</li>
            <li><strong>A</strong> - Toggle animations</li>
            <li><strong>L</strong> - Show loading animation</li>
            <li><strong>N</strong> - Add new card</li>
            <li><strong>H</strong> - Show this help</li>
            <li><strong>ESC</strong> - Close modal</li>
        </ul>
    `;
    
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    const originalContent = modalContent.innerHTML;
    
    modalContent.innerHTML = helpContent + '<button class="btn" onclick="hideModal()">Close</button>';
    modal.classList.add('show');
    
    // Restore original content when closed
    setTimeout(() => {
        if (!modal.classList.contains('show')) {
            modalContent.innerHTML = originalContent;
        }
    }, 300);
}

/* ==========================================================================
   APPLICATION INITIALIZATION
   ========================================================================== */

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
function initializeApp() {
    // Initialize background particles
    initializeParticles();
    
    // Render cards with staggered animation after short delay
    setTimeout(() => {
        renderCards();
    }, 500);
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboardInput);
    
    // Add click listener to close modal when clicking outside
    document.getElementById('modal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideModal();
        }
    });
    
    // Log interactive tips to console
    console.log('🎯 Interactive Portfolio Loaded!');
    console.log('📋 Available interactions:');
    console.log('• Click any card to flip it (3D CSS animation)');
    console.log('• Hover over cards for elevation effects');
    console.log('• Use control buttons for different animations');
    console.log('• Press H for keyboard shortcuts');
    console.log('');
    console.log('🔧 Technical Features Demonstrated:');
    console.log('• CSS3 Transitions and Keyframe Animations');
    console.log('• JavaScript Functions with Parameters & Return Values');
    console.log('• Local vs Global Scope Examples');
    console.log('• Dynamic CSS Class Manipulation');
    console.log('• Event-Driven Animation Triggers');
    
    // Demonstrate counter closure
    console.log('');
    console.log('🎲 Testing closure example:');
    myCounter(); // Will log "Counter: 1"
    myCounter(); // Will log "Counter: 2"
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
