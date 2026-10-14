/**
 * YES OR NO? — Magic Decision Maker
 * Pure client-side application logic
 */

(() => {
  'use strict';

  // --- ANSWERS DATABASE ---
  const ANSWERS = [
    {
      text: "ABSOLUTELY YES! ✨",
      type: "yes",
      icon: "✨",
      standard: [
        "The stars have aligned, the clouds have parted, and fate is shouting YES at the top of its lungs!",
        "All cosmic indicators point directly to success. Go forth without hesitation!",
        "Without a single shadow of doubt, this is your green light from the universe.",
        "The probabilities are 100% in your favor. Seize the moment!"
      ],
      funny: [
        "Even your grandma's lucky cat is nodding yes right now!",
        "The universe just gave this two enthusiastic thumbs up and a standing ovation.",
        "Yes! And if anyone disagrees, tell them the Magic 8-Ball said so and that makes it legally binding.",
        "10/10 time travelers from the year 3000 agree this is a total YES."
      ]
    },
    {
      text: "YES! 😎",
      type: "yes",
      icon: "😎",
      standard: [
        "Signs are promising! Trust your instincts and move forward.",
        "Fortune smiles upon you today. A definite yes!",
        "Clear skies ahead for this plan. You've got this!",
        "The answer is affirmative. Walk into your day with confidence."
      ],
      funny: [
        "Yes, but remember: with great power comes great need for snacks.",
        "Confirmed! Proceed immediately before the universe changes its fickle mind.",
        "Yes! Put your sunglasses on because your future looks ridiculously bright.",
        "The council of mystical entities has voted, and you win 9 votes to 1."
      ]
    },
    {
      text: "THE MAGIC SAYS YES! 🎉",
      type: "yes",
      icon: "🎉",
      standard: [
        "A wave of pure positive energy just washed through the cosmos in your favor!",
        "Mystical forces are cheering you on. The answer is a joyful YES!",
        "Cosmic serendipity is on your side today.",
        "The ancient oracles have spoken: celebratory vibes incoming!"
      ],
      funny: [
        "Cue the confetti cannons! The magic gives this an emphatic YES!",
        "Even the algorithms are smiling. Go do it before reality catches up!",
        "Yes! Do a little victory dance right now; nobody is judging (much).",
        "The cosmos just slammed the big red YES button!"
      ]
    },
    {
      text: "MOST LIKELY! 🔮",
      type: "yes",
      icon: "🔮",
      standard: [
        "The odds are heavily tipped in your direction. Stay positive!",
        "Looking into the crystal haze, things look very promising.",
        "A strong probability of success awaits you.",
        "The currents of destiny are flowing toward a favorable outcome."
      ],
      funny: [
        "About an 87.4% chance of victory, with a 12.6% margin for spontaneous snacking.",
        "Most likely! Unless a rogue squirrel intervenes, you're golden.",
        "The crystal ball is 9 out of 10 sure, and that 10th one was probably sleepy.",
        "Highly probable! Just don't jinx it by wearing socks with sandals."
      ]
    },
    {
      text: "MAYBE... 🤔",
      type: "maybe",
      icon: "🤔",
      standard: [
        "The threads of destiny are still weaving this outcome. Take your time.",
        "There are multiple paths open before you. A little reflection is needed.",
        "The cosmic dust hasn't settled yet. Keep your options open.",
        "Neither a clear yes nor a no—the power remains in your hands."
      ],
      funny: [
        "Maybe yes, maybe no, maybe it's time for an iced coffee first.",
        "The universe just shrugged so hard it created a minor gravitational wave.",
        "Even the quantum computers are scratching their heads on this one.",
        "Error 404: Certainty not found. Try flipping a pancake instead."
      ]
    },
    {
      text: "ASK AGAIN LATER! ⏳",
      type: "maybe",
      icon: "⏳",
      standard: [
        "The cosmic reception is a bit hazy right now. Give it a moment and try again.",
        "A question of this magnitude needs time to brew. Revisit shortly.",
        "Patience is your ally. The stars need a brief intermission.",
        "Energy is fluctuating. Return when your mind feels refreshed."
      ],
      funny: [
        "The oracle is currently on a mandated 15-minute union coffee break. Try soon!",
        "The Magic 8-Ball is buffering at 99%. Please don't restart the cosmos.",
        "I would tell you now, but it's a spoiler for Season 2 of your life.",
        "Cosmic Wi-Fi disconnected for a second. Ask again once the signal stabilizes."
      ]
    },
    {
      text: "PROBABLY NOT! 😂",
      type: "no",
      icon: "😂",
      standard: [
        "The wind seems to be blowing in another direction. Rethink this approach.",
        "Caution is advised. It may be wise to pursue a different path.",
        "The indicators suggest looking for better alternatives.",
        "Not today, but remember that every closed door leads to an open window."
      ],
      funny: [
        "I wouldn't bet your favorite hoodie on it, chief.",
        "Chances are lower than your phone battery at 2 AM with no charger.",
        "Probably not! In fact, even the pigeons on the street look skeptical.",
        "Signs point to: 'Nice try, but let’s be realistic here.'"
      ]
    },
    {
      text: "NOPE! 🙅",
      type: "no",
      icon: "🙅",
      standard: [
        "A clear and definitive no. Save your energy for what truly matters.",
        "The universe is redirecting you away from this. Trust the redirection.",
        "Sometimes 'No' is the greatest protection of all.",
        "Not this time. Set your sights onto brighter horizons."
      ],
      funny: [
        "Hard NO. Put the idea down slowly and back away with your hands up.",
        "No way, José! (Even if your name isn't José).",
        "The universe just slammed the emergency brake on this thought.",
        "Nope! Not in this dimension, not in the multiverse, not ever."
      ]
    }
  ];

  // --- SURPRISE QUESTIONS COLLECTION ---
  const SURPRISE_QUESTIONS = [
    "Should I eat another slice of pizza right now?",
    "Will I become a tech millionaire before 30?",
    "Is my pet secretly judging my life choices?",
    "Should I go to bed on time tonight?",
    "Will I finally stick to my morning workout routine?",
    "Should I buy that thing sitting in my shopping cart?",
    "Will tomorrow bring an unexpected surprise?",
    "Should I start writing that book I keep dreaming about?",
    "Is today the day to learn a completely new skill?",
    "Should I text them back?",
    "Will this weekend be wildly fun and relaxing?",
    "Should I adopt a friendly stray cat?",
    "Am I ready to conquer the next big challenge?",
    "Should I order dessert before dinner?",
    "Will my code compile on the very first try today?"
  ];

  // --- LOADING COSMIC QUOTES ---
  const LOADING_MESSAGES = [
    "Consulting the universe...",
    "Stargazing across parallel dimensions...",
    "Aligning cosmic vibrations...",
    "Deciphering mystic celestial scrolls...",
    "Spinning the quantum roulette of destiny...",
    "Whispering to the ancient oracle..."
  ];

  // --- LOCAL STORAGE KEYS ---
  const STORAGE_KEY_HISTORY = 'yes_no_magic_history_v1';
  const STORAGE_KEY_FUNNY_MODE = 'yes_no_magic_funny_mode_v1';

  // --- DOM ELEMENTS ---
  const ball = document.getElementById('magic-ball');
  const windowContent = document.getElementById('window-content');
  const ballWindow = document.querySelector('.ball-window');
  const questionForm = document.getElementById('question-form');
  const questionInput = document.getElementById('question-input');
  const charCounter = document.getElementById('char-counter');
  const inputError = document.getElementById('input-error');
  const askBtn = document.getElementById('ask-btn');
  const surpriseBtn = document.getElementById('surprise-btn');
  const loadingIndicator = document.getElementById('loading-indicator');
  const loadingText = document.getElementById('loading-text');

  const answerCard = document.getElementById('answer-card');
  const resultQuestion = document.getElementById('result-question');
  const resultAnswer = document.getElementById('result-answer');
  const resultExplanation = document.getElementById('result-explanation');
  const resultBallIcon = document.getElementById('result-ball-icon');
  const askAnotherBtn = document.getElementById('ask-another-btn');
  const copyBtn = document.getElementById('copy-btn');
  const shareBtn = document.getElementById('share-btn');

  const funnyModeToggle = document.getElementById('funny-mode-toggle');
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  const historyList = document.getElementById('history-list');
  const emptyHistory = document.getElementById('empty-history');

  const confirmModal = document.getElementById('confirm-modal');
  const cancelClearBtn = document.getElementById('cancel-clear-btn');
  const confirmClearBtn = document.getElementById('confirm-clear-btn');
  const toast = document.getElementById('toast');

  let isConsulting = false;
  let currentResult = null;

  // --- SAFE LOCAL STORAGE HELPERS ---
  const getStoredHistory = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not read LocalStorage history:", e);
      return [];
    }
  };

  const saveHistoryItem = (item) => {
    try {
      const list = getStoredHistory();
      // Keep only recent 10 items
      const updated = [item, ...list].slice(0, 10);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to LocalStorage:", e);
    }
  };

  const clearStoredHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      console.warn("Could not clear LocalStorage:", e);
    }
  };

  const getStoredFunnyMode = () => {
    try {
      return localStorage.getItem(STORAGE_KEY_FUNNY_MODE) === 'true';
    } catch (e) {
      return false;
    }
  };

  const saveStoredFunnyMode = (isEnabled) => {
    try {
      localStorage.setItem(STORAGE_KEY_FUNNY_MODE, isEnabled ? 'true' : 'false');
    } catch (e) {
      console.warn("Could not save funny mode preference:", e);
    }
  };

  // --- TOAST NOTIFICATION ---
  let toastTimer = null;
  const showToast = (message, icon = "✨") => {
    if (toastTimer) clearTimeout(toastTimer);
    toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${message}</span>`;
    toast.classList.remove('hidden');
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  };

  // --- AUDIO SYNTHESIS / HAPTIC FEEDBACK ---
  const triggerHaptic = (duration = 50) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(duration);
      } catch (e) {}
    }
  };

  // --- CHARACTER COUNTER & INPUT VALIDATION ---
  questionInput.addEventListener('input', () => {
    const len = questionInput.value.length;
    charCounter.textContent = `${len} / 120`;
    if (questionInput.classList.contains('error')) {
      questionInput.classList.remove('error');
      inputError.classList.add('hidden');
      inputError.textContent = '';
    }
  });

  const showInputError = (message) => {
    questionInput.classList.add('error');
    inputError.innerHTML = `⚠️ <span>${message}</span>`;
    inputError.classList.remove('hidden');
    questionInput.focus();
  };

  // --- SHAKE & ANSWER GENERATOR ---
  const askMagicOracle = (questionText) => {
    if (isConsulting) return;

    const trimmed = (questionText || questionInput.value || '').trim();
    if (!trimmed) {
      showInputError("Please ask a question first! The Magic 8-Ball cannot read a blank mind.");
      return;
    }

    if (trimmed.length < 2) {
      showInputError("Your question is too short. Give the cosmos a bit more to ponder!");
      return;
    }

    // Lock interactions
    isConsulting = true;
    askBtn.disabled = true;
    surpriseBtn.disabled = true;
    questionInput.disabled = true;
    triggerHaptic(60);

    // Pick random loading message
    const randLoading = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    loadingText.textContent = randLoading;
    loadingIndicator.classList.remove('hidden');

    // Reset window to 8 while shaking
    ballWindow.classList.remove('state-mystic');
    windowContent.innerHTML = `<span class="ball-number">8</span>`;

    // Shake animation
    ball.classList.add('is-shaking');

    // Calculate random answer
    const randAnswerObj = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    const isFunny = funnyModeToggle.checked;
    const explanationsPool = isFunny ? randAnswerObj.funny : randAnswerObj.standard;
    const randExplanation = explanationsPool[Math.floor(Math.random() * explanationsPool.length)];

    currentResult = {
      id: Date.now().toString(),
      question: trimmed,
      answer: randAnswerObj.text,
      type: randAnswerObj.type,
      icon: randAnswerObj.icon,
      explanation: randExplanation,
      isFunny: isFunny,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Duration of cosmic shake
    setTimeout(() => {
      ball.classList.remove('is-shaking');
      loadingIndicator.classList.add('hidden');

      // Transform 8-Ball inner window to floating die
      ballWindow.classList.add('state-mystic');
      windowContent.innerHTML = `
        <div class="triangle-answer" aria-hidden="true">
          <span>${randAnswerObj.text.replace(/[^A-Za-z\s]/g, '').trim()}</span>
        </div>
      `;

      // Update and reveal Answer Card
      displayAnswerCard(currentResult);

      // Save to History
      saveHistoryItem(currentResult);
      renderHistory();

      triggerHaptic(100);

      // Re-enable interactions
      isConsulting = false;
      askBtn.disabled = false;
      surpriseBtn.disabled = false;
      questionInput.disabled = false;
    }, 1100);
  };

  // --- DISPLAY ANSWER CARD ---
  const displayAnswerCard = (result) => {
    resultQuestion.textContent = `“${result.question}”`;
    resultAnswer.textContent = result.answer;
    resultAnswer.className = `result-answer-text type-${result.type}`;
    resultBallIcon.textContent = result.icon;
    resultExplanation.textContent = result.explanation;

    answerCard.classList.remove('hidden');

    // Smooth scroll into view if card is partially hidden
    setTimeout(() => {
      answerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  // --- SURPRISE ME ---
  const triggerSurprise = () => {
    if (isConsulting) return;
    const randomQ = SURPRISE_QUESTIONS[Math.floor(Math.random() * SURPRISE_QUESTIONS.length)];
    questionInput.value = randomQ;
    charCounter.textContent = `${randomQ.length} / 120`;
    if (questionInput.classList.contains('error')) {
      questionInput.classList.remove('error');
      inputError.classList.add('hidden');
    }
    askMagicOracle(randomQ);
  };

  // --- COPY & SHARE ---
  const copyAnswerToClipboard = async () => {
    if (!currentResult) return;
    const textToCopy = `🎱 Question: ${currentResult.question}\n🔮 Answer: ${currentResult.answer}\n💡 ${currentResult.explanation}\n✨ Asked on YES OR NO? Magic Decision Maker`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        showToast("Answer copied to clipboard!", "📋");
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast("Answer copied to clipboard!", "📋");
      }
    } catch (err) {
      console.warn("Clipboard write failed:", err);
      showToast("Unable to copy to clipboard", "⚠️");
    }
  };

  const shareAnswer = async () => {
    if (!currentResult) return;
    const shareData = {
      title: "🎱 YES OR NO? Decision Maker",
      text: `“${currentResult.question}” -> ${currentResult.answer} (${currentResult.explanation})`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("Shared successfully!", "🚀");
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyAnswerToClipboard();
        }
      }
    } else {
      // Fallback
      copyAnswerToClipboard();
      showToast("Share API unavailable — copied to clipboard!", "📋");
    }
  };

  // --- HISTORY RENDERING ---
  const renderHistory = () => {
    const list = getStoredHistory();
    if (!list || list.length === 0) {
      emptyHistory.classList.remove('hidden');
      historyList.classList.add('hidden');
      historyList.innerHTML = '';
      return;
    }

    emptyHistory.classList.add('hidden');
    historyList.classList.remove('hidden');
    historyList.innerHTML = '';

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'history-card';
      card.innerHTML = `
        <div>
          <div class="history-top">
            <span class="history-time">🕒 ${item.timestamp}</span>
            <span class="history-mode-badge">${item.isFunny ? '😂 Funny Mode' : '🔮 Standard'}</span>
          </div>
          <div class="history-question">“${escapeHtml(item.question)}”</div>
          <div class="history-answer ${item.type === 'yes' ? 'type-yes' : item.type === 'no' ? 'type-no' : 'type-maybe'}">
            ${escapeHtml(item.answer)}
          </div>
          <div class="history-explanation">${escapeHtml(item.explanation)}</div>
        </div>
        <div class="history-footer">
          <button type="button" class="btn-repeat" data-question="${escapeAttr(item.question)}">
            <span>Ask Again</span> 🔄
          </button>
        </div>
      `;
      historyList.appendChild(card);
    });

    // Attach repeat listeners
    historyList.querySelectorAll('.btn-repeat').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const q = e.currentTarget.getAttribute('data-question');
        questionInput.value = q;
        charCounter.textContent = `${q.length} / 120`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          askMagicOracle(q);
        }, 350);
      });
    });
  };

  // Simple HTML Escaper
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  function escapeAttr(str) {
    if (!str) return '';
    return str.replace(/"/g, '&quot;');
  }

  // --- EVENT LISTENERS ---
  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    askMagicOracle();
  });

  // Clicking ball shakes and submits
  ball.addEventListener('click', () => {
    if (!isConsulting) {
      if (questionInput.value.trim().length > 0) {
        askMagicOracle();
      } else {
        triggerSurprise();
      }
    }
  });

  ball.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      ball.click();
    }
  });

  surpriseBtn.addEventListener('click', triggerSurprise);

  askAnotherBtn.addEventListener('click', () => {
    questionInput.value = '';
    charCounter.textContent = '0 / 120';
    questionInput.focus();
    answerCard.classList.add('hidden');
    ballWindow.classList.remove('state-mystic');
    windowContent.innerHTML = `<span class="ball-number">8</span>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  copyBtn.addEventListener('click', copyAnswerToClipboard);
  shareBtn.addEventListener('click', shareAnswer);

  // Suggested question chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const q = e.currentTarget.getAttribute('data-question');
      questionInput.value = q;
      charCounter.textContent = `${q.length} / 120`;
      askMagicOracle(q);
    });
  });

  // Funny mode toggle
  funnyModeToggle.addEventListener('change', () => {
    const isChecked = funnyModeToggle.checked;
    saveStoredFunnyMode(isChecked);
    showToast(isChecked ? "Extra Funny Mode enabled! 😂" : "Standard Wisdom Mode active 🔮", isChecked ? "😂" : "🔮");
  });

  // Clear History Modal
  clearHistoryBtn.addEventListener('click', () => {
    const list = getStoredHistory();
    if (list.length === 0) {
      showToast("History is already empty!", "ℹ️");
      return;
    }
    confirmModal.classList.remove('hidden');
  });

  cancelClearBtn.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
  });

  confirmClearBtn.addEventListener('click', () => {
    clearStoredHistory();
    renderHistory();
    confirmModal.classList.add('hidden');
    showToast("Cosmic history cleared!", "🗑️");
  });

  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) {
      confirmModal.classList.add('hidden');
    }
  });

  // Navigation Smooth Scroll Highlight
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const sections = ['home', 'history', 'about'];
    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${secId}`);
          });
        }
      }
    });
  });

  // --- BACKGROUND PARTICLES & STARS CANVAS ---
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width = 0;
  let height = 0;

  const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.alphaSpeed = (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      // Colors: cyan, purple, pink, white
      const colors = ['#00d4ff', '#9d4edd', '#ff52d9', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha += this.alphaSpeed;

      if (this.alpha > 0.9 || this.alpha < 0.1) {
        this.alphaSpeed = -this.alphaSpeed;
      }

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = this.color;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const initParticles = () => {
    resizeCanvas();
    particles = [];
    const count = Math.min(75, Math.floor((width * height) / 14000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
  };

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  // --- INITIALIZATION ---
  const init = () => {
    // Restore funny mode setting
    const savedMode = getStoredFunnyMode();
    funnyModeToggle.checked = savedMode;

    // Render initial history
    renderHistory();

    // Init canvas particles
    initParticles();
    animateParticles();
  };

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
