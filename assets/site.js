(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('aero-theme');
  const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'dark' : 'light';

  // ── Progress helpers ─────────────────────────────────────────
  const PROGRESS_KEY = 'aero-progress';

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
    catch { return {}; }
  }

  function saveProgress(slug, state) {
    const p = loadProgress();
    p[slug] = state;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  }

  function getSlug() {
    const parts = location.pathname.replace(/\/+$/, '').split('/');
    return parts[parts.length - 1] || '';
  }

  // ── On lesson pages: mark started, wire complete button ──────
  function initLessonProgress() {
    const slug = getSlug();
    if (!slug || slug === '' || slug === 'index') return; // not a lesson page

    const progress = loadProgress();

    // Mark as started if not already done
    if (!progress[slug]) {
      saveProgress(slug, 'started');
    }

    // Show completed chip in lesson-meta if already done
    if (progress[slug] === 'done') {
      const meta = document.querySelector('.lesson-meta');
      if (meta && !meta.querySelector('.lesson-done-chip')) {
        const chip = document.createElement('span');
        chip.className = 'lesson-done-chip';
        chip.innerHTML = '✓ Completed';
        meta.appendChild(chip);
      }
    }

    // Wire the mark-complete button
    const btn = document.querySelector('.mark-complete-btn');
    if (!btn) return;

    if (progress[slug] === 'done') {
      btn.classList.add('done');
      btn.textContent = '✓ Lesson complete';
    }

    btn.addEventListener('click', () => {
      saveProgress(slug, 'done');
      btn.classList.add('done');
      btn.textContent = '✓ Lesson complete';

      // Add completed chip to meta if not present
      const meta = document.querySelector('.lesson-meta');
      if (meta && !meta.querySelector('.lesson-done-chip')) {
        const chip = document.createElement('span');
        chip.className = 'lesson-done-chip';
        chip.innerHTML = '✓ Completed';
        meta.appendChild(chip);
      }
    });
  }

  // ── On homepage: render progress bar and card badges ─────────
  const MODULE_SLUGS = [
    'air-is-a-fluid','drag','lift-downforce','airfoil-mastery',
    'front-wing-engineer','rear-wing-master','venturi-theory',
    'diffusers-floors','aero-balance','cooling-packaging',
    'kart-aero-basics',
    'wind-tunnel-testing','cfd-fundamentals'
  ];

  function renderHomepageProgress() {
    const progressWrap = document.getElementById('progress-bar');
    const moduleGrid   = document.querySelector('.module-grid');
    if (!progressWrap || !moduleGrid) return;

    const progress   = loadProgress();
    const quizScores = (() => {
      try { return JSON.parse(localStorage.getItem('aero-quiz-scores') || '{}'); }
      catch { return {}; }
    })();

    const done  = MODULE_SLUGS.filter(s => progress[s] === 'done').length;
    const total = MODULE_SLUGS.length;
    const pct   = Math.round((done / total) * 100);

    progressWrap.innerHTML = `
      <div class="progress-bar-wrap">
        <div class="progress-bar-meta">
          <b>${done === total ? '🏆 All lessons complete!' : `${done} / ${total} lessons complete`}</b>
          <span>${pct}%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
      </div>
    `;

    // Add badges to module cards
    const cards = moduleGrid.querySelectorAll('.module-card');
    cards.forEach((card, i) => {
      const slug = MODULE_SLUGS[i];
      if (!slug) return;

      // Remove any existing badges first
      card.querySelectorAll('.card-badge').forEach(b => b.remove());

      if (progress[slug] === 'done') {
        const badge = document.createElement('div');
        badge.className = 'card-badge';
        badge.innerHTML = '✓ Done';
        card.appendChild(badge);
      }

      const qs = quizScores[slug];
      if (qs && qs.score === qs.total) {
        const badge = document.createElement('div');
        badge.className = 'card-badge card-badge--quiz';
        badge.innerHTML = '🏆 Quiz';
        card.appendChild(badge);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // ── Theme toggle ────────────────────────────────────────────
    const toggle = document.querySelector('[data-theme-toggle]');
    const syncToggle = () => {
      if (!toggle) return;
      const isDark = root.dataset.theme === 'dark';
      toggle.innerHTML = `<span aria-hidden="true">${isDark ? '☀' : '☾'}</span><span>${isDark ? 'Light' : 'Dark'}</span>`;
      toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    };
    toggle?.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('aero-theme', root.dataset.theme);
      syncToggle();
    });
    syncToggle();

    // ── Mobile menu ─────────────────────────────────────────────
    const menu = document.querySelector('[data-menu]');
    const nav  = document.querySelector('[data-nav]');
    menu?.addEventListener('click', () => {
      const open = nav?.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(Boolean(open)));
    });

    // ── Lazy image fade-in ───────────────────────────────────────
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    });

    // ── 3D model lazy-load ───────────────────────────────────────
    document.querySelectorAll('[data-load-model]').forEach((button) => {
      button.addEventListener('click', () => {
        const shell  = button.closest('.model-shell');
        const viewer = shell?.querySelector('model-viewer');
        const src    = button.getAttribute('data-model-src');
        if (!viewer || !src) return;
        viewer.setAttribute('src', src);
        button.hidden = true;
      }, { once: true });
    });

    // ── Progress: lesson pages ───────────────────────────────────
    initLessonProgress();

    // ── Progress: homepage ───────────────────────────────────────
    renderHomepageProgress();

    // ── Ctrl+K wiring (search.js creates the modal; we just fire the shortcut) ──
    // search.js handles this itself; no additional wiring needed here.

    // Re-render homepage badges when quiz is saved from this tab
    window.addEventListener('aero-quiz-saved', () => {
      renderHomepageProgress();
    });
  });
})();
