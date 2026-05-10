// Norwegian Driving School - Main Application

// ============ GAMIFICATION STATE ============
const DEFAULT_GAME = {
  xp: 0, level: 1, streak: 0, lastPlayDate: null,
  combo: 0, maxCombo: 0, totalAnswered: 0, totalCorrect: 0,
  badgesEarned: [], dailyChallengesCompleted: 0,
  dailyChallenge: { date: null, done: false, answered: 0, correct: 0 },
  categoriesPlayed: [],
  quizResults: [],
};

function loadGame() {
  try {
    return Object.assign({}, DEFAULT_GAME, JSON.parse(localStorage.getItem('no-driving-game') || '{}'));
  } catch {
    return { ...DEFAULT_GAME };
  }
}

function saveGame() {
  localStorage.setItem('no-driving-game', JSON.stringify(game));
}

let game = loadGame();

// ============ APP STATE ============
const state = {
  currentPage: 'home',
  quiz: {
    active: false, questions: [], currentIndex: 0, answered: 0, correct: 0,
    selectedCategory: 'all', selectedDifficulty: 'all',
    timer: null, timeLeft: 30, answered_this_q: false,
    sessionCombo: 0, isDailyChallenge: false,
  },
  progress: JSON.parse(localStorage.getItem('no-driving-progress') || '{}'),
  signFilter: 'all',
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  checkAndUpdateStreak();
  initNav();
  renderCategories();
  renderGuides();
  renderSigns();
  renderProgress();
  renderQuizSetup();
  initScrollTop();
  updateAllProgressBars();
  renderHomeCategories();
  updateGameHeader();
  renderDailyChallenge();
  renderBadgesPage();
});

// ============ STREAK ============
function checkAndUpdateStreak() {
  const today = todayStr();
  if (game.lastPlayDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = dateToStr(yesterday);
  if (game.lastPlayDate === yStr) {
    game.streak += 1;
    if (game.streak >= 2) showStreakNotif(game.streak);
  } else if (game.lastPlayDate && game.lastPlayDate !== today) {
    game.streak = 1;
  }
  saveGame();
}

function todayStr() { return dateToStr(new Date()); }
function dateToStr(d) { return d.toISOString().split('T')[0]; }

// ============ XP & LEVELS ============
function awardXP(amount, reason) {
  const oldLevel = getCurrentLevel();
  game.xp += amount;
  const newLevel = getCurrentLevel();
  saveGame();
  updateGameHeader();
  if (newLevel.level > oldLevel.level) {
    setTimeout(() => showLevelUp(newLevel), 400);
  }
  showXPGain(amount, reason);
}

function getCurrentLevel() {
  const earned = [...LEVELS].reverse().find(l => game.xp >= l.xpRequired);
  return earned || LEVELS[0];
}

function getNextLevel() {
  return LEVELS.find(l => l.xpRequired > game.xp) || null;
}

function updateGameHeader() {
  const lvl = getCurrentLevel();
  const next = getNextLevel();

  const levelIcon = document.getElementById('header-level-icon');
  const levelName = document.getElementById('header-level-name');
  const xpBar = document.getElementById('header-xp-bar');
  const xpLabel = document.getElementById('header-xp-label');
  const streakEl = document.getElementById('header-streak-count');

  if (levelIcon) levelIcon.textContent = lvl.icon;
  if (levelName) levelName.textContent = lvl.name;
  if (streakEl) streakEl.textContent = game.streak;

  if (xpBar && xpLabel) {
    if (next) {
      const rangeStart = lvl.xpRequired;
      const rangeEnd = next.xpRequired;
      const pct = Math.round(((game.xp - rangeStart) / (rangeEnd - rangeStart)) * 100);
      xpBar.style.width = pct + '%';
      xpLabel.textContent = `${game.xp} / ${next.xpRequired} XP`;
    } else {
      xpBar.style.width = '100%';
      xpLabel.textContent = `${game.xp} XP – Max nivå!`;
    }
  }

  // Update streak flame
  const flame = document.getElementById('header-streak');
  if (flame) flame.classList.toggle('active', game.streak >= 2);
}

// ============ BADGES ============
function checkBadges() {
  const earned = new Set(game.badgesEarned);
  const toUnlock = [];

  const conditions = {
    first_answer:   game.totalAnswered >= 1,
    streak_3:       game.streak >= 3,
    streak_7:       game.streak >= 7,
    combo_5:        game.maxCombo >= 5,
    combo_10:       game.maxCombo >= 10,
    perfect_quiz:   game.quizResults.some(r => r.pct === 100 && r.total >= 10),
    daily_3:        game.dailyChallengesCompleted >= 3,
    all_categories: (game.categoriesPlayed || []).length >= 10,
    signs_master:   game.quizResults.some(r => r.cat === 'skilt' && r.pct >= 90),
    vikeplikt_pro:  game.quizResults.some(r => r.cat === 'vikeplikt' && r.pct >= 90),
    level_5:        getCurrentLevel().level >= 5,
    level_8:        getCurrentLevel().level >= 8,
    '100_questions':game.totalAnswered >= 100,
    xp_1000:        game.xp >= 1000,
  };

  for (const [id, met] of Object.entries(conditions)) {
    if (met && !earned.has(id)) toUnlock.push(id);
  }

  toUnlock.forEach((id, i) => {
    game.badgesEarned.push(id);
    const badge = BADGES.find(b => b.id === id);
    if (badge) setTimeout(() => showBadgeUnlock(badge), i * 1500);
  });

  if (toUnlock.length > 0) saveGame();
}

function showBadgeUnlock(badge) {
  const overlay = document.getElementById('badge-overlay');
  if (!overlay) return;
  document.getElementById('badge-overlay-icon').textContent = badge.icon;
  document.getElementById('badge-overlay-name').textContent = badge.name;
  document.getElementById('badge-overlay-desc').textContent = badge.desc;
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 3500);
}

