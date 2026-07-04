/* Aero Acharya — Enhancements
   Phase A: reading progress bar, back-to-top, scroll animations,
            confetti, continue banner, font-size toggle
   Phase B: streak counter, key takeaways injection, notes widget  */

// ── Confetti (tiny canvas implementation) ───────────────────────
window.aeroConfetti = function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  Object.assign(canvas.style, {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 9999
  });
  canvas.width = innerWidth; canvas.height = innerHeight;
  document.body.appendChild(canvas);

  const colors = ['#2678a9','#4e856a','#df8340','#8067d8','#cf5f5f','#f1c40f'];
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 200,
    r: 4 + Math.random() * 5,
    d: 0.5 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltSpeed: 0.1 + Math.random() * 0.1
  }));

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.tiltAngle += p.tiltSpeed;
      p.y += p.d;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.ellipse(p.x + p.tilt, p.y, p.r, p.r * 0.4, p.tiltAngle, 0, Math.PI * 2);
      ctx.fill();
    });
    frame++;
    if (frame < 200) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();
};

// ── Key Takeaways data ───────────────────────────────────────────
const TAKEAWAYS = {
  'air-is-a-fluid': [
    'Air is a fluid — it flows, exerts pressure, and responds to shape just like water.',
    'Aerodynamic force grows with the <em>square</em> of speed: 2× speed ≈ 4× force.',
    'Where air speeds up, its static pressure drops (Bernoulli\'s principle).',
    'Flow can separate from a surface, creating a turbulent wake that costs energy.'
  ],
  'drag': [
    'Pressure drag comes from the low-pressure wake left behind an object.',
    'Skin-friction drag comes from air rubbing along every surface of the car.',
    'A teardrop shape minimises the wake and is the gold standard for low drag.',
    'Drag grows with speed squared — at twice the speed, you fight ~4× the resistance.'
  ],
  'lift-downforce': [
    'Lift and downforce are the same physics — just applied in opposite directions.',
    'A race wing is an inverted aircraft wing: lower pressure below, higher above.',
    'More downforce = more tyre grip, faster corners; but it also means more drag.',
    'The right balance is not maximum downforce — it is maximum <em>lap time</em>.'
  ],
  'airfoil-mastery': [
    'Four knobs control airfoil behaviour: chord, camber, thickness, and angle of attack.',
    'More camber → more downforce potential, but also more drag.',
    'Stall happens when angle of attack is too high and flow separates from the wing.',
    'A high-speed setup uses small chord, low camber, and shallow angle to minimise drag.'
  ],
  'front-wing-engineer': [
    'The front wing has two jobs: generate front downforce and direct air for the rest of the car.',
    'Outwash steers dirty tyre-wake air sideways to keep the floor inlets clean.',
    'Vortices are rotating air columns engineers use to seal and guide airflow precisely.',
    'Front wing aerodynamics is genuinely 3D and cannot be captured by simple formulas.'
  ],
  'rear-wing-master': [
    'The rear wing carries more downforce than the front because rear tyres transmit power.',
    'Multi-element wings use the slot-gap effect to run at steeper angles without stalling.',
    'DRS opens a rear flap to reduce angle and drag, gaining straight-line speed.',
    'Gurney flaps add small downforce gains for a modest drag penalty at the trailing edge.'
  ],
  'venturi-theory': [
    'Squeeze air into a narrowing gap: it speeds up, pressure drops — the Venturi effect.',
    'Ground effect creates downforce from the underfloor, not just from wings.',
    'Ride height is critical: a few millimetres can change downforce by hundreds of kilograms.',
    'Porpoising is a rapid oscillation caused by the underfloor flow stalling and reattaching.'
  ],
  'diffusers-floors': [
    'The diffuser\'s job is to decelerate underfloor air gradually and recover its pressure.',
    'An abrupt expansion causes flow separation — the diffuser angle must be gentle.',
    'The floor is the <em>primary</em> downforce source on a modern ground-effect F1 car.',
    'Edge seals prevent high-pressure air from leaking under the floor and destroying the low-pressure zone.'
  ],
  'aero-balance': [
    'Aero balance describes the front-to-rear <em>split</em> of downforce, not the total.',
    'Understeer: front has less grip than rear — car pushes wide. Fix: more front downforce.',
    'Oversteer: rear has less grip than front — car rotates. Fix: more rear downforce.',
    'The centre of pressure determines handling character; engineers tune it to suit each circuit.'
  ],
  'cooling-packaging': [
    'Cooling airflow is a drag cost — larger intakes cool better but slow the car down.',
    'Teams adjust intake size based on ambient temperature and circuit energy demands.',
    'Packaging means fitting every system into the smallest aerodynamically clean shape.',
    'Tight packaging helps airflow reach the floor and rear, improving overall aero efficiency.'
  ]
};

