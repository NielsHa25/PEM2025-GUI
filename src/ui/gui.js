export function createGUI(scene, camera, jenga, callbacks = {}) {
  const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);


// ===============================
// ROOT FOR STATE-DEPENDENT UI
// ===============================
const contentRoot = new BABYLON.GUI.Container();
contentRoot.isVisible = false; // hidden during DEMO
ui.addControl(contentRoot);

const titleRoot = new BABYLON.GUI.Container();
titleRoot.isVisible = true; // visible during DEMO
ui.addControl(titleRoot);

const statusPanel = new BABYLON.GUI.StackPanel();
statusPanel.width = "500px";
statusPanel.isVertical = true;
statusPanel.spacing = 6;


// ===============================
// SELECT MODE PANEL
// ===============================

const selectPanel = new BABYLON.GUI.StackPanel();
selectPanel.width = "1100px";
selectPanel.isVertical = true;
selectPanel.spacing = 12;
selectPanel.isVisible = false; // only in SELECT mode
selectPanel.cornerRadius = "200px";


selectPanel.horizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
selectPanel.verticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

selectPanel.paddingLeft = "80px";
selectPanel.paddingBottom = "1200px";

selectPanel.background = "rgba(255,255,255,0.6)";
selectPanel.thickness = 0;

contentRoot.addControl(selectPanel);


const selectTitle = new BABYLON.GUI.TextBlock();
selectTitle.text = "SELECT MODE";
selectTitle.fontFamily = "JetBrains Mono";
selectTitle.fontSize = 130;
selectTitle.fontWeight = "800";
selectTitle.paddingLeft = "25px";
selectTitle.color = "black";
selectTitle.height = "150px";
selectTitle.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

selectPanel.addControl(selectTitle);


const hoverText = new BABYLON.GUI.TextBlock();
hoverText.text = "Hover: —";
hoverText.fontFamily = "JetBrains Mono";
hoverText.fontSize = 60;
hoverText.paddingLeft = "25px";
hoverText.paddingBottom = "25px"

hoverText.fontWeight = "400";
hoverText.color = "#444";
hoverText.height = "80px";
hoverText.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

selectPanel.addControl(hoverText);

const selectedText = new BABYLON.GUI.TextBlock();
selectedText.text = "Selected: 0";
selectedText.fontFamily = "JetBrains Mono";
selectedText.fontSize = 80;
selectedText.paddingLeft = "25px"; 
selectedText.fontWeight = "400";
selectedText.color = "#444";
selectedText.height = "4100x";
selectedText.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

selectPanel.addControl(selectedText);

// -------------------------------
// SELECTED LIST CONTAINER
// -------------------------------
const selectedListPanel = new BABYLON.GUI.StackPanel();
selectedListPanel.isVertical = true;
selectedListPanel.spacing = 6;
selectedListPanel.paddingTop = "8px";

selectPanel.addControl(selectedListPanel);





// ===============================
// TOP LEFT — TITLE GROUP
// ===============================
const titleGroup = new BABYLON.GUI.StackPanel();
titleGroup.isVertical = true;
titleGroup.width = "1500px";
titleGroup.horizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
titleGroup.verticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
titleGroup.paddingLeft = "60px";
titleGroup.paddingTop = "20px";
titleGroup.spacing = 10;

titleRoot.addControl(titleGroup);

// -------------------------------
// TITLE
// -------------------------------
const titleText = new BABYLON.GUI.TextBlock();
titleText.text = "JENGA ROBOT\nAUTONOMOUS DEMOLITION";
titleText.fontFamily = "JetBrains Mono";
titleText.fontSize = 90;
titleText.fontWeight = "800"; // bold
titleText.color = "black";
titleText.height = "250px";
titleText.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
titleText.textVerticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
titleText.textWrapping = true;

titleGroup.addControl(titleText);

// -------------------------------
// SUBTITLE
// -------------------------------
const subTitleText = new BABYLON.GUI.TextBlock();
subTitleText.text = "Press any key to continue";
subTitleText.fontFamily = "JetBrains Mono";
subTitleText.fontSize = 50;
subTitleText.fontWeight = "500"; // light
subTitleText.color = "black";
subTitleText.height = "80px";
subTitleText.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
subTitleText.textVerticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

titleGroup.addControl(subTitleText);



  // ===============================
  // TOP RIGHT — STATUS PANEL
  // ===============================
// Anchor top-right
statusPanel.horizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
statusPanel.verticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

