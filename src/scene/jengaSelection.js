export function enableJengaSelection(scene, onHover, onSelectionChange) {
  const selected = new Set();
  let hovered = null;
  let enabled = false;

  const BASE_EMISSIVE = new BABYLON.Color3(0.15, 0.12, 0.08);


  // -------------------------
  // Visual helpers
  // -------------------------
  function clearHighlight(mesh) {
    if (!mesh.material) return;

    mesh.material.emissiveColor = BASE_EMISSIVE;
    mesh.disableEdgesRendering();
    mesh.__pulsing = false;
  }

  function hoverHighlight(mesh) {
    if (!mesh.material) return;

    mesh.material.emissiveColor = new BABYLON.Color3(1.2, 1.2, 0);
    mesh.enableEdgesRendering();
    mesh.edgesWidth = 0.2;
    mesh.edgesColor = new BABYLON.Color4(1, 1, 0, 1);
  }

  function selectHighlight(mesh) {
    if (!mesh.material) return;

    mesh.enableEdgesRendering();
    mesh.edgesWidth = 0.3;
    mesh.edgesColor = new BABYLON.Color4(0, 1, 0, 1);

    if (mesh.__pulsing) return;
    mesh.__pulsing = true;
    mesh.__pulsePhase = Math.random() * Math.PI * 2;
  }

  // -------------------------
  // Pulse animation
  // -------------------------
  scene.onBeforeRenderObservable.add(() => {
    selected.forEach(mesh => {
      if (!mesh.material || !mesh.__pulsing) return;

      mesh.__pulsePhase += 0.05;
      const i = 1.2 + Math.sin(mesh.__pulsePhase) * 0.4;
      mesh.material.emissiveColor = new BABYLON.Color3(0, i, 0);
    });
  });

  // -------------------------
  // Pointer handling
  // -------------------------
  scene.onPointerObservable.add(pointerInfo => {
    if (!enabled) return;

    const pick = pointerInfo.pickInfo;
    const mesh =
      pick?.hit && pick.pickedMesh?.name.startsWith("block_")
        ? pick.pickedMesh
        : null;

    // ---------- HOVER ----------
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
      if (hovered && hovered !== mesh && !selected.has(hovered)) {
        clearHighlight(hovered);
      }

      if (mesh && !selected.has(mesh)) {
        hoverHighlight(mesh);
        hovered = mesh;
        onHover?.(mesh.name);
      } else {
        hovered = null;
        onHover?.(null);
      }
    }

    // ---------- CLICK ----------
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK && mesh) {
      if (selected.has(mesh)) {
        selected.delete(mesh);
        clearHighlight(mesh);
      } else {
        selected.add(mesh);
        selectHighlight(mesh);
      }

      onSelectionChange?.([...selected].map(b => b.name));
    }
  });

  // -------------------------
  // Controller API (THIS WAS MISSING)
  // -------------------------
  return {
  enable() {
    enabled = true;
  },
  disable() {
    enabled = false;
  },
  clear() {
    selected.forEach(clearHighlight);
    selected.clear();
    onSelectionChange?.([]);
  },

  // ⭐ THIS IS WHAT YOU WANT ⭐
  getSelectedStones() {
  return [...selected].map(mesh => {
    // mesh.name = "block_<layer>_<index>"
    const [, layer, index] = mesh.name.split("_");

    return {
      layer: parseInt(layer, 10),
      index: parseInt(index, 10)
    };
  });
}

};

}
