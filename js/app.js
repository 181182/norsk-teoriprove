// Norwegian Driving School - Main Application
// Data loaded from data.js (window.CATEGORIES etc.)

// ============ STATE ============
const state = {
  currentPage: 'home',
  quiz: {
    active: false,
    questions: [],
    currentIndex: 0,
    answered: 0,
    correct: 0,
    selectedCategory: 'all',
    selectedDifficulty: 'all',
    timer: null,
    timeLeft: 30,
    answered_this_q: false,
  },
  progress: JSON.parse(localStorage.getItem('no-driving-progress') || '{}'),
  signFilter: 'all',
  currentGuide: null,
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderCategories();
  renderGuides();
  renderSigns();
  renderProgress();
  renderQuizSetup();
  initScrollTop();
  updateAllProgressBars();
  renderHomeCategories();
});

function renderHomeCategories() {
  const grid = document.getElementById('home-categories-grid');
  if (!grid) return;
  const highlight = CATEGORIES.slice(0, 6);
  grid.innerHTML = highlight.map(c => `
    <div onclick="startCategoryQuiz('${c.id}')"
         style="background:white;border-radius:12px;padding:20px;box-shadow:0 4px 20px rgba(0,0,0,0.08);cursor:pointer;transition:all 0.3s;border-top:4px solid ${c.color}"
         onmouseover="this.style.transform='translateY(-4px)'"
         onmouseout="this.style.transform=''">
      <div style="font-size:2rem;margin-bottom:8px">${c.icon}</div>
      <strong style="display:block;font-size:0.95rem">${c.name}</strong>
      <span style="font-size:0.8rem;color:#7f8c8d">Start quiz →</span>
    </div>
  `).join('');
}

// ============ NAVIGATION ============
function initNav() {
  document.querySelectorAll('.nav-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.goto));
  });
}

window.navigateTo = navigateTo;
function navigateTo(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-page]').forEach(b => b.classList.remove('active'));
  const pageEl = document.getElementById(`page-${page}`);
  const btnEl = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (pageEl) pageEl.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'progress') renderProgress();
}

