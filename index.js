/**
 * Raniel Miranda - Vanilla JavaScript Engine
 * Handles smooth scrolling, scroll-spy navbar updates,
 * 3-slide preview carousel with animated transitions, and contact form dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_PROJECT_IMAGE = './images/projects/placeholder.png';

  // ==========================================
  // 1. PROJECT DATA
  // ==========================================
  const projects = [
    {
      id: 'Capstone-Web-Portfolio',
      badge: 'Live Project',
      title: 'Capstone Web Portfolio',
      description:
        'A capstone web portfolio showcasing the numerous projects, tools, and technologies that I am aware of',
      tags: ['HTML', 'Bootstrap', 'JavaScript', 'tailwindcss'],
      imageBg: './images/projects/capstone-web-portfolio.png',
    },
    {
      id: 'E-commerce-API',
      badge: 'Future Project',
      title: 'E-Commerce API Documentation',
      description:
        'Dynamic E-Commerce Workflow Management. The system features dynamic routes for order processing, real-time inventory updates, and secure user authentication. It also supports seamless automated order reporting and comprehensive product management. Documented Backend API published publicly using Postman',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
      imageBg: DEFAULT_PROJECT_IMAGE,
    },
    {
      id: 'Course-Booking-API',
      badge: 'Future Project',
      title: 'Course Booking API Documentation',
      description:
        'RESTful API for managing course enrollments, featuring user registration, authentication, and retrieval of user details. Supports course creation, updates, archiving, activation, and student enrollment. Publicly documented using Postman.',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
      imageBg: DEFAULT_PROJECT_IMAGE,
    },
    {
      id: 'Course-Booking-App',
      badge: 'Future Project',
      title: 'Course Booking App',
      description:
        'A MERN-stack course enrollment sytstem featuring user registration, authentication, and profile management. Authenticated users can create, update, archive, and activate courses The platform also allows users to browse available courses and enroll seamlessly.',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
      imageBg: DEFAULT_PROJECT_IMAGE,
    },
    {
      id: 'E-Commerce-App',
      badge: 'Future Project',
      title: 'E-Commerce App',
      description:
        'MERN E-Commerce Platform. The platform features dynamic product catalog with filtering and sorting. real-time search, seamless cart updates, secure checkout, and a comprehensive admin dashboard with real-time analytics and user management capabilities.',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
      imageBg: DEFAULT_PROJECT_IMAGE,
    },
    {
      id: 'Airline-Mockup',
      badge: 'Future Project',
      title: 'Airline Booking System Mockup',
      description:
        'Side Project: Conceptual design showcasing an intuitive UIfor flight search, seat selection, and booking confirmation, focusing on user experience and workflow efficiency.',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
        imageBg: DEFAULT_PROJECT_IMAGE,
    },
    {
      id: 'Airline-Prototype',
      badge: 'Future Project',
      title: 'Airline Booking System Prototype',
      description:
        'Side Project: Interactive prototype simulating end-to-end airline booking functionalities, including flight search, reservation, payment, processing, and real-time ticket management.',
      tags: ['Python', 'HTML', 'Bootstrap', 'Postman'],
      imageBg: DEFAULT_PROJECT_IMAGE,
    },
  ];

  let currentIndex = 0;
  const total = projects.length;

  const carouselStage = document.getElementById('carouselStage');
  const paginationDots = document.getElementById('paginationDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const actionNotice = document.getElementById('actionNotice');
  const actionNoticeText = document.getElementById('actionNoticeText');

  // ==========================================
  // 2. 3-SLIDE PREVIEW CAROUSEL
  // ==========================================
  function showActionNotice(text) {
    if (!actionNotice || !actionNoticeText) return;
    actionNoticeText.textContent = text;
    actionNotice.classList.remove('d-none');
    setTimeout(() => {
      actionNotice.classList.add('d-none');
    }, 2500);
  }

  function openProjectLightbox(src, title) {
    const existingLightbox = document.getElementById('projectLightbox');
    if (existingLightbox) existingLightbox.remove();

    const lightbox = document.createElement('div');
    lightbox.id = 'projectLightbox';
    lightbox.className = 'project-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', `${title} preview`);

    const panel = document.createElement('div');
    panel.className = 'project-lightbox-panel';

    const image = document.createElement('img');
    image.className = 'project-lightbox-image';
    image.src = src || DEFAULT_PROJECT_IMAGE;
    image.alt = `${title} full preview`;
    image.loading = 'eager';

    const label = document.createElement('div');
    label.className = 'project-lightbox-label';
    label.textContent = title;

    panel.appendChild(image);
    panel.appendChild(label);
    lightbox.appendChild(panel);
    document.body.appendChild(lightbox);

    const closeLightbox = () => {
      lightbox.remove();
      document.removeEventListener('keydown', handleEscapeClose);
    };

    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', handleEscapeClose);

    requestAnimationFrame(() => lightbox.classList.add('show'));
  }

  function initCarousel() {
    if (!carouselStage) return;

    // Create cards for each project
    carouselStage.innerHTML = '';
    projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'carousel-slide-card standard-card p-4 p-md-5';
      card.dataset.index = idx;

      const tagsHtml = proj.tags
        .map(
          (t) => `<span class="project-tag">${t}</span>`
        )
        .join(' ');

      card.innerHTML = `
        <!-- Top Half: [IMAGE / PREVIEW SCREEN MOCK] -->
        <img
          class="project-card-visual"
          src="${proj.imageBg || DEFAULT_PROJECT_IMAGE}"
          alt="${proj.title} preview"
          loading="lazy"
          onerror="this.onerror=null;this.src='${DEFAULT_PROJECT_IMAGE}'"
          aria-label="Project preview image"
        />

        <!-- Bottom Half: [TEXT CONTENT] -->
        <div>
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
            <h3 class="project-card-title">${proj.title}</h3>
            <span class="project-badge">
              ${proj.badge}
            </span>
          </div>

          <p class="project-card-copy">
            ${proj.description}
          </p>

          <div class="d-flex flex-wrap mt-3">
            <strong> Stack Involved: </strong>
          </div>

          <div class="d-flex flex-wrap gap-2 mt-2">
            ${tagsHtml}
          </div>

          <div class="project-card-action-wrap">
            <a href="#projects" class="project-card-action" aria-label="View project ${proj.title}">
              <span>View Projects</span>
              <svg class="project-card-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </a>
          </div>
        </div>
      `;

      const previewImage = card.querySelector('.project-card-visual');
      previewImage?.addEventListener('click', (event) => {
        event.stopPropagation();
        openProjectLightbox(proj.imageBg || DEFAULT_PROJECT_IMAGE, proj.title);
      });

      // Live & Source button events
      const liveBtn = card.querySelector('.btn-live-preview');
      const sourceBtn = card.querySelector('.btn-source-code');

      liveBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showActionNotice(`Live Preview launched for ${proj.title}`);
      });

      sourceBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        showActionNotice(`Source Code opened for ${proj.title}`);
      });

      // Clicking side cards cycles to them
      card.addEventListener('click', () => {
        const prevIdx = (currentIndex - 1 + total) % total;
        const nextIdx = (currentIndex + 1) % total;
        if (idx === prevIdx) {
          currentIndex = prevIdx;
          updateCarousel();
        } else if (idx === nextIdx) {
          currentIndex = nextIdx;
          updateCarousel();
        }
      });

      carouselStage.appendChild(card);
    });

    // Create pagination dots
    if (paginationDots) {
      paginationDots.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `pagination-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        paginationDots.appendChild(dot);
      }
    }

    updateCarousel();
  }

  function updateCarousel() {
    const cards = carouselStage?.querySelectorAll('.carousel-slide-card');
    if (!cards) return;

    const prevIdx = (currentIndex - 1 + total) % total;
    const nextIdx = (currentIndex + 1) % total;

    cards.forEach((card, idx) => {
      card.classList.remove('active-slide', 'prev-slide', 'next-slide', 'hidden-slide');

      if (idx === currentIndex) {
        card.classList.add('active-slide');
      } else if (idx === prevIdx) {
        card.classList.add('prev-slide');
      } else if (idx === nextIdx) {
        card.classList.add('next-slide');
      } else {
        card.classList.add('hidden-slide');
      }
    });

    // Update dots
    const dots = paginationDots?.querySelectorAll('.pagination-dot');
    dots?.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  });

  initCarousel();

  // ==========================================
  // 3. ACTIVE NAV STATE SYNC ACROSS DESKTOP + MOBILE MENUS
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-pill-btn');

  function syncNavState(activeHash) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === activeHash;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  function updateActiveNav() {
    let activeHash = '#landing';
    const offset = window.innerHeight * 0.25;

    document.querySelectorAll('main section[id]').forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        activeHash = `#${section.id}`;
      }
    });

    syncNavState(activeHash);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      syncNavState(link.getAttribute('href'));
      const collapse = document.getElementById('mobileNavMenu');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
        bsCollapse.hide();
      }
    });
  });

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('load', updateActiveNav);
  updateActiveNav();

  // ==========================================
  // 4. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const successNotice = document.getElementById('successNotice');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  const sentName = document.getElementById('sentName');
  const sentSubject = document.getElementById('sentSubject');
  const sentEmail = document.getElementById('sentEmail');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameInput?.value || !emailInput?.value) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
    }

    setTimeout(() => {
      if (sentName) sentName.textContent = nameInput.value;
      if (sentSubject) sentSubject.textContent = subjectInput?.value || 'General Inquiry';
      if (sentEmail) sentEmail.textContent = emailInput.value;

      contactForm.classList.add('d-none');
      successNotice?.classList.remove('d-none');

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><i class="bi bi-send-fill fs-6 ms-1"></i>';
      }
    }, 700);
  });

  resetBtn?.addEventListener('click', () => {
    contactForm?.reset();
    successNotice?.classList.add('d-none');
    contactForm?.classList.remove('d-none');
  });
});

// ==========================================
// 5. TYPED TEXT ANIMATION
// ==========================================
const text = ["Precision", "Purpose", "Performance"];
const target = document.getElementById("typedText");

let wordIndex = 0;
let index = 0;
let isDeleting = false;

function typeLoop() {
  if (!isDeleting) {
    index++;
    target.textContent = text[wordIndex].slice(0, index);
  } else {
    index--;
    target.textContent = text[wordIndex].slice(0, index);
  }

  if (!isDeleting && index === text[wordIndex].length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (isDeleting && index === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % text.length;
    setTimeout(typeLoop, 350);
    return;
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeLoop, speed);
}

typeLoop();