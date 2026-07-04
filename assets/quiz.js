/* Aero Acharya — Quiz Engine v2
   Reads AERO_QUIZ from quiz-data.js (now includes explanation field)
   Scores saved to localStorage key: aero-quiz-scores             */

(() => {
  function getSlug() {
    const parts = location.pathname.replace(/\/+$/, '').split('/');
    return parts[parts.length - 1];
  }

  function loadScores() {
    try { return JSON.parse(localStorage.getItem('aero-quiz-scores') || '{}'); }
    catch { return {}; }
  }

  function saveScore(slug, score, total) {
    const scores = loadScores();
    scores[slug] = { score, total };
    localStorage.setItem('aero-quiz-scores', JSON.stringify(scores));
  }

  function buildQuiz(slug, data, container) {
    const savedScores = loadScores();
    const prev = savedScores[slug];

    let html = `
      <div class="quiz-block" aria-label="Lesson quiz">
        <div class="quiz-header">
          <span class="section-no">LESSON QUIZ</span>
          <h2>Test your understanding</h2>
          ${prev ? `<p class="quiz-prev-score">Your last score: <strong>${prev.score} / ${prev.total}</strong>${prev.score === prev.total ? ' 🏆' : ''}</p>` : ''}
        </div>
        <form class="quiz-form" novalidate>
    `;

    data.questions.forEach((q, qi) => {
      html += `<div class="quiz-q" data-qi="${qi}">
        <p class="quiz-q-text"><span class="quiz-q-num">Q${qi + 1}</span>${q.q}</p>
        <div class="quiz-opts">`;
      q.opts.forEach((opt, oi) => {
        const id = `q${qi}_o${oi}_${slug}`;
        html += `<label class="quiz-opt" for="${id}">
          <input type="radio" name="q${qi}" id="${id}" value="${oi}">
          <span class="quiz-opt-text">${opt}</span>
        </label>`;
      });
      html += `</div>
        <p class="quiz-feedback" aria-live="polite"></p>
        <div class="quiz-explanation" hidden></div>
      </div>`;
    });

    html += `
        <div class="quiz-footer">
          <button type="submit" class="quiz-submit">Check my answers</button>
          <div class="quiz-score" aria-live="polite"></div>
        </div>
        </form>
        <button class="quiz-retake" hidden>↺ Retake quiz</button>
      </div>
    `;

    container.innerHTML = html;
    wireQuiz(container, slug, data);
  }

  function wireQuiz(container, slug, data) {
    const form = container.querySelector('.quiz-form');
    const submitBtn = container.querySelector('.quiz-submit');
    const scoreEl = container.querySelector('.quiz-score');
    const retakeBtn = container.querySelector('.quiz-retake');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let answered = true;
      let correct = 0;

      data.questions.forEach((q, qi) => {
        const qBlock = container.querySelector(`.quiz-q[data-qi="${qi}"]`);
        const selected = form.querySelector(`input[name="q${qi}"]:checked`);
        const feedback = qBlock.querySelector('.quiz-feedback');
        const explanationEl = qBlock.querySelector('.quiz-explanation');
        const opts = qBlock.querySelectorAll('.quiz-opt');

        if (!selected) {
          answered = false;
          feedback.textContent = 'Please select an answer.';
          feedback.className = 'quiz-feedback quiz-feedback--warn';
          return;
        }

        const chosen = parseInt(selected.value, 10);
        const isCorrect = chosen === q.correct;

        if (isCorrect) {
          correct++;
          opts[chosen].classList.add('quiz-opt--correct');
          feedback.textContent = '✓ Correct!';
          feedback.className = 'quiz-feedback quiz-feedback--correct';
        } else {
          opts[chosen].classList.add('quiz-opt--wrong');
          opts[q.correct].classList.add('quiz-opt--correct');
          feedback.textContent = `✗ The correct answer is: "${q.opts[q.correct]}"`;
          feedback.className = 'quiz-feedback quiz-feedback--wrong';
        }

        // Show explanation if available
        if (q.explanation) {
          explanationEl.textContent = q.explanation;
          explanationEl.hidden = false;
        }

        // Disable all radio inputs in this question
        qBlock.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
      });

      if (!answered) return;

      const total = data.questions.length;
      const pct = Math.round((correct / total) * 100);

      scoreEl.innerHTML = `
        <span class="quiz-score-num">${correct} / ${total}</span>
        <span class="quiz-score-pct">(${pct}%)</span>
        ${correct === total ? '<span class="quiz-score-perfect">🏆 Perfect score!</span>' : ''}
      `;

      submitBtn.hidden = true;
      retakeBtn.hidden = false;

      saveScore(slug, correct, total);

      // Fire confetti on perfect score
      if (correct === total && window.aeroConfetti) window.aeroConfetti();

      // Dispatch event for homepage badge update + achievement check
      window.dispatchEvent(new CustomEvent('aero-quiz-saved', {
        detail: { slug, score: correct, total }
      }));
    });

    retakeBtn.addEventListener('click', () => {
      buildQuiz(slug, data, container);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const anchor = document.getElementById('lesson-quiz');
    if (!anchor) return;

    const slug = getSlug();
    const quizData = window.AERO_QUIZ && window.AERO_QUIZ[slug];
    if (!quizData) return;

    buildQuiz(slug, quizData, anchor);
  });
})();