// ============ CATEGORIES ============
function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => {
    const catProgress = getCategoryProgress(cat.id);
    return `
      <div class="category-card" style="--card-color: ${cat.color}" onclick="startCategoryQuiz('${cat.id}')">
        <div class="category-icon">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <div class="category-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${catProgress.pct}%; background: ${cat.color}"></div>
          </div>
          <span class="progress-text">${catProgress.correct}/${catProgress.total}</span>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryProgress(catId) {
  const catQ = QUESTIONS.filter(q => q.category === catId);
  const prog = state.progress[catId] || {};
  const correct = Object.values(prog).filter(v => v === true).length;
  const total = catQ.length;
  return { correct, total, pct: total ? Math.round(correct / total * 100) : 0 };
}

window.startCategoryQuiz = function(catId) {
  navigateTo('quiz');
  setTimeout(() => {
    // pre-select category
    document.querySelectorAll('.quiz-option').forEach(el => {
      el.classList.toggle('selected', el.dataset.cat === catId);
    });
    state.quiz.selectedCategory = catId;
  }, 50);
};

// ============ QUIZ SETUP ============
function renderQuizSetup() {
  const grid = document.getElementById('quiz-options-grid');
  if (!grid) return;

  const allOption = `
    <div class="quiz-option selected" data-cat="all" onclick="selectQuizCategory(this, 'all')">
      <div class="opt-icon">🎯</div>
      <div class="opt-name">Alle kategorier</div>
      <div class="opt-count">${QUESTIONS.length} spørsmål</div>
    </div>
  `;

  const catOptions = CATEGORIES.map(cat => {
    const count = QUESTIONS.filter(q => q.category === cat.id).length;
    return `
      <div class="quiz-option" data-cat="${cat.id}" onclick="selectQuizCategory(this, '${cat.id}')">
        <div class="opt-icon">${cat.icon}</div>
        <div class="opt-name">${cat.name}</div>
        <div class="opt-count">${count} spørsmål</div>
      </div>
    `;
  }).join('');

  grid.innerHTML = allOption + catOptions;
}

window.selectQuizCategory = function(el, catId) {
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  state.quiz.selectedCategory = catId;
};

window.selectDifficulty = function(el, diff) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  state.quiz.selectedDifficulty = diff;
};

window.startQuiz = function() {
  let questions = [...QUESTIONS];
  if (state.quiz.selectedCategory !== 'all') {
    questions = questions.filter(q => q.category === state.quiz.selectedCategory);
  }
  if (state.quiz.selectedDifficulty !== 'all') {
    questions = questions.filter(q => q.difficulty === state.quiz.selectedDifficulty);
  }
  if (questions.length === 0) {
    showNotification('Ingen spørsmål funnet for dette valget.', 'wrong');
    return;
  }

  // Shuffle
  questions = shuffle(questions).slice(0, Math.min(20, questions.length));

  state.quiz.questions = questions;
  state.quiz.currentIndex = 0;
  state.quiz.correct = 0;
  state.quiz.answered = 0;
  state.quiz.active = true;

  document.querySelector('.quiz-setup').classList.add('hide');
  document.querySelector('.quiz-active').classList.add('show');
  document.querySelector('.quiz-results').classList.remove('show');

  renderQuestion();
};

// ============ QUIZ ============
function renderQuestion() {
  const q = state.quiz.questions[state.quiz.currentIndex];
  if (!q) return;

  state.quiz.answered_this_q = false;
  const total = state.quiz.questions.length;
  const idx = state.quiz.currentIndex;

  // Header
  document.getElementById('quiz-counter').innerHTML = `Spørsmål <strong>${idx + 1}</strong> av ${total}`;
  document.getElementById('quiz-score-correct').textContent = state.quiz.correct;
  document.getElementById('quiz-score-wrong').textContent = state.quiz.answered - state.quiz.correct;
  const pct = (idx / total) * 100;
  document.getElementById('quiz-prog-fill').style.width = pct + '%';

  // Category name
  const cat = CATEGORIES.find(c => c.id === q.category);
  const diffClass = q.difficulty;
  const diffLabels = { lett: 'Lett', middels: 'Middels', vanskelig: 'Vanskelig' };

  document.getElementById('question-category').textContent = cat ? cat.name : '';
  document.getElementById('question-difficulty').className = `difficulty-badge ${diffClass}`;
  document.getElementById('question-difficulty').textContent = diffLabels[diffClass] || diffClass;
  document.getElementById('question-text').textContent = q.question;

  // Answers
  const letters = ['A', 'B', 'C', 'D'];
  const answersEl = document.getElementById('answer-options');
  answersEl.innerHTML = q.options.map((opt, i) => `
    <button class="answer-btn" onclick="selectAnswer(${i})" id="ans-${i}">
      <span class="answer-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  // Hide explanation
  const expBox = document.getElementById('explanation-box');
  expBox.classList.remove('show');
  expBox.querySelector('.exp-text').textContent = '';

  // Hide next btn
  document.getElementById('quiz-next-btn').classList.add('hide');

  // Start timer
  startTimer();
}

function startTimer() {
  clearInterval(state.quiz.timer);
  state.quiz.timeLeft = 30;
  const timerEl = document.getElementById('quiz-timer');
  timerEl.classList.remove('urgent');
  timerEl.textContent = '30';

  state.quiz.timer = setInterval(() => {
    state.quiz.timeLeft--;
    timerEl.textContent = state.quiz.timeLeft;
    if (state.quiz.timeLeft <= 10) timerEl.classList.add('urgent');
    if (state.quiz.timeLeft <= 0) {
      clearInterval(state.quiz.timer);
      if (!state.quiz.answered_this_q) timeOut();
    }
  }, 1000);
}

