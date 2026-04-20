const GER_STEPS = [
  {
    id: "door",
    label: "Door frame",
    mongolian: "Khaalga",
    prompt: "Which piece comes first when building the ger frame?",
    detail: "The doorway anchors the front opening of the ger. Sources commonly note that the entrance faces south or southeast.",
    success: "The door frame goes in first so the circular wall can connect to a fixed front opening."
  },
  {
    id: "khana",
    label: "Lattice walls",
    mongolian: "Khana",
    prompt: "After the door frame is placed, what comes next?",
    detail: "Khana are collapsible wall sections that unfold like an accordion and form the circular wall of the ger.",
    success: "Correct. The khana wall sections connect around the door to establish the full circular footprint."
  },
  {
    id: "bagana",
    label: "Center columns",
    mongolian: "Bagana",
    prompt: "Once the wall circle is set, which supports are raised in the center?",
    detail: "Bagana are the two interior support columns that hold the crown ring before the roof poles are installed.",
    success: "Correct. The bagana columns stand in the center to carry the crown ring."
  },
  {
    id: "toono",
    label: "Crown ring",
    mongolian: "Toono",
    prompt: "What is lifted onto the center columns next?",
    detail: "The toono is the circular crown at the top. It admits light and air and serves as the hub for the roof poles.",
    success: "Correct. The toono is fixed on top of the bagana before the roof poles are slotted in."
  },
  {
    id: "uni",
    label: "Roof poles",
    mongolian: "Uni",
    prompt: "Which wooden pieces radiate from the crown to the wall?",
    detail: "Uni are the roof poles. One end ties to the wall and the other fits into the toono.",
    success: "Correct. The uni complete the wooden skeleton of the roof."
  },
  {
    id: "felt",
    label: "Felt covers",
    mongolian: "Esgii / Tuurga / Deever",
    prompt: "Once the wooden frame is complete, what insulating layer is added?",
    detail: "Felt covers wrap the wall and roof. They insulate the ger against cold wind and harsh weather.",
    success: "Correct. Felt goes on after the wood frame is assembled."
  },
  {
    id: "ropes",
    label: "Outer ropes and flap",
    mongolian: "Hoshlon / Urkh",
    prompt: "What final pieces tighten the ger and protect the roof opening?",
    detail: "Outer ropes hold the felt and outer cover tight, while the urkh flap can cover the roof opening in bad weather.",
    success: "Correct. Ropes tension the cover and the roof flap finishes the weather protection."
  }
];

const gerElements = {
  statusBadge: document.getElementById("gerStatusBadge"),
  progressValue: document.getElementById("gerProgressValue"),
  nextValue: document.getElementById("gerNextValue"),
  mistakeValue: document.getElementById("gerMistakeValue"),
  modeValue: document.getElementById("gerModeValue"),
  indexPill: document.getElementById("gerIndexPill"),
  prompt: document.getElementById("gerPrompt"),
  lead: document.getElementById("gerLead"),
  pieceList: document.getElementById("gerPieceList"),
  feedbackPanel: document.getElementById("gerFeedbackPanel"),
  feedbackResult: document.getElementById("gerFeedbackResult"),
  feedbackText: document.getElementById("gerFeedbackText"),
  detailTitle: document.getElementById("gerDetailTitle"),
  detailBody: document.getElementById("gerDetailBody"),
  resetButton: document.getElementById("gerResetButton"),
  winnerDialog: document.getElementById("gerWinnerDialog"),
  winnerMessage: document.getElementById("gerWinnerMessage"),
  winnerRestartButton: document.getElementById("gerWinnerRestartButton")
};

function hasGerUI() {
  return Boolean(gerElements.pieceList && gerElements.prompt);
}