function showLevelUp(lvl) {
  const overlay = document.getElementById('levelup-overlay');
  if (!overlay) return;
  document.getElementById('levelup-icon').textContent = lvl.icon;
  document.getElementById('levelup-name').textContent = `Nivå ${lvl.level}: ${lvl.name}`;
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 3500);
}

function showXPGain(amount, reason) {
  const el = document.getElementById('xp-popup');
  if (!el) return;
  el.textContent = `+${amount} XP ${reason || ''}`;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}

function showStreakNotif(streak) {
  const msgs = {3:'🔥 3-dagers streak!', 7:'🌟 Ukemester!', 14:'💥 2-uker streak!', 30:'🏆 En måned!'};
  const msg = msgs[streak] || `🔥 ${streak} dager på rad!`;
  setTimeout(() => showNotification(msg, 'correct'), 500);
}

function renderBadgesPage() {
  const grid = document.getElementById('badges-grid');
  if (!grid) return;
  const earned = new Set(game.badgesEarned);
  grid.innerHTML = BADGES.map(b => `
    <div class="badge-card ${earned.has(b.id) ? 'earned' : 'locked'}">
      <div class="badge-card-icon">${earned.has(b.id) ? b.icon : '🔒'}</div>
      <div class="badge-card-name">${b.name}</div>
      <div class="badge-card-desc">${b.desc}</div>
    </div>
  `).join('');
}

// ============ DAILY CHALLENGE ============
function renderDailyChallenge() {
  const card = document.getElementById('daily-challenge-card');
  if (!card) return;
  const today = todayStr();
  const done = game.dailyChallenge.date === today && game.dailyChallenge.done;
  if (done) {
    card.innerHTML = `
      <div class="dc-icon">✅</div>
      <div class="dc-info"><h3>Dagens utfordring</h3><p>Fullført! +50 XP</p></div>
      <div class="dc-badge">FERDIG</div>
    `;
  } else {
    const answered = game.dailyChallenge.date === today ? game.dailyChallenge.answered : 0;
    card.innerHTML = `
      <div class="dc-icon">📅</div>
      <div class="dc-info">
        <h3>Dagens utfordring</h3>
        <p>${answered > 0 ? `${answered}/5 spørsmål – fortsett!` : '5 spørsmål for +50 XP bonus'}</p>
      </div>
      <button class="btn btn-primary dc-btn" onclick="startDailyChallenge()">
        ${answered > 0 ? '▶ Fortsett' : '▶ Start'}
      </button>
    `;
  }
}

window.startDailyChallenge = function() {
  const today = todayStr();
  if (game.dailyChallenge.date !== today) {
    game.dailyChallenge = { date: today, done: false, answered: 0, correct: 0 };
    saveGame();
  }
  navigateTo('quiz');
  setTimeout(() => {
    state.quiz.isDailyChallenge = true;
    state.quiz.selectedCategory = 'all';
    state.quiz.selectedDifficulty = 'all';
    startQuizWithCount(5);
  }, 50);
};

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
  if (page === 'progress') { renderProgress(); renderBadgesPage(); }
}