function timeOut() {
  state.quiz.answered_this_q = true;
  state.quiz.answered++;
  const q = state.quiz.questions[state.quiz.currentIndex];
  // Show correct answer
  const correctBtn = document.getElementById(`ans-${q.correct}`);
  if (correctBtn) correctBtn.classList.add('correct');
  document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
  showExplanation(q.explanation);
  document.getElementById('quiz-next-btn').classList.remove('hide');
  showNotification('⏰ Tiden er ute!', 'wrong');
}

window.selectAnswer = function(index) {
  if (state.quiz.answered_this_q) return;
  state.quiz.answered_this_q = true;
  clearInterval(state.quiz.timer);

  const q = state.quiz.questions[state.quiz.currentIndex];
  const isCorrect = index === q.correct;

  state.quiz.answered++;
  if (isCorrect) state.quiz.correct++;

  // Update score display
  document.getElementById('quiz-score-correct').textContent = state.quiz.correct;
  document.getElementById('quiz-score-wrong').textContent = state.quiz.answered - state.quiz.correct;

  // Style buttons
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === index && !isCorrect) btn.classList.add('wrong');
  });

  // Show explanation
  showExplanation(q.explanation);

  // Save progress
  if (!state.progress[q.category]) state.progress[q.category] = {};
  if (!(q.id in state.progress[q.category]) || isCorrect) {
    state.progress[q.category][q.id] = isCorrect;
  }
  saveProgress();

  // Notification
  if (isCorrect) {
    showNotification('✅ Riktig svar!', 'correct');
  } else {
    showNotification('❌ Feil svar. Les forklaringen.', 'wrong');
  }

  document.getElementById('quiz-next-btn').classList.remove('hide');
};

function showExplanation(text) {
  const box = document.getElementById('explanation-box');
  box.querySelector('.exp-text').textContent = text;
  box.classList.add('show');
}

window.nextQuestion = function() {
  state.quiz.currentIndex++;
  if (state.quiz.currentIndex >= state.quiz.questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
};

function showResults() {
  clearInterval(state.quiz.timer);
  document.querySelector('.quiz-active').classList.remove('show');
  const resultsEl = document.querySelector('.quiz-results');
  resultsEl.classList.add('show');

  const total = state.quiz.questions.length;
  const correct = state.quiz.correct;
  const pct = Math.round(correct / total * 100);
  const pass = pct >= 85;

  document.getElementById('result-pct').textContent = pct + '%';
  document.getElementById('result-circle').className = `result-circle ${pass ? 'pass' : 'fail'}`;
  document.getElementById('result-title').textContent = pass ? '🎉 Bestått!' : '📚 Øv mer!';
  document.getElementById('result-subtitle').textContent = pass
    ? 'Flott jobbet! Du er godt forberedt til teoriprøven.'
    : 'Du trenger litt mer øvelse. Gjennomgå guidene og prøv igjen!';
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-wrong').textContent = total - correct;
  document.getElementById('result-total').textContent = total;
}

window.resetQuiz = function() {
  clearInterval(state.quiz.timer);
  state.quiz.active = false;
  document.querySelector('.quiz-setup').classList.remove('hide');
  document.querySelector('.quiz-active').classList.remove('show');
  document.querySelector('.quiz-results').classList.remove('show');
};

// ============ GUIDES ============
function renderGuides() {
  // Sidebar
  const sidebar = document.getElementById('guides-sidebar-list');
  if (!sidebar) return;

  sidebar.innerHTML = GUIDES.map((g, i) => {
    const cat = CATEGORIES.find(c => c.id === g.category);
    return `
      <button class="guide-nav-item ${i === 0 ? 'active' : ''}" onclick="showGuide('${g.id}', this)">
        <span>${cat ? cat.icon : '📖'}</span>
        <span>${g.title}</span>
      </button>
    `;
  }).join('');

  // Content
  const content = document.getElementById('guides-content');
  content.innerHTML = GUIDES.map((g, i) => {
    const sections = g.content.map(s => `
      <div class="guide-section">
        <div class="guide-section-header">
          <span class="guide-section-icon">${s.icon}</span>
          <h3>${s.heading}</h3>
        </div>
        <p>${s.text}</p>
      </div>
    `).join('');

    return `
      <div class="guide-card ${i === 0 ? 'active' : ''}" id="guide-${g.id}">
        <h2>${g.title}</h2>
        <p class="guide-intro">Lær alt du trenger å vite om dette emnet for å bestå teoriprøven.</p>
        ${sections}
        <button class="quick-quiz-btn" onclick="startCategoryQuiz('${g.category}')">
          🎯 Test deg selv – Quiz om ${CATEGORIES.find(c => c.id === g.category)?.name || 'dette emnet'}
        </button>
      </div>
    `;
  }).join('');
}

window.showGuide = function(id, btnEl) {
  document.querySelectorAll('.guide-nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.guide-card').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  const card = document.getElementById(`guide-${id}`);
  if (card) card.classList.add('active');
};

// ============ SIGNS ============
function renderSigns() {
  const grid = document.getElementById('signs-grid');
  if (!grid) return;
  updateSignsGrid();

  // Filter buttons
  document.querySelectorAll('.sign-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sign-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.signFilter = btn.dataset.filter;
      updateSignsGrid();
    });
  });
}