function shuffleItems(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createGerState() {
  return {
    stepIndex: 0,
    mistakes: 0,
    completedIds: [],
    lastPlacedId: null,
    choiceOrder: shuffleItems(GER_STEPS.map((step) => step.id)),
    feedbackKind: "neutral",
    feedbackTitle: "Pick the first piece to begin.",
    feedbackText: "The lesson follows a common frame-first, cover-second sequence described by multiple ger explainers."
  };
}

let gerState = createGerState();

function currentGerStep() {
  return GER_STEPS[gerState.stepIndex] || null;
}

function resetGerLesson() {
  gerState = createGerState();
  closeGerDialog();
  renderGerLesson();
}

function closeGerDialog() {
  if (gerElements.winnerDialog && gerElements.winnerDialog.open) {
    gerElements.winnerDialog.close();
  }
}

function completeGerLesson() {
  gerElements.winnerMessage.textContent = `You completed all ${GER_STEPS.length} build steps with ${gerState.mistakes} mistake${gerState.mistakes === 1 ? "" : "s"}.`;
  if (typeof gerElements.winnerDialog.showModal === "function" && !gerElements.winnerDialog.open) {
    gerElements.winnerDialog.showModal();
  }
}

function renderGerStats() {
  const step = currentGerStep();
  gerElements.statusBadge.textContent = gerState.stepIndex >= GER_STEPS.length
    ? "Ger complete"
    : `Build lesson • ${gerState.stepIndex} of ${GER_STEPS.length} placed`;
  gerElements.progressValue.textContent = `${gerState.stepIndex} / ${GER_STEPS.length}`;
  gerElements.nextValue.textContent = step ? step.label : "Finished";
  gerElements.mistakeValue.textContent = String(gerState.mistakes);
  gerElements.modeValue.textContent = "Educational";
  gerElements.indexPill.textContent = gerState.stepIndex >= GER_STEPS.length
    ? "Lesson complete"
    : `Step ${gerState.stepIndex + 1} of ${GER_STEPS.length}`;
}

function renderGerPrompt() {
  const step = currentGerStep();

  if (!step) {
    gerElements.prompt.textContent = "The ger is fully assembled.";
    gerElements.lead.textContent = "Restart the lesson to build it again or review the completed structure.";
    gerElements.detailTitle.textContent = "Completed ger";
    gerElements.detailBody.textContent = "The wood frame, felt, ropes, and roof flap now work together as a portable all-season dwelling.";
    return;
  }

  gerElements.prompt.textContent = step.prompt;
  gerElements.lead.textContent = "Choose the next correct part. If you miss, the lesson stays on the same step so you can try again.";
  gerElements.detailTitle.textContent = `${step.label} • ${step.mongolian}`;
  gerElements.detailBody.textContent = step.detail;
}

function renderGerFeedback() {
  gerElements.feedbackResult.textContent = gerState.feedbackTitle;
  gerElements.feedbackResult.className = `feedback-result ${gerState.feedbackKind === "good" ? "good" : gerState.feedbackKind === "bad" ? "bad" : ""}`.trim();
  gerElements.feedbackText.textContent = gerState.feedbackText;
}

function renderGerPieces() {
  gerElements.pieceList.innerHTML = "";
  const step = currentGerStep();

  gerState.choiceOrder.forEach((id) => {
    const piece = GER_STEPS.find((entry) => entry.id === id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button ger-piece-button";
    button.dataset.pieceId = piece.id;
    button.innerHTML = `
      <span class="ger-piece-name">${piece.label}</span>
      <span class="ger-piece-subtitle">${piece.mongolian}</span>
    `;

    const placed = gerState.completedIds.includes(piece.id);
    if (placed) {
      button.disabled = true;
      button.classList.add("correct", "is-placed");
      button.querySelector(".ger-piece-subtitle").textContent = "Placed";
    } else {
      button.disabled = false;
      button.addEventListener("click", () => handleGerGuess(piece.id));
    }

    if (step && !placed && piece.id !== step.id) {
      button.classList.add("ger-piece-idle");
    }

    gerElements.pieceList.appendChild(button);
  });
}

function renderGerVisual() {
  GER_STEPS.forEach((step) => {
    const node = document.getElementById(`gerStep-${step.id}`);
    if (!node) {
      return;
    }

    node.classList.remove("is-visible", "is-animating");

    if (gerState.completedIds.includes(step.id)) {
      node.classList.add("is-visible");
      if (step.id === gerState.lastPlacedId) {
        node.classList.add("is-animating");
      }
    }
  });
}

function renderGerLesson() {
  if (!hasGerUI()) {
    return;
  }

  renderGerStats();
  renderGerPrompt();
  renderGerFeedback();
  renderGerPieces();
  renderGerVisual();

  if (gerState.stepIndex >= GER_STEPS.length) {
    completeGerLesson();
  }
}

function shakeWrongButton(button) {
  button.classList.remove("is-shaking");
  void button.offsetWidth;
  button.classList.add("is-shaking");
  window.setTimeout(() => button.classList.remove("is-shaking"), 380);
}

function handleGerGuess(pieceId) {
  const step = currentGerStep();
  if (!step) {
    return;
  }

  if (pieceId === step.id) {
    gerState.completedIds.push(pieceId);
    gerState.lastPlacedId = pieceId;
    gerState.stepIndex += 1;
    gerState.feedbackKind = "good";
    gerState.feedbackTitle = `${step.label} is correct.`;
    gerState.feedbackText = step.success;
    renderGerLesson();

    window.setTimeout(() => {
      if (gerState.lastPlacedId === pieceId) {
        gerState.lastPlacedId = null;
        renderGerVisual();
      }
    }, 420);
    return;
  }

  gerState.mistakes += 1;
  gerState.feedbackKind = "bad";
  gerState.feedbackTitle = "Not the right order yet.";
  gerState.feedbackText = `Try again. ${step.label} comes before ${GER_STEPS.find((entry) => entry.id === pieceId).label.toLowerCase()} in this lesson sequence.`;

  const wrongButton = gerElements.pieceList.querySelector(`[data-piece-id="${pieceId}"]`);
  if (wrongButton) {
    shakeWrongButton(wrongButton);
  }

  renderGerStats();
  renderGerFeedback();
}

if (gerElements.resetButton) {
  gerElements.resetButton.addEventListener("click", resetGerLesson);
}

if (gerElements.winnerRestartButton) {
  gerElements.winnerRestartButton.addEventListener("click", resetGerLesson);
}

renderGerLesson();
