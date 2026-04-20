const PROVINCE_STORAGE_KEY = "mongolia-province-guessr-v1";
const PROVINCE_GEOJSON_URL = "mongolia-adm1.geojson";
const EXCLUDED_REGIONS = new Set(["Ulaanbaatar"]);

const provinceElements = {
  statusBadge: document.getElementById("provinceStatusBadge"),
  streakValue: document.getElementById("provinceStreakValue"),
  bestValue: document.getElementById("provinceBestValue"),
  progressValue: document.getElementById("provinceProgressValue"),
  remainingValue: document.getElementById("provinceRemainingValue"),
  indexPill: document.getElementById("provinceIndexPill"),
  prompt: document.getElementById("provincePrompt"),
  lead: document.getElementById("provinceLead"),
  mapFrame: document.getElementById("provinceMapFrame"),
  mapLoading: document.getElementById("provinceMapLoading"),
  map: document.getElementById("provinceMap"),
  feedbackPanel: document.getElementById("provinceFeedbackPanel"),
  feedbackResult: document.getElementById("provinceFeedbackResult"),
  feedbackText: document.getElementById("provinceFeedbackText"),
  continueButton: document.getElementById("provinceContinueButton"),
  restartButton: document.getElementById("provinceRestartButton"),
  runSummary: document.getElementById("provinceRunSummary"),
  winnerDialog: document.getElementById("provinceWinnerDialog"),
  winnerMessage: document.getElementById("provinceWinnerMessage"),
  winnerRestartButton: document.getElementById("provinceWinnerRestartButton")
};

function hasProvinceUI() {
  return Boolean(provinceElements.map && provinceElements.prompt);
}

