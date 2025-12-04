// DOM elements
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalTime = document.querySelector('.digital-time');
const dateDisplay = document.querySelector('.date-display');
const characterInfo = document.querySelector('.character-info');
const themeToggle = document.getElementById('theme-toggle');
const soundToggle = document.getElementById('sound-toggle');
const avengersMode = document.getElementById('avengers-mode');

// Sound effects
const tickSound = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
const characterSounds = {
    'Iron Man': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='),
    'Captain America': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='),
    'Thor': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='),
    'Hulk': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='),
    'Black Widow': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA=='),
    'Hawkeye': new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==')
};

// Sound state
let soundEnabled = true;

// Character information
const characterDetails = {
    'Iron Man': 'Genius, billionaire, playboy, philanthropist. Creator of the Iron Man suit.',
    'Captain America': 'Super-soldier from WWII, leader of the Avengers, wields the vibranium shield.',
    'Thor': 'God of Thunder from Asgard, wields Mjolnir and Stormbreaker.',
    'Hulk': 'Bruce Banner transforms into the incredible Hulk when angry.',
    'Black Widow': 'Expert spy and hand-to-hand combatant, former KGB agent.',
    'Hawkeye': 'Master archer with perfect accuracy, former S.H.I.E.L.D. agent.'
};

// Set up the clock
function setClock() {
    const now = new Date();
    
    // Get time components
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;
    
    // Calculate angles for clock hands
    const secondsAngle = (seconds / 60) * 360;
    const minutesAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hoursAngle = (hours / 12) * 360 + (minutes / 60) * 30;
    
    // Apply rotations to clock hands
    secondHand.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;
    
    // Update digital time
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    digitalTime.textContent = timeString;
    
    // Update date display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    
    // Play tick sound if enabled
    if (soundEnabled && seconds % 2 === 0) {
        tickSound.currentTime = 0;
        tickSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Set up character interactions
function setupCharacterInteractions() {
    const characters = document.querySelectorAll('.character');
    
    characters.forEach(character => {
        const characterName = character.getAttribute('data-character');
        
        character.addEventListener('mouseenter', () => {
            characterInfo.textContent = characterDetails[characterName];
            characterInfo.style.color = getCharacterColor(characterName);
            characterInfo.style.textShadow = `0 0 5px ${getCharacterColor(characterName)}`;
            
            if (soundEnabled && characterSounds[characterName]) {
                characterSounds[characterName].currentTime = 0;
                characterSounds[characterName].play().catch(e => console.log("Audio play failed:", e));
            }
        });
        
        character.addEventListener('mouseleave', () => {
            characterInfo.textContent = 'Hover over an Avenger to see details';
            characterInfo.style.color = '#aaa';
            characterInfo.style.textShadow = 'none';
        });
        
        character.addEventListener('click', () => {
            // Add a pulse effect when clicked
            character.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                character.style.animation = '';
            }, 500);
        });
    });
}

// Get character color for text
function getCharacterColor(characterName) {
    const colors = {
        'Iron Man': '#ff0000',
        'Captain America': '#0047ab',
        'Thor': '#ffd700',
        'Hulk': '#228b22',
        'Black Widow': '#8b0000',
        'Hawkeye': '#4b0082'
    };
    return colors[characterName] || '#aaa';
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Update button text based on current theme
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = 'Light Theme';
    } else {
        themeToggle.textContent = 'Dark Theme';
    }
});

// Sound toggle functionality
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = `Sound: ${soundEnabled ? 'ON' : 'OFF'}`;
});

// Avengers Mode functionality
avengersMode.addEventListener('click', () => {
    document.body.classList.toggle('avengers-mode');
    
    if (document.body.classList.contains('avengers-mode')) {
        avengersMode.textContent = 'Normal Mode';
        // Add some avengers particles
        createAvengersParticles();
    } else {
        avengersMode.textContent = 'Avengers Mode';
        // Remove avengers particles
        const particles = document.querySelectorAll('.avengers-particle');
        particles.forEach(particle => particle.remove());
    }
});

// Initialize the clock
setClock();
setupCharacterInteractions();

// Update the clock every second
setInterval(setClock, 1000);

// Add some random particle effects in the background
function createParticles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.zIndex = '-1';
        container.appendChild(particle);
        
        // Animate the particle
        animateParticle(particle);
    }
}

// Create Avengers-themed particles
function createAvengersParticles() {
    const container = document.querySelector('.container');
    const avengersColors = ['#ff0000', '#0047ab', '#ffd700', '#228b22', '#8b0000', '#4b0082'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('avengers-particle');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = avengersColors[Math.floor(Math.random() * avengersColors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.zIndex = '-1';
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        container.appendChild(particle);
        
        // Animate the particle with Avengers theme
        animateAvengersParticle(particle);
    }
}

function animateParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let xSpeed = (Math.random() - 0.5) * 0.5;
    let ySpeed = (Math.random() - 0.5) * 0.5;
    
    function move() {
        x += xSpeed;
        y += ySpeed;
        
        // Bounce off edges
        if (x <= 0 || x >= 100) xSpeed *= -1;
        if (y <= 0 || y >= 100) ySpeed *= -1;
        
        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        
        requestAnimationFrame(move);
    }
    
    move();
}

function animateAvengersParticle(particle) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let xSpeed = (Math.random() - 0.5) * 1.5;
    let ySpeed = (Math.random() - 0.5) * 1.5;
    
    function move() {
        x += xSpeed;
        y += ySpeed;
        
        // Wrap around edges
        if (x <= -5) x = 105;
        if (x >= 105) x = -5;
        if (y <= -5) y = 105;
        if (y >= 105) y = -5;
        
        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        
        requestAnimationFrame(move);
    }
    
    move();
}

// Start particle animation
createParticles();