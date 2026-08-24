/* ===========================
   main.js — skynni portfolio
   =========================== */

// ── NAV: scroll state & active link ──────────────────────────────────────────
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');
const sections = document.querySelectorAll('section[id], header[id]');

function updateNav() {
  // Scrolled shadow
  nav.classList.toggle('scrolled', window.scrollY > 20);

  // Active link highlight
  let currentId = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) currentId = section.id;
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.slice(1);
    link.classList.toggle('active', href === currentId);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── NAV: hamburger mobile ─────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger-btn');
const navLinksList = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// ── SMOOTH SCROLL ────────────────────────────────────────────────────────────
const NAV_HEIGHT = 72; // px — high of fixed nav

/**
 * Easing: ease-in-out cubic
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Track the current animation frame so we can cancel mid-scroll
let scrollRafId = null;

/**
 * Smooth-scroll to a given Y position over `duration` ms.
 */
function smoothScrollTo(targetY, duration = 700) {
  // Cancel any in-flight scroll animation
  if (scrollRafId !== null) {
    cancelAnimationFrame(scrollRafId);
    scrollRafId = null;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  // Nothing to do
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      scrollRafId = requestAnimationFrame(step);
    } else {
      scrollRafId = null;
    }
  }

  scrollRafId = requestAnimationFrame(step);
}

/**
 * Intercept all clicks on anchor links pointing to #id targets.
 */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').slice(1);
  if (!targetId) return;

  const target = document.getElementById(targetId);
  if (!target) return;

  e.preventDefault();

  // Close mobile nav if open
  hamburger.classList.remove('open');
  navLinksList.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');

  // Per-section extra offset (positive = scroll further down / lower anchor)
  const SECTION_EXTRA_OFFSET = { dubbing: 100 };
  const extraOffset = SECTION_EXTRA_OFFSET[targetId] ?? 0;

  const targetY = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + extraOffset;
  smoothScrollTo(Math.max(0, targetY));

  // Update URL hash without jumping
  history.pushState(null, '', `#${targetId}`);
});

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.section__header, .char-card, .music-track, .lektor-card, .kontakt__body'
);

// Add reveal class
revealEls.forEach(el => el.classList.add('reveal'));

// Wrap character grid & music list for stagger
const charGrid = document.getElementById('characters-grid');
const musicList = document.getElementById('music-list');
const lektorGrid = document.getElementById('lektor-grid');

[charGrid, musicList, lektorGrid].forEach(grid => {
  if (grid) grid.classList.add('reveal-stagger');
});

// Remove individual reveal from staggered children
charGrid?.querySelectorAll('.char-card').forEach(el => el.classList.remove('reveal'));
musicList?.querySelectorAll('.music-track').forEach(el => el.classList.remove('reveal'));
lektorGrid?.querySelectorAll('.lektor-card').forEach(el => el.classList.remove('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

// ── AUDIO PLAYER ENGINE ───────────────────────────────────────────────────────

/** Global currently-playing state so only one audio plays at a time */
let currentPlayer = null;

/**
 * Format seconds → m:ss
 */
function formatTime(secs) {
  if (!isFinite(secs) || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Initialise a single .player element
 */
function initPlayer(playerEl) {
  const audioId = playerEl.dataset.audio;
  const audioEl = document.getElementById(audioId);
  if (!audioEl) return;

  const btn = playerEl.querySelector('.player__btn');
  const track = playerEl.querySelector('.player__track');
  const progress = playerEl.querySelector('.player__progress');
  const timeEl = playerEl.querySelector('.player__time');
  const iconPlay = playerEl.querySelector('.icon-play');
  const iconPause = playerEl.querySelector('.icon-pause');

  if (!btn || !track || !progress || !timeEl) return;

  function setPlayingUI(playing) {
    iconPlay.classList.toggle('hidden', playing);
    iconPause.classList.toggle('hidden', !playing);
    btn.setAttribute('aria-pressed', playing);
  }

  function resetUI() {
    setPlayingUI(false);
    progress.style.width = '0%';
    timeEl.textContent = '0:00';
    track.setAttribute('aria-valuenow', 0);
  }

  // Play/pause button
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (currentPlayer && currentPlayer.audioEl !== audioEl) {
      // Pause the previously playing audio
      currentPlayer.audioEl.pause();
      currentPlayer.resetUI();
      currentPlayer = null;
    }

    if (audioEl.paused) {
      audioEl.play().catch(() => {});
      setPlayingUI(true);
      currentPlayer = { audioEl, resetUI };
    } else {
      audioEl.pause();
      setPlayingUI(false);
      currentPlayer = null;
    }
  });

  // Update progress bar
  audioEl.addEventListener('timeupdate', () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    progress.style.width = pct + '%';
    timeEl.textContent = formatTime(audioEl.currentTime);
    track.setAttribute('aria-valuenow', Math.round(pct));
  });

  // Load duration
  audioEl.addEventListener('loadedmetadata', () => {
    timeEl.textContent = formatTime(audioEl.duration);
  });

  // Ended
  audioEl.addEventListener('ended', () => {
    resetUI();
    currentPlayer = null;
  });

  // Seek on track click
  track.addEventListener('click', (e) => {
    if (!audioEl.duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioEl.currentTime = ratio * audioEl.duration;
    if (audioEl.paused) {
      audioEl.play().catch(() => {});
      setPlayingUI(true);
      currentPlayer = { audioEl, resetUI };
    }
  });

  // Keyboard support on character cards
  const card = btn.closest('.char-card');
  if (card) {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  }
}

// Initialise all players
document.querySelectorAll('.player').forEach(initPlayer);

// ── SMOOTH HOVER CURSOR on char cards ────────────────────────────────────────
document.querySelectorAll('.char-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    card.style.transform = `translateY(-6px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── REDUCE MOTION: respect prefers-reduced-motion ────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.char-card').forEach(card => {
    card.addEventListener('mousemove', () => {});
    card.addEventListener('mouseleave', () => {});
  });
}

console.log('%cskynni portfolio | Cześć! 👋', 'font-size:14px;font-family:monospace;color:#1a1a1a');