function shuffleItems(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createProvinceState(previousBest = 0) {
  const order = shuffleItems(provinceData.map((province) => province.id));
  return {
    streak: 0,
    bestStreak: previousBest,
    answered: 0,
    queue: order,
    currentId: order[0],
    mode: "question",
    completed: false,
    resetOnContinue: false,
    lastResult: null
  };
}

function loadProvinceState() {
  try {
    const raw = window.localStorage.getItem(PROVINCE_STORAGE_KEY);
    if (!raw) {
      return createProvinceState();
    }

    const parsed = JSON.parse(raw);
    const validIds = new Set(provinceData.map((province) => province.id));
    const queueValid = Array.isArray(parsed.queue) && parsed.queue.every((id) => validIds.has(id));
    const currentValid = typeof parsed.currentId === "string" && validIds.has(parsed.currentId);

    if (!queueValid || !currentValid) {
      return createProvinceState(parsed.bestStreak || 0);
    }

    return {
      streak: parsed.streak || 0,
      bestStreak: parsed.bestStreak || 0,
      answered: parsed.answered || 0,
      queue: parsed.queue,
      currentId: parsed.currentId,
      mode: parsed.mode || "question",
      completed: Boolean(parsed.completed),
      resetOnContinue: Boolean(parsed.resetOnContinue),
      lastResult: parsed.lastResult || null
    };
  } catch (error) {
    return createProvinceState();
  }
}

function saveProvinceState() {
  window.localStorage.setItem(PROVINCE_STORAGE_KEY, JSON.stringify(provinceState));
}

function closeProvinceDialog() {
  if (provinceElements.winnerDialog && provinceElements.winnerDialog.open) {
    provinceElements.winnerDialog.close();
  }
}

function restartProvinceRun() {
  provinceState = createProvinceState(provinceState.bestStreak);
  saveProvinceState();
  closeProvinceDialog();
  renderProvinceGame();
}

function continueProvinceRun() {
  if (provinceState.completed) {
    completeProvinceRun();
    return;
  }

  if (provinceState.resetOnContinue) {
    provinceState = createProvinceState(provinceState.bestStreak);
    saveProvinceState();
    closeProvinceDialog();
    renderProvinceGame();
    return;
  }

  provinceState.currentId = provinceState.queue[0];
  provinceState.mode = "question";
  provinceState.lastResult = null;
  saveProvinceState();
  renderProvinceGame();
}

function completeProvinceRun() {
  provinceElements.winnerMessage.textContent = `You cleared all 21 aimags. Your best streak is ${provinceState.bestStreak}.`;
  if (typeof provinceElements.winnerDialog.showModal === "function" && !provinceElements.winnerDialog.open) {
    provinceElements.winnerDialog.showModal();
  }
}

function updateProvinceStats() {
  const total = provinceData.length;
  provinceElements.statusBadge.textContent = provinceState.mode === "feedback" && provinceState.resetOnContinue
    ? "Run ended • new sequence ready"
    : "Province run • 21 aimags";
  provinceElements.streakValue.textContent = String(provinceState.streak);
  provinceElements.bestValue.textContent = String(provinceState.bestStreak);
  provinceElements.progressValue.textContent = `${provinceState.answered} / ${total}`;
  provinceElements.remainingValue.textContent = String(Math.max(total - provinceState.answered, 0));
  provinceElements.indexPill.textContent = `Pick ${Math.min(provinceState.answered + 1, total)} of ${total}`;
  provinceElements.runSummary.textContent = provinceState.resetOnContinue
    ? "The streak ended. Continue to start a newly shuffled 21-province run."
    : `${total - provinceState.answered} provinces remain in this run, and no province repeats before the deck resets.`;
}

function provinceById(id) {
  return provinceData.find((province) => province.id === id);
}

function renderProvincePrompt() {
  const current = provinceById(provinceState.currentId);
  provinceElements.prompt.textContent = current ? `Find ${current.name}` : "Loading aimag...";
  provinceElements.lead.textContent = provinceState.mode === "feedback"
    ? "Review the result below, then continue."
    : "Hover a province to raise it from the map, then click the area you think matches the prompt.";

  if (provinceState.mode === "feedback" && provinceState.lastResult) {
    provinceElements.feedbackPanel.hidden = false;
    provinceElements.feedbackResult.textContent = provinceState.lastResult.correct ? "Correct." : "Wrong province.";
    provinceElements.feedbackResult.className = provinceState.lastResult.correct ? "feedback-result good" : "feedback-result bad";

    if (provinceState.lastResult.correct) {
      provinceElements.feedbackText.textContent = `${provinceState.lastResult.correctName} was the correct pick.`;
      provinceElements.continueButton.textContent = provinceState.answered === provinceData.length ? "See result" : "Next province";
    } else {
      provinceElements.feedbackText.textContent = `You picked ${provinceState.lastResult.selectedName}. The correct province was ${provinceState.lastResult.correctName}.`;
      provinceElements.continueButton.textContent = "Start new run";
    }
  } else {
    provinceElements.feedbackPanel.hidden = true;
    provinceElements.feedbackResult.textContent = "";
    provinceElements.feedbackText.textContent = "";
  }
}

function updateProvinceMapClasses() {
  if (!provinceElements.map) {
    return;
  }

  let topNode = null;

  provinceElements.map.querySelectorAll(".province-region").forEach((node) => {
    const provinceId = node.dataset.provinceId;
    node.classList.remove("is-correct", "is-wrong", "is-neutral");
    node.setAttribute("aria-disabled", provinceState.mode === "question" ? "false" : "true");

    if (provinceState.mode === "feedback" && provinceState.lastResult) {
      if (provinceId === provinceState.lastResult.correctId) {
        node.classList.add("is-correct");
        topNode = node;
      } else if (provinceId === provinceState.lastResult.selectedId && !provinceState.lastResult.correct) {
        node.classList.add("is-wrong");
        topNode = node;
      } else {
        node.classList.add("is-neutral");
      }
    }
  });

  if (topNode) {
    provinceElements.map.appendChild(topNode);
  }
}

function handleProvinceGuess(provinceId) {
  if (provinceState.mode !== "question") {
    return;
  }

  const selected = provinceById(provinceId);
  const correct = provinceById(provinceState.currentId);
  const isCorrect = provinceId === provinceState.currentId;

  provinceState.mode = "feedback";
  provinceState.lastResult = {
    selectedId: selected.id,
    selectedName: selected.name,
    correctId: correct.id,
    correctName: correct.name,
    correct: isCorrect
  };

  if (isCorrect) {
    provinceState.streak += 1;
    provinceState.bestStreak = Math.max(provinceState.bestStreak, provinceState.streak);
    provinceState.answered += 1;
    provinceState.queue = provinceState.queue.filter((id) => id !== provinceState.currentId);
    provinceState.completed = provinceState.answered === provinceData.length;
    provinceState.resetOnContinue = false;
  } else {
    provinceState.streak = 0;
    provinceState.completed = false;
    provinceState.resetOnContinue = true;
  }

  saveProvinceState();
  renderProvinceGame();
}

function attachProvinceInteractions(regionNode, provinceId) {
  function bringToFront() {
    if (provinceElements.map && regionNode.parentNode === provinceElements.map) {
      provinceElements.map.appendChild(regionNode);
    }
  }

  regionNode.addEventListener("mouseenter", bringToFront);
  regionNode.addEventListener("focus", bringToFront);
  regionNode.addEventListener("click", () => handleProvinceGuess(provinceId));
  regionNode.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleProvinceGuess(provinceId);
    }
  });
}

