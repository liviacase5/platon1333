// ===================== GLOBAL UTILS =====================
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ===================== NAVBAR SCROLL =====================
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ===================== AGE GATE =====================
function enterSite() {
  const gate = document.getElementById('ageGate');
  if (!gate) return;
  sessionStorage.setItem('ageVerified', '1');
  gate.classList.add('hidden');
  setTimeout(() => gate.style.display = 'none', 600);
}
(function () {
  const gate = document.getElementById('ageGate');
  if (!gate) return;
  if (sessionStorage.getItem('ageVerified')) gate.style.display = 'none';
})();

// ===================== HERO SLIDESHOW =====================
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides.length) return;

  let current = 0;
  let autoTimer;

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
    // Update now-playing text dynamically
    const titles = ['Golden Hour – Studio Sessions', 'City Lights – Night Edition', 'Candlelight – Luxury Edition'];
    const badge = document.getElementById('nowPlayingBadge');
    if (badge && titles[current]) {
      badge.childNodes[badge.childNodes.length - 1].textContent = ' NOW PLAYING';
    }
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(current + 1), 5000);
  }

  window.goToSlide = goToSlide;
  window.changeSlide = function (dir) {
    goToSlide(current + dir);
    startAuto(); // reset timer on manual nav
  };

  startAuto();
})();

// ===================== SEARCH =====================
function syncSearch(val) {
  // Sync navbar search if it exists
  const navInput = document.getElementById('searchInput');
  if (navInput && navInput.value !== val) navInput.value = val;
  filterByQuery(val);
}

function doSearch() {
  const input = document.getElementById('heroSearch') || document.getElementById('searchInput');
  if (input) filterByQuery(input.value);
}

function quickSearch(term) {
  const heroInput = document.getElementById('heroSearch');
  const navInput = document.getElementById('searchInput');
  if (heroInput) heroInput.value = term;
  if (navInput) navInput.value = term;
  filterByQuery(term);
  // Scroll to videos
  const vid = document.getElementById('videos');
  if (vid) vid.scrollIntoView({ behavior: 'smooth' });
}

function filterByQuery(q) {
  const query = (q || '').toLowerCase().trim();
  document.querySelectorAll('.video-card').forEach(card => {
    if (!query) {
      card.style.display = '';
      return;
    }
    const title = card.querySelector('.card-title');
    card.style.display = (title && title.textContent.toLowerCase().includes(query)) ? '' : 'none';
  });
}

(function () {
  const navInput = document.getElementById('searchInput');
  if (navInput) {
    navInput.addEventListener('input', function () {
      const heroInput = document.getElementById('heroSearch');
      if (heroInput) heroInput.value = this.value;
      filterByQuery(this.value);
    });
  }
})();

// ===================== CATEGORY FILTER =====================
function filterCategory(el, cat) {
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.video-card[data-cat]').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===================== VIDEO ACTIONS =====================
function openVideo(id) {
  window.location.href = 'watch.html';
}
function promptUpgrade() {
  showToast('🔒 Members only! Join to unlock this video.');
}

// ===================== SCROLL ANIMATIONS =====================
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
})();

// ===================== MOBILE MENU =====================
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.dataset.open === '1';
  if (isOpen) {
    links.removeAttribute('style');
    links.dataset.open = '0';
  } else {
    Object.assign(links.style, {
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg-secondary)', position: 'fixed',
      top: '70px', left: '0', right: '0',
      padding: '20px 5%', borderBottom: '1px solid var(--border)', gap: '16px', zIndex: '999'
    });
    links.dataset.open = '1';
  }
}