// ============ HOME CATEGORIES ============
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
  state.quiz.isDailyChallenge = false;
  startQuizWithCount(20);
};

function startQuizWithCount(count) {
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

  // Prioritize unseen questions
  const seenIds = new Set(getSeenIds(state.quiz.selectedCategory));
  const unseen = questions.filter(q => !seenIds.has(q.id));
  const seen = questions.filter(q => seenIds.has(q.id));
  const pool = shuffle(unseen.length >= count ? unseen : [...unseen, ...shuffle(seen)]);

  state.quiz.questions = pool.slice(0, Math.min(count, pool.length));
  state.quiz.currentIndex = 0;
  state.quiz.correct = 0;
  state.quiz.answered = 0;
  state.quiz.active = true;
  state.quiz.sessionCombo = 0;

  document.querySelector('.quiz-setup').classList.add('hide');
  document.querySelector('.quiz-active').classList.add('show');
  document.querySelector('.quiz-results').classList.remove('show');

  renderQuestion();
}

function getSeenIds(catId) {
  const key = `no-seen-${catId}`;
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}

function markSeen(qId, catId) {
  const key = `no-seen-${catId}`;
  const seen = getSeenIds(catId);
  if (!seen.includes(qId)) {
    seen.push(qId);
    localStorage.setItem(key, JSON.stringify(seen));
  }
}

