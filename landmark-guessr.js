const LANDMARK_STORAGE_KEY = "mongolia-landmark-guessr-v1";
const LANDMARK_GEOJSON_URL = "mongolia-adm1.geojson";
const LANDMARK_VIEWBOX = { width: 900, height: 640 };
const LANDMARK_HIT_RADIUS = 34;

const LANDMARKS = [
  {
    id: "gandantegchinlen-monastery",
    name: "Gandantegchinlen Monastery",
    province: "Ulaanbaatar",
    coordinates: [106.8949, 47.9232]
  },
  {
    id: "chinggis-khaan-statue",
    name: "Chinggis Khaan Equestrian Statue",
    province: "Tov",
    coordinates: [107.5299, 47.8081]
  },
  {
    id: "gorkhi-terelj",
    name: "Gorkhi-Terelj National Park",
    province: "Tov",
    coordinates: [107.4245, 47.8927]
  },
  {
    id: "erdene-zuu",
    name: "Erdene Zuu Monastery",
    province: "Uvurkhangai",
    coordinates: [102.8429, 47.2016]
  },
  {
    id: "orkhon-waterfall",
    name: "Orkhon Waterfall",
    province: "Uvurkhangai",
    coordinates: [101.9604, 46.7875]
  },
  {
    id: "amarbayasgalant",
    name: "Amarbayasgalant Monastery",
    province: "Selenge",
    coordinates: [105.0816, 49.4848]
  },
  {
    id: "bayanzag",
    name: "Bayanzag Flaming Cliffs",
    province: "Umnugovi",
    coordinates: [103.7173, 44.14]
  },
  {
    id: "khongoryn-els",
    name: "Khongoryn Els",
    province: "Umnugovi",
    coordinates: [102.2563, 43.7604]
  },
  {
    id: "yolyn-am",
    name: "Yolyn Am",
    province: "Umnugovi",
    coordinates: [104.0825, 43.4959]
  },
  {
    id: "khuvsgul-lake",
    name: "Khuvsgul Lake",
    province: "Khuvsgul",
    coordinates: [100.85, 51.11]
  },
  {
    id: "karakorum",
    name: "Karakorum",
    province: "Uvurkhangai",
    coordinates: [102.8135, 47.1925]
  }
];

const landmarkElements = {
  statusBadge: document.getElementById("landmarkStatusBadge"),
  streakValue: document.getElementById("landmarkStreakValue"),
  bestValue: document.getElementById("landmarkBestValue"),
  progressValue: document.getElementById("landmarkProgressValue"),
  remainingValue: document.getElementById("landmarkRemainingValue"),
  indexPill: document.getElementById("landmarkIndexPill"),
  prompt: document.getElementById("landmarkPrompt"),
  lead: document.getElementById("landmarkLead"),
  mapFrame: document.getElementById("landmarkMapFrame"),
  mapLoading: document.getElementById("landmarkMapLoading"),
  map: document.getElementById("landmarkMap"),
  feedbackPanel: document.getElementById("landmarkFeedbackPanel"),
  feedbackResult: document.getElementById("landmarkFeedbackResult"),
  feedbackText: document.getElementById("landmarkFeedbackText"),
  continueButton: document.getElementById("landmarkContinueButton"),
  restartButton: document.getElementById("landmarkRestartButton"),
  runSummary: document.getElementById("landmarkRunSummary"),
  winnerDialog: document.getElementById("landmarkWinnerDialog"),
  winnerMessage: document.getElementById("landmarkWinnerMessage"),
  winnerRestartButton: document.getElementById("landmarkWinnerRestartButton")
};

function hasLandmarkUI() {
  return Boolean(landmarkElements.map && landmarkElements.prompt);
}

