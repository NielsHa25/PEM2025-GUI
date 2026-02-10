import { createScene } from "./scene/createScene.js";
import { loadRobot } from "./scene/loadModels.js";
import { loadTable } from "./scene/loadTable.js";
import { createMaterials } from "./materials/materials.js";
import { createGUI } from "./ui/gui.js";
import { createWoodMaterial } from "./materials/woodMaterial.js";
import { createJengaTower } from "./scene/createJengaTower.js";
import { createRobotMotion } from "./robot/robotMotion.js";
import { createCameraHelper } from "./scene/cameraHelper.js";
import { enableJengaSelection } from "./scene/jengaSelection.js";
import { sendStart } from "./net/esp32.js";


// Architecture

const AppState = {
  DEMO: "demo",        // intro animation, no GUI
  READY: "ready",      // GUI visible, robot ready
  RUNNING: "running",  // ESP32 is controlling robot
  SELECT: "select"     // manual selection mode
};

let currentState = AppState.DEMO;

// Build Scene

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, {
  stencil: true
});


const { scene, camera, shadowGenerator } = createScene(engine, canvas);
scene.constantlyUpdateMeshUnderPointer = true;
const materials = createMaterials(scene);


// --- Load table first (static reference) ---
const tableMeshes = await loadTable(scene, shadowGenerator);


// --- Load robot ---
const robotMeshes = await loadRobot(scene, materials, shadowGenerator);

// --- Jenga Tower ---
const woodMat = createWoodMaterial(scene);

const jenga = createJengaTower(scene, shadowGenerator,
  {
  layers: 18,
  position: new BABYLON.Vector3(0, 0, 0),
  material: woodMat // or a wood material
});

// --- Jenga Selection ---
const selection = enableJengaSelection(
  scene,
  hoveredName => {
    gui.setHoveredBlock?.(hoveredName);
  },
  selectedList => {
    gui.setSelectedCount?.(selectedList.length);
    gui.setSelectedList?.(selectedList); // ✅ ADD
  }
);



// --- GUI ---
const gui = createGUI(scene, camera, jenga, {
  onBegin() {
  if (currentState === AppState.READY) {
    // AUTO MODE
    console.log("Begin AUTO destruction");
    sendStart([]); // ← ESP decides
    currentState = AppState.RUNNING;
    return;
  }

  if (currentState === AppState.SELECT) {
    const stones = selection.getSelectedStones();

    if (stones.length === 0) {
      console.warn("No stones selected");
      return;
    }

    console.log("Begin SELECT destruction", stones);
    sendStart(stones); // ← user-selected stones

    selection.disable(); // lock selection
    gui.showSelectPanel(false);
    currentState = AppState.RUNNING;
  }
}
,

 onModeChange(isSelect) {
  if (isSelect) {
    currentState = AppState.SELECT;
    selection.enable();
    gui.showSelectPanel(true);
    cameraHelper.goTo("INSPECT", jenga.root);
  } else {
    currentState = AppState.READY;
    selection.disable();
    selection.clear();
    gui.showSelectPanel(false);
    cameraHelper.goTo("READY", jenga.root);
  }
},


  onResetDemo() {
  robotMotion.stopAll();
  cameraHelper.stopDemo();

  selection.disable();
  selection.clear();

  gui.hide();
  currentState = AppState.DEMO;

  cameraHelper.startDemo(jenga.root);
  robotMotion.startDemo();
}

});


gui.hide();


// --- Robot Motion ---

const robotMotion = createRobotMotion(scene);

// camera Motion

const cameraHelper = createCameraHelper(scene, camera);


// Helper Functions 

function enterDemoMode() {
  currentState = AppState.DEMO;

  startCameraDemo(camera);
  startRobotDemo();

}

// Going from one to another
function exitDemoAndEnterReady() {
  stopCameraDemo();
  stopRobotDemo();
  robotMotion.stopAll();  

  robotMotion.moveToStartPosition();

  gui.show();
  currentState = AppState.READY;
  cameraHelper.goTo("READY");
}

function startCameraDemo() {
  cameraHelper.startDemo(jenga.root);
}

function stopCameraDemo() {
  cameraHelper.stopDemo();
}

function startRobotDemo() {
  robotMotion.startDemo(); // optional if you already have it
}

function stopRobotDemo() {
  robotMotion.stopAll();
}


window.addEventListener("keydown", () => {
  if (currentState !== AppState.DEMO) return;

  console.log("exit demo mode");
  exitDemoAndEnterReady();
});

console.log(
  shadowGenerator.getShadowMap().renderList.map(m => m.name)
);



// Start Demo mode
function onSceneReady() {
  enterDemoMode();
}

onSceneReady();




engine.runRenderLoop(() => {
  scene.render();
});


window.addEventListener("resize", () => {
  engine.resize();
});
