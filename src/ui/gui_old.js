import { enableJengaSelection } from "../scene/jengaSelection.js";
import { focusCameraOnTower } from "../scene/cameraHelper.js";
import { rotateCamera90 } from "../scene/cameraHelper.js";


function prettyName(meshName) {
  if (!meshName) return "—";
  const [, layer, index] = meshName.split("_");
  return `${layer}.${Number(index) + 1}`;
}






export function createGUI(scene, camera, jenga, setAutoRotate, options = {}) {
  const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  ui.isPointerBlocker = false;

  function makeButton(text, leftPx, topPx) {
    const btn = BABYLON.GUI.Button.CreateSimpleButton(text, text);
    btn.width = "400px";
    btn.height = "200px";
    btn.color = "white";
    btn.background = "#222";
    btn.left = leftPx;
    btn.fontSize = 40;
    btn.fontFamily = "Arial Black";
    btn.top = topPx;
    btn.isPointerBlocker = false;
    btn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    btn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    ui.addControl(btn);
    return btn;
  }

  const inspectBtn = makeButton("Inspect Tower", "20px", "20px");
  const backBtn = makeButton("Back", "20px", "250px");
  const rotateBtn = makeButton("Rotate 90°", "3500px", "2100px");
    
  rotateBtn.isVisible = false;


  // Background container
const panelBg = new BABYLON.GUI.Rectangle();
panelBg.width = "1000px";
panelBg.height = "1300px";
panelBg.thickness = 1;
panelBg.color = "#919191ff";          // border color
panelBg.background = "white";    // 👈 white background
panelBg.cornerRadius = 30;
panelBg.horizontalAlignment =
  BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
panelBg.verticalAlignment =
  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
panelBg.left = "3200px";
panelBg.top = "800px";
panelBg.isVisible = false;
panelBg.isPointerBlocker = false;
panelBg.shadowColor = "rgba(0,0,0,0.2)";
panelBg.shadowBlur = 20;
panelBg.shadowOffsetX = 60;
panelBg.shadowOffsetY = 60;

ui.addControl(panelBg);

// Actual content panel
const panel = new BABYLON.GUI.StackPanel();
panel.paddingTop = "40px";
panel.paddingBottom = "40px";
panel.paddingLeft = "40px";
panel.paddingRight = "40px";
panelBg.addControl(panel);


  const hoverText = new BABYLON.GUI.TextBlock("hover", "Use Mouse \n to Select");
  hoverText.color = "orange";
  hoverText.height = "250px";
  hoverText.fontFamily = "JetBrains Mono";
  hoverText.fontWeight = "bold";
  hoverText.fontSize = 120;
  hoverText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel.addControl(hoverText);

const selectionTitle = new BABYLON.GUI.TextBlock(
    "selectionTitle",
    "Selected Stones:"  
  );
    selectionTitle.height = "300px";
    selectionTitle.color = "Black";
    
    selectionTitle.fontFamily = "JetBrains Mono";
    selectionTitle.fontSize = 100;
    selectionTitle.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.addControl(selectionTitle);


  const selectedList = new BABYLON.GUI.StackPanel();
  panel.addControl(selectedList);

  const selection = enableJengaSelection(
    scene,
    name => {
  hoverText.text = name
    ? ` ${prettyName(name)}`
    : "Select Stone";
    },
    names => {
      selectedList.clearControls();
      names.forEach(n => {
        const t = new BABYLON.GUI.TextBlock();
        t.text = prettyName(n);
        t.height = "150px";
        t.color = "green";
        t.textAlignment = "middle";
        t.fontSize = 120;
        t.fontFamily = "JetBrains Mono";   
        t.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        selectedList.addControl(t);
      });
    }
  );

  inspectBtn.onPointerUpObservable.add(() => {
    setAutoRotate(false);
    focusCameraOnTower(camera, jenga.root);
    panelBg.isVisible = true;
    rotateBtn.isVisible = true;  
    selection.enable();
  });

  backBtn.onPointerUpObservable.add(() => {
    selection.disable();
    selection.clear();
    panelBg.isVisible = false;
    rotateBtn.isVisible = false;
    hoverText.text = "Hover: —";
    setAutoRotate(true);
  });

  rotateBtn.onPointerUpObservable.add(() => {
  rotateCamera90(camera);
});


}