function shuffleItems(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function createLandmarkState(previousBest = 0) {
  const order = shuffleItems(landmarkData.landmarks.map((landmark) => landmark.id));
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

function loadLandmarkState() {
  try {
    const raw = window.localStorage.getItem(LANDMARK_STORAGE_KEY);
    if (!raw) {
      return createLandmarkState();
    }

    const parsed = JSON.parse(raw);
    const validIds = new Set(landmarkData.landmarks.map((landmark) => landmark.id));
    const queueValid = Array.isArray(parsed.queue) && parsed.queue.every((id) => validIds.has(id));
    const currentValid = typeof parsed.currentId === "string" && validIds.has(parsed.currentId);

    if (!queueValid || !currentValid) {
      return createLandmarkState(parsed.bestStreak || 0);
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
    return createLandmarkState();
  }
}

function saveLandmarkState() {
  window.localStorage.setItem(LANDMARK_STORAGE_KEY, JSON.stringify(landmarkState));
}

function closeLandmarkDialog() {
  if (landmarkElements.winnerDialog && landmarkElements.winnerDialog.open) {
    landmarkElements.winnerDialog.close();
  }
}

function restartLandmarkRun() {
  landmarkState = createLandmarkState(landmarkState.bestStreak);
  saveLandmarkState();
  closeLandmarkDialog();
  renderLandmarkGame();
}

function continueLandmarkRun() {
  if (landmarkState.completed) {
    completeLandmarkRun();
    return;
  }

  if (landmarkState.resetOnContinue) {
    landmarkState = createLandmarkState(landmarkState.bestStreak);
    saveLandmarkState();
    closeLandmarkDialog();
    renderLandmarkGame();
    return;
  }

  landmarkState.currentId = landmarkState.queue[0];
  landmarkState.mode = "question";
  landmarkState.lastResult = null;
  saveLandmarkState();
  renderLandmarkGame();
}

function completeLandmarkRun() {
  landmarkElements.winnerMessage.textContent = `You located all ${landmarkData.landmarks.length} landmarks. Your best streak is ${landmarkState.bestStreak}.`;
  if (typeof landmarkElements.winnerDialog.showModal === "function" && !landmarkElements.winnerDialog.open) {
    landmarkElements.winnerDialog.showModal();
  }
}

function updateLandmarkStats() {
  const total = landmarkData.landmarks.length;
  landmarkElements.statusBadge.textContent = landmarkState.mode === "feedback" && landmarkState.resetOnContinue
    ? "Run ended • new landmark deck ready"
    : `Landmark run • ${total} locations`;
  landmarkElements.streakValue.textContent = String(landmarkState.streak);
  landmarkElements.bestValue.textContent = String(landmarkState.bestStreak);
  landmarkElements.progressValue.textContent = `${landmarkState.answered} / ${total}`;
  landmarkElements.remainingValue.textContent = String(Math.max(total - landmarkState.answered, 0));
  landmarkElements.indexPill.textContent = `Pick ${Math.min(landmarkState.answered + 1, total)} of ${total}`;
  landmarkElements.runSummary.textContent = landmarkState.resetOnContinue
    ? "The streak ended. Continue to start a newly shuffled landmark run."
    : `${total - landmarkState.answered} landmarks remain in this run, and no location repeats before the deck resets.`;
}

function landmarkById(id) {
  return landmarkData.landmarks.find((landmark) => landmark.id === id);
}

function renderLandmarkPrompt() {
  const current = landmarkById(landmarkState.currentId);
  landmarkElements.prompt.textContent = current ? `Find ${current.name}` : "Loading landmark...";
  landmarkElements.lead.textContent = landmarkState.mode === "feedback"
    ? "Review the result in the map overlay, then continue."
    : "Click the map where you think the landmark is located. A close enough click counts.";

  if (landmarkState.mode === "feedback" && landmarkState.lastResult) {
    landmarkElements.feedbackPanel.hidden = false;
    landmarkElements.feedbackResult.textContent = landmarkState.lastResult.correct ? "Correct." : "Not quite.";
    landmarkElements.feedbackResult.className = landmarkState.lastResult.correct ? "feedback-result good" : "feedback-result bad";

    if (landmarkState.lastResult.correct) {
      landmarkElements.feedbackText.textContent = `${landmarkState.lastResult.correctName} is in ${landmarkState.lastResult.province}.`;
      landmarkElements.continueButton.textContent = landmarkState.answered === landmarkData.landmarks.length ? "See result" : "Next landmark";
    } else {
      landmarkElements.feedbackText.textContent = `${landmarkState.lastResult.correctName} is in ${landmarkState.lastResult.province}. You were ${landmarkState.lastResult.distance}px away.`;
      landmarkElements.continueButton.textContent = "Start new run";
    }
  } else {
    landmarkElements.feedbackPanel.hidden = true;
    landmarkElements.feedbackResult.textContent = "";
    landmarkElements.feedbackText.textContent = "";
  }
}

function updateLandmarkMarkers() {
  if (!landmarkData.overlayLayer) {
    return;
  }

  landmarkData.overlayLayer.innerHTML = "";

  if (landmarkState.mode !== "feedback" || !landmarkState.lastResult) {
    return;
  }

  const correctPoint = landmarkState.lastResult.correctPoint;
  const selectedPoint = landmarkState.lastResult.selectedPoint;

  const toleranceRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  toleranceRing.setAttribute("cx", correctPoint.x.toFixed(2));
  toleranceRing.setAttribute("cy", correctPoint.y.toFixed(2));
  toleranceRing.setAttribute("r", String(LANDMARK_HIT_RADIUS));
  toleranceRing.classList.add("landmark-ring");
  landmarkData.overlayLayer.appendChild(toleranceRing);

  if (!landmarkState.lastResult.correct) {
    landmarkData.overlayLayer.appendChild(createMarker(selectedPoint, "guess"));
  }

  landmarkData.overlayLayer.appendChild(createMarker(correctPoint, "target"));
}

function createMarker(point, variant) {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.classList.add("landmark-marker", `landmark-marker-${variant}`);
  group.setAttribute("transform", `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);

  const outer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  outer.setAttribute("r", variant === "target" ? "15" : "12");
  outer.classList.add("marker-outer");

  const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  inner.setAttribute("r", variant === "target" ? "5.5" : "4.5");
  inner.classList.add("marker-inner");

  group.appendChild(outer);
  group.appendChild(inner);
  return group;
}

function handleLandmarkGuess(event) {
  if (landmarkState.mode !== "question") {
    return;
  }

  const selectedPoint = getSvgPointFromEvent(event, landmarkElements.map);
  if (!selectedPoint) {
    return;
  }

  const correctLandmark = landmarkById(landmarkState.currentId);
  const correctPoint = correctLandmark.projected;
  const distance = Math.round(Math.hypot(selectedPoint.x - correctPoint.x, selectedPoint.y - correctPoint.y));
  const isCorrect = distance <= LANDMARK_HIT_RADIUS;

  landmarkState.mode = "feedback";
  landmarkState.lastResult = {
    selectedPoint,
    correctPoint,
    correctId: correctLandmark.id,
    correctName: correctLandmark.name,
    province: correctLandmark.province,
    distance,
    correct: isCorrect
  };

  if (isCorrect) {
    landmarkState.streak += 1;
    landmarkState.bestStreak = Math.max(landmarkState.bestStreak, landmarkState.streak);
    landmarkState.answered += 1;
    landmarkState.queue = landmarkState.queue.filter((id) => id !== landmarkState.currentId);
    landmarkState.completed = landmarkState.answered === landmarkData.landmarks.length;
    landmarkState.resetOnContinue = false;
  } else {
    landmarkState.streak = 0;
    landmarkState.completed = false;
    landmarkState.resetOnContinue = true;
  }

  saveLandmarkState();
  renderLandmarkGame();
}

function getSvgPointFromEvent(event, svg) {
  if (!svg) {
    return null;
  }

  const rect = svg.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return null;
  }

  const x = ((event.clientX - rect.left) / rect.width) * LANDMARK_VIEWBOX.width;
  const y = ((event.clientY - rect.top) / rect.height) * LANDMARK_VIEWBOX.height;
  return { x, y };
}

function projectGeojson(features, width, height) {
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

  function scalePoint(point) {
    const [x, y] = projectPoint(point);
    return {
      x: (x - bounds.minX) * scale + pad,
      y: (y - bounds.minY) * scale + pad
    };
  }

  return {
    provinces: projected.map((entry) => ({
      id: entry.feature.properties.shapeISO,
      name: entry.feature.properties.shapeName,
      path: geometryToPath(scaleCoords(entry.coordinates))
    })),
    projectPoint: scalePoint
  };
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

function renderLandmarkMap() {
  landmarkElements.map.innerHTML = "";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <filter id="landmarkMapShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="rgba(8, 27, 44, 0.18)" />
    </filter>
  `;
  landmarkElements.map.appendChild(defs);

  const regionsLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  regionsLayer.classList.add("landmark-regions");

  landmarkData.provinces.forEach((province) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("landmark-region");
    group.setAttribute("aria-label", province.name);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", province.path);
    path.classList.add("landmark-region-path");

    group.appendChild(path);
    group.addEventListener("click", handleLandmarkGuess);
    regionsLayer.appendChild(group);
  });

  const overlayLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  overlayLayer.classList.add("landmark-overlay");

  landmarkElements.map.appendChild(regionsLayer);
  landmarkElements.map.appendChild(overlayLayer);
  landmarkData.overlayLayer = overlayLayer;

  landmarkElements.mapLoading.hidden = true;
  updateLandmarkMarkers();
}

function renderLandmarkGame() {
  if (!hasLandmarkUI()) {
    return;
  }

  updateLandmarkStats();
  renderLandmarkPrompt();
  updateLandmarkMarkers();

  if (landmarkState.completed) {
    completeLandmarkRun();
  }
}

async function loadLandmarkData() {
  const response = await fetch(LANDMARK_GEOJSON_URL);
  if (!response.ok) {
    throw new Error(`Landmark map load failed with ${response.status}`);
  }

  const geojson = await response.json();
  const projected = projectGeojson(geojson.features, LANDMARK_VIEWBOX.width, LANDMARK_VIEWBOX.height);

  return {
    provinces: projected.provinces,
    projectPoint: projected.projectPoint,
    landmarks: LANDMARKS.map((landmark) => ({
      ...landmark,
      projected: projected.projectPoint(landmark.coordinates)
    })),
    overlayLayer: null
  };
}

let landmarkData = {
  provinces: [],
  projectPoint: null,
  landmarks: [],
  overlayLayer: null
};
let landmarkState = null;

async function initLandmarkGuessr() {
  if (!hasLandmarkUI()) {
    return;
  }

  try {
    landmarkData = await loadLandmarkData();
    landmarkState = loadLandmarkState();
    renderLandmarkMap();
    renderLandmarkGame();
  } catch (error) {
    landmarkElements.mapLoading.textContent = "Landmark map failed to load.";
    landmarkElements.prompt.textContent = "Could not load landmark data";
    landmarkElements.lead.textContent = "Refresh the page and try again.";
    console.error(error);
  }
}

if (landmarkElements.continueButton) {
  landmarkElements.continueButton.addEventListener("click", continueLandmarkRun);
}

if (landmarkElements.restartButton) {
  landmarkElements.restartButton.addEventListener("click", restartLandmarkRun);
}

if (landmarkElements.winnerRestartButton) {
  landmarkElements.winnerRestartButton.addEventListener("click", restartLandmarkRun);
}

initLandmarkGuessr();