function updateSignsGrid() {
  const grid = document.getElementById('signs-grid');
  let signs = SIGNS;
  if (state.signFilter !== 'all') {
    signs = signs.filter(s => s.category === state.signFilter);
  }

  grid.innerHTML = signs.map(sign => `
    <div class="sign-card" onclick="showSignModal('${sign.id}')">
      <div class="sign-visual flex-center">
        ${renderSignShape(sign)}
      </div>
      <div class="sign-number">Skilt ${sign.number}</div>
      <div class="sign-name">${sign.name}</div>
      <div class="sign-desc">${sign.description}</div>
    </div>
  `).join('');
}

function renderSignShape(sign) {
  if (sign.shape === 'triangle') {
    return `<div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center;">
      <svg width="80" height="75" viewBox="0 0 80 75">
        <polygon points="40,5 75,70 5,70" fill="white" stroke="#e74c3c" stroke-width="5"/>
        <text x="40" y="52" text-anchor="middle" font-size="24" fill="#2c3e50">${sign.symbol}</text>
      </svg>
    </div>`;
  }
  if (sign.shape === 'circle' && sign.color === '#e74c3c') {
    return `<div style="width:72px;height:72px;border-radius:50%;background:white;border:6px solid #e74c3c;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${sign.symbol.length > 2 ? '0.7rem' : '1.1rem'};color:#2c3e50">${sign.symbol}</div>`;
  }
  if (sign.shape === 'circle' && sign.color === '#2980b9') {
    return `<div style="width:72px;height:72px;border-radius:50%;background:#2980b9;display:flex;align-items:center;justify-content:center;font-size:2rem;color:white">${sign.symbol}</div>`;
  }
  if (sign.shape === 'inverted-triangle') {
    return `<svg width="80" height="75" viewBox="0 0 80 75">
      <polygon points="5,5 75,5 40,70" fill="white" stroke="#e74c3c" stroke-width="5"/>
    </svg>`;
  }
  if (sign.shape === 'diamond') {
    return `<div style="width:54px;height:54px;background:#f39c12;transform:rotate(45deg);border-radius:4px;border:3px solid #e67e22;margin:10px auto"></div>`;
  }
  if (sign.shape === 'octagon') {
    return `<div style="width:70px;height:70px;background:#e74c3c;clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);display:flex;align-items:center;justify-content:center;color:white;font-weight:900;font-size:0.75rem;letter-spacing:1px">${sign.symbol}</div>`;
  }
  return `<div style="font-size:2rem">${sign.symbol}</div>`;
}

