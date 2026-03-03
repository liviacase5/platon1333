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
(function() {
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

(function() {
  const gate = document.getElementById('ageGate');
  if (!gate) return;
  if (sessionStorage.getItem('ageVerified')) {
    gate.style.display = 'none';
  }
})();

// ===================== OPEN VIDEO / UPGRADE =====================
function openVideo(id) {
  window.location.href = 'watch.html';
}

function promptUpgrade() {
  showToast('🔒 Members only! Join to unlock this video.');
  setTimeout(() => {
    // Subtle shake on the join btn
    const btn = document.getElementById('hero-join-btn');
    if (btn) {
      btn.style.transform = 'translateX(-4px)';
      setTimeout(() => btn.style.transform = 'translateX(4px)', 100);
      setTimeout(() => btn.style.transform = '', 200);
    }
  }, 300);
}

// ===================== CATEGORY FILTER =====================
function filterCategory(el, cat) {
  // Update active chip
  document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  // Filter cards
  const cards = document.querySelectorAll('.video-card[data-cat]');
  cards.forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===================== SEARCH =====================
(function() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    if (!q) {
      document.querySelectorAll('.video-card').forEach(c => c.style.display = '');
      return;
    }
    document.querySelectorAll('.video-card').forEach(card => {
      const title = card.querySelector('.card-title');
      if (title && title.textContent.toLowerCase().includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
})();

// ===================== SCROLL ANIMATIONS =====================
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
})();

// ===================== MOBILE MENU =====================
function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (links.style.display === 'flex') {
    links.style.display = '';
    links.style.flexDirection = '';
    links.style.background = '';
    links.style.position = '';
    links.style.top = '';
    links.style.left = '';
    links.style.right = '';
    links.style.padding = '';
    links.style.borderBottom = '';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.background = 'var(--bg-secondary)';
    links.style.position = 'fixed';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '20px 5%';
    links.style.borderBottom = '1px solid var(--border)';
    links.style.gap = '16px';
  }
}

// ===================== FEATURE BOX HOVER =====================
(function() {
  document.querySelectorAll('.feature-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
      box.style.borderColor = 'var(--border-accent)';
      box.style.transform = 'translateY(-4px)';
      box.style.boxShadow = 'var(--shadow-glow)';
    });
    box.addEventListener('mouseleave', () => {
      box.style.borderColor = '';
      box.style.transform = '';
      box.style.boxShadow = '';
    });
  });
})();