// ============ QUIZ ============
function renderQuestion() {
  const q = state.quiz.questions[state.quiz.currentIndex];
  if (!q) return;

  state.quiz.answered_this_q = false;
  const total = state.quiz.questions.length;
  const idx = state.quiz.currentIndex;

  document.getElementById('quiz-counter').innerHTML = `Spørsmål <strong>${idx + 1}</strong> av ${total}`;
  document.getElementById('quiz-score-correct').textContent = state.quiz.correct;
  document.getElementById('quiz-score-wrong').textContent = state.quiz.answered - state.quiz.correct;
  const pct = (idx / total) * 100;
  document.getElementById('quiz-prog-fill').style.width = pct + '%';

  const cat = CATEGORIES.find(c => c.id === q.category);
  const diffLabels = { lett: 'Lett', middels: 'Middels', vanskelig: 'Vanskelig' };
  document.getElementById('question-category').textContent = cat ? cat.name : '';
  document.getElementById('question-difficulty').className = `difficulty-badge ${q.difficulty}`;
  document.getElementById('question-difficulty').textContent = diffLabels[q.difficulty] || q.difficulty;

  // Show scenario / diagram
  const scenarioEl = document.getElementById('question-scenario');
  const diagramEl = document.getElementById('question-diagram');
  if (scenarioEl) {
    if (q.scenario) {
      scenarioEl.textContent = q.scenario;
      scenarioEl.style.display = 'block';
    } else {
      scenarioEl.style.display = 'none';
    }
  }
  if (diagramEl) {
    if (q.diagram && ROAD_DIAGRAMS[q.diagram]) {
      diagramEl.innerHTML = ROAD_DIAGRAMS[q.diagram]();
      diagramEl.style.display = 'flex';
    } else {
      diagramEl.style.display = 'none';
    }
  }

  document.getElementById('question-text').textContent = q.question;

  // Combo display
  const comboEl = document.getElementById('combo-display');
  if (comboEl) {
    if (state.quiz.sessionCombo >= 3) {
      comboEl.textContent = `${state.quiz.sessionCombo}🔥 COMBO!`;
      comboEl.classList.add('show');
    } else {
      comboEl.classList.remove('show');
    }
  }

  const letters = ['A', 'B', 'C', 'D'];
  const answersEl = document.getElementById('answer-options');
  answersEl.innerHTML = q.options.map((opt, i) => `
    <button class="answer-btn" onclick="selectAnswer(${i})" id="ans-${i}">
      <span class="answer-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  const expBox = document.getElementById('explanation-box');
  expBox.classList.remove('show');
  expBox.querySelector('.exp-text').textContent = '';
  document.getElementById('quiz-next-btn').classList.add('hide');

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
  state.quiz.sessionCombo = 0;
  const q = state.quiz.questions[state.quiz.currentIndex];
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
  const timeBonus = Math.max(0, Math.floor(state.quiz.timeLeft / 6));

  state.quiz.answered++;
  game.totalAnswered++;

  if (isCorrect) {
    state.quiz.correct++;
    game.totalCorrect++;
    state.quiz.sessionCombo++;
    game.combo = state.quiz.sessionCombo;
    if (state.quiz.sessionCombo > game.maxCombo) game.maxCombo = state.quiz.sessionCombo;

    const comboBonus = Math.min(state.quiz.sessionCombo * 2, 20);
    const xpEarned = 10 + comboBonus + timeBonus;
    awardXP(xpEarned, state.quiz.sessionCombo >= 3 ? `(${state.quiz.sessionCombo}🔥 combo)` : '');
  } else {
    state.quiz.sessionCombo = 0;
    game.combo = 0;
  }

  // Track for daily challenge
  if (state.quiz.isDailyChallenge) {
    if (game.dailyChallenge.date !== todayStr()) {
      game.dailyChallenge = { date: todayStr(), done: false, answered: 0, correct: 0 };
    }
    game.dailyChallenge.answered++;
    if (isCorrect) game.dailyChallenge.correct++;
  }

  document.getElementById('quiz-score-correct').textContent = state.quiz.correct;
  document.getElementById('quiz-score-wrong').textContent = state.quiz.answered - state.quiz.correct;

  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === index && !isCorrect) btn.classList.add('wrong');
  });

  showExplanation(q.explanation);

  if (!state.progress[q.category]) state.progress[q.category] = {};
  if (!(q.id in state.progress[q.category]) || isCorrect) {
    state.progress[q.category][q.id] = isCorrect;
  }

  // Track category played
  if (!(game.categoriesPlayed || []).includes(q.category)) {
    game.categoriesPlayed = [...(game.categoriesPlayed || []), q.category];
  }

  markSeen(q.id, q.category);
  game.lastPlayDate = todayStr();
  saveProgress();
  saveGame();
  checkBadges();

  if (isCorrect) {
    showNotification(state.quiz.sessionCombo >= 3 ? `✅ Riktig! 🔥×${state.quiz.sessionCombo}` : '✅ Riktig svar!', 'correct');
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

  // Award bonus XP
  if (pct === 100 && total >= 10) awardXP(100, '(perfekt quiz! 💯)');
  else if (pct >= 85) awardXP(30, '(bestått!)');

  // Daily challenge completion
  if (state.quiz.isDailyChallenge) {
    const dc = game.dailyChallenge;
    if (dc.date === todayStr() && !dc.done) {
      dc.done = true;
      game.dailyChallengesCompleted = (game.dailyChallengesCompleted || 0) + 1;
      awardXP(50, '(daglig utfordring!)');
      saveGame();
      renderDailyChallenge();
    }
    state.quiz.isDailyChallenge = false;
  }

  // Record result
  const cat = state.quiz.selectedCategory;
  game.quizResults = [...(game.quizResults || []).slice(-50), { cat, pct, total, ts: Date.now() }];
  saveGame();
  checkBadges();

  document.getElementById('result-pct').textContent = pct + '%';
  document.getElementById('result-circle').className = `result-circle ${pass ? 'pass' : 'fail'}`;
  document.getElementById('result-title').textContent = pass ? '🎉 Bestått!' : '📚 Øv mer!';
  document.getElementById('result-subtitle').textContent = pass
    ? 'Flott jobbet! Du er godt forberedt til teoriprøven.'
    : 'Du trenger litt mer øvelse. Gjennomgå guidene og prøv igjen!';
  document.getElementById('result-correct').textContent = correct;
  document.getElementById('result-wrong').textContent = total - correct;
  document.getElementById('result-total').textContent = total;

  // XP summary in results
  const xpSummary = document.getElementById('result-xp-summary');
  if (xpSummary) {
    const lvl = getCurrentLevel();
    xpSummary.innerHTML = `
      <div class="result-xp-row">
        <span>${lvl.icon} Nivå ${lvl.level}: ${lvl.name}</span>
        <span style="color:var(--warning)">${game.xp} XP</span>
      </div>
      <div class="result-xp-row">
        <span>🔥 Streak</span>
        <span>${game.streak} dager</span>
      </div>
      <div class="result-xp-row">
        <span>⚡ Beste combo</span>
        <span>${game.maxCombo}x</span>
      </div>
    `;
  }
}

window.resetQuiz = function() {
  clearInterval(state.quiz.timer);
  state.quiz.active = false;
  state.quiz.isDailyChallenge = false;
  document.querySelector('.quiz-setup').classList.remove('hide');
  document.querySelector('.quiz-active').classList.remove('show');
  document.querySelector('.quiz-results').classList.remove('show');
};

// ============ GUIDES ============
function renderGuides() {
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

  const content = document.getElementById('guides-content');
  content.innerHTML = GUIDES.map((g, i) => {
    const sections = g.content.map(s => `
      <div class="guide-section">
        <div class="guide-section-header">
          <span class="guide-section-icon">${s.icon}</span>
          <h3>${s.heading}</h3>
        </div>
        <p>${s.text}</p>
        ${s.table ? renderGuideTable(s.table) : ''}
        ${s.list ? renderGuideList(s.list) : ''}
      </div>
    `).join('');

    return `
      <div class="guide-card ${i === 0 ? 'active' : ''}" id="guide-${g.id}">
        <h2>${g.title}</h2>
        <p class="guide-intro">${g.intro || 'Lær alt du trenger å vite om dette emnet for å bestå teoriprøven.'}</p>
        ${sections}
        <button class="quick-quiz-btn" onclick="startCategoryQuiz('${g.category}')">
          🎯 Test deg selv – Quiz om ${CATEGORIES.find(c => c.id === g.category)?.name || 'dette emnet'}
        </button>
      </div>
    `;
  }).join('');
}

function renderGuideTable(table) {
  const rows = table.map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  return `<div class="guide-table-wrap"><table class="guide-table"><tbody>${rows}</tbody></table></div>`;
}

function renderGuideList(list) {
  return `<ul class="guide-list">${list.map(item => `<li>${item}</li>`).join('')}</ul>`;
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
        ${renderSignShape(sign, 90)}
      </div>
      <div class="sign-number">Skilt ${sign.number}</div>
      <div class="sign-name">${sign.name}</div>
      <div class="sign-desc">${sign.description}</div>
    </div>
  `).join('');
}