// Spacing from edges
statusPanel.paddingTop = "40px";
statusPanel.paddingRight = "60px";

contentRoot.addControl(statusPanel);


  // -------------------------------
// STATUS TITLE
// -------------------------------
const statusTitle = new BABYLON.GUI.TextBlock();
statusTitle.text = "STATUS";
statusTitle.fontFamily = "JetBrains Mono, monospace";
statusTitle.fontSize = 60;
statusTitle.fontWeight = "800"; // bold
statusTitle.color = "black";
statusTitle.height = "80px";
statusTitle.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

statusPanel.addControl(statusTitle);

// -------------------------------
// CONNECTION STATE
// -------------------------------
const statusConnection = new BABYLON.GUI.TextBlock();
statusConnection.text = "DISCONNECTED 〇";
statusConnection.fontFamily = "JetBrains Mono, monospace";
statusConnection.fontSize = 60;
statusConnection.fontWeight = "400"; // light
statusConnection.color = "#C0392B"; // red
statusConnection.height = "80px";
statusConnection.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

statusPanel.addControl(statusConnection);

// -------------------------------
// PING
// -------------------------------
const statusPing = new BABYLON.GUI.TextBlock();
statusPing.text = "PING: -- ms";
statusPing.fontFamily = "JetBrains Mono, monospace";
statusPing.fontSize = 50;
statusPing.fontWeight = "400";
statusPing.color = "#555";
statusPing.height = "70px";
statusPing.textHorizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

statusPanel.addControl(statusPing);


  // ===============================
  // USER INFO PANEL (placeholder)
  // ===============================
    const userPanel = new BABYLON.GUI.StackPanel();
    userPanel.width = "260px";
    userPanel.height = "100px";
    userPanel.isVertical = true;
    userPanel.isVisible = false;

    userPanel.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    userPanel.verticalAlignment =
    BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    userPanel.paddingTop = "520px";
    userPanel.paddingRight = "20px";

    const userText = new BABYLON.GUI.TextBlock();
    userText.text = "User Info";
    userText.fontSize = 40;
    userText.fontFamily = "JetBrains Mono, monospace";
    userText.fontWeight = "500";
    userText.color = "Black";

    userPanel.addControl(userText);
    contentRoot.addControl(userPanel);


  // ===============================
  // BOTTOM RIGHT — CONTROL PANEL
  // ===============================

// ===============================
// BOTTOM RIGHT — CONTROL PANEL
// ===============================
const controlPanel = new BABYLON.GUI.StackPanel();
controlPanel.width = "1100px";
controlPanel.isVertical = true;
controlPanel.spacing = 24;

// Anchor bottom-right
controlPanel.horizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
controlPanel.verticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

// Spacing from screen edge
controlPanel.paddingRight = "80px";
controlPanel.paddingBottom = "80px";

// Card-style background
controlPanel.background = "rgba(255,255,255,0.6)";
controlPanel.thickness = 0;


const controlContent = new BABYLON.GUI.StackPanel();
controlContent.isVertical = true;
controlContent.spacing = 20;

// Inner padding
controlContent.paddingTop = "30px";
controlContent.paddingBottom = "30px";
controlContent.paddingLeft = "30px";
controlContent.paddingRight = "30px";

controlPanel.addControl(controlContent);



 const beginBtn = BABYLON.GUI.Button.CreateSimpleButton(
  "beginBtn",
  "BEGIN DESTRUCTION"
);
beginBtn.height = "150px";
beginBtn.fontSize = 70;
beginBtn.fontFamily = "JetBrains Mono";
beginBtn.fontWeight = "500";
beginBtn.color = "black";
beginBtn.background = "rgba(255, 191, 191, 1)";
beginBtn.thickness = 0;

// Subtle hover feedback
beginBtn.onPointerEnterObservable.add(() => {
  beginBtn.background = "rgba(255, 0, 0, 0.91)";
  beginBtn.fontWeight = "800";
  beginBtn.color = "white";
});
beginBtn.onPointerOutObservable.add(() => {
  beginBtn.background = "rgba(255, 191, 191, 1)";
  beginBtn.fontWeight = "500";
  beginBtn.color = "black";
});

controlContent.addControl(beginBtn);



  const modeBtn = BABYLON.GUI.Button.CreateSimpleButton(
  "modeBtn",
  "MODE: AUTO"
);
modeBtn.height = "160px";
modeBtn.fontSize = 80;
modeBtn.fontFamily = "JetBrains Mono";
modeBtn.fontWeight = "600";
modeBtn.color = "black";
modeBtn.background = "transparent";
modeBtn.thickness = 0;

