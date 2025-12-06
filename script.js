/* ===== Preloader ===== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
});

/* ===== Scroll Progress Bar ===== */
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scroll-bar');
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollBar.style.width = scrollPercent + '%';
});

/* ===== Smooth Scroll for Nav Links ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ===== Reveal Animations ===== */
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if(revealTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ===== Typed Hero Text ===== */
const heroText = ["Web Developer", "Frontend Enthusiast", "UI/UX Designer"];
let textIndex = 0;
let charIndex = 0;
const typedTextSpan = document.getElementById('typed-text'); 

const type = () => {
    if(textIndex < heroText.length) {
        if(charIndex < heroText[textIndex].length) {
            typedTextSpan.textContent += heroText[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 1500);
        }
    }
};

const erase = () => {
    if(charIndex > 0) {
        typedTextSpan.textContent = heroText[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100);
    } else {
        textIndex = (textIndex + 1) % heroText.length;
        setTimeout(type, 500);
    }
};
if (typedTextSpan) {
    window.addEventListener('load', type);
}

/* ===== Skills Animation ===== */
const skillBars = document.querySelectorAll('.skill-bar span');
const animateSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return; 

    const sectionTop = skillsSection.getBoundingClientRect().top;
    if(sectionTop < window.innerHeight - 50) {
        skillBars.forEach(bar => {
            if (bar.dataset.width) { 
                bar.style.width = bar.dataset.width;
            }
        });
        window.removeEventListener('scroll', animateSkills); 
    }
};
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

/* ===== Back to Top Button ===== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if(window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Modal (Enhanced Interactivity) ===== */
const hireModal = document.getElementById('hireModal');
const hireBtn = document.getElementById('hireBtn');
const closeModalBtn = document.getElementById('closeModal');
const hireForm = document.getElementById('hireForm');
const hireStatusMessage = document.getElementById('hireStatusMessage');

const openModal = () => {
    hireModal.style.display = 'flex';
    // Use timeout to ensure display:flex is applied before transition starts
    setTimeout(() => {
        hireModal.classList.add('show-modal');
    }, 10); 
};

const closeModal = () => {
    hireModal.classList.remove('show-modal');
    setTimeout(() => {
        hireModal.style.display = 'none';
        // Reset form and message on close for next use
        if (hireForm) hireForm.reset();
        if (hireStatusMessage) {
            hireStatusMessage.textContent = '';
            hireStatusMessage.classList.remove('success', 'error');
        }
    }, 300); // Match transition duration in CSS
};

hireBtn?.addEventListener('click', openModal);
closeModalBtn?.addEventListener('click', closeModal);
window.addEventListener('click', e => {
    if(e.target == hireModal) closeModal();
});

// NEW: Form Submission and Validation Logic
hireForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('hireName').value.trim();
    const email = document.getElementById('hireEmail').value.trim();
    const details = document.getElementById('hireDetails').value.trim();

    // Basic Validation Check
    if (!name || !email || !details) {
        hireStatusMessage.textContent = 'Please fill out all fields.';
        hireStatusMessage.classList.add('error');
        hireStatusMessage.classList.remove('success');
        return;
    }

    // Prepare for simulated submission
    const inputs = this.querySelectorAll('input, textarea, button');
    inputs.forEach(input => input.disabled = true);
    
    hireStatusMessage.textContent = 'Sending request...';
    hireStatusMessage.classList.remove('error', 'success');


    // Simulate network delay and response
    setTimeout(() => {
        // Re-enable inputs
        inputs.forEach(input => input.disabled = false);

        // Simulated success feedback
        hireStatusMessage.textContent = 'Request Sent Successfully! I will be in touch soon.';
        hireStatusMessage.classList.add('success');

        // Auto-close modal after success message
        setTimeout(closeModal, 2000); 

    }, 1500); // Simulate network delay
});

/* ===== Copy Email Button ===== */
const copyEmailBtn = document.getElementById('copyEmailBtn'); 
const emailToCopy = document.getElementById('emailText')?.textContent || 'yourname@example.com'; 

copyEmailBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(emailToCopy)
        .then(() => alert('Email copied to clipboard: ' + emailToCopy))
        .catch(() => alert('Failed to copy email.'));
});

/* ===== Custom Cursor ===== */
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

/* ===== Theme Toggle (NEW INTERACTIVE FEATURE) ===== */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const icon = themeToggleBtn?.querySelector('i');
const body = document.body;

// Check for saved preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    // Change icon to moon if light theme is active
    if (icon) icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggleBtn?.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    // Update icon and save preference
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        if (icon) icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }
});


/* ===== Particles.js Initialization ===== */
if(window.particlesJS){
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff4081" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ff4081", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}