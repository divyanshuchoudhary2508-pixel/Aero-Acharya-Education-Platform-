/* Aero Acharya — Search Engine
   Reads AERO_SEARCH_INDEX from search-index.js
   Opens via Ctrl+K or the search icon button in the nav          */

(() => {
  // ── Helpers ──────────────────────────────────────────────────
  function getRoot() {
    // Determine path prefix so links work from both / and /modules/slug/
    const depth = location.pathname.split('/').filter(Boolean).length;
    if (depth === 0) return './';
    return '../'.repeat(depth);
  }

  function highlight(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }

  function excerpt(text, query, maxLen = 140) {
    const lower = text.toLowerCase();
    const idx = lower.indexOf(query.toLowerCase());
    let start = Math.max(0, idx - 40);
    let snippet = (start > 0 ? '…' : '') + text.slice(start, start + maxLen);
    if (start + maxLen < text.length) snippet += '…';
    return highlight(snippet, query);
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const index = window.AERO_SEARCH_INDEX || [];
    const results = [];

    index.forEach(entry => {
      const inLesson  = entry.lesson.toLowerCase().includes(q);
      const inSection = entry.section.toLowerCase().includes(q);
      const inText    = entry.text.toLowerCase().includes(q);
      if (inLesson || inSection || inText) {
        results.push({ entry, score: (inLesson ? 3 : 0) + (inSection ? 2 : 0) + (inText ? 1 : 0) });
      }
    });

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(r => r.entry);
  }

  // ── Modal HTML ───────────────────────────────────────────────
  function createModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Search lessons');
    modal.hidden = true;

    modal.innerHTML = `
      <div class="search-backdrop" id="search-backdrop"></div>
      <div class="search-panel">
        <div class="search-input-row">
          <span class="search-icon-inner" aria-hidden="true">🔍</span>
          <input
            id="search-input"
            class="search-input"
            type="search"
            placeholder="Search lessons…"
            autocomplete="off"
            spellcheck="false"
            aria-label="Search lessons"
          >
          <kbd class="search-kbd">Esc</kbd>
        </div>
        <div id="search-results" class="search-results" role="listbox" aria-label="Search results"></div>
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  // ── Render results ───────────────────────────────────────────
  function renderResults(results, query, container, root) {
    if (!query || query.length < 2) {
      container.innerHTML = `<p class="search-hint">Start typing to search across all 10 lessons…</p>`;
      return;
    }
    if (results.length === 0) {
      container.innerHTML = `<p class="search-hint">No results for <strong>${query}</strong>. Try a different term.</p>`;
      return;
    }

    // Group by lesson for cleaner display
    const grouped = {};
    results.forEach(r => {
      if (!grouped[r.slug]) grouped[r.slug] = { lesson: r.lesson, entries: [] };
      grouped[r.slug].entries.push(r);
    });

    let html = '';
    Object.entries(grouped).forEach(([slug, group]) => {
      html += `<div class="search-group">
        <span class="search-group-label">${highlight(group.lesson, query)}</span>`;
      group.entries.forEach(entry => {
        const href = `${root}modules/${slug}/`;
        html += `<a class="search-result" href="${href}" role="option">
          <span class="search-result-section">${highlight(entry.section, query)}</span>
          <span class="search-result-excerpt">${excerpt(entry.text, query)}</span>
        </a>`;
      });
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // ── Wire everything ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const modal    = createModal();
    const backdrop = modal.querySelector('#search-backdrop');
    const input    = modal.querySelector('#search-input');
    const results  = modal.querySelector('#search-results');

    // Determine relative root path once
    const root = getRoot();

    function open() {
      modal.hidden = false;
      document.body.classList.add('search-open');
      input.value = '';
      results.innerHTML = `<p class="search-hint">Start typing to search across all 10 lessons…</p>`;
      requestAnimationFrame(() => input.focus());
    }

    function close() {
      modal.hidden = true;
      document.body.classList.remove('search-open');
    }

    // Search icon buttons (one in header per page)
    document.querySelectorAll('[data-search-open]').forEach(btn => {
      btn.addEventListener('click', open);
    });

    // Ctrl+K / Cmd+K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        modal.hidden ? open() : close();
      }
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    // Backdrop click closes
    backdrop.addEventListener('click', close);

    // Live search
    let debounceTimer;
    let searchedFired = false;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = input.value.trim();
        const hits = search(q);
        renderResults(hits, q, results, root);
        // Fire achievement event once
        if (q.length >= 2 && !searchedFired) {
          searchedFired = true;
          window.dispatchEvent(new Event('aero-searched'));
        }
      }, 120);
    });
  });
})();