modeBtn.onPointerEnterObservable.add(() => {
  modeBtn.background = "rgba(0,0,0,0.04)";
});
modeBtn.onPointerOutObservable.add(() => {
  modeBtn.background = "transparent";
});

controlContent.addControl(modeBtn);


  
const resetBtn = BABYLON.GUI.Button.CreateSimpleButton(
  "resetBtn",
  "↺ DEMO MODE"
);
resetBtn.height = "100px";
resetBtn.fontSize = 50;
resetBtn.fontFamily = "JetBrains Mono";
resetBtn.fontWeight = "400";
resetBtn.color = "#333";
resetBtn.background = "transparent";
resetBtn.thickness = 0;
resetBtn.alpha = 0.7;

resetBtn.onPointerEnterObservable.add(() => {
  resetBtn.alpha = 1.0;
});
resetBtn.onPointerOutObservable.add(() => {
  resetBtn.alpha = 0.7;
});



controlContent.addControl(resetBtn);

contentRoot.addControl(controlPanel);



  // ===============================
  // STATE
  // ===============================
  let isSelectMode = false;

  // ===============================
  // EVENTS
  // ===============================
  beginBtn.onPointerUpObservable.add(() => {
    callbacks.onBegin?.();
  });

  modeBtn.onPointerUpObservable.add(() => {
    isSelectMode = !isSelectMode;
    modeBtn.textBlock.text = `Mode: ${isSelectMode ? "SELECT" : "AUTO"}`;
    callbacks.onModeChange?.(isSelectMode);
  });

  resetBtn.onPointerUpObservable.add(() => {
  callbacks.onResetDemo?.();
});


// ===============================
// HOVER EVENTS
// =============================

resetBtn.onPointerEnterObservable.add(() => {
  resetBtn.alpha = 1.0;
});
resetBtn.onPointerOutObservable.add(() => {
  resetBtn.alpha = 0.8;
});

// ===============================
// Helper Functions
// =============================

function prettyBlockName(rawName) {
  if (!rawName) return "—";

  // Expected format: block_<layer>_<index>
  const match = rawName.match(/^block_(\d+)_(\d+)$/);
  if (!match) return rawName;

  const layer = Number(match[1]);
  const index = Number(match[2]);

  return `Layer ${layer} · Block ${index}`;
}

function setSelectedList(names) {
  // Clear old entries
  selectedListPanel.clearControls();

  if (!names || names.length === 0) {
    const emptyText = new BABYLON.GUI.TextBlock();
    emptyText.text = "— none —";
    emptyText.fontFamily = "JetBrains Mono";
    emptyText.fontSize = 50;
    emptyText.fontWeight = "300";
    emptyText.color = "#666";
    emptyText.height = "80px";
    emptyText.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    selectedListPanel.addControl(emptyText);
    return;
  }

  // Add each selected block
  names.forEach(name => {
    const item = new BABYLON.GUI.TextBlock();
    item.text = `• ${prettyBlockName(name)}`;
    item.fontFamily = "JetBrains Mono";
    item.fontSize = 50;
    item.fontWeight = "400";
    item.color = "#222";
    item.height = "70px";
    item.paddingLeft = "25px";
    item.paddingBottom = "25px";
    item.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    selectedListPanel.addControl(item);
  });
}



  // ===============================
  // PUBLIC API
  // ===============================
  function show() {
    contentRoot.isVisible = true;
    titleRoot.isVisible = false;

  }
 
  function hide() {
    contentRoot.isVisible = false;
    titleRoot.isVisible = true;
  }

  function showSelectPanel(show) {
  selectPanel.isVisible = show;
}

function setHoveredBlock(name) {
  hoverText.text = name
    ? `Hover: ${prettyBlockName(name)}`
    : "Hover: —";
}

function setSelectedCount(count) {
  selectedText.text = `Selected: ${count}`;
}

// Setting statusconnection and ping
function setStatus(connected, ping) {
  statusConnection.text = connected ? "● CONNECTED " : "● DISCONNECTED ";
  statusConnection.color = connected ? "#27AE60" : "#C0392B"; // green / red

  statusPing.text =
    `PING: ${ping != null ? ping + " ms" : "-- ms"}`;
}



  return {
    show,
    hide,
    setStatus,
    showSelectPanel,
    setHoveredBlock,
    setSelectedCount,
    setSelectedList
  };
}