window.showSignModal = function(id) {
  const sign = SIGNS.find(s => s.id === id);
  if (!sign) return;
  document.getElementById('modal-sign-visual').innerHTML = renderSignShape(sign);
  document.getElementById('modal-sign-name').textContent = sign.name;
  document.getElementById('modal-sign-number').textContent = `Skilt ${sign.number}`;
  document.getElementById('modal-sign-desc').textContent = sign.description;
  document.getElementById('sign-modal').classList.add('show');
};

window.closeSignModal = function() {
  document.getElementById('sign-modal').classList.remove('show');
};

// ============ PROGRESS ============
function renderProgress() {
  updateAllProgressBars();

  const overview = document.getElementById('progress-overview');
  if (overview) {
    let totalAnswered = 0, totalCorrect = 0;
    CATEGORIES.forEach(cat => {
      const prog = state.progress[cat.id] || {};
      totalAnswered += Object.keys(prog).length;
      totalCorrect += Object.values(prog).filter(Boolean).length;
    });
    const overallPct = totalAnswered ? Math.round(totalCorrect / QUESTIONS.length * 100) : 0;

    overview.innerHTML = `
      <div class="overview-card">
        <div class="ov-icon">📊</div>
        <div class="ov-num">${overallPct}%</div>
        <div class="ov-label">Totalt fullført</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">✅</div>
        <div class="ov-num">${totalCorrect}</div>
        <div class="ov-label">Riktige svar</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">❓</div>
        <div class="ov-num">${QUESTIONS.length - totalAnswered}</div>
        <div class="ov-label">Gjenstår</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">🎯</div>
        <div class="ov-num">85%</div>
        <div class="ov-label">Bestå-grense</div>
      </div>
    `;
  }

  const details = document.getElementById('progress-details');
  if (details) {
    details.innerHTML = CATEGORIES.map(cat => {
      const p = getCategoryProgress(cat.id);
      const color = p.pct >= 85 ? '#27ae60' : p.pct >= 50 ? '#f39c12' : '#e74c3c';
      return `
        <div class="progress-category-row">
          <div class="pcat-icon">${cat.icon}</div>
          <div class="pcat-info">
            <h4>${cat.name}</h4>
            <div class="pcat-bar">
              <div class="pcat-fill" style="width:${p.pct}%;background:${color}"></div>
            </div>
          </div>
          <div class="pcat-stats">
            <div class="pcat-pct" style="color:${color}">${p.pct}%</div>
            <div class="pcat-count">${p.correct}/${p.total} riktige</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Update nav badge
  const totalAnswered = Object.values(state.progress).reduce((sum, c) => sum + Object.keys(c).length, 0);
  const overallPct = Math.round(totalAnswered / QUESTIONS.length * 100);
  const badge = document.getElementById('progress-nav-badge');
  if (badge) badge.textContent = overallPct + '%';
}

function updateAllProgressBars() {
  document.querySelectorAll('[data-cat-progress]').forEach(el => {
    const cat = el.dataset.catProgress;
    const p = getCategoryProgress(cat);
    el.style.width = p.pct + '%';
  });
}

window.resetProgress = function() {
  if (confirm('Er du sikker på at du vil nullstille all fremgang?')) {
    state.progress = {};
    saveProgress();
    renderProgress();
    renderCategories();
    showNotification('Fremgang nullstilt.', 'correct');
  }
};

function saveProgress() {
  localStorage.setItem('no-driving-progress', JSON.stringify(state.progress));
  renderCategories();
}

// ============ NOTIFICATIONS ============
function showNotification(msg, type = 'correct') {
  const notif = document.getElementById('notification');
  notif.className = `notification ${type}`;
  notif.querySelector('.notif-text').textContent = msg;
  notif.querySelector('.notif-icon').textContent = type === 'correct' ? '✅' : '❌';
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2500);
}
window.showNotification = showNotification;

// ============ SCROLL TOP ============
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ UTILS ============
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
