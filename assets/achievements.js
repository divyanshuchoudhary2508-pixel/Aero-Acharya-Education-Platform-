/* Aero Acharya — Achievements + Certificate
   Badges unlocked by localStorage events.
   Certificate generated as a printable overlay.                   */

const ACHIEVEMENTS = [
  {
    id: 'first-step',
    icon: '🚀',
    title: 'First Step',
    desc: 'Completed your first lesson',
    check: (prog, scores) => Object.values(prog).some(v => v === 'done')
  },
  {
    id: 'halfway',
    icon: '📚',
    title: 'Halfway There',
    desc: 'Completed 5 lessons',
    check: (prog) => Object.values(prog).filter(v => v === 'done').length >= 5
  },
  {
    id: 'graduate',
    icon: '🎓',
    title: 'Graduate',
    desc: 'Completed all 13 lessons',
    check: (prog) => Object.values(prog).filter(v => v === 'done').length >= 13
  },
  {
    id: 'sharp-mind',
    icon: '🎯',
    title: 'Sharp Mind',
    desc: 'Scored 100% on any quiz',
    check: (prog, scores) => Object.values(scores).some(s => s.score === s.total && s.total > 0)
  },
  {
    id: 'perfect-scholar',
    icon: '🏆',
    title: 'Perfect Scholar',
    desc: 'Scored 100% on all 13 quizzes',
    check: (prog, scores) => {
      const slugs = ['air-is-a-fluid','drag','lift-downforce','airfoil-mastery','front-wing-engineer','rear-wing-master','venturi-theory','diffusers-floors','aero-balance','cooling-packaging','kart-aero-basics','wind-tunnel-testing','cfd-fundamentals'];
      return slugs.every(s => scores[s] && scores[s].score === scores[s].total);
    }
  },
  {
    id: 'explorer',
    icon: '🔍',
    title: 'Explorer',
    desc: 'Used the search feature',
    check: (prog, scores, flags) => !!flags.searched
  },
  {
    id: 'note-taker',
    icon: '📝',
    title: 'Note Taker',
    desc: 'Wrote your first lesson note',
    check: (prog, scores, flags) => !!flags.noted
  },
  {
    id: 'on-fire',
    icon: '🔥',
    title: 'On Fire',
    desc: '3-day learning streak',
    check: (prog, scores, flags) => {
      try {
        const d = JSON.parse(localStorage.getItem('aero-streak') || '{}');
        return (d.streak || 0) >= 3;
      } catch { return false; }
    }
  },
  {
    id: 'certified',
    icon: '📜',
    title: 'Certified',
    desc: 'Downloaded your completion certificate',
    check: (prog, scores, flags) => !!flags.certificated
  },
  {
    id: 'speed-reader',
    icon: '⚡',
    title: 'Speed Reader',
    desc: 'Completed a lesson in under 5 minutes',
    check: (prog, scores, flags) => !!flags.speedRead
  }
];

function loadFlags() {
  try { return JSON.parse(localStorage.getItem('aero-flags') || '{}'); } catch { return {}; }
}
function saveFlag(key) {
  const f = loadFlags();
  f[key] = true;
  localStorage.setItem('aero-flags', JSON.stringify(f));
}
function loadProg() {
  try { return JSON.parse(localStorage.getItem('aero-progress') || '{}'); } catch { return {}; }
}
function loadScores() {
  try { return JSON.parse(localStorage.getItem('aero-quiz-scores') || '{}'); } catch { return {}; }
}
function loadUnlocked() {
  try { return JSON.parse(localStorage.getItem('aero-achievements') || '[]'); } catch { return []; }
}
function saveUnlocked(list) {
  localStorage.setItem('aero-achievements', JSON.stringify(list));
}

function checkAchievements() {
  const prog    = loadProg();
  const scores  = loadScores();
  const flags   = loadFlags();
  const already = new Set(loadUnlocked());
  const newly   = [];

  ACHIEVEMENTS.forEach(a => {
    if (!already.has(a.id) && a.check(prog, scores, flags)) {
      already.add(a.id);
      newly.push(a);
    }
  });

  if (newly.length) {
    saveUnlocked([...already]);
    newly.forEach(a => showToast(a));
  }

  renderBadges();
}

