// Typing Animation for Hero Section with enhanced features
const typingText = document.getElementById('typing-text');
if (typingText) {
  const phrases = [
    "Frontend Developer",
    "UI/UX Enthusiast",
    "Continuous Learner",
    "Tech Explorer 🚀",
    "Problem Solver 💡"
  ];
  const colors = ["#007bff", "#ff9800", "#43a047", "#e91e63", "#00bcd4"];
  let phraseIndex = 0, charIndex = 0, isDeleting = false, loopCount = 0;

  // Create and style the blinking cursor
  let cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.marginLeft = '2px';
  cursor.style.animation = 'blink 1s infinite';
  typingText.after(cursor);

  // Add blinking cursor animation via JS
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    #typing-text {
      transition: color 0.5s, text-shadow 0.5s;
      text-shadow: 0 2px 12px #007bff33;
      font-weight: 600;
      letter-spacing: 1px;
    }
  `;
  document.head.appendChild(style);

  function type() {
    const currentPhrase = phrases[phraseIndex];
    typingText.style.color = colors[phraseIndex % colors.length];
    typingText.style.textShadow = `0 2px 12px ${colors[phraseIndex % colors.length]}44`;

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 600);
      } else {
        setTimeout(type, 40);
      }
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex++);
      if (charIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1100);
      } else {
        setTimeout(type, 90);
      }
    }
  }
  type();
}

// 2. Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 3. Animate Skill Bars on Scroll
function animateSkillBars() {
  const bars = document.querySelectorAll('.progress');
  bars.forEach(bar => {
    const width = bar.getAttribute('style').match(/width:\s*([\d.]+%)/);
    if (width) {
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1.2s cubic-bezier(.77,0,.18,1)';
        bar.style.width = width[1];
      }, 200);
    }
  });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// 4. Show/Hide Navbar on Scroll (optional enhancement)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > lastScroll && window.scrollY > 80) {
    navbar.style.top = '-80px'; // Hide
  } else {
    navbar.style.top = '0'; // Show
  }
  lastScroll = window.scrollY;
});

// Section fade-in on scroll
const sections = document.querySelectorAll('section');
function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// 5. 3D Card Tilt Effect for Project Cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the card
    const y = e.clientY - rect.top;  // y position within the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    card.style.transition = 'transform 0.1s';
    card.style.zIndex = 10;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    card.style.transition = 'transform 0.4s cubic-bezier(.25,.8,.25,1)';
    card.style.zIndex = '';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s';
  });
});

// Dark Mode Toggle
const darkToggle = document.getElementById('dark-toggle');
if (darkToggle) {
  darkToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
  });
}

// Certificate modal logic
document.querySelectorAll('.cert-link').forEach(item => {
  item.addEventListener('click', function() {
    const imgSrc = this.getAttribute('data-img');
    if (imgSrc) {
      document.getElementById('cert-img').src = imgSrc;
      document.getElementById('cert-modal').style.display = 'flex';
    }
  });
});
document.querySelector('.cert-close').onclick = function() {
  document.getElementById('cert-modal').style.display = 'none';
};
document.getElementById('cert-modal').onclick = function(e) {
  if (e.target === this) this.style.display = 'none';
};