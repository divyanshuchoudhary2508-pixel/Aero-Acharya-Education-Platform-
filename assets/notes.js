/* Aero Acharya — Floating Notes Widget
   Per-lesson sticky notepad, saved to localStorage               */

document.addEventListener('DOMContentLoaded', () => {
  // Only show on lesson pages
  if (!document.querySelector('.lesson-layout')) return;

  const slug = location.pathname.replace(/\/+$/, '').split('/').pop();
  const NOTES_KEY = 'aero-notes';

  function loadNotes() {
    try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveNote(text) {
    const n = loadNotes();
    n[slug] = text;
    localStorage.setItem(NOTES_KEY, JSON.stringify(n));
    if (text.trim()) {
      window.dispatchEvent(new Event('aero-noted'));
    }
  }

  const widget = document.createElement('div');
  widget.id = 'notes-widget';
  widget.innerHTML = `
    <button class="notes-toggle" id="notes-toggle" aria-label="Open lesson notes" title="My Notes">
      <span class="notes-toggle-icon">💬</span>
      <span class="notes-toggle-label">Notes</span>
    </button>
    <div class="notes-panel" id="notes-panel" hidden>
      <div class="notes-panel-header">
        <span>My notes for this lesson</span>
        <button class="notes-close" id="notes-close" aria-label="Close notes">✕</button>
      </div>
      <textarea class="notes-textarea" id="notes-textarea" placeholder="Write anything here… your notes are saved automatically and stay private on this device."></textarea>
      <div class="notes-footer">
        <span class="notes-saved" id="notes-saved"></span>
        <button class="notes-clear" id="notes-clear">Clear</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  const toggle    = document.getElementById('notes-toggle');
  const panel     = document.getElementById('notes-panel');
  const textarea  = document.getElementById('notes-textarea');
  const closeBtn  = document.getElementById('notes-close');
  const clearBtn  = document.getElementById('notes-clear');
  const savedSpan = document.getElementById('notes-saved');

  // Load existing note
  const existing = loadNotes()[slug] || '';
  textarea.value = existing;

  let saveTimer;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimer);
    savedSpan.textContent = 'Saving…';
    saveTimer = setTimeout(() => {
      saveNote(textarea.value);
      savedSpan.textContent = 'Saved ✓';
      setTimeout(() => savedSpan.textContent = '', 2000);
    }, 600);
  });

  clearBtn.addEventListener('click', () => {
    if (!textarea.value || confirm('Clear your notes for this lesson?')) {
      textarea.value = '';
      saveNote('');
      savedSpan.textContent = 'Cleared';
      setTimeout(() => savedSpan.textContent = '', 1500);
    }
  });

  function openPanel() {
    panel.hidden = false;
    toggle.classList.add('active');
    textarea.focus();
  }
  function closePanel() {
    panel.hidden = true;
    toggle.classList.remove('active');
  }

  toggle.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
  closeBtn.addEventListener('click', closePanel);
});