// Toast notification for newly unlocked badge
function showToast(achievement) {
  const t = document.createElement('div');
  t.className = 'achievement-toast';
  t.innerHTML = `
    <span class="achievement-toast-icon">${achievement.icon}</span>
    <div>
      <strong>Achievement unlocked!</strong>
      <span>${achievement.title} — ${achievement.desc}</span>
    </div>
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
}

// Render badges dashboard on homepage
function renderBadges() {
  const container = document.getElementById('achievements-section');
  if (!container) return;

  const unlocked = new Set(loadUnlocked());
  const pageUrl = encodeURIComponent(window.location.origin + window.location.pathname);

  container.innerHTML = `
    <div class="achievements-wrap">
      <div class="achievements-header">
        <div>
          <p class="kicker">YOUR ACHIEVEMENTS</p>
          <h2>Badges earned</h2>
        </div>
        <span class="achievements-count">${unlocked.size} / ${ACHIEVEMENTS.length}</span>
      </div>
      <div class="achievements-grid">
        ${ACHIEVEMENTS.map(a => {
          const isUnlocked = unlocked.has(a.id);
          const tweetText = encodeURIComponent(`I just unlocked the "${a.title}" badge on Aero Acharya! 🏎️💨`);
          const shareHtml = isUnlocked ? `
            <div class="badge-share">
              <a href="https://twitter.com/intent/tweet?text=${tweetText}&url=${pageUrl}" target="_blank" title="Share on X" class="badge-share-btn tw">𝕏</a>
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" target="_blank" title="Share on LinkedIn" class="badge-share-btn li">in</a>
            </div>
          ` : '';
          return `
          <div class="badge-card ${isUnlocked ? 'badge-card--unlocked' : 'badge-card--locked'}">
            <span class="badge-icon">${a.icon}</span>
            <b class="badge-title">${a.title}</b>
            <p class="badge-desc">${a.desc}</p>
            ${shareHtml}
          </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ── Certificate ────────────────────────────────────────────────
function openCertificate() {
  const prog = loadProg();
  const done = Object.values(prog).filter(v => v === 'done').length;
  if (done < 13) {
    alert('Complete all 10 lessons to earn your certificate! You\'ve finished ' + done + ' / 10 so far.');
    return;
  }
  
  const pageUrl = encodeURIComponent(window.location.origin + window.location.pathname);
  const shareText = encodeURIComponent("I just completed the Aero Acharya Masterclass in Motorsport Aerodynamics! 🏎️💨");

  const overlay = document.createElement('div');
  overlay.className = 'cert-overlay';
  overlay.innerHTML = `
    <div class="cert-panel">
      <button class="cert-close" aria-label="Close">✕</button>
      <div class="cert-name-step" id="cert-step-1">
        <p class="kicker" style="color:var(--blue)">COMPLETION CERTIFICATE</p>
        <h2 style="font:500 clamp(28px,3vw,40px)/1.1 Georgia,serif;margin:10px 0 18px;">You did it!</h2>
        <p style="color:var(--muted);font-size:14px;margin:0 0 24px;">Enter your name to generate your personalised certificate.</p>
        <input class="cert-name-input" id="cert-name" type="text" placeholder="Your full name" maxlength="60" autocomplete="name">
        <button class="cert-generate-btn" id="cert-gen">Generate certificate →</button>
      </div>
      <div class="cert-doc" id="cert-step-2" hidden>
        <div class="cert-inner" id="cert-printable">
          <div class="cert-watermark">🏁</div>
          <p class="cert-label">CERTIFICATE OF COMPLETION</p>
          <p class="cert-presented">This certifies that</p>
          <h1 class="cert-name-display" id="cert-name-show"></h1>
          <p class="cert-body">has successfully completed all ten lessons of</p>
          <h2 class="cert-course">Aero Acharya</h2>
          <p class="cert-subtitle">Motorsport Aerodynamics — Beginner to Advanced</p>
          <div class="cert-divider"></div>
          <div class="cert-footer-row">
            <div><span class="cert-date" id="cert-date"></span><small>DATE COMPLETED</small></div>
            <div class="cert-brand"><span style="font:italic 28px Georgia,serif;color:var(--blue2)">A</span><span>Aero Acharya</span></div>
            <div><span>13 / 13</span><small>LESSONS COMPLETE</small></div>
          </div>
        </div>
        <div class="cert-actions">
          <button class="cert-print-btn" id="cert-print">↓ Download PDF</button>
          <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${pageUrl}" target="_blank" class="cert-share-btn tw">𝕏 Share</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" target="_blank" class="cert-share-btn li">in Share</a>
          <button class="cert-retake" id="cert-back">↺ Change name</button>
        </div>
        <p class="cert-online-note">PDF generation needs internet for now. The certificate sharing links will still work normally.</p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.cert-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  const nameInput = overlay.querySelector('#cert-name');
  overlay.querySelector('#cert-gen').addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    overlay.querySelector('#cert-name-show').textContent = name;
    overlay.querySelector('#cert-date').textContent = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    overlay.querySelector('#cert-step-1').hidden = true;
    overlay.querySelector('#cert-step-2').hidden = false;
    // Unlock achievement
    saveFlag('certificated');
    checkAchievements();
  });
  const printBtn = overlay.querySelector('#cert-print');
  printBtn.addEventListener('click', () => {
    printBtn.textContent = 'Generating PDF...';
    printBtn.disabled = true;

    if (!window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => downloadPDF();
      document.head.appendChild(script);
    } else {
      downloadPDF();
    }

    function downloadPDF() {
      const element = overlay.querySelector('#cert-printable');
      const rect = element.getBoundingClientRect();
      const wPx = rect.width;
      const hPx = rect.height;
      
      const opt = {
        margin:       0,
        filename:     'Aero-Acharya-Certificate.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true,
          scrollY: 0,
          onclone: function(clonedDoc) {
            const el = clonedDoc.getElementById('cert-printable');
            el.style.backgroundColor = '#f8f5ed';
            el.style.color = '#0a141c';
            el.style.borderColor = '#e2dcd0';
            
            const textNodes = [
              ...el.querySelectorAll('.cert-presented, .cert-body, .cert-subtitle, small')
            ];
            textNodes.forEach(n => n.style.color = '#5c6d79');
            
            el.querySelector('.cert-label').style.color = '#175679';
            el.querySelector('.cert-course').style.color = '#2278a9';
            el.querySelector('.cert-brand span:first-child').style.color = '#2278a9';
            el.querySelector('.cert-divider').style.borderTopColor = '#e2dcd0';
          }
        },
        // We set the PDF page size to exactly match the element's aspect ratio
        jsPDF:        { unit: 'px', format: [wPx, hPx], orientation: wPx > hPx ? 'landscape' : 'portrait' }
      };
      
      html2pdf().set(opt).from(element).save().then(() => {
        printBtn.textContent = '↓ Download PDF';
        printBtn.disabled = false;
      });
    }
  });
  overlay.querySelector('#cert-back').addEventListener('click', () => {
    overlay.querySelector('#cert-step-1').hidden = false;
    overlay.querySelector('#cert-step-2').hidden = true;
  });
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkAchievements();

  // Re-check on progress/quiz events
  window.addEventListener('aero-progress-saved', checkAchievements);
  window.addEventListener('aero-quiz-saved', checkAchievements);

  // Track search usage
  window.addEventListener('aero-searched', () => {
    saveFlag('searched');
    checkAchievements();
  });

  // Track note writing
  window.addEventListener('aero-noted', () => {
    saveFlag('noted');
    checkAchievements();
  });

  // Wire certificate buttons
  document.querySelectorAll('[data-open-certificate]').forEach(btn => {
    btn.addEventListener('click', openCertificate);
  });
});

window.aeroOpenCertificate = openCertificate;