function renderSignShape(sign, size = 90) {
  const s = size;
  const c = s / 2;

  if (sign.img) {
    const sym = (sign.symbol || '?').replace(/"/g, '&quot;');
    return `<img src="${sign.img}" alt="${sign.name}" width="${s}" height="${s}"
      style="object-fit:contain;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18));display:block"
      onerror="this.outerHTML='<span style=&quot;font-size:2rem;display:flex;align-items:center;justify-content:center;width:${s}px;height:${s}px&quot;>${sym}</span>'">`;
  }

  if (sign.shape === 'triangle') {
    const pad = s * 0.07;
    const bw = s * 0.09;
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <polygon points="${c},${pad} ${s-pad},${s-pad} ${pad},${s-pad}" fill="#c0392b"/>
      <polygon points="${c},${pad+bw} ${s-pad-bw},${s-pad-bw*0.7} ${pad+bw},${s-pad-bw*0.7}" fill="white"/>
      <text x="${c}" y="${s*0.73}" text-anchor="middle" font-size="${s*0.3}" fill="#1a1a2e" dominant-baseline="middle">${sign.symbol}</text>
    </svg>`;
  }

  if (sign.shape === 'circle' && sign.color === '#e74c3c') {
    const r = s * 0.45;
    const innerR = r - s * 0.1;
    const isNum = /^\d+$/.test(sign.symbol);
    const fontSize = isNum ? (sign.symbol.length > 2 ? s*0.2 : s*0.28) : s*0.26;
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <circle cx="${c}" cy="${c}" r="${r}" fill="#c0392b"/>
      <circle cx="${c}" cy="${c}" r="${innerR}" fill="white"/>
      <text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="central" font-size="${fontSize}" font-weight="800" fill="#1a1a2e">${sign.symbol}</text>
    </svg>`;
  }

  if (sign.shape === 'circle-blue' || (sign.shape === 'circle' && sign.color === '#2980b9')) {
    const r = s * 0.45;
    const isArrow = ['↑','→','←','↙','↗'].includes(sign.symbol);
    const fontSize = isArrow ? s * 0.4 : s * 0.28;
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <circle cx="${c}" cy="${c}" r="${r}" fill="#1a5276"/>
      <text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="central" font-size="${fontSize}" fill="white">${sign.symbol}</text>
    </svg>`;
  }

  if (sign.shape === 'inverted-triangle') {
    const pad = s * 0.05;
    const bw = s * 0.09;
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <polygon points="${pad},${pad} ${s-pad},${pad} ${c},${s-pad}" fill="#c0392b"/>
      <polygon points="${pad+bw},${pad+bw*0.6} ${s-pad-bw},${pad+bw*0.6} ${c},${s-pad-bw}" fill="white"/>
    </svg>`;
  }

  if (sign.shape === 'diamond') {
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <rect x="${s*0.12}" y="${s*0.12}" width="${s*0.76}" height="${s*0.76}" rx="4" fill="#f0a500" transform="rotate(45 ${c} ${c})"/>
      <rect x="${s*0.2}" y="${s*0.2}" width="${s*0.6}" height="${s*0.6}" rx="3" fill="white" transform="rotate(45 ${c} ${c})"/>
    </svg>`;
  }

  if (sign.shape === 'diamond-gray') {
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <rect x="${s*0.12}" y="${s*0.12}" width="${s*0.76}" height="${s*0.76}" rx="4" fill="#95a5a6" transform="rotate(45 ${c} ${c})"/>
      <rect x="${s*0.2}" y="${s*0.2}" width="${s*0.6}" height="${s*0.6}" rx="3" fill="white" transform="rotate(45 ${c} ${c})"/>
    </svg>`;
  }

  if (sign.shape === 'octagon') {
    const r2 = s * 0.44;
    const points = Array.from({length:8},(_,i)=>{
      const a = (i*45-22.5) * Math.PI/180;
      return `${c+r2*Math.cos(a)},${c+r2*Math.sin(a)}`;
    }).join(' ');
    return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18))">
      <polygon points="${points}" fill="#c0392b"/>
      <text x="${c}" y="${c}" text-anchor="middle" dominant-baseline="central" font-size="${s*0.22}" font-weight="900" fill="white" letter-spacing="1">${sign.symbol}</text>
    </svg>`;
  }

  return `<div style="font-size:2rem">${sign.symbol}</div>`;
}

// Road situation diagrams for quiz questions
const ROAD_DIAGRAMS = {
  crossroads_right: () => `<svg viewBox="0 0 200 200" width="180" height="180" style="border-radius:8px">
    <rect width="200" height="200" fill="#4CAF50"/>
    <rect x="80" y="0" width="40" height="200" fill="#9E9E9E"/>
    <rect x="0" y="80" width="200" height="40" fill="#9E9E9E"/>
    <rect x="82" y="2" width="36" height="196" fill="none"/>
    <line x1="100" y1="0" x2="100" y2="78" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
    <line x1="100" y1="122" x2="100" y2="200" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
    <line x1="0" y1="100" x2="78" y2="100" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
    <line x1="122" y1="100" x2="200" y2="100" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
    <text x="100" y="12" text-anchor="middle" font-size="14">⬆️</text>
    <rect x="84" y="55" width="32" height="20" rx="3" fill="#c0392b"/>
    <text x="100" y="68" text-anchor="middle" font-size="10" fill="white">🚗</text>
    <rect x="130" y="84" width="32" height="20" rx="3" fill="#2980b9"/>
    <text x="146" y="97" text-anchor="middle" font-size="10" fill="white">🚗</text>
    <text x="100" y="185" text-anchor="middle" font-size="10" fill="white">Hvem har vikeplikt?</text>
  </svg>`,

  roundabout: () => `<svg viewBox="0 0 200 200" width="180" height="180" style="border-radius:8px">
    <rect width="200" height="200" fill="#4CAF50"/>
    <rect x="80" y="0" width="40" height="60" fill="#9E9E9E"/>
    <rect x="80" y="140" width="40" height="60" fill="#9E9E9E"/>
    <rect x="0" y="80" width="60" height="40" fill="#9E9E9E"/>
    <rect x="140" y="80" width="60" height="40" fill="#9E9E9E"/>
    <circle cx="100" cy="100" r="55" fill="#9E9E9E"/>
    <circle cx="100" cy="100" r="30" fill="#4CAF50"/>
    <path d="M 100 55 A 45 45 0 1 1 55 100" fill="none" stroke="white" stroke-width="2" stroke-dasharray="8,5" marker-end="url(#arr)"/>
    <rect x="84" y="62" width="28" height="16" rx="3" fill="#c0392b"/>
    <text x="98" y="73" text-anchor="middle" font-size="9" fill="white">🚗 inn</text>
    <text x="100" y="185" text-anchor="middle" font-size="10" fill="#333">Vikeplikt for trafikk inne!</text>
  </svg>`,

  gangfelt: () => `<svg viewBox="0 0 200 160" width="200" height="160" style="border-radius:8px">
    <rect width="200" height="160" fill="#4CAF50"/>
    <rect x="0" y="50" width="200" height="60" fill="#757575"/>
    <rect x="0" y="50" width="200" height="4" fill="#f5f5f5"/>
    <rect x="0" y="106" width="200" height="4" fill="#f5f5f5"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${20+i*28}" y="54" width="16" height="52" fill="white" opacity="0.9"/>`).join('')}
    <text x="30" y="90" font-size="22">🚶‍♀️</text>
    <text x="130" y="90" font-size="20">🚗</text>
    <text x="100" y="150" text-anchor="middle" font-size="11" fill="#333">Fotgjenger i gangfelt = STOPP!</text>
  </svg>`,

  motorway_entry: () => `<svg viewBox="0 0 220 180" width="220" height="180" style="border-radius:8px">
    <rect width="220" height="180" fill="#4CAF50"/>
    <rect x="0" y="20" width="220" height="80" fill="#757575"/>
    <line x1="0" y1="60" x2="220" y2="60" stroke="white" stroke-width="2" stroke-dasharray="12,8"/>
    <rect x="0" y="20" width="220" height="4" fill="#f5f5f5"/>
    <rect x="0" y="96" width="220" height="4" fill="#f5f5f5"/>
    <polygon points="100,100 220,100 220,140 100,140" fill="#9E9E9E"/>
    <line x1="160" y1="100" x2="220" y2="100" stroke="white" stroke-width="2" stroke-dasharray="8,6"/>
    <text x="40" y="50" font-size="20">🚗💨</text>
    <text x="40" y="80" font-size="20">🚗💨</text>
    <text x="140" y="130" font-size="20">🚗</text>
    <text x="110" y="168" text-anchor="middle" font-size="11" fill="#333">Du har vikeplikt ved innkjøring!</text>
  </svg>`,

  forbikjoring: () => `<svg viewBox="0 0 240 160" width="240" height="160" style="border-radius:8px">
    <rect width="240" height="160" fill="#4CAF50"/>
    <rect x="0" y="40" width="240" height="80" fill="#757575"/>
    <line x1="0" y1="80" x2="240" y2="80" stroke="white" stroke-width="2" stroke-dasharray="12,8"/>
    <rect x="0" y="40" width="240" height="3" fill="#f5f5f5"/>
    <rect x="0" y="117" width="240" height="3" fill="#f5f5f5"/>
    <text x="20" y="65" font-size="18">🚗</text>
    <text x="110" y="65" font-size="18">🚜</text>
    <text x="120" y="148" text-anchor="middle" font-size="11" fill="#333">Stiplet linje = forbikjøring tillatt ✓</text>
  </svg>`,
};

window.ROAD_DIAGRAMS = ROAD_DIAGRAMS;

window.showSignModal = function(id) {
  const sign = SIGNS.find(s => s.id === id);
  if (!sign) return;
  document.getElementById('modal-sign-visual').innerHTML = renderSignShape(sign, 140);
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
    const lvl = getCurrentLevel();
    const next = getNextLevel();

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
        <div class="ov-icon">${lvl.icon}</div>
        <div class="ov-num">${lvl.name}</div>
        <div class="ov-label">Nivå ${lvl.level}</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">🔥</div>
        <div class="ov-num">${game.streak}</div>
        <div class="ov-label">Dagers streak</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">✨</div>
        <div class="ov-num">${game.xp}</div>
        <div class="ov-label">XP totalt</div>
      </div>
      <div class="overview-card">
        <div class="ov-icon">⚡</div>
        <div class="ov-num">${game.maxCombo}x</div>
        <div class="ov-label">Beste combo</div>
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
  if (confirm('Er du sikker på at du vil nullstille ALL fremgang, XP og poeng?')) {
    state.progress = {};
    game = { ...DEFAULT_GAME };
    saveProgress();
    saveGame();
    CATEGORIES.forEach(c => localStorage.removeItem(`no-seen-${c.id}`));
    localStorage.removeItem('no-seen-all');
    renderProgress();
    renderCategories();
    updateGameHeader();
    renderDailyChallenge();
    renderBadgesPage();
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