document.addEventListener('DOMContentLoaded', () => {

  const isLesson = !!document.querySelector('.lesson-layout');
  const isHome   = !!document.querySelector('.module-grid');

  // ── Streak counter ─────────────────────────────────────────────
  function updateStreak() {
    const today = new Date().toDateString();
    let streak = 1;
    try {
      const data = JSON.parse(localStorage.getItem('aero-streak') || '{}');
      const last = data.last;
      const prev = last ? new Date(last) : null;
      const now  = new Date();

      if (prev) {
        const diff = Math.floor((now - prev) / 86400000);
        if (diff === 0) {
          streak = data.streak || 1; // same day, preserve
        } else if (diff === 1) {
          streak = (data.streak || 0) + 1; // consecutive day
        } else {
          streak = 1; // streak broken
        }
      }

      localStorage.setItem('aero-streak', JSON.stringify({ last: today, streak }));
    } catch { /* ignore */ }
    return streak;
  }

  const streak = updateStreak();

  // Inject streak into feature strip on homepage
  if (isHome) {
    const strip = document.querySelector('.feature-strip');
    if (strip) {
      const el = document.createElement('div');
      el.innerHTML = `<b>🔥 ${streak} day${streak !== 1 ? 's' : ''}</b><small>CURRENT STREAK</small>`;
      // Replace last item or append
      const last = strip.lastElementChild;
      if (last) strip.replaceChild(el, last);
    }
  }

  // ── Continue where you left off (homepage) ─────────────────────
  if (isHome) {
    try {
      const prog = JSON.parse(localStorage.getItem('aero-progress') || '{}');
      const MODULE_META = {
        'air-is-a-fluid':      { title: 'Air Is a Fluid',      n: '01' },
        'drag':                { title: 'Drag Hunter',          n: '02' },
        'lift-downforce':      { title: 'Lift & Downforce',     n: '03' },
        'airfoil-mastery':     { title: 'Airfoil Mastery',      n: '04' },
        'front-wing-engineer': { title: 'Front Wing Engineer',  n: '05' },
        'rear-wing-master':    { title: 'Rear Wing Master',     n: '06' },
        'venturi-theory':      { title: 'Venturi Theory',       n: '07' },
        'diffusers-floors':    { title: 'Diffusers & Floors',   n: '08' },
        'aero-balance':        { title: 'Aero Balance',         n: '09' },
        'cooling-packaging':   { title: 'Cooling & Packaging',  n: '10' },
      };
      const slugs = Object.keys(MODULE_META);

      // Find last started-but-not-done, or first not-yet-started
      let target = null;
      for (const s of slugs) {
        if (!prog[s]) { target = s; break; }
        if (prog[s] === 'started') { target = s; break; }
      }

      const anchor = document.getElementById('continue-banner');
      if (anchor && target) {
        const meta = MODULE_META[target];
        const isDone = prog[target] === 'done';
        anchor.innerHTML = `
          <div class="continue-banner">
            <div class="continue-text">
              <span class="continue-label">${isDone ? 'NEXT UP' : 'CONTINUE LEARNING'}</span>
              <strong>Lesson ${meta.n} · ${meta.title}</strong>
            </div>
            <a class="continue-link" href="modules/${target}/">
              ${isDone ? 'Start next →' : 'Pick up where you left off →'}
            </a>
          </div>
        `;
      }
    } catch { /* ignore */ }
  }

  // ── Reading progress bar (lessons only) ────────────────────────
  if (isLesson) {
    const bar = document.getElementById('reading-progress');
    if (bar) {
      window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        bar.style.width = Math.min(pct, 100) + '%';
      }, { passive: true });
    }
  }

  // ── Back to top button ─────────────────────────────────────────
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Scroll-in animations (lessons only) ────────────────────────
  if (isLesson && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = document.querySelectorAll('.lesson section, .quiz-block, .mark-complete-wrap, .lesson-nav');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('anim-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(t => { t.classList.add('anim-ready'); obs.observe(t); });
  }

  // ── Key Takeaways injection (lessons only) ─────────────────────
  if (isLesson) {
    const slug = location.pathname.replace(/\/+$/, '').split('/').pop();
    const list = TAKEAWAYS[slug];
    const anchor = document.getElementById('lesson-quiz');
    if (list && anchor) {
      const box = document.createElement('div');
      box.className = 'takeaways-box';
      box.innerHTML = `
        <div class="takeaways-header">
          <span class="section-no">KEY TAKEAWAYS</span>
          <h2>What to remember</h2>
        </div>
        <ul class="takeaways-list">
          ${list.map(t => `<li>${t}</li>`).join('')}
        </ul>
      `;
      anchor.before(box);
    }
  }

  // ── Font size toggle ───────────────────────────────────────────
  const FONT_KEY = 'aero-font-size';
  const saved = localStorage.getItem(FONT_KEY);
  if (saved) document.documentElement.style.setProperty('--lesson-font-size', saved + 'px');

  const fontInc = document.getElementById('font-inc');
  const fontDec = document.getElementById('font-dec');
  function getFS() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--lesson-font-size') || '17', 10);
  }
  fontInc?.addEventListener('click', () => {
    const s = Math.min(getFS() + 1, 22);
    document.documentElement.style.setProperty('--lesson-font-size', s + 'px');
    localStorage.setItem(FONT_KEY, s);
  });
  fontDec?.addEventListener('click', () => {
    const s = Math.max(getFS() - 1, 14);
    document.documentElement.style.setProperty('--lesson-font-size', s + 'px');
    localStorage.setItem(FONT_KEY, s);
  });

});
