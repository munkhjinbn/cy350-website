const quizElements = {
  statusBadge: document.getElementById("miniStatusBadge"),
  streakValue: document.getElementById("miniStreakValue"),
  bestValue: document.getElementById("miniBestValue"),
  progressValue: document.getElementById("miniProgressValue"),
  remainingValue: document.getElementById("miniRemainingValue"),
  prompt: document.getElementById("miniPrompt"),
  lead: document.getElementById("miniLead"),
  indexPill: document.getElementById("miniIndexPill"),
  optionsGrid: document.getElementById("miniOptionsGrid"),
  feedbackPanel: document.getElementById("miniFeedbackPanel"),
  feedbackResult: document.getElementById("miniFeedbackResult"),
  feedbackText: document.getElementById("miniFeedbackText"),
  continueButton: document.getElementById("miniContinueButton"),
  restartButton: document.getElementById("miniRestartButton"),
  runSummary: document.getElementById("miniRunSummary")
};

const config = window.MINI_QUIZ_CONFIG;

if (config && quizElements.prompt && quizElements.optionsGrid) {
  const storageKey = `mini-quiz-${config.id}-v1`;

  function shuffle(list) {
    const items = [...list];
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function freshState(previousBest = 0) {
    const order = shuffle(config.questions.map((_, index) => index));
    const firstIndex = order[0];
    return {
      streak: 0,
      best: previousBest,
      answered: 0,
      order,
      currentIndex: firstIndex,
      options: shuffle(config.questions[firstIndex].options),
      mode: "question",
      lastCorrect: false
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        return freshState(0);
      }
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed.order) || parsed.order.length === 0) {
        return freshState(parsed.best || 0);
      }
      return parsed;
    } catch {
      return freshState(0);
    }
  }

  let state = loadState();

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function restartRun() {
    state = freshState(state.best);
    saveState();
    render();
  }

  function currentQuestion() {
    return config.questions[state.currentIndex];
  }

  function toFeedback(correct, detail) {
    state.mode = "feedback";
    state.lastCorrect = correct;
    quizElements.feedbackPanel.hidden = false;
    quizElements.feedbackResult.textContent = correct ? "Correct" : "Not this one";
    quizElements.feedbackResult.classList.toggle("feedback-correct", correct);
    quizElements.feedbackResult.classList.toggle("feedback-wrong", !correct);
    quizElements.feedbackText.textContent = detail;
    saveState();
  }

  function onOption(selected) {
    if (state.mode !== "question") return;
    const question = currentQuestion();
    const correct = selected === question.answer;

    if (correct) {
      state.streak += 1;
      state.best = Math.max(state.best, state.streak);
    } else {
      state.streak = 0;
    }

    state.answered += 1;

    const remaining = state.order.filter((value) => value !== state.currentIndex);
    if (remaining.length === 0) {
      toFeedback(correct, `${question.detail} Deck complete. Restart for a new shuffle.`);
      return;
    }

    state.order = remaining;
    state.currentIndex = remaining[0];
    state.options = shuffle(config.questions[state.currentIndex].options);
    toFeedback(correct, question.detail);
  }

  function onContinue() {
    if (state.answered >= config.questions.length) {
      restartRun();
      return;
    }
    state.mode = "question";
    quizElements.feedbackPanel.hidden = true;
    saveState();
    render();
  }

  function renderStats() {
    quizElements.statusBadge.textContent = `${config.title} • ${config.questions.length} cards`;
    quizElements.streakValue.textContent = String(state.streak);
    quizElements.bestValue.textContent = String(state.best);
    quizElements.progressValue.textContent = `${state.answered} / ${config.questions.length}`;
    quizElements.remainingValue.textContent = String(config.questions.length - state.answered);
    const next = state.answered + 1;
    quizElements.indexPill.textContent = `Card ${Math.min(next, config.questions.length)} of ${config.questions.length}`;
    quizElements.runSummary.textContent = `Answering all cards once completes the run. Wrong answers reset your streak but cards still retire.`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    quizElements.prompt.textContent = question.question;
    quizElements.lead.textContent = config.lead;
    quizElements.optionsGrid.innerHTML = "";

    state.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      button.textContent = option;
      button.addEventListener("click", () => onOption(option));
      quizElements.optionsGrid.append(button);
    });
  }

  function render() {
    renderStats();
    renderQuestion();

    if (state.mode === "feedback") {
      quizElements.feedbackPanel.hidden = false;
    } else {
      quizElements.feedbackPanel.hidden = true;
    }
  }

  quizElements.continueButton.addEventListener("click", onContinue);
  quizElements.restartButton.addEventListener("click", restartRun);

  render();
}