function projectProvinceData(features, width, height) {
  const projected = [];
  const bounds = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
  const latitudes = [];

  function collectLatitudes(coords) {
    if (typeof coords[0] === "number") {
      latitudes.push(coords[1]);
      return;
    }
    coords.forEach(collectLatitudes);
  }

  features.forEach((feature) => collectLatitudes(feature.geometry.coordinates));
  const meanLat = latitudes.reduce((sum, value) => sum + value, 0) / latitudes.length;
  const lonScale = Math.cos((meanLat * Math.PI) / 180);

  function projectPoint(point) {
    return [point[0] * lonScale, -point[1]];
  }

  function projectCoords(coords) {
    if (typeof coords[0] === "number") {
      const [x, y] = projectPoint(coords);
      bounds.minX = Math.min(bounds.minX, x);
      bounds.maxX = Math.max(bounds.maxX, x);
      bounds.minY = Math.min(bounds.minY, y);
      bounds.maxY = Math.max(bounds.maxY, y);
      return [x, y];
    }
    return coords.map(projectCoords);
  }

  features.forEach((feature) => {
    projected.push({
      feature,
      coordinates: projectCoords(feature.geometry.coordinates)
    });
  });

  const pad = 28;
  const scale = Math.min(
    (width - pad * 2) / (bounds.maxX - bounds.minX),
    (height - pad * 2) / (bounds.maxY - bounds.minY)
  );

  function scaleCoords(coords) {
    if (typeof coords[0] === "number") {
      return [
        (coords[0] - bounds.minX) * scale + pad,
        (coords[1] - bounds.minY) * scale + pad
      ];
    }
    return coords.map(scaleCoords);
  }

  return projected.map((entry) => {
    return {
      id: entry.feature.properties.shapeISO,
      name: entry.feature.properties.shapeName,
      path: geometryToPath(scaleCoords(entry.coordinates)),
      properties: entry.feature.properties
    };
  });
}

function geometryToPath(coordinates) {
  const polygons = Array.isArray(coordinates[0][0][0]) ? coordinates : [coordinates];
  let path = "";

  polygons.forEach((polygon) => {
    polygon.forEach((ring) => {
      ring.forEach((point, index) => {
        path += `${index === 0 ? "M" : "L"}${point[0].toFixed(2)},${point[1].toFixed(2)}`;
      });
      path += "Z";
    });
  });

  return path;
}

function renderProvinceMap() {
  provinceElements.map.innerHTML = "";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <filter id="provinceShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="rgba(8, 27, 44, 0.22)" />
    </filter>
  `;
  provinceElements.map.appendChild(defs);

  provinceData.forEach((province) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("province-region");
    group.dataset.provinceId = province.id;
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", province.name);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", province.path);
    path.classList.add("province-path");

    group.appendChild(path);
    attachProvinceInteractions(group, province.id);
    provinceElements.map.appendChild(group);
  });

  provinceElements.mapLoading.hidden = true;
  updateProvinceMapClasses();
}

function renderProvinceGame() {
  if (!hasProvinceUI()) {
    return;
  }

  updateProvinceStats();
  renderProvincePrompt();
  updateProvinceMapClasses();

  if (provinceState.completed) {
    completeProvinceRun();
  }
}

async function loadProvinceData() {
  const response = await fetch(PROVINCE_GEOJSON_URL);
  if (!response.ok) {
    throw new Error(`Province data load failed with ${response.status}`);
  }

  const geojson = await response.json();
  const features = geojson.features.filter((feature) => !EXCLUDED_REGIONS.has(feature.properties.shapeName));
  return projectProvinceData(features, 900, 640);
}

let provinceData = [];
let provinceState = null;

async function initProvinceGuessr() {
  if (!hasProvinceUI()) {
    return;
  }

  try {
    provinceData = await loadProvinceData();
    provinceState = loadProvinceState();
    renderProvinceMap();
    renderProvinceGame();
  } catch (error) {
    provinceElements.mapLoading.textContent = "Province map failed to load.";
    provinceElements.prompt.textContent = "Could not load province data";
    provinceElements.lead.textContent = "Refresh the page and try again.";
    console.error(error);
  }
}

if (provinceElements.continueButton) {
  provinceElements.continueButton.addEventListener("click", continueProvinceRun);
}

if (provinceElements.restartButton) {
  provinceElements.restartButton.addEventListener("click", restartProvinceRun);
}

if (provinceElements.winnerRestartButton) {
  provinceElements.winnerRestartButton.addEventListener("click", restartProvinceRun);
}

initProvinceGuessr();
