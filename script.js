// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: true,
  offset: 100
});

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.classList.add(savedTheme);
} else {
  // Default to dark mode
  htmlElement.classList.add('dark-mode');
}

// Update theme toggle icon
function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (htmlElement.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

updateThemeIcon();

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  if (htmlElement.classList.contains('dark-mode')) {
    htmlElement.classList.remove('dark-mode');
    htmlElement.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
  } else {
    htmlElement.classList.remove('light-mode');
    htmlElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  }
  updateThemeIcon();
});

// Loading Screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 800);
});

// Navigation Scroll Effects
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const backToTopBtn = document.getElementById('back-to-top');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollPercent = (scrollY / docHeight) * 100;
  
  // Update scroll progress
  scrollProgress.style.width = `${scrollPercent}%`;
  
  // Navbar background on scroll
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
  
  // Update active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Skill Progress Bars Animation
const skillCategories = document.querySelectorAll('.skill-category');
const observerOptions = {
  threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

skillCategories.forEach(category => {
  skillObserver.observe(category);
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category.includes(filter)) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);



// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Console Easter Egg
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px;');
console.log('%cFeel free to reach out if you have any questions.', 'font-size: 14px; color: #38bdf8;');
